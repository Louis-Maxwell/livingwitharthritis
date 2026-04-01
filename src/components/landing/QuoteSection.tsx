import { memo } from "react";
import { Shield, Award, CheckCircle, Globe } from "lucide-react";

const credentials = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
  { icon: Globe, label: "Serving All UK Nations" },
];

const QuoteSection = memo(() => (
  <section className="py-28 lg:py-36 bg-navy relative overflow-hidden">
    {/* Subtle gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent pointer-events-none" />
    
    <div className="container mx-auto px-6 md:px-12 relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Elegant rule */}
        <div className="w-12 h-px bg-white/10 mx-auto mb-12" />
        
        <blockquote className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-bold text-white leading-[1.35] mb-10 italic tracking-tight">
          We believe world-class arthritis care should not be a privilege. Movement is the most powerful medicine — and with the right exercise, 
          nutrition and support, every person can transform how they live with this condition.
        </blockquote>
        
        <div className="w-16 h-px bg-white/10 mx-auto mb-6" />
        
        <cite className="text-white/40 text-sm font-medium not-italic block mb-2 tracking-wider">
          — The Living With Arthritis Clinical Advisory Board
        </cite>
        <p className="text-white/20 text-xs mb-16 tracking-wider">
          Comprising HCPC-registered physiotherapists, rheumatology consultants and dietitians
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white/[0.04] rounded-full px-5 py-2.5 border border-white/[0.06]"
              >
                <Icon className="w-3.5 h-3.5 text-white/30" />
                <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">{c.label}</span>
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
