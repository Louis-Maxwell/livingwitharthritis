import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Trash2, Loader2, Stethoscope, Apple, Dumbbell, HelpCircle, Heart, ShieldCheck, MessageCircle, Plus, History, X } from "lucide-react";
import { useStreamingChat, Message } from "@/hooks/useStreamingChat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { chatRheumatoid, chatFoods, chatExercise, chatDoctor } from "@/data/images";
import AiDisclosureBadge from "@/components/ai/AiDisclosureBadge";
import AiConsentModal from "@/components/ai/AiConsentModal";
import EmergencyRedirectDialog, { detectClientRedFlag } from "@/components/ai/EmergencyRedirectDialog";

const quickSuggestions = [
  { icon: Stethoscope, label: "What is rheumatoid arthritis?", image: chatRheumatoid },
  { icon: Apple, label: "Best anti-inflammatory foods?", image: chatFoods },
  { icon: Dumbbell, label: "Safe exercises for OA?", image: chatExercise },
  { icon: HelpCircle, label: "When should I see a doctor?", image: chatDoctor },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-4 py-2.5">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-primary/60"
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const ChatMessage = ({ message }: { message: Message; isLatest: boolean }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-primary/8 text-primary"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Heart className="h-3.5 w-3.5" />}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted/60 text-foreground rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div>
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-p:text-sm prose-p:leading-relaxed prose-ul:my-1.5 prose-li:my-0.5 prose-li:text-sm prose-headings:my-2 prose-headings:text-base prose-headings:font-semibold prose-headings:text-foreground prose-strong:text-foreground">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
            <AiDisclosureBadge className="mt-2" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export function ChatBot() {
  const [input, setInput] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [emergency, setEmergency] = useState<{ open: boolean; category: string | null }>({
    open: false,
    category: null,
  });
  const {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    newChat,
    isAuthenticated,
    conversations,
    loadConversations,
    selectConversation,
    deleteConversation,
  } = useStreamingChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const safelySend = (text: string) => {
    const flag = detectClientRedFlag(text);
    if (flag.matched) {
      setEmergency({ open: true, category: flag.category });
      return;
    }
    sendMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      safelySend(input);
      setInput("");
      if (inputRef.current) inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const openHistory = async () => {
    setHistoryOpen(true);
    if (isAuthenticated) await loadConversations();
  };

  const handleSelectConversation = async (id: string) => {
    await selectConversation(id);
    setHistoryOpen(false);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background relative">
      <AiConsentModal />
      <EmergencyRedirectDialog
        open={emergency.open}
        category={emergency.category}
        onClose={() => setEmergency({ open: false, category: null })}
      />
      {/* ── Header ── clean, minimal */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-primary">
        <div className="flex items-center gap-2.5">
          {isAuthenticated && (
            <button
              onClick={openHistory}
              title="Past conversations"
              aria-label="Open past conversations"
              className="text-white/70 hover:text-white p-1.5 -ml-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <History className="h-4 w-4" />
            </button>
          )}
          <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center">
            <Heart className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white leading-tight">Arthritis AI</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] text-white/60">
                {isLoading ? "Typing…" : "Online"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={newChat}
            title="New chat"
            aria-label="Start a new chat"
            className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              title="Clear messages"
              aria-label="Clear messages"
              className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── History Sidebar ── slide-in overlay */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setHistoryOpen(false)}
              className="absolute inset-0 z-20 bg-background/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 z-30 w-[78%] max-w-[300px] bg-background border-r border-border/50 shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between px-3.5 py-3 border-b border-border/40">
                <h4 className="text-sm font-semibold text-foreground">Past chats</h4>
                <button
                  onClick={() => setHistoryOpen(false)}
                  aria-label="Close history"
                  className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  newChat();
                  setHistoryOpen(false);
                }}
                className="flex items-center gap-2 mx-3 mt-3 px-3 py-2 text-sm text-foreground border border-border/50 rounded-lg hover:bg-muted/40 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                New chat
              </button>
              <ScrollArea className="flex-1 mt-2">
                <div className="px-2 pb-3">
                  {conversations.length === 0 ? (
                    <p className="text-xs text-muted-foreground px-3 py-4 text-center">
                      No past chats yet.
                    </p>
                  ) : (
                    conversations.map((c) => (
                      <div
                        key={c.id}
                        className="group flex items-center gap-1 rounded-lg hover:bg-muted/60 transition-colors"
                      >
                        <button
                          onClick={() => handleSelectConversation(c.id)}
                          className="flex-1 text-left px-3 py-2 text-sm text-foreground/90 truncate"
                          title={c.title || "Untitled chat"}
                        >
                          {c.title || "Untitled chat"}
                        </button>
                        <button
                          onClick={() => deleteConversation(c.id)}
                          aria-label="Delete conversation"
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive p-1.5 mr-1 rounded-md transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Messages ── */}
      <ScrollArea ref={scrollRef} className="flex-1 px-3.5 py-3">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center pt-6 pb-2"
            >
              {/* Welcome */}
              <div className="h-14 w-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
                <MessageCircle className="h-7 w-7 text-primary/50" />
              </div>

              <p className="font-semibold text-lg text-foreground mb-1">How can I help?</p>
              <p className="text-sm text-muted-foreground mb-5 max-w-[260px] leading-relaxed">
                Ask about symptoms, diet, exercises, or treatments for arthritis.
              </p>

              {/* Quick suggestions — clean list style */}
              <div className="w-full grid grid-cols-2 gap-2">
                {quickSuggestions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.button
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => safelySend(s.label)}
                      className="flex flex-col text-left rounded-xl border border-border/40 hover:border-primary/30 hover:shadow-md active:scale-[0.98] transition-all group overflow-hidden"
                    >
                      <div className="relative w-full h-20 overflow-hidden">
                        <img
                          src={s.image}
                          alt={s.label}
                          loading="lazy"
                          width={256}
                          height={80}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        <div className="absolute bottom-1.5 left-2 h-6 w-6 rounded-md bg-primary/90 flex items-center justify-center">
                          <Icon className="h-3 w-3 text-primary-foreground" />
                        </div>
                      </div>
                      <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors font-medium px-2.5 py-2 leading-snug">
                        {s.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary mt-0.5">
                    <Heart className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-muted/60">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* ── Input ── */}
      <form onSubmit={handleSubmit} className="p-2.5 border-t border-border/40">
        <div className="flex items-end gap-2 rounded-xl border border-border/50 focus-within:border-primary/30 focus-within:ring-1 focus-within:ring-primary/10 transition-all px-3 py-1.5 bg-muted/20">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-transparent text-[15px] resize-none outline-none placeholder:text-muted-foreground max-h-[100px] py-1.5 leading-relaxed"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-8 w-8 rounded-lg shrink-0 transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        <div className="flex items-center justify-center gap-1 mt-1.5">
          <ShieldCheck className="h-2.5 w-2.5 text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground">
            Always consult your healthcare provider
          </p>
        </div>
      </form>
    </div>
  );
}
