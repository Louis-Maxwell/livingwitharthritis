import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/components/HeroSection.css";
import heroPortrait from "@/assets/hero-oa-portrait.jpg";

const OAHero = memo(() => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="oa-hero"
      className="relative w-full overflow-hidden bg-background h-[85vh] min-h-[640px] border-b border-border/40"
    >
      {/* Full-bleed portrait */}
      <img
        src={heroPortrait}
        alt="An older couple stretching together at home, smiling — living well with osteoarthritis."
        width={1600}
        height={1000}
        fetchPriority="high"
        decoding="async"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />

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
          {/* Eyebrow */}
          <div className="hero-item mb-8">
            <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-primary/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-primary">
                You are not alone · A gentle plan for living well
              </span>
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
            charity sharing kind, clinically-reviewed help — written in plain English,
            free for everyone living with arthritis in the UK.
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

          {/* Trust row */}
          <div className="hero-item mt-12 border-t border-border/50 pt-6">
            <p className="text-[10px] font-bold tracking-[0.24em] uppercase text-muted-foreground mb-3">
              Reviewed against trusted UK standards
            </p>
            <div className="flex items-center gap-8">
              {["HCPC", "CSP", "NICE"].map((mark) => (
                <span
                  key={mark}
                  className="text-xs font-black tracking-tight text-foreground/80"
                >
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating stats card (desktop only) */}
      <aside className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-background/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/60 w-56 p-2">
          <div className="rounded-2xl bg-background p-6">
            <p className="font-display text-4xl font-bold text-primary tracking-tight leading-none">
              8.75M
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.18em] mt-2">
              neighbours in the UK with arthritis
            </p>
          </div>
          <div className="p-6 border-t border-border/40">
            <p className="font-display text-3xl font-bold text-foreground tracking-tight leading-none">
              Free
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.18em] mt-2">
              for everyone, always
            </p>
          </div>
          <div className="p-6 border-t border-border/40">
            <p className="font-display text-3xl font-bold text-foreground tracking-tight leading-none">
              Kind
            </p>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.18em] mt-2">
              plain English, no jargon
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
});

OAHero.displayName = "OAHero";
export default OAHero;
