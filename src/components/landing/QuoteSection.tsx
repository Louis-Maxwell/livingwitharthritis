import { memo } from "react";
import { Quote, Shield, Award, CheckCircle, Globe } from "lucide-react";

const credentials = [
  { icon: Shield, label: "NHS-Aligned Care" },
  { icon: Award, label: "HCPC Registered" },
  { icon: CheckCircle, label: "CSP Accredited" },
  { icon: Globe, label: "Serving All UK Nations" },
];

const QuoteSection = memo(() => (
  <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
    {/* Texture */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 0.5px, transparent 0.5px)', backgroundSize: '36px 36px' }} />
    
    {/* Glow orbs */}
    <div className="absolute top-[-250px] right-[-250px] w-[600px] h-[600px] rounded-full bg-secondary/12 blur-[160px] pointer-events-none" />
    <div className="absolute bottom-[-250px] left-[-250px] w-[500px] h-[500px] rounded-full bg-gold/8 blur-[140px] pointer-events-none" />

    <div className="container mx-auto px-6 md:px-10 relative">
      <div className="max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-6 duration-700">
        <Quote className="w-14 h-14 text-primary-foreground/15 mx-auto mb-10 rotate-180" />
        <blockquote className="font-display text-2xl sm:text-3xl md:text-[2rem] lg:text-4xl font-bold text-primary-foreground leading-[1.35] mb-10 italic tracking-tight">
          We believe world-class arthritis care should not be a privilege. Movement is the most powerful medicine — and with the right exercise, 
          nutrition and support, every person can transform how they live with this condition.
        </blockquote>
        <div className="w-16 h-[2px] bg-secondary/40 mx-auto mb-6" />
        <cite className="text-primary-foreground/50 text-base sm:text-lg font-semibold not-italic block mb-4 tracking-wide">
          — The Living With Arthritis Clinical Advisory Board
        </cite>
        <p className="text-primary-foreground/25 text-xs mb-14">
          Comprising HCPC-registered physiotherapists, rheumatology consultants and dietitians
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {credentials.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-primary-foreground/[0.06] backdrop-blur-sm rounded-full px-6 py-3 border border-primary-foreground/[0.06] hover:bg-primary-foreground/[0.1] transition-colors duration-300 animate-in fade-in zoom-in-95 duration-400"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <Icon className="w-4 h-4 text-secondary" />
                <span className="text-primary-foreground/60 text-xs font-bold tracking-wider">{c.label}</span>
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
