/**
 * HeroStatsStrip — 3-up stat row inspired by the Arthritis Foundation
 * homepage. Numbers animate up from zero when the band enters view.
 */
import { CountUp } from "@/components/motion/CountUp";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

type Stat = {
  display?: string;
  end?: number;
  prefix?: string;
  suffix?: string;
  aria: string;
  label: string;
};

const STATS: Stat[] = [
  {
    display: "1 in 6",
    aria: "1 in 6",
    label: "UK adults live with arthritis or related joint pain.",
  },
  {
    end: 8.75,
    suffix: "M",
    aria: "8.75 million",
    label: "people in the UK affected by osteoarthritis alone.",
  },
  {
    end: 10,
    prefix: "£",
    suffix: "bn",
    aria: "£10 billion",
    label: "annual cost of musculoskeletal conditions to the NHS.",
  },
];

const HeroStatsStrip = () => {
  return (
    <section
      aria-label="UK arthritis at a glance"
      className="border-y border-border/60 bg-secondary/40"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {STATS.map((stat, i) => (
            <RevealOnScroll
              key={stat.aria}
              delay={i * 90}
              className="flex flex-col gap-2 border-l-2 border-primary/70 pl-5"
            >
              <span
                className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
                aria-label={stat.aria}
              >
                {stat.display ? (
                  stat.display
                ) : (
                  <CountUp
                    end={stat.end ?? 0}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={(stat.end ?? 0) % 1 === 0 ? 0 : 2}
                  />
                )}
              </span>
              <span className="text-sm lg:text-base text-muted-foreground leading-snug">
                {stat.label}
              </span>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroStatsStrip;
