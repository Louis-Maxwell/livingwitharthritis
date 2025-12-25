import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

const conditions = [
  {
    title: "Rheumatoid Arthritis",
    description: "An autoimmune disorder causing chronic inflammation in multiple joints, typically affecting both sides of the body symmetrically.",
    category: "Autoimmune",
  },
  {
    title: "Osteoarthritis",
    description: "The most common form of arthritis, occurring when protective cartilage cushioning bone ends gradually wears down over time.",
    category: "Degenerative",
  },
  {
    title: "Psoriatic Arthritis",
    description: "Inflammatory arthritis associated with psoriasis, affecting both skin and joints with varying severity.",
    category: "Autoimmune",
  },
  {
    title: "Gout",
    description: "Caused by uric acid crystal buildup in joints, leading to sudden and severe episodes of pain and inflammation.",
    category: "Metabolic",
  },
  {
    title: "Juvenile Arthritis",
    description: "Encompasses arthritis conditions affecting children, causing persistent joint inflammation and related symptoms.",
    category: "Pediatric",
  },
  {
    title: "Ankylosing Spondylitis",
    description: "Inflammatory disease primarily affecting the spine, potentially causing vertebrae fusion over time.",
    category: "Inflammatory",
  },
];

const ConditionsSection = () => {
  return (
    <section id="resources" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Conditions A-Z
            </span>
            <h2 className="font-display text-display-md lg:text-display-lg text-foreground mb-4">
              Explore Arthritis{' '}
              <span className="text-primary">Conditions</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Browse our comprehensive guide to understand different types, symptoms, 
              and evidence-based treatment approaches.
            </p>
          </div>
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 shadow-soft hover:shadow-medium transition-all duration-300 group self-start lg:self-auto"
          >
            View All Conditions
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Conditions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition, index) => (
            <Card 
              key={index} 
              className="group bg-card hover:shadow-medium border-border/50 transition-all duration-500 cursor-pointer overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 lg:p-8">
                {/* Category badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {condition.category}
                  </span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {condition.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {condition.description}
                </p>

                {/* Divider and link */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;