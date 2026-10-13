import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { useNextArticle } from "@/hooks/useBlogArticles";
import { coverImage } from "@/lib/articleImages";
import { trackEvent } from "@/lib/analytics";

interface EndNextArticleCardProps {
  currentSlug: string;
}

/**
 * Clear, thumb-friendly "read next" card at the end of the article body.
 * Uses the same next-article signal as the sticky continue bar.
 */
const EndNextArticleCard = memo(({ currentSlug }: EndNextArticleCardProps) => {
  const { data: next } = useNextArticle(currentSlug);
  if (!next?.slug || !next.title) return null;

  const cover = coverImage("", next.title, next.slug);

  return (
    <aside
      aria-label="Next article"
      className="not-prose mt-12 mb-4 rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
    >
      <Link
        to={`/blog/${next.slug}`}
        onClick={() =>
          trackEvent("end_next_article_click", {
            target_slug: next.slug,
            source_slug: currentSlug,
          })
        }
        className="group flex flex-col sm:flex-row min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <div className="sm:w-44 md:w-52 aspect-[16/9] sm:aspect-auto sm:min-h-[120px] overflow-hidden bg-muted/30 shrink-0">
          <img
            src={cover.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 p-5 md:p-6">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5 inline-flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" aria-hidden="true" />
              Keep reading
            </p>
            <h2 className="font-display text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug m-0">
              {next.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5">
              Continue to the next article — written for people living with arthritis in the UK.
            </p>
          </div>
          <span className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-full bg-primary text-primary-foreground group-hover:opacity-90 transition-opacity">
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Read next article</span>
          </span>
        </div>
      </Link>
    </aside>
  );
});

EndNextArticleCard.displayName = "EndNextArticleCard";
export default EndNextArticleCard;
