import { ArrowRight, Sparkles, ClipboardList, Dumbbell, Utensils, MessageCircle, Heart, Shield, Award, Globe, ChevronDown, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

import "./HeroSection.css";

const STATS = [
  { target: 1, suffix: " in 6", label: "People in the UK affected", compact: false },
  { target: 100, suffix: "+", label: "Every type of arthritis covered", compact: false },
  { target: 10000, suffix: "+", label: "Lives improved so far", compact: true },
  { target: 97, suffix: "%", label: "Say we helped them", compact: false },
] as const;

/* Static trust badge */
const TrustBadge = memo(() => (
  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/8 border border-emerald-500/15 backdrop-blur-sm">
    <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
    <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
      Trusted by <span className="font-bold">50,000+</span> people across the UK
    </span>
  </div>
));
TrustBadge.displayName = "TrustBadge";

/* Patient quote */
const PatientQuote = memo(() => (
  <div className="hero-item mt-8 max-w-lg mx-auto">
    <div className="relative bg-card/40 backdrop-blur-md border border-border/20 rounded-2xl p-5 sm:p-6">
      <Quote className="absolute top-3 left-3 w-5 h-5 text-primary/20" />
      <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed pl-6">
        "After my diagnosis, I felt completely lost. This charity gave me the exercises, diet plans and support I needed to take control again."
      </p>
      <div className="mt-3 pl-6 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">SP</div>
        <div>
          <span className="text-xs font-semibold text-foreground">Sarah P.</span>
          <span className="text-[10px] text-muted-foreground ml-1.5">Birmingham, diagnosed with OA at 52</span>
        </div>
      </div>
    </div>
  </div>
));
PatientQuote.displayName = "PatientQuote";

const HeroSection = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden hero-gradient-bg">
      <div className="hero-noise" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-16 sm:py-24 lg:py-0 pb-24 lg:pb-0">
          <div className="hero-stagger max-w-[860px] text-center">
            
            {/* Social proof */}
            <div className="hero-item flex flex-col sm:flex-row items-center justify-center gap-3 mb-7">
              <span className="px-5 py-2 rounded-full text-xs font-bold bg-primary/6 text-primary border border-primary/12 tracking-wider uppercase inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                UK Arthritis Charity
              </span>
              <TrustBadge />
            </div>

            {/* Mission-first headline */}
            <h1 className="hero-item text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[4rem] font-extrabold text-foreground mb-4 sm:mb-5 leading-[1.1] sm:leading-[1.06] tracking-tight text-balance">
              1 in 6 people in the UK live with arthritis.{" "}
              <span className="font-display text-gradient relative inline-block hero-underline italic">
                We're here for every one of them.
              </span>
            </h1>

            {/* Mission statement */}
            <p className="hero-item text-sm sm:text-lg md:text-xl text-muted-foreground leading-[1.7] sm:leading-[1.85] mb-3 sm:mb-4 max-w-[640px] mx-auto">
              We provide free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support to help people across the UK manage arthritis pain and live fuller lives.
            </p>

            {/* Urgency line */}
            <p className="hero-item text-sm text-primary font-semibold mb-8 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-primary/30" />
              Every donation helps us reach more people in need
            </p>

            {/* Two CTAs: Get Support + Donate */}
            <div className="hero-item flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta hero-cta-pulse px-8 sm:px-12 h-14 sm:h-[62px] rounded-full text-[13px] sm:text-sm font-bold tracking-wide group active:scale-[0.97]"
              >
                <MessageCircle className="w-5 h-5 mr-2 sm:mr-2.5 group-hover:scale-110 transition-transform" />
                Get Free Support
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/zakat-appeal")}
                className="px-8 sm:px-10 h-14 sm:h-[62px] rounded-full text-[13px] sm:text-sm font-bold tracking-wide border-2 border-[hsl(0,72%,51%)]/30 text-[hsl(0,72%,51%)] hover:bg-[hsl(0,72%,51%)] hover:text-white transition-all duration-300 group active:scale-[0.97]"
              >
                <Heart className="w-5 h-5 mr-2 fill-current/20 group-hover:scale-110 transition-transform" />
                Donate Now
              </Button>
            </div>

            {/* Patient quote */}
            <PatientQuote />

            {/* Animated stats — reframed for emotional resonance */}
            <div className="hero-item mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {STATS.map((stat, i) => (
                <div key={i} className="hero-stat-card rounded-2xl px-3 py-5 text-center">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    className="stat-number text-2xl sm:text-3xl lg:text-4xl"
                  />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mt-2 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="hero-item mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/4 border border-primary/8 backdrop-blur-sm">
                <Heart className="w-4 h-4 text-primary fill-primary/20" />
                <span className="font-semibold text-foreground text-xs">100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald/4 border border-emerald/8 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-emerald" />
                <span className="font-semibold text-foreground text-xs">NHS & NICE Aligned</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky/4 border border-sky/8 backdrop-blur-sm">
                <Award className="w-4 h-4 text-sky" />
                <span className="font-semibold text-foreground text-xs">HCPC & CSP Registered</span>
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet/4 border border-violet/8 backdrop-blur-sm">
                <Globe className="w-4 h-4 text-violet" />
                <span className="font-semibold text-foreground text-xs">Serving All UK Nations</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] text-muted-foreground/40 tracking-[0.25em] uppercase font-semibold">Discover</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground/25" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
