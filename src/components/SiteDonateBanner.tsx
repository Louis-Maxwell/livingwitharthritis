import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";
import { trackDonationClick } from "@/lib/ga-events";

export const DONATE_BANNER_DISMISS_KEY = "lwa-donate-banner-dismissed";

/**
 * Slim, dismissible site-wide GoFundMe banner. Sits in normal page flow
 * (never overlays content). No goal amount or countdown: the goal can change
 * and we avoid pressure tactics. Dismissal is remembered on this device.
 */
const SiteDonateBanner = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DONATE_BANNER_DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DONATE_BANNER_DISMISS_KEY, "1");
    } catch {
      /* storage unavailable: hide for this visit only */
    }
  };

  return (
    <section
      aria-label="Donate to arthritis research"
      className="w-full border-b border-primary/20 bg-secondary text-secondary-foreground"
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-center gap-2 px-3 py-1.5 text-xs sm:gap-3 sm:text-sm">
        <Heart className="hidden h-4 w-4 shrink-0 sm:block" aria-hidden="true" />
        <p className="min-w-0 text-center leading-snug">
          Help fund arthritis research. Every £5 helps.{" "}
          <a
            href={GOFUNDME_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDonationClick({ source: "site_donate_banner", method: "gofundme" })}
            className="font-bold underline underline-offset-2 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Donate on GoFundMe
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss donation banner"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-background/20 focus-visible:outline focus-visible:outline-2"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default SiteDonateBanner;
