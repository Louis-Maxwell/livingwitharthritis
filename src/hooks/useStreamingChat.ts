import { useState, useCallback, useEffect, useRef } from "react";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
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
  `\n\nIf you would rather speak to a person, email ${CONTACT_EMAILS.info} — we reply within two working days.`;

/**
 * Local/canned UK-safe chat only — no Worker streaming API.
 */
export function useStreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState<string | null>(null);
  const [conversations] = useState<ConversationSummary[]>([]);
  const conversationIdRef = useRef<string | null>(null);
  const historyLoadedRef = useRef(false);
  const messagesRef = useRef<Message[]>([]);
  const isLoadingRef = useRef(false);

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
    isLoadingRef.current = false;
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(async (input: string, _userProfile?: ChatProfile) => {
    if (!input.trim() || isLoadingRef.current) return;

    const userMsg: Message = { role: "user", content: input.trim(), id: makeId() };
    const assistantId = makeId();

    isLoadingRef.current = true;
    setIsLoading(true);

    setMessages((prev) => [...prev, userMsg, { role: "assistant", content: "", id: assistantId }]);

    // Yield so the loading spinner paints, then answer from local canned content.
    await Promise.resolve();
    const fallback = getFallbackAnswer(userMsg.content) + EMAIL_NOTE;
    setMessages((prev) =>
      prev.map((m) => (m.id === assistantId ? { ...m, content: fallback } : m)),
    );

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
