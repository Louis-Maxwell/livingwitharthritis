import { memo, useEffect, useState } from "react";
import { LifeBuoy, Activity, Users, Heart, Mail, Sparkles } from "lucide-react";

const links = [
  { id: "find-help", label: "Find Help", icon: LifeBuoy },
  { id: "how-it-works", label: "How It Works", icon: Sparkles },
  { id: "services", label: "Services", icon: Activity },
  { id: "explore", label: "Explore", icon: Users },
  { id: "contact", label: "Contact", icon: Mail },
];

/**
 * Sticky pain-friendly quick-jump navigation.
 * - 48px+ tap targets for users with hand/wrist pain
 * - Honors prefers-reduced-motion
 * - Horizontally scrollable on mobile (single row, no wrap)
 */
const JumpNav = memo(() => {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Quick jump navigation"
      className={`sticky top-16 z-30 transition-shadow ${
        stuck ? "shadow-md bg-background/95 backdrop-blur" : "bg-background/80 backdrop-blur-sm"
      } border-y border-border/40`}
    >
      <div className="container mx-auto px-3 sm:px-6">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none]">
          <span className="hidden md:inline text-[11px] font-semibold tracking-[0.2em] text-muted-foreground/70 uppercase shrink-0 mr-2">
            Jump to
          </span>
          {links.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="shrink-0 inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-card hover:bg-primary hover:text-primary-foreground border border-border/60 text-sm font-semibold text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
            </button>
          ))}
          <a
            href="/chat"
            className="shrink-0 inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full btn-primary-cta text-sm font-bold ml-auto"
          >
            <Heart className="w-4 h-4" aria-hidden="true" />
            Talk to AI now
          </a>
        </div>
      </div>
    </nav>
  );
});

JumpNav.displayName = "JumpNav";
export default JumpNav;
