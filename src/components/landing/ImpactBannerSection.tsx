import { memo } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "10M+", label: "People affected in the UK" },
  { value: "100+", label: "Types of arthritis" },
  { value: "£10B", label: "Annual NHS cost" },
  { value: "1 in 6", label: "Adults in the UK" },
];

const ImpactBannerSection = memo(() => (
  <section className="py-10 lg:py-14 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary" />
    {/* Subtle pattern */}
    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    <div className="container mx-auto px-6 md:px-10 relative">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-2 tracking-tight">{s.value}</div>
            <p className="text-xs sm:text-sm text-primary-foreground/70 font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

ImpactBannerSection.displayName = "ImpactBannerSection";
export default ImpactBannerSection;
