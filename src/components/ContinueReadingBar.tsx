import { memo, useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNextArticle } from "@/hooks/useBlogArticles";

interface ContinueReadingBarProps {
  currentSlug: string;
}

const SWIPE_THRESHOLD = 50;
/** Show after this scroll depth so early bounce isn't interrupted. */
const SHOW_AT_PCT = 45;

const ContinueReadingBar = memo(({ currentSlug }: ContinueReadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const { data: next } = useNextArticle(currentSlug);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swipingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setProgress(pct);
      setVisible(pct >= SHOW_AT_PCT);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setDismissed(false);
  }, [currentSlug]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    swipingRef.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || !swipingRef.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    // Prefer vertical dismiss; ignore horizontal swipe-to-navigate (use the button/link instead)
    if (Math.abs(dy) > Math.abs(dx) && dy < 0) {
      setSwipeOffset({ x: 0, y: Math.min(0, dy) });
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!swipingRef.current) return;
    swipingRef.current = false;
    const { y } = swipeOffset;
    if (y < -SWIPE_THRESHOLD) {
      setDismissed(true);
    }
    setSwipeOffset({ x: 0, y: 0 });
    touchStart.current = null;
  }, [swipeOffset]);

  const showBar = visible && !dismissed && !!next?.slug;

  return (
    <AnimatePresence>
      {showBar && next && (
        <motion.div
          role="complementary"
          aria-label={`Continue reading: ${next.title}`}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed z-40 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl md:rounded-2xl print:hidden"
          style={{
            // Sit above mobile bottom nav without layout jump on the article
            bottom: "calc(var(--mobile-bottom-nav, 68px) + env(safe-area-inset-bottom, 0px) + 0.5rem)",
          }}
        >
          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="touch-pan-y"
            style={{
              transform: swipeOffset.y
                ? `translateY(${swipeOffset.y}px)`
                : undefined,
              opacity: swipeOffset.y < -SWIPE_THRESHOLD ? 0.5 : 1,
              transition: swipingRef.current ? "none" : "transform 0.2s, opacity 0.2s",
            }}
          >
            <div className="flex justify-center md:hidden pt-1.5 pb-0.5" aria-hidden="true">
              <div className="w-8 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            <div className="h-1 w-full bg-muted/40 md:rounded-t-2xl overflow-hidden" aria-hidden="true">
              <div
                className="h-full bg-primary transition-[width] duration-200 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-2.5 bg-card/95 backdrop-blur-lg border-t border-border/30 md:border md:rounded-b-2xl shadow-lg">
              <div className="flex items-center gap-2 shrink-0 pl-1">
                <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-xs font-bold text-foreground tabular-nums sr-only sm:not-sr-only sm:inline">
                  {progress}%
                </span>
              </div>

              <Link
                to={`/blog/${next.slug}`}
                className="flex flex-1 items-center gap-2 min-w-0 min-h-[44px] group text-left rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">
                  Up next:
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                  {next.title}
                </span>
                <ArrowRight
                  className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>

              <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss continue reading bar"
                className="shrink-0 inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ContinueReadingBar.displayName = "ContinueReadingBar";
export default ContinueReadingBar;
