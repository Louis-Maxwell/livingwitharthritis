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
              {/* Decorative circles */}
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <div className="w-16 h-16 bg-muted/50 rounded-full" />
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-elevated">
                  <svg className="w-6 h-6 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
              </div>
              
              {/* Cyclist image */}
              <img 
                src={cyclistIllustration} 
                alt="Active lifestyle illustration" 
                className="w-full max-w-md h-auto object-contain drop-shadow-lg"
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