import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake, LucideIcon, ArrowRight } from "lucide-react";
import { useServices, Service } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake,
};

const ServiceCard = ({ service }: { service: Service }) => {
  const IconComponent = iconMap[service.icon_name] || Users;

  return (
    <Card className="group h-full border border-border/10 bg-card hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 cursor-pointer rounded-2xl">
      <CardHeader className="pb-4 p-9 lg:p-11">
        <div className="mb-9 w-16 h-16 rounded-2xl bg-primary/[0.04] flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
          <IconComponent className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
        </div>
        <CardTitle className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 tracking-tight">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-7 px-9 lg:px-11 pb-9 lg:pb-11">
        <CardDescription className="text-muted-foreground leading-[1.85] text-sm">
          {service.description}
        </CardDescription>
        <div className="flex items-center text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1 tracking-[0.15em] uppercase">
          Learn more
          <ArrowRight className="ml-2 w-3.5 h-3.5" />
        </div>
      </CardContent>
    </Card>
  );
};

const ServicesGrid = () => {
  const { data: services, isLoading } = useServices();

  return (
    <section id="services" className="py-24 lg:py-32 bg-warm relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="text-center mb-20">
          <span className="section-label text-primary/60 mb-5 block">Comprehensive Care Platform</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-foreground mb-7 leading-[1.06] tracking-tight">
            World-class services,{" "}
            <span className="text-gradient italic">zero cost</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Every service is clinically reviewed, NICE-compliant and designed by our multidisciplinary team. No waiting lists, no referrals, no cost.
          </p>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-11 space-y-5 border border-border/10 rounded-2xl">
                <Skeleton className="w-16 h-16 rounded-2xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {services?.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;
