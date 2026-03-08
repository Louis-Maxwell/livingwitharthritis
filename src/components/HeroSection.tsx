import { MessageCircle, ArrowRight, Heart, Users, Activity, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./HeroSection.css";

const STATS = [
  { value: 30000000, display: "30M+", label: "Aiming to support globally", suffix: "+" },
  { value: 100, display: "100+", label: "Arthritis types", suffix: "+" },
  { value: 15000, display: "15K+", label: "People helped", suffix: "+" },
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
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
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
    <div ref={ref} className="stat-number text-2xl sm:text-3xl">
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

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-20 lg:py-0">
          <div className="hero-stagger max-w-[780px] text-center">
            {/* Trust badge */}
            <div className="hero-item mb-8">
              <span className="inline-flex items-center gap-2.5 bg-primary/[0.08] text-primary px-5 py-2.5 rounded-full text-xs font-bold tracking-wide border border-primary/10 shadow-sm">
                <Users className="w-3.5 h-3.5" />
                Aiming to Support Over 30 Million People Globally
              </span>
            </div>

            <h1 className="hero-item text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-foreground mb-7 leading-[1.08] tracking-tight">
              You're not alone in your{" "}
              <span className="text-gradient relative inline-block">
                arthritis journey
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0 7 Q50 0 100 5 T200 3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="hero-item text-base sm:text-lg text-muted-foreground leading-[1.85] mb-10 max-w-[540px] mx-auto">
              Free expert guidance, virtual physiotherapy, and a caring community — 
              everything you need to live better with arthritis, all in one place.
            </p>

            <div className="hero-item flex flex-col sm:flex-row justify-center gap-3.5">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta px-8 h-14 rounded-full text-sm font-bold tracking-wide group"
              >
                <MessageCircle className="w-4 h-4 mr-2.5 group-hover:scale-110 transition-transform" />
                Talk to Our AI Assistant
                <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 px-8 h-14 rounded-full text-sm font-semibold transition-all duration-300 group"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>

            {/* Animated stats */}
            <div className="hero-item mt-14 grid grid-cols-3 gap-3 max-w-md mx-auto">
              {STATS.map((stat, i) => (
                <div key={i} className="hero-stat-card rounded-2xl px-4 py-4 text-center">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="hero-item mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary fill-secondary" />
                <span>Free for everyone</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary/60" />
                <span>NHS-aligned care</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <span>HCPC & CSP accredited</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator hidden lg:flex flex-col items-center gap-2">
          <span className="text-[10px] text-muted-foreground/60 tracking-widest uppercase font-semibold">Scroll</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
