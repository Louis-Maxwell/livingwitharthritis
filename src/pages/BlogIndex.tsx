import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Sparkles, Newspaper, Search, Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogViewCounts } from "@/hooks/useBlogViews";
import { useBlogArticlesList, useFeaturedArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";

type Category = "All" | "Exercise" | "Nutrition" | "Lifestyle" | "Health" | "Mental Health" | "Supplements" | "Treatment";

const categories: Category[] = ["All", "Exercise", "Nutrition", "Lifestyle", "Health", "Mental Health", "Supplements", "Treatment"];
const POSTS_PER_PAGE = 9;

const categoryColors: Record<Category, string> = {
  All: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Exercise: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Nutrition: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Lifestyle: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Health: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  "Mental Health": "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Supplements: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  Treatment: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
};

/** Convert a URL slug like "mental-health" or "exercise" to a Category. */
function slugToCategory(slug?: string): Category {
  if (!slug) return "All";
  const normalized = slug.toLowerCase().replace(/-/g, " ");
  const match = categories.find((c) => c.toLowerCase() === normalized);
  return match ?? "All";
}

interface BlogIndexProps {
  initialCategory?: string;
}

const BlogIndex = ({ initialCategory }: BlogIndexProps = {}) => {
  const [activeCategory, setActiveCategory] = useState<Category>(slugToCategory(initialCategory));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: blogPosts = [], isLoading } = useBlogArticlesList();
  const { data: featuredPosts = [] } = useFeaturedArticles(3);
  const featuredSlugs = useMemo(() => new Set(featuredPosts.map((p) => p.slug)), [featuredPosts]);

  const allSlugs = useMemo(() => blogPosts.map((p) => p.slug), [blogPosts]);
  const viewCounts = useBlogViewCounts(allSlugs);

  const filtered = useMemo(() => {
    // Exclude featured rows from the grid only when no filter is active.
    const base = activeCategory === "All" && !searchQuery.trim()
      ? blogPosts.filter((p) => !featuredSlugs.has(p.slug))
      : blogPosts;
    let posts = activeCategory === "All" ? base : base.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return posts;
  }, [activeCategory, searchQuery, blogPosts, featuredSlugs]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleCategory = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const getReadTime = (excerpt: string) => {
    const words = excerpt.split(/\s+/).length;
    return `${Math.max(4, Math.ceil(words / 40) + 3)} min read`;
  };

  return (
    <>
      <Helmet>
        <title>Arthritis Blog UK – Joint Pain, Diet & Exercise Advice</title>
        <meta name="description" content="Expert UK arthritis articles on anti-inflammatory diet, exercise, supplements and osteoarthritis. Free guidance for living well with joint pain." />
        <meta name="keywords" content="arthritis blog UK, joint pain advice, arthritis, anti-inflammatory diet UK, osteoarthritis exercises, arthritis help UK, joint pain diet, rheumatoid arthritis UK, swimming arthritis, yoga arthritis, turmeric arthritis, arthritis flare up" />
        <meta property="og:title" content="Arthritis Blog UK – Joint Pain, Diet & Exercise Advice" />
        <meta property="og:description" content="Expert UK arthritis articles on diet, exercise, supplements and osteoarthritis. Free guidance for living well with joint pain." />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/blog" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-community.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arthritis Blog UK – Joint Pain, Diet & Exercise Advice" />
        <meta name="twitter:description" content="Expert UK arthritis articles on diet, exercise, supplements and osteoarthritis. Free guidance for living well with joint pain." />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/blog" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Arthritis Blog UK",
          "description": "Expert UK arthritis articles on diet, exercise, supplements and osteoarthritis. Free guidance for living well with joint pain.",
          "url": "https://livingwitharthritis.org.uk/blog",
          "inLanguage": "en-GB",
          "isPartOf": { "@type": "WebSite", "name": "Living With Arthritis UK", "url": "https://livingwitharthritis.org.uk" },
          "about": { "@type": "MedicalCondition", "name": "Arthritis" },
          "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://livingwitharthritis.org.uk/blog" }
          ]
        })}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <PageHero
          gradient="from-primary/8 via-background to-rose-500/5"
          pattern="dots"
          badge={
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Newspaper className="w-3 h-3 mr-1.5" />
                {blogPosts.length} Articles
              </Badge>
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Evidence-Based
              </Badge>
            </div>
          }
          title={<>Arthritis Advice <span className="text-primary">&amp; Guidance</span></>}
          subtitle={`${blogPosts.length} evidence-based articles and counting — helping UK residents manage arthritis, reduce joint pain and live well.`}
        />

        <main className="container mx-auto px-6 md:px-10 py-6 md:py-8">
          {/* Featured / Editor's picks */}
          {activeCategory === "All" && !searchQuery && currentPage === 1 && featuredPosts.length > 0 && (
            <section aria-labelledby="featured-heading" className="mb-12">
              <div className="flex items-baseline justify-between mb-5">
                <h2 id="featured-heading" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
                  <Sparkles className="w-5 h-5 text-primary" /> Editor's Picks
                </h2>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</span>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group rounded-2xl overflow-hidden border border-border/30 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {post.image_url && (
                      <div className="aspect-[16/9] overflow-hidden bg-muted/20">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                        {post.category}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                        {post.excerpt}
                      </p>
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/40 bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all focus-glow"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? `${categoryColors[cat]} border-current shadow-sm scale-105`
                    : "bg-muted/30 text-muted-foreground border-border/30 hover:bg-muted/50"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 opacity-60">
                    ({blogPosts.filter((p) => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Showing {paginated.length} of {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {searchQuery && <span className="text-primary font-medium"> for "{searchQuery}"</span>}
          </p>

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/30 bg-card overflow-hidden p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          )}

          {/* Trending articles */}
          {!isLoading && activeCategory === "All" && !searchQuery && currentPage === 1 && (() => {
            const trending = [...blogPosts]
              .sort((a, b) => (viewCounts[b.slug] || 0) - (viewCounts[a.slug] || 0))
              .slice(0, 3)
              .filter((p) => (viewCounts[p.slug] || 0) > 0);
            if (trending.length === 0) return null;
            return (
              <div className="mb-10">
                <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-5">
                  <Flame className="w-5 h-5 text-primary" /> Trending Now
                </h2>
                <div className="grid md:grid-cols-3 gap-5">
                  {trending.map((post, i) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group rounded-2xl border border-primary/15 bg-primary/[0.03] p-6 hover:bg-primary/[0.06] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <span className="text-3xl font-black text-primary/20 leading-none">
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">{post.excerpt}</p>
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                            <Eye className="w-3.5 h-3.5" /> {(viewCounts[post.slug] || 0).toLocaleString()} views
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Grid */}
          {!isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border/30 bg-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-1 bg-primary" />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <time className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
                      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${categoryColors[post.category as Category] || categoryColors.Health}`}>
                        {post.category}
                      </span>
                    </div>
                    <h2 className="font-display text-lg font-semibold text-foreground mt-2 mb-3 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/15">
                      <span className="text-primary text-sm font-medium inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        Read more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {getReadTime(post.excerpt)}
                        </span>
                        {viewCounts[post.slug] > 0 && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" /> {viewCounts[post.slug].toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-14">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="gap-1 rounded-full"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="w-9 h-9 text-xs rounded-full"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="gap-1 rounded-full"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </nav>
          )}

          {/* Topic Hub callout */}
          <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
                Looking for answers by topic?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visit the Advice Hub for guidance grouped by diet, exercises, flare-ups and treatment — including the questions readers ask Google most.
              </p>
            </div>
            <Button asChild className="rounded-full self-start md:self-auto">
              <Link to="/blog-hub">
                Open Advice Hub <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Browse by Category */}
          <nav aria-label="Browse by category" className="mt-16 pt-10 border-t border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Browse by Category</h2>
            <p className="text-muted-foreground text-sm mb-6">Explore all our arthritis advice topics</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.filter((c) => c !== "All").map((cat) => {
                const count = blogPosts.filter((p) => p.category === cat).length;
                const isActive = activeCategory === cat;
                return (
                  <Link
                    key={cat}
                    to={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`group flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                      isActive
                        ? `${categoryColors[cat]} border-current bg-opacity-20`
                        : "border-border/40 bg-card hover:border-primary/30"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold ${categoryColors[cat]}`}>
                      {count}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cat} Articles
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cat === "Exercise" && "Physio routines, yoga, swimming & cycling"}
                        {cat === "Nutrition" && "Anti-inflammatory diet, meal plans & recipes"}
                        {cat === "Lifestyle" && "Work, travel, gardening & daily living"}
                        {cat === "Health" && "Symptoms, diagnosis & condition guides"}
                        {cat === "Mental Health" && "Mood, anxiety & coping with chronic pain"}
                        {cat === "Supplements" && "Turmeric, omega-3, glucosamine & collagen"}
                        {cat === "Treatment" && "Medication, TENS, hydrotherapy & relief"}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                );
              })}
            </div>
          </nav>
        </main>
        <InternalLinks />
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
