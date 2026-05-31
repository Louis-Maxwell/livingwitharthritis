import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  /** Format helper for non-numeric figures like "1 in 6". If provided, end/prefix/suffix are ignored. */
  display?: string;
}

/**
 * Animates a number from 0 to `end` once it scrolls into view.
 * For display strings like "1 in 6", pass `display` and we'll just fade-up.
 */
export function CountUp({
  end,
  duration = 1600,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  display,
}: Props) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setValue(end);
      return;
    }
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setValue(end);
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            el.classList.add("is-visible");
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(end * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(end);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  if (display) {
    return (
      <span ref={ref} className={`count-up ${className ?? ""}`}>
        {display}
      </span>
    );
  }

  const formatted = value.toLocaleString("en-GB", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`count-up ${className ?? ""}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default CountUp;
