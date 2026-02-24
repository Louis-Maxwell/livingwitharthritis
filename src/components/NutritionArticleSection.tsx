import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf, LucideIcon, X, ChefHat } from "lucide-react";
import { useNutritionSections, useNutritionFoodGallery, NutritionFoodGalleryItem } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import ReactMarkdown from "react-markdown";

const iconMap: Record<string, LucideIcon> = { Fish, Leaf, Cherry, Milk };

const NutritionArticleSection = () => {
  const { data: sections, isLoading } = useNutritionSections();
  const { data: galleryItems, isLoading: galleryLoading } = useNutritionFoodGallery();
  const [selectedRecipe, setSelectedRecipe] = useState<NutritionFoodGalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="nutrition" className="py-28 lg:py-40 bg-accent/30 relative overflow-hidden section-divider">
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
        <div className="grid sm:grid-cols-2 gap-7 mb-20">
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

        {/* Anti-Inflammatory Food Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground text-center mb-3">
            Anti-Inflammatory Foods <span className="text-secondary">in Action</span>
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-lg mx-auto">
            Real meals and ingredients that support joint health. Click any dish with a recipe to view it.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {galleryLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="rounded-[2rem] overflow-hidden border border-border/20">
                    <Skeleton className="aspect-square w-full" />
                    <div className="p-4"><Skeleton className="h-4 w-24" /></div>
                  </div>
                ))
              : galleryItems?.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-[2rem] overflow-hidden border border-border/15 hover:border-secondary/20 transition-all duration-500 hover:shadow-large ${item.recipe_text ? "cursor-pointer" : ""}`}
                onClick={() => item.recipe_text && setSelectedRecipe(item)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                  <h4 className="text-white text-xs sm:text-sm font-bold leading-tight">{item.title}</h4>
                  <p className="text-white/70 text-[10px] sm:text-[11px] leading-snug mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="p-4 bg-card flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-foreground leading-tight group-hover:text-secondary transition-colors duration-300">{item.title}</h4>
                  {item.recipe_text && (
                    <ChefHat className="w-3.5 h-3.5 text-secondary shrink-0" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedRecipe(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-card rounded-[2rem] max-w-2xl w-full max-h-[85vh] overflow-hidden border border-border/40 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header with image */}
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <img
                  src={selectedRecipe.image_url}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                  <div className="flex items-center gap-2 mb-2">
                    <ChefHat className="w-4 h-4 text-secondary" />
                    <span className="text-secondary text-xs font-semibold uppercase tracking-[0.2em]">Recipe</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">{selectedRecipe.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-black/60 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Recipe content */}
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-15rem)]">
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {selectedRecipe.description}
                </p>
                <div className="prose prose-sm max-w-none text-foreground [&_strong]:text-foreground [&_strong]:font-bold [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:text-[13px] [&_p]:mb-3 [&_ul]:space-y-1 [&_li]:text-muted-foreground [&_li]:text-[13px]">
                  <ReactMarkdown>{selectedRecipe.recipe_text || ""}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default NutritionArticleSection;
