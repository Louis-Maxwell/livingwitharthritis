import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]"></div>
      <div className="container mx-auto px-6 lg:px-16 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center py-24 lg:py-32">
          <div className="space-y-10 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tighter">
              We Are Here<br />For You
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed opacity-95 max-w-xl font-light tracking-tight">
              Whether you're seeking information about your arthritis condition 
              or supporting loved ones, we provide expert guidance every step of the way.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/95 font-semibold px-12 py-7 text-base shadow-elevated transition-all duration-300 hover:shadow-medium hover:-translate-y-0.5 rounded-xl"
            >
              Get Help
            </Button>
          </div>
          
          <div className="relative lg:ml-8">
            <div className="absolute -inset-6 bg-white/10 rounded-3xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Healthcare professional providing support to patient"
              className="rounded-3xl shadow-elevated w-full h-[480px] lg:h-[540px] object-cover relative ring-1 ring-white/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;