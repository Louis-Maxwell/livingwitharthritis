import { motion } from "framer-motion";
import { Utensils, Fish, Cherry, Milk, Leaf } from "lucide-react";

const NutritionArticleSection = () => {
  const sections = [
    {
      title: "Autoimmune and Inflammatory Arthritis",
      icon: Fish,
      content: `Rheumatoid arthritis has been the primary focus of nutritional research on autoimmune inflammatory arthritides. Diets abundant in omega-3 fatty acids, antioxidants, and phytochemicals—found in fruits, vegetables, fish, olive oil, whole grains, nuts, seeds, and legumes—have been associated with reduced RA symptoms.

The Mediterranean diet, which emphasizes these foods while limiting red meats, processed items, and saturated fats, has shown promise. Cold-water fish (e.g., salmon, sardines, mackerel) provide omega-3s with potent anti-inflammatory effects. Extra-virgin olive oil's compound oleocanthal inhibits pro-inflammatory enzymes similarly to ibuprofen.`,
      foods: ["Salmon & Sardines", "Olive Oil", "Blueberries", "Green Tea", "Spinach"],
    },
    {
      title: "Osteoarthritis",
      icon: Leaf,
      content: `Maintaining a healthy weight is crucial for OA, as excess pounds increase joint stress—each additional pound adds four pounds of pressure on weight-bearing joints like knees and hips.

Vitamins D and K deficiencies correlate with greater cartilage and bone damage. Sources include fatty fish and fortified foods for vitamin D, and leafy greens for vitamin K. Cruciferous vegetables (e.g., broccoli) contain sulforaphane, which may inhibit inflammation and slow progression.`,
      foods: ["Broccoli", "Leafy Greens", "Fatty Fish", "Pomegranates", "Garlic"],
    },
    {
      title: "Gout",
      icon: Cherry,
      content: `Gout has the clearest dietary ties among arthritides. Purines, broken down into uric acid, accumulate in those with impaired excretion, forming painful joint crystals.

Limiting high-purine foods is essential: red meats, most seafood, meat-based gravies, fructose-sweetened drinks, and alcohol (especially beer). Cherries (sweet or tart) provide anthocyanins and quercetin with antioxidant and anti-inflammatory properties, reducing flare frequency.`,
      foods: ["Cherries", "Low-fat Dairy", "Citrus Fruits", "Coffee", "Vitamin C Foods"],
    },
    {
      title: "Osteoporosis",
      icon: Milk,
      content: `Nutrition supports bone density and fracture prevention. Calcium-rich foods—dairy, leafy greens, shellfish, soy products, nuts/seeds—are foundational, alongside vitamin D from fatty fish, egg yolks, mushrooms, and fortified items.

Emerging research highlights fruits, vegetables, and phytochemicals for bone rebuilding. Prunes stand out for vitamins K, boron, and potassium. Mediterranean adherence supports bone health.`,
      foods: ["Dairy Products", "Prunes", "Almonds", "Chia Seeds", "Egg Yolks"],
    },
  ];

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
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
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
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
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
