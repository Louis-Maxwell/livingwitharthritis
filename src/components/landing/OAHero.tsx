import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart, Shield, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST = [
  "HCPC Registered Clinicians",
  "CSP Aligned",
  "NICE-Informed Guidance",
  "Open Source · Free Forever",
] as const;

const OAHero = memo(() => {
  const navigate = useNavigate();

  return (
    <section
      aria-labelledby="oa-hero"
      className="relative overflow-hidden bg-background pt-16 sm:pt-24 lg:pt-32 pb-20 lg:pb-28 border-b border-border/40"
    >
      {/* Subtle crimson accent */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.025] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-7xl bg-[#ff0000] relative">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.06] border border-primary/15">
            <GitBranch className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] uppercase text-primary">
              Open-Source Osteoarthritis Plan · v2026.1
            </span>
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Headline */}
          <div className="lg:col-span-8">
            <h1
              id="oa-hero"
              className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold tracking-[-0.03em] leading-[0.96] text-white text-balance"
            >
              We&apos;re open-sourcing the{" "}
              <span className="italic text-white/90">management plan</span> for osteoarthritis.
            </h1>

            <p className="mt-8 lg:mt-10 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              8.75 million people in the UK live with osteoarthritis. The evidence to manage it
              well already exists — locked inside paywalled journals and 20-minute GP slots.
              We&apos;re unlocking it, in plain English, for everyone.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                className="h-[58px] px-9 rounded-full text-sm font-bold tracking-wider border-foreground/15 hover:bg-secondary/60"
              >
                Read the Open Plan
              </Button>
            </div>

            {/* Trust micro-row */}
            <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[11px] sm:text-xs tracking-wide text-muted-foreground">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-primary/70" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: institutional impact card */}
          <aside className="lg:col-span-4 lg:pt-4">
            <div className="bg-card border border-border/60 rounded-2xl p-8 shadow-xl">
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-primary mb-6">
                The Mission in Numbers
              </p>

              <div className="space-y-7">
                <div className="pb-6 border-b border-border/50">
                  <p className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-none">
                    8.75M
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    UK adults living with osteoarthritis today
                  </p>
                </div>

                <div className="pb-6 border-b border-border/50">
                  <p className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-none">
                    £0
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    What our plan costs the people who need it
                  </p>
                </div>

                <div>
                  <p className="font-display text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-none">
                    100%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Of donations fund free clinical content
                  </p>
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
