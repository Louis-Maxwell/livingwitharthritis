import { MessageCircle, ArrowRight, Heart, Users, Activity, ChevronDown, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./HeroSection.css";

const STATS = [
  { value: 30000000, display: "30M+", label: "People to support globally", suffix: "+" },
  { value: 100, display: "100+", label: "Types of arthritis covered", suffix: "+" },
  { value: 15000, display: "15K+", label: "Lives improved so far", suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const formatNumber = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
    return n.toString();
  };

  return (
    <div ref={ref} className="stat-number text-2xl sm:text-3xl lg:text-4xl">
      {formatNumber(count)}{suffix}
    </div>
  );
}

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden hero-gradient-bg">
      {/* Floating orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      
      {/* Decorative SVG shapes */}
      <svg className="absolute top-10 left-10 w-40 h-40 opacity-[0.04] pointer-events-none" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="80" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
        <circle cx="100" cy="100" r="60" stroke="hsl(var(--secondary))" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="100" r="40" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
      </svg>
      <svg className="absolute bottom-20 right-16 w-32 h-32 opacity-[0.04] pointer-events-none" viewBox="0 0 100 100">
        <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
      </svg>

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-24 lg:py-0">
          <div className="hero-stagger max-w-[820px] text-center">
            {/* Trust badge */}
            <div className="hero-item mb-10">
              <span className="premium-badge">
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by Healthcare Professionals Across the UK
              </span>
            </div>

            <h1 className="hero-item text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.75rem] font-extrabold text-foreground mb-8 leading-[1.06] tracking-tight text-balance">
              The future of{" "}
              <span className="text-gradient relative inline-block">
                arthritis care
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0 7 Q50 0 100 5 T200 3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              is here
            </h1>

            <p className="hero-item text-base sm:text-lg text-muted-foreground leading-[1.9] mb-12 max-w-[560px] mx-auto">
              World-class physiotherapy, personalised nutrition science, and AI-powered guidance — 
              completely free. Because everyone deserves expert arthritis support.
            </p>

            <div className="hero-item flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta px-10 h-[56px] rounded-full text-sm font-bold tracking-wide group"
              >
                <MessageCircle className="w-4 h-4 mr-2.5 group-hover:scale-110 transition-transform" />
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost-premium px-10 h-[56px] rounded-full text-sm group"
              >
                Explore What We Offer
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Animated stats */}
            <div className="hero-item mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {STATS.map((stat, i) => (
                <div key={i} className="hero-stat-card rounded-2xl px-4 py-5 text-center">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground font-medium mt-1.5 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="hero-item mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary fill-primary/20" />
                <span className="font-medium">100% Free</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary/60" />
                <span className="font-medium">NHS-Aligned</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary/60" />
                <span className="font-medium">HCPC & CSP Accredited</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 scroll-indicator hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase font-semibold">Discover</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;