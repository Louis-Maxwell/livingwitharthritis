/**
 * MissionStatementBand
 * A visible, plain-English statement of the charity's purpose. Keep this
 * aligned with the canonical mission in config/charity.ts so search engines
 * and people see the same organisation identity and focus.
 */

import { memo } from "react";
import { Link } from "react-router-dom";
import { CHARITY } from "@/config/charity";

const PILLARS = [
  { kicker: "Pillar 01", label: "Arthritis & frailty awareness" },
  { kicker: "Pillar 02", label: "Free, evidence-based information" },
  { kicker: "Pillar 03", label: "Mobility, strength & independence" },
  { kicker: "Pillar 04", label: "Practical support for UK communities" },
] as const;

const MissionStatementBand = memo(() => {
  return (
    <section
      aria-labelledby="mission-statement"
      className="relative border-y border-foreground/10 bg-secondary/30"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 lg:py-28">
        <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary mb-8">
          <span className="w-8 h-px bg-primary" aria-hidden="true" />
          Why we&apos;re here
        </p>

        <h2
          id="mission-statement"
          className="font-display text-[1.875rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.75rem] leading-[1.08] tracking-[-0.025em] text-foreground max-w-[1080px] text-balance"
        >
          Living With Arthritis is a UK registered charity working to improve
          awareness and understanding of arthritis and frailty.
          <span className="block text-muted-foreground mt-3 sm:mt-4 text-[1.15rem] sm:text-[1.35rem] md:text-[1.6rem] lg:text-[1.85rem] leading-[1.35] tracking-normal font-sans">
            We provide free, evidence-based information and practical resources
            to help people stay informed, active, independent and supported.
          </span>
        </h2>

        <p className="mt-7 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
          {CHARITY.mission} This work includes arthritis education, frailty
          awareness and prevention, falls prevention, healthy ageing, strength,
          mobility and independence.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/about#arthritis-frailty"
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Arthritis &amp; frailty awareness
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            About the charity
          </Link>
        </div>

        <div className="mt-14 sm:mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-4 border-t border-foreground/10">
          {PILLARS.map((p, i) => (
            <div
              key={p.label}
              className={`py-6 sm:py-8 px-4 sm:px-6 ${
                i < PILLARS.length - 1 ? "sm:border-r border-foreground/10" : ""
              } ${i < 2 ? "border-b sm:border-b-0 border-foreground/10" : ""} ${
                i % 2 === 0 ? "border-r sm:border-r" : ""
              }`}
            >
              <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase text-primary mb-2">
                {p.kicker}
              </p>
              <p className="font-display text-lg sm:text-xl lg:text-2xl tracking-tight text-foreground">
                {p.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

MissionStatementBand.displayName = "MissionStatementBand";
export default MissionStatementBand;
