import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "lwa_update_banner_dismissed";

/**
 * Dismissible maintenance notice shown at the very top of every page
 * (first child of the sticky header wrapper). Uses the brand red
 * (bg-primary / text-primary-foreground) so it matches the existing
 * DonationQuickBar treatment. Persisted dismissal via localStorage so
 * returning visitors aren't bothered by it repeatedly.
 */
export default function SiteAnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true);

  // Read localStorage after mount to avoid SSR/prerender mismatches.
  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setDismissed(false);
    } catch {
      // localStorage unavailable — show the banner.
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — best effort.
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-primary text-primary-foreground w-full"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-center gap-3 py-2">
          <p className="text-xs sm:text-sm font-medium text-center leading-snug m-0">
            We're currently updating this website — please bear with us while
            we make improvements. You may notice changes as you browse.
          </p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss update notice"
            className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary-foreground/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-1 focus-visible:ring-offset-primary"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
