import { useState, useEffect, useRef, ReactNode, memo } from "react";

interface ViewportSectionProps {
  children: ReactNode;
  /** Pixels before viewport to start rendering */
  rootMargin?: string;
  /** Placeholder height */
  minHeight?: string;
  className?: string;
}

/**
 * Only renders children when the section enters (or is near) the viewport.
 * Reduces initial TBT by deferring React tree creation for off-screen sections.
 */
const ViewportSection = memo(({ children, rootMargin = "200px", minHeight = "200px", className }: ViewportSectionProps) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use a large effective margin to handle cascading layout shifts
    // when earlier sections expand and push later ones down
    const effectiveMargin = `0px 0px ${Math.max(parseInt(rootMargin, 10) || 200, 800)}px 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: effectiveMargin }
    );
    observer.observe(el);

    // Re-check periodically to catch cascading layout changes
    // where earlier sections expand and push later ones into range
    const checks = [500, 1500, 3000, 6000];
    const timers = checks.map((delay) =>
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 2000) {
          setVisible(true);
          observer.disconnect();
        }
      }, delay)
    );

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [rootMargin]);

  if (visible) return <>{children}</>;

  return <div ref={ref} className={className} style={{ minHeight }} />;
});

ViewportSection.displayName = "ViewportSection";
export default ViewportSection;
