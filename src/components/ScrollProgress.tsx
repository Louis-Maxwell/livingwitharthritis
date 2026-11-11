import { useEffect, useRef, memo, useState } from "react";

/**
 * Fixed 3px reading progress bar (brand red). Scroll handling is passive and
 * batched with requestAnimationFrame; the bar moves with transform: scaleX,
 * so it never triggers layout. It sits above the header (pointer-events:
 * none) and takes no space in the document, so it cannot shift content.
 */
const ScrollProgress = memo(() => {
  const barRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const denom = Math.max(1, scrollHeight - clientHeight);
      const next = Math.min(100, Math.max(0, (scrollTop / denom) * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${next / 100})`;
      setPct(Math.round(next));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className="no-print print:hidden fixed inset-x-0 top-0 z-[100] h-[3px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="reading-progress h-full w-full origin-left bg-primary will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
});

ScrollProgress.displayName = "ScrollProgress";
export default ScrollProgress;
