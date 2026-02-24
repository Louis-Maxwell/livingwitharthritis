import { memo } from "react";
import { motion } from "framer-motion";
import { Accessibility, Eye, Ear, Keyboard } from "lucide-react";

const features = [
  { icon: Eye, title: "High Contrast", desc: "All content designed with WCAG AA contrast ratios for easy reading." },
  { icon: Keyboard, title: "Keyboard Navigation", desc: "Full keyboard support — every feature is accessible without a mouse." },
  { icon: Ear, title: "Screen Reader Friendly", desc: "Semantic HTML and ARIA labels for complete screen reader compatibility." },
  { icon: Accessibility, title: "Responsive Design", desc: "Works beautifully on desktop, tablet, and mobile devices." },
];

const AccessibilitySection = memo(() => (
  <section className="py-24 lg:py-32 bg-accent/30 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Accessibility</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
          Designed for <span className="text-primary italic">everyone</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="bg-card rounded-3xl border border-border/20 p-7 text-center card-hover">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

AccessibilitySection.displayName = "AccessibilitySection";
export default AccessibilitySection;
