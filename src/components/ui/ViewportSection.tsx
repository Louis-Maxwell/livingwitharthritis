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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  if (visible) return <>{children}</>;

  return <div ref={ref} className={className} style={{ minHeight }} />;
});

ViewportSection.displayName = "ViewportSection";
export default ViewportSection;
