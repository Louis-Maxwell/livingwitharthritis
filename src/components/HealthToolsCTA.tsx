import { memo } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Stethoscope, Apple, Dumbbell } from "lucide-react";

const tools = [
  {
    icon: Stethoscope,
    label: "Symptom quiz",
    desc: "Find a sensible next step for your symptoms",
    to: "/self-help",
  },
  {
    icon: Apple,
    label: "Diet hub",
    desc: "Anti-inflammatory eating for joint health",
    to: "/diet",
  },
  {
    icon: Dumbbell,
    label: "Exercise hub",
    desc: "Low-impact routines for stiff joints",
    to: "/exercises",
  },
] as const;

const HealthToolsCTA = memo(() => (
  <aside className="my-14 rounded-2xl border border-primary/15 bg-primary/[0.03] p-8 md:p-10 print:hidden">
    <div className="flex items-start gap-4 mb-6">
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Free tools to keep you moving
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Jump from this article into a quiz, diet guide or exercise plan — all free from Living With Arthritis UK.
        </p>
      </div>
    </div>

    <div className="grid sm:grid-cols-3 gap-3 mb-6">
      {tools.map((t) => {
        const Icon = t.icon;
        return (
          <Link
            key={t.to}
            to={t.to}
            className="group flex items-center gap-3 rounded-xl bg-background border border-border/20 p-3.5 min-h-[44px] hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                {t.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{t.desc}</p>
            </div>
          </Link>
        );
      })}
    </div>

    <Link
      to="/health-tools"
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 min-h-[44px] text-sm font-semibold hover:bg-primary/90 transition-colors"
    >
      Explore health tools
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </Link>
  </aside>
));

HealthToolsCTA.displayName = "HealthToolsCTA";
export default HealthToolsCTA;
