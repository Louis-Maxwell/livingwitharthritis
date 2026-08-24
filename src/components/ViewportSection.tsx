import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

interface ViewportSectionProps {
  children: ReactNode;
  /** Fallback rendered before the section mounts. Reserve height to avoid CLS. */
  fallback?: ReactNode;
  /** How far ahead of the viewport to start loading. */
  rootMargin?: string;
}

/**
 * Renders its children only once they are close to the viewport, then keeps
 * them mounted. Combines the intersection gate with a single Suspense
 * boundary so a group of lazy sections costs one chunk request instead of one
 * per section, and none of them compete with the hero for bandwidth.
 *
 * Falls back to mounting immediately when IntersectionObserver is missing
 * (older browsers, prerender/crawler passes), so static HTML still contains
 * the full page.
 */
const ViewportSection = ({
  children,
  fallback = null,
  rootMargin = '600px 0px',
}: ViewportSectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  if (visible) {
    return <Suspense fallback={fallback}>{children}</Suspense>;
  }

  return <div ref={ref}>{fallback}</div>;
};

export default ViewportSection;
