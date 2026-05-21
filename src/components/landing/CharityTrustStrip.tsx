import { memo } from "react";
import { HeartHandshake, Stethoscope, BookOpen, Users } from "lucide-react";

const items = [
  { icon: Stethoscope, label: "Clinically reviewed guidance" },
  { icon: BookOpen, label: "Plain English, UK-focused" },
  { icon: Users, label: "Free for everyone with arthritis" },
  { icon: HeartHandshake, label: "Powered by kind donations" },
];

const CharityTrustStrip = memo(() => {
  return (
    <section
      aria-label="What we stand for"
      className="border-b border-border/40 bg-muted/30"
    >
      <div className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-16 py-6">
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {items.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 text-sm text-foreground/85"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <span className="font-medium leading-snug">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

CharityTrustStrip.displayName = "CharityTrustStrip";
export default CharityTrustStrip;
