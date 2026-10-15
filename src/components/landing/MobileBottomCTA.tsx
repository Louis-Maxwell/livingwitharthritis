import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, BookOpen, Wallet, X } from "lucide-react";
import { trackMobileBottomCTA } from "@/lib/ga-events";

const STORAGE_KEY = "lwa.mobileCta.dismissed";

/**
 * Mobile-only help-first CTA bar pinned near the viewport bottom.
 * Help pathways outrank donate (customer-first). Dismissible per session.
 */
const MobileBottomCTA = memo(() => {
  const [hidden, setHidden] = useState(true);
  const dismissed = useRef(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        dismissed.current = true;
        return;
      }
    } catch {
      /* ignore */
    }
    const onScroll = () => setHidden(dismissed.current || window.scrollY < 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    dismissed.current = true;
    setHidden(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (hidden) return null;

  return (
    <div
      className="fixed inset-x-0 z-40 lg:hidden pointer-events-none"
      style={{ bottom: "calc(var(--mobile-bottom-nav, 68px) + env(safe-area-inset-bottom, 0px) + 0.5rem)" }}
    >
      <div className="mx-3 mb-2 pointer-events-auto max-w-full">
        <div className="relative rounded-2xl bg-background border border-border shadow-2xl p-2 flex gap-2">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute -top-2 -right-2 min-h-11 min-w-11 w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center shadow-md"
          >
            <X className="w-3 h-3" aria-hidden="true" />
          </button>
          <Link
            to="/guides/arthritis-pain-relief"
            onClick={() => trackMobileBottomCTA("pain_relief")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs px-2"
          >
            <HeartPulse className="w-4 h-4" aria-hidden="true" /> Relief
          </Link>
          <Link
            to="/guides/newly-diagnosed"
            onClick={() => trackMobileBottomCTA("newly_diagnosed")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-11 rounded-xl bg-foreground text-background font-bold text-xs px-2"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" /> New
          </Link>
          <Link
            to="/guides/benefits-pip"
            onClick={() => trackMobileBottomCTA("benefits")}
            aria-label="Money and benefits including PIP"
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-11 rounded-xl bg-card text-foreground border border-border font-bold text-xs px-2"
          >
            <Wallet className="w-4 h-4" aria-hidden="true" /> PIP
          </Link>
        </div>
      </div>
    </div>
  );
});

MobileBottomCTA.displayName = "MobileBottomCTA";
export default MobileBottomCTA;
