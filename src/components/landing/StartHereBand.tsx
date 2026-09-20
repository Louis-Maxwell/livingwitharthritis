import { memo } from "react";
import { Link } from "react-router-dom";
import { Stethoscope, MapPin, Dumbbell, ClipboardList, LifeBuoy, Wallet } from "lucide-react";
import { trackStartHereCard } from "@/lib/ga-events";

/**
 * Beginner journey entry-point band placed under the hero.
 * Five large tap targets (≥44px) — no quiz, no client state.
 */
const cards = [
  {
    icon: Stethoscope,
    label: "I was recently diagnosed",
    sub: "Start with the basics of arthritis",
    href: "/living-with-arthritis",
  },
  {
    icon: MapPin,
    label: "A specific joint hurts",
    sub: "Find guidance for your joint",
    href: "#joint-exercises",
  },
  {
    icon: ClipboardList,
    label: "Check my symptoms",
    sub: "Free interactive symptom checker",
    href: "/symptom-checker",
  },
  {
    icon: LifeBuoy,
    label: "I need self-help now",
    sub: "Personalised self-help tool",
    href: "/self-help",
  },
  {
    icon: Dumbbell,
    label: "I want exercises & diet",
    sub: "Jump straight to the plan",
    href: "/exercises",
  },
  {
    icon: Wallet,
    label: "Money & benefits (PIP)",
    sub: "Claim prep, evidence and next steps",
    href: "/benefits-pip",
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
          Start here — we will meet you where you are
        </h2>
        <p className="text-center text-sm text-foreground/60 mb-8 max-w-2xl mx-auto">
          Some days the pain is loud. Some days you just need one practical next step.
          Pick the path that fits today — no quiz required, no judgement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            const onClick = () => trackStartHereCard(label, href);
            return href.startsWith("#") ? (
              <a key={label} href={href} className={cls} onClick={onClick}>
                {inner}
              </a>
            ) : (
              <Link key={label} to={href} className={cls} onClick={onClick}>
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
