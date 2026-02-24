import { memo } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Dumbbell, Heart } from "lucide-react";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our library of exercises, nutrition plans, and expert articles tailored for arthritis." },
  { icon: UserCheck, title: "Get Personalised Advice", desc: "Use our AI assistant or book a free virtual consultation with a physiotherapist." },
  { icon: Dumbbell, title: "Follow Your Plan", desc: "Start with gentle exercises and an anti-inflammatory diet designed for your needs." },
  { icon: Heart, title: "Feel the Difference", desc: "Track your progress and join a supportive community that celebrates every improvement." },
];

const HowItWorksSection = memo(() => (
  <section className="py-28 lg:py-36 bg-background relative section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
        <span className="section-label text-primary mb-4 block">Getting Started</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
          Four simple <span className="text-primary italic">steps</span>
        </h2>
        <div className="luxury-divider">
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }} className="text-center relative group">
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-primary/6 flex items-center justify-center mx-auto mb-7 relative group-hover:bg-primary/10 transition-colors duration-500">
                <Icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-primary">{i + 1}</span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && <div className="hidden lg:block absolute top-9 left-[calc(100%_-_20px)] w-10 border-t-2 border-dashed border-border/50" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
