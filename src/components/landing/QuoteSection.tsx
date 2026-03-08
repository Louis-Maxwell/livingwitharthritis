import { memo } from "react";
import { motion } from "framer-motion";
import { Quote, Shield, Award, CheckCircle, Sparkles } from "lucide-react";

const credentials = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
];

const QuoteSection = memo(() => (
  <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
    {/* Refined dot pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
    
    {/* Decorative gradient orbs */}
    <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] rounded-full bg-primary-foreground/5 blur-[100px] pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <Quote className="w-12 h-12 text-primary-foreground/20 mx-auto mb-8 rotate-180" />
        <blockquote className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-3xl font-bold text-primary-foreground leading-[1.4] mb-8">
          Movement is the most powerful medicine. The right exercise, the right nutrition, and the right support 
          can fundamentally transform how you live with arthritis — at any age, at any stage.
        </blockquote>
        <cite className="text-primary-foreground/60 text-base sm:text-lg font-semibold not-italic block mb-12">
          — Living With Arthritis Clinical Team
        </cite>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-2.5 bg-primary-foreground/[0.08] backdrop-blur-sm rounded-full px-5 py-2.5 border border-primary-foreground/[0.08]"
              >
                <Icon className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-primary-foreground/75 text-xs font-bold tracking-wide">{c.label}</span>
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