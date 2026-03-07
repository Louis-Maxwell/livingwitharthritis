import { memo } from "react";
import { motion } from "framer-motion";
import { Star, Users, ShieldCheck, HeartPulse } from "lucide-react";

const SocialProofSection = memo(() => (
  <section className="py-10 lg:py-14 bg-background border-y border-border/30">
    <div className="container mx-auto px-6 md:px-10">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
        {/* Rating */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />)}
          </div>
          <span className="text-lg font-extrabold text-foreground">4.9 / 5</span>
          <span className="text-xs text-muted-foreground">from 2,400+ reviews</span>
        </div>

        {/* Users */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-extrabold text-foreground">10,000+</span>
          <span className="text-xs text-muted-foreground">patients across the UK</span>
        </div>

        {/* NHS */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-lg font-extrabold text-foreground">NHS</span>
          <span className="text-xs text-muted-foreground">complementary care</span>
        </div>

        {/* Conditions */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-1">
            <HeartPulse className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-lg font-extrabold text-foreground">100+</span>
          <span className="text-xs text-muted-foreground">arthritis types covered</span>
        </div>
      </motion.div>
    </div>
  </section>
));

SocialProofSection.displayName = "SocialProofSection";
export default SocialProofSection;
