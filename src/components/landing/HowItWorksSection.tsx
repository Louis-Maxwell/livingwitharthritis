import { memo } from "react";
import { Search, UserCheck, Dumbbell, Heart, ArrowRight } from "lucide-react";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our curated library of 40+ clinically reviewed exercises, nutrition plans, and expert articles.", color: "text-sky bg-sky/10" },
  { icon: UserCheck, title: "Get Personalised Guidance", desc: "Use our AI assistant or book a free virtual consultation with a HCPC-registered physiotherapist.", color: "text-emerald bg-emerald/10" },
  { icon: Dumbbell, title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory Mediterranean diet plan.", color: "text-violet bg-violet/10" },
  { icon: Heart, title: "Transform Your Life", desc: "Track your progress, connect with 50,000+ people in our community, and celebrate milestones.", color: "text-coral bg-coral/10" },
];

const stepGradients = [
  "from-sky to-blue-600",
  "from-emerald to-teal",
  "from-violet to-purple-600",
  "from-coral to-primary",
];

const HowItWorksSection = memo(() => (
  <section className="section-spacer relative">
    <div className="container mx-auto px-6 md:px-10 max-w-6xl">
      <div className="text-center mb-16">
        <span className="section-label text-primary mb-5 block">How It Works</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-[1.08] tracking-tight">
          Your path to better living in{" "}
          <span className="text-gradient italic">four steps</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
          A structured, evidence-based approach designed by our clinical team.
          Most patients report significant improvement within 8–12 weeks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={i}
              className="text-center relative group animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`${step.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative group-hover:shadow-md transition-all duration-300`}>
                <Icon className="w-7 h-7" />
                <span className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${stepGradients[i]} text-white text-[11px] font-bold flex items-center justify-center`}>
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(100%_-_16px)] w-8">
                  <ArrowRight className="w-4 h-4 text-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
