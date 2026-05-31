import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Word-by-word reveal animation, CSS keyframe driven.
 * Honors prefers-reduced-motion via .text-split-word base class.
 */
export function TextSplitReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 60,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("text-split inline", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={cn("text-split-word inline-block whitespace-pre", wordClassName)}
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

export default TextSplitReveal;
