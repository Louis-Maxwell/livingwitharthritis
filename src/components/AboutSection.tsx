import { memo } from "react";
import { Users, Globe, TrendingUp, BookOpen, LucideIcon } from "lucide-react";

const milestones = [
  { icon: Users, value: "50,000+", label: "People supported", color: "text-primary bg-primary/8" },
  { icon: Globe, value: "42", label: "Countries reached", color: "text-sky-600 bg-sky-500/8" },
  { icon: TrendingUp, value: "97%", label: "Satisfaction rate", color: "text-emerald-600 bg-emerald-500/8" },
  { icon: BookOpen, value: "40+", label: "Clinical articles", color: "text-violet-600 bg-violet-500/8" },
];

const AboutSection = memo(() => {
  return (
    <section id="resources" className="section-spacer relative">
      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Left — Mission */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              About Our Mission
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground leading-[1.06] tracking-tight">
              Building the future of{" "}
              <span className="text-primary italic">arthritis care</span>
            </h2>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-1 rounded-full bg-primary" />
              <div className="w-6 h-1 rounded-full bg-secondary" />
              <div className="w-3 h-1 rounded-full bg-primary/40" />
            </div>
            <p className="text-muted-foreground leading-relaxed text-base">
              We're on a mission to ensure that no one faces arthritis alone. Our multidisciplinary 
              team of physiotherapists, nutritionists, and technologists is building the most 
              comprehensive arthritis support platform in the world — accessible to everyone, everywhere, for free.
            </p>
          </div>

          {/* Right — 2x2 Milestone Grid */}
          <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: "150ms" }}>
            {milestones.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.label}
                  className="text-center p-6 rounded-2xl bg-card border border-border/20 hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl ${m.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-display font-bold text-foreground tracking-tight">{m.value}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-1">{m.label}</p>
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
