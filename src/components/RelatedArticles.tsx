import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useRelatedArticles, type RelatedArticlesOptions } from "@/hooks/useBlogArticles";
import {
  primaryClusterFor,
  getClusterById,
  CONTENT_CLUSTERS,
} from "@/lib/relatedClusters";
import { partitionByVisited } from "@/lib/visitedArticles";
import { trackEvent } from "@/lib/analytics";
import { coverImage } from "@/lib/articleImages";

interface RelatedArticlesProps extends RelatedArticlesOptions {
  currentSlug: string;
  currentCategory?: string;
  currentTitle?: string;
  currentExcerpt?: string;
  currentKeywords?: string;
  /** Pre-seed clusters when used on a non-blog page. */
  clusters?: string[];
  heading?: string;
  /** Bias ordering toward articles the visitor hasn't read yet. */
  preferUnvisited?: boolean;
}

const RelatedArticles = memo(
  ({
    currentSlug,
    currentCategory,
    currentTitle,
    currentExcerpt,
    currentKeywords,
    clusters,
    heading = "Keep reading",
    preferUnvisited = false,
  }: RelatedArticlesProps) => {
    const { data: related = [] } = useRelatedArticles(currentSlug, {
      seedClusters: clusters,
      seedCategory: currentCategory,
      seedTitle: currentTitle,
      seedExcerpt: currentExcerpt,
      seedKeywords: currentKeywords,
    });

    const orderedRelated = useMemo(() => {
      if (!preferUnvisited) return related;
      const { unvisited, visited } = partitionByVisited(related, currentSlug);
      return [...unvisited, ...visited];
    }, [related, preferUnvisited, currentSlug]);

    const unvisitedSet = useMemo(() => {
      if (!preferUnvisited) return new Set<string>();
      return new Set(
        partitionByVisited(related, currentSlug).unvisited.map((r) => r.slug),
      );
    }, [related, preferUnvisited, currentSlug]);

    const seedClusterIds =
      clusters && clusters.length > 0
        ? clusters
        : (() => {
            const counts = new Map<string, number>();
            for (const r of orderedRelated) {
              const c = primaryClusterFor(r);
              if (c) counts.set(c.id, (counts.get(c.id) ?? 0) + 1);
            }
            return [...counts.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([id]) => id);
          })();

    const bestGuide =
      (seedClusterIds.map((id) => getClusterById(id)).find(Boolean) ??
        CONTENT_CLUSTERS[0])?.bestGuide;

    if (orderedRelated.length === 0) return null;

    const [featured, ...rest] = orderedRelated;
    const gridItems = rest.slice(0, 3);

    return (
      <aside className="mt-16 pt-12 border-t border-border/50" aria-label="Related articles">
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">
            Next clicks
          </p>
          <h2 className="font-display text-2xl font-bold text-foreground m-0">
            {heading}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Topic-matched articles and guides — chosen from this post&apos;s themes.
          </p>
        </div>

        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            onClick={() =>
              trackEvent("related_click", {
                target_slug: featured.slug,
                source_slug: currentSlug,
                unvisited: unvisitedSet.has(featured.slug),
                position: "featured",
              })
            }
            className="group mb-5 flex flex-col sm:flex-row rounded-2xl border border-primary/25 bg-primary/[0.03] overflow-hidden hover:shadow-medium hover:border-primary/40 transition-all duration-300 min-h-[44px]"
          >
            <div className="sm:w-48 md:w-56 aspect-[16/9] sm:aspect-auto overflow-hidden bg-muted/20 shrink-0">
              <img
                src={coverImage(featured.category, featured.title, featured.slug).src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2">
                {preferUnvisited && unvisitedSet.has(featured.slug)
                  ? "New to you · Up next"
                  : "Up next"}
              </span>
              <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                {featured.excerpt}
              </p>
              <span className="text-primary text-sm font-medium inline-flex items-center gap-1.5">
                Read this article <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {gridItems.map((post) => {
            const cluster = primaryClusterFor(post);
            const isUnvisited = unvisitedSet.has(post.slug);
            const eyebrow =
              preferUnvisited && isUnvisited
                ? "New to you"
                : (cluster?.label ?? post.category);
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                onClick={() =>
                  trackEvent("related_click", {
                    target_slug: post.slug,
                    source_slug: currentSlug,
                    unvisited: isUnvisited,
                  })
                }
                className="group rounded-xl border border-border/60 bg-card overflow-hidden hover:shadow-medium hover:border-primary/20 transition-all duration-300 min-h-[44px]"
              >
                <div className="aspect-[16/9] overflow-hidden bg-muted/20">
                  <img
                    src={coverImage(post.category, post.title, post.slug).src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2 block">
                    {eyebrow}
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read article <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}

          {bestGuide && (
            <Link
              to={bestGuide.to}
              className="group rounded-xl border border-primary/30 bg-primary/[0.04] p-5 hover:shadow-medium hover:border-primary/50 transition-all duration-300 flex flex-col min-h-[44px]"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2 inline-flex items-center gap-1.5">
                <Compass className="w-3 h-3" aria-hidden="true" /> Best supporting guide
              </span>
              <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {bestGuide.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                {bestGuide.description}
              </p>
              <span className="mt-auto text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                Open the guide <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </span>
            </Link>
          )}
        </div>
      </aside>
    );
  },
);

RelatedArticles.displayName = "RelatedArticles";
export default RelatedArticles;
