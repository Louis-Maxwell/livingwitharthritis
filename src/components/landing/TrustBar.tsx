import { memo } from "react";
import { Lock } from "lucide-react";

const items = [
  { I: Lock, T: "ICO Registered · UK GDPR" },
];

const TrustBar = memo(() => (
  <section aria-label="Trust and compliance signals" className="border-b border-primary/10 bg-primary/5">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-foreground">
      {items.map(({ I, T }, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <I className="w-4 h-4 text-primary" aria-hidden="true" />
          {T}
        </span>
      ))}
    </div>
  </section>
));

TrustBar.displayName = "TrustBar";
export default TrustBar;
