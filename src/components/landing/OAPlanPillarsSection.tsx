import { memo } from "react";
import { Link } from "react-router-dom";
import { Salad, Activity, Flame, Brain, ArrowUpRight } from "lucide-react";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { Plate, Movement, HeartIll, Compass } from "@/components/illustrations";
import SectionDivider from "@/components/ui/SectionDivider";

const PILLARS = [
  {
    n: "01",
    icon: Salad,
    Illustration: Plate,
    title: "Eat well",
    sub: "Food that quietly soothes",
    body:
      "Small, kind changes on your plate — oily fish, leafy greens, olive oil, beans, berries — can ease inflammation and help your joints feel a little lighter.",
    href: "/diet/mediterranean-diet-for-arthritis",
    cta: "See our gentle diet guide",
  },
  {
    n: "02",
    icon: Activity,
    Illustration: Movement,
    title: "Move gently",
    sub: "At your own pace",
    body:
      "Short walks, a swim, seated tai chi, or a few minutes of stretching. Movement is medicine — and it doesn't have to hurt to help.",
    href: "/exercise-hub",
    cta: "Try a gentle exercise",
  },
  {
    n: "03",
    icon: Flame,
    Illustration: HeartIll,
    title: "Ease the pain",
    sub: "Calmer days, kinder nights",
    body:
      "Practical, evidence-based ways to settle a flare — warmth, rest, sleep, weight relief, and natural helpers like omega-3, turmeric and ginger.",
    href: "/conditions/osteoarthritis",
    cta: "Read pain-relief tips",
  },
  {
    n: "04",
    icon: Brain,
    Illustration: Compass,
    title: "Be kind to yourself",
    sub: "Mind, mood, momentum",
    body:
      "Living with arthritis is hard work. Our free self-help tool walks beside you, one small step at a time — no pressure, no judgement.",
    href: "/self-help-tool",
    cta: "Open the self-help tool",
  },
] as const;

const OAPlanPillarsSection = memo(() => {
  return (
    <section
      aria-labelledby="oa-plan"
      className="relative py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
        <div className="max-w-3xl mb-16">
          <p className="section-label text-primary mb-5">A gentle plan, made with you in mind</p>
          <h2
            id="oa-plan"
            className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight leading-[1.06] text-foreground"
          >
            Four small steps. <span className="text-primary italic">One kind plan.</span>{" "}
            Free for everyone living with arthritis.
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
            Built from trusted research and clinical guidance — written in plain English,
            updated as we learn more, and shared freely with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/50 border border-border/50 rounded-3xl overflow-hidden">
          {PILLARS.map(({ n, Illustration, title, sub, body, href, cta }, idx) => (
            <RevealOnScroll
              key={n}
              as="div"
              delay={idx * 80}
              direction={idx % 2 === 0 ? "left" : "right"}
            >
              <Link
                to={href}
                className="group bg-card p-8 sm:p-10 lg:p-12 hover:bg-secondary/40 transition-colors duration-300 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary">
                    Pillar {n}
                  </span>
                  <Illustration
                    animate
                    className="w-12 h-12 text-foreground/80 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>

                <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-none mb-2">
                  {title}
                </h3>
                <p className="text-sm font-medium text-primary mb-5 tracking-wide">{sub}</p>

                <p className="text-muted-foreground text-[15px] leading-relaxed flex-1 mb-8">
                  {body}
                </p>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cta}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <SectionDivider variant="wave" className="mt-12 text-foreground/50" />
      </div>
    </section>
  );
});

OAPlanPillarsSection.displayName = "OAPlanPillarsSection";
export default OAPlanPillarsSection;
