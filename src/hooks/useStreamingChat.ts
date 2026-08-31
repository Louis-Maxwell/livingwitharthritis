import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
import type { ChatProfile } from "@/lib/chatProfile";
import { loadAnonChatHistory, saveAnonChatHistory, clearAnonChatHistory } from "@/lib/chatHistory";
import { chatService } from "@/lib/chatbot/optimizedChatService";

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

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

type WireMessage = { role: "user" | "assistant"; content: string };

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
      // Use optimized chat service for instant, cached responses
      await chatService.sendMessage(
        userMsg.content,
        userId || makeId(), // Use session ID for anonymous users
        (chunk) => upsertAssistant(chunk), // Stream chunks as they come
        async () => {
          setIsLoading(false);
          // Optionally save to local history for anonymous users
          if (userId === null) {
            saveAnonChatHistory([...messages, userMsg]);
          }
        }
      );
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

