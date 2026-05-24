import { memo } from "react";
import { Zap, Heart, BookOpen, Users, Globe, Award } from "lucide-react";

const points = [
  {
    icon: <Zap className="w-5 h-5 text-primary" />,
    title: "No app download needed",
    desc: "Access everything instantly in your browser — on any device, without creating an account first.",
  },
  {
    icon: <Heart className="w-5 h-5 text-primary" />,
    title: "Emotional & practical support",
    desc: "We go beyond symptom checklists. We address the grief, anxiety, and identity changes that come with chronic illness.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-primary" />,
    title: "Clinician-reviewed content",
    desc: "Every exercise programme, diet guide, and management strategy is reviewed by HCPC-registered physiotherapists and rheumatologists.",
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "Built by people with arthritis",
    desc: "Our team includes people who live with arthritis every day. We understand what you're going through because we've been there.",
  },
  {
    icon: <Globe className="w-5 h-5 text-primary" />,
    title: "UK-first, clinically aligned",
    desc: "All our recommendations follow current NICE guidelines and complement — never replace — public healthcare pathways.",
  },
  {
    icon: <Award className="w-5 h-5 text-primary" />,
    title: "Always free, no adverts",
    desc: "We're a UK social enterprise. No paywalls, no ads, no data selling. Genuine support, funded by donations.",
  },
];

const WhyUsSection = memo(() => (
  <section aria-labelledby="why-us-heading" className="py-20 bg-gradient-to-b from-accent to-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-label text-primary/60 block mb-4">Why Choose Us</span>
        <h2 id="why-us-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Different from the health service. Different from other charities.{" "}
          <span className="text-primary">Built just for you.</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          There are plenty of generic health resources out there. Here's why thousands of people with arthritis choose
          us instead.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {points.map((p) => (
          <div
            key={p.title}
            className="flex gap-4 p-6 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0" aria-hidden="true">
              {p.icon}
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-primary text-primary-foreground p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Aligned with the arthritis community</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Our content is aligned with Versus Arthritis, NRAS (National Rheumatoid Arthritis Society), and the health service
            guidance — so you always get information you can trust.
          </p>
        </div>
        <div className="flex gap-3 shrink-0 flex-wrap">
          <a
            href="https://www.versusarthritis.org"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            aria-label="Visit Versus Arthritis website (opens in new tab)"
          >
            Versus Arthritis ↗
          </a>
          <a
            href="https://www.nras.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground"
            aria-label="Visit NRAS website (opens in new tab)"
          >
            NRAS ↗
          </a>
        </div>
      </div>
    </div>
  </section>
));

WhyUsSection.displayName = "WhyUsSection";
export default WhyUsSection;
