import { useState, useCallback, useEffect, useRef } from "react";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
import { chatService } from "@/lib/chatbot/optimizedChatService";
import { type ChatProfile } from "@/lib/chatProfile";
import { loadAnonChatHistory, saveAnonChatHistory, clearAnonChatHistory } from "@/lib/chatHistory";
import { CONTACT_EMAILS } from "@/config/contact";

export type Message = {
  role: "user" | "assistant";
  content: string;
  id?: string;
};

export type ConversationSummary = {
  id: string;
  title: string | null;
  updated_at: string;
};

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const EMAIL_NOTE =
  `\n\nIf you would rather speak to a person, email ${CONTACT_EMAILS.info}.`;

const SESSION_USER_KEY = "lwa_chat_rl_uid";

function getRateLimitUserId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let id = window.sessionStorage.getItem(SESSION_USER_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `anon_${Date.now()}`;
      window.sessionStorage.setItem(SESSION_USER_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

/**
 * Prefer the robust local UK-safe engine.
 * If anything still attempts /api/chat, fail soft into the same engine immediately.
 */
async function tryRemoteThenLocal(
  input: string,
  onStatus: (s: string) => void,
  signal: AbortSignal,
): Promise<{ mode: "local" | "remote"; text: string }> {
  const remoteEnabled = Boolean(import.meta.env.VITE_CHAT_API);

  if (remoteEnabled) {
    onStatus("Searching guidance…");
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const cancel = () => controller.abort();
      signal.addEventListener("abort", cancel, { once: true });
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
          signal: controller.signal,
        });
        if (res.ok) {
          const data = (await res.json().catch(() => null)) as { reply?: string; content?: string } | null;
          const text = data?.reply || data?.content;
          if (text && text.trim()) {
            return { mode: "remote", text: text.trim() };
          }
        }
      } finally {
        clearTimeout(timer);
        signal.removeEventListener("abort", cancel);
      }
    } catch {
      // fall through to local immediately
    }
  }

  return { mode: "local", text: "" };
}

/**
 * Local UK-safe chat with streaming UX — Cloudflare Worker not required.
 */
export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusLabel, setStatusLabel] = useState<string | null>(null);
  const [userId] = useState<string | null>(null);
  const [conversations] = useState<ConversationSummary[]>([]);
  const conversationIdRef = useRef<string | null>(null);
  const historyLoadedRef = useRef(false);
  const messagesRef = useRef<Message[]>([]);
  const isLoadingRef = useRef(false);
  const requestIdRef = useRef(0);
  const requestControllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => {
    requestIdRef.current += 1;
    requestControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    const saved = loadAnonChatHistory();
    if (saved.length) {
      setMessages(saved);
      messagesRef.current = saved;
    }
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
    if (userId === null && messages.length > 0) {
      saveAnonChatHistory(messages);
    }
  }, [messages, userId]);

  const abortInFlight = useCallback(() => {
    requestIdRef.current += 1;
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    isLoadingRef.current = false;
    setIsLoading(false);
    setStatusLabel(null);
  }, []);

  const sendMessage = useCallback(async (input: string, _userProfile?: ChatProfile) => {
    if (!input.trim() || isLoadingRef.current) return;

    const requestId = ++requestIdRef.current;
    const controller = new AbortController();
    requestControllerRef.current = controller;
    const isCurrent = () => requestIdRef.current === requestId && !controller.signal.aborted;
    const updateStatus = (status: string | null) => { if (isCurrent()) setStatusLabel(status); };

    const userMsg: Message = { role: "user", content: input.trim(), id: makeId() };
    const assistantId = makeId();

    isLoadingRef.current = true;
    setIsLoading(true);
    setStatusLabel("Searching guidance…");

    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "", id: assistantId }]);

    const appendToAssistant = (chunk: string) => {
      if (!isCurrent()) return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, content: (m.content || "") + chunk } : m,
        ),
      );
    };

    const replaceAssistant = (text: string) => {
      if (!isCurrent()) return;
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: text } : m)),
      );
    };

    try {
      const remote = await tryRemoteThenLocal(userMsg.content, updateStatus, controller.signal);
      if (!isCurrent()) return;

      if (remote.mode === "remote" && remote.text) {
        replaceAssistant("");
        updateStatus(null);
        const parts = remote.text.match(/[^\n]+(?:\n+|$)/g) || [remote.text];
        for (const p of parts) {
          if (!isCurrent()) return;
          appendToAssistant(p);
          await new Promise((r) => setTimeout(r, 10));
        }
        appendToAssistant(EMAIL_NOTE);
      } else {
        replaceAssistant("");
        await chatService.sendMessage(
          userMsg.content,
          getRateLimitUserId(),
          (chunk) => {
            updateStatus(null);
            appendToAssistant(chunk);
          },
          () => {},
          (status) => updateStatus(status),
        );
        appendToAssistant(EMAIL_NOTE);
      }
    } catch {
      const fallback = getFallbackAnswer(userMsg.content) + EMAIL_NOTE;
      replaceAssistant(fallback);
    } finally {
      if (isCurrent()) {
        isLoadingRef.current = false;
        setIsLoading(false);
        setStatusLabel(null);
        requestControllerRef.current = null;
        controller.abort();
      }
    }
  }, []);

  const clearMessages = useCallback(async () => {
    abortInFlight();
    setMessages([]);
    messagesRef.current = [];
    conversationIdRef.current = null;
    historyLoadedRef.current = true;
    if (userId === null) clearAnonChatHistory();
  }, [userId, abortInFlight]);

  const newChat = useCallback(() => {
    abortInFlight();
    setMessages([]);
    messagesRef.current = [];
    conversationIdRef.current = null;
    historyLoadedRef.current = true;
    if (userId === null) clearAnonChatHistory();
  }, [userId, abortInFlight]);

  const loadConversations = useCallback(async () => {}, []);
  const selectConversation = useCallback(async (_conversationId: string) => {
    abortInFlight();
    setMessages([]);
    messagesRef.current = [];
  }, [abortInFlight]);
  const deleteConversation = useCallback(async (_conversationId: string) => {
    abortInFlight();
    setMessages([]);
    messagesRef.current = [];
    conversationIdRef.current = null;
  }, [abortInFlight]);

  return {
    messages,
    isLoading,
    statusLabel,
    sendMessage,
    clearMessages,
    newChat,
    isAuthenticated: !!userId,
    conversations,
    loadConversations,
    selectConversation,
    deleteConversation,
    activeConversationId: conversationIdRef.current,
  };
}
