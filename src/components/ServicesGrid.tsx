import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Users, MessageCircle, BookOpen, Stethoscope, Calendar, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "Helpline Support",
    description: "Expert advisors available to answer your questions and provide personalized guidance.",
    accent: "primary"
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with others who understand your journey. Share experiences and find support.",
    accent: "accent"
  },
  {
    icon: MessageCircle,
    title: "AI Assistant",
    description: "Get instant answers to your questions 24/7 with our intelligent virtual assistant.",
    accent: "primary"
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Comprehensive A-Z guide covering symptoms, treatments, and management strategies.",
    accent: "accent"
  },
  {
    icon: Stethoscope,
    title: "Self-Help Tools",
    description: "Interactive tools to track symptoms, manage pain, and monitor your progress.",
    accent: "primary"
  },
  {
    icon: Calendar,
    title: "Appointments",
    description: "Schedule consultations with healthcare professionals for personalized care.",
    accent: "accent"
  }
];

const ServicesGrid = () => {
  return (
    <section id="help" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            How We Help
          </span>
          <h2 className="font-display text-display-md lg:text-display-lg text-foreground mb-6">
            Comprehensive Support,{' '}
            <span className="text-primary">Every Step</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From expert guidance to community connection, we provide everything you need 
            to manage your condition with confidence.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isAccent = service.accent === "accent";
            
            return (
              <Card 
                key={index} 
                className="group bg-card hover:shadow-elegant border-border/50 transition-all duration-500 overflow-hidden cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 relative">
                  {/* Background decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${isAccent ? 'bg-accent/5' : 'bg-primary/5'} rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`} />
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${isAccent ? 'bg-accent/10' : 'bg-primary/10'} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${isAccent ? 'text-accent' : 'text-primary'}`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Link */}
                  <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-medium px-8 transition-all duration-300"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;