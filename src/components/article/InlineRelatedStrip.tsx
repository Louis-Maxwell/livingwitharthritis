import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRelatedArticles } from "@/hooks/useBlogArticles";
import { trackEvent } from "@/lib/analytics";
import { partitionByVisited } from "@/lib/visitedArticles";

interface InlineRelatedStripProps {
  currentSlug: string;
  currentCategory?: string;
  currentTitle?: string;
  currentExcerpt?: string;
  currentKeywords?: string;
  /** Slugs to exclude (e.g. those queued for the end-of-article block). */
  excludeSlugs?: string[];
  /** Optional heading override. */
  heading?: string;
  /** How many cards to show (1–3). */
  limit?: number;
}

const InlineRelatedStrip = memo(
  ({
    currentSlug,
    currentCategory,
    currentTitle,
    currentExcerpt,
    currentKeywords,
    excludeSlugs = [],
    heading = "Keep reading on this topic",
    limit = 2,
  }: InlineRelatedStripProps) => {
    const { data: related = [] } = useRelatedArticles(currentSlug, {
      seedCategory: currentCategory,
      seedTitle: currentTitle,
      seedExcerpt: currentExcerpt,
      seedKeywords: currentKeywords,
    });

    const { unvisited, visited } = partitionByVisited(related, currentSlug);
    const ordered = [...unvisited, ...visited];
    const picks = ordered
      .filter((r) => !excludeSlugs.includes(r.slug))
      .slice(0, Math.max(1, Math.min(3, limit)));

    if (picks.length === 0) return null;

    return (
      <aside
        aria-label={heading}
        className="my-10 not-prose rounded-xl border border-border/50 bg-muted/20 p-5"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-3">
          {heading}
        </p>
        <div className={`grid gap-3 ${picks.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {picks.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              onClick={() =>
                trackEvent("inline_related_click", {
                  position: "mid_article",
                  target_slug: post.slug,
                  source_slug: currentSlug,
                })
              }
              className="group flex items-start justify-between gap-3 rounded-lg bg-card border border-border/40 px-4 py-3.5 min-h-[44px] hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </span>
                {post.excerpt && (
                  <span className="mt-1 block text-xs text-muted-foreground line-clamp-2 leading-snug">
                    {post.excerpt}
                  </span>
                )}
              </span>
              <ArrowRight
                aria-hidden="true"
                className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-all"
              />
            </Link>
          ))}
        </div>
      </aside>
    );
  },
);

InlineRelatedStrip.displayName = "InlineRelatedStrip";
export default InlineRelatedStrip;
