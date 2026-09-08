import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogArticlesList } from "@/hooks/useBlogArticles";
import { coverImage, onCoverImgError, safeCoverSrc } from "@/lib/articleImages";

/**
 * MAP-style "Latest" 3-up grid. Covers always come from coverImage()
 * (1:1 blog-cover-map) — never article.image_url or category buckets.
 */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function LatestGrid() {
  const { data, isLoading } = useBlogArticlesList();
  const items = (data ?? []).slice(0, 3);

  return (
    <section aria-labelledby="latest-heading" className="bg-[hsl(34_45%_92%)] py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-10 max-w-6xl">
        <header className="mb-10 md:mb-12 max-w-3xl flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2
              id="latest-heading"
              className="font-display uppercase tracking-tight text-4xl md:text-6xl text-foreground leading-[0.95]"
            >
              Latest
            </h2>
            <p className="mt-4 text-base md:text-lg text-foreground/90 leading-relaxed max-w-2xl">
              New guides, eyewitness research summaries, and updates from our
              clinical reviewers.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-[0.08em] text-sm text-foreground hover:text-primary"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 bg-white/60 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {items.map((a) => (
              <Link
                key={a.slug}
                to={`/blog/${a.slug}`}
                className="group bg-white block overflow-hidden hover:shadow-xl transition-shadow focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={safeCoverSrc(coverImage(a.category, a.title, a.slug).src)}
                    alt=""
                    aria-hidden="true"
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={onCoverImgError}
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-display uppercase text-xl md:text-2xl tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">
                    {a.title} <ArrowRight className="inline w-4 h-4" />
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-foreground/70">{formatDate(a.date)}</span>
                    {a.category && (
                      <span className="bg-primary text-primary-foreground px-2 py-1 font-bold uppercase tracking-[0.08em]">
                        {a.category}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
