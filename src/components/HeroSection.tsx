import { ArrowRight, MessageCircle, Heart, Shield, Award, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo, lazy, Suspense, useEffect, useState } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
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

  const issueDate = new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

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
        <div className="py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* ── Left — Editorial copy (7 cols) ───────────────────── */}
            <div className="hero-stagger lg:col-span-7 text-center lg:text-left">

              <h1 className="hero-item font-display text-[2.5rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem] xl:text-[4.75rem] font-bold text-foreground mb-6 sm:mb-8 leading-[1.02] tracking-[-0.03em] text-balance pr-2">
                One in six.
                <br className="hidden sm:block" />
                <span className="italic font-normal text-primary">Every</span> one of them,
                <br className="hidden sm:block" />
                seen.
              </h1>

              <p className="hero-item text-[15px] sm:text-lg md:text-xl text-muted-foreground leading-[1.65] mb-6 max-w-[620px] mx-auto lg:mx-0 font-light">
                Free physiotherapy, anti-inflammatory nutrition, and clinician-built tools — for the ten million adults across the United Kingdom living with arthritis today.
              </p>

              <p className="hero-item text-xs sm:text-[13px] text-primary/80 font-medium mb-8 sm:mb-10 flex items-center justify-center lg:justify-start gap-2">
                <Heart className="w-3.5 h-3.5 fill-primary/20 animate-pulse-soft" aria-hidden="true" />
                Funded entirely by donations. Always free to use.
              </p>

              <div className="hero-item flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                <Button
                  size="lg"
                  onClick={() => navigate("/chat")}
                  className="btn-primary-cta px-8 sm:px-12 h-[48px] sm:h-[56px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider group active:scale-[0.97] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <MessageCircle className="w-4.5 h-4.5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Free Support
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

              {/* Trust badges */}
              <div className="hero-item flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-8 pt-6 border-t border-border/30">
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-muted-foreground/50">
                  Aligned with
                </span>
                {[
                  { icon: Shield, label: "NICE Guidance" },
                  { icon: CheckCircle, label: "HCPC Registered" },
                  { icon: Award, label: "CSP Accredited" },
                ].map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="flex items-center gap-1.5 text-muted-foreground/60 hover:text-primary/80 transition-colors duration-300 cursor-default"
                    >
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" aria-hidden="true" />
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] uppercase">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Right — Featured cover image (5 cols) ───────────── */}
            <div className="hero-item lg:col-span-5 hidden lg:block relative">
              {/* Editorial corner brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/40 pointer-events-none" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/40 pointer-events-none" aria-hidden="true" />

              <figure className="relative rounded-sm overflow-hidden shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.25)] aspect-[4/5] group">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${heroImageWebp800} 800w, ${heroImageWebp1200} 1200w, ${heroImageWebp1600} 1600w`}
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 42vw, 100vw"
                  />
                  <img
                    src={heroImageJpg1600}
                    alt="A diverse group of adults walking together outdoors, smiling — staying active with arthritis in a UK community walking group"
                    width={1600}
                    height={1067}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
                {/* Dark overlay for caption legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent" />

                {/* Editorial caption block */}
                <figcaption className="absolute inset-x-0 bottom-0 p-6 lg:p-8 text-background">
                  <p className="text-[9px] font-bold tracking-[0.32em] uppercase text-background/70 mb-2">
                    Cover Story · No. 01
                  </p>
                  <p className="font-display text-2xl lg:text-[1.75rem] leading-[1.15] tracking-tight">
                    "Movement isn't optional — it's the medicine."
                  </p>
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mt-3 text-background/60">
                    A community in motion · Manchester, 2026
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* ── Editorial stats strip ────────────────────────────────── */}
        <div className="pb-16 lg:pb-20">
          <div className="border-t border-b border-foreground/10">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  className={`relative text-center sm:text-left py-7 sm:py-9 px-5 sm:px-7 group hover:bg-primary/[0.02] transition-colors duration-300 ${
                    i < STATS.length - 1 ? "sm:border-r border-foreground/10" : ""
                  } ${i < 2 ? "border-b sm:border-b-0 border-foreground/10" : ""} ${
                    i % 2 === 0 ? "border-r sm:border-r" : ""
                  }`}
                >
                  <p className="text-[9px] font-bold tracking-[0.28em] uppercase text-primary/70 mb-2">
                    Fig. 0{i + 1}
                  </p>
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    className="stat-number font-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] tracking-[-0.03em] leading-none group-hover:text-primary transition-colors duration-300"
                  />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/70 font-medium mt-3 leading-snug tracking-[0.14em] uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/40 mt-5 text-center tracking-[0.22em] uppercase">
            Sources · Versus Arthritis · Internal user surveys 2024–2025
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;