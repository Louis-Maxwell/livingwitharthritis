import { motion } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf, LucideIcon } from "lucide-react";
import { useNutritionSections } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = {
  Fish,
  Leaf,
  Cherry,
  Milk,
};

const NutritionArticleSection = () => {
  const { data: sections, isLoading } = useNutritionSections();

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Utensils className="w-4 h-4" />
            <span className="text-sm font-medium">Nutrition Guide</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Eat Right for Your Type of Arthritis
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Learn about diets that may help ease pain and inflammation and slow disease activity. 
            While no single diet cures arthritis, research indicates that certain foods possess 
            anti-inflammatory properties and offer targeted benefits.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            By Louis Maxwell • September 28, 2025
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl p-8 border border-border">
                  <Skeleton className="h-12 w-48 mb-6" />
                  <Skeleton className="h-32 w-full mb-6" />
                  <Skeleton className="h-8 w-64" />
                </div>
              ))
            : sections?.map((section, index) => {
                const Icon = iconMap[section.icon_name] || Utensils;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{section.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm whitespace-pre-line">
                      {section.content}
                    </p>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                        Beneficial Foods
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {section.foods.map((food) => (
                          <span
                            key={food}
                            className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-accent/50 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            The Mediterranean & DASH Approach
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Anti-inflammatory diets like Mediterranean or DASH—rich in produce and low in processed 
            foods—appear protective across all arthritis types. Consult healthcare providers for 
            personalized advice, as nutrition complements—but does not replace—medical management.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-card rounded-lg text-foreground font-medium">
              🥗 Fruits & Vegetables
            </span>
            <span className="px-4 py-2 bg-card rounded-lg text-foreground font-medium">
              🐟 Fatty Fish
            </span>
            <span className="px-4 py-2 bg-card rounded-lg text-foreground font-medium">
              🫒 Olive Oil
            </span>
            <span className="px-4 py-2 bg-card rounded-lg text-foreground font-medium">
              🥜 Nuts & Seeds
            </span>
            <span className="px-4 py-2 bg-card rounded-lg text-foreground font-medium">
              🌾 Whole Grains
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionArticleSection;
