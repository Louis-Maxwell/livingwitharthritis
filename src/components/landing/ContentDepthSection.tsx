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
    label: "In-Depth Pillar Guides",
    description: "Comprehensive UK-focused guides on NHS services, diet, exercise, benefits & PIP, and living with arthritis.",
    link: "/guides/uk-arthritis",
    linkText: "Read Guides",
  },
];

const ContentDepthSection = memo(() => (
  <section className="section-spacer relative">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl">
      <div className="text-center mb-16">
        <span className="section-label text-primary/70 mb-5 block">Content Library</span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-foreground mb-6 tracking-tight leading-[1.08]">
          The UK's most comprehensive{" "}
          <span className="text-primary italic">arthritis resource</span>
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Everything you need in one place — written by clinicians, reviewed by experts, and free forever.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {contentItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors duration-500">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <p className="stat-number text-4xl sm:text-5xl font-bold text-foreground mb-2">{item.count}</p>
              <p className="text-sm font-bold text-foreground tracking-wide uppercase mb-4">{item.label}</p>
              <p className="text-sm text-muted-foreground leading-[1.75] mb-6">{item.description}</p>
              <Link
                to={item.link}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase hover:gap-2.5 transition-all"
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
