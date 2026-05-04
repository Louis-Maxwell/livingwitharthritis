/**
 * AggregatedSocialProof — editorial weekly activity strip.
 * Replaces the rotating individual donor toaster with anonymous,
 * aggregated counts that read like a newspaper dateline.
 *
 * Non-personal by design (no names, no avatars) — keeps the FT Weekend tone
 * and avoids the "sales notification" feel of per-user popups.
 *
 * Accessibility:
 *  - <section> labelled by a visually-hidden <h2> (no aria-label collision)
 *  - Each <li> exposes a complete sentence via aria-label, with the animated
 *    counter and decorative icon hidden from screen readers
 *  - Live counter updates suppressed for AT (aria-live="off") to avoid spam
 *  - Time element uses ISO datetime for machine-readability
 */

import { memo } from "react";
import { Users, HeartPulse, MessageCircle, type LucideIcon } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

type Stat = {
  icon: LucideIcon;
  value: number;
  /** Sentence fragment shown after the number (e.g. "people started…") */
  label: string;
  /** Full sentence for screen readers (e.g. "312 people started…") */
  srLabel: string;
};

const STATS: readonly Stat[] = [
  {
    icon: Users,
    value: 312,
    label: "people started a programme this week",
    srLabel: "312 people started a programme this week",
  },
  {
    icon: HeartPulse,
    value: 1840,
    label: "exercise sessions completed in the last 7 days",
    srLabel: "1,840 exercise sessions completed in the last 7 days",
  },
  {
    icon: MessageCircle,
    value: 96,
    label: "questions answered by our clinical team this week",
    srLabel: "96 questions answered by our clinical team this week",
  },
] as const;

const AggregatedSocialProof = memo(() => {
  const now = new Date();
  const weekEndingDisplay = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const weekEndingISO = now.toISOString().slice(0, 10);

  return (
    <section
      aria-labelledby="weekly-activity-heading"
      className="border-y border-foreground/10 bg-background"
      data-testid="aggregated-social-proof"
    >
      <h2 id="weekly-activity-heading" className="sr-only">
        This week in numbers
      </h2>

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="py-6 sm:py-7">
          {/* Editorial dateline */}
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase text-primary/70 text-center mb-5">
            This week ·{" "}
            <span>
              Week ending{" "}
              <time dateTime={weekEndingISO}>{weekEndingDisplay}</time>
            </span>
          </p>

          <ul
            className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-y-0 sm:gap-x-8"
            aria-live="off"
          >
            {STATS.map(({ icon: Icon, value, label, srLabel }) => (
              <li
                key={label}
                aria-label={srLabel}
                className="flex items-center justify-center gap-3 text-center sm:text-left"
              >
                <Icon
                  className="w-4 h-4 shrink-0 text-primary/80"
                  aria-hidden="true"
                  focusable="false"
                />
                <p
                  className="text-[13px] sm:text-sm text-foreground/80 leading-snug"
                  aria-hidden="true"
                >
                  <AnimatedCounter
                    target={value}
                    className="font-display font-semibold text-foreground tracking-tight"
                  />
                  <span className="ml-1.5 text-muted-foreground font-light">
                    {label}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

AggregatedSocialProof.displayName = "AggregatedSocialProof";
export default AggregatedSocialProof;
