import { memo } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowRight, Stethoscope, Flame, Dumbbell } from "lucide-react";

const tools = [
  { icon: Stethoscope, label: "Symptom Quiz", desc: "Identify your arthritis type" },
  { icon: Flame, label: "Inflammation Score", desc: "Assess your risk level" },
  { icon: Dumbbell, label: "Exercise Plan", desc: "Get a personalised routine" },
];

const HealthToolsCTA = memo(() => (
  <aside className="my-14 rounded-2xl border border-primary/15 bg-primary/[0.03] p-8 md:p-10 print:hidden">
    <div className="flex items-start gap-4 mb-6">
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
        <Activity className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-1">
          Try Our Free Health Tools
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Take a quick symptom quiz, check your inflammation risk, or build a personalised exercise plan — all free and instant.
        </p>
      </div>
    </div>

    <div className="grid sm:grid-cols-3 gap-3 mb-6">
      {tools.map((t) => {
        const Icon = t.icon;
        return (
          <div
            key={t.label}
            className="flex items-center gap-3 rounded-xl bg-background border border-border/20 p-3.5"
          >
            <Icon className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">{t.label}</p>
              <p className="text-[10px] text-muted-foreground">{t.desc}</p>
            </div>
          </div>
        );
      })}
    </div>

    <Link
      to="/health-tools"
      className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors"
    >
      Explore Health Tools
      <ArrowRight className="w-4 h-4" />
    </Link>
  </aside>
));

HealthToolsCTA.displayName = "HealthToolsCTA";
export default HealthToolsCTA;
