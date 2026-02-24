import { memo } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const rows = [
  { feature: "Free access", us: true, typical: false },
  { feature: "Virtual physiotherapy", us: true, typical: false },
  { feature: "Personalised nutrition plans", us: true, typical: false },
  { feature: "AI health assistant", us: true, typical: false },
  { feature: "Evidence-based exercises", us: true, typical: true },
  { feature: "Community support", us: true, typical: true },
  { feature: "No GP referral required", us: true, typical: false },
];

const ComparisonSection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/20 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-3xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="section-label text-primary mb-4 block">Why Us</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
          What sets us <span className="text-primary italic">apart</span>
        </h2>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card rounded-3xl border border-border/20 overflow-hidden shadow-soft">
        <div className="grid grid-cols-3 text-center text-xs font-bold uppercase tracking-wider py-4 px-6 bg-accent/50 border-b border-border/20">
          <span className="text-left text-muted-foreground">Feature</span>
          <span className="text-primary">Our Service</span>
          <span className="text-muted-foreground/50">Typical</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 items-center py-4 px-6 border-b border-border/10 last:border-0">
            <span className="text-sm text-foreground">{r.feature}</span>
            <div className="flex justify-center">{r.us ? <Check className="w-5 h-5 text-secondary" /> : <X className="w-5 h-5 text-muted-foreground/30" />}</div>
            <div className="flex justify-center">{r.typical ? <Check className="w-5 h-5 text-secondary/50" /> : <X className="w-5 h-5 text-muted-foreground/30" />}</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
));

ComparisonSection.displayName = "ComparisonSection";
export default ComparisonSection;
