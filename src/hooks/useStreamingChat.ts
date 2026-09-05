import { useState, useCallback, useEffect, useRef } from "react";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
import { formatProfileSummary, type ChatProfile } from "@/lib/chatProfile";
import { loadAnonChatHistory, saveAnonChatHistory, clearAnonChatHistory } from "@/lib/chatHistory";
import { CONTACT_EMAILS } from "@/config/contact";
import { toast } from "sonner";

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

export type StreamStatus = "ok" | "error" | "aborted" | "rate_limited" | "partial";

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

const EMAIL_NOTE =
  `\n\nIf you would rather speak to a person, email ${CONTACT_EMAILS.info} — we reply within two working days.`;

const RATE_LIMIT_MESSAGE =
  "You've sent quite a few messages in a short time. Please wait about a minute, then try again.";

const PARTIAL_NOTE =
  "\n\n_(The reply was interrupted. You can ask again, or browse /guides, /diet, /exercises, /blog, or /search.)_";

async function streamChatFromApi(
  history: Message[],
  onToken: (chunk: string) => void,
  options: {
    signal?: AbortSignal;
    profileSummary?: string;
  } = {},
): Promise<StreamStatus> {
  const body: Record<string, unknown> = {
    messages: history.map(({ role, content }) => ({ role, content })),
  };
  if (options.profileSummary) {
    body.profileSummary = options.profileSummary;
  }

  let res: Response;
  try {
    res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream, application/json",
      },
      body: JSON.stringify(body),
      signal: options.signal,
    });
  } catch (err) {
    if (options.signal?.aborted || (err instanceof DOMException && err.name === "AbortError")) {
      return "aborted";
    }
    return "error";
  }

  const contentType = res.headers.get("content-type") || "";

  if (res.status === 429) {
    return "rate_limited";
  }

  if (!res.ok) {
    return "error";
  }

  if (contentType.includes("application/json")) {
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; content?: string; error?: string; code?: string }
      | null;
    if (data?.code === "rate_limited") return "rate_limited";
    if (data?.content) {
      onToken(data.content);
      return "ok";
    }
    return "error";
  }

  if (!res.body) return "error";

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let gotToken = false;
  let sawError = false;

  try {
    while (true) {
      if (options.signal?.aborted) {
        try {
          await reader.cancel();
        } catch {
          /* ignore */
        }
        return gotToken ? "partial" : "aborted";
      }
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload) as {
            type?: string;
            content?: string;
            error?: string;
          };
          if (evt.type === "token" && evt.content) {
            gotToken = true;
            onToken(evt.content);
          } else if (evt.type === "error") {
            sawError = true;
          } else if (evt.type === "done") {
            // finished
          } else if (typeof evt.content === "string" && evt.content) {
            gotToken = true;
            onToken(evt.content);
          }
        } catch {
          // ignore malformed SSE lines
        }
      }
    }
  } catch (err) {
    if (options.signal?.aborted || (err instanceof DOMException && err.name === "AbortError")) {
      return gotToken ? "partial" : "aborted";
    }
    return gotToken ? "partial" : "error";
  }

  if (sawError && !gotToken) return "error";
  if (sawError && gotToken) return "partial";
  return gotToken ? "ok" : "error";
}

export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState<string | null>(null);
  const [conversations] = useState<ConversationSummary[]>([]);
  const conversationIdRef = useRef<string | null>(null);
  const historyLoadedRef = useRef(false);
  const messagesRef = useRef<Message[]>([]);
  const isLoadingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

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
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    isLoadingRef.current = false;
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (input: string, userProfile?: ChatProfile) => {
    if (!input.trim() || isLoadingRef.current) return;

    const userMsg: Message = { role: "user", content: input.trim(), id: makeId() };
    const assistantId = makeId();

    // Cancel any prior in-flight request before starting a new one.
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    isLoadingRef.current = true;
    setIsLoading(true);

    const historyForApi = [...messagesRef.current, userMsg];
    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "", id: assistantId }]);

    const profileSummary = userProfile ? formatProfileSummary(userProfile) : undefined;
    let status: StreamStatus = "error";

    try {
      status = await streamChatFromApi(
        historyForApi,
        (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            ),
          );
        },
        { signal: controller.signal, profileSummary },
      );
    } catch {
      status = controller.signal.aborted ? "aborted" : "error";
    }

    if (abortRef.current === controller) {
      abortRef.current = null;
    }

    if (status === "aborted") {
      // Drop empty placeholder if the user cleared/cancelled before any tokens.
      setMessages((prev) =>
        prev.filter((m) => !(m.id === assistantId && !m.content.trim())),
      );
      isLoadingRef.current = false;
      setIsLoading(false);
      return;
    }

    if (status === "rate_limited") {
      toast.error("Too many messages — please wait a minute before trying again.");
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: RATE_LIMIT_MESSAGE + EMAIL_NOTE }
            : m,
        ),
      );
      isLoadingRef.current = false;
      setIsLoading(false);
      return;
    }

    if (status === "partial") {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId && m.content.trim()
            ? { ...m, content: m.content + PARTIAL_NOTE }
            : m.id === assistantId
              ? { ...m, content: getFallbackAnswer(userMsg.content) + EMAIL_NOTE }
              : m,
        ),
      );
      isLoadingRef.current = false;
      setIsLoading(false);
      return;
    }

    if (status !== "ok") {
      const fallback = getFallbackAnswer(userMsg.content) + EMAIL_NOTE;
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: fallback } : m)),
      );
    }

    isLoadingRef.current = false;
    setIsLoading(false);
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
