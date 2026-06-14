import { memo, useEffect, useState } from "react";
import { Heart, BookOpen, MapPin, X } from "lucide-react";
import { trackMobileBottomCTA } from "@/lib/ga-events";

const STORAGE_KEY = "lwa.mobileCta.dismissed";

/**
 * Mobile-only dual CTA bar pinned to the viewport bottom.
 * Hidden when the user dismisses, or when the inline donate
 * widget is in view (to avoid double-CTA noise).
 *
 * Sits ABOVE StickyDonateBar via z-index when both want to render;
 * StickyDonateBar already hides once #donate-inline is visible, so
 * in practice they cooperate.
 */
const MobileBottomCTA = memo(() => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const onScroll = () => setHidden(window.scrollY < 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setHidden(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden pointer-events-none">
      <div className="mx-3 mb-3 pointer-events-auto">
        <div className="relative rounded-2xl bg-background border border-border shadow-2xl p-2 flex gap-2">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center shadow-md"
          >
            <X className="w-3 h-3" aria-hidden="true" />
          </button>
          <a
            href="#donate-inline"
            onClick={() => trackMobileBottomCTA("donate")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs px-2"
          >
            <Heart className="w-4 h-4" aria-hidden="true" /> Donate
          </a>
          <a
            href="/conditions/osteoarthritis"
            onClick={() => trackMobileBottomCTA("start_reading")}
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-11 rounded-xl bg-foreground text-background font-bold text-xs px-2"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" /> Read
          </a>
          <a
            href="/arthritis-support"
            onClick={() => trackMobileBottomCTA("start_reading")}
            aria-label="Find local support"
            className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-11 rounded-xl bg-card text-foreground border border-border font-bold text-xs px-2"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" /> Support
          </a>
        </div>
      </div>
    </div>
  );
});

MobileBottomCTA.displayName = "MobileBottomCTA";
export default MobileBottomCTA;
