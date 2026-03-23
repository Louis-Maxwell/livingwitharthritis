import { ArrowRight, Sparkles, ClipboardList, Dumbbell, Utensils, MessageCircle, Heart, Shield, Award, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

import "./HeroSection.css";

const STATS = [
  { target: 10000000, suffix: "+", label: "People with arthritis in the UK", compact: true },
  { target: 100, suffix: "+", label: "Types of arthritis covered", compact: false },
  { target: 50000, suffix: "+", label: "People supported to date", compact: true },
  { target: 97, suffix: "%", label: "Patient satisfaction rate", compact: false },
] as const;

/* User journey pathways */
const JourneyPaths = memo(({ navigate }: { navigate: (path: string) => void }) => (
  <div className="hero-item mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
    {[
      { icon: ClipboardList, label: "Track Symptoms", desc: "Pain journal", path: "/pain-journal", color: "text-amber-600 bg-amber-500/10 border-amber-200/50" },
      { icon: Dumbbell, label: "Joint Exercises", desc: "Physio-led", path: "/exercises", color: "text-primary bg-primary/10 border-primary/20" },
      { icon: Utensils, label: "Diet Plans", desc: "Anti-inflammatory", path: "/diet", color: "text-emerald-600 bg-emerald-500/10 border-emerald-200/50" },
      { icon: MessageCircle, label: "AI Assistant", desc: "24/7 support", path: "/chat", color: "text-violet-600 bg-violet-500/10 border-violet-200/50" },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <button
          key={item.label}
          onClick={() => navigate(item.path)}
          className={`journey-card group flex flex-col items-center gap-2.5 px-3 py-5 rounded-2xl border backdrop-blur-md bg-card/50 hover:bg-card/90 transition-all duration-400 cursor-pointer ${item.color}`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold text-foreground">{item.label}</span>
          <span className="text-[10px] text-muted-foreground leading-tight">{item.desc}</span>
        </button>
      );
    })}
  </div>
));
JourneyPaths.displayName = "JourneyPaths";

const HeroSection = memo(() => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden hero-gradient-bg">
      <div className="hero-noise" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-24 lg:py-0">
          <div className="hero-stagger max-w-[860px] text-center">
            
            <div className="hero-item flex items-center justify-center gap-2 mb-7">
              <span className="px-5 py-2 rounded-full text-xs font-bold bg-primary/6 text-primary border border-primary/12 tracking-wider uppercase inline-flex items-center gap-2">
                <Sparkles className="w-3 h-3" />
                The UK's most comprehensive arthritis platform
              </span>
            </div>

            <h1 className="hero-item text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-extrabold text-foreground mb-7 leading-[1.04] tracking-tight text-balance">
              World-class arthritis care,{" "}
              <span className="font-display text-gradient relative inline-block hero-underline italic">
                completely free
              </span>
            </h1>

            <p className="hero-item text-base sm:text-lg md:text-xl text-muted-foreground leading-[1.85] mb-10 max-w-[640px] mx-auto">
              Trusted by over 50,000 people across the UK. Track symptoms, manage flare-ups, access 
              personalised exercise programmes, anti-inflammatory nutrition plans, and 24/7 AI guidance 
              — backed by HCPC-registered physiotherapists and NHS clinical standards.
            </p>

            <div className="hero-item flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/pain-journal")}
                className="btn-primary-cta px-12 h-[58px] rounded-full text-sm font-bold tracking-wide group"
              >
                <ClipboardList className="w-4 h-4 mr-2.5 group-hover:scale-110 transition-transform" />
                Start Your Journey Free
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/chat")}
                className="btn-ghost-premium px-12 h-[58px] rounded-full text-sm group"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask Our AI Assistant
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            <JourneyPaths navigate={navigate} />

            {/* Animated stats — reuse shared AnimatedCounter */}
            <div className="hero-item mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
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
            <div className="hero-item mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
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
