import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Heart, Users, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white/90">Trusted by 10M+ people</span>
            </div>

            {/* Headline */}
            <h1 
              className="font-display text-display-lg lg:text-display-xl text-white animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              Your Partner in{' '}
              <span className="text-accent">Living Well</span>{' '}
              with Arthritis
            </h1>

            {/* Subheadline */}
            <p 
              className="text-lg lg:text-xl text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              Expert guidance, compassionate support, and a community that understands. 
              Take control of your health journey today.
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              <Button 
                size="lg"
                className="bg-white text-secondary hover:bg-white/90 font-semibold px-8 py-6 text-base shadow-elegant hover:shadow-glow transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-medium px-8 py-6 text-base backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Video
              </Button>
            </div>

            {/* Trust indicators */}
            <div 
              className="flex flex-wrap items-center gap-8 justify-center lg:justify-start pt-4 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 backdrop-blur-sm"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/70">50k+ Active Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                <span className="text-sm text-white/70">4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div 
            className="relative hidden lg:block animate-fade-in-right"
            style={{ animationDelay: '0.3s' }}
          >
            {/* Main card */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-elegant">
              <div className="grid grid-cols-2 gap-4">
                {/* Stat cards */}
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl font-display font-bold text-white mb-2">60M+</div>
                  <div className="text-sm text-white/70">Adults affected</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl font-display font-bold text-accent mb-2">100+</div>
                  <div className="text-sm text-white/70">Condition types</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl font-display font-bold text-white mb-2">24/7</div>
                  <div className="text-sm text-white/70">Support available</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="text-4xl font-display font-bold text-accent mb-2">1 in 4</div>
                  <div className="text-sm text-white/70">Adults have arthritis</div>
                </div>
              </div>
              
              {/* Floating element */}
              <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground rounded-2xl px-6 py-4 shadow-elegant animate-float">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Join Today</div>
                    <div className="text-xs opacity-80">Free membership</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;