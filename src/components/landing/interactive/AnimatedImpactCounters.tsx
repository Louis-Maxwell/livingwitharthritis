import { useEffect, useRef, useState } from "react";

interface Counter {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: (n: number) => string;
}

const COUNTERS: Counter[] = [
  { label: "UK adults with arthritis", value: 8_750_000, format: (n) => (n / 1_000_000).toFixed(2) + "M" },
  { label: "Adults affected (ratio)", value: 6, format: (n) => `1 in ${n}` },
  { label: "Annual UK cost", value: 10, prefix: "£", suffix: "bn" },
  { label: "Free guides published", value: 240, suffix: "+" },
];

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return n;
}

function CounterCard({ c, run }: { c: Counter; run: boolean }) {
  const n = useCountUp(c.value, run);
  const display = c.format ? c.format(n) : Math.round(n).toLocaleString("en-GB");
  return (
    <div className="border-l-2 border-primary/30 pl-6 py-2">
      <p className="font-display text-4xl lg:text-6xl font-bold text-foreground tracking-[-0.02em] tabular-nums">
        {c.prefix}
        {display}
        {c.suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{c.label}</p>
    </div>
  );
}

export default function AnimatedImpactCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-background py-20 lg:py-28 border-b border-border/30" ref={ref}>
      <div className="container mx-auto px-6 lg:px-10 max-w-[1280px]">
        <header className="max-w-2xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3">
            The scale
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-foreground tracking-[-0.02em] leading-[1.1]">
            The numbers behind why we exist.
          </h2>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {COUNTERS.map((c) => (
            <CounterCard key={c.label} c={c} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
