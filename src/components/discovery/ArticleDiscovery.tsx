import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Dumbbell, Heart, Printer, ShoppingBag } from "lucide-react";
import { getArticleDiscovery } from "@/lib/articleDiscovery";
import { canonicalBlogCategoryKey, BLOG_CATEGORY_LABELS } from "@/data/blogCategories";
import { trackEvent } from "@/lib/analytics";

/** Categories where the charity shop is a natural, non-clinical suggestion. */
const SHOP_CATEGORIES = new Set(["diet-lifestyle", "carers-family", "mental-health-fatigue", "exercise"]);
export const SHOP_URL = "https://shop.brandangels.co.uk/living-with-arthritis";

interface Props {
  slug: string;
  category?: string | null;
}

/**
 * End-of-article discovery block (crawlers get the same links from the static
 * fallback built by generate-blog-head-data): Read next, Related arthritis guides, previous/next in the
 * same category, and a small row of useful actions (no sign-up prompts).
 */
export default function ArticleDiscovery({ slug, category }: Props) {
  const d = getArticleDiscovery(slug);
  const key = canonicalBlogCategoryKey(category || "");
  const showShop = !!key && SHOP_CATEGORIES.has(key);
  if (!d) return null;
  const [readNext, ...related] = d.related;

  return (
    <section aria-labelledby="discovery-heading" className="not-prose mt-12 space-y-8 print:hidden">
      <h2 id="discovery-heading" className="sr-only">Keep reading</h2>

      {readNext && (
        <div data-track="read-next" data-track-placement="article_end">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Read next</p>
          <Link
            to={`/blog/${readNext.slug}`}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-primary/25 bg-primary/[0.04] p-5 min-h-[44px] hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span>
              <span className="block text-lg font-semibold text-foreground group-hover:text-primary">{readNext.title}</span>
              {readNext.minutes > 0 && <span className="text-sm text-muted-foreground">{readNext.minutes} min read</span>}
            </span>
            <ArrowRight className="w-5 h-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>
      )}

      {related.length > 0 && (
        <nav aria-labelledby="related-guides-heading" data-track="related" data-track-placement="article_end">
          <h2 id="related-guides-heading" className="text-xl font-bold text-foreground mb-3">Related arthritis guides</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  to={`/blog/${r.slug}`}
                  className="flex h-full min-h-[44px] items-start gap-2 rounded-xl border border-border/60 bg-card p-3 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <BookOpen className="mt-0.5 w-4 h-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{r.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {(d.prev || d.next) && (
        <nav
          aria-label={`More in ${key ? BLOG_CATEGORY_LABELS[key] : "this topic"}`}
          data-track="prev-next"
          data-track-placement="article_end"
          className="grid gap-2 sm:grid-cols-2"
        >
          {d.prev && (
            <Link
              to={`/blog/${d.prev.slug}`}
              rel="prev"
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-border/60 p-3 text-sm hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span><span className="block text-xs text-muted-foreground">Previous in this topic</span>{d.prev.title}</span>
            </Link>
          )}
          {d.next && (
            <Link
              to={`/blog/${d.next.slug}`}
              rel="next"
              className="flex min-h-[44px] items-center justify-end gap-2 rounded-xl border border-border/60 p-3 text-right text-sm hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:col-start-2"
            >
              <span><span className="block text-xs text-muted-foreground">Next in this topic</span>{d.next.title}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
          )}
        </nav>
      )}

      <div aria-label="Useful next steps" role="group" className="flex flex-wrap gap-2">
        {key && (
          <span data-track="related" data-track-placement="category_hub">
            <Link to={`/blog/category/${key}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <BookOpen className="w-4 h-4" aria-hidden="true" /> All {BLOG_CATEGORY_LABELS[key].toLowerCase()} guides
            </Link>
          </span>
        )}
        <span data-track="exercise" data-track-placement="article_end">
          <Link to="/exercises" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Dumbbell className="w-4 h-4" aria-hidden="true" /> Exercise resources
          </Link>
        </span>
        <button
          type="button"
          onClick={() => {
            trackEvent("article_download", { method: "print_pdf", article_slug: slug, placement: "article_end" });
            window.print();
          }}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Printer className="w-4 h-4" aria-hidden="true" /> Save this guide as a PDF
        </button>
        <span data-track="donate" data-track-placement="article_end">
          <Link to="/donate" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Heart className="w-4 h-4" aria-hidden="true" /> Support our free guides
          </Link>
        </span>
        {showShop && (
          <span data-track="shop" data-track-placement="article_end">
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <ShoppingBag className="w-4 h-4" aria-hidden="true" /> Charity shop<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </span>
        )}
      </div>
    </section>
  );
}
