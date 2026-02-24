import { memo } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "10M+", label: "People affected in the UK" },
  { value: "100+", label: "Types of arthritis" },
  { value: "£10B", label: "Annual NHS cost" },
  { value: "1 in 6", label: "Adults in the UK" },
];

const ImpactBannerSection = memo(() => (
  <section className="py-16 bg-navy text-navy-foreground relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
    <div className="container mx-auto px-6 md:px-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-2">{s.value}</div>
            <p className="text-xs sm:text-sm text-white/40 tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

ImpactBannerSection.displayName = "ImpactBannerSection";
export default ImpactBannerSection;
