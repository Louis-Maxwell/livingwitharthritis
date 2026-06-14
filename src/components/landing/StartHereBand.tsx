import { memo } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, MapPin, Dumbbell } from "lucide-react";

/**
 * Beginner journey entry-point band placed under the hero.
 * Three large tap targets (≥44px) — no quiz, no client state.
 */
const cards = [
  {
    icon: Stethoscope,
    label: "I was recently diagnosed",
    sub: "Start with the basics of arthritis",
    href: "/about-arthritis",
  },
  {
    icon: MapPin,
    label: "A specific joint hurts",
    sub: "Find guidance for your joint",
    href: "#joint-picker",
  },
  {
    icon: Dumbbell,
    label: "I want exercises & diet",
    sub: "Jump straight to the plan",
    href: "/exercises",
  },
] as const;

const StartHereBand = memo(() => {
  return (
    <section
      aria-label="Start here"
      className="bg-background border-y border-border/40 py-10 lg:py-14"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
          Start here
        </h2>
        <p className="text-center text-sm text-foreground/60 mb-8">
          Pick the path that fits where you are today.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map(({ icon: Icon, label, sub, href }) => {
            const inner = (
              <>
                <Icon className="w-6 h-6 text-primary mb-3" aria-hidden="true" />
                <span className="block text-base font-bold text-foreground leading-snug">
                  {label}
                </span>
                <span className="block text-sm text-foreground/60 mt-1">{sub}</span>
              </>
            );
            const cls =
              "block min-h-[88px] p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";
            return href.startsWith("#") ? (
              <a key={label} href={href} className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={label} to={href} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
});

StartHereBand.displayName = "StartHereBand";
export default StartHereBand;
