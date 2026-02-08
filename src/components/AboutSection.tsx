import { memo, lazy, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database, ArrowRight, Quote, LucideIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useArthritisTypes, useStatistics } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const ResourcesSection = lazy(() => import("@/components/ResourcesSection"));

const iconMap: Record<string, LucideIcon> = { Users, Activity, Briefcase, Database };

const AboutSection = memo(() => {
  const [showResources, setShowResources] = useState(false);
  const { data: statistics, isLoading: statsLoading } = useStatistics();

  return (
    <section id="resources" className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label text-primary mb-4 block">Understanding Arthritis</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 text-foreground leading-[1.05]">
              Knowledge is{" "}
              <span className="text-primary">power</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Arthritis isn't a singular condition — it's a complex family of over 100 different types.
              Understanding your specific condition is the first step toward effective management.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We represent 10 million people living with arthritis — healthcare professionals,
              researchers, carers, and supporters united by a common goal.
            </p>
            <Button
              size="lg"
              onClick={() => setShowResources(!showResources)}
              className="mt-4 btn-primary-cta px-8 py-6 rounded-full"
            >
              Explore Resources
              <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-300 ${showResources ? 'rotate-180' : ''}`} />
            </Button>
          </motion.div>
        </div>

        {/* Resources */}
        <AnimatePresence>
          {showResources && (
            <Suspense fallback={null}>
              <ResourcesSection />
            </Suspense>
          )}
        </AnimatePresence>

        {/* Statistics */}
        <div className="mb-20">
          <h3 className="text-3xl font-display font-bold text-center mb-12">By the Numbers</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-accent border-0 rounded-2xl">
                  <CardContent className="pt-8 pb-6 text-center">
                    <Skeleton className="mb-3 mx-auto w-10 h-10 rounded-xl" />
                    <Skeleton className="h-10 w-20 mx-auto mb-2" />
                    <Skeleton className="h-4 w-28 mx-auto" />
                  </CardContent>
                </Card>
              ))
            ) : (
              statistics?.map((stat) => {
                const Icon = iconMap[stat.icon_name] || Users;
                return (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="bg-accent border-0 rounded-2xl card-hover group">
                      <CardContent className="pt-8 pb-6 text-center">
                        <div className="mb-3 mx-auto w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-1 tracking-tight">
                          {stat.number_value}
                        </div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
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
          transition={{ duration: 0.6 }}
          className="bg-primary/5 rounded-3xl p-10 lg:p-16 relative overflow-hidden"
        >
          <Quote className="absolute top-8 left-8 w-16 h-16 text-primary/10" />
          <div className="relative text-center max-w-3xl mx-auto">
            <blockquote className="text-xl lg:text-3xl font-display font-medium mb-6 leading-[1.4] text-foreground italic">
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