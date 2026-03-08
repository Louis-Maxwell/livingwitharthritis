import { memo } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Dumbbell, Heart } from "lucide-react";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our curated library of joint-specific exercises, evidence-based nutrition plans, and expert clinical articles." },
  { icon: UserCheck, title: "Get Personalised Guidance", desc: "Use our AI health assistant or book a free virtual consultation with a qualified physiotherapist." },
  { icon: Dumbbell, title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory diet plan designed for your specific needs." },
  { icon: Heart, title: "Feel the Transformation", desc: "Track your progress, connect with our community, and celebrate every milestone in your journey." },
];

const HowItWorksSection = memo(() => (
  <section className="py-20 lg:py-28 bg-tint-blue relative section-divider">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
        <span className="section-label text-primary mb-5 block">How It Works</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-[1.08]">
          Your path to better living in{" "}
          <span className="text-gradient">four steps</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="text-center relative group">
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-card flex items-center justify-center mx-auto mb-7 relative border border-border/30 group-hover:border-primary/15 group-hover:shadow-medium transition-all duration-500">
                <Icon className="w-7 h-7 text-primary" />
                <span className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground text-[11px] font-bold flex items-center justify-center shadow-sm">{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{step.desc}</p>
              {i < steps.length - 1 && <div className="hidden lg:block absolute top-9 left-[calc(100%_-_20px)] w-10 border-t-2 border-dashed border-primary/15" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;