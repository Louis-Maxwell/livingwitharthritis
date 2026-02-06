import { memo, useState } from "react";
import { ExternalLink, Utensils, Dumbbell, Heart, Home, Users, Activity, Microscope } from "lucide-react";
import { useHealthyLivingResources } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const categoryIcons: Record<string, typeof Utensils> = {
  Nutrition: Utensils,
  "Physical Activity": Dumbbell,
  "Emotional Well-Being": Heart,
  "Daily Living": Home,
  "Family & Relationships": Users,
  "Managing Pain": Activity,
  "Medical Research": Microscope,
};

const categoryColors: Record<string, string> = {
  Nutrition: "bg-green-500/10 text-green-400",
  "Physical Activity": "bg-blue-500/10 text-blue-400",
  "Emotional Well-Being": "bg-purple-500/10 text-purple-400",
  "Daily Living": "bg-orange-500/10 text-orange-400",
  "Family & Relationships": "bg-pink-500/10 text-pink-400",
  "Managing Pain": "bg-red-500/10 text-red-400",
  "Medical Research": "bg-cyan-500/10 text-cyan-400",
};

const ResourcesSection = memo(() => {
  const { data: resources, isLoading } = useHealthyLivingResources();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = resources
    ? [...new Set(resources.map((r) => r.category))]
    : [];

  const filtered = selectedCategory
    ? resources?.filter((r) => r.category === selectedCategory)
    : resources;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
        Healthy Living Resources
      </h3>
      <p className="text-white/60 mb-6">
        Curated resources to help you live well with arthritis.
      </p>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !selectedCategory
              ? "bg-primary text-primary-foreground"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Skeleton className="h-5 w-48 mb-2 bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
              </div>
            ))
          : (
              <AnimatePresence mode="popLayout">
                {filtered?.map((resource) => {
                  const Icon = categoryIcons[resource.category] || Activity;
                  const colorClass =
                    categoryColors[resource.category] || "bg-white/10 text-white/60";
                  return (
                    <motion.a
                      key={resource.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      href={resource.external_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-white group-hover:text-primary transition-colors">
                              {resource.title}
                            </h4>
                            <ExternalLink className="w-3.5 h-3.5 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                          <p className="text-sm text-white/60 line-clamp-2">
                            {resource.description}
                          </p>
                          <span
                            className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${colorClass}`}
                          >
                            {resource.category}
                          </span>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </AnimatePresence>
            )}
      </div>
    </motion.div>
  );
});

ResourcesSection.displayName = "ResourcesSection";

export default ResourcesSection;
