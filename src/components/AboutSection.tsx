import { memo, lazy, Suspense, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Briefcase, Database, ArrowRight, Quote, LucideIcon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useArthritisTypes, useStatistics } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const ResourcesSection = lazy(() => import("@/components/ResourcesSection"));

const iconMap: Record<string, LucideIcon> = {
  Users,
  Activity,
  Briefcase,
  Database,
};

const AboutSection = memo(() => {
  const [showResources, setShowResources] = useState(false);
  const { data: arthritisTypes, isLoading: typesLoading } = useArthritisTypes();
  const { data: statistics, isLoading: statsLoading } = useStatistics();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-28 lg:py-36 bg-gradient-to-b from-secondary via-secondary/95 to-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative max-w-7xl">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-28">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-5"
          >
            <span className="editorial-caption text-white/40 inline-flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-white/30" />
              Understanding Arthritis
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[0.95] tracking-tight">
              Knowledge
              <br />
              <span className="font-display italic font-normal text-white/80">Is Power</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-7 space-y-6 lg:pt-8"
          >
            <p className="text-xl text-white/75 leading-relaxed font-light">
              Arthritis isn't a singular condition — it's a complex family of over 100 different types. 
              Understanding your specific condition is the first step toward effective management.
            </p>
            <p className="text-lg text-white/60 leading-relaxed font-light">
              We represent 10 million people living with arthritis — healthcare professionals, 
              researchers, carers, and supporters united by a common goal: improving lives.
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowResources(!showResources)}
              className="mt-6 bg-white text-secondary hover:bg-white/90 font-bold px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 uppercase tracking-wider text-sm"
            >
              Explore Resources
              <ChevronDown className={`ml-2 w-5 h-5 transition-transform duration-500 ${showResources ? 'rotate-180' : ''}`} />
            </Button>
          </motion.div>
        </div>

        {/* Inline Resources */}
        <AnimatePresence>
          {showResources && (
            <Suspense fallback={null}>
              <ResourcesSection />
            </Suspense>
          )}
        </AnimatePresence>

        {/* Statistics — editorial number display */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-28"
        >
          <div className="text-center mb-14">
            <span className="editorial-caption text-white/40 inline-flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-white/30" />
              Impact
              <span className="w-8 h-px bg-white/30" />
            </span>
            <h3 className="text-4xl md:text-5xl font-display font-bold">By the Numbers</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Card className="bg-white/[0.04] border-white/[0.08] rounded-2xl backdrop-blur-sm">
                    <CardContent className="pt-10 pb-8 text-center">
                      <Skeleton className="mb-4 mx-auto w-12 h-12 rounded-xl bg-white/10" />
                      <Skeleton className="h-12 w-24 mx-auto mb-2 bg-white/10" />
                      <Skeleton className="h-4 w-32 mx-auto bg-white/10" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              statistics?.map((stat) => {
                const Icon = iconMap[stat.icon_name] || Users;
                return (
                  <motion.div key={stat.id} variants={itemVariants}>
                    <Card className="bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08] backdrop-blur-sm transition-all duration-700 group rounded-2xl">
                      <CardContent className="pt-10 pb-8 text-center">
                        <div className="mb-5 mx-auto w-12 h-12 rounded-xl bg-white/[0.06] flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                          <Icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-5xl lg:text-6xl font-display font-bold mb-2 text-white tracking-tight">{stat.number_value}</div>
                        <p className="text-sm text-white/45 font-medium">{stat.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>


        {/* Quote — editorial blockquote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative bg-white/[0.04] backdrop-blur-xl rounded-3xl p-12 lg:p-20 border border-white/[0.08] overflow-hidden">
            <Quote className="absolute top-10 left-10 w-20 h-20 text-white/[0.06]" />
            <div className="relative text-center max-w-3xl mx-auto">
              <blockquote className="text-2xl lg:text-4xl font-display font-medium mb-8 leading-[1.3] text-white/90 italic">
                "You are not alone in your arthritis journey. Your healthcare team advises, but you are in control of your path forward."
              </blockquote>
              <div className="w-12 h-px bg-white/20 mx-auto mb-4" />
              <cite className="text-sm text-white/40 not-italic editorial-caption">Healthcare Professional</cite>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
