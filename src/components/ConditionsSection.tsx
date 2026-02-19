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
    <section ref={sectionRef} id="conditions" className="py-24 lg:py-36 bg-background relative overflow-hidden section-divider">
      <motion.div className="gradient-orb w-[600px] h-[600px] bg-secondary bottom-[-150px] right-[-200px]" style={{ y: orbY }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label text-secondary mb-4 block">Conditions We Cover</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
            Understanding your <span className="text-secondary italic">condition</span>
          </h2>
          <p className="text-base text-muted-foreground/70 max-w-lg mx-auto">
            Explore comprehensive guides on different arthritis types.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border/20 rounded-3xl">
                <CardHeader className="pb-3 p-7">
                  <Skeleton className="h-5 w-20 rounded-full mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent className="px-7"><Skeleton className="h-12 w-full" /></CardContent>
              </Card>
            ))
          ) : (
            conditions?.map((condition, i) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="group h-full bg-card hover:shadow-large transition-all duration-500 cursor-pointer border border-border/20 hover:border-secondary/15 rounded-3xl card-hover relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <CardHeader className="pb-2 relative p-7">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${condition.color} text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider`}>
                        {condition.category}
                      </Badge>
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:bg-secondary/8 transition-colors duration-500">
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-display font-semibold text-foreground group-hover:text-secondary transition-colors duration-300">
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative px-7 pb-7">
                    <CardDescription className="text-muted-foreground leading-[1.7] text-[13px]">
                      {condition.description}
                    </CardDescription>
                    <Button variant="ghost" size="sm" className="p-0 h-auto mt-4 text-secondary font-bold hover:bg-transparent text-xs uppercase tracking-widest">
                      Read more <ArrowRight className="ml-1.5 w-3 h-3" />
                    </Button>
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