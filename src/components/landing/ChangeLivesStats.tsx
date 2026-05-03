import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * UK arthritis figures — sourced from Versus Arthritis & NICE public data.
 * Inspired layout from arthritis.org "You Can Change Lives" block.
 */
const STATS = [
  {
    value: "10M",
    label: "people in the UK",
    detail: "live with arthritis or a related condition",
  },
  {
    value: "8.5M",
    label: "adults",
    detail: "in the UK live with osteoarthritis",
  },
  {
    value: "12,000+",
    label: "children & young people",
    detail: "in the UK have juvenile idiopathic arthritis",
  },
];

const ChangeLivesStats = memo(() => (
  <section
    aria-labelledby="change-lives-heading"
    className="bg-background py-20 sm:py-24 border-y border-border/30"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-start">
      {/* Heading column */}
      <div className="lg:col-span-4">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary">
          Together We Can
        </span>
        <h2
          id="change-lives-heading"
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.02] tracking-tight mt-3"
        >
          You Can <br />
          <span className="text-primary">Change Lives.</span>
        </h2>
        <Link
          to="/ways-to-help"
          className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors group shadow-md shadow-primary/15"
        >
          Help Conquer Arthritis
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Stats grid */}
      <div className="lg:col-span-8 grid sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {STATS.map((s) => (
          <div key={s.value} className="border-l-2 border-primary/30 pl-5">
            <p className="font-display text-5xl sm:text-6xl font-bold text-foreground tabular-nums leading-none">
              {s.value}
            </p>
            <p className="mt-3 text-base font-semibold text-foreground">{s.label}</p>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
          </div>
        ))}
      </div>
    </div>

    <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-xs text-muted-foreground">
      Figures based on UK public health data from Versus Arthritis and NHS / NICE
      sources. Updated annually.
    </p>
  </section>
));

ChangeLivesStats.displayName = "ChangeLivesStats";
export default ChangeLivesStats;
