import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Users, ShieldCheck, HeartPulse } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const SocialProofSection = memo(() => (
  <section className="py-12 lg:py-16 bg-background border-y border-border/20 relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
    <div className="container mx-auto px-6 md:px-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 max-w-5xl mx-auto">
        {/* Rating */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            <AnimatedCounter target={49} suffix="" prefix="" duration={1800} />
            <span className="text-lg text-muted-foreground font-normal"> / 5</span>
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            from <AnimatedCounter target={2400} suffix="+" className="font-semibold text-foreground" /> reviews
          </span>
        </div>

        {/* Users */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            <AnimatedCounter target={10000} suffix="+" compact />
          </span>
          <span className="text-xs text-muted-foreground font-medium">patients across the UK</span>
        </div>

        {/* NHS */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/8 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            <AnimatedCounter display="NHS" />
          </span>
          <span className="text-xs text-muted-foreground font-medium">complementary care</span>
        </div>

        {/* Conditions */}
        <div className="flex flex-col items-center gap-3 text-center group">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/8 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform duration-300">
            <HeartPulse className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-2xl md:text-3xl font-display font-bold text-foreground tracking-tight">
            <AnimatedCounter target={100} suffix="+" />
          </span>
          <span className="text-xs text-muted-foreground font-medium">arthritis types covered</span>
        </div>
      </motion.div>
    </div>
  </section>
));

SocialProofSection.displayName = "SocialProofSection";
export default SocialProofSection;
