import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
import type { ChatProfile } from "@/lib/chatProfile";
import { loadAnonChatHistory, saveAnonChatHistory, clearAnonChatHistory } from "@/lib/chatHistory";

export type Message = {
  role: "user" | "assistant";
  content: string;
  /** DB id (signed-in) or client-generated uuid (anonymous). Used for feedback. */
  id?: string;
};

export type ConversationSummary = {
  id: string;
  title: string | null;
  updated_at: string;
};

const CHAT_URL = `https://replaceme.supabase.co/functions/v1/chat`; // Supabase config removed - restore URL

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  // Supabase auth removed - restore session handling
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: "pk_replaceme", // Restore SUPABASE_PUBLISHABLE_KEY
  };
  return headers;
}

type WireMessage = { role: "user" | "assistant"; content: string };

/** No response at all within this many ms — abort rather than hang forever. */
const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Aborts `controller` after `ms` of inactivity. Call `bump()` on every
 * received chunk to reset the window, so a genuinely long-but-progressing
 * streamed answer isn't cut off — only a stalled connection is.
 */
function createInactivityWatchdog(controller: AbortController, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const bump = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => controller.abort(), ms);
  };
  const cancel = () => {
    if (timer) clearTimeout(timer);
    timer = null;
  };
  bump();
  return { bump, cancel };
}

async function fetchJsonFallback({
  messages,
  userProfile,
  onDelta,
  onDone,
}: {
  messages: WireMessage[];
  userProfile?: ChatProfile;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
}) {
  const authHeaders = await getAuthHeaders();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let resp: Response;
  try {
    resp = await fetch(`${CHAT_URL}?stream=0`, {
      method: "POST",
      headers: {
        ...authHeaders,
        Accept: "application/json",
      },
      body: JSON.stringify({ messages, userProfile }),
      signal: controller.signal,
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
  if (!resp.ok) {
    const errorData = await resp.json().catch(() => null);
    const err = errorData?.error;
    const message =
      typeof err === "object" && err?.message
        ? err.message
        : typeof err === "string"
          ? err
          : "Failed to get response";
    throw new Error(message);
  }
  const data = await resp.json();
  const content: string = data?.data?.content ?? "";
  if (content) onDelta(content);
  onDone();
}

async function streamChat({
  messages,
  userProfile,
  onDelta,
  onDone,
}: {
  messages: WireMessage[];
  userProfile?: ChatProfile;
  onDelta: (deltaText: string) => void;
  onDone: () => void;
}) {
  const controller = new AbortController();
  const watchdog = createInactivityWatchdog(controller, REQUEST_TIMEOUT_MS);

  let resp: Response;
  try {
    const authHeaders = await getAuthHeaders();
    resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ messages, userProfile }),
      signal: controller.signal,
    });
  } catch (e) {
    watchdog.cancel();
    // Network/proxy blocked the streaming request, or it timed out — try
    // the non-streaming JSON path once (its own fresh timeout applies).
    return fetchJsonFallback({ messages, userProfile, onDelta, onDone });
  }

  if (!resp.ok) {
    watchdog.cancel();
    const errorData = await resp.json().catch(() => null);
    if (resp.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    const err = errorData?.error;
    const message =
      typeof err === "object" && err?.message
        ? err.message
        : typeof err === "string"
          ? err
          : "Failed to get response";
    throw new Error(message);
  }

  if (!resp.body) {
    watchdog.cancel();
    return fetchJsonFallback({ messages, userProfile, onDelta, onDone });
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;
  let receivedAny = false;

  try {
    while (!streamDone) {
      const { done, value } = await reader.read();
      watchdog.bump(); // any activity (including keep-alives) resets the window
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            receivedAny = true;
            onDelta(content);
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  } catch (e) {
    watchdog.cancel();
    if (!receivedAny) {
      return fetchJsonFallback({ messages, userProfile, onDelta, onDone });
    }
    throw e;
  }

  watchdog.cancel();

  if (textBuffer.trim()) {
    for (let raw of textBuffer.split("\n")) {
      if (!raw) continue;
      if (raw.endsWith("\r")) raw = raw.slice(0, -1);
      if (raw.startsWith(":") || raw.trim() === "") continue;
      if (!raw.startsWith("data: ")) continue;
      const jsonStr = raw.slice(6).trim();
      if (jsonStr === "[DONE]") continue;
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        /* ignore */
      }
    }
  }

  if (!receivedAny) {
    return fetchJsonFallback({ messages, userProfile, onDelta, onDone });
  }

  onDone();
}

export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const conversationIdRef = useRef<string | null>(null);
  const historyLoadedRef = useRef(false);
  const loadHistoryRef = useRef<((uid: string) => Promise<void>) | null>(null);
  const refreshConversationsRef = useRef<((uid: string) => Promise<void>) | null>(null);

  // Track auth + prepare lazy history loader
  useEffect(() => {
    let active = true;

    const refreshConversations = async (uid: string) => {
      // Supabase conversation query removed - functionality to be restored later
      if (active) setConversations([]);
    };
    refreshConversationsRef.current = refreshConversations;

    const loadHistory = async (uid: string) => {
      if (historyLoadedRef.current) return;
      historyLoadedRef.current = true;

      await refreshConversations(uid);

      // Supabase conversation/message queries removed - functionality to be restored later
      if (!active) return;
    };

    loadHistoryRef.current = loadHistory;

    // Supabase auth session check removed - functionality to be restored later
    const saved = loadAnonChatHistory();
    if (saved.length) setMessages(saved);

    // Supabase auth state listener removed - functionality to be restored later
    const unsubscribe = () => {
      // no-op
    };

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Keep the anonymous-visitor's conversation saved locally as it grows.
  // Guarded to anonymous users only — signed-in history already persists
  // server-side via chat_conversations/chat_messages.
  useEffect(() => {
    if (userId === null && messages.length > 0) {
      saveAnonChatHistory(messages);
    }
  }, [messages, userId]);

  const ensureConversation = useCallback(async (uid: string, firstMessage: string): Promise<string | null> => {
    if (conversationIdRef.current) return conversationIdRef.current;
    // Supabase conversation insert removed - functionality to be restored later
    return null;
  }, []);

  const sendMessage = useCallback(async (input: string, userProfile?: ChatProfile) => {
    if (!input.trim() || isLoading) return;

    // Lazy-load history on first message for logged-in users
    if (userId && !historyLoadedRef.current && loadHistoryRef.current) {
      await loadHistoryRef.current(userId);
    }

    const userMsg: Message = { role: "user", content: input.trim(), id: makeId() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Fire DB writes in the background — don't block the AI request on them
    let convoIdPromise: Promise<string | null> = Promise.resolve(null);
    if (userId) {
      convoIdPromise = ensureConversation(userId, userMsg.content).then((cid) => {
        // Supabase message insert removed - functionality to be restored later
        return cid;
      });
    }

    let assistantSoFar = "";
    const assistantClientId = makeId();
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m,
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar, id: assistantClientId }];
      });
    };

    const assignAssistantDbId = (dbId: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantClientId ? { ...m, id: dbId } : m)),
      );
    };

    try {
      // Trim context sent to AI: last 10 messages keeps responses snappy.
      // Strip client-only fields (id) before sending to the server.
      const recentContext: WireMessage[] = [...messages, userMsg]
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));
      await streamChat({
        messages: recentContext,
        userProfile,
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: async () => {
          setIsLoading(false);
          // Supabase message and conversation updates removed - functionality to be restored later
        },
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to send message";

      if (msg.toLowerCase().includes("rate limit")) {
        setIsLoading(false);
        toast.error("Too many messages. Please wait a moment and try again.");
        return;
      }

      const fallback = getFallbackAnswer(userMsg.content);
      upsertAssistant(fallback);
      setIsLoading(false);

      if (userId) {
        // Supabase fallback message insert removed - functionality to be restored later
      }
    }
  }, [messages, isLoading, userId, ensureConversation]);

  const clearMessages = useCallback(async () => {
    setMessages([]);
    conversationIdRef.current = null;
    historyLoadedRef.current = true;
    if (userId === null) clearAnonChatHistory();
  }, [userId]);

  const newChat = useCallback(() => {
    setMessages([]);
    conversationIdRef.current = null;
    historyLoadedRef.current = true;
    if (userId === null) clearAnonChatHistory();
  }, [userId]);

  const loadConversations = useCallback(async () => {
    if (userId && refreshConversationsRef.current) {
      await refreshConversationsRef.current(userId);
    }
  }, [userId]);

  const selectConversation = useCallback(async (conversationId: string) => {
    if (!userId) return;
    conversationIdRef.current = conversationId;
    historyLoadedRef.current = true;
    // Supabase message query removed - functionality to be restored later
    setMessages([]);
  }, [userId]);

  const deleteConversation = useCallback(async (conversationId: string) => {
    if (!userId) return;
    // Supabase message and conversation deletes removed - functionality to be restored later
    if (conversationIdRef.current === conversationId) {
      setMessages([]);
      conversationIdRef.current = null;
    }
  }, [userId]);

  return {
    messages,
    isLoading,
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

