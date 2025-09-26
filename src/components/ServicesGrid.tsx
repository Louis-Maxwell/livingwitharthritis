import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, MessageCircle, BookOpen, Stethoscope, Calendar } from "lucide-react";

const services = [
  {
    icon: Phone,
    title: "Helpline",
    description: "You don't need to face arthritis alone. Our advisors provide information and advice about arthritis.",
    color: "text-medical-blue"
  },
  {
    icon: Users,
    title: "Online community",
    description: "Talk to people affected by arthritis and share your everyday experiences.",
    color: "text-primary"
  },
  {
    icon: MessageCircle,
    title: "Chat to AVA",
    description: "Get fast, easy access to our trusted information, 24/7 from our virtual assistant.",
    color: "text-medical-blue"
  },
  {
    icon: BookOpen,
    title: "Arthritis types A-Z",
    description: "Browse our A-Z list of arthritis conditions and find trusted information about symptoms and treatments.",
    color: "text-accent"
  },
  {
    icon: Stethoscope,
    title: "Self Help Tool",
    description: "Learn about specific conditions and how to manage them with our interactive body map.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Book Appointment",
    description: "Schedule a consultation with our healthcare professionals and get personalized care.",
    color: "text-medical-blue"
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-border hover:border-primary/20 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 rounded-full bg-muted/50 w-16 h-16 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                    <IconComponent className={`w-8 h-8 ${service.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;