import { memo, useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { blogArticles } from "@/data/blogArticles";

interface ContinueReadingBarProps {
  currentSlug: string;
}

function getNextArticle(currentSlug: string) {
  const slugs = Object.keys(blogArticles);
  const idx = slugs.indexOf(currentSlug);
  // Pick the next article, or wrap around
  const nextSlug = slugs[(idx + 1) % slugs.length];
  return { slug: nextSlug, title: blogArticles[nextSlug]?.title ?? "Next Article" };
}

const ContinueReadingBar = memo(({ currentSlug }: ContinueReadingBarProps) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const next = useMemo(() => getNextArticle(currentSlug), [currentSlug]);

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl md:rounded-2xl"
        >
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
            <Link
              to={`/blog/${next.slug}`}
              className="flex items-center gap-2 min-w-0 group"
            >
              <span className="text-xs text-muted-foreground shrink-0 hidden sm:inline">Up next:</span>
              <span className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {next.title}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

ContinueReadingBar.displayName = "ContinueReadingBar";
export default ContinueReadingBar;
