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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const NutritionArticleSection = () => {
  const { data: sections, isLoading } = useNutritionSections();

  return (
    <section className="py-28 lg:py-36 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Editorial article header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="editorial-caption text-muted-foreground inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border" />
            Nutrition Guide
            <span className="w-8 h-px bg-border" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 tracking-tight leading-[1.05]">
            Eat Right for Your Type{" "}
            <span className="font-display italic font-normal text-gradient">of Arthritis</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-light mb-4">
            Learn about diets that may help ease pain and inflammation and slow disease activity. 
            While no single diet cures arthritis, research indicates that certain foods possess 
            anti-inflammatory properties and offer targeted benefits.
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground/60">
            <span>By Louis Maxwell</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>September 28, 2025</span>
          </div>
        </motion.div>

        {/* Article cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <div className="bg-card rounded-2xl p-10 border border-border/50">
                    <Skeleton className="h-12 w-48 mb-6" />
                    <Skeleton className="h-32 w-full mb-6" />
                    <Skeleton className="h-8 w-64" />
                  </div>
                </motion.div>
              ))
            : sections?.map((section, index) => {
                const Icon = iconMap[section.icon_name] || Utensils;
                return (
                  <motion.div key={section.id} variants={itemVariants}>
                    <div className="group h-full bg-card rounded-2xl p-10 border border-border/50 hover:border-primary/20 hover:shadow-large transition-all duration-700">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-display font-bold text-foreground">{section.title}</h3>
                        </div>
                        <span className="editorial-caption text-muted-foreground/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed text-sm font-light mb-8 whitespace-pre-line">
                        {section.content}
                      </p>

                      <div>
                        <p className="editorial-caption text-foreground/50 mb-4">
                          Beneficial Foods
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {section.foods.map((food) => (
                            <span
                              key={food}
                              className="px-3 py-1.5 bg-primary/[0.06] text-primary text-xs rounded-full font-medium hover:bg-primary/10 transition-colors duration-300"
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
        </motion.div>

        {/* Bottom editorial callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="bg-accent rounded-3xl p-12 md:p-16 lg:p-20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
            <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
            
            <div className="relative max-w-2xl mx-auto text-center">
              <span className="editorial-caption text-accent-foreground/40 mb-6 block">Recommended</span>
              <h3 className="text-3xl lg:text-4xl font-display font-bold text-accent-foreground mb-4 leading-tight">
                The Mediterranean &{" "}
                <span className="italic font-normal">DASH Approach</span>
              </h3>
              <p className="text-accent-foreground/60 mb-10 text-lg font-light leading-relaxed">
                Anti-inflammatory diets rich in produce and low in processed 
                foods appear protective across all arthritis types. Consult healthcare providers for 
                personalised advice.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { emoji: "🥗", label: "Fruits & Vegetables" },
                  { emoji: "🐟", label: "Fatty Fish" },
                  { emoji: "🫒", label: "Olive Oil" },
                  { emoji: "🥜", label: "Nuts & Seeds" },
                  { emoji: "🌾", label: "Whole Grains" },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="px-5 py-3 bg-white/[0.06] backdrop-blur-sm rounded-full text-accent-foreground/80 text-sm font-medium border border-white/[0.08] hover:bg-white/10 transition-colors duration-300"
                  >
                    {item.emoji} {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NutritionArticleSection;
