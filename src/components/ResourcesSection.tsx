import { memo, useState } from "react";
import { ExternalLink, Utensils, Dumbbell, Heart, Home, Users, Activity, Microscope } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  external_url: string | null;
}

const staticResources: Resource[] = [
  { id: "1", title: "The Ultimate Arthritis Diet", description: "Learn which foods from the Mediterranean diet can help fight inflammation caused by arthritis.", category: "Nutrition", external_url: "https://www.arthritis.org/health-wellness/healthy-living/nutrition/anti-inflammatory/the-ultimate-arthritis-diet" },
  { id: "2", title: "Fitness Solutions: Balance, Flexibility & Therapeutic Exercises", description: "Learn how to incorporate therapeutic exercises and other mindful movements like yoga and tai chi for better flexibility and balance.", category: "Physical Activity", external_url: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity/yoga/fitness-solutions-balance-flexibility-and-therapy" },
  { id: "3", title: "Your Exercise Solution", description: "A resource to help you create a physical activity routine — based on your ability level — with modifications developed and approved by physical therapists.", category: "Physical Activity", external_url: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity/getting-started/your-exercise-solution" },
  { id: "4", title: "Causes of Fatigue in Arthritis", description: "Learn how inflammatory disease and other factors work together to cause your extreme tiredness.", category: "Managing Pain", external_url: "https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue-sleep/causes-of-fatigue-in-arthritis" },
  { id: "5", title: "Eat Right for Your Type of Arthritis", description: "Get details on diets that may help ease inflammation and provide the nutrients you need for your type of arthritis.", category: "Nutrition", external_url: "https://www.arthritis.org/health-wellness/healthy-living/nutrition/healthy-eating/eat-right-for-your-type-of-arthritis" },
  { id: "6", title: "16 Joint-Protection Tips", description: "Protect your joints with these 16 self-care tips for daily living.", category: "Daily Living", external_url: "https://www.arthritis.org/health-wellness/healthy-living/managing-pain/joint-protection/16-joint-protection-tips" },
  { id: "7", title: "Arthritis and Mental Health", description: "Learn about the connection between arthritis, depression and anxiety and how these conditions can make your arthritis worse.", category: "Emotional Well-Being", external_url: "https://www.arthritis.org/health-wellness/healthy-living/emotional-well-being/anxiety-depression/arthritis-and-mental-health" },
  { id: "8", title: "Adapting Your House When You Have Arthritis", description: "Adapt your home to make it easier on your joints and arthritis-friendly.", category: "Daily Living", external_url: "https://www.arthritis.org/health-wellness/healthy-living/daily-living/life-hacks-tips/adapting-your-house" },
  { id: "9", title: "How to Tell People You Have Arthritis", description: "Use these tips to easily tell friends and family about your arthritis.", category: "Family & Relationships", external_url: "https://www.arthritis.org/health-wellness/healthy-living/family-relationships/relationships/how-to-tell-people-you-have-arthritis" },
  { id: "10", title: "The Emotion Pain Connection", description: "Learn to break the cycle of chronic pain and negative emotions.", category: "Emotional Well-Being", external_url: "https://www.arthritis.org/health-wellness/healthy-living/emotional-well-being/emotional-self-care/the-emotion-pain-connection" },
  { id: "11", title: "Sleep & Fatigue Strategies for Arthritis", description: "Sleep and pain management experts share proven strategies to help combat fatigue and poor sleep quality with arthritis.", category: "Managing Pain", external_url: "https://www.arthritis.org/health-wellness/healthy-living/managing-pain/fatigue-sleep/webinar-sleep-and-fatigue-strategies-for-arthritis" },
  { id: "12", title: "Walk With Ease", description: "The Arthritis Foundation's Walk With Ease program has been proven to reduce arthritis pain and other symptoms.", category: "Physical Activity", external_url: "https://www.arthritis.org/health-wellness/healthy-living/physical-activity/walking/walk-with-ease" },
  { id: "13", title: "Healthy Eating Tips", description: "Small changes to your eating habits can make a huge impact on your health and well-being. Use these simple tips to make healthy eating choices.", category: "Nutrition", external_url: "https://www.arthritis.org/health-wellness/healthy-living/nutrition/healthy-eating/healthy-eating-tips" },
];

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(staticResources.map((r) => r.category))];

  const filtered = selectedCategory
    ? staticResources.filter((r) => r.category === selectedCategory)
    : staticResources;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-10"
    >
      <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
        Healthy Living Resources
      </h3>
      <p className="text-muted-foreground mb-6">
        Curated resources to help you live well with arthritis.
      </p>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !selectedCategory
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
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
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((resource) => {
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
                className="group block p-4 rounded-xl bg-muted border border-border hover:border-primary/30 hover:bg-accent transition-all"
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
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
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
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

ResourcesSection.displayName = "ResourcesSection";

export default ResourcesSection;
