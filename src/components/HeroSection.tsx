import { ArrowRight, MessageCircle, Heart, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { heroLifestyle as heroImage } from "@/data/images";

import "./HeroSection.css";

const STATS = [
  { target: 1, suffix: " in 6", label: "UK adults affected", source: "Versus Arthritis, 2024", compact: false },
  { target: 100, suffix: "+", label: "Types of arthritis", source: "NHS, 2023", compact: false },
  { target: 10000, suffix: "+", label: "People supported*", source: "", compact: true },
  { target: 97, suffix: "%", label: "Report improved wellbeing*", source: "", compact: false },
] as const;

const trustBadges = [
  { icon: Shield, label: "HCPC Registered" },
  { icon: Award, label: "NHS Trained" },
  { icon: Heart, label: "NICE Compliant" },
];

const HeroSection = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.015] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-12 relative">
        <div className="flex items-center min-h-[calc(100vh-140px)] py-20 sm:py-28 lg:py-0 pb-28 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
            {/* Left — Text */}
            <div className="hero-stagger text-center lg:text-left">
              <div className="hero-item flex justify-center lg:justify-start mb-10">
                <span className="px-6 py-2.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/8 tracking-[0.3em] uppercase inline-flex items-center gap-2.5">
                  UK Arthritis Charity
                </span>
              </div>

              <h1 className="hero-item text-[1.85rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[3.75rem] font-bold text-foreground mb-7 leading-[1.06] tracking-tight text-balance">
                1 in 6 people in the UK{" "}
                <br className="hidden sm:block" />
                live with arthritis.{" "}
                <span className="font-display text-gradient relative inline-block hero-underline italic">
                  We're here for every one of them.
                </span>
              </h1>

              <p className="hero-item text-[15px] sm:text-lg md:text-xl text-muted-foreground leading-[1.8] sm:leading-[1.9] mb-6 max-w-[640px] mx-auto lg:mx-0">
                Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support — helping people across the United Kingdom manage arthritis pain and live fuller lives.
              </p>

              <p className="hero-item text-sm text-primary/80 font-medium mb-10 flex items-center justify-center lg:justify-start gap-2">
                <Heart className="w-3.5 h-3.5 fill-primary/20" />
                Every donation helps us reach more people in need
              </p>

              <div className="hero-item flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/chat")}
                  className="btn-primary-cta px-10 sm:px-14 h-[56px] sm:h-[62px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider group active:scale-[0.97]"
                >
                  <MessageCircle className="w-5 h-5 mr-2.5 group-hover:scale-110 transition-transform" />
                  Get Free Support
                  <ArrowRight className="w-4 h-4 ml-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/donate")}
                  className="px-10 h-[56px] sm:h-[62px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider border-2 border-foreground/15 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 group active:scale-[0.97]"
                >
                  <Heart className="w-5 h-5 mr-2.5 group-hover:scale-110 transition-transform" />
                  Donate Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="hero-item flex items-center justify-center lg:justify-start gap-5 mt-10">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex items-center gap-2 text-muted-foreground/60">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold tracking-[0.15em] uppercase">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="hero-item hidden lg:block relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="A woman doing gentle stretching exercises outdoors in a garden, representing active living with arthritis"
                  width={1280}
                  height={960}
                  className="w-full h-auto object-cover aspect-[4/3]"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border/20 rounded-2xl p-5 shadow-xl">
                <p className="stat-number text-2xl text-primary font-bold">10,000+</p>
                <p className="text-[10px] text-muted-foreground/70 font-medium tracking-wide uppercase mt-1">Lives Improved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="pb-16 lg:pb-20">
          <div className="flex flex-wrap items-center justify-center gap-0 max-w-2xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="flex items-center">
                <div className="px-6 sm:px-8 py-4 text-center">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    className="stat-number text-2xl sm:text-3xl lg:text-[2.75rem]"
                  />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/70 font-medium mt-2 leading-snug tracking-wide">{stat.label}</p>
                </div>
                {i < STATS.length - 1 && (
                  <div className="w-px h-12 bg-border/30 hidden sm:block" />
                )}
              </div>
            ))}
          </div>
          <p className="text-[9px] text-muted-foreground/40 mt-4 text-center tracking-wider">
            *Based on internal user feedback surveys, 2024–2025. Not independently audited.
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
