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
  <section className="py-24 lg:py-32 bg-background relative section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <span className="section-label text-primary mb-4 block">Getting Started</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-5">
          Four simple <span className="text-primary">steps</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center relative group">
              <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-6 relative group-hover:bg-primary/12 transition-colors duration-300">
                <Icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shadow-sm">{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-[calc(100%_-_16px)] w-8 border-t-2 border-dashed border-primary/20" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
