import { useEffect, useRef, useState, memo } from "react";

interface AnimatedCounterProps {
  /** The numeric target to count up to */
  target?: number;
  /** Text appended after the number, e.g. "+", "%" */
  suffix?: string;
  /** Text prepended before the number, e.g. "£" */
  prefix?: string;
  /** Fixed display string (skips counting, e.g. "24/7") */
  display?: string;
  /** Duration of the animation in ms */
  duration?: number;
  /** Format large numbers: e.g. 10000000 → "10M", 50000 → "50K" */
  compact?: boolean;
  className?: string;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return m % 1 === 0 ? `${m.toFixed(0)}M` : `${m.toFixed(1)}M`;
  }
  if (n >= 1_000) {
    const k = n / 1_000;
    return k % 1 === 0 ? `${k.toFixed(0)}K` : `${k.toFixed(1)}K`;
  }
  return n.toLocaleString();
}

const AnimatedCounter = memo(({
  target,
  suffix = "",
  prefix = "",
  display,
  duration = 2200,
  compact = false,
  className = "",
}: AnimatedCounterProps) => {
  // Start with target value to avoid empty LCP element, then animate from 0
  const [count, setCount] = useState(target ?? 0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || display) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          // Reset to 0 then animate up for visual effect
          setCount(0);
          requestAnimationFrame(() => {
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, display]);

  const value = display
    ? display
    : `${prefix}${compact ? formatCompact(count) : count.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
});

AnimatedCounter.displayName = "AnimatedCounter";
export default AnimatedCounter;
