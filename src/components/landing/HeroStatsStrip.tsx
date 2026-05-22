/**
 * HeroStatsStrip — 3-up stat row inspired by the Arthritis Foundation
 * homepage. Sits beneath the hero CTAs to anchor the page in scale.
 * Crimson Playfair numerals on a soft surface band.
 */
const STATS = [
  {
    figure: "1 in 6",
    label: "UK adults live with arthritis or related joint pain.",
  },
  {
    figure: "8.75M",
    label: "people in the UK affected by osteoarthritis alone.",
  },
  {
    figure: "£10bn",
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
          {STATS.map((stat) => (
            <div
              key={stat.figure}
              className="flex flex-col gap-2 border-l-2 border-primary/70 pl-5"
            >
              <span
                className="font-display text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none"
                aria-label={stat.figure}
              >
                {stat.figure}
              </span>
              <span className="text-sm lg:text-base text-muted-foreground leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroStatsStrip;
