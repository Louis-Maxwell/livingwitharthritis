import { memo } from "react";
import { Link } from "react-router-dom";
import { Salad, Activity, Flame, Brain, ArrowUpRight } from "lucide-react";

const PILLARS = [
  {
    n: "01",
    icon: Salad,
    title: "Eat",
    sub: "Anti-inflammatory plate",
    body:
      "A Mediterranean pattern — oily fish, leafy greens, olive oil, legumes, berries — lowers systemic inflammation and eases OA pain.",
    href: "/diet/mediterranean-diet-for-arthritis",
    cta: "Read the diet plan",
  },
  {
    n: "02",
    icon: Activity,
    title: "Move",
    sub: "Low-impact, every day",
    body:
      "Walking, cycling, swimming, tai chi and targeted strength work protect cartilage, build the muscles that support joints, and reduce pain.",
    href: "/exercise-hub",
    cta: "See the movement library",
  },
  {
    n: "03",
    icon: Flame,
    title: "Calm",
    sub: "Lower the inflammation",
    body:
      "Weight management, sleep, stress reduction, omega-3s, turmeric and ginger — the evidence-based stack for chronic joint inflammation.",
    href: "/conditions/osteoarthritis",
    cta: "Open the OA hub",
  },
  {
    n: "04",
    icon: Brain,
    title: "Cope",
    sub: "Mind, mood, momentum",
    body:
      "Living with chronic pain is a daily practice. Our self-help tool gives you a structured plan you can run at your own pace.",
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
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl bg-[#ff0000]">
        <div className="max-w-3xl mb-16">
          <p className="section-label text-primary/60 mb-5">The Open-Source Plan</p>
          <h2
            id="oa-plan"
            className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight leading-[1.06] text-foreground"
          >
            Four pillars. <span className="text-gradient italic">One plan.</span>{" "}
            Freely available to every person living with osteoarthritis.
          </h2>
          <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
            Built from peer-reviewed research and clinical guidance — published openly,
            updated continuously, owned by no one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/50 border border-border/50 rounded-3xl overflow-hidden">
          {PILLARS.map(({ n, icon: Icon, title, sub, body, href, cta }) => (
            <Link
              key={n}
              to={href}
              className="group bg-card p-8 sm:p-10 lg:p-12 hover:bg-secondary/40 transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary/70">
                  Pillar {n}
                </span>
                <div className="w-11 h-11 rounded-xl bg-primary/[0.06] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-none mb-2">
                {title}
              </h3>
              <p className="text-sm font-medium text-primary/80 mb-5 tracking-wide">{sub}</p>

              <p className="text-muted-foreground text-[15px] leading-relaxed flex-1 mb-8">
                {body}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

OAPlanPillarsSection.displayName = "OAPlanPillarsSection";
export default OAPlanPillarsSection;
