import { memo } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Dumbbell, Heart } from "lucide-react";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our curated library of joint-specific exercises, evidence-based nutrition plans, and expert clinical articles.", color: "icon-circle-sky" },
  { icon: UserCheck, title: "Get Personalised Guidance", desc: "Use our AI health assistant or book a free virtual consultation with a qualified physiotherapist.", color: "icon-circle-emerald" },
  { icon: Dumbbell, title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory diet plan designed for your specific needs.", color: "icon-circle-violet" },
  { icon: Heart, title: "Feel the Transformation", desc: "Track your progress, connect with our community, and celebrate every milestone in your journey.", color: "icon-circle-coral" },
];

const stepGradients = [
  "from-sky to-blue-600",
  "from-emerald to-teal",
  "from-violet to-purple-600",
  "from-coral to-primary",
];

const HowItWorksSection = memo(() => (
  <section className="py-20 lg:py-28 bg-tint-blue relative section-divider overflow-hidden">
    {/* Decorative pattern */}
    <div className="absolute inset-0 pattern-dots pointer-events-none" />
    
    {/* Colorful floating shapes */}
    <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-sky/10 blur-2xl pointer-events-none" />
    <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-emerald/10 blur-2xl pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full bg-violet/8 blur-2xl pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 max-w-6xl relative">
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
              <div className={`${step.color} w-[72px] h-[72px] rounded-2xl flex items-center justify-center mx-auto mb-7 relative group-hover:shadow-medium transition-all duration-500`}>
                <Icon className="w-7 h-7" />
                <span className={`absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-gradient-to-br ${stepGradients[i]} text-white text-[11px] font-bold flex items-center justify-center shadow-sm`}>{i + 1}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-[calc(100%_-_20px)] w-10 border-t-2 border-dashed border-primary/15" />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
