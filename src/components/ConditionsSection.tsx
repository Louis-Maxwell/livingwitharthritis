import { memo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useConditions } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const ConditionSkeleton = () => (
  <Card className="h-full bg-card border-border/50 rounded-2xl">
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between mb-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
  </Card>
);

const ConditionsSection = memo(() => {
  const { data: conditions, isLoading } = useConditions();

  return (
    <section className="py-28 lg:py-36 bg-muted/30 relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border" />
            Medical Resources
            <span className="w-8 h-px bg-border" />
          </span>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Explore our comprehensive guide to arthritis conditions. Find trusted information 
            about symptoms, treatments, and management strategies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <ConditionSkeleton />
              </motion.div>
            ))
          ) : (
            conditions?.map((condition) => (
              <motion.div key={condition.id} variants={itemVariants}>
                <Card className="group h-full bg-card hover:shadow-large transition-all duration-700 cursor-pointer border-border/50 hover:border-primary/20 rounded-2xl overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={`${condition.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {condition.category}
                      </Badge>
                      <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-all duration-500">
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-500">
                      {condition.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-muted-foreground leading-relaxed font-light">
                      {condition.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto text-primary font-semibold hover:bg-transparent group-hover:translate-x-1 transition-transform duration-300 text-xs uppercase tracking-wider"
                    >
                      Read more
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>

      </div>
    </section>
  );
});

ConditionsSection.displayName = "ConditionsSection";

export default ConditionsSection;
