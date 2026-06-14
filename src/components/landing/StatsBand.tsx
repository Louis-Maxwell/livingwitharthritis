import { memo, useEffect, useRef, useState } from "react";

function useCountUp(target: number, dur = 2000) {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - t0) / dur, 1);
            setC(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, dur]);

  return { c, ref };
}

const Stat = ({ v, suffix, label }: { v: number; suffix: string; label: string }) => {
  const { c, ref } = useCountUp(v, 2200);
  return (
    <div className="text-center px-4">
      <p
        ref={ref}
        className="text-3xl sm:text-4xl font-extrabold text-foreground tabular-nums"
        aria-label={`${v.toLocaleString()}${suffix}`}
      >
        {c.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground max-w-[200px] mx-auto">{label}</p>
    </div>
  );
};

const StatsBand = memo(() => {
  return (
    <section aria-label="Our impact in numbers" className="bg-accent/50 border-y border-border/20 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        <Stat v={12000} suffix="+" label="People supported across the UK" />
        <Stat v={87} suffix="%" label="Report reduced joint pain after 4 weeks" />
        <Stat v={4500} suffix="+" label="Exercise sessions completed this month" />
        <div className="text-center px-4">
          <p className="text-3xl sm:text-4xl font-extrabold text-foreground" aria-label="Zero pounds">£0</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-[200px] mx-auto">Cost to every patient, always</p>
        </div>
      </div>
    </section>
  );
});

StatsBand.displayName = "StatsBand";
export default StatsBand;
