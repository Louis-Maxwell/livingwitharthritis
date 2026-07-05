import { memo } from "react";
import { Shield, Award, CheckCircle, Globe } from "lucide-react";

const credentials = [
  { icon: Shield, label: "Clinically Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
  { icon: Globe, label: "Serving All UK Nations" },
];

const QuoteSection = memo(() => (
  <section className="py-28 lg:py-40 bg-primary relative overflow-hidden">
    {/* Subtle texture overlay */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
    
    <div className="container mx-auto px-6 md:px-12 lg:px-16 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="w-16 h-px bg-primary-foreground/15 mx-auto mb-14" />
        
        <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-primary-foreground leading-[1.3] mb-12 italic tracking-tight">
          &ldquo;We believe world-class arthritis care should not be a privilege. Movement is the most powerful medicine — and with the right exercise, 
          nutrition and support, every person can transform how they live with this condition.&rdquo;
        </blockquote>
        
        <div className="w-20 h-px bg-primary-foreground/15 mx-auto mb-8" />
        
        <cite className="text-primary-foreground/90 text-sm font-medium not-italic block mb-2 tracking-[0.15em] uppercase">
          The Living With Arthritis Clinical Advisory Board
        </cite>
        <p className="text-primary-foreground/80 text-xs mb-20 tracking-wider">
          Comprising HCPC-registered physiotherapists, rheumatology consultants and dietitians
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-primary-foreground/[0.12] rounded-full px-6 py-3 border border-primary-foreground/20"
              >
                <Icon className="w-3.5 h-3.5 text-primary-foreground/90" />
                <span className="text-primary-foreground/90 text-[10px] font-bold tracking-[0.2em] uppercase">{c.label}</span>
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
