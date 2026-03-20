import { memo } from "react";
import { motion } from "framer-motion";
import { Search, UserCheck, Dumbbell, Heart, ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our curated library of 40+ clinically reviewed exercises, evidence-based nutrition plans, and expert articles — all NICE-compliant.", color: "icon-circle-sky", metric: "40+ resources" },
  { icon: UserCheck, title: "Get Personalised Guidance", desc: "Use our AI health assistant or book a free virtual consultation with a HCPC-registered physiotherapist. No referral needed.", color: "icon-circle-emerald", metric: "24/7 access" },
  { icon: Dumbbell, title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory Mediterranean diet plan designed specifically for your condition.", color: "icon-circle-violet", metric: "78% pain reduction" },
  { icon: Heart, title: "Transform Your Life", desc: "Track your progress with our symptom journal, connect with 50,000+ people in our community, and celebrate every milestone.", color: "icon-circle-coral", metric: "97% satisfaction" },
];

const stepGradients = [
  "from-sky to-blue-600",
  "from-emerald to-teal",
  "from-violet to-purple-600",
  "from-coral to-primary",
];

const HowItWorksSection = memo(() => (
  <section className="py-24 lg:py-32 bg-tint-blue relative section-divider overflow-hidden">
    {/* Decorative pattern */}
    <div className="absolute inset-0 pattern-dots pointer-events-none" />
    
    {/* Colorful floating shapes */}
    <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-sky/10 blur-2xl pointer-events-none" />
    <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-emerald/10 blur-2xl pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 max-w-6xl relative">
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-20">
        <span className="section-label text-primary mb-5 block">How It Works</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.08] tracking-tight">
          Your path to better living in{" "}
          <span className="text-gradient italic">four steps</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed mt-4">
          A structured, evidence-based approach designed by our clinical team. 
          Most patients report significant improvement within 8–12 weeks.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-8" />
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
              <p className="text-sm text-muted-foreground leading-[1.7] mb-3">{step.desc}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary uppercase tracking-wider">{step.metric}</span>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-9 left-[calc(100%_-_20px)] w-10">
                  <ArrowRight className="w-4 h-4 text-primary/20" />
                </div>
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
