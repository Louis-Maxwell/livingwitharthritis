import { lazyWithRetry } from "@/lib/chunkRecovery";
import { useRef, useState, Suspense } from "react";
import { useEscapeToClose, useExclusiveOverlay } from "@/hooks/useExclusiveOverlay";
import ErrorBoundary from "@/components/ErrorBoundary";
import { X, MessageCircle } from "lucide-react";

// Only load ChatBot (and its react-markdown dependency) when user opens the widget
const ChatBot = lazyWithRetry(() => import("@/components/ChatBot").then(m => ({ default: m.ChatBot })));

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  useExclusiveOverlay("help-chat", open, close);
  useEscapeToClose(open, close, launcherRef);

  return (
    <>
      {/* Floating button */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-controls="help-chat-panel"
        aria-label={open ? "Close help" : "Open help"}
        aria-expanded={open}
        className="fixed bottom-[88px] right-4 z-50 h-16 w-16 rounded-full bg-background text-primary shadow-xl hover:shadow-2xl active:scale-95 hover:scale-105 transition-all duration-200 flex items-center justify-center lg:bottom-8 lg:right-8 border-2 border-primary/20 group"
      >
        {/* Pulse ring */}
        {!open && <span className="absolute inset-0 rounded-full animate-ping bg-primary/10 pointer-events-none" style={{ animationDuration: '2.5s' }} />}
        {open ? (
          <X className="h-6 w-6 motion-safe:animate-in motion-safe:spin-in-90 motion-safe:duration-150" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-7 w-7 motion-safe:animate-in motion-safe:zoom-in-75 motion-safe:duration-150" aria-hidden="true" />
        )}
        {/* Visual hint on hover/focus; the accessible name comes from aria-label. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-md opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {open ? "Close help" : "Help"}
        </span>
      </button>

      {/* Chat panel – only loads ChatBot code when opened */}
      {open && (
        <div
          id="help-chat-panel"
          role="region"
          aria-label="Help chat"
          className="fixed bottom-[160px] lg:bottom-24 right-3 lg:right-8 z-50 w-[92vw] max-w-md h-[60vh] max-h-[520px] lg:h-[70vh] lg:max-h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-border bg-background motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 motion-safe:duration-200"
        >
          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              </div>
            }>
              <ChatBot />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </>
  );
}
