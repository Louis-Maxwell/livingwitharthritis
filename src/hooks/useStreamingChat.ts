import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getFallbackAnswer } from "@/lib/arthritisChatFallback";
import type { ChatProfile } from "@/lib/chatProfile";

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

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

function makeId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  };
  if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`;
  }
  return headers;
}

type WireMessage = { role: "user" | "assistant"; content: string };

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
  const resp = await fetch(`${CHAT_URL}?stream=0`, {
    method: "POST",
    headers: {
      ...authHeaders,
      Accept: "application/json",
    },
    body: JSON.stringify({ messages, userProfile }),
  });
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
  let resp: Response;
  try {
    const authHeaders = await getAuthHeaders();
    resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ messages, userProfile }),
    });
  } catch (e) {
    // Network/proxy blocked the streaming request — try JSON fallback.
    return fetchJsonFallback({ messages, userProfile, onDelta, onDone });
  }

  if (!resp.ok) {
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
    return fetchJsonFallback({ messages, onDelta, onDone });
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";
  let streamDone = false;
  let receivedAny = false;

  try {
    while (!streamDone) {
      const { done, value } = await reader.read();
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
    if (!receivedAny) {
      return fetchJsonFallback({ messages, userProfile, onDelta, onDone });
    }
    throw e;
  }

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
      const { data } = await supabase
        .from("chat_conversations")
        .select("id, title, updated_at")
        .eq("user_id", uid)
        .order("updated_at", { ascending: false })
        .limit(50);
      if (active && data) setConversations(data);
    };
    refreshConversationsRef.current = refreshConversations;

    const loadHistory = async (uid: string) => {
      if (historyLoadedRef.current) return;
      historyLoadedRef.current = true;

      await refreshConversations(uid);

      const { data: convo } = await supabase
        .from("chat_conversations")
        .select("id")
        .eq("user_id", uid)
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (!active) return;

      if (convo?.id) {
        conversationIdRef.current = convo.id;
        // Load only the last 30 messages for speed
        const { data: msgs } = await supabase
          .from("chat_messages")
          .select("role, content, created_at")
          .eq("conversation_id", convo.id)
          .order("created_at", { ascending: false })
          .limit(30);

        if (active && msgs) {
          setMessages(
            msgs
              .reverse()
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))
          );
        }
      }
    };

    loadHistoryRef.current = loadHistory;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!active) return;
      setUserId(session?.user?.id ?? null);
      // History loaded lazily on first sendMessage to keep page-load fast
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const uid = session?.user?.id ?? null;
      setUserId(uid);
      conversationIdRef.current = null;
      historyLoadedRef.current = false;
      if (!uid) {
        setMessages([]);
        setConversations([]);
      }
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const ensureConversation = useCallback(async (uid: string, firstMessage: string): Promise<string | null> => {
    if (conversationIdRef.current) return conversationIdRef.current;
    const title = firstMessage.slice(0, 60);
    const { data, error } = await supabase
      .from("chat_conversations")
      .insert({ user_id: uid, title })
      .select("id")
      .single();
    if (error) {
      console.error("Failed to create conversation:", error);
      return null;
    }
    conversationIdRef.current = data.id;
    return data.id;
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
        if (cid) {
          supabase.from("chat_messages").insert({
            conversation_id: cid,
            role: "user",
            content: userMsg.content,
          }).then(() => {});
        }
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
          if (userId && assistantSoFar.trim()) {
            const convoId = await convoIdPromise;
            if (convoId) {
              // Insert assistant message and adopt the DB id so feedback links to it.
              supabase
                .from("chat_messages")
                .insert({
                  conversation_id: convoId,
                  role: "assistant",
                  content: assistantSoFar,
                })
                .select("id")
                .single()
                .then(({ data }) => {
                  if (data?.id) assignAssistantDbId(data.id);
                });
              supabase
                .from("chat_conversations")
                .update({ updated_at: new Date().toISOString() })
                .eq("id", convoId)
                .then(() => {
                  refreshConversationsRef.current?.(userId);
                });
            }
          }
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
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
        const convoId = await convoIdPromise;
        if (convoId) {
          supabase
            .from("chat_messages")
            .insert({
              conversation_id: convoId,
              role: "assistant",
              content: fallback,
            })
            .select("id")
            .single()
            .then(({ data }) => {
              if (data?.id) assignAssistantDbId(data.id);
            });
          supabase
            .from("chat_conversations")
            .update({ updated_at: new Date().toISOString() })
            .eq("id", convoId)
            .then(() => {
              refreshConversationsRef.current?.(userId);
            });
        }
      }
    }
  }, [messages, isLoading, userId, ensureConversation]);

  const clearMessages = useCallback(async () => {
    setMessages([]);
    conversationIdRef.current = null;
    historyLoadedRef.current = true;
  }, []);

  const newChat = useCallback(() => {
    setMessages([]);
    conversationIdRef.current = null;
    historyLoadedRef.current = true;
  }, []);

  const loadConversations = useCallback(async () => {
    if (userId && refreshConversationsRef.current) {
      await refreshConversationsRef.current(userId);
    }
  }, [userId]);

  const selectConversation = useCallback(async (conversationId: string) => {
    if (!userId) return;
    conversationIdRef.current = conversationId;
    historyLoadedRef.current = true;
    const { data: msgs } = await supabase
      .from("chat_messages")
      .select("role, content, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(30);
    if (msgs) {
      setMessages(
        msgs
          .reverse()
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))
      );
    }
  }, [userId]);

  const deleteConversation = useCallback(async (conversationId: string) => {
    if (!userId) return;
    await supabase.from("chat_messages").delete().eq("conversation_id", conversationId);
    await supabase.from("chat_conversations").delete().eq("id", conversationId);
    if (conversationIdRef.current === conversationId) {
      setMessages([]);
      conversationIdRef.current = null;
    }
    if (refreshConversationsRef.current) {
      await refreshConversationsRef.current(userId);
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

