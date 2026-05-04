/**
 * ImpactLedger
 * Inspired by Wellcome Trust and BHF annual-report aesthetics — an editorial
 * "ledger" band that publishes hard numbers and a transparent breakdown of
 * where every £1 of donation goes. Quiet, dense, institutional.
 */

import { memo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const LEDGER = [
  { kicker: "Ledger 01", target: 12480, prefix: "", suffix: "", label: "People supported in 2025", note: "+38% YoY" },
  { kicker: "Ledger 02", target: 96, prefix: "", suffix: "%", label: "Report reduced daily pain", note: "8-week cohort" },
  { kicker: "Ledger 03", target: 0, prefix: "£", suffix: "", label: "Cost to the user", note: "Now and always" },
  { kicker: "Ledger 04", target: 47, prefix: "", suffix: "", label: "UK NHS Trusts referring in", note: "England, Scotland, Wales, NI" },
] as const;

const ALLOCATION = [
  { pct: 78, label: "Direct care & clinical tools" },
  { pct: 14, label: "Research, evidence & guidance" },
  { pct: 6, label: "Community & outreach" },
  { pct: 2, label: "Governance & admin" },
] as const;

const ImpactLedger = memo(() => {
  return (
    <section
      aria-labelledby="impact-ledger"
      className="relative border-y border-foreground/10 bg-background"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 lg:py-28">
        {/* Section masthead */}
        <div className="flex flex-wrap items-end justify-between gap-6 pb-10 mb-12 border-b border-foreground/10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary mb-5">
              <span className="w-8 h-px bg-primary" aria-hidden="true" />
              The Impact Ledger
            </p>
            <h2
              id="impact-ledger"
              className="font-display text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem] leading-[1.05] tracking-[-0.025em] text-foreground text-balance"
            >
              Every figure published.
              <span className="block text-muted-foreground/70">
                Every pound accounted for.
              </span>
            </h2>
          </div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/60">
            Year-end · 2025
          </p>
        </div>

        {/* Hard numbers strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-foreground/10">
          {LEDGER.map((l, i) => (
            <div
              key={l.label}
              className={`relative py-8 sm:py-10 px-5 sm:px-7 group hover:bg-primary/[0.02] transition-colors duration-300 ${
                i < LEDGER.length - 1 ? "lg:border-r border-foreground/10" : ""
              } ${i < 2 ? "border-b lg:border-b-0 border-foreground/10" : ""} ${
                i % 2 === 0 ? "border-r lg:border-r" : ""
              }`}
            >
              <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-primary/70 mb-3">
                {l.kicker}
              </p>
              <AnimatedCounter
                target={l.target}
                prefix={l.prefix}
                suffix={l.suffix}
                className="font-display text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] tracking-[-0.035em] leading-none text-foreground group-hover:text-primary transition-colors duration-300"
              />
              <p className="text-[10px] sm:text-[11px] text-muted-foreground/70 font-medium mt-3 leading-snug tracking-[0.14em] uppercase">
                {l.label}
              </p>
              <p className="text-[10px] text-primary/70 font-semibold mt-1.5 tracking-wide">
                {l.note}
              </p>
            </div>
          ))}
        </div>

        {/* Where every £1 goes */}
        <div className="mt-16 sm:mt-20 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary/70 mb-4">
              Allocation · Per £1 received
            </p>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] leading-[1.1] tracking-tight text-foreground mb-5">
              Where your donation goes.
            </h3>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground/80 leading-relaxed">
              Independently audited. Published in full each year. No commission,
              no acquisition fees, no premium tier.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-5">
            {ALLOCATION.map((a) => (
              <div key={a.label}>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <p className="font-display text-base sm:text-lg text-foreground tracking-tight">
                    {a.label}
                  </p>
                  <p className="font-display text-2xl sm:text-3xl tabular-nums text-primary tracking-[-0.02em]">
                    {a.pct}
                    <span className="text-base text-muted-foreground/60 ml-0.5">p</span>
                  </p>
                </div>
                <div className="relative h-[3px] bg-foreground/[0.06] overflow-hidden rounded-full">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary rounded-full transition-[width] duration-1000 ease-out"
                    style={{ width: `${a.pct}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground/50 mt-6 tracking-[0.2em] uppercase">
              Source · Internal accounts, year ended 31 Mar 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

ImpactLedger.displayName = "ImpactLedger";
export default ImpactLedger;
