import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/components/HeroSection.css";

const OAHero = memo(() => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="oa-hero"
      className="relative w-full overflow-hidden bg-background h-[85vh] min-h-[640px] border-b border-border/40"
    >
      {/* Full-bleed portrait — AVIF/WebP/JPG with preload in index.html */}
      <picture>
        <source srcSet="/hero/oa.avif" type="image/avif" />
        <source srcSet="/hero/oa.webp" type="image/webp" />
        <img
          src="/hero/oa.jpg"
          alt="An older couple stretching together at home, smiling — living well with osteoarthritis."
          width={1600}
          height={1067}
          fetchPriority="high"
          decoding="async"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
      </picture>

      {/* Gradient scrim for legibility (left → transparent right) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-background via-background/85 lg:via-background/70 to-background/10 lg:to-transparent"
      />
      {/* Subtle bottom fade on mobile */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent lg:hidden"
      />

      {/* Content layer */}
      <div className="relative z-10 h-full container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl flex items-end lg:items-center pb-12 lg:pb-0 pt-24">
        <div className="max-w-2xl hero-stagger">
          {/* Headline */}
          <h1
            id="oa-hero"
            className="hero-item font-display text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-[-0.03em] leading-[0.98] text-foreground text-balance"
          >
            The UK's <span className="italic text-primary">clinically-reviewed</span> guide to living well with arthritis.
          </h1>


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
              asChild
              size="lg"
              variant="outline"
              className="h-[58px] px-9 rounded-full text-sm font-bold tracking-wider border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <a href="#donate-inline">Donate — keep it free</a>
            </Button>
          </div>

          {/* Trust ribbon — institutional credibility under CTAs */}
          <ul
            aria-label="Clinical alignment"
            className="hero-item mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70"
          >
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              HCPC-registered physiotherapists
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              CSP members
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
              Aligned with NICE guidance
            </li>
          </ul>

          <p className="hero-item mt-3 text-xs text-foreground/60">
            Learn about our{" "}
            <Link to="/editorial-standards" className="underline hover:no-underline font-medium text-foreground/80">
              medical review process and editorial standards
            </Link>
            .
          </p>

          {/* Popular right now — internal links to reduce bounce */}
          <nav
            aria-label="Popular guides"
            className="hero-item mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
          >
            <span className="text-foreground/60 font-medium">Popular:</span>
            <a href="/conditions/knee-arthritis" className="text-foreground font-semibold underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors">
              Knee exercises
            </a>
            <span aria-hidden="true" className="text-foreground/30">·</span>
            <a href="/diet" className="text-foreground font-semibold underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors">
              Anti-inflammatory diet
            </a>
            <span aria-hidden="true" className="text-foreground/30">·</span>
            <a href="/guides/arthritis-pain-relief" className="text-foreground font-semibold underline decoration-primary/40 underline-offset-4 hover:decoration-primary transition-colors">
              Pain-relief tips
            </a>
          </nav>
        </div>
      </div>

    </section>
  );
});

OAHero.displayName = "OAHero";
export default OAHero;
