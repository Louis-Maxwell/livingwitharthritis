import { motion } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf, LucideIcon } from "lucide-react";
import { useNutritionSections } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = { Fish, Leaf, Cherry, Milk };

const NutritionArticleSection = () => {
  const { data: sections, isLoading } = useNutritionSections();

  return (
    <section id="nutrition" className="py-20 lg:py-28 bg-accent/50 relative overflow-hidden section-divider">
      <div className="gradient-orb w-[500px] h-[500px] bg-secondary top-[-100px] right-[-150px]" />

      <div className="container mx-auto px-5 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <span className="section-label text-secondary mb-3 block">Nutrition Guide</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight leading-[1.08]">
            Eat right for your type <span className="text-secondary">of arthritis</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Learn about diets that may help ease pain, reduce inflammation, and slow disease activity.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground/50">
            <span>By Louis Maxwell</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/25" />
            <span>September 28, 2025</span>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 border border-border/50">
                  <Skeleton className="h-8 w-40 mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-6 w-48" />
                </div>
              ))
            : sections?.map((section, index) => {
                const Icon = iconMap[section.icon_name] || Utensils;
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                  >
                    <div className="group h-full bg-card rounded-2xl p-6 sm:p-7 border border-border/50 hover:border-secondary/20 hover:shadow-medium transition-all duration-300 card-hover relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-xl bg-secondary/8 flex items-center justify-center group-hover:bg-secondary/12 transition-colors">
                            <Icon className="w-4 h-4 text-secondary" />
                          </div>
                          <h3 className="text-base sm:text-lg font-display font-bold text-foreground">{section.title}</h3>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-[13px] mb-5 line-clamp-4">
                          {section.content}
                        </p>

                        <div>
                          <p className="section-label text-muted-foreground/40 mb-2 text-[10px]">Beneficial Foods</p>
                          <div className="flex flex-wrap gap-1.5">
                            {section.foods.map((food) => (
                              <span key={food} className="px-2.5 py-1 bg-secondary/6 text-secondary text-[11px] rounded-full font-medium">
                                {food}
                              </span>
                            ))}
                          </div>
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
          transition={{ duration: 0.5 }}
          className="bg-navy rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 to-primary/8" />
          <div className="relative max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-4">
              The Mediterranean & <span className="text-gold italic font-normal">DASH Approach</span>
            </h3>
            <p className="text-white/50 mb-8 text-base sm:text-lg leading-relaxed">
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
                <span key={item.label} className="px-3 py-1.5 bg-white/8 rounded-full text-white/65 text-xs sm:text-sm font-medium border border-white/8 hover:bg-white/12 transition-colors">
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
