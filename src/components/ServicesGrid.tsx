import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, BookOpen, Stethoscope, Calendar, HeartHandshake, LucideIcon, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group h-full premium-card cursor-pointer">
        <CardHeader className="pb-3 relative p-8">
          <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
            <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
          </div>
          <CardTitle className="text-base sm:text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 relative px-8 pb-8">
          <CardDescription className="text-muted-foreground leading-[1.75] text-[13px]">
            {service.description}
          </CardDescription>
          <div className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 uppercase tracking-[0.2em]">
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
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="services" className="py-28 lg:py-40 bg-accent/30 relative overflow-hidden section-divider">
      <motion.div className="gradient-orb glow-pulse w-[700px] h-[700px] bg-secondary top-[-200px] left-[-200px]" style={{ y: orbY }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label text-primary mb-4 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-foreground mb-6 tracking-tight">
            How we can <span className="text-primary italic">help you</span>
          </h2>
          <div className="luxury-divider">
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="h-full bg-card border-border/20 rounded-[2rem]">
                <CardHeader className="pb-3 p-8">
                  <Skeleton className="w-14 h-14 rounded-2xl mb-6" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="px-8"><Skeleton className="h-14 w-full" /></CardContent>
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
