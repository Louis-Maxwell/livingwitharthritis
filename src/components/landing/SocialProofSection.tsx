import { memo } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const SocialProofSection = memo(() => (
  <section className="py-14 bg-background border-y border-border/30">
    <div className="container mx-auto px-6 md:px-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
          </div>
          <span className="text-sm font-semibold text-foreground">4.9/5</span>
          <span className="text-xs text-muted-foreground">from 2,400+ reviews</span>
        </div>
        <div className="h-6 w-px bg-border hidden sm:block" />
        <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">Trusted by 10,000+</span> patients across the UK</p>
        <div className="h-6 w-px bg-border hidden sm:block" />
        <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">NHS-complementary</span> care</p>
      </motion.div>
    </div>
  </section>
));

SocialProofSection.displayName = "SocialProofSection";
export default SocialProofSection;
