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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group h-full premium-card cursor-pointer">
        <CardHeader className="pb-3 relative p-8">
          <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:scale-105 transition-all duration-400">
            <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
          <CardTitle className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 relative px-8 pb-8">
          <CardDescription className="text-muted-foreground leading-[1.75] text-sm">
            {service.description}
          </CardDescription>
          <div className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-400 transform group-hover:translate-x-1 tracking-wider uppercase">
            Learn more
            <ArrowRight className="ml-2 w-3.5 h-3.5" />
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
    <section ref={sectionRef} id="services" className="py-20 lg:py-28 bg-tint-cyan relative overflow-hidden section-divider">
      <div className="gradient-orb w-[600px] h-[600px] bg-primary top-[-200px] right-[-200px]" />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label text-primary mb-5 block">What We Offer</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-[1.08]">
            Everything you need,{" "}
            <span className="text-gradient">all in one place</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Comprehensive, clinically-reviewed services designed to support every aspect of your arthritis journey.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="premium-card p-8 space-y-4">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-16 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesGrid;