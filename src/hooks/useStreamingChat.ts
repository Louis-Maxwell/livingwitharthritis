import { useState, useCallback, useEffect, useRef } from "react";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
import type { ChatProfile } from "@/lib/chatProfile";
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
  `\n\nIf you would rather speak to a person, email ${CONTACT_EMAILS.info} — we reply within two working days.`;

async function streamChatFromApi(
  history: Message[],
  onToken: (chunk: string) => void,
): Promise<"ok" | "error"> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream, application/json",
    },
    body: JSON.stringify({
      messages: history.map(({ role, content }) => ({ role, content })),
    }),
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    // JSON error body from worker
    return "error";
  }

  if (contentType.includes("application/json")) {
    const data = (await res.json().catch(() => null)) as
      | { ok?: boolean; content?: string; error?: string }
      | null;
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

  while (true) {
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

  if (sawError && !gotToken) return "error";
  return gotToken ? "ok" : "error";
}

export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState<string | null>(null);
  const [conversations] = useState<ConversationSummary[]>([]);
  const conversationIdRef = useRef<string | null>(null);
  const historyLoadedRef = useRef(false);

  useEffect(() => {
    const saved = loadAnonChatHistory();
    if (saved.length) setMessages(saved);
  }, []);

  useEffect(() => {
    if (userId === null && messages.length > 0) {
      saveAnonChatHistory(messages);
    }
  }, [messages, userId]);

  const sendMessage = useCallback(async (input: string, _userProfile?: ChatProfile) => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input.trim(), id: makeId() };
    const assistantId = makeId();

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Placeholder assistant bubble so ChatBot can stream into it.
    setMessages((prev) => [...prev, { role: "assistant", content: "", id: assistantId }]);

    const historyForApi = [...messages, userMsg];
    let apiOk = false;

    try {
      const status = await streamChatFromApi(historyForApi, (chunk) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m,
          ),
        );
      });
      apiOk = status === "ok";
    } catch {
      apiOk = false;
    }

    if (!apiOk) {
      const fallback = getFallbackAnswer(userMsg.content) + EMAIL_NOTE;
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: fallback } : m)),
      );
    }

    setIsLoading(false);
  }, [isLoading, messages]);

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

  const loadConversations = useCallback(async () => {}, []);
  const selectConversation = useCallback(async (_conversationId: string) => {
    setMessages([]);
  }, []);
  const deleteConversation = useCallback(async (_conversationId: string) => {
    setMessages([]);
    conversationIdRef.current = null;
  }, []);

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
