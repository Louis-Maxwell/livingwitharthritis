import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Trash2, Loader2, Stethoscope, Apple, Dumbbell, HelpCircle, Heart, ShieldCheck, MessageCircle } from "lucide-react";
import { useStreamingChat, Message } from "@/hooks/useStreamingChat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const quickSuggestions = [
  { icon: Stethoscope, label: "What is rheumatoid arthritis?" },
  { icon: Apple, label: "Best anti-inflammatory foods?" },
  { icon: Dumbbell, label: "Safe exercises for OA?" },
  { icon: HelpCircle, label: "When should I see a doctor?" },
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
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-muted/60 text-foreground rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-1.5 prose-headings:text-sm prose-headings:text-foreground">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export function ChatBot() {
  const [input, setInput] = useState("");
  const { messages, isLoading, sendMessage, clearMessages } = useStreamingChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
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

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-background">
      {/* ── Header ── clean, minimal */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-primary">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-white/15 flex items-center justify-center">
            <Heart className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white leading-tight">Arthritis AI</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-white/60">
                {isLoading ? "Typing…" : "Online"}
              </span>
            </div>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

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

              <p className="font-semibold text-base text-foreground mb-0.5">How can I help?</p>
              <p className="text-xs text-muted-foreground mb-5 max-w-[220px] leading-relaxed">
                Ask about symptoms, diet, exercises, or treatments for arthritis.
              </p>

              {/* Quick suggestions — clean list style */}
              <div className="w-full space-y-1.5">
                {quickSuggestions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.button
                      key={s.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => sendMessage(s.label)}
                      className="w-full flex items-center gap-3 text-left px-3.5 py-2.5 rounded-xl border border-border/40 hover:border-primary/20 hover:bg-primary/[0.03] active:scale-[0.99] transition-all group"
                    >
                      <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/12 transition-colors">
                        <Icon className="h-4 w-4 text-primary/60 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-[12px] text-muted-foreground group-hover:text-foreground transition-colors font-medium">
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
            className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground/40 max-h-[100px] py-1.5 leading-relaxed"
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
          <ShieldCheck className="h-2.5 w-2.5 text-muted-foreground/25" />
          <p className="text-[9px] text-muted-foreground/30">
            Always consult your healthcare provider
          </p>
        </div>
      </form>
    </div>
  );
}
