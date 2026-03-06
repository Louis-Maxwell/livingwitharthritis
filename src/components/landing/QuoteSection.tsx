import { memo } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground leading-relaxed mb-8">
          99% of the time, you will get hypocritical politeness from people. Try and stamp it out of your culture. Criticism can be constructive and it can be delivered in a nice way. Have a culture of 'dare to disagree'.
        </blockquote>
        <cite className="text-primary-foreground/70 text-base sm:text-lg font-semibold not-italic">
          — Vinod Khosla
        </cite>
      </motion.div>
    </div>
  </section>
));

QuoteSection.displayName = "QuoteSection";
export default QuoteSection;
