import { memo, useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClipboardCheck, Dumbbell, Stethoscope, Salad, HeartHandshake, Sparkles, X, ArrowRight } from "lucide-react";

type Action = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

type StepConfig = {
  eyebrow: string;
  primary: Action;
  secondary?: Action;
};

// Hidden on these paths to avoid clutter on transactional/admin flows
const HIDDEN_PREFIXES = ["/auth", "/admin", "/donation-result", "/unsubscribe", "/chat"];

const titleCase = (s: string) =>
  s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function getStepConfig(pathname: string): StepConfig | null {
  // City + condition page: /arthritis-support/:city/:condition
  const cityCondition = pathname.match(/^\/arthritis-support\/([^/]+)\/([^/]+)\/?$/);
  if (cityCondition) {
    const [, city, condition] = cityCondition;
    return {
      eyebrow: `${titleCase(condition)} in ${titleCase(city)}`,
      primary: { label: "Check the health service wait time", href: "/tools/waiting-time", Icon: Stethoscope },
      secondary: { label: "Symptom quiz", href: "/self-help", Icon: ClipboardCheck },
    };
  }

  // City page: /arthritis-support/:city
  const cityOnly = pathname.match(/^\/arthritis-support\/([^/]+)\/?$/);
  if (cityOnly) {
    return {
      eyebrow: `Help in ${titleCase(cityOnly[1])}`,
      primary: { label: "Find local healthcare help", href: "/arthritis-waiting-list-help", Icon: Stethoscope },
      secondary: { label: "Take symptom quiz", href: "/self-help", Icon: ClipboardCheck },
    };
  }

  // Condition pages
  if (pathname.startsWith("/conditions/")) {
    return {
      eyebrow: "Take the next step",
      primary: { label: "Try the symptom quiz", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Joint exercises", href: "/exercises", Icon: Dumbbell },
    };
  }

  // Exercise hub & joint pages
  if (pathname === "/exercises" || pathname.startsWith("/exercises/")) {
    return {
      eyebrow: "Build your routine",
      primary: { label: "Get exercise plan", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Anti-inflammatory diet", href: "/diet", Icon: Salad },
    };
  }

  // Diet pages
  if (pathname === "/diet" || pathname === "/guides/diet") {
    return {
      eyebrow: "Reduce inflammation",
      primary: { label: "Find local healthcare help", href: "/arthritis-waiting-list-help", Icon: Stethoscope },
      secondary: { label: "Symptom quiz", href: "/self-help", Icon: ClipboardCheck },
    };
  }

  // Blog post / category
  if (pathname.startsWith("/blog/")) {
    return {
      eyebrow: "From this article",
      primary: { label: "Try the symptom quiz", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Local healthcare help", href: "/arthritis-waiting-list-help", Icon: Stethoscope },
    };
  }

  if (pathname === "/blog") {
    return {
      eyebrow: "Where to next?",
      primary: { label: "Symptom quiz", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Joint exercises", href: "/exercises", Icon: Dumbbell },
    };
  }

  // the health service pages
  if (pathname === "/arthritis-waiting-list-help" || pathname === "/tools/waiting-time") {
    return {
      eyebrow: "While you wait",
      primary: { label: "Try the symptom quiz", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Joint exercises", href: "/exercises", Icon: Dumbbell },
    };
  }

  // Self-help / health tools
  if (pathname === "/self-help" || pathname === "/health-tools") {
    return {
      eyebrow: "Keep going",
      primary: { label: "Joint exercises", href: "/exercises", Icon: Dumbbell },
      secondary: { label: "Local healthcare help", href: "/arthritis-waiting-list-help", Icon: Stethoscope },
    };
  }

  // Donate / ways to help
  if (pathname.startsWith("/donate") || pathname === "/zakat-appeal" || pathname === "/ways-to-help") {
    return {
      eyebrow: "Support our mission",
      primary: { label: "Donate now", href: "/donate", Icon: HeartHandshake },
      secondary: { label: "Other ways to help", href: "/ways-to-help", Icon: Sparkles },
    };
  }

  // Pillar guides
  if (pathname.startsWith("/guides/")) {
    return {
      eyebrow: "Take action",
      primary: { label: "Symptom quiz", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Local healthcare help", href: "/arthritis-waiting-list-help", Icon: Stethoscope },
    };
  }

  // Home & arthritis-support index
  if (pathname === "/" || pathname === "/arthritis-support") {
    return {
      eyebrow: "Get started in 30 seconds",
      primary: { label: "Take the symptom quiz", href: "/self-help", Icon: ClipboardCheck },
      secondary: { label: "Joint exercises", href: "/exercises", Icon: Dumbbell },
    };
  }

  // Sensible default for any other content page
  return {
    eyebrow: "Take the next step",
    primary: { label: "Symptom quiz", href: "/self-help", Icon: ClipboardCheck },
    secondary: { label: "Local healthcare help", href: "/arthritis-waiting-list-help", Icon: Stethoscope },
  };
}

const DISMISS_KEY = "nextStepBar:dismissedAt";
const DISMISS_HOURS = 12;

const MobileNextStepBar = memo(() => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const ts = parseInt(raw, 10);
        if (Date.now() - ts < DISMISS_HOURS * 60 * 60 * 1000) {
          setDismissed(true);
          return;
        }
      }
      setDismissed(false);
    } catch {
      setDismissed(false);
    }
  }, [pathname]);

  const config = useMemo(() => getStepConfig(pathname), [pathname]);
  const hidden = HIDDEN_PREFIXES.some((p) => pathname.startsWith(p));

  if (hidden || !config || dismissed) return null;

  const handleDismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* ignore */ }
    setDismissed(true);
  };

  const { primary, secondary, eyebrow } = config;

  return (
    <div
      className="fixed inset-x-0 z-[70] lg:hidden pointer-events-none"
      style={{ bottom: "calc(68px + env(safe-area-inset-bottom, 0px))" }}
      aria-label="Suggested next step"
    >
      <div className="mx-2 mb-2 pointer-events-auto">
        <div className="rounded-2xl border border-border/40 bg-card/95 backdrop-blur-xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 pt-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
              {eyebrow}
            </span>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss"
              className="p-1 -mr-1 text-muted-foreground hover:text-foreground active:scale-95 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-stretch gap-2 px-2 pb-2 pt-1.5">
            <button
              type="button"
              onClick={() => navigate(primary.href)}
              className="flex-[2] min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold px-3 active:scale-[0.98] transition"
            >
              <primary.Icon className="w-4 h-4" />
              <span className="truncate">{primary.label}</span>
              <ArrowRight className="w-3.5 h-3.5 opacity-80" />
            </button>
            {secondary && (
              <button
                type="button"
                onClick={() => navigate(secondary.href)}
                className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold px-2 active:scale-[0.98] transition"
              >
                <secondary.Icon className="w-3.5 h-3.5" />
                <span className="truncate">{secondary.label}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

MobileNextStepBar.displayName = "MobileNextStepBar";
export default MobileNextStepBar;
