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
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    const answer = getFallbackAnswer(userMsg.content) + EMAIL_NOTE;
    setMessages((prev) => [...prev, { role: "assistant", content: answer, id: makeId() }]);
    setIsLoading(false);
  }, [isLoading]);

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
  const selectConversation = useCallback(async (_conversationId: string) => { setMessages([]); }, []);
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
