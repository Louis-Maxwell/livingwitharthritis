import { memo } from "react";
import { Users, HeartHandshake, BookOpen } from "lucide-react";

/**
 * Factual impact band. Uses ONLY verified figures
 * (per project content-policy memory — no fabricated stats):
 *  - 8.75M people in the UK live with arthritis (Versus Arthritis)
 *  - £5,000 raised of £50,000 research goal (confirmed by charity)
 *  - 100% of guides free
 */
const facts = [
  {
    icon: Users,
    value: "8.75M",
    label: "people in the UK live with arthritis",
  },
  {
    icon: HeartHandshake,
    value: "£5,000",
    label: "raised of our £50,000 research goal",
  },
  {
    icon: BookOpen,
    value: "100%",
    label: "of our guides are free, for everyone",
  },
] as const;

const ImpactFactBand = memo(() => (
  <section aria-label="Our impact" className="bg-background py-14 lg:py-20">
    <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
      <h2 className="text-center font-display text-2xl sm:text-3xl font-bold text-foreground mb-10 tracking-tight">
        The numbers that drive us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="text-center p-6 rounded-2xl bg-card border border-border"
          >
            <Icon className="w-7 h-7 text-primary mx-auto mb-3" aria-hidden="true" />
            <div className="font-display text-4xl font-bold text-foreground mb-1">
              {value}
            </div>
            <div className="text-sm text-foreground/70 leading-snug">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
));

ImpactFactBand.displayName = "ImpactFactBand";
export default ImpactFactBand;
