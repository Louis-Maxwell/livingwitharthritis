import { memo } from "react";
import { Quote, Shield, Award, CheckCircle, Globe } from "lucide-react";

const credentials = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
  { icon: Globe, label: "Serving All UK Nations" },
];

const QuoteSection = memo(() => (
  <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
    <div className="container mx-auto px-6 md:px-10 relative">
      <div className="max-w-3xl mx-auto text-center">
        <Quote className="w-12 h-12 text-primary-foreground/15 mx-auto mb-8 rotate-180" />
        <blockquote className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold text-primary-foreground leading-[1.4] mb-8 italic tracking-tight">
          We believe world-class arthritis care should not be a privilege. Movement is the most powerful medicine — and with the right exercise, 
          nutrition and support, every person can transform how they live with this condition.
        </blockquote>
        <div className="w-16 h-[2px] bg-secondary/40 mx-auto mb-5" />
        <cite className="text-primary-foreground/50 text-sm sm:text-base font-semibold not-italic block mb-3 tracking-wide">
          — The Living With Arthritis Clinical Advisory Board
        </cite>
        <p className="text-primary-foreground/25 text-xs mb-12">
          Comprising HCPC-registered physiotherapists, rheumatology consultants and dietitians
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 bg-primary-foreground/[0.06] rounded-full px-5 py-2.5 border border-primary-foreground/[0.06]"
              >
                <Icon className="w-3.5 h-3.5 text-secondary" />
                <span className="text-primary-foreground/60 text-[11px] font-bold tracking-wider">{c.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
));

QuoteSection.displayName = "QuoteSection";
export default QuoteSection;
