import { useEffect, useRef } from "react";

/**
 * Tiny IntersectionObserver hook that toggles `.is-visible` on the
 * referenced element once it enters the viewport. CSS-only animation
 * keeps it off the critical path (no framer-motion).
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      el?.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return ref;
}
