import { useNavigate, Link } from "react-router-dom";
import {
  Dumbbell, Utensils, Users, MessageCircle, Stethoscope, ArrowRight
} from "lucide-react";

const GUIDES = [
  { label: "📖 UK Arthritis Guide", href: "/guides/uk-arthritis" },
  { label: "🏥 NHS Services", href: "/guides/nhs-services" },
  { label: "🥗 Diet Guide", href: "/guides/diet" },
  { label: "💪 Exercise Guide", href: "/guides/exercise" },
  { label: "📋 Benefits & PIP", href: "/guides/benefits-pip" },
];

const HUBS = [
  {
    id: "exercises",
    href: "/exercises",
    icon: Dumbbell,
    title: "Exercise Hub",
    description: "NHS-aligned knee, hand, shoulder & chair routines with a printable weekly tracker.",
    accentClass: "text-sky",
    iconBg: "bg-sky/8",
  },
  {
    id: "diet",
    href: "/diet",
    icon: Utensils,
    title: "Diet Hub",
    description: "Mediterranean anti-inflammatory meal plans, recipe ideas & supplement guidance.",
    accentClass: "text-emerald",
    iconBg: "bg-emerald/8",
  },
  {
    id: "community",
    href: "/community",
    icon: Users,
    title: "Community",
    description: "Peer support forum, patient stories, downloadable resources & newly diagnosed guide.",
    accentClass: "text-violet",
    iconBg: "bg-violet/8",
  },
  {
    id: "chat",
    href: "/chat",
    icon: MessageCircle,
    title: "AI Assistant",
    description: "Ask anything about arthritis — symptoms, treatments, diet or exercises. Instant & personalised.",
    accentClass: "text-amber",
    iconBg: "bg-amber/8",
  },
  {
    id: "conditions",
    href: "/conditions/osteoarthritis",
    icon: Stethoscope,
    title: "Conditions",
    description: "In-depth guides for osteoarthritis, rheumatoid & psoriatic arthritis with treatment options.",
    accentClass: "text-coral",
    iconBg: "bg-coral/8",
  },
];

export default function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section
      className="section-spacer"
      aria-labelledby="quick-access-heading"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label text-primary/70 mb-5 block">Quick Access</span>
          <h2
            id="quick-access-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-foreground tracking-tight leading-[1.08] mb-5"
          >
            Everything you need,{" "}
            <span className="text-primary italic">right here</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Jump straight to the section that helps you most — exercises, nutrition, community support or personalised AI guidance.
          </p>
        </div>

        {/* Clean grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <button
                key={hub.id}
                onClick={() => navigate(hub.href)}
                aria-label={`Go to ${hub.title}`}
                className="group text-left rounded-2xl border border-border/25 bg-card p-8 transition-all duration-500 hover:shadow-large hover:-translate-y-1 hover:border-border/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${hub.iconBg}`}>
                    <Icon className={`w-5 h-5 ${hub.accentClass}`} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight">{hub.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.75] mb-5">{hub.description}</p>
                <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${hub.accentClass} tracking-wider uppercase`}>
                  Explore
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Pillar guide links */}
        <div className="mt-14 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">In-depth Guides</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                to={g.href}
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground border border-border/40 hover:border-border/60 rounded-full px-5 py-2 transition-all duration-300 hover:shadow-soft"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
