import { useNavigate, Link } from "react-router-dom";
import {
  Dumbbell, Utensils, Users, MessageCircle, Stethoscope, ArrowRight, Activity
} from "lucide-react";

const GUIDES = [
  { label: "📖 UK Arthritis Guide", href: "/guides/uk-arthritis" },
  { label: "🏥 NHS Services", href: "/guides/nhs-services" },
  { label: "🥗 Diet Guide", href: "/guides/diet" },
  { label: "💪 Exercise Guide", href: "/guides/exercise" },
  { label: "📋 Benefits & PIP", href: "/guides/benefits-pip" },
] as const;

const HUBS = [
  { id: "exercises", href: "/exercises", icon: Dumbbell, title: "Exercise Hub", description: "120+ NHS-aligned routines for knees, hands, hips and shoulders. Five-minute sets you can do from a chair, with a printable weekly tracker." },
  { id: "diet", href: "/diet", icon: Utensils, title: "Diet Hub", description: "Mediterranean meal plans built around the foods most strongly linked to lower CRP and joint pain — plus shopping lists and supplement guidance." },
  { id: "community", href: "/community", icon: Users, title: "Community", description: "10,000+ people sharing what actually works. Moderated peer forum, lived-experience stories and a starter guide for the newly diagnosed." },
  { id: "chat", href: "/chat", icon: MessageCircle, title: "AI Assistant", description: "Ask anything — symptoms, medications, what to do during a flare. Trained on UK clinical guidance and reviewed by HCPC clinicians. Replies in seconds." },
  { id: "conditions", href: "/conditions/osteoarthritis", icon: Stethoscope, title: "Conditions A–Z", description: "Plain-English guides for osteoarthritis, rheumatoid and psoriatic arthritis — what it is, what helps, and what to ask your rheumatology team." },
  { id: "health-tools", href: "/health-tools", icon: Activity, title: "Health Tools", description: "Three free tools: symptom quiz, inflammation risk score, and a personalised exercise plan generator. No signup. No data stored." },
] as const;

export default function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 lg:py-32 relative" aria-labelledby="quick-access-heading">
      <div className="absolute inset-0 pattern-dots pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl relative">
        <div className="text-center mb-20">
          <span className="section-label text-primary/60 mb-5 block">Quick Access</span>
          <h2
            id="quick-access-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[3.5rem] font-bold text-foreground tracking-tight leading-[1.06] mb-6"
          >
            Six tools.{" "}
            <span className="text-primary italic">One stronger week.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Pick where it hurts most — exercise, diet, community or one-to-one AI guidance — and start with something you can actually do today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUBS.map((hub, i) => {
            const Icon = hub.icon;
            return (
              <button
                key={hub.id}
                onClick={() => navigate(hub.href)}
                aria-label={`Go to ${hub.title}`}
                className="premium-card group text-left p-9 lg:p-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary relative overflow-hidden"
              >
                <span className="absolute top-4 right-5 text-[4rem] font-display font-bold text-primary/[0.03] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-500">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.05] flex items-center justify-center mb-7 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-[-3deg] transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors duration-500">{hub.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.8] mb-6">{hub.description}</p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary tracking-[0.15em] uppercase opacity-60 group-hover:opacity-100 group-hover:gap-2.5 transition-all duration-300">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50 mb-5">In-depth Guides</p>
          <div className="flex flex-wrap justify-center gap-3">
            {GUIDES.map((g) => (
              <Link
                key={g.href}
                to={g.href}
                className="feature-pill hover:scale-[1.03] transition-transform duration-200"
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
