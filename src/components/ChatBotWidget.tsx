import { useState, lazy, Suspense } from "react";
import { Bot, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Only load ChatBot (and its react-markdown dependency) when user opens the widget
const ChatBot = lazy(() => import("@/components/ChatBot").then(m => ({ default: m.ChatBot })));

export default function ChatBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-[88px] right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl active:scale-95 hover:scale-105 transition-all duration-200 flex items-center justify-center lg:bottom-8 lg:right-8"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat panel – only loads ChatBot code when opened */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-[160px] lg:bottom-24 right-3 lg:right-8 z-50 w-[92vw] max-w-md h-[60vh] max-h-[520px] lg:h-[70vh] lg:max-h-[600px] rounded-2xl shadow-2xl overflow-hidden border border-border bg-background"
          >
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              </div>
            }>
              <ChatBot />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
