import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20 lg:py-28">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              We Are Here<br />For You
            </h1>
            <p className="text-xl leading-relaxed opacity-95 max-w-xl font-light">
              Whether you're seeking information about your arthritis condition 
              or supporting loved ones, we provide expert guidance every step of the way.
            </p>
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-10 py-6 text-base shadow-elevated transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5 rounded-lg"
            >
              Get Help
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-2xl"></div>
            <img 
              src={heroImage} 
              alt="Healthcare professional providing support to patient"
              className="rounded-2xl shadow-elevated w-full h-[450px] object-cover relative"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;