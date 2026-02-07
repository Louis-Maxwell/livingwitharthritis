import { motion } from "framer-motion";
import { TrendingUp, Users, Heart, Globe } from "lucide-react";

const impactItems = [
  {
    icon: Users,
    stat: "10 Million",
    label: "People we represent across the UK living with arthritis",
  },
  {
    icon: Heart,
    stat: "£2.5M+",
    label: "Invested in arthritis research and patient support programmes",
  },
  {
    icon: Globe,
    stat: "100+",
    label: "Types of arthritis conditions we provide information on",
  },
  {
    icon: TrendingUp,
    stat: "50,000+",
    label: "Community members connected through our support network",
  },
];

const ImpactBanner = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-accent overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="editorial-caption text-gold inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold/30" />
            Our Impact
            <span className="w-8 h-px bg-gold/30" />
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-accent-foreground">
            Making a Real <span className="italic font-normal text-gold">Difference</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {impactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold text-accent-foreground mb-2 tracking-tight">
                  {item.stat}
                </div>
                <p className="text-sm text-accent-foreground/50 font-light leading-relaxed max-w-[200px] mx-auto">
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
