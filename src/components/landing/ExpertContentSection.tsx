import { memo } from "react";
import { Link } from "react-router-dom";
import { Thermometer, Clock, Brain, CheckCircle2, BookOpen, ArrowRight } from "lucide-react";

const topics = [
  {
    icon: <Thermometer className="w-6 h-6 text-destructive" />,
    tag: "Flare-Ups",
    title: "How to manage an arthritis flare-up",
    points: [
      "Apply heat or ice to the affected joint for 15–20 minutes",
      "Rest the joint, but maintain gentle range-of-motion movement",
      "Review your pacing plan and scale back activity temporarily",
      "Contact your rheumatology team if the flare lasts more than 48 hours",
    ],
    cta: "Read the full flare-up guide",
    href: "/guides/flare-ups",
    bg: "from-destructive/5 to-amber/5",
    tag_color: "bg-destructive/10 text-destructive",
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    tag: "Daily Routine",
    title: "A clinician-approved daily arthritis routine",
    points: [
      "Gentle morning stretch (5–10 mins) before getting out of bed",
      "Anti-inflammatory breakfast: oats, berries, walnuts, flaxseed",
      "10-minute walk after lunch to lubricate and warm up joints",
      "Evening: joint mobility exercises + sleep hygiene wind-down",
    ],
    cta: "View the full daily routine",
    href: "/guides/daily-routine",
    bg: "from-primary/5 to-sky/5",
    tag_color: "bg-primary/10 text-primary",
  },
  {
    icon: <Brain className="w-6 h-6 text-violet" />,
    tag: "Pain Triggers",
    title: "What commonly triggers joint pain",
    points: [
      "The boom-bust cycle: overactivity followed by complete inactivity",
      "Cold, damp weather and sudden barometric pressure drops",
      "Poor sleep — which directly raises pain sensitivity",
      "Chronic stress and anxiety amplifying inflammatory responses",
    ],
    cta: "Track your triggers now",
    href: "/symptom-tracker",
    bg: "from-violet/5 to-violet/10",
    tag_color: "bg-violet/10 text-violet",
  },
];

const ExpertContentSection = memo(() => (
  <section aria-labelledby="expert-content-heading" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-label text-primary/60 block mb-4">Expert Advice</span>
        <h2 id="expert-content-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Practical knowledge for <span className="text-primary">daily life with arthritis</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Real, actionable guidance — reviewed by physiotherapists and rheumatologists, written in plain English.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {topics.map((t) => (
          <div
            key={t.title}
            className={`rounded-2xl bg-gradient-to-br ${t.bg} border border-border p-7 flex flex-col`}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 bg-card rounded-xl shadow-sm flex items-center justify-center" aria-hidden="true">
                {t.icon}
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.tag_color}`}>{t.tag}</span>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-4">{t.title}</h3>
            <ul className="space-y-2.5 flex-1 mb-6" role="list">
              {t.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
            <Link
              to={t.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group focus:outline-none focus:underline"
            >
              {t.cta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/guides"
          className="inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-sm font-bold text-primary-foreground shadow-lg hover:bg-primary/90 hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          Explore All Expert Guides
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
));

ExpertContentSection.displayName = "ExpertContentSection";
export default ExpertContentSection;
