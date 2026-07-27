import { memo } from "react";
import { BookOpen, Dumbbell, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const contentItems = [
  {
    icon: BookOpen,
    count: "120+",
    label: "Expert Articles",
    description: "Clinically reviewed guides covering exercise, nutrition, supplements, and daily living with arthritis.",
    link: "/blog",
    linkText: "Browse Articles",
  },
  {
    icon: Dumbbell,
    count: "50+",
    label: "Exercise Guides",
    description: "Joint-specific exercises designed by HCPC-registered physiotherapists for every fitness level.",
    link: "/exercises",
    linkText: "View Exercises",
  },
  {
    icon: FileText,
    count: "5",
    label: "Pillar Guides",
    description: "Comprehensive UK-focused guides on health services, diet, exercise, benefits & PIP, and living with arthritis.",
    link: "/guides/uk-arthritis",
    linkText: "Read Guides",
  },
];

const ContentDepthSection = memo(() => (
  <section className="py-24 lg:py-32 bg-background relative">
    <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-6xl">
      <div className="text-center mb-20">
        <span className="section-label text-foreground mb-5 block">Content Library</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.5rem] font-bold text-foreground mb-6 tracking-tight leading-[1.06]">
          The UK's most comprehensive{" "}
          <span className="text-primary italic">arthritis resource</span>
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Everything you need in one place — written by clinicians, reviewed by experts, and free forever.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
        {contentItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="text-center group">
              <div className="w-20 h-20 rounded-3xl bg-primary/[0.04] flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/[0.08] transition-colors duration-500">
                <Icon className="w-9 h-9 text-primary" />
              </div>
              <p className="stat-number text-5xl sm:text-6xl font-bold text-foreground mb-3">{item.count}</p>
              <p className="text-xs font-bold text-foreground tracking-[0.2em] uppercase mb-5">{item.label}</p>
              <p className="text-sm text-muted-foreground leading-[1.8] mb-7 max-w-xs mx-auto">{item.description}</p>
              <Link
                to={item.link}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-foreground tracking-[0.15em] uppercase hover:gap-2.5 transition-all"
              >
                {item.linkText} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
));

ContentDepthSection.displayName = "ContentDepthSection";
export default ContentDepthSection;
