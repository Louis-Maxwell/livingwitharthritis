import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRelatedArticles } from "@/hooks/useBlogArticles";
import { trackEvent } from "@/lib/analytics";

interface InlineRelatedStripProps {
  currentSlug: string;
  currentCategory?: string;
  currentTitle?: string;
  currentExcerpt?: string;
  currentKeywords?: string;
  /** Slugs to exclude (e.g. those queued for the end-of-article block). */
  excludeSlugs?: string[];
}

const InlineRelatedStrip = memo(
  ({
    currentSlug,
    currentCategory,
    currentTitle,
    currentExcerpt,
    currentKeywords,
    excludeSlugs = [],
  }: InlineRelatedStripProps) => {
    const { data: related = [] } = useRelatedArticles(currentSlug, {
      seedCategory: currentCategory,
      seedTitle: currentTitle,
      seedExcerpt: currentExcerpt,
      seedKeywords: currentKeywords,
    });

    const picks = related
      .filter((r) => !excludeSlugs.includes(r.slug))
      .slice(0, 2);

    if (picks.length < 2) return null;

    return (
      <aside
        aria-label="Keep reading on this topic"
        className="my-10 not-prose rounded-xl border border-border/50 bg-muted/20 p-5"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-3">
          Keep reading on this topic
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
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
              className="group flex items-start justify-between gap-3 rounded-lg bg-card border border-border/40 px-4 py-3 hover:border-primary/30 hover:shadow-sm transition-all"
            >
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </aside>
    );
  },
);

InlineRelatedStrip.displayName = "InlineRelatedStrip";
export default InlineRelatedStrip;
