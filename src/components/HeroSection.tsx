import { ArrowRight, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

import "./HeroSection.css";

const STATS = [
  { target: 1, suffix: " in 6", label: "UK adults affected", source: "Versus Arthritis, 2024", compact: false },
  { target: 100, suffix: "+", label: "Types of arthritis", source: "NHS, 2023", compact: false },
  { target: 10000, suffix: "+", label: "People supported*", source: "", compact: true },
  { target: 97, suffix: "%", label: "Report improved wellbeing*", source: "", compact: false },
] as const;

const HeroSection = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle warm gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.015] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-12 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-20 sm:py-28 lg:py-0 pb-28 lg:pb-0">
          <div className="hero-stagger max-w-[860px] text-center">
            
            {/* Institutional badge */}
            <div className="hero-item flex justify-center mb-10">
              <span className="px-6 py-2.5 rounded-full text-[10px] font-bold bg-primary/5 text-primary border border-primary/8 tracking-[0.3em] uppercase inline-flex items-center gap-2.5">
                UK Arthritis Charity
              </span>
            </div>

            {/* Headline — cinematic, large, editorial */}
            <h1 className="hero-item text-[1.85rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.25rem] font-bold text-foreground mb-7 leading-[1.06] tracking-tight text-balance">
              1 in 6 people in the UK{" "}
              <br className="hidden sm:block" />
              live with arthritis.{" "}
              <span className="font-display text-gradient relative inline-block hero-underline italic">
                We're here for every one of them.
              </span>
            </h1>

            {/* Subtext — refined, generous */}
            <p className="hero-item text-[15px] sm:text-lg md:text-xl text-muted-foreground leading-[1.8] sm:leading-[1.9] mb-6 max-w-[640px] mx-auto">
              Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support — helping people across the United Kingdom manage arthritis pain and live fuller lives.
            </p>

            {/* Urgency — subtle */}
            <p className="hero-item text-sm text-primary/80 font-medium mb-12 flex items-center justify-center gap-2">
              <Heart className="w-3.5 h-3.5 fill-primary/20" />
              Every donation helps us reach more people in need
            </p>

            {/* Two CTAs — larger, more premium */}
            <div className="hero-item flex flex-col sm:flex-row justify-center gap-4">
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

            {/* Stats row — elegant, serif numbers */}
            <div className="mt-20 flex flex-wrap items-center justify-center gap-0 max-w-2xl mx-auto">
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
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
