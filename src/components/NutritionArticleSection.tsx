import { motion } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf, LucideIcon } from "lucide-react";
import { useNutritionSections } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = { Fish, Leaf, Cherry, Milk };

const NutritionArticleSection = () => {
  const { data: sections, isLoading } = useNutritionSections();

  return (
    <section id="nutrition" className="py-20 lg:py-28 bg-accent relative">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="section-label text-secondary mb-3 block">Nutrition Guide</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight leading-[1.1]">
            Eat right for your type <span className="text-secondary">of arthritis</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-3">
            Learn about diets that may help ease pain, reduce inflammation, and slow disease activity.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground/60">
            <span>By Louis Maxwell</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>September 28, 2025</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl p-8 border border-border/50">
                  <Skeleton className="h-10 w-48 mb-4" />
                  <Skeleton className="h-24 w-full mb-4" />
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
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                  >
                    <div className="group h-full bg-card rounded-2xl p-8 border border-border/50 hover:border-secondary/30 hover:shadow-medium transition-all duration-300 card-hover">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                          <Icon className="w-5 h-5 text-secondary" />
                        </div>
                        <h3 className="text-lg font-display font-bold text-foreground">{section.title}</h3>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-sm mb-6 whitespace-pre-line line-clamp-4">
                        {section.content}
                      </p>

                      <div>
                        <p className="section-label text-muted-foreground/50 mb-3 text-[10px]">Beneficial Foods</p>
                        <div className="flex flex-wrap gap-1.5">
                          {section.foods.map((food) => (
                            <span
                              key={food}
                              className="px-3 py-1 bg-secondary/8 text-secondary text-xs rounded-full font-medium"
                            >
                              {food}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-navy rounded-3xl p-10 lg:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/10" />
          <div className="relative max-w-2xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-display font-bold mb-3">
              The Mediterranean & <span className="text-gold italic font-normal">DASH Approach</span>
            </h3>
            <p className="text-white/70 mb-8 text-lg leading-relaxed">
              Anti-inflammatory diets rich in produce and low in processed foods appear protective across all arthritis types.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { emoji: "🥗", label: "Fruits & Veg" },
                { emoji: "🐟", label: "Fatty Fish" },
                { emoji: "🫒", label: "Olive Oil" },
                { emoji: "🥜", label: "Nuts & Seeds" },
                { emoji: "🌾", label: "Whole Grains" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="px-4 py-2 bg-white/10 rounded-full text-white/85 text-sm font-medium border border-white/10 hover:bg-white/15 transition-colors"
                >
                  {item.emoji} {item.label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionArticleSection;