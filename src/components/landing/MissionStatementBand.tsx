/**
 * MissionStatementBand
 * Inspired by Wellcome Trust, Macmillan, and BHF — a quiet editorial band
 * that anchors the page with a single, plain-English mission sentence.
 */

import { memo } from "react";

const PILLARS = [
  { kicker: "Pillar 01", label: "Clinically reviewed" },
  { kicker: "Pillar 02", label: "Free, for everyone" },
  { kicker: "Pillar 03", label: "Made in the UK" },
  { kicker: "Pillar 04", label: "Kept alive by kind donors" },
] as const;

const MissionStatementBand = memo(() => {
  return (
    <section
      aria-labelledby="mission-statement"
      className="relative border-y border-foreground/10 bg-secondary/30"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-24 lg:py-28">
        {/* Kicker */}
        <p className="flex items-center gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.32em] uppercase text-primary mb-8">
          <span className="w-8 h-px bg-primary" aria-hidden="true" />
          Why we&apos;re here
        </p>

        {/* The single, plain-English sentence — the centrepiece */}
        <h2
          id="mission-statement"
          className="font-display text-[1.875rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.75rem] leading-[1.08] tracking-[-0.025em] text-foreground max-w-[1080px] text-balance"
        >
          Arthritis can quietly take your movement, your sleep, your spark.
          <span className="block text-muted-foreground mt-2 sm:mt-3">
            We&apos;re here to help you get a little of it back &mdash; kindly, clearly, and free for everyone who needs it.
          </span>
        </h2>

        {/* Pillar strip */}
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
