import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motionAllowed } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveal-once on scroll with native IntersectionObserver.
 *
 * Content is visible by default: the hidden state only exists while
 * `data-reveal="armed"` is set, which happens after hydration, never during
 * prerender or with reduced motion, and never for elements already in the
 * viewport on mount (protects above-the-fold and LCP content). Opacity and
 * `translate` only, so there is no layout shift.
 */
export function RevealOnScroll({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionAllowed() || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    el.setAttribute("data-reveal", "armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag2 = Tag as any;
  return (
    <Tag2 ref={ref} className={cn("reveal", className)} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </Tag2>
  );
}

export default RevealOnScroll;
