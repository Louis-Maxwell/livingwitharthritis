import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Shield, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@/components/HeroSection.css";
import heroPortrait from "@/assets/hero-oa-portrait.jpg";

const TRUST = [
  "HCPC Registered Clinicians",
  "CSP Aligned",
  "NICE-Informed Guidance",
  "Open Source · Free Forever",
] as const;

const HERO_PORTRAIT = heroPortrait;

const OAHero = memo(() => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="oa-hero"
      className="relative overflow-hidden bg-background pt-16 sm:pt-24 lg:pt-32 pb-20 lg:pb-28 border-b border-border/40"
    >
      {/* Subtle crimson accents */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.025] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl relative hero-stagger">
        {/* Eyebrow */}
        <div className="hero-item flex items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.06] border border-primary/15">
            <GitBranch className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-primary">
              Open-Source Osteoarthritis Plan · v2026.1
            </span>
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Headline */}
          <div className="lg:col-span-7">
            <h1
              id="oa-hero"
              className="hero-item font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.25rem] font-bold tracking-[-0.03em] leading-[0.96] text-foreground text-balance"
            >
              We&apos;re open-sourcing the{" "}
              <span className="italic text-primary">management plan</span> for osteoarthritis.
            </h1>

            <p className="hero-item mt-8 lg:mt-10 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              8.75 million people in the UK live with osteoarthritis. The evidence to manage it
              well already exists — locked inside paywalled journals and 20-minute GP slots.
              We&apos;re unlocking it, in plain English, for everyone.
            </p>

            {/* CTAs */}
            <div className="hero-item mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/donate")}
                className="h-[58px] px-9 rounded-full text-sm font-bold tracking-wider btn-primary-cta group"
              >
                <Heart className="w-4 h-4 mr-2 fill-white/20" aria-hidden="true" />
                Fund the Mission
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/conditions/osteoarthritis")}
                className="h-[58px] px-9 rounded-full text-sm font-bold tracking-wider border-foreground/15 hover:bg-secondary/10"
              >
                Read the Open Plan
              </Button>
            </div>

            {/* Trust micro-row */}
            <ul className="hero-item mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[11px] sm:text-xs tracking-wide text-muted-foreground">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-primary/70" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Portrait + floating numbers card */}
          <aside className="hero-item lg:col-span-5 relative">
            {/* Crimson glow */}
            <div
              aria-hidden="true"
              className="hero-glow absolute -inset-6 rounded-[2rem] bg-primary/20 blur-3xl pointer-events-none"
            />

            <div className="hero-portrait relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl">
              <img
                src={HERO_PORTRAIT}
                sizes="(min-width: 1024px) 42vw, 100vw"
                alt="An older couple stretching together at home, smiling — living well with osteoarthritis."
                width={1000}
                height={1250}
                fetchPriority="high"
                decoding="async"
                loading="eager"
                className="w-full h-auto aspect-[4/5] object-cover"
              />

              {/* Bottom gradient + floating numbers card */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-foreground/85 via-foreground/40 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6 rounded-xl bg-background/95 backdrop-blur-md border border-border/60 p-5 sm:p-6 shadow-xl">
                <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary mb-4">
                  The Mission in Numbers
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-none">
                      8.75M
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                      UK adults with OA
                    </p>
                  </div>
                  <div className="border-x border-border/60 px-3">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-none">
                      £0
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                      Cost to the public
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight leading-none">
                      100%
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                      Donations → content
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
});

OAHero.displayName = "OAHero";
export default OAHero;
