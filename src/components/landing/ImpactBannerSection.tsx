import { memo, useEffect, useRef, useState } from "react";

const stats = [
  { value: 10000000, suffix: "+", format: "M", label: "People affected in the UK" },
  { value: 100, suffix: "+", format: "", label: "Types of arthritis" },
  { value: 10, suffix: "B", format: "£", label: "Annual NHS cost", prefix: "£" },
  { value: 6, suffix: "", format: "", label: "1 in 6 UK adults", display: "1 in 6" },
];

function AnimatedStat({ stat }: { stat: typeof stats[0] }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2200;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * stat.value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  const formatValue = () => {
    if (stat.display) return stat.display;
    const prefix = stat.prefix || "";
    if (stat.format === "M") return `${prefix}${(count / 1000000).toFixed(count >= stat.value ? 0 : 1)}M${stat.suffix}`;
    if (stat.format === "£") return `${prefix}${count}${stat.suffix}`;
    return `${prefix}${count}${stat.suffix}`;
  };

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-3 tracking-tight transition-transform duration-300 group-hover:scale-105">
        {formatValue()}
      </div>
      <div className="w-8 h-[2px] bg-secondary/40 mx-auto mb-3 group-hover:w-12 transition-all duration-300" />
      <p className="text-xs sm:text-sm text-primary-foreground/55 font-medium tracking-wide">{stat.label}</p>
    </div>
  );
}

const ImpactBannerSection = memo(() => (
  <section className="py-16 lg:py-20 bg-primary text-primary-foreground relative overflow-hidden">
    {/* Subtle overlay */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)' }} />
    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
    {/* Glow */}
    <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-secondary/12 blur-[160px] pointer-events-none" />
    <div className="absolute bottom-[-200px] left-[-100px] w-[400px] h-[400px] rounded-full bg-gold/8 blur-[140px] pointer-events-none" />
    <div className="container mx-auto px-6 md:px-10 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 max-w-5xl mx-auto">
        {stats.map((s, i) => (
          <AnimatedStat key={i} stat={s} />
        ))}
      </div>
    </div>
  </section>
));

ImpactBannerSection.displayName = "ImpactBannerSection";
export default ImpactBannerSection;