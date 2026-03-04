import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Trash2, Loader2, Stethoscope, Apple, Dumbbell, HelpCircle, Heart } from "lucide-react";
import { useStreamingChat, Message } from "@/hooks/useStreamingChat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

const quickSuggestions = [
  { icon: Stethoscope, label: "What is rheumatoid arthritis?", color: "from-red-500/20 to-rose-400/20 text-red-600" },
  { icon: Apple, label: "Best anti-inflammatory foods?", color: "from-emerald-500/20 to-green-400/20 text-emerald-600" },
  { icon: Dumbbell, label: "Safe exercises for OA?", color: "from-blue-500/20 to-sky-400/20 text-blue-600" },
  { icon: HelpCircle, label: "When should I see a doctor?", color: "from-amber-500/20 to-yellow-400/20 text-amber-600" },
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1.5 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-primary"
        animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const ChatMessage = ({ message, isLatest }: { message: Message; isLatest: boolean }) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-3 max-w-[92%]", isUser ? "ml-auto flex-row-reverse" : "")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full mt-1 shadow-sm",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
            : "bg-gradient-to-br from-primary/15 via-rose-100 to-amber-100 text-primary ring-1 ring-primary/15"
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md"
            : "bg-gradient-to-br from-white to-rose-50/50 text-foreground rounded-bl-md border border-primary/10"
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-2 prose-headings:text-foreground">
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
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Header - vibrant red gradient */}
      <div className="relative px-5 py-4 border-b border-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-rose-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-white/20">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-primary shadow-sm" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-white">Arthritis AI</h3>
              <p className="text-[11px] font-medium text-white/70">
                {isLoading ? (
                  <span className="text-white animate-pulse">Thinking…</span>
                ) : (
                  "Powered by Lovable AI"
                )}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg h-8 w-8 p-0"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages area with subtle pattern */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4 bg-gradient-to-b from-rose-50/30 via-background to-background">
        <AnimatePresence mode="wait">
          {messages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-center pt-6"
            >
              <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 via-rose-100 to-amber-100 flex items-center justify-center shadow-md ring-1 ring-primary/10">
                  <Sparkles className="h-8 w-8 text-primary/70" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-sm"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-[10px]">✨</span>
                </motion.div>
              </div>
              <h4 className="font-display font-bold text-lg text-foreground mb-1">
                Hi, I'm Arthritis AI
              </h4>
              <p className="text-sm text-muted-foreground mb-6 max-w-[260px]">
                Ask me about symptoms, treatments, nutrition, or exercises. I'm here to help.
              </p>

              <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                {quickSuggestions.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.label}
                      onClick={() => sendMessage(s.label)}
                      className="flex items-start gap-2.5 text-left p-3 rounded-xl border border-border/40 bg-white hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <div className={cn("h-7 w-7 rounded-lg bg-gradient-to-br flex items-center justify-center shrink-0", s.color)}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors leading-snug mt-1">
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
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
                  className="flex gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 via-rose-100 to-amber-100 text-primary ring-1 ring-primary/15 mt-1 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-gradient-to-br from-white to-rose-50/50 border border-primary/10 shadow-sm">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Input area - warm tinted */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-primary/10 bg-gradient-to-r from-rose-50/50 to-amber-50/30">
        <div className="flex items-end gap-2 bg-white rounded-2xl border border-primary/15 focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 focus-within:shadow-md transition-all px-4 py-2 shadow-sm">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about arthritis…"
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground/50 max-h-[120px] py-1.5 leading-relaxed"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="h-8 w-8 rounded-xl shrink-0 bg-gradient-to-br from-primary to-rose-500 hover:from-primary/90 hover:to-rose-500/90 shadow-md transition-all"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground/40 text-center mt-2">
          AI can make mistakes. Always consult your healthcare provider.
        </p>
      </form>
    </div>
  );
}
