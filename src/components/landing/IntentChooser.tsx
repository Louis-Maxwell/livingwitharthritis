import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Clock4, HeartHandshake } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * IntentChooser
 *
 * Three-chip "What do you need today?" surface placed under the hero.
 * Each chip routes to a deep, content-rich destination so a single-screen
 * mobile visitor still triggers a second pageview — directly attacking
 * the 91% bounce / 1.17 pages-per-visit baseline.
 *
 * Anchored as <nav> for landmark navigation; chips are 48px+ for tap accessibility.
 */
const CHOICES = [
  {
    id: "pain-now",
    label: "I'm in pain now",
    sub: "Self-help in 2 minutes",
    icon: Activity,
    to: "/self-help",
    chip: "bg-primary text-primary-foreground",
  },
  {
    id: "nhs-wait",
    label: "Stuck on the health service wait list",
    sub: "Help while you wait",
    icon: Clock4,
    to: "/arthritis-waiting-list-help",
    chip: "bg-[hsl(var(--sky))] text-white",
  },
  {
    id: "support",
    label: "Just want support",
    sub: "Free physio & community",
    icon: HeartHandshake,
    to: "/services",
    chip: "bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))]",
  },
] as const;

const IntentChooser = memo(() => {
  const navigate = useNavigate();

  return (
    <nav
      aria-label="What do you need today"
      className="bg-background border-y border-border/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-3 text-center sm:text-left">
          What do you need today?
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {CHOICES.map(({ id, label, sub, icon: Icon, to, chip }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => {
                  trackEvent("intent_chooser_click", { intent: id, to });
                  navigate(to);
                }}
                className="group w-full min-h-[56px] flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:border-foreground/20 hover:shadow-medium hover:-translate-y-0.5 transition-all text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`${label} — ${sub}`}
              >
                <span className={`inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-full ${chip} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-foreground truncate">
                    {label}
                  </span>
                  <span className="block text-[12px] text-muted-foreground truncate">
                    {sub}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

IntentChooser.displayName = "IntentChooser";
export default IntentChooser;
