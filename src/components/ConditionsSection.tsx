import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useConditions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const ConditionsSection = memo(() => {
  const { data: conditions, isLoading } = useConditions();

  return (
    <section id="conditions" className="py-20 lg:py-28 bg-background relative overflow-hidden section-divider">
      <div className="gradient-orb w-[500px] h-[500px] bg-secondary bottom-[-100px] right-[-150px]" />

      <div className="container mx-auto px-5 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="section-label text-secondary mb-3 block">Conditions We Cover</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
            Understanding your <span className="text-secondary">condition</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            Explore comprehensive guides on different arthritis types.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border/50 rounded-2xl">
                <CardHeader className="pb-3">
                  <Skeleton className="h-5 w-20 rounded-full mb-2" />
                  <Skeleton className="h-5 w-3/4" />
                </CardHeader>
                <CardContent><Skeleton className="h-12 w-full" /></CardContent>
              </Card>
            ))
          ) : (
            conditions?.map((condition, i) => (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="group h-full bg-card hover:shadow-medium transition-all duration-300 cursor-pointer border border-border/50 hover:border-secondary/20 rounded-2xl card-hover relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-2 relative">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${condition.color} text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full`}>
                        {condition.category}
                      </Badge>
                      <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center group-hover:bg-secondary/8 transition-colors">
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-display font-semibold text-foreground group-hover:text-secondary transition-colors duration-200">
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-muted-foreground leading-relaxed text-[13px]">
                      {condition.description}
                    </CardDescription>
                    <Button variant="ghost" size="sm" className="p-0 h-auto mt-3 text-secondary font-semibold hover:bg-transparent text-xs uppercase tracking-wider">
                      Read more <ArrowRight className="ml-1 w-3 h-3" />
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
