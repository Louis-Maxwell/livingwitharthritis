import { memo } from "react";
import { motion } from "framer-motion";
import { Quote, Shield, Award, CheckCircle } from "lucide-react";

const credentials = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
];

const QuoteSection = memo(() => (
  <section className="py-14 lg:py-20 bg-primary relative overflow-hidden">
    {/* Subtle pattern */}
    <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    <div className="container mx-auto px-6 md:px-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <Quote className="w-10 h-10 text-primary-foreground/30 mx-auto mb-6 rotate-180" />
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground leading-relaxed mb-6">
          Movement is the best medicine. The right exercise, the right diet, and the right support can transform how you live with arthritis — at any age.
        </blockquote>
        <cite className="text-primary-foreground/70 text-base sm:text-lg font-semibold not-italic block mb-10">
          — Living With Arthritis Clinical Team
        </cite>

        {/* Trust badges inline */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 border border-primary-foreground/10"
              >
                <Icon className="w-3.5 h-3.5 text-primary-foreground/70" />
                <span className="text-primary-foreground/80 text-xs font-semibold">{c.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  </section>
));

QuoteSection.displayName = "QuoteSection";
export default QuoteSection;
