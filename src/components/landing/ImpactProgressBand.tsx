/**
 * ImpactProgressBand — Arthritis Research Fund appeal.
 *
 * Deliberately shows NO hard-coded "raised" total or progress meter: a static
 * number goes stale the moment someone donates. The live total lives on the
 * GoFundMe page, so we link there instead of repeating a figure.
 */
import { ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { trackDonationClick } from "@/lib/ga-events";
import { GOFUNDME_URL } from "@/components/landing/homeJobs";

const ImpactProgressBand = () => {
  return (
    <section
      aria-labelledby="impact-progress-heading"
      className="bg-background py-20 lg:py-28 border-y border-border/40"
    >
      <div className="container mx-auto max-w-4xl px-6 sm:px-8 lg:px-16">
        <RevealOnScroll className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-4">
            Arthritis Research Fund · 2026 Appeal
          </p>
          <h2
            id="impact-progress-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-foreground mb-6"
          >
            Help us fund arthritis research.
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Every pound funds clinically reviewed guides, plain-English writing
            and free resources for everyone in the UK living with arthritis.
            You can see the live total and every update on our GoFundMe page.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={150} className="mt-10 flex flex-col items-center gap-5">
          <p className="text-base lg:text-lg text-foreground leading-relaxed max-w-xl text-center">
            Living with arthritis is hard. A gift to the Arthritis Research Fund helps us keep free guides and support going.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-[56px] px-10 rounded-full text-sm font-bold tracking-wider btn-primary-cta group"
            >
              <a
                href={GOFUNDME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDonationClick("impact_progress_band_gofundme")}
              >
                <Heart className="w-4 h-4 mr-2 fill-white/20" aria-hidden="true" />
                Donate on GoFundMe
                <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-[56px] px-8 rounded-full text-sm font-bold tracking-wider"
            >
              <a
                href={GOFUNDME_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDonationClick("impact_progress_band")}
              >
                Give on GoFundMe
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Button>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ImpactProgressBand;
