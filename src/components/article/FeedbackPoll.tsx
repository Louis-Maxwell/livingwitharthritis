import { useState } from "react";
import { ThumbsUp, ThumbsDown, Check } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface FeedbackPollProps {
  slug: string;
  title: string;
}

/**
 * Inline "Did this help?" mini-poll.
 * Fires `article_feedback` GA4 event. Persists per-slug in localStorage
 * so we don't pester users twice. Pure client-side, no backend writes.
 */
const STORAGE_PREFIX = "lwa:feedback:";

const FeedbackPoll = ({ slug, title }: FeedbackPollProps) => {
  const initial = typeof window !== "undefined"
    ? window.localStorage.getItem(STORAGE_PREFIX + slug)
    : null;
  const [choice, setChoice] = useState<"up" | "down" | null>(
    initial === "up" || initial === "down" ? initial : null,
  );

  const submit = (value: "up" | "down") => {
    setChoice(value);
    try {
      window.localStorage.setItem(STORAGE_PREFIX + slug, value);
    } catch {
      /* storage unavailable — fail silently */
    }
    trackEvent("article_feedback", {
      slug,
      title,
      value,
      page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
  };

  if (choice) {
    return (
      <aside
        aria-live="polite"
        className="not-prose my-10 rounded-xl border border-primary/15 bg-primary/[0.04] px-5 py-4 flex items-center gap-3"
      >
        <Check className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
        <p className="m-0 text-sm text-foreground/85">
          Thanks for the feedback — it helps our clinical reviewers improve this guide.
        </p>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Was this article helpful?"
      className="not-prose my-10 rounded-xl border border-border/40 bg-card p-5 md:p-6"
    >
      <p className="font-display text-base md:text-lg font-bold text-foreground m-0 mb-3">
        Did this article help you?
      </p>
      <p className="text-sm text-muted-foreground m-0 mb-4">
        Your answer guides what we review and rewrite next.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => submit("up")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-background hover:bg-primary/5 hover:border-primary/40 transition-colors text-sm font-semibold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ThumbsUp className="w-4 h-4" aria-hidden="true" />
          Yes, it helped
        </button>
        <button
          type="button"
          onClick={() => submit("down")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border/60 bg-background hover:bg-primary/5 hover:border-primary/40 transition-colors text-sm font-semibold text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ThumbsDown className="w-4 h-4" aria-hidden="true" />
          Not really
        </button>
      </div>
    </aside>
  );
};

export default FeedbackPoll;
