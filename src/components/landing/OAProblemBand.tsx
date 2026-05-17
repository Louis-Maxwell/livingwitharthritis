import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Activity, Heart, AlertCircle } from "lucide-react";

const STATS = [
  {
    icon: Activity,
    big: "8.75M",
    label: "UK adults living with osteoarthritis",
    note: "Most common form of arthritis",
  },
  {
    icon: AlertCircle,
    big: "1 in 6",
    label: "UK adults affected by joint pain",
    note: "Rising with an ageing population",
  },
  {
    icon: Heart,
    big: "£10bn+",
    label: "Estimated annual cost to the UK economy",
    note: "Lost workdays · clinical care · disability",
  },
] as const;

const OAProblemBand = memo(() => {
  return (
    <section
      aria-labelledby="problem"
      className="py-24 lg:py-32 bg-secondary/40 border-y border-border/40"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <div className="max-w-2xl">
            <p className="section-label text-primary/60 mb-5">The Problem</p>
            <h2
              id="problem"
              className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight leading-[1.06] text-foreground"
            >
              Osteoarthritis is the quiet pandemic
              <span className="text-muted-foreground/70"> nobody&apos;s open-sourced.</span>
            </h2>
          </div>
          <Link
            to="/conditions/osteoarthritis"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all whitespace-nowrap"
          >
            Read the full OA brief
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STATS.map(({ icon: Icon, big, label, note }) => (
            <article
              key={big}
              className="bg-card border border-border/50 rounded-2xl p-8 lg:p-10 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Icon className="w-5 h-5 text-primary/70 mb-8" aria-hidden="true" />
              <p className="font-display text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-none mb-4">
                {big}
              </p>
              <p className="text-base font-semibold text-foreground mb-2">{label}</p>
              <p className="text-sm text-muted-foreground">{note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

OAProblemBand.displayName = "OAProblemBand";
export default OAProblemBand;
