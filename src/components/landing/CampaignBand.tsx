import { memo } from "react";
import { Heart, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import QuickDonateButton from "@/components/QuickDonateButton";

interface CampaignBandProps {
  title: string;
  subtitle: string;
  description: string;
  goalGbp: number;
  /** Only pass when the raised total is verified from bank/Stripe books. */
  raisedGbp?: number;
  /** When false, hide progress meter (default if raisedGbp omitted). */
  showMeter?: boolean;
  impactMetric?: {
    label: string;
    value: string | number;
  };
  beneficiaries?: number;
  urgency?: "high" | "medium" | "low" | "none";
  cta?: string;
  image?: string;
}

const CampaignBand = memo(({
  title,
  subtitle,
  description,
  goalGbp,
  raisedGbp,
  showMeter,
  impactMetric,
  beneficiaries,
  urgency = "medium",
  cta,
}: CampaignBandProps) => {
  const meterOn = showMeter === true && typeof raisedGbp === "number" && raisedGbp >= 0;
  const percentage = meterOn && goalGbp > 0 ? Math.round((raisedGbp! / goalGbp) * 100) : 0;
  const remaining = meterOn ? Math.max(0, goalGbp - raisedGbp!) : goalGbp;

  const urgencyBadge = {
    high: "bg-red-500/10 text-red-700 border-red-200",
    medium: "bg-amber-500/10 text-amber-700 border-amber-200",
    low: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    none: "",
  };

  return (
    <section
      aria-labelledby="campaign-heading"
      className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-transparent to-muted/30"
    >
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          {urgency && urgency !== "none" && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold mb-5 ${urgencyBadge[urgency]}`}>
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
              {urgency === "high" && "Urgent appeal"}
              {urgency === "medium" && "Active campaign"}
              {urgency === "low" && "Ongoing support"}
            </div>
          )}

          <h2
            id="campaign-heading"
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2 leading-tight"
          >
            {title}
          </h2>
          <p className="text-lg text-primary font-semibold mb-6">{subtitle}</p>

          <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-10 max-w-3xl">
            {description}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              {meterOn ? (
                <>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-foreground/70">Progress</span>
                    <span className="text-2xl font-bold text-primary">{percentage}%</span>
                  </div>

                  <div
                    className="h-4 w-full bg-muted rounded-full overflow-hidden"
                    role="progressbar"
                    aria-valuenow={raisedGbp}
                    aria-valuemin={0}
                    aria-valuemax={goalGbp}
                    aria-label={`Campaign progress: ${percentage}%`}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-baseline justify-between text-sm">
                    <span className="text-foreground/70">
                      <strong className="text-foreground font-semibold">£{raisedGbp!.toLocaleString()}</strong> raised
                    </span>
                    <span className="text-foreground/70">
                      Goal: <strong className="text-foreground">£{goalGbp.toLocaleString()}</strong>
                    </span>
                  </div>

                  {remaining > 0 && (
                    <p className="text-xs text-foreground/60">
                      <strong>£{remaining.toLocaleString()}</strong> to go
                    </p>
                  )}
                </>
              ) : (
                <div className="rounded-xl bg-card border border-border p-5">
                  <p className="text-sm text-foreground/70 mb-1">Fundraising goal</p>
                  <p className="text-2xl font-bold text-foreground">
                    £{goalGbp.toLocaleString()}
                  </p>
                  <p className="text-xs text-foreground/60 mt-2">
                    Progress totals are shown only when verified from our donation records. We do not display estimated or placeholder meters.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {impactMetric && (
                <div className="rounded-xl bg-card border border-border p-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs text-foreground/60 font-medium">Impact</p>
                      <p className="text-lg font-bold text-foreground">{impactMetric.value}</p>
                      <p className="text-xs text-foreground/70">{impactMetric.label}</p>
                    </div>
                  </div>
                </div>
              )}

              {typeof beneficiaries === "number" && beneficiaries > 0 && (
                <div className="rounded-xl bg-card border border-border p-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs text-foreground/60 font-medium">Ambition</p>
                      <p className="text-lg font-bold text-foreground">{beneficiaries.toLocaleString()}</p>
                      <p className="text-xs text-foreground/70">People we aim to support</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {cta || "Join us in making a difference"}
                </h3>
                <p className="text-foreground/70">
                  {meterOn && percentage === 100
                    ? "Thank you! This campaign has reached its goal."
                    : `Help us work toward our goal of £${goalGbp.toLocaleString()}.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <QuickDonateButton amount={25} size="md" />
                <QuickDonateButton amount={100} size="md" />
                <QuickDonateButton amount={500} variant="secondary" size="md" />
              </div>
            </div>
          </div>

          {meterOn && percentage === 100 && (
            <div className="mt-8 rounded-xl bg-emerald-500/10 border border-emerald-200 p-6 flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <p className="font-semibold text-emerald-900 mb-1">Campaign goal reached!</p>
                <p className="text-sm text-emerald-800">
                  Thank you to everyone who contributed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

CampaignBand.displayName = "CampaignBand";
export default CampaignBand;
