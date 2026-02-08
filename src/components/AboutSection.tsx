import { memo, lazy, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database, Quote, LucideIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStatistics } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const ResourcesSection = lazy(() => import("@/components/ResourcesSection"));

const iconMap: Record<string, LucideIcon> = { Users, Activity, Briefcase, Database };

const AboutSection = memo(() => {
  const [showResources, setShowResources] = useState(false);
  const { data: statistics, isLoading: statsLoading } = useStatistics();

  return (
    <section id="resources" className="py-16 lg:py-24 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[400px] h-[400px] bg-primary top-[10%] right-[-100px]" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label text-primary mb-3 block">Understanding Arthritis</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground leading-[1.08]">
              Knowledge is <span className="text-primary">power</span>
            </h2>
            <div className="w-14 h-1 bg-primary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Arthritis isn't a singular condition — it's a complex family of over 100 different types.
              Understanding your specific condition is the first step toward effective management.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We represent 10 million people living with arthritis — professionals,
              researchers, carers, and supporters united by a common goal.
            </p>
            <Button
              size="lg"
              onClick={() => setShowResources(!showResources)}
              className="mt-3 btn-primary-cta px-7 py-5 rounded-full text-sm"
            >
              Explore Resources
              <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-300 ${showResources ? 'rotate-180' : ''}`} />
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {showResources && (
            <Suspense fallback={null}>
              <ResourcesSection />
            </Suspense>
          )}
        </AnimatePresence>

        {/* Statistics */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-center mb-10">By the Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-accent border-0 rounded-2xl">
                  <CardContent className="pt-6 pb-5 text-center">
                    <Skeleton className="mb-2 mx-auto w-9 h-9 rounded-xl" />
                    <Skeleton className="h-9 w-16 mx-auto mb-1" />
                    <Skeleton className="h-3 w-24 mx-auto" />
                  </CardContent>
                </Card>
              ))
            ) : (
              statistics?.map((stat, i) => {
                const Icon = iconMap[stat.icon_name] || Users;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <Card className="bg-accent border-0 rounded-2xl card-hover group">
                      <CardContent className="pt-6 pb-5 text-center">
                        <div className="mb-2 mx-auto w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-1 tracking-tight">
                          {stat.number_value}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
        >
          <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/8" />
          <div className="relative text-center max-w-3xl mx-auto">
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-display font-medium mb-5 leading-[1.4] text-foreground italic">
              "You are not alone in your arthritis journey. Your healthcare team advises, but you are in control of your path forward."
            </blockquote>
            <div className="w-10 h-px bg-primary/30 mx-auto mb-3" />
            <cite className="text-sm text-muted-foreground not-italic">Healthcare Professional</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;