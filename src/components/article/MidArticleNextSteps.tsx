import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { Apple, ArrowRight, Dumbbell, MessageCircle, BookOpen } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MidArticleNextStepsProps {
  category?: string;
  title?: string;
  keywords?: string;
  currentSlug?: string;
}

type Step = {
  to: string;
  label: string;
  blurb: string;
  Icon: typeof Dumbbell;
};

function pickSteps(category?: string, title?: string, keywords?: string): Step[] {
  const hay = `${category ?? ""} ${title ?? ""} ${keywords ?? ""}`.toLowerCase();
  const dietFirst = /diet|food|nutrition|mediterranean|inflam/.test(hay);
  const exerciseFirst = /exercise|physio|movement|knee|hip|stretch|yoga/.test(hay);
  const guideFirst = /pip|benefit|diagnos|flare|treatment|medication/.test(hay);

  const diet: Step = {
    to: "/diet",
    label: "Diet & nutrition",
    blurb: "Anti-inflammatory eating for joint pain",
    Icon: Apple,
  };
  const exercise: Step = {
    to: "/exercises",
    label: "Joint exercises",
    blurb: "Low-impact routines you can start today",
    Icon: Dumbbell,
  };
  const guides: Step = {
    to: "/guides",
    label: "Practical guides",
    blurb: "UK pathways for diet, exercise and benefits",
    Icon: BookOpen,
  };
  const chat: Step = {
    to: "/chat",
    label: "Ask our help chat",
    blurb: "Free answers on symptoms, diet and movement",
    Icon: MessageCircle,
  };

  if (dietFirst) return [diet, exercise, chat];
  if (exerciseFirst) return [exercise, diet, guides];
  if (guideFirst) return [guides, exercise, chat];
  return [exercise, diet, chat];
}

/**
 * Soft mid-article next steps — in-content only (no overlay/popup).
 * Topic-biased from category/title/keywords.
 */
const MidArticleNextSteps = memo(
  ({ category, title, keywords, currentSlug }: MidArticleNextStepsProps) => {
    const steps = useMemo(
      () => pickSteps(category, title, keywords),
      [category, title, keywords],
    );

    return (
      <aside
        aria-label="Helpful next steps"
        className="my-10 not-prose rounded-xl border border-primary/15 bg-primary/[0.03] p-5 md:p-6"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1">
          While you read
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Practical next steps from Living With Arthritis UK — no pop-ups, just useful links.
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <Link
                key={step.to}
                to={step.to}
                onClick={() =>
                  trackEvent("mid_article_cta_click", {
                    target: step.to,
                    source_slug: currentSlug ?? "",
                  })
                }
                className="group flex items-start gap-3 rounded-lg bg-card border border-border/40 px-3.5 py-3 min-h-[44px] hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {step.label}
                  </span>
                  <span className="block text-xs text-muted-foreground leading-snug mt-0.5">
                    {step.blurb}
                  </span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-1 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            );
          })}
        </div>
      </aside>
    );
  },
);

MidArticleNextSteps.displayName = "MidArticleNextSteps";
export default MidArticleNextSteps;
