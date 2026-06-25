import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { useRelatedArticles, type RelatedArticlesOptions } from "@/hooks/useBlogArticles";
import {
  primaryClusterFor,
  getClusterById,
  CONTENT_CLUSTERS,
} from "@/lib/relatedClusters";

interface RelatedArticlesProps extends RelatedArticlesOptions {
  currentSlug: string;
  currentCategory?: string;
  currentTitle?: string;
  currentExcerpt?: string;
  currentKeywords?: string;
  /** Pre-seed clusters when used on a non-blog page. */
  clusters?: string[];
  heading?: string;
}

const RelatedArticles = memo(
  ({
    currentSlug,
    currentCategory,
    currentTitle,
    currentExcerpt,
    currentKeywords,
    clusters,
    heading = "You might also like",
  }: RelatedArticlesProps) => {
    const { data: related = [] } = useRelatedArticles(currentSlug, {
      seedClusters: clusters,
      seedCategory: currentCategory,
      seedTitle: currentTitle,
      seedExcerpt: currentExcerpt,
      seedKeywords: currentKeywords,
    });

    // Determine the best supporting guide based on the highest-signal cluster.
    const seedClusterIds =
      clusters && clusters.length > 0
        ? clusters
        : (() => {
            const counts = new Map<string, number>();
            for (const r of related) {
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

    if (related.length === 0) return null;

    return (
      <aside className="mt-16 pt-12 border-t border-border/50" aria-label="Related articles">
        <h2 className="font-display text-2xl font-bold text-foreground mb-6">{heading}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((post) => {
            const cluster = primaryClusterFor(post);
            const eyebrow = cluster?.label ?? post.category;
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-xl border border-border/60 bg-card p-5 hover:shadow-medium hover:border-primary/20 transition-all duration-300"
              >
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
                  Read article <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            );
          })}

          {bestGuide && (
            <Link
              to={bestGuide.to}
              className="group rounded-xl border border-primary/30 bg-primary/[0.04] p-5 hover:shadow-medium hover:border-primary/50 transition-all duration-300 flex flex-col"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2 inline-flex items-center gap-1.5">
                <Compass className="w-3 h-3" /> Best supporting guide
              </span>
              <h3 className="font-display text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                {bestGuide.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">
                {bestGuide.description}
              </p>
              <span className="mt-auto text-primary text-xs font-medium inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                Open the guide <ArrowRight className="w-3 h-3" />
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
