import { trackDonationClick } from "@/lib/ga-events";

export const GAZA_IMPACT_TIERS = [
  { amount: 25, impact: "Funds three guided physiotherapy sessions for a survivor" },
  { amount: 50, impact: "Funds a pain-management consultation and a personalised exercise plan" },
  { amount: 100, impact: "Funds a week of rehabilitation for someone recovering from war injuries" },
  { amount: 250, impact: "Funds a month of guided rehab and pain support" },
  { amount: 500, impact: "Sponsors a complete eight-week rehabilitation programme" },
  { amount: 1000, impact: "Funds a three-month rehabilitation and recovery programme" },
];

interface GazaImpactTiersProps {
  onSelect: (amount: number) => void;
}

/** Impact tiers expressed as concrete rehabilitation outcomes. */
export default function GazaImpactTiers({ onSelect }: GazaImpactTiersProps) {
  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-center text-foreground mb-2">
          What your gift does
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Every amount below is a real unit of care — the sessions, plans and
          follow-up that help a body recover after trauma.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAZA_IMPACT_TIERS.map((tier) => (
            <button
              key={tier.amount}
              onClick={() => {
                trackDonationClick({
                  source: `gaza_tier_${tier.amount}`,
                  amount: tier.amount,
                });
                onSelect(tier.amount);
              }}
              className="text-left bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
            >
              <p className="font-display font-bold text-2xl text-primary">
                £{tier.amount.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {tier.impact}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
