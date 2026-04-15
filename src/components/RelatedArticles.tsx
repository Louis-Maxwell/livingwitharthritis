import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRelatedArticles } from "@/hooks/useBlogArticles";

interface RelatedArticlesProps {
  currentSlug: string;
  currentCategory?: string;
}

const RelatedArticles = memo(({ currentSlug }: RelatedArticlesProps) => {
  const { data: related = [] } = useRelatedArticles(currentSlug);

  if (related.length === 0) return null;

  return (
    <aside className="mt-16 pt-12 border-t border-border/50">
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">
        You might also like
      </h2>
      <div className="grid sm:grid-cols-3 gap-5">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group rounded-xl border border-border/60 bg-card p-5 hover:shadow-medium hover:border-primary/20 transition-all duration-300"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-2 block">
              {post.category}
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
        ))}
      </div>
    </aside>
  );
});

RelatedArticles.displayName = "RelatedArticles";
export default RelatedArticles;
