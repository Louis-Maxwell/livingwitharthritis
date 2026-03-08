import { memo, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, Briefcase, Database, BookOpen, HeartHandshake, LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useStatistics } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = { Users, Activity, Briefcase, Database, BookOpen, HeartHandshake };

const AboutSection = memo(() => {
  const { data: statistics, isLoading: statsLoading } = useStatistics();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="resources" className="py-20 lg:py-28 bg-tint-peach relative overflow-hidden section-divider">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/[0.02] blur-[140px] pointer-events-none" style={{ transform: `translateY(${orbY})` }} />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="section-label text-primary mb-5 block">About Our Mission</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-foreground leading-[1.08]">
              Transforming arthritis care for{" "}
              <span className="text-gradient">everyone</span>
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 lg:pt-4"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-[1.85]">
              Arthritis isn't a single condition — it's a complex family of over 100 distinct types, each 
              demanding its own approach. We exist to ensure that no one faces this challenge without 
              world-class support, regardless of where they live or what they can afford.
            </p>
            <p className="text-sm text-muted-foreground/70 leading-[1.8]">
              We unite patients, clinicians, researchers and community advocates — aiming to support 
              over 30 million people globally through evidence-based care, cutting-edge technology 
              and unwavering compassion.
            </p>
          </motion.div>
        </div>

        {/* Statistics */}
        <div className="mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
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
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card className="premium-card group">
                      <CardContent className="pt-10 pb-9 text-center">
                        <div className="mb-5 mx-auto w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="stat-number text-3xl sm:text-4xl lg:text-[2.75rem] mb-2">
                          {stat.number_value}
                        </div>
                        <p className="text-[11px] text-muted-foreground font-semibold tracking-[0.15em] uppercase">{stat.label}</p>
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
          className="bg-accent/40 rounded-3xl p-12 sm:p-16 lg:p-24 relative border border-border/15"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <div className="relative text-center max-w-2xl mx-auto">
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-bold mb-7 leading-[1.5] text-foreground">
              "You are never alone in your arthritis journey. Your healthcare team guides you, but you hold the power to shape your path forward."
            </blockquote>
            <cite className="text-sm text-muted-foreground not-italic font-semibold">— Living With Arthritis Clinical Advisory Board</cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;