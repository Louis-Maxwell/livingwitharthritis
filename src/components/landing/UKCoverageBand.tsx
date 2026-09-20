import { memo } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const NATIONS = ["England", "Scotland", "Wales", "Northern Ireland"] as const;

const LINKS = [
  { href: "/benefits-pip", label: "PIP and benefits" },
  { href: "/arthritis-waiting-list-help", label: "NHS waiting lists" },
  { href: "/exercises", label: "Exercise" },
  { href: "/diet", label: "Diet" },
  { href: "/blog/working-with-arthritis-uk-rights", label: "Work rights" },
  { href: "/donate", label: "Donate" },
] as const;

const UKCoverageBand = memo(() => {
  return (
    <section
      aria-labelledby="uk-coverage-heading"
      className="bg-muted/40 border-y border-border/40 py-10 lg:py-12"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-6xl">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-primary mt-1 shrink-0" aria-hidden="true" />
          <div>
            <h2
              id="uk-coverage-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
            >
              Help for people across the United Kingdom
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
              Guides are written for NHS care, NICE advice, and benefits in
              England, Scotland, Wales and Northern Ireland — not for one town
              only.
            </p>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          Nations we write for
        </p>
        <ul className="flex flex-wrap gap-2 mb-6">
          {NATIONS.map((nation) => (
            <li
              key={nation}
              className="rounded-full bg-card border border-border px-4 py-2 text-sm font-semibold text-foreground"
            >
              {nation}
            </li>
          ))}
        </ul>

        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          Start with a UK guide
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LINKS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="flex min-h-11 items-center rounded-xl bg-card border border-border px-4 py-3 text-sm font-semibold text-foreground hover:border-primary/40 hover:shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

UKCoverageBand.displayName = "UKCoverageBand";
export default UKCoverageBand;
