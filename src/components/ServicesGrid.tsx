import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake, LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useServices, Service } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake,
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const IconComponent = iconMap[service.icon_name] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group h-full premium-card cursor-pointer">
        <CardHeader className="pb-3 relative p-7">
          <div className="mb-5 w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
            <IconComponent className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors duration-200" />
          </div>
          <CardTitle className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative px-7 pb-7">
          <CardDescription className="text-muted-foreground leading-[1.7] text-sm">
            {service.description}
          </CardDescription>
          <div className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 tracking-wide">
            Learn more
            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const { data: services, isLoading } = useServices();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="services" className="py-14 lg:py-20 bg-tint-cyan relative overflow-hidden section-divider">
      <div className="container mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label text-primary mb-4 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight">
            How we can <span className="text-primary">help you</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full bg-card border-border/20 rounded-2xl">
                <CardHeader className="pb-3 p-7">
                  <Skeleton className="w-12 h-12 rounded-xl mb-5" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="px-7"><Skeleton className="h-14 w-full" /></CardContent>
              </Card>
            ))
          ) : (
            services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
