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
    <section id="conditions" className="py-20 lg:py-28 bg-background relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label text-secondary mb-3 block">Conditions We Cover</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 tracking-tight">
            Understanding your <span className="text-secondary">condition</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive guides on different types of arthritis and related conditions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-card border-border/50 rounded-2xl">
                <CardHeader className="pb-3">
                  <Skeleton className="h-6 w-24 rounded-full mb-2" />
                  <Skeleton className="h-6 w-3/4" />
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
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="group h-full bg-card hover:shadow-medium transition-all duration-300 cursor-pointer border-border/50 hover:border-secondary/30 rounded-2xl card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${condition.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {condition.category}
                      </Badge>
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-display font-semibold text-foreground group-hover:text-secondary transition-colors">
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                      {condition.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto mt-3 text-secondary font-semibold hover:bg-transparent text-xs uppercase tracking-wider"
                    >
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