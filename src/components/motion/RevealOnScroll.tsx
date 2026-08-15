import { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
  direction?: "up" | "left" | "right" | "fade";
}

/**
 * CSS-only scroll reveal. Adds .is-visible when element enters the viewport.
 * Respects prefers-reduced-motion (set via .reveal class in index.css).
 */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass =
    direction === "fade"
      ? "reveal-fade"
      : direction === "left"
        ? "reveal-left"
        : direction === "right"
          ? "reveal-right"
          : "reveal-up";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag2 = Tag as any;
  return (
    <Tag2
      ref={ref}
      className={cn("reveal", dirClass, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag2>
  );
}

export default RevealOnScroll;
