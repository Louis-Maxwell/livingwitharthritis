import { memo } from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "NHS", label: "National Health Service" },
  { name: "NICE", label: "NICE Guidelines" },
  { name: "ARUK", label: "Arthritis Research UK" },
  { name: "CSP", label: "Chartered Society of Physiotherapy" },
  { name: "RCOT", label: "Royal College of OT" },
  { name: "BDA", label: "British Dietetic Association" },
];

const PartnersSection = memo(() => (
  <section className="py-16 lg:py-20 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="section-label text-primary mb-3 block">Trusted By</span>
        <p className="text-sm text-muted-foreground/60 max-w-md mx-auto">
          Aligned with leading health organisations and evidence-based guidelines.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/60 border border-border/20 flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors duration-300">
              <span className="text-sm font-bold text-primary/70 group-hover:text-primary transition-colors">
                {p.name}
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground/50 text-center leading-tight">
              {p.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

PartnersSection.displayName = "PartnersSection";
export default PartnersSection;
