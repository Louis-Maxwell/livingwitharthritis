import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { coverImage, onCoverImgError, safeCoverSrc } from "@/lib/articleImages";
import { getPublishedBlogList, type BlogListItem } from "@/lib/staticBlogCatalog";

function estimateReadingTime(text: string | null | undefined): string {
  const words = (text ?? "").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function pickImage(a: BlogListItem): string {
  return safeCoverSrc(coverImage(a.category, a.title, a.slug).src);
}

const PREVIEW = getPublishedBlogList().slice(0, 4);

const BlogPreview = memo(() => {
  const articles = PREVIEW;
  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section id="blog" className="py-20 bg-accent" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label text-primary block mb-4">Health & Wellness Journal</span>
          <h2 id="blog-heading" className="section-heading-rule centered inline-block text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Expert advice for living <span className="text-primary">well with arthritis</span>
          </h2>
        </div>

        {featured && (
          <article className="mb-10 rounded-2xl overflow-hidden bg-card shadow-sm ring-1 ring-border md:flex">
            <Link to={`/blog/${featured.slug}`} className="md:w-1/2 block" aria-label={featured.title}>
              <img src={pickImage(featured)} alt="" aria-hidden="true" className="w-full h-72 object-cover bg-muted" loading="lazy" decoding="async" onError={onCoverImgError} />
            </Link>
            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full w-fit">{featured.category}</span>
              <h3 className="text-2xl font-bold mt-3 text-foreground">
                <Link to={`/blog/${featured.slug}`} className="hover:text-primary transition-colors focus:outline-none focus:underline">
                  {featured.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mt-2">{featured.excerpt}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {estimateReadingTime(featured.excerpt)} ·{" "}
                {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </article>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <article key={a.slug} className="card-accent-top group bg-card rounded-2xl shadow-sm ring-1 ring-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
              <Link to={`/blog/${a.slug}`} className="block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-label={a.title}>
                <img src={pickImage(a)} alt="" aria-hidden="true" className="w-full h-full object-cover bg-muted group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" onError={onCoverImgError} />
              </Link>
              <div className="p-5">
                <span className="text-xs font-semibold text-primary bg-primary/5 px-3 py-1 rounded-full">{a.category}</span>
                <h3 className="text-lg font-bold mt-3 text-foreground">
                  <Link to={`/blog/${a.slug}`} className="group-hover:text-primary transition-colors focus:outline-none focus:underline">
                    {a.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{a.excerpt}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {estimateReadingTime(a.excerpt)} ·{" "}
                  {new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-sm font-semibold text-secondary-foreground shadow-lg hover:bg-secondary/90 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
          >
            View all articles <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
});

BlogPreview.displayName = "BlogPreview";
export default BlogPreview;
