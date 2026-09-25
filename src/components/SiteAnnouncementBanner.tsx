/**
 * SiteAnnouncementBanner
 *
 * Dismissible top-of-page banner announcing the website is currently being
 * updated. Sits inside the sticky header wrapper so it inherits the header's
 * hide-on-scroll behaviour. Persists dismissal in localStorage so returning
 * visitors aren't repeatedly interrupted.
 *
 * Design: high-contrast brand-red band, subtle pulsing dot, slide/fade-in on
 * mount — "popping" enough to draw the eye without disrupting layout.
 */
import { useState } from "react";
import { X, Sparkles } from "lucide-react";

const DISMISS_KEY = "lwa_update_banner_dismissed";

const SiteAnnouncementBanner = () => {
  // Read the dismissal flag synchronously on the first render. Showing the
  // banner from a post-mount effect inserted it above <main> one frame after
  // first paint — a ~150px layout shift on phones (Lighthouse CLS > 0.1 on
  // every page). The app is client-rendered (createRoot), so there is no
  // hydration mismatch to guard against.
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      // localStorage unavailable — show banner.
      return false;
    }
  });

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore — non-critical persistence.
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-primary text-primary-foreground animate-fade-in-up border-b border-primary-foreground/20"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-center gap-2 py-2 relative">
        <Sparkles
          className="w-4 h-4 shrink-0 animate-pulse-soft"
          aria-hidden="true"
        />
        <p className="text-xs sm:text-sm font-medium text-center pr-6 sm:pr-0">
          We're currently updating this website — please bear with us while
          we make improvements. You may notice changes as you browse.
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss update notice"
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-primary-foreground/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default SiteAnnouncementBanner;
