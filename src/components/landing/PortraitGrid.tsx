import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  unsplashSrcSet,
  defaultSizes,
  portraitOlderWomanSmiling,
  portraitOlderManThoughtful,
  portraitMultigenFamily,
} from "@/data/images";

const CARDS = [
  {
    image: portraitOlderWomanSmiling,
    eyebrow: "Lived experiences",
    title: "Real stories from people living with arthritis in the UK.",
    cta: "Read stories",
    href: "/lived-experiences",
    alt: "Older woman smiling — real-life arthritis story",
  },
  {
    image: portraitOlderManThoughtful,
    eyebrow: "Daily support",
    title: "Free physio, exercise plans and one-to-one guidance.",
    cta: "Get support",
    href: "/services",
    alt: "Older man at home — finding everyday support",
  },
  {
    image: portraitMultigenFamily,
    eyebrow: "Community",
    title: "A UK community of patients, carers and clinicians.",
    cta: "Join the community",
    href: "/community-hub",
    alt: "Multi-generational hands together — community support",
  },
];

const PortraitGrid = memo(() => (
  <section
    id="faces-of-arthritis"
    aria-labelledby="portrait-grid-heading"
    className="py-20 sm:py-24 bg-background"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          The faces of arthritis
        </span>
        <h2
          id="portrait-grid-heading"
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight mt-3"
        >
          Behind every statistic, a person — and a story worth telling.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {CARDS.map((c) => (
          <Link
            key={c.href}
            to={c.href}
            className="group relative overflow-hidden rounded-2xl bg-secondary aspect-[4/5] block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <img
              src={c.image}
              srcSet={unsplashSrcSet(c.image, [400, 640, 900, 1200])}
              sizes={defaultSizes}
              alt={c.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-background">
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-background/80">
                {c.eyebrow}
              </span>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold leading-snug">
                {c.title}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-background group-hover:text-primary transition-colors">
                {c.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
));

PortraitGrid.displayName = "PortraitGrid";
export default PortraitGrid;
