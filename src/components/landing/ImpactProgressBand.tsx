/**
 * ImpactProgressBand — charity-style fundraising progress.
 * Animated £5,000 / £50,000 bar with CountUp on enter.
 * Inspired by Red Cross / Save the Children appeal pages.
 */
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/motion/CountUp";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { trackDonationClick } from "@/lib/ga-events";

const RAISED = 5000;
const GOAL = 50000;
const PCT = Math.round((RAISED / GOAL) * 100);

const ImpactProgressBand = () => {
  const navigate = useNavigate();

  const handleDonate = () => {
    trackDonationClick("impact_progress_band");
    navigate("/donate");
  };

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
            Help us reach our £50,000 research goal.
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Every pound funds clinically-reviewed guides, plain-English writing,
            and free resources for everyone in the UK living with arthritis.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={150} className="mt-12">
          {/* Progress meter */}
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
            <div
              role="progressbar"
              aria-valuenow={PCT}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`£${RAISED.toLocaleString()} raised of £${GOAL.toLocaleString()} goal`}
              className="h-full bg-primary rounded-full transition-[width] [transition-duration:2000ms] ease-out"
              style={{ width: `${PCT}%` }}
            />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-1">
                Raised
              </p>
              <p className="font-display text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                <CountUp end={RAISED} prefix="£" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-1">
                Goal
              </p>
              <p className="font-display text-3xl lg:text-4xl font-bold text-foreground/70 tracking-tight">
                £{GOAL.toLocaleString()}
              </p>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={300} className="mt-10 flex justify-center">
          <Button
            size="lg"
            onClick={handleDonate}
            className="h-[56px] px-10 rounded-full text-sm font-bold tracking-wider btn-primary-cta group"
          >
            <Heart className="w-4 h-4 mr-2 fill-white/20" aria-hidden="true" />
            Support this appeal
          </Button>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ImpactProgressBand;
