import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Trash2, Loader2, Stethoscope, Apple, Dumbbell, HelpCircle, Heart, ShieldCheck, Clock, Star } from "lucide-react";
import { useStreamingChat, Message } from "@/hooks/useStreamingChat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const quickSuggestions = [
  { icon: Stethoscope, label: "What is rheumatoid arthritis?", color: "from-red-500/20 to-rose-400/20", iconColor: "text-red-600" },
  { icon: Apple, label: "Best anti-inflammatory foods?", color: "from-emerald-500/20 to-green-400/20", iconColor: "text-emerald-600" },
  { icon: Dumbbell, label: "Safe exercises for OA?", color: "from-blue-500/20 to-sky-400/20", iconColor: "text-blue-600" },
  { icon: HelpCircle, label: "When should I see a doctor?", color: "from-amber-500/20 to-yellow-400/20", iconColor: "text-amber-600" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-2 px-4 py-3">
    <span className="text-xs text-muted-foreground mr-1">Typing</span>
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-1.5 h-1.5 rounded-full bg-primary"
        animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
      />
    ))}
  </div>
);

const ChatMessage = ({ message, isLatest }: { message: Message; isLatest: boolean }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.18 }}
      className={cn("flex gap-2.5 max-w-[90%]", isUser ? "ml-auto flex-row-reverse" : "")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1",
          isUser
            ? "bg-gradient-to-br from-primary to-rose-500 text-white shadow-md shadow-primary/20"
            : "bg-gradient-to-br from-primary/10 via-rose-50 to-amber-50 text-primary ring-1 ring-primary/10 shadow-sm"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      </div>

      {/* Bubble */}
      <div className="flex flex-col gap-1">
        <span className={cn("text-[10px] font-medium px-1", isUser ? "text-right text-muted-foreground/50" : "text-muted-foreground/50")}>
          {isUser ? "You" : "Arthritis AI"}
        </span>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-gradient-to-br from-primary to-rose-500 text-white rounded-tr-md shadow-md shadow-primary/15"
              : "bg-white text-foreground rounded-tl-md border border-primary/8 shadow-sm"
          )}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-foreground prose-strong:text-primary/90">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>
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
    <div className="flex flex-col h-full w-full overflow-hidden bg-gradient-to-b from-rose-50/40 to-white">
      {/* ── Header ── */}
      <div className="relative px-5 py-4 overflow-hidden">
        {/* Layered gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-rose-600 to-red-500" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.18),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shadow-lg ring-1 ring-white/25"
                whileHover={{ scale: 1.05 }}
              >
                <Heart className="h-5 w-5 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-[2.5px] border-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-[15px] text-white tracking-tight">Arthritis AI</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-[11px] font-medium text-white/70">
                  {isLoading ? (
                    <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      Thinking…
                    </motion.span>
                  ) : (
                    "Online now"
                  )}
                </p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-white/50 hover:text-white hover:bg-white/10 rounded-xl h-9 w-9 p-0 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* ── Messages ── */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center pt-4"
            >
              {/* Welcome icon */}
              <div className="relative mb-4">
                <motion.div
                  className="w-[72px] h-[72px] rounded-3xl bg-gradient-to-br from-primary/12 via-rose-100/80 to-amber-50 flex items-center justify-center shadow-lg ring-1 ring-primary/8"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="h-9 w-9 text-primary/60" />
                </motion.div>
                <motion.div
                  className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="h-3 w-3 text-white" />
                </motion.div>
              </div>

              <h4 className="font-display font-bold text-lg text-foreground mb-0.5">
                Hi there! 👋
              </h4>
              <p className="text-[13px] text-muted-foreground mb-1 font-medium">
                I'm your Arthritis AI Assistant
              </p>
              <p className="text-xs text-muted-foreground/60 mb-5 max-w-[240px]">
                Ask me anything about symptoms, treatments, nutrition, or exercises.
              </p>

              {/* Trust badges */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  <span>Evidence-based</span>
                </div>
                <div className="w-px h-3 bg-border" />
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>Instant replies</span>
                </div>
              </div>

              {/* Quick suggestion cards */}
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
                {quickSuggestions.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.button
                      key={s.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      onClick={() => sendMessage(s.label)}
                      className="flex items-start gap-2.5 text-left p-3 rounded-xl border border-border/30 bg-white hover:shadow-lg hover:border-primary/20 hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 group"
                    >
                      <div className={cn("h-8 w-8 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow", s.color)}>
                        <Icon className={cn("h-4 w-4", s.iconColor)} />
                      </div>
                      <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors leading-snug mt-1.5 font-medium">
                        {s.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-5">
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
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 via-rose-50 to-amber-50 text-primary ring-1 ring-primary/10 mt-1 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-medium px-1 text-muted-foreground/50">Arthritis AI</span>
                    <div className="rounded-2xl rounded-tl-md bg-white border border-primary/8 shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* ── Input ── */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-primary/8 bg-white/80 backdrop-blur-sm">
        <div className="flex items-end gap-2 bg-white rounded-2xl border border-primary/12 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/8 focus-within:shadow-lg transition-all px-4 py-2 shadow-sm">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your question…"
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground/40 max-h-[120px] py-1.5 leading-relaxed"
          />
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="h-9 w-9 rounded-xl shrink-0 bg-gradient-to-br from-primary to-rose-500 hover:from-primary/90 hover:to-rose-500/90 shadow-md shadow-primary/20 disabled:shadow-none transition-all"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <ShieldCheck className="h-2.5 w-2.5 text-muted-foreground/30" />
          <p className="text-[10px] text-muted-foreground/35">
            AI can make mistakes · Always consult your healthcare provider
          </p>
        </div>
      </form>
    </div>
  );
}
