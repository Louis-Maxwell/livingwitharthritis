import { ArrowRight, MessageCircle, Heart, Shield, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { heroLifestyle as heroImage } from "@/data/images";

import "./HeroSection.css";

const STATS = [
  { target: 1, suffix: " in 6", label: "UK adults affected", compact: false },
  { target: 100, suffix: "+", label: "Types of arthritis", compact: false },
  { target: 10000, suffix: "+", label: "People supported", compact: true },
  { target: 97, suffix: "%", label: "Report improved wellbeing", compact: false },
] as const;

const trustBadges = [
  { icon: Shield, label: "HCPC Registered" },
  { icon: Award, label: "NHS Trained" },
  { icon: CheckCircle, label: "NICE Compliant" },
];

const HeroSection = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle top gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 relative">
        <div className="flex items-center min-h-[calc(100vh-100px)] py-20 sm:py-28 lg:py-0 pb-24 lg:pb-0">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-16 lg:gap-20 items-center w-full">
            {/* Left — Text */}
            <div className="hero-stagger text-center lg:text-left">
              <div className="hero-item flex justify-center lg:justify-start mb-8">
                <span className="premium-badge">
                  <Heart className="w-3 h-3 fill-primary/30" />
                  UK Arthritis Charity
                </span>
              </div>

              <h1 className="hero-item text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem] font-display font-bold text-foreground mb-8 leading-[1.04] tracking-tight text-balance">
                1 in 6 people in the UK{" "}
                <br className="hidden sm:block" />
                live with arthritis.{" "}
                <span className="text-gradient relative inline-block hero-underline italic">
                  We're here for every one of them.
                </span>
              </h1>

              <p className="hero-item text-[15px] sm:text-lg md:text-xl text-muted-foreground leading-[1.85] sm:leading-[1.9] mb-5 max-w-[620px] mx-auto lg:mx-0">
                Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support — helping people across the United Kingdom manage arthritis pain and live fuller lives.
              </p>

              <p className="hero-item text-sm text-primary/70 font-medium mb-10 flex items-center justify-center lg:justify-start gap-2">
                <Heart className="w-3.5 h-3.5 fill-primary/20" />
                Every donation helps us reach more people in need
              </p>

              <div className="hero-item flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/chat")}
                  className="btn-primary-cta px-10 sm:px-14 h-[58px] sm:h-[64px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider group active:scale-[0.97]"
                >
                  <MessageCircle className="w-5 h-5 mr-2.5 group-hover:scale-110 transition-transform" />
                  Get Free Support
                  <ArrowRight className="w-4 h-4 ml-2.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/donate")}
                  className="px-10 h-[58px] sm:h-[64px] rounded-full text-[13px] sm:text-sm font-bold tracking-wider border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 group active:scale-[0.97]"
                >
                  <Heart className="w-5 h-5 mr-2.5 group-hover:scale-110 group-hover:fill-white/20 transition-all" />
                  Donate Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="hero-item flex items-center justify-center lg:justify-start gap-6 mt-12">
                {trustBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <div key={badge.label} className="flex items-center gap-2 text-muted-foreground/50">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold tracking-[0.18em] uppercase">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Hero Image */}
            <div className="hero-item hidden lg:block relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="A woman doing gentle stretching exercises outdoors in a garden, representing active living with arthritis"
                  width={1280}
                  height={960}
                  className="w-full h-auto object-cover aspect-[4/3]"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-8 -left-8 bg-card border border-border/15 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
                <p className="stat-number text-3xl text-primary font-bold">10,000+</p>
                <p className="text-[10px] text-muted-foreground/60 font-medium tracking-[0.15em] uppercase mt-1.5">Lives Improved</p>
              </div>
              {/* Top-right floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-xl px-5 py-3 shadow-xl">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase">100% Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="pb-20 lg:pb-24">
          <div className="w-full max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
              {STATS.map((stat, i) => (
                <div key={i} className="relative text-center py-6 px-4">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    compact={stat.compact}
                    className="stat-number text-2xl sm:text-3xl lg:text-4xl"
                  />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground/60 font-medium mt-2 leading-snug tracking-[0.12em] uppercase">{stat.label}</p>
                  {i < STATS.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border/20 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[9px] text-muted-foreground/35 mt-6 text-center tracking-[0.15em] uppercase">
            Based on internal user feedback surveys, 2024–2025
          </p>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
