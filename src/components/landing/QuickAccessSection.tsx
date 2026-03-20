import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Dumbbell, Utensils, Users, MessageCircle, Stethoscope, ArrowRight
} from "lucide-react";

const HUBS = [
  {
    id: "exercises",
    href: "/exercises",
    icon: Dumbbell,
    emoji: "🏃",
    title: "Exercise Hub",
    tagline: "Move with confidence",
    description: "NHS-aligned knee, hand, shoulder & chair routines with a printable weekly tracker.",
    stat: "4 guides",
    statLabel: "physio-approved",
    tintBg: "bg-tint-blue",
    accentColor: "hsl(var(--sky))",
    accentClass: "text-sky",
    borderHover: "hover:border-sky/40",
    pillBg: "bg-sky/10 text-sky",
    iconBg: "bg-sky/10",
    shine: "from-sky/0 via-sky/5 to-sky/0",
  },
  {
    id: "diet",
    href: "/diet",
    icon: Utensils,
    emoji: "🥗",
    title: "Diet Hub",
    tagline: "Eat to reduce inflammation",
    description: "Mediterranean anti-inflammatory meal plans, recipe ideas & supplement guidance.",
    stat: "7-day",
    statLabel: "meal plan included",
    tintBg: "bg-tint-green",
    accentColor: "hsl(var(--emerald))",
    accentClass: "text-emerald",
    borderHover: "hover:border-emerald/40",
    pillBg: "bg-emerald/10 text-emerald",
    iconBg: "bg-emerald/10",
    shine: "from-emerald/0 via-emerald/5 to-emerald/0",
  },
  {
    id: "community",
    href: "/community",
    icon: Users,
    emoji: "🤝",
    title: "Community",
    tagline: "You're not alone",
    description: "Peer support forum, patient stories, downloadable resources & newly diagnosed guide.",
    stat: "Live",
    statLabel: "peer forum",
    tintBg: "bg-tint-violet",
    accentColor: "hsl(var(--violet))",
    accentClass: "text-violet",
    borderHover: "hover:border-violet/40",
    pillBg: "bg-violet/10 text-violet",
    iconBg: "bg-violet/10",
    shine: "from-violet/0 via-violet/5 to-violet/0",
  },
  {
    id: "chat",
    href: "/chat",
    icon: MessageCircle,
    emoji: "🤖",
    title: "AI Assistant",
    tagline: "24/7 evidence-based answers",
    description: "Ask anything about arthritis — symptoms, treatments, diet or exercises. Instant & personalised.",
    stat: "Free",
    statLabel: "always available",
    tintBg: "bg-tint-amber",
    accentColor: "hsl(var(--amber))",
    accentClass: "text-amber",
    borderHover: "hover:border-amber/40",
    pillBg: "bg-amber/10 text-amber",
    iconBg: "bg-amber/10",
    shine: "from-amber/0 via-amber/5 to-amber/0",
  },
  {
    id: "conditions",
    href: "/conditions/osteoarthritis",
    icon: Stethoscope,
    emoji: "🦴",
    title: "Conditions",
    tagline: "Understand your diagnosis",
    description: "In-depth guides for osteoarthritis, rheumatoid & psoriatic arthritis with treatment options.",
    stat: "3+",
    statLabel: "condition guides",
    tintBg: "bg-tint-rose",
    accentColor: "hsl(var(--coral))",
    accentClass: "text-coral",
    borderHover: "hover:border-coral/40",
    pillBg: "bg-coral/10 text-coral",
    iconBg: "bg-coral/10",
    shine: "from-coral/0 via-coral/5 to-coral/0",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export default function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "hsl(var(--warm))" }}
      aria-labelledby="quick-access-heading"
    >
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft radial glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20"
        style={{ background: "radial-gradient(ellipse, hsl(var(--primary) / 0.15) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-5 md:px-10 max-w-6xl relative z-10">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-3 px-3 py-1 rounded-full bg-primary/8 border border-primary/15">
            ✦ Quick Access
          </span>
          <h2
            id="quick-access-heading"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight mb-4"
          >
            Everything you need,{" "}
            <span
              className="relative inline-block"
              style={{ color: "hsl(var(--primary))" }}
            >
              right here
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6 Q50 2 100 5 Q150 8 198 4"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.5"
                />
              </svg>
            </span>
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Jump straight to the section that helps you most — exercises, nutrition, community support or personalised AI guidance.
          </p>
        </motion.div>

        {/* ── Featured large card (Exercise) + side stack ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4"
        >
          {/* Featured card — Exercise Hub */}
          <motion.button
            variants={cardVariants}
            onClick={() => navigate(HUBS[0].href)}
            aria-label={`Go to ${HUBS[0].title}`}
            className={`group lg:col-span-2 relative text-left rounded-3xl border border-border/60 ${HUBS[0].borderHover} ${HUBS[0].tintBg} p-7 transition-all duration-300 hover:shadow-large hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            {/* Shine sweep */}
            <div className={`absolute inset-0 bg-gradient-to-br ${HUBS[0].shine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

            <div className="relative z-10 flex flex-col h-full min-h-[220px]">
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${HUBS[0].iconBg} shrink-0`}>
                  <Dumbbell className={`w-7 h-7 ${HUBS[0].accentClass}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${HUBS[0].pillBg}`}>
                  {HUBS[0].stat} · {HUBS[0].statLabel}
                </span>
              </div>

              <h3 className={`text-2xl font-bold text-foreground group-hover:${HUBS[0].accentClass} transition-colors duration-200 mb-1`}>
                {HUBS[0].title}
              </h3>
              <p className={`text-sm font-semibold ${HUBS[0].accentClass} mb-3`}>{HUBS[0].tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{HUBS[0].description}</p>

              <div className={`mt-5 inline-flex items-center gap-2 text-sm font-bold ${HUBS[0].accentClass}`}>
                Explore now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>
          </motion.button>

          {/* Right column — Diet + Community stacked */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HUBS.slice(1, 3).map((hub) => {
              const Icon = hub.icon;
              return (
                <motion.button
                  key={hub.id}
                  variants={cardVariants}
                  onClick={() => navigate(hub.href)}
                  aria-label={`Go to ${hub.title}`}
                  className={`group relative text-left rounded-3xl border border-border/60 ${hub.borderHover} ${hub.tintBg} p-6 transition-all duration-300 hover:shadow-large hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${hub.shine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${hub.iconBg}`}>
                        <Icon className={`w-5 h-5 ${hub.accentClass}`} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${hub.pillBg}`}>
                        {hub.stat}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold text-foreground group-hover:${hub.accentClass} transition-colors duration-200 mb-0.5`}>
                      {hub.title}
                    </h3>
                    <p className={`text-xs font-semibold ${hub.accentClass} mb-2`}>{hub.tagline}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{hub.description}</p>
                    <div className={`mt-4 inline-flex items-center gap-1.5 text-xs font-bold ${hub.accentClass}`}>
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Bottom row — AI + Conditions (wider) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {/* AI Card — spans 3 cols for visual weight */}
          <motion.button
            variants={cardVariants}
            onClick={() => navigate(HUBS[3].href)}
            aria-label={`Go to ${HUBS[3].title}`}
            className={`group lg:col-span-3 relative text-left rounded-3xl border border-border/60 ${HUBS[3].borderHover} ${HUBS[3].tintBg} p-6 transition-all duration-300 hover:shadow-large hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${HUBS[3].shine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            {/* Decorative large emoji background */}
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-7xl opacity-[0.08] select-none" aria-hidden>
              {HUBS[3].emoji}
            </span>
            <div className="relative z-10 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${HUBS[3].iconBg} shrink-0`}>
                <MessageCircle className={`w-7 h-7 ${HUBS[3].accentClass}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className={`text-xl font-bold text-foreground group-hover:${HUBS[3].accentClass} transition-colors duration-200`}>
                    {HUBS[3].title}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${HUBS[3].pillBg}`}>
                    {HUBS[3].stat} · {HUBS[3].statLabel}
                  </span>
                </div>
                <p className={`text-xs font-semibold ${HUBS[3].accentClass} mb-1.5`}>{HUBS[3].tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{HUBS[3].description}</p>
              </div>
            </div>
            <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${HUBS[3].accentClass}`}>
              Start chatting
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </div>
          </motion.button>

          {/* Conditions Card — spans 2 cols */}
          <motion.button
            variants={cardVariants}
            onClick={() => navigate(HUBS[4].href)}
            aria-label={`Go to ${HUBS[4].title}`}
            className={`group lg:col-span-2 relative text-left rounded-3xl border border-border/60 ${HUBS[4].borderHover} ${HUBS[4].tintBg} p-6 transition-all duration-300 hover:shadow-large hover:-translate-y-1 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${HUBS[4].shine} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <span className="pointer-events-none absolute right-4 bottom-4 text-6xl opacity-[0.08] select-none" aria-hidden>
              {HUBS[4].emoji}
            </span>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${HUBS[4].iconBg}`}>
                  <Stethoscope className={`w-5 h-5 ${HUBS[4].accentClass}`} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${HUBS[4].pillBg}`}>
                  {HUBS[4].stat} guides
                </span>
              </div>
              <h3 className={`text-xl font-bold text-foreground group-hover:${HUBS[4].accentClass} transition-colors duration-200 mb-0.5`}>
                {HUBS[4].title}
              </h3>
              <p className={`text-xs font-semibold ${HUBS[4].accentClass} mb-2`}>{HUBS[4].tagline}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{HUBS[4].description}</p>
              <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-bold ${HUBS[4].accentClass}`}>
                Read guides
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </div>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
