import { Button } from "@/components/ui/button";
import cyclistIllustration from "@/assets/cyclist-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-hero-text overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              WE ARE HERE FOR YOU
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-95 max-w-lg">
              Whether you're looking for information about your arthritis condition, 
              or you want to support family and friends, we're here to help.
            </p>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-medical-purple-light font-bold px-8 py-4 text-lg shadow-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              GET HELP
            </Button>
          </div>

          {/* Right Illustration */}
          <div className="relative flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Decorative background elements */}
            <div className="absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute w-48 h-48 bg-accent/20 rounded-full blur-2xl translate-x-12 translate-y-8 -z-10" />
            
            {/* Main illustration container */}
            <div className="relative">
              {/* Motion lines behind cyclist */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 space-y-3 overflow-visible">
                <div className="w-28 h-0.5 bg-gradient-to-r from-transparent via-accent/60 to-accent rounded-full animate-motion-streak origin-left" style={{ animationDelay: '0s' }} />
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-primary/80 rounded-full ml-4 animate-motion-streak origin-left" style={{ animationDelay: '0.3s' }} />
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-accent/70 rounded-full ml-2 animate-motion-streak origin-left" style={{ animationDelay: '0.6s' }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-muted-foreground/30 to-muted-foreground/50 rounded-full ml-6 animate-motion-streak origin-left" style={{ animationDelay: '0.9s' }} />
                <div className="w-22 h-0.5 bg-gradient-to-r from-transparent via-primary/40 to-primary/60 rounded-full ml-3 animate-motion-streak origin-left" style={{ animationDelay: '1.2s' }} />
              </div>

              {/* Additional diagonal motion streaks */}
              <div className="absolute -left-4 top-1/3 -rotate-12 space-y-4 opacity-70 overflow-visible">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent/50 rounded-full animate-motion-streak origin-left" style={{ animationDelay: '0.4s' }} />
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary/40 rounded-full -ml-2 animate-motion-streak origin-left" style={{ animationDelay: '0.8s' }} />
              </div>

              {/* Decorative circles */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-16 h-16 bg-muted/50 rounded-full" />
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-elevated">
                  <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>

              {/* Speed particles */}
              <div className="absolute left-8 top-1/4 w-2 h-2 bg-accent/60 rounded-full animate-motion-particle" style={{ animationDelay: '0s' }} />
              <div className="absolute left-16 bottom-1/3 w-1.5 h-1.5 bg-primary/50 rounded-full animate-motion-particle" style={{ animationDelay: '0.5s' }} />
              <div className="absolute left-4 bottom-1/4 w-1 h-1 bg-accent/40 rounded-full animate-motion-particle" style={{ animationDelay: '1s' }} />
              
              {/* Cyclist image */}
              <img 
                src={cyclistIllustration} 
                alt="Active lifestyle illustration" 
                className="w-full max-w-md h-auto object-contain drop-shadow-lg relative z-10 animate-float"
              />
              
              {/* Bottom decorative line */}
              <div className="absolute bottom-4 right-12 w-24 h-1 bg-foreground/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;