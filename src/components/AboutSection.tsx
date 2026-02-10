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
    <section id="resources" className="py-20 lg:py-28 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[500px] h-[500px] bg-primary top-[5%] right-[-200px]" />

      <div className="container mx-auto px-5 md:px-8 max-w-7xl relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label text-primary mb-3 block">Understanding Arthritis</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 text-foreground leading-[1.06]">
              Knowledge is <span className="text-primary">power</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-[1.7]">
              Arthritis isn't a singular condition — it's a complex family of over 100 different types.
              Understanding your specific condition is the first step toward effective management.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We represent 10 million people living with arthritis — professionals,
              researchers, carers, and supporters united by a common goal.
            </p>
            <Button
              size="lg"
              onClick={() => setShowResources(!showResources)}
              className="mt-4 btn-primary-cta px-7 h-12 rounded-full text-sm"
            >
              Explore Resources
              <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${showResources ? 'rotate-180' : ''}`} />
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
        <div className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-center mb-12">By the Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-accent/50 border-0 rounded-2xl">
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Card className="bg-accent/50 border border-border/40 rounded-2xl card-hover group">
                      <CardContent className="pt-7 pb-6 text-center">
                        <div className="mb-3 mx-auto w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-1.5 tracking-tight">
                          {stat.number_value}
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-accent/60 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-border/40"
        >
          <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/6" />
          <div className="relative text-center max-w-2xl mx-auto">
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-display font-medium mb-5 leading-[1.45] text-foreground italic">
              "You are not alone in your arthritis journey. Your healthcare team advises, but you are in control of your path forward."
            </blockquote>
            <div className="w-8 h-px bg-primary/20 mx-auto mb-3" />
            <cite className="text-sm text-muted-foreground not-italic font-medium">Healthcare Professional</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
