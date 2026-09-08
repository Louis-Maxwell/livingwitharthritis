import { memo } from "react";
import { Search, UserCheck, Dumbbell, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";

const STEPS = [
  { key: "explore", icon: Search, num: "01", link: "/blog", title: "Explore Resources", desc: `Browse ${formatInventoryCount(CONTENT_INVENTORY.blogArticles)} clinically reviewed articles on exercise, nutrition and daily living.`, linkText: "Browse articles" },
  { key: "guidance", icon: UserCheck, num: "02", link: "/chat", title: "Get Personalised Guidance", desc: "Use our help chat or book a free virtual consultation with a HCPC-registered physiotherapist.", linkText: "Start a chat" },
  { key: "programme", icon: Dumbbell, num: "03", link: "/exercises", title: "Follow Your Programme", desc: "Begin with tailored low-impact exercises and an anti-inflammatory Mediterranean diet plan.", linkText: "View exercises" },
  { key: "transform", icon: Heart, num: "04", link: "/community", title: "Transform Your Life", desc: "Use the community pages and free guides at your own pace. We are a young charity and do not claim a large membership.", linkText: "Join community" },
] as const;

const HowItWorksSection = memo(() => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/[0.015] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative">
        <div className="text-center mb-20">
          <span className="section-label text-primary mb-5 block">How It Works</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.06] tracking-tight">
            Your path to better living
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            A practical path through free UK guides — start with what you can manage today. This is general information, not a promise of a particular result.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="text-center relative group">
                <span className="font-display text-[4.5rem] font-bold text-primary/[0.04] group-hover:text-primary/[0.08] leading-none block mb-3 transition-colors duration-500">
                  {step.num}
                </span>
                {i < STEPS.length - 1 && (
                  <div className="absolute top-16 right-0 translate-x-1/2 w-12 h-px hidden lg:block overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-primary/20 to-primary/5" />
                  </div>
                )}
                <div className="w-16 h-16 rounded-2xl bg-primary/[0.04] flex items-center justify-center mx-auto mb-7 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-[-3deg] group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                  <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-5">{step.desc}</p>
                <Link
                  to={step.link}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.12em] uppercase hover:gap-2.5 transition-all group/link"
                >
                  {step.linkText} <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

HowItWorksSection.displayName = "HowItWorksSection";
export default HowItWorksSection;
