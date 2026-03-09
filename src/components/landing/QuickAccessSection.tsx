import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell, Utensils, Users, MessageCircle, Stethoscope,
  ArrowRight, CheckCircle
} from "lucide-react";

const HUBS = [
  {
    id: "exercises",
    href: "/exercises",
    icon: Dumbbell,
    emoji: "🏃",
    title: "Exercise Hub",
    tagline: "Move with confidence",
    description: "NHS-aligned knee, hand, shoulder & chair routines — with a printable weekly tracker.",
    highlights: ["Physiotherapy approved", "10–20 min routines", "Printable tracker"],
    gradient: "from-sky-500/12 to-blue-500/6",
    border: "border-sky-500/25 hover:border-sky-500/50",
    iconBg: "bg-sky-500/10 text-sky-600",
    badge: "bg-sky-500/10 text-sky-700",
    badgeText: "4 Guides",
  },
  {
    id: "diet",
    href: "/diet",
    icon: Utensils,
    emoji: "🥗",
    title: "Diet Hub",
    tagline: "Eat to reduce inflammation",
    description: "Mediterranean anti-inflammatory meal plans, recipe ideas & supplement guidance for joint health.",
    highlights: ["7-day meal plan", "Supplement guide", "Free recipes"],
    gradient: "from-emerald-500/12 to-teal-500/6",
    border: "border-emerald-500/25 hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10 text-emerald-600",
    badge: "bg-emerald-500/10 text-emerald-700",
    badgeText: "Nutrition Guide",
  },
  {
    id: "community",
    href: "/community",
    icon: Users,
    emoji: "🤝",
    title: "Community Hub",
    tagline: "You're not alone",
    description: "Peer support forum, patient stories, downloadable resources & a guide for the newly diagnosed.",
    highlights: ["Peer forum", "Patient stories", "Free downloads"],
    gradient: "from-violet-500/12 to-purple-500/6",
    border: "border-violet-500/25 hover:border-violet-500/50",
    iconBg: "bg-violet-500/10 text-violet-600",
    badge: "bg-violet-500/10 text-violet-700",
    badgeText: "Live Forum",
  },
  {
    id: "chat",
    href: "/chat",
    icon: MessageCircle,
    emoji: "🤖",
    title: "AI Health Assistant",
    tagline: "24/7 evidence-based support",
    description: "Ask anything about arthritis symptoms, treatments, diet or exercises. Personalised, instant answers.",
    highlights: ["Free & instant", "Evidence-based", "Remembers context"],
    gradient: "from-amber-500/12 to-orange-500/6",
    border: "border-amber-500/25 hover:border-amber-500/50",
    iconBg: "bg-amber-500/10 text-amber-600",
    badge: "bg-amber-500/10 text-amber-700",
    badgeText: "AI Powered",
  },
  {
    id: "conditions",
    href: "/conditions/osteoarthritis",
    icon: Stethoscope,
    emoji: "🦴",
    title: "Conditions Guide",
    tagline: "Understand your diagnosis",
    description: "In-depth guides for osteoarthritis, rheumatoid arthritis, psoriatic arthritis and more.",
    highlights: ["OA · RA · PsA", "Symptom guides", "Treatment options"],
    gradient: "from-rose-500/12 to-pink-500/6",
    border: "border-rose-500/25 hover:border-rose-500/50",
    iconBg: "bg-rose-500/10 text-rose-600",
    badge: "bg-rose-500/10 text-rose-700",
    badgeText: "3 Conditions",
  },
];

export default function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section className="py-12 lg:py-16 bg-background border-b border-border/20" aria-labelledby="quick-access-heading">
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Quick Access</p>
          <h2 id="quick-access-heading" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Everything you need, <span className="text-primary">right here</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Jump straight to the section that helps you most — exercises, nutrition, community support or personalised AI guidance.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HUBS.map((hub, i) => {
            const Icon = hub.icon;
            return (
              <motion.button
                key={hub.id}
                onClick={() => navigate(hub.href)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className={`group relative text-left rounded-2xl border ${hub.border} bg-gradient-to-br ${hub.gradient} p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
                aria-label={`Go to ${hub.title}`}
              >
                {/* Icon + badge row */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${hub.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${hub.badge}`}>
                    {hub.badgeText}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-0.5">
                  {hub.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mb-2">{hub.tagline}</p>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{hub.description}</p>

                {/* Highlights */}
                <ul className="space-y-1 mb-4">
                  {hub.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-1 text-xs font-semibold text-primary">
                  Explore {hub.title}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
