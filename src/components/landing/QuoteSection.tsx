import { memo } from "react";
import { motion } from "framer-motion";
import { Quote, Shield, Award, CheckCircle } from "lucide-react";

const credentials = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
];

const QuoteSection = memo(() => (
  <section className="py-20 lg:py-28 bg-foreground relative overflow-hidden">
    {/* Texture */}
    <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)', backgroundSize: '36px 36px' }} />
    
    {/* Glow orbs */}
    <div className="absolute top-[-250px] right-[-250px] w-[600px] h-[600px] rounded-full bg-primary/12 blur-[140px] pointer-events-none" />
    <div className="absolute bottom-[-250px] left-[-250px] w-[500px] h-[500px] rounded-full bg-secondary/8 blur-[120px] pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center"
      >
        <Quote className="w-14 h-14 text-primary/30 mx-auto mb-10 rotate-180" />
        <blockquote className="font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl font-bold text-background leading-[1.35] mb-10 italic tracking-tight">
          Movement is the most powerful medicine. The right exercise, the right nutrition, and the right support 
          can fundamentally transform how you live with arthritis.
        </blockquote>
        <div className="w-16 h-[2px] bg-primary/40 mx-auto mb-6" />
        <cite className="text-background/50 text-base sm:text-lg font-semibold not-italic block mb-14 tracking-wide">
          — Living With Arthritis Clinical Team
        </cite>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-2.5 bg-background/[0.06] backdrop-blur-sm rounded-full px-6 py-3 border border-background/[0.06] hover:bg-background/[0.1] transition-colors duration-300"
              >
                <Icon className="w-4 h-4 text-primary/70" />
                <span className="text-background/60 text-xs font-bold tracking-wider">{c.label}</span>
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
