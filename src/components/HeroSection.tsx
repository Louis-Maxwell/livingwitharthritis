import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-hero-text overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex items-center justify-center min-h-[400px]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              WE ARE HERE FOR YOU
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-95">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;