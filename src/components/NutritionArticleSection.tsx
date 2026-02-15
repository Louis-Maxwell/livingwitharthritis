import { motion } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf, LucideIcon } from "lucide-react";
import { useNutritionSections } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

import nutritionSalmon from "@/assets/nutrition-salmon-kale.jpg";
import nutritionMackerel from "@/assets/nutrition-grilled-mackerel.jpg";
import nutritionMediterranean from "@/assets/nutrition-mediterranean.jpg";
import nutritionBerries from "@/assets/nutrition-berries.jpg";
import nutritionNuts from "@/assets/nutrition-nuts-seeds.jpg";

const foodGallery = [
  { src: nutritionSalmon, title: "Cast-Iron Salmon & Kale", desc: "Omega-3 rich fatty fish paired with antioxidant greens to ease joint inflammation." },
  { src: nutritionMackerel, title: "Grilled Mackerel", desc: "Small oily fish packed with anti-inflammatory omega-3s — aim for 2-3 servings per week." },
  { src: nutritionMediterranean, title: "Mediterranean Platter", desc: "Salmon, olive oil, fruits, vegetables & nuts — the gold standard anti-inflammatory pattern." },
  { src: nutritionBerries, title: "Mixed Berries Bowl", desc: "Blueberries, raspberries & blackberries provide powerful antioxidants to combat oxidative stress." },
  { src: nutritionNuts, title: "Nuts & Seeds Mix", desc: "Walnuts, almonds, chia & flaxseeds offer healthy fats and plant-based omega-3s." },
];

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

        {/* Anti-Inflammatory Food Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center mb-2">
            Anti-Inflammatory Foods <span className="text-secondary">in Action</span>
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Real meals and ingredients that support joint health and reduce inflammation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {foodGallery.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group relative rounded-2xl overflow-hidden border border-border/50 hover:border-secondary/30 transition-all duration-300 hover:shadow-medium"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h4 className="text-white text-xs sm:text-sm font-bold leading-tight">{item.title}</h4>
                  <p className="text-white/70 text-[10px] sm:text-[11px] leading-snug mt-1 line-clamp-2">{item.desc}</p>
                </div>
                <div className="p-3 bg-card">
                  <h4 className="text-xs font-bold text-foreground leading-tight group-hover:text-secondary transition-colors">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
