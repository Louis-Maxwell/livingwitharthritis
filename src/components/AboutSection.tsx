import { memo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Briefcase, Database, Quote, LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStatistics } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = { Users, Activity, Briefcase, Database };

const AboutSection = memo(() => {
  const { data: statistics, isLoading: statsLoading } = useStatistics();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} id="resources" className="py-28 lg:py-40 bg-background relative overflow-hidden section-divider">
      <motion.div className="gradient-orb glow-pulse w-[700px] h-[700px] bg-primary top-[5%] right-[-300px]" style={{ y: orbY }} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-28">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label text-primary mb-4 block">Understanding Arthritis</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-display font-bold mb-7 text-foreground">
              Knowledge is <span className="text-primary italic">power</span>
            </h2>
            <div className="luxury-divider justify-start">
              <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:pt-4"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-[1.85]">
              Arthritis isn't a singular condition — it's a complex family of over 100 different types.
              Understanding your specific condition is the first step toward effective management.
            </p>
            <p className="text-sm text-muted-foreground/60 leading-relaxed">
              We represent 10 million people living with arthritis — professionals,
              researchers, carers, and supporters united by a common goal.
            </p>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="mb-28">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {statsLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-card border-border/20 rounded-[2rem]">
                  <CardContent className="pt-8 pb-7 text-center">
                    <Skeleton className="mb-3 mx-auto w-12 h-12 rounded-2xl" />
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
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="premium-card group">
                      <CardContent className="pt-10 pb-8 text-center">
                        <div className="mb-5 mx-auto w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-500">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="stat-number text-3xl sm:text-4xl lg:text-5xl mb-2">
                          {stat.number_value}
                        </div>
                        <p className="text-[10px] text-muted-foreground/50 font-bold tracking-[0.2em] uppercase">{stat.label}</p>
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
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="premium-card p-12 sm:p-16 lg:p-24 relative"
        >
          <Quote className="absolute top-10 left-10 w-14 h-14 text-primary/[0.04]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="relative text-center max-w-2xl mx-auto">
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-display font-medium mb-8 leading-[1.55] text-foreground italic">
              "You are not alone in your arthritis journey. Your healthcare team advises, but you are in control of your path forward."
            </blockquote>
            <div className="luxury-divider mb-5">
              <div className="w-1 h-1 rounded-full bg-gold/40" />
            </div>
            <cite className="text-xs text-muted-foreground/40 not-italic font-bold tracking-[0.2em] uppercase">Healthcare Professional</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
