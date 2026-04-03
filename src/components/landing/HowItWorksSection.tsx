import { memo } from "react";
import { Search, UserCheck, Dumbbell, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: Search, title: "Explore Resources", desc: "Browse our curated library of 120+ clinically reviewed exercises, nutrition plans, and expert articles.", num: "01", link: "/blog", linkText: "Browse articles" },
  { icon: UserCheck, title: "Get Personalised Guidance", desc: "Use our AI assistant or book a free virtual consultation with a HCPC-registered physiotherapist.", num: "02", link: "/chat", linkText: "Talk to AI assistant" },
  { icon: Dumbbell, title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory Mediterranean diet plan.", num: "03", link: "/exercises", linkText: "View exercises" },
  { icon: Heart, title: "Transform Your Life", desc: "Track your progress, connect with 10,000+ people in our community, and celebrate milestones.", num: "04", link: "/community", linkText: "Join community" },
];

const HowItWorksSection = memo(() => (
  <section className="py-28 lg:py-36 relative">
    <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
      <div className="text-center mb-20">
        <span className="section-label text-primary/60 mb-5 block">How It Works</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.06] tracking-tight">
          Your path to better living
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          A structured, evidence-based approach designed by our clinical team.
          Most patients report significant improvement within 8–12 weeks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={i} className="text-center relative group">
              {/* Large faded step number */}
              <span className="font-display text-[4.5rem] font-bold text-primary/[0.04] leading-none block mb-3">
                {step.num}
              </span>
              {/* Connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute top-16 right-0 translate-x-1/2 w-12 h-px bg-border/20 hidden lg:block" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-primary/[0.04] flex items-center justify-center mx-auto mb-7 group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
                <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-[1.8] mb-5">{step.desc}</p>
              <Link
                to={step.link}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.12em] uppercase hover:gap-2.5 transition-all"
              >
                {step.linkText} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
));

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
