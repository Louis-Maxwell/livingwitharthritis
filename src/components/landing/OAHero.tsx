import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/components/HeroSection.css";
import heroGroup from "@/assets/hero-oa-group.jpg";

const OAHero = memo(() => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="oa-hero"
      className="relative w-full overflow-hidden bg-background h-[85vh] min-h-[640px] border-b border-border/40"
    >
      {/* Full-bleed group portrait */}
      <img
        src={heroGroup}
        alt="A diverse group of older adults — Black, South Asian, East Asian and White — smiling and supporting each other in a sunlit community hall."
        width={1600}
        height={1000}
        fetchPriority="high"
        decoding="async"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 35%" }}
      />

      {/* Gradient scrim for legibility (left → softer right so faces stay visible) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-background via-background/80 lg:via-background/55 to-background/10 lg:to-transparent"
      />
      {/* Subtle bottom fade on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent lg:hidden"
      />

      {/* Content layer */}
      <div className="relative z-10 h-full container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl flex items-end lg:items-center pb-12 lg:pb-0 pt-24">
        <div className="max-w-2xl hero-stagger">
          {/* Charity chip */}
          <div className="hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-5">
            <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              UK arthritis charity · Free for everyone
            </span>
          </div>

          {/* Headline */}
          <h1
            id="oa-hero"
            className="hero-item font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.98] text-foreground text-balance"
          >
            Sore joints, stiff mornings,{" "}
            <span className="italic text-primary">brighter days</span> ahead.
          </h1>

          <p className="hero-item mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Arthritis can feel lonely. It doesn&apos;t have to be. We&apos;re a small
            UK charity sharing kind, clinically-reviewed help — written in plain
            English, free for everyone living with arthritis.
          </p>

          {/* CTAs */}
          <div className="hero-item mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/conditions/osteoarthritis")}
              className="h-[58px] px-9 rounded-full text-sm font-bold tracking-wider btn-primary-cta group"
            >
              <Heart className="w-4 h-4 mr-2 fill-white/20" aria-hidden="true" />
              Start your gentle plan
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/donate")}
              className="h-[58px] px-9 rounded-full text-sm font-bold tracking-wider border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              Help us keep it free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});

OAHero.displayName = "OAHero";
export default OAHero;
