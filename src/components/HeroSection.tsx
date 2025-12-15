import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-hero-text overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px]">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold leading-tight">
              WE ARE HERE FOR YOU
            </h1>
            <p className="text-xl leading-relaxed opacity-95">
              Whether you're looking for information about your arthritis condition, 
              or you want to support family and friends, we're here to help.
            </p>
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-medical-purple-light font-bold px-8 py-3 text-lg shadow-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
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