import { ArrowRight, MessageCircle, Heart, Shield, Award, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { heroLifestyle as heroImage, heroLifestyleSrcSet } from "@/data/images";

import "./HeroSection.css";

const Hero3DBackground = lazy(() => import("@/components/landing/Hero3DBackground"));

const STATS = [
  { target: 1, suffix: " in 6", label: "ukAdults", compact: false },
  { target: 100, suffix: "+", label: "types", compact: false },
  { target: 10000, suffix: "+", label: "supported", compact: true },
  { target: 97, suffix: "%", label: "wellbeing", compact: false },
] as const;

const HeroSection = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const trustBadges = [
    { icon: CheckCircle, label: t("hero.badgeNice") },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* 3D floating orbs background */}
      <Suspense fallback={null}>
        <Hero3DBackground />
      </Suspense>
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-gold/[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative">
        <div className="flex items-center py-14 sm:py-18 lg:py-16">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center w-full">
            {/* Left — Text */}
            <div className="hero-stagger text-center lg:text-left">

              <h1 className="hero-item text-[1.75rem] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] xl:text-[4rem] font-display font-bold text-foreground mb-5 sm:mb-6 leading-[1.08] tracking-tight text-balance">
                1 in 6 people in the UK{" "}
                <br className="hidden sm:block" />
                live with arthritis.{" "}
                <span className="text-gradient relative inline-block hero-underline italic">
                  We're here for every one of them.
                </span>
              </h1>

              <p className="hero-item text-[14px] sm:text-base md:text-lg text-muted-foreground leading-[1.75] sm:leading-[1.85] mb-3 max-w-[580px] mx-auto lg:mx-0">
                Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support — helping people across the United Kingdom manage arthritis pain and live fuller lives.
              </p>

              <p className="hero-item text-xs sm:text-sm text-primary/70 font-medium mb-6 sm:mb-8 flex items-center justify-center lg:justify-start gap-2">
                <Heart className="w-3.5 h-3.5 fill-primary/20 animate-pulse-soft" />
                Every donation helps us reach more people in need
              </p>

              <div className="hero-item flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/chat")}
                  className="btn-primary-cta px-8 sm:px-12 h-[48px] sm:h-[56px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider group active:scale-[0.97] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <MessageCircle className="w-4.5 h-4.5 mr-2 group-hover:scale-110 transition-transform" />
                  Get Free Support
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/donate")}
                  className="px-8 sm:px-10 h-[48px] sm:h-[56px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 group active:scale-[0.97]"
                >
                  <Heart className="w-4.5 h-4.5 mr-2 group-hover:scale-110 group-hover:fill-white/20 transition-all" />
                  Donate Now
                </Button>
              </div>

              {/* Trust badges with hover effect */}
              <div className="hero-item flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground/50 hover:text-primary/70 transition-colors duration-300 cursor-default">
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Hero Image with enhanced depth */}
            <div className="hero-item hidden lg:block relative">
              {/* Decorative ring behind image */}
              <div className="absolute -inset-4 rounded-3xl border border-primary/[0.06] pointer-events-none" />
              <div className="absolute -inset-8 rounded-3xl border border-primary/[0.03] pointer-events-none" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <img
                  src={heroImage}
                  srcSet={heroLifestyleSrcSet}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt="A woman doing gentle stretching exercises outdoors in a garden, representing active living with arthritis"
                  width={1280}
                  height={960}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>
              

            </div>
          </div>
        </div>

        {/* Stats row with enhanced dividers */}
        <div className="pb-12 lg:pb-16">
          <div className="w-full max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl border border-border/10 p-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
              {STATS.map((stat, i) => (
                <div key={i} className="relative text-center py-5 px-4 group hover:bg-primary/[0.02] rounded-xl transition-colors duration-300">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    className="stat-number text-2xl sm:text-3xl lg:text-[2.25rem] group-hover:text-primary transition-colors duration-300"
                  />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/60 font-medium mt-1.5 leading-snug tracking-[0.12em] uppercase">{stat.label}</p>
                  {i < STATS.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border/20 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/35 mt-4 text-center tracking-[0.15em] uppercase">
            Based on internal user feedback surveys, 2024–2025
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;