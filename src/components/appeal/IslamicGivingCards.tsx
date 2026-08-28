import { Moon, HandHeart, Sprout } from "lucide-react";
import { trackDonationClick } from "@/lib/ga-events";

interface IslamicGivingCardsProps {
  /** Called with a suggested amount when a card CTA is used. */
  onGive: (amount: number, source: string) => void;
}

const GIVING_TYPES = [
  {
    id: "zakat",
    icon: Moon,
    title: "Zakat",
    body:
      "The obligatory 2.5% on qualifying wealth held for a lunar year. Survivors in Gaza who cannot afford rehabilitation fall under al-fuqara and al-masakin, so your Zakat is valid here.",
    cta: "Give Zakat",
    amount: 100,
  },
  {
    id: "sadaqah",
    icon: HandHeart,
    title: "Sadaqah",
    body:
      "A voluntary gift, of any size, given whenever your heart moves you. Sadaqah funds the physiotherapy sessions, mobility aids and pain support that Zakat alone cannot cover.",
    cta: "Give Sadaqah",
    amount: 50,
  },
  {
    id: "sadaqah-jariyah",
    icon: Sprout,
    title: "Sadaqah Jariyah",
    body:
      "Ongoing charity that keeps giving. A monthly gift funds continuous rehabilitation care and keeps every guide on this site free for the people who need it.",
    cta: "Give monthly",
    amount: 25,
  },
];

/** Three-card Islamic giving strip explaining Zakat, Sadaqah and Sadaqah Jariyah. */
export default function IslamicGivingCards({ onGive }: IslamicGivingCardsProps) {
  return (
    <section id="zakat" className="py-14 bg-background scroll-mt-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-display font-bold text-center text-foreground mb-2">
          Ways to give
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Whichever way you choose, your gift funds rehabilitation for people
          living with war injuries and long-term joint pain.
        </p>

        <div className="grid sm:grid-cols-3 gap-5">
          {GIVING_TYPES.map((type) => (
            <div
              key={type.id}
              className="bg-card border border-border rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <type.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mb-2">
                {type.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {type.body}
              </p>
              <button
                onClick={() => {
                  trackDonationClick({
                    source: `gaza_${type.id}_card`,
                    amount: type.amount,
                  });
                  onGive(type.amount, type.id);
                }}
                className="mt-5 inline-flex items-center justify-center h-11 bg-primary text-primary-foreground font-bold text-sm rounded-lg hover:bg-primary/90 transition-colors"
              >
                {type.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
