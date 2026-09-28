import { memo, useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { trackDonationClick } from "@/lib/ga-events";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";

/**
 * Sticky donate bar for the Arthritis Research Fund appeal.
 * Shows on mobile (bottom) and desktop (bottom-right card) once the user
 * scrolls past the hero, and hides when the inline donate widget is in view.
 *
 * No hard-coded "raised" total or progress meter: a static figure goes stale
 * as soon as someone donates. The live total is on the GoFundMe page.
 */

const StickyDonateBar = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("donate-inline");

    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let io: IntersectionObserver | undefined;
    if (target) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(false);
        },
        { threshold: 0.2 },
      );
      io.observe(target);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const handleClick = () => {
    trackDonationClick();
    const target = document.getElementById("donate-inline");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/donate";
    }
  };

  return (
    <>
      {/* Mobile — bottom bar */}
      <div
        {...(!visible ? { inert: "" as unknown as undefined } : {})}
        className={`fixed inset-x-0 z-50 lg:hidden transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full pointer-events-none"
        }`}
        style={{ bottom: "calc(var(--mobile-bottom-nav, 68px) + env(safe-area-inset-bottom, 0px) + 5.75rem)" }}
      >
        <div className="mx-3 mb-2 rounded-2xl bg-foreground text-background shadow-2xl border border-background/10 overflow-hidden max-w-full">
          <button
            type="button"
            onClick={handleClick}
            className="w-full text-left px-5 pt-3 pb-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <Heart className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
              Help fund arthritis research
            </span>
            <span className="mt-1 block text-xs text-background/80 font-medium">
              Donate now to support free arthritis help and research
            </span>
          </button>
        </div>
      </div>

      {/* Desktop — bottom-right card */}
      <div
        {...(!visible ? { inert: "" as unknown as undefined } : {})}
        className={`hidden lg:flex flex-col items-end gap-2 fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <a
          href="https://register-of-charities.charitycommission.gov.uk/charity-search?search=1218461"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-background border border-border shadow-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/70 hover:text-primary hover:border-primary/40 transition-colors"
        >
          Registered Charity <span className="text-foreground">No. 1218461</span>
        </a>
        <div className="w-[320px] rounded-2xl bg-background border border-border shadow-2xl overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 fill-primary text-primary" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                Arthritis Research Fund
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground leading-snug mb-3">
              Help us fund critical arthritis research
            </p>
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-primary underline underline-offset-2"
            >
              See the live total on GoFundMe
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              onClick={handleClick}
              className="mt-4 w-full min-h-11 rounded-full bg-primary text-primary-foreground font-bold text-sm tracking-wide shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:bg-primary/95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Donate now
            </button>
          </div>
        </div>
      </div>
    </>
  );
});

StickyDonateBar.displayName = "StickyDonateBar";
export default StickyDonateBar;
