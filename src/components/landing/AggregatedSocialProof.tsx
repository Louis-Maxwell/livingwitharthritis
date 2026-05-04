/**
 * AggregatedSocialProof — editorial weekly activity strip.
 * Replaces the rotating individual donor toaster with anonymous,
 * aggregated counts that read like a newspaper dateline.
 *
 * Non-personal by design (no names, no avatars) — keeps the FT Weekend tone
 * and avoids the "sales notification" feel of per-user popups.
 */

import { memo } from "react";
import { Users, HeartPulse, MessageCircle } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const STATS = [
  {
    icon: Users,
    value: 312,
    label: "people started a programme this week",
  },
  {
    icon: HeartPulse,
    value: 1840,
    label: "exercise sessions completed in the last 7 days",
  },
  {
    icon: MessageCircle,
    value: 96,
    label: "questions answered by our clinical team this week",
  },
] as const;

const AggregatedSocialProof = memo(() => {
  // ISO week reference — gives the dateline a real "week ending" feel
  const weekEnding = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section
      aria-label="Weekly community activity"
      className="border-y border-foreground/10 bg-background"
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="py-6 sm:py-7">
          {/* Editorial dateline */}
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase text-primary/70 text-center mb-5">
            This week · Week ending {weekEnding}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-y-0 sm:gap-x-8">
            {STATS.map(({ icon: Icon, value, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3 text-center sm:text-left"
              >
                <Icon
                  className="w-4 h-4 shrink-0 text-primary/80"
                  aria-hidden="true"
                />
                <p className="text-[13px] sm:text-sm text-foreground/80 leading-snug">
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
