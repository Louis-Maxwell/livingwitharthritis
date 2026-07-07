import { memo } from "react";
import { Users, TrendingUp, BookOpen, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const milestones = [
  { icon: Users, value: "90,000+", label: "People visited" },
  { icon: TrendingUp, value: "97%", label: "Satisfaction rate" },
  { icon: BookOpen, value: "120+", label: "Expert articles" },
  { icon: Shield, value: "100%", label: "Free access" },
];

const AboutSection = memo(() => {
  return (
    <section id="resources" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left — Mission */}
          <div>
            <span className="section-label text-primary/60 mb-5 block">About Our Mission</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold mb-8 text-foreground leading-[1.06] tracking-tight">
              Building the future of{" "}
              <span className="text-primary italic">arthritis care</span>
            </h2>
            <div className="w-20 h-[2px] bg-primary/15 mb-9" />
            <p className="text-muted-foreground leading-[1.9] text-base sm:text-lg mb-10">
              Founded by First Contact Practitioners, we're on a mission to ensure no one faces arthritis alone. Our multidisciplinary 
              team of HCPC-registered physiotherapists, nutritionists, and health technologists is building the most 
              comprehensive arthritis support platform in the UK — accessible to everyone, for free.
            </p>

            {/* Transparency links */}
            <div className="flex flex-wrap gap-3">
              <Link to="/about" className="feature-pill text-muted-foreground hover:text-primary hover:border-primary/20">
                Our Story
              </Link>
              <Link to="/governance" className="feature-pill text-muted-foreground hover:text-primary hover:border-primary/20">
                Governance
              </Link>
            </div>
          </div>

          {/* Right — 2x2 Milestone Grid */}
          <div>
            <div className="grid grid-cols-2 gap-6">
              {milestones.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.label}
                    className="text-center p-10 rounded-2xl bg-card border border-border/10 hover:shadow-large hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/[0.04] flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-6 h-6 text-primary/80" />
                    </div>
                    <p className="text-4xl font-display font-bold text-foreground tracking-tight">{m.value}</p>
                    <p className="text-[10px] text-muted-foreground font-bold mt-3 tracking-[0.2em] uppercase">{m.label}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-[9px] text-muted-foreground mt-5 text-center tracking-[0.15em] uppercase">
              Based on internal user feedback surveys, 2024–2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
