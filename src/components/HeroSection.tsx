import { ArrowRight, Sparkles, MessageCircle, Heart } from "lucide-react";
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
      {/* Single subtle gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-16 sm:py-24 lg:py-0 pb-24 lg:pb-0">
          <div className="hero-stagger max-w-[800px] text-center">
            
            {/* Badge */}
            <div className="hero-item flex justify-center mb-8">
              <span className="px-5 py-2 rounded-full text-xs font-bold bg-primary/6 text-primary border border-primary/12 tracking-wider uppercase inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                UK Arthritis Charity
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-item text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold text-foreground mb-5 leading-[1.08] tracking-tight text-balance">
              1 in 6 people in the UK live with arthritis.{" "}
              <span className="font-display text-gradient relative inline-block hero-underline italic">
                We're here for every one of them.
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-item text-sm sm:text-lg md:text-xl text-muted-foreground leading-[1.7] sm:leading-[1.85] mb-4 max-w-[620px] mx-auto">
              Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support — helping people across the UK manage arthritis pain and live fuller lives.
            </p>

            {/* Urgency */}
            <p className="hero-item text-sm text-primary font-semibold mb-10 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 fill-primary/30" />
              Every donation helps us reach more people in need
            </p>

            {/* Two CTAs */}
            <div className="hero-item flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta px-8 sm:px-12 h-14 sm:h-[60px] rounded-full text-[13px] sm:text-sm font-bold tracking-wide group active:scale-[0.97] hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2 sm:mr-2.5 group-hover:scale-110 transition-transform" />
                Get Free Support
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/donate")}
                className="px-8 sm:px-10 h-14 sm:h-[60px] rounded-full text-[13px] sm:text-sm font-bold tracking-wide border-2 border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 group active:scale-[0.97]"
              >
                <Heart className="w-5 h-5 mr-2 fill-current/20 group-hover:scale-110 transition-transform" />
                Donate Now
              </Button>
            </div>

            {/* Stats row — elegant with thin dividers */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-0 max-w-2xl mx-auto">
              {STATS.map((stat, i) => (
                <div key={i} className="flex items-center">
                  <div className="px-5 sm:px-7 py-3 text-center">
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      compact={stat.compact}
                      className="stat-number text-2xl sm:text-3xl lg:text-[2.5rem]"
                    />
                    <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mt-1.5 leading-snug">{stat.label}</p>
                  </div>
                  {i < STATS.length - 1 && (
                    <div className="w-px h-10 bg-border/40 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-[9px] text-muted-foreground/50 mt-3 text-center">
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
