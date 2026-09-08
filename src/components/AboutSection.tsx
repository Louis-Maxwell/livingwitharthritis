import { memo } from "react";
import { BookOpen, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";

const milestones = [
  { icon: BookOpen, value: formatInventoryCount(CONTENT_INVENTORY.blogArticles), label: "Reviewed articles" },
  { icon: Heart, value: "Free", label: "No paywall to read" },
  { icon: Shield, value: "1218461", label: "Charity Commission no." },
  { icon: Shield, value: "2026", label: "Registered in June" },
];

const AboutSection = memo(() => {
  return (
    <section id="resources" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left — Mission */}
          <div>
            <span className="section-label text-primary mb-5 block">About Our Mission</span>
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
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-4xl font-display font-bold text-foreground tracking-tight">{m.value}</p>
                    <p className="text-[10px] text-muted-foreground font-bold mt-3 tracking-[0.12em] uppercase text-balance break-words">{m.label}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-muted-foreground mt-5 text-center leading-relaxed">
              Article count is the published catalogue. We do not publish visitor or satisfaction figures we cannot verify.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
