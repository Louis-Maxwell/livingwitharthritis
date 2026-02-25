import { memo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Briefcase, Database, LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStatistics } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = { Users, Activity, Briefcase, Database };

const AboutSection = memo(() => {
  const { data: statistics, isLoading: statsLoading } = useStatistics();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="resources" className="py-24 lg:py-32 bg-background relative overflow-hidden section-divider">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" style={{ transform: `translateY(${orbY})` }} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label text-primary mb-4 block">Understanding Arthritis</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 text-foreground">
              Knowledge is <span className="text-primary">power</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 lg:pt-4"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-[1.8]">
              Arthritis isn't a singular condition — it's a complex family of over 100 different types.
              Understanding your specific condition is the first step toward effective management.
            </p>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              We represent 10 million people living with arthritis — professionals,
              researchers, carers, and supporters united by a common goal.
            </p>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-card border-border/20 rounded-2xl">
                  <CardContent className="pt-8 pb-7 text-center">
                    <Skeleton className="mb-3 mx-auto w-12 h-12 rounded-xl" />
                    <Skeleton className="h-10 w-16 mx-auto mb-2" />
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
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="premium-card group">
                      <CardContent className="pt-8 pb-7 text-center">
                        <div className="mb-4 mx-auto w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="stat-number text-3xl sm:text-4xl lg:text-5xl mb-2">
                          {stat.number_value}
                        </div>
                        <p className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">{stat.label}</p>
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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-accent/50 rounded-2xl p-10 sm:p-14 lg:p-20 relative border border-border/20"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-primary rounded-full" />
          <div className="relative text-center max-w-2xl mx-auto">
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold mb-6 leading-[1.5] text-foreground">
              "You are not alone in your arthritis journey. Your healthcare team advises, but you are in control of your path forward."
            </blockquote>
            <cite className="text-sm text-muted-foreground not-italic font-semibold">— Healthcare Professional</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
