import { memo } from "react";
import { Users, TrendingUp, BookOpen, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import founderImage from "@/assets/founder-portrait.jpg";

const milestones = [
  { icon: Users, value: "10,000+", label: "People supported*" },
  { icon: TrendingUp, value: "97%", label: "Satisfaction rate*" },
  { icon: BookOpen, value: "120+", label: "Expert articles" },
  { icon: Shield, value: "100%", label: "Free access" },
];

const AboutSection = memo(() => {
  return (
    <section id="resources" className="section-spacer relative">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Mission + Founder */}
          <div>
            <span className="section-label text-primary/70 mb-5 block">About Our Mission</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold mb-7 text-foreground leading-[1.06] tracking-tight">
              Building the future of{" "}
              <span className="text-primary italic">arthritis care</span>
            </h2>
            <div className="w-16 h-[2px] bg-primary/20 mb-8" />
            <p className="text-muted-foreground leading-[1.85] text-base mb-8">
              Founded by NHS First Contact Practitioners, we're on a mission to ensure no one faces arthritis alone. Our multidisciplinary 
              team of HCPC-registered physiotherapists, nutritionists, and health technologists is building the most 
              comprehensive arthritis support platform in the UK — accessible to everyone, for free.
            </p>

            {/* Founder mini-card */}
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border/15 mb-8">
              <img
                src={founderImage}
                alt="Founder portrait"
                className="w-16 h-16 rounded-xl object-cover border border-border/20"
                loading="lazy"
                width={64}
                height={64}
              />
              <div>
                <p className="text-sm font-bold text-foreground mb-1">Meet Our Founder</p>
                <p className="text-xs text-muted-foreground leading-[1.75] mb-3">
                  An NHS First Contact Practitioner with international clinical experience who saw first-hand how patients struggled to find reliable, free arthritis support.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase hover:gap-2.5 transition-all"
                >
                  Read our story <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Transparency links */}
            <div className="flex flex-wrap gap-3">
              <Link to="/finances" className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-primary transition-colors px-4 py-2 rounded-full border border-border/20 hover:border-primary/20">
                Our Finances
              </Link>
              <Link to="/governance" className="text-[10px] font-bold tracking-[0.15em] uppercase text-muted-foreground/60 hover:text-primary transition-colors px-4 py-2 rounded-full border border-border/20 hover:border-primary/20">
                Governance
              </Link>
            </div>
          </div>

          {/* Right — 2x2 Milestone Grid */}
          <div>
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
            <p className="text-[9px] text-muted-foreground/40 mt-4 text-center tracking-wider">
              *Based on internal user feedback surveys, 2024–2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
