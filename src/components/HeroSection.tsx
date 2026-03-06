import { MessageCircle, ArrowRight, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-primary/[0.03]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.04]" />

      <div className="container mx-auto px-6 md:px-10 relative">
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] py-20 lg:py-0">
          <div className="hero-stagger max-w-[740px] text-center">
            {/* Trust badge */}
            <div className="hero-item mb-8">
              <span className="inline-flex items-center gap-2.5 bg-primary/[0.08] text-primary px-5 py-2.5 rounded-full text-xs font-bold tracking-wide">
                <Users className="w-3.5 h-3.5" />
                Supporting 10 Million People Across the UK
              </span>
            </div>

            <h1 className="hero-item text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold text-foreground mb-7 leading-[1.08] tracking-tight">
              You're not alone in your{" "}
              <span className="text-primary relative inline-block">
                arthritis journey
                <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-secondary/40" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0 7 Q50 0 100 5 T200 3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="hero-item text-base sm:text-lg text-muted-foreground leading-[1.85] mb-10 max-w-[520px] mx-auto">
              Free expert guidance, virtual physiotherapy, and a caring community — 
              everything you need to live better with arthritis, all in one place.
            </p>

            <div className="hero-item flex flex-col sm:flex-row justify-center gap-3.5">
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="btn-primary-cta px-8 h-14 rounded-full text-sm font-bold tracking-wide"
              >
                <MessageCircle className="w-4 h-4 mr-2.5" />
                Talk to Our AI Assistant
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 px-8 h-14 rounded-full text-sm font-semibold transition-all duration-300"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Social proof */}
            <div className="hero-item mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary fill-secondary" />
                <span>Free for everyone</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <span>NHS-aligned care</span>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-border" />
              <span>HCPC & CSP accredited</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
