import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, BookOpen, Stethoscope, Calendar, ArrowRight, HeartHandshake, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useServices, Service } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Users,
  MessageCircle,
  BookOpen,
  Stethoscope,
  Calendar,
  HeartHandshake,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const IconComponent = iconMap[service.icon_name] || Users;
  
  return (
    <motion.div variants={itemVariants}>
      <Card className="group relative h-full bg-card hover:shadow-large transition-all duration-700 cursor-pointer border-border/50 hover:border-primary/30 overflow-hidden rounded-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700`} />
        
        {/* Editorial number accent */}
        <div className="absolute top-6 right-6 text-[4rem] font-display font-bold text-foreground/[0.03] leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
        
        <CardHeader className="pb-4 relative">
          <div className={`mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5`}>
            <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center group-hover:bg-transparent transition-all duration-500">
              <IconComponent className="w-6 h-6 text-foreground group-hover:text-white transition-colors duration-500" />
            </div>
          </div>
          <CardTitle className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
            {service.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <CardDescription className="text-muted-foreground leading-relaxed text-[15px] font-light">
            {service.description}
          </CardDescription>
          <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-wider">
            <span className="text-xs">Learn more</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ServiceSkeleton = () => (
  <div className="h-full">
    <Card className="h-full bg-card border-border/50 rounded-2xl">
      <CardHeader className="pb-4">
        <Skeleton className="w-14 h-14 rounded-2xl mb-5" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </CardContent>
    </Card>
  </div>
);

const ServicesGrid = () => {
  const { data: services, isLoading } = useServices();

  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border" />
            Our Services
            <span className="w-8 h-px bg-border" />
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 tracking-tight">
            How We Can{" "}
            <span className="font-display italic font-normal text-gradient">Help You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Comprehensive support designed around your needs. From expert advice to community connection, 
            we're with you every step of your journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <ServiceSkeleton key={i} />)
          ) : (
            services?.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
