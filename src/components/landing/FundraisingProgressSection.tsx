import { memo } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const FundraisingProgressSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/20 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl border border-border/20 p-10 lg:p-14 text-center shadow-soft">
        <Heart className="w-10 h-10 text-primary mx-auto mb-6" />
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
          Help us reach our <span className="text-primary italic">goal</span>
        </h2>
        <p className="text-muted-foreground mb-8">Every donation helps us provide free physiotherapy and support to more people.</p>
        <div className="max-w-md mx-auto mb-3">
          <Progress value={68} className="h-3 rounded-full" />
        </div>
        <div className="flex justify-between text-sm mb-8 max-w-md mx-auto">
          <span className="text-primary font-bold">£34,000 raised</span>
          <span className="text-muted-foreground">£50,000 goal</span>
        </div>
        <Button className="rounded-full btn-gold px-8 h-12">
          <Heart className="w-4 h-4 mr-2" /> Donate Now
        </Button>
      </motion.div>
    </div>
  </section>
));

FundraisingProgressSection.displayName = "FundraisingProgressSection";
export default FundraisingProgressSection;
