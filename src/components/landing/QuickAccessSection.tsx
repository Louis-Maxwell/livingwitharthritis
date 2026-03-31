import { useNavigate } from "react-router-dom";
import {
  Dumbbell, Utensils, Users, MessageCircle, Stethoscope, ArrowRight
} from "lucide-react";

const HUBS = [
  {
    id: "exercises",
    href: "/exercises",
    icon: Dumbbell,
    title: "Exercise Hub",
    description: "NHS-aligned knee, hand, shoulder & chair routines with a printable weekly tracker.",
    accentClass: "text-sky",
    iconBg: "bg-sky/10",
  },
  {
    id: "diet",
    href: "/diet",
    icon: Utensils,
    title: "Diet Hub",
    description: "Mediterranean anti-inflammatory meal plans, recipe ideas & supplement guidance.",
    accentClass: "text-emerald",
    iconBg: "bg-emerald/10",
  },
  {
    id: "community",
    href: "/community",
    icon: Users,
    title: "Community",
    description: "Peer support forum, patient stories, downloadable resources & newly diagnosed guide.",
    accentClass: "text-violet",
    iconBg: "bg-violet/10",
  },
  {
    id: "chat",
    href: "/chat",
    icon: MessageCircle,
    title: "AI Assistant",
    description: "Ask anything about arthritis — symptoms, treatments, diet or exercises. Instant & personalised.",
    accentClass: "text-amber",
    iconBg: "bg-amber/10",
  },
  {
    id: "conditions",
    href: "/conditions/osteoarthritis",
    icon: Stethoscope,
    title: "Conditions",
    description: "In-depth guides for osteoarthritis, rheumatoid & psoriatic arthritis with treatment options.",
    accentClass: "text-coral",
    iconBg: "bg-coral/10",
  },
];

export default function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section
      className="section-spacer"
      aria-labelledby="quick-access-heading"
    >
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-3 px-3 py-1 rounded-full bg-primary/8 border border-primary/15">
            ✦ Quick Access
          </span>
          <h2
            id="quick-access-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4"
          >
            Everything you need,{" "}
            <span className="text-primary italic">right here</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Jump straight to the section that helps you most — exercises, nutrition, community support or personalised AI guidance.
          </p>
        </div>

        {/* Clean 3-column grid (wraps to 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HUBS.map((hub, i) => {
            const Icon = hub.icon;
            return (
              <button
                key={hub.id}
                onClick={() => navigate(hub.href)}
                aria-label={`Go to ${hub.title}`}
                className="group text-left rounded-2xl border border-border/40 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${hub.iconBg}`}>
                    <Icon className={`w-5 h-5 ${hub.accentClass}`} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{hub.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{hub.description}</p>
                <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${hub.accentClass}`}>
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
