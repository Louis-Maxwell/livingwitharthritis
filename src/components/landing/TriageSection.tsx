import { Link } from "react-router-dom";
import { Activity, Dumbbell, Apple, Hospital, ArrowRight } from "lucide-react";

/**
 * Above-the-fold triage widget — "What brings you here today?"
 * Routes visitors to the most relevant hub in one click to reduce bounce rate.
 */
const TRIAGE_OPTIONS = [
  {
    icon: Activity,
    label: "Pain & flare-ups",
    description: "What to do in the next 24 hours",
    to: "/arthritis-flare-ups",
  },
  {
    icon: Dumbbell,
    label: "Joint-safe exercise",
    description: "Routines for knees, hands & hips",
    to: "/exercises",
  },
  {
    icon: Apple,
    label: "Diet that works",
    description: "Mediterranean, anti-inflammatory",
    to: "/diet",
  },
  {
    icon: Hospital,
    label: "While you wait for the NHS",
    description: "Stay strong before your appointment",
    to: "/nhs-waiting-list-help",
  },
] as const;

export default function TriageSection() {
  return (
    <section
      aria-labelledby="triage-heading"
      className="border-y border-border/60 bg-secondary/30 py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            Skip the search · Go straight to help
          </p>
          <h2
            id="triage-heading"
            className="font-display text-2xl font-bold text-foreground md:text-3xl"
          >
            What do you need today?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {TRIAGE_OPTIONS.map(({ icon: Icon, label, description, to }) => (
            <Link
              key={to}
              to={to}
              className="group relative flex flex-col items-start rounded-2xl border border-border/60 bg-card p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium"
            >
              <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground md:text-lg">
                {label}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                {description}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-all group-hover:gap-1.5">
                Start here <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
