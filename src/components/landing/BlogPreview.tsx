import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SkeletonSection from "./SkeletonSection";

interface DBArticle {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  date: string;
  content: string;
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

const DEFAULT_IMG = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=720&fit=crop&q=80";

const CATEGORY_IMAGES: Record<string, string[]> = {
  "Finances & Benefits": [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=1080&h=720&fit=crop&q=80",
  ],
  "Expert Q&A": [
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1080&h=720&fit=crop&q=80",
  ],
  "Work & Career": [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1080&h=720&fit=crop&q=80",
  ],
  "Diet & Nutrition": [
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1080&h=720&fit=crop&q=80",
  ],
  "Exercise & Movement": [
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1080&h=720&fit=crop&q=80",
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=1080&h=720&fit=crop&q=80",
  ],
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickImage(a: DBArticle): string {
  if (a.image_url) return a.image_url;
  const list = CATEGORY_IMAGES[a.category];
  if (list?.length) return list[hashString(a.slug) % list.length];
  return DEFAULT_IMG;
}

function imgSrcSet(url: string | null) {
  if (!url || !url.includes("unsplash.com")) return undefined;
  const base = url.split("?")[0];
  return [400, 640, 800, 1080].map((w) => `${base}?w=${w}&q=80&auto=format ${w}w`).join(", ");
}

const BlogPreview = memo(() => {
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_articles")
      .select("slug, title, excerpt, image_url, category, date, content")
      .eq("is_published", true)
      .order("date", { ascending: false })
      .limit(4)
      .then(({ data, error }) => {
        if (!error && data?.length) setArticles(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <SkeletonSection />;
  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section id="blog" className="py-20 bg-accent" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label text-primary/60 block mb-4">Health & Wellness Journal</span>
          <h2 id="blog-heading" className="section-heading-rule centered inline-block text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Expert advice for living <span className="text-primary">well with arthritis</span>
          </h2>
        </div>

        {featured && (
          <article className="mb-10 rounded-2xl overflow-hidden bg-card shadow-sm ring-1 ring-border md:flex">
            <Link to={`/blog/${featured.slug}`} className="md:w-1/2 block" aria-label={featured.title}>
              <img src={pickImage(featured)} srcSet={imgSrcSet(pickImage(featured))} sizes="(max-width: 768px) 100vw, 50vw" alt="" className="w-full h-72 object-cover" loading="lazy" decoding="async" />
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
                {estimateReadingTime(featured.content)} ·{" "}
                {new Date(featured.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </article>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <article key={a.slug} className="card-accent-top group bg-card rounded-2xl shadow-sm ring-1 ring-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
              <Link to={`/blog/${a.slug}`} className="block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-label={a.title}>
                <img src={pickImage(a)} srcSet={imgSrcSet(pickImage(a))} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
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
                  {estimateReadingTime(a.content)} ·{" "}
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
