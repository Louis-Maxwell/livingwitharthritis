import { memo } from "react";
import { Users, Globe, TrendingUp, BookOpen } from "lucide-react";

const milestones = [
  { icon: Users, value: "50,000+", label: "People supported" },
  { icon: Globe, value: "42", label: "Countries reached" },
  { icon: TrendingUp, value: "97%", label: "Satisfaction rate" },
  { icon: BookOpen, value: "40+", label: "Clinical articles" },
];

const AboutSection = memo(() => {
  return (
    <section id="resources" className="section-spacer relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Mission */}
          <div>
            <span className="section-label text-primary/70 mb-5 block">About Our Mission</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold mb-7 text-foreground leading-[1.06] tracking-tight">
              Building the future of{" "}
              <span className="text-primary italic">arthritis care</span>
            </h2>
            <div className="w-16 h-[2px] bg-primary/20 mb-8" />
            <p className="text-muted-foreground leading-[1.85] text-base">
              We're on a mission to ensure that no one faces arthritis alone. Our multidisciplinary 
              team of physiotherapists, nutritionists, and technologists is building the most 
              comprehensive arthritis support platform in the world — accessible to everyone, everywhere, for free.
            </p>
          </div>

          {/* Right — 2x2 Milestone Grid */}
          <div className="grid grid-cols-2 gap-5">
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="text-center p-8 rounded-2xl bg-card border border-border/15 hover:shadow-medium hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-display font-bold text-foreground tracking-tight">{m.value}</p>
                  <p className="text-[11px] text-muted-foreground/60 font-medium mt-2 tracking-wider uppercase">{m.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
