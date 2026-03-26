import { memo, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { blogArticles } from "@/data/blogArticles";

interface ContinueReadingBarProps {
  currentSlug: string;
}

function getNextArticle(currentSlug: string) {
  const slugs = Object.keys(blogArticles);
  const idx = slugs.indexOf(currentSlug);
  const nextSlug = slugs[(idx + 1) % slugs.length];
  return { slug: nextSlug, title: blogArticles[nextSlug]?.title ?? "Next Article" };
}

const SWIPE_THRESHOLD = 50;

const ContinueReadingBar = memo(({ currentSlug }: ContinueReadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState({ x: 0, y: 0 });
  const next = useMemo(() => getNextArticle(currentSlug), [currentSlug]);
  const navigate = useNavigate();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiping = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      setProgress(pct);
      setVisible(pct >= 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset dismissed state on slug change
  useEffect(() => { setDismissed(false); }, [currentSlug]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    swiping.current = true;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current || !swiping.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    // Only track the dominant axis
    if (Math.abs(dy) > Math.abs(dx)) {
      setSwipeOffset({ x: 0, y: Math.max(0, dy * -1) > 0 ? 0 : dy }); // only upward
    } else {
      setSwipeOffset({ x: Math.max(0, dx), y: 0 }); // only rightward
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!swiping.current) return;
    swiping.current = false;
    const { x, y } = swipeOffset;
    if (y < -SWIPE_THRESHOLD) {
      // Swiped up → dismiss
      setDismissed(true);
    } else if (x > SWIPE_THRESHOLD) {
      // Swiped right → next article
      navigate(`/blog/${next.slug}`);
    }
    setSwipeOffset({ x: 0, y: 0 });
    touchStart.current = null;
  }, [swipeOffset, navigate, next.slug]);

  const showBar = visible && !dismissed;

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl md:rounded-2xl touch-pan-x"
          style={{
            transform: swipeOffset.x || swipeOffset.y
              ? `translate(${swipeOffset.x}px, ${swipeOffset.y}px)`
              : undefined,
            opacity: swipeOffset.x > SWIPE_THRESHOLD || swipeOffset.y < -SWIPE_THRESHOLD
              ? 0.5 : 1,
            transition: swiping.current ? 'none' : 'transform 0.2s, opacity 0.2s',
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Swipe hint on mobile */}
          <div className="flex justify-center md:hidden pt-1.5 pb-0.5">
            <div className="w-8 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Progress track */}
          <div className="h-1 w-full bg-muted/40 md:rounded-t-2xl overflow-hidden">
            <div
              className="h-full bg-primary transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-card/95 backdrop-blur-lg border-t border-border/30 md:border md:rounded-b-2xl shadow-lg">
            {/* Progress indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground tabular-nums">{progress}%</span>
            </div>

            {/* Next article suggestion */}
            <button
              onClick={() => navigate(`/blog/${next.slug}`)}
              className="flex items-center gap-2 min-w-0 group text-left"
            >
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">Up next:</span>
              <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {next.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ContinueReadingBar.displayName = "ContinueReadingBar";
export default ContinueReadingBar;
