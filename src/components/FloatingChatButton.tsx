import { useState, lazy, Suspense } from "react";
import { MessageCircle, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Lazy-load ChatBot only when user opens the chat panel (~46KB savings)
const ChatBot = lazy(() => import("./ChatBot").then(m => ({ default: m.ChatBot })));

export function FloatingChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80] sm:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed z-[90] bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(70vh,600px)] rounded-2xl shadow-2xl border border-border/30 overflow-hidden bg-background"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <Suspense fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
                </div>
              }>
                <ChatBot />
              </Suspense>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-4 sm:right-6 z-[85] h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-colors ${
          open
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Sparkles className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-primary/20 pointer-events-none" />
        )}
      </motion.button>
    </>
  );
}
