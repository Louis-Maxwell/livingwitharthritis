import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, Users, Heart, Globe } from "lucide-react";

const impactItems = [
  { icon: Users, stat: "10 Million", label: "People we support across the UK" },
  { icon: Heart, stat: "£2.5M+", label: "Invested in research & patient care" },
  { icon: Globe, stat: "100+", label: "Arthritis conditions covered" },
  { icon: TrendingUp, stat: "50,000+", label: "Community members connected" },
];

const ImpactBanner = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const orbX1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const orbX2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="relative py-14 lg:py-20 bg-navy text-navy-foreground overflow-hidden section-divider">
      <motion.div className="gradient-orb w-[400px] h-[400px] bg-primary top-[-50px] right-[-100px]" style={{ x: orbX1 }} />
      <motion.div className="gradient-orb w-[300px] h-[300px] bg-secondary bottom-[-50px] left-[-80px]" style={{ x: orbX2 }} />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {impactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="text-center group"
              >
                <div className="mx-auto w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1 tracking-tight">
                  {item.stat}
                </div>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed max-w-[180px] mx-auto">
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