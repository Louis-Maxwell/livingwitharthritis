import { ArrowRight, MessageCircle, Heart, Shield, Award, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo, lazy, Suspense, useEffect, useState } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MedicallyReviewed from "@/components/ui/MedicallyReviewed";
import heroImageWebp1600 from "@/assets/hero-walking-group-1600.webp";
import heroImageWebp1200 from "@/assets/hero-walking-group-1200.webp";
import heroImageWebp800 from "@/assets/hero-walking-group-800.webp";
import heroImageJpg1600 from "@/assets/hero-walking-group-1600.jpg";

import "./HeroSection.css";

// 3D canvas is desktop-only — heavy on mobile GPU and never visible there anyway
const Hero3DBackground = lazy(() => import("@/components/landing/Hero3DBackground"));

const STATS = [
  { target: 1, suffix: " in 6", label: "UK adults affected", compact: false },
  { target: 100, suffix: "+", label: "Types of arthritis", compact: false },
  { target: 10000, suffix: "+", label: "People supported", compact: true },
  { target: 97, suffix: "%", label: "Report improved wellbeing", compact: false },
] as const;

const HeroSection = memo(() => {
  const navigate = useNavigate();
  // Desktop-only flag controls heavy hero layers (3D canvas + giant blur orbs)
  // and conditionally preloads the hero image (mobile never renders it).
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // Desktop-only LCP preload. Uses the same imported asset bindings as the <picture>
  // below, so Vite's content hash is always in sync — discovery can never drift from render.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (!window.matchMedia?.("(min-width: 1024px)").matches) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.type = "image/webp";
    link.setAttribute(
      "imagesrcset",
      `${heroImageWebp800} 800w, ${heroImageWebp1200} 1200w, ${heroImageWebp1600} 1600w`,
    );
    link.setAttribute(
      "imagesizes",
      "(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw",
    );
    link.setAttribute("fetchpriority", "high");
    link.dataset.lcpPreload = "hero";
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  const trustBadges = [
    { icon: CheckCircle, label: "NICE Compliant" },
  ];

  return (
    <section className="relative overflow-hidden bg-mesh">
      {/* 3D floating orbs background — desktop only (skipped on mobile + reduced-motion) */}
      {isDesktop && (
        <Suspense fallback={null}>
          <Hero3DBackground />
        </Suspense>
      )}
      {/* Layered gradient background — lightweight, kept on all devices */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-gold/[0.02] pointer-events-none" />
      {/* Heavy 120px blur orbs — desktop only; mobile GPUs choke on these */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px] pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative">
        <div className="flex items-center py-20 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-center w-full">
            {/* Left — Text */}
            <div className="hero-stagger text-center lg:text-left">

              <h1 className="hero-item text-[2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem] font-display font-bold text-foreground mb-6 sm:mb-8 leading-[1.05] tracking-[-0.02em] text-balance">
                Arthritis support that actually{" "}
                <br className="hidden sm:block" />
                fits your week.{" "}
                <span className="text-gradient relative inline-block hero-underline italic">
                  Built with NHS clinicians.
                </span>
              </h1>

              <p className="hero-item text-[15px] sm:text-base md:text-lg text-muted-foreground leading-[1.7] mb-5 max-w-[560px] mx-auto lg:mx-0">
                Free virtual physiotherapy, anti-inflammatory meal plans and joint-safe exercise routines — designed by HCPC-registered physiotherapists and aligned to current NICE guidance. No waiting list. No upsell.
              </p>

              <p className="hero-item text-xs sm:text-[13px] text-primary/70 font-medium mb-8 sm:mb-10 flex items-center justify-center lg:justify-start gap-2">
                <Heart className="w-3.5 h-3.5 fill-primary/20 animate-pulse-soft" />
                Trusted by 10,000+ people across the UK · 4.9/5 from 2,400+ reviews
              </p>

              <div className="hero-item flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/chat")}
                  className="btn-primary-cta px-8 sm:px-12 h-[48px] sm:h-[56px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider group active:scale-[0.97] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <MessageCircle className="w-4.5 h-4.5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Free in 30 Seconds
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
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${heroImageWebp800} 800w, ${heroImageWebp1200} 1200w, ${heroImageWebp1600} 1600w`}
                    sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 100vw"
                  />
                  <img
                    src={heroImageJpg1600}
                    alt="A diverse group of adults walking together outdoors, smiling — staying active with arthritis in a UK community walking group"
                    width={1600}
                    height={1067}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>
              

            </div>
          </div>
        </div>

        {/* Stats row with enhanced dividers */}
        <div className="pb-16 lg:pb-20">
          <div className="w-full max-w-4xl mx-auto bg-card/40 backdrop-blur-sm rounded-2xl border border-border/10 p-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
              {STATS.map((stat, i) => (
                <div key={i} className="relative text-center py-6 px-4 group hover:bg-primary/[0.02] rounded-xl transition-colors duration-300">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    className="stat-number text-[1.75rem] sm:text-3xl lg:text-[2.5rem] tracking-[-0.02em] group-hover:text-primary transition-colors duration-300"
                  />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/60 font-medium mt-2 leading-snug tracking-[0.14em] uppercase">{stat.label}</p>
                  {i < STATS.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-border/20 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <MedicallyReviewed variant="compact" />
          </div>
          <p className="text-[9px] text-muted-foreground/35 mt-3 text-center tracking-[0.18em] uppercase">
            Stats based on internal user feedback surveys, 2024–2025
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;