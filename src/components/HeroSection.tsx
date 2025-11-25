import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import activityIllustration from "@/assets/activity-illustration.png";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-hero text-hero-text overflow-hidden">
      {/* Activity Illustration Banner */}
      <div className="w-full bg-background py-4">
        <img 
          src={activityIllustration} 
          alt="People engaging in various physical activities"
          className="w-full max-w-4xl mx-auto h-24 object-contain opacity-80"
        />
      </div>
      
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
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Healthcare professional providing support to patient"
              className="rounded-lg shadow-medium w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;