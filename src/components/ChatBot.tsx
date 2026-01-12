import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Trash2, Loader2, LogIn } from "lucide-react";
import { useStreamingChat, Message } from "@/hooks/useStreamingChat";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-primary/10" : "bg-muted"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium">
          {isUser ? "You" : "AI Assistant"}
        </p>
        <div className="text-sm text-foreground/90 whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export function ChatBot() {
  const [input, setInput] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { messages, isLoading, sendMessage, clearMessages, requiresAuth } = useStreamingChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const showAuthPrompt = isAuthenticated === false || requiresAuth;

  return (
    <div className="flex flex-col h-full w-full bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">
              {isLoading ? "Thinking..." : "Online"}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {showAuthPrompt ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <LogIn className="h-12 w-12 mb-4 opacity-50" />
            <h4 className="font-medium mb-1">Sign in required</h4>
            <p className="text-sm mb-4">Please sign in to use the AI chat feature.</p>
            <Button onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Bot className="h-12 w-12 mb-4 opacity-50" />
            <h4 className="font-medium mb-1">Start a conversation</h4>
            <p className="text-sm">Ask me anything and I'll do my best to help!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3 p-4 rounded-lg bg-muted">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium">AI Assistant</p>
                  <div className="text-sm text-muted-foreground">Thinking...</div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-muted/30">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={showAuthPrompt ? "Sign in to chat..." : "Type your message..."}
            disabled={isLoading || showAuthPrompt}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim() || showAuthPrompt} size="icon">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
