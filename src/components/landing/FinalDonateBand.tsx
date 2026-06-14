/**
 * FinalDonateBand — closing black panel with dual donation CTAs.
 * Inspired by british-red-cross + save-the-children footer appeal bands.
 */
import { useNavigate } from "react-router-dom";
import { Heart, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { trackDonationClick } from "@/lib/ga-events";

const FinalDonateBand = () => {
  const navigate = useNavigate();

  const giveOnce = () => {
    trackDonationClick("final_band_once");
    navigate("/donate?type=once");
  };
  const giveMonthly = () => {
    trackDonationClick("final_band_monthly");
    navigate("/donate?type=monthly");
  };

  return (
    <section
      aria-labelledby="final-donate-heading"
      className="bg-foreground text-background py-24 lg:py-32"
    >
      <div className="container mx-auto max-w-5xl px-6 sm:px-8 lg:px-16">
        <RevealOnScroll className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary mb-6">
            Keep every guide free
          </p>
          <h2
            id="final-donate-heading"
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.025em] leading-[1.05] text-background mb-8"
          >
            Funded entirely by people <span className="italic">like you.</span>
          </h2>
          <p className="text-base lg:text-lg text-background/70 leading-relaxed max-w-2xl mx-auto">
            We don't sell ads. We don't take government funding. Every guide
            stays free because of small, regular gifts from readers across the UK.
          </p>
        </RevealOnScroll>

        <RevealOnScroll
          delay={150}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            onClick={giveMonthly}
            className="h-[58px] px-10 rounded-full text-sm font-bold tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 group"
          >
            <Repeat className="w-4 h-4 mr-2" aria-hidden="true" />
            Give monthly
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={giveOnce}
            className="h-[58px] px-10 rounded-full text-sm font-bold tracking-wider bg-transparent text-background border-background/30 hover:bg-background hover:text-foreground"
          >
            <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
            Give once
          </Button>
        </RevealOnScroll>

        <RevealOnScroll
          delay={300}
          className="mt-10 text-center text-[11px] uppercase tracking-[0.22em] text-background/50"
        >
          Gift Aid eligible · Secure card payment · UK charity
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default FinalDonateBand;
