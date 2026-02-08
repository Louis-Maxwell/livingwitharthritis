import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake, LucideIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useServices, Service } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake,
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const IconComponent = iconMap[service.icon_name] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card className="group h-full bg-card hover:shadow-large transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30 rounded-2xl card-hover relative overflow-hidden">
        {/* Subtle gradient reveal on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardHeader className="pb-3 relative">
          <div className="mb-4 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
            <IconComponent className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
          <CardTitle className="text-lg sm:text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 relative">
          <CardDescription className="text-muted-foreground leading-relaxed text-sm">
            {service.description}
          </CardDescription>
          <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
            <span className="text-xs uppercase tracking-wider">Learn more</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServicesGrid = () => {
  const { data: services, isLoading } = useServices();

  return (
    <section id="services" className="py-16 lg:py-24 bg-accent relative overflow-hidden section-divider">
      <div className="gradient-orb w-[500px] h-[500px] bg-secondary top-[-100px] left-[-100px]" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label text-primary mb-3 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-3 tracking-tight">
            How we can <span className="text-primary">help you</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive support designed around your needs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full bg-card border-border/50 rounded-2xl">
                <CardHeader className="pb-3">
                  <Skeleton className="w-11 h-11 rounded-xl mb-4" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent><Skeleton className="h-14 w-full" /></CardContent>
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