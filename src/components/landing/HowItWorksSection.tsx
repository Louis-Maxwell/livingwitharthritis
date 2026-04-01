import { memo } from "react";
import { Search, UserCheck, Dumbbell, Heart } from "lucide-react";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our curated library of 40+ clinically reviewed exercises, nutrition plans, and expert articles.", num: "01" },
  { icon: UserCheck, title: "Get Personalised Guidance", desc: "Use our AI assistant or book a free virtual consultation with a HCPC-registered physiotherapist.", num: "02" },
  { icon: Dumbbell, title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory Mediterranean diet plan.", num: "03" },
  { icon: Heart, title: "Transform Your Life", desc: "Track your progress, connect with 50,000+ people in our community, and celebrate milestones.", num: "04" },
];

const HowItWorksSection = memo(() => (
  <section className="section-spacer relative bg-warm">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl">
      <div className="text-center mb-20">
        <span className="section-label text-primary/70 mb-5 block">How It Works</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground mb-6 leading-[1.08] tracking-tight">
          Your path to better living
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
          A structured, evidence-based approach designed by our clinical team.
          Most patients report significant improvement within 8–12 weeks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="text-center relative group">
              <span className="font-display text-[3.5rem] font-bold text-primary/[0.06] leading-none block mb-4">
                {step.num}
              </span>
              <div className="w-14 h-14 rounded-2xl bg-primary/6 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.75]">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
