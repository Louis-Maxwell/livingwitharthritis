import { motion } from "framer-motion";
import { TrendingUp, Users, Heart, Globe } from "lucide-react";

const impactItems = [
  { icon: Users, stat: "10 Million", label: "People we support across the UK" },
  { icon: Heart, stat: "£2.5M+", label: "Invested in research & patient care" },
  { icon: Globe, stat: "100+", label: "Arthritis conditions covered" },
  { icon: TrendingUp, stat: "50,000+", label: "Community members connected" },
];

const ImpactBanner = () => {
  return (
    <section className="relative py-16 lg:py-20 bg-navy text-navy-foreground overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {impactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold mb-1 tracking-tight">
                  {item.stat}
                </div>
                <p className="text-sm text-white/60 leading-relaxed max-w-[200px] mx-auto">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ImpactBanner;