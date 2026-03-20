import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Users, ShieldCheck, HeartPulse, Award } from "lucide-react";

const SocialProofSection = memo(() => (
  <section className="py-12 lg:py-16 bg-background border-y border-border/20 relative overflow-hidden">
    {/* Subtle grain */}
    <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
    <div className="container mx-auto px-6 md:px-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
        {/* Rating */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">4.9 / 5</span>
          <span className="text-xs text-muted-foreground font-medium">from 2,400+ reviews</span>
        </div>

        {/* Users */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">10,000+</span>
          <span className="text-xs text-muted-foreground font-medium">patients across the UK</span>
        </div>

        {/* NHS */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/8 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">NHS</span>
          <span className="text-xs text-muted-foreground font-medium">complementary care</span>
        </div>

        {/* Conditions */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/8 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <HeartPulse className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">100+</span>
          <span className="text-xs text-muted-foreground font-medium">arthritis types covered</span>
        </div>
      </motion.div>
    </div>
  </section>
));

SocialProofSection.displayName = "SocialProofSection";
export default SocialProofSection;
