import { useEffect, useRef, memo, useState } from "react";

/**
 * Sticky reading progress bar — decorative visual + accessible progressbar.
 */
const ScrollProgress = memo(() => {
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const denom = Math.max(1, scrollHeight - clientHeight);
        const next = Math.min(100, Math.max(0, (scrollTop / denom) * 100));
        if (barRef.current) {
          barRef.current.style.width = `${next}%`;
          barRef.current.style.opacity = next < 1 ? "0" : "1";
        }
        setPct(Math.round(next));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div
        ref={barRef}
        className="h-full reading-progress bg-primary transition-[width,opacity] duration-75 ease-out"
        style={{ width: 0, opacity: 0 }}
      />
    </div>
  );
});

ScrollProgress.displayName = "ScrollProgress";
export default ScrollProgress;
