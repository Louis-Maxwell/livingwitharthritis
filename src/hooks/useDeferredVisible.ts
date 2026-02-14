import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isVisible] — isVisible becomes true once the element
 * enters the viewport (with rootMargin), and stays true forever (no unloading).
 */
export function useDeferredVisible<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "200px"
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null!);
  const [visible, setVisible] = useState(false);

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

  return [ref, visible];
}
