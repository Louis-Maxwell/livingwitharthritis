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
          const duration = 2000;
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
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2 tracking-tight transition-transform duration-300 group-hover:scale-110">
        {formatValue()}
      </div>
      <p className="text-xs sm:text-sm text-primary-foreground/70 font-medium">{stat.label}</p>
    </div>
  );
}

const ImpactBannerSection = memo(() => (
  <section className="py-10 lg:py-14 bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground relative overflow-hidden">
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)' }} />
    {/* Dot pattern */}
    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    <div className="container mx-auto px-6 md:px-10 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((s, i) => (
          <AnimatedStat key={i} stat={s} />
        ))}
      </div>
    </div>
  </section>
));

ImpactBannerSection.displayName = "ImpactBannerSection";
export default ImpactBannerSection;
