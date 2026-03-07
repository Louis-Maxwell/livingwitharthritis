import { memo } from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "NHS", label: "National Health Service", color: "text-blue-600 bg-blue-500/10 border-blue-500/20" },
  { name: "NICE", label: "NICE Guidelines", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  { name: "ARUK", label: "Arthritis Research UK", color: "text-violet-600 bg-violet-500/10 border-violet-500/20" },
  { name: "CSP", label: "Chartered Society of Physiotherapy", color: "text-amber-600 bg-amber-500/10 border-amber-500/20" },
  { name: "RCOT", label: "Royal College of OT", color: "text-rose-600 bg-rose-500/10 border-rose-500/20" },
  { name: "BDA", label: "British Dietetic Association", color: "text-cyan-600 bg-cyan-500/10 border-cyan-500/20" },
];

const PartnersSection = memo(() => (
  <section className="py-12 lg:py-16 section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <span className="section-label text-primary mb-3 block">Trusted By</span>
        <p className="text-sm text-muted-foreground/60 max-w-md mx-auto">
          Aligned with leading UK health organisations and evidence-based guidelines.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-5 items-center">
        {partners.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-2.5 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`w-[72px] h-[72px] rounded-2xl border flex items-center justify-center ${p.color} group-hover:shadow-md transition-all duration-500`}
            >
              <span className="text-sm font-extrabold">
                {p.name}
              </span>
            </motion.div>
            <span className="text-[10px] text-muted-foreground/50 text-center leading-tight font-medium">
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
