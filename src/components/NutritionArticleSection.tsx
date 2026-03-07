import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf, LucideIcon } from "lucide-react";
import { useNutritionSections } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, LucideIcon> = { Fish, Leaf, Cherry, Milk };

const NutritionArticleSection = () => {
  const { data: sections, isLoading } = useNutritionSections();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="nutrition" className="py-14 lg:py-20 bg-accent/30 relative overflow-hidden section-divider">
      <motion.div className="gradient-orb glow-pulse w-[600px] h-[600px] bg-secondary top-[-150px] right-[-200px]" style={{ y: orbY }} />

      <div className="container mx-auto px-6 md:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center mb-20"
        >
          <span className="section-label text-secondary mb-4 block">Nutrition Guide</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6 tracking-tight leading-[1.08]">
            Eat right for your type <span className="text-secondary">of arthritis</span>
          </h2>
          <div className="luxury-divider mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          </div>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Learn about diets that may help ease pain, reduce inflammation, and slow disease activity.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground/40 font-medium">
            <span>By Louis Maxwell</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/25" />
            <span>September 28, 2025</span>
          </div>
        </motion.div>

        {/* Arthritis type nutrition cards */}
        <div className="grid sm:grid-cols-2 gap-7">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card rounded-[2rem] p-8 border border-border/20">
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
                    initial={{ opacity: 0, y: 28, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="group h-full premium-card p-7 sm:p-8">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                      <div className="relative">
                        <div className="flex items-center gap-3 mb-5">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-10 h-10 rounded-xl bg-secondary/8 flex items-center justify-center group-hover:bg-secondary/15 transition-colors duration-500"
                          >
                            <Icon className="w-5 h-5 text-secondary" />
                          </motion.div>
                          <h3 className="text-base sm:text-lg font-display font-bold text-foreground">{section.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-[1.75] text-[13px] mb-6 line-clamp-4">
                          {section.content}
                        </p>
                        <div>
                          <p className="section-label text-muted-foreground/35 mb-2.5 text-[10px]">Beneficial Foods</p>
                          <div className="flex flex-wrap gap-1.5">
                            {section.foods.map((food) => (
                              <span key={food} className="px-3 py-1 bg-secondary/6 text-secondary text-[11px] rounded-full font-medium hover:bg-secondary/12 transition-colors duration-300">
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
      </div>
    </section>
  );
};

export default NutritionArticleSection;
