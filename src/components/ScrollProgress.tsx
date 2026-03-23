import { useEffect, useRef, memo } from "react";

const ScrollProgress = memo(() => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const pct = scrollTop / (scrollHeight - clientHeight) * 100;
        if (barRef.current) {
          barRef.current.style.width = `${pct}%`;
          barRef.current.style.opacity = pct < 1 ? "0" : "1";
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px]" role="progressbar" aria-label="Page scroll progress">
      <div ref={barRef} className="h-full reading-progress" style={{ width: 0, opacity: 0 }} />
    </div>
  );
});

ScrollProgress.displayName = "ScrollProgress";
export default ScrollProgress;
