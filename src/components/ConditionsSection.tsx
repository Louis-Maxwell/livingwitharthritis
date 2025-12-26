import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const conditions = [
  {
    title: "Cervical Myelopathy",
    description: "Cervical myelopathy refers to compression of the spinal cord at neck level. This compression can be due to trauma, or a structural congenital, or degenerative change, in the neck bones and/or intervertebral disc.",
    category: "Neurological",
    categoryColor: "bg-medical-blue"
  },
  {
    title: "Rheumatoid Arthritis",
    description: "A chronic inflammatory disorder affecting many joints, including those in the hands and feet. It typically affects both sides of the body.",
    category: "Rheumatology", 
    categoryColor: "bg-primary"
  },
  {
    title: "Osteoarthritis",
    description: "The most common form of arthritis, occurring when protective cartilage that cushions the ends of bones wears down over time.",
    category: "Orthopaedic",
    categoryColor: "bg-accent"
  },
  {
    title: "Coccydynia",
    description: "Coccydynia is the medical term used to describe pain in your coccyx (tail bone).",
    category: "Pain",
    categoryColor: "bg-destructive"
  },
  {
    title: "Juvenile Arthritis", 
    description: "Arthritis that affects children. It can cause joint swelling, pain, stiffness, and loss of motion.",
    category: "Paediatrics",
    categoryColor: "bg-secondary"
  },
  {
    title: "Cluster Headaches",
    description: "Cluster headaches begin quickly and without warning. The pain is very severe and often affects only one side of the head.",
    category: "Neurological",
    categoryColor: "bg-medical-blue"
  }
];

const ConditionsSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Arthritis Conditions A-Z
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about specific conditions and how to manage them. Browse our comprehensive guide to arthritis types and find trusted information about symptoms and treatments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {conditions.map((condition, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-medium transition-all duration-300 cursor-pointer border-border hover:border-primary/20 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${condition.categoryColor} text-white text-xs`}>
                    {condition.category}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                  {condition.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                  {condition.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full group-hover:border-primary group-hover:text-primary transition-colors duration-300"
                >
                  Read more
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8"
          >
            View All Conditions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;