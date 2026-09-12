import { memo } from "react";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { getPublishedBlogList } from "@/lib/staticBlogCatalog";

interface PopularArticle {
  slug: string;
  title: string | null;
}

const STATIC_MOST_READ: PopularArticle[] = getPublishedBlogList()
  .slice(0, 5)
  .map((a) => ({ slug: a.slug, title: a.title }));

const FooterMostRead = memo(() => {
  const data = STATIC_MOST_READ;
  if (!data.length) return null;

  return (
    <section
      aria-labelledby="footer-most-read-heading"
      className="border-t border-border/15 bg-muted/20"
    >
      <div className="container mx-auto px-6 md:px-12 py-10">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
          <h2
            id="footer-most-read-heading"
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Most read this week
          </h2>
        </div>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map((a, i) => (
            <li key={a.slug}>
              <Link
                to={`/blog/${a.slug}`}
                className="group block rounded-lg p-3 -m-3 hover:bg-card transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span className="text-[11px] font-bold text-primary tabular-nums">
                  0{i + 1}
                </span>
                <p className="mt-1 text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {a.title}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
});

FooterMostRead.displayName = "FooterMostRead";
export default FooterMostRead;
