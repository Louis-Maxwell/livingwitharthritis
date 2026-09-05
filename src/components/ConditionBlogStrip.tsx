import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { useFeaturedArticles, useConditionArticles } from "@/hooks/useBlogArticles";
import { coverImage } from "@/lib/articleImages";

interface ConditionBlogStripProps {
  /** Friendly condition name, e.g. "Osteoarthritis" — shown in copy */
  conditionName: string;
  /** Categories to pull recent articles from (e.g. ["Exercise", "Nutrition"]) */
  matchCategories?: string[];
}

interface CardArticle {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image_url: string | null;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const FeatureCard = ({ a }: { a: CardArticle }) => (
  <Link
    to={`/blog/${a.slug}`}
    className="group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card hover:border-primary/40 hover:shadow-lg transition-all"
  >
    <div className="aspect-[16/10] overflow-hidden bg-muted">
      <img
        src={coverImage(a.category, a.title, a.slug).src}
        alt={a.title}
        width={400}
        height={250}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="flex flex-col flex-1 p-5">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-2">
        {a.category}
      </span>
      <h3 className="font-display text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
        {a.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
        {a.excerpt}
      </p>
      <span className="text-xs text-muted-foreground">{formatDate(a.date)}</span>
    </div>
  </Link>
);

const RecentRow = ({ a }: { a: CardArticle }) => (
  <Link
    to={`/blog/${a.slug}`}
    className="group flex items-center justify-between gap-4 rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors"
  >
    <div className="min-w-0">
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
        {a.category}
      </span>
      <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-0.5 line-clamp-1">
        {a.title}
      </span>
      <span className="block text-xs text-muted-foreground line-clamp-1 mt-0.5">
        {a.excerpt}
      </span>
    </div>
    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
  </Link>
);

const SkeletonCard = () => (
  <div className="rounded-2xl border border-border/40 bg-card overflow-hidden">
    <div className="aspect-[16/10] bg-muted animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-16 bg-muted animate-pulse rounded" />
      <div className="h-4 w-full bg-muted animate-pulse rounded" />
      <div className="h-3 w-3/4 bg-muted animate-pulse rounded" />
    </div>
  </div>
);

export default function ConditionBlogStrip({
  conditionName,
  matchCategories = [],
}: ConditionBlogStripProps) {
  const featured = useFeaturedArticles(3);
  const recent = useConditionArticles(matchCategories, 4);

  const featuredArticles = (featured.data ?? []) as CardArticle[];
  const recentArticles = (recent.data ?? []).filter(
    (a) => !featuredArticles.some((f) => f.slug === a.slug),
  ) as CardArticle[];

  return (
    <section
      aria-label={`Advice and guidance for ${conditionName}`}
      className="my-16"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-6 border-b border-border/40">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            Blog &amp; Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Advice &amp; Guidance for {conditionName}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
            Editor-picked articles and the latest evidence-based guidance from our
            clinical editorial team.
          </p>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 shrink-0"
        >
          View all advice &amp; guidance
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Editor's Picks — 3 featured */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground">
            Editor&apos;s Picks
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {featured.isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : featuredArticles.map((a) => <FeatureCard key={a.slug} a={a} />)}
        </div>
      </div>

      {/* Recent matched articles */}
      {(recent.isLoading || recentArticles.length > 0) && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground mb-4">
            Latest on {conditionName}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {recent.isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-xl border border-border/40 bg-muted/40 animate-pulse"
                  />
                ))
              : recentArticles.slice(0, 4).map((a) => <RecentRow key={a.slug} a={a} />)}
          </div>
        </div>
      )}
    </section>
  );
}
