import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const conditions = [
  {
    title: "Cervical Myelopathy",
    description: "Compression of the spinal cord at neck level due to trauma or structural changes in the neck bones.",
    category: "Neurological",
    color: "bg-blue-500",
  },
  {
    title: "Rheumatoid Arthritis",
    description: "A chronic inflammatory disorder affecting many joints, typically on both sides of the body.",
    category: "Rheumatology",
    color: "bg-emerald-500",
  },
  {
    title: "Osteoarthritis",
    description: "The most common form of arthritis, occurring when protective cartilage wears down over time.",
    category: "Orthopaedic",
    color: "bg-purple-500",
  },
  {
    title: "Coccydynia",
    description: "Pain in your coccyx (tail bone), often caused by sitting or trauma to the area.",
    category: "Pain",
    color: "bg-red-500",
  },
  {
    title: "Juvenile Arthritis",
    description: "Arthritis affecting children, causing joint swelling, pain, stiffness, and limited motion.",
    category: "Paediatrics",
    color: "bg-amber-500",
  },
  {
    title: "Cluster Headaches",
    description: "Severe headaches that begin quickly and often affect only one side of the head.",
    category: "Neurological",
    color: "bg-blue-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ConditionsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Medical Resources
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Conditions <span className="text-gradient">A-Z</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive guide to arthritis conditions. Find trusted information 
            about symptoms, treatments, and management strategies.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {conditions.map((condition, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group h-full bg-card hover:shadow-large transition-all duration-500 cursor-pointer border-border/50 hover:border-primary/20 rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={`${condition.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {condition.category}
                    </Badge>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {condition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {condition.description}
                  </CardDescription>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-primary font-semibold hover:bg-transparent group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Read more
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="btn-premium text-primary-foreground font-bold px-10 py-6 rounded-full text-base"
          >
            View All Conditions
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ConditionsSection;
