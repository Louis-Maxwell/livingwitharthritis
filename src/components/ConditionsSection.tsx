import { memo, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useConditions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ConditionsSection = memo(() => {
  const { data: conditions, isLoading } = useConditions();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="conditions" className="py-14 lg:py-20 bg-background relative overflow-hidden section-divider">
      <motion.div className="gradient-orb glow-pulse w-[700px] h-[700px] bg-secondary bottom-[-200px] right-[-250px]" style={{ y: orbY }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="section-label text-secondary mb-4 block">Conditions We Cover</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight">
            Understanding your <span className="text-secondary italic">condition</span>
          </h2>
          <div className="luxury-divider">
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border/20 rounded-[2rem]">
                <CardHeader className="pb-3 p-8">
                  <Skeleton className="h-5 w-20 rounded-full mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="px-8"><Skeleton className="h-12 w-full" /></CardContent>
              </Card>
            ))
          ) : (
            conditions?.map((condition, i) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="group h-full premium-card cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <CardHeader className="pb-2 relative p-8">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${condition.color} text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider`}>
                        {condition.category}
                      </Badge>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="w-9 h-9 rounded-full bg-accent flex items-center justify-center group-hover:bg-secondary/8 transition-colors duration-500"
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-secondary transition-colors" />
                      </motion.div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-display font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative px-8 pb-8">
                    <CardDescription className="text-muted-foreground leading-[1.75] text-[13px]">
                      {condition.description}
                    </CardDescription>
                    <div className="flex items-center text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-2 uppercase tracking-[0.2em] mt-5">
                      Read more <ArrowRight className="ml-2 w-3.5 h-3.5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
});

ConditionsSection.displayName = "ConditionsSection";
export default ConditionsSection;
