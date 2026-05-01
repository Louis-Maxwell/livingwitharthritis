import { memo } from "react";
import { Lock, ShieldCheck, Stethoscope, BookOpen } from "lucide-react";

const items = [
  { I: ShieldCheck, T: "HCPC-registered clinicians" },
  { I: Stethoscope, T: "Aligned to NHS & NICE guidance" },
  { I: BookOpen, T: "Evidence-based · peer-reviewed" },
  { I: Lock, T: "ICO registered · UK GDPR" },
];

const TrustBar = memo(() => (
  <section
    aria-label="Trust and compliance signals"
    className="border-b border-primary/10 bg-primary/5"
  >
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[12px] sm:text-sm font-medium text-foreground">
      {items.map(({ I, T }, idx) => (
        <span key={idx} className="flex items-center gap-1.5 whitespace-nowrap">
          <I className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
          <span>{T}</span>
        </span>
      ))}
    </div>
  </section>
));

TrustBar.displayName = "TrustBar";
export default TrustBar;
