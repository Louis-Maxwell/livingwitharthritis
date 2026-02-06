import { memo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Utensils, Dumbbell, Heart, Home, Users, Activity } from "lucide-react";
import { useHealthyLivingResources } from "@/hooks/useCmsContent";
import { Skeleton } from "@/components/ui/skeleton";

const categoryIcons: Record<string, typeof Utensils> = {
  Nutrition: Utensils,
  "Physical Activity": Dumbbell,
  "Emotional Well-Being": Heart,
  "Daily Living": Home,
  "Family & Relationships": Users,
  "Managing Pain": Activity,
};

const categoryColors: Record<string, string> = {
  Nutrition: "bg-green-500/10 text-green-400",
  "Physical Activity": "bg-blue-500/10 text-blue-400",
  "Emotional Well-Being": "bg-purple-500/10 text-purple-400",
  "Daily Living": "bg-orange-500/10 text-orange-400",
  "Family & Relationships": "bg-pink-500/10 text-pink-400",
  "Managing Pain": "bg-red-500/10 text-red-400",
};

interface ResourcesModalProps {
  children: React.ReactNode;
}

const ResourcesModal = memo(({ children }: ResourcesModalProps) => {
  const { data: resources, isLoading } = useHealthyLivingResources();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = resources
    ? [...new Set(resources.map((r) => r.category))]
    : [];

  const filtered = selectedCategory
    ? resources?.filter((r) => r.category === selectedCategory)
    : resources;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            Healthy Living Resources
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Curated resources from the Arthritis Foundation to help you live well.
          </p>
        </DialogHeader>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 py-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !selectedCategory
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
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
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources list */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-2">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl border border-border">
                  <Skeleton className="h-5 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            : filtered?.map((resource) => {
                const Icon = categoryIcons[resource.category] || Activity;
                const colorClass =
                  categoryColors[resource.category] || "bg-muted text-muted-foreground";
                return (
                  <a
                    key={resource.id}
                    href={resource.external_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {resource.title}
                          </h4>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {resource.description}
                        </p>
                        <span
                          className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide ${colorClass}`}
                        >
                          {resource.category}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>
      </DialogContent>
    </Dialog>
  );
});

ResourcesModal.displayName = "ResourcesModal";

export default ResourcesModal;
