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
    accent: "primary",
  },
  {
    id: "diet",
    href: "/diet",
    icon: Utensils,
    title: "Diet Hub",
    description: "Mediterranean anti-inflammatory meal plans, recipe ideas & supplement guidance.",
    accent: "emerald",
  },
  {
    id: "community",
    href: "/community",
    icon: Users,
    title: "Community",
    description: "Peer support forum, patient stories, downloadable resources & newly diagnosed guide.",
    accent: "violet",
  },
  {
    id: "chat",
    href: "/chat",
    icon: MessageCircle,
    title: "AI Assistant",
    description: "Ask anything about arthritis — symptoms, treatments, diet or exercises. Instant & personalised.",
    accent: "amber",
  },
  {
    id: "conditions",
    href: "/conditions/osteoarthritis",
    icon: Stethoscope,
    title: "Conditions",
    description: "In-depth guides for osteoarthritis, rheumatoid & psoriatic arthritis with treatment options.",
    accent: "coral",
  },
];

export default function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32" aria-labelledby="quick-access-heading">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="section-label text-primary/60 mb-5 block">Quick Access</span>
          <h2
            id="quick-access-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.06] mb-6"
          >
            Everything you need,{" "}
            <span className="text-primary italic">right here</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Jump straight to the section that helps you most — exercises, nutrition, community support or personalised AI guidance.
          </p>
        </div>

        {/* Hub cards — larger, more premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUBS.map((hub) => {
            const Icon = hub.icon;
            return (
              <button
                key={hub.id}
                onClick={() => navigate(hub.href)}
                aria-label={`Go to ${hub.title}`}
                className="premium-card group text-left p-9 lg:p-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/[0.05] flex items-center justify-center mb-7 group-hover:bg-primary group-hover:scale-105 transition-all duration-500">
                  <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">{hub.title}</h3>
                <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{hub.description}</p>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase opacity-60 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Pillar guide links */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50 mb-5">In-depth Guides</p>
          <div className="flex flex-wrap justify-center gap-3">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                to={g.href}
                className="feature-pill"
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
