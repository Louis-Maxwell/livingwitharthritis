import { Link } from "react-router-dom";
import {
  Apple,
  ArrowRight,
  BookOpen,
  Dumbbell,
  HeartHandshake,
  Mail,
  MessageCircle,
} from "lucide-react";

interface Props {
  title: string;
  category?: string;
}

const ACTIONS = [
  {
    to: "/guides",
    label: "Guides hub",
    blurb: "UK pathways for diet, exercise, benefits and care",
    Icon: BookOpen,
  },
  {
    to: "/exercises",
    label: "Joint exercises",
    blurb: "Low-impact routines for knees, hands and hips",
    Icon: Dumbbell,
  },
  {
    to: "/diet",
    label: "Diet & nutrition",
    blurb: "Anti-inflammatory eating that supports joints",
    Icon: Apple,
  },
  {
    to: "/chat",
    label: "Help chat",
    blurb: "Ask about symptoms, flares, diet or movement",
    Icon: MessageCircle,
  },
  {
    to: "/contact",
    label: "Contact us",
    blurb: "Reach the Living With Arthritis UK team",
    Icon: Mail,
  },
] as const;

/**
 * Closing support block — in-content CTAs only (no popups).
 * Charity-safe copy linking to real on-site destinations.
 */
const ArticleClosingCTA = ({ title }: Props) => {
  return (
    <section
      aria-label="Find support"
      className="not-prose mt-14 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8"
    >
      <div className="flex items-center gap-2 mb-3">
        <HeartHandshake className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground m-0">
          Find support for living with arthritis
        </h2>
      </div>
      <p className="text-foreground/85 leading-relaxed mb-5 max-w-2xl">
        You are not alone. If reading <em>{title}</em> raised questions about
        your symptoms, Living With Arthritis UK offers free guides, exercises,
        diet advice and a help chat — plus a real team you can contact.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
        {ACTIONS.map(({ to, label, blurb, Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-start gap-3 rounded-xl border border-border/50 bg-card px-4 py-3.5 min-h-[44px] hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {label}
              </span>
              <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
                {blurb}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/self-help"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 min-h-[44px] text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Explore self-help tools
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
        <Link
          to="/exercises"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Exercise hub
        </Link>
        <Link
          to="/diet"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Diet hub
        </Link>
        <Link
          to="/donate"
          className="inline-flex items-center gap-2 rounded-full border border-border/50 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Soft support · Donate
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-primary hover:bg-primary/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Talk to us
        </Link>
      </div>
    </section>
  );
};

export default ArticleClosingCTA;
