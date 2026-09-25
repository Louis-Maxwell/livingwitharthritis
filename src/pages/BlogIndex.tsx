import { useState, useMemo, useEffect, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import PageHero from "@/components/ui/PageHero";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Newspaper,
  Search,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogArticlesList, useFeaturedArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";
import { BLOG_CATEGORY_KEYS } from "@/data/blogCategories";
import {
  BLOG_TOPIC_BLURBS,
  BLOG_TOPIC_FILTERS,
  BLOG_TOPIC_LABELS,
  countInTopic,
  formatBlogDate,
  postMatchesTopic,
  topicFilterFromSlug,
  type BlogTopicFilter,
} from "@/lib/blog/topics";
import { TOPIC_CLUSTERS } from "@/data/topicClusters";
import BlogCard from "@/components/blog/BlogCard";
import BlogSoftCTAs from "@/components/blog/BlogSoftCTAs";
import { getBookmarks } from "@/lib/bookmarkedArticles";
import { getLastRead, type LastReadArticle } from "@/lib/lastReadArticle";

type Category = BlogTopicFilter;

type SortMode = "newest" | "updated" | "az";

const SORT_OPTIONS: { id: SortMode; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "updated", label: "Recently updated" },
  { id: "az", label: "A–Z" },
];

const categories: Category[] = BLOG_TOPIC_FILTERS;
const POSTS_PER_PAGE = 24;

/**
 * Posts already earning UK impressions in Semrush — they lead Editor's Picks
 * so the strongest pages are linked from the first screen of /blog.
 */
const PRIORITY_SLUGS = [
  "knee-arthritis-exercises-uk",
  "turmeric-for-arthritis",
  "omega-3-foods-for-joints",
  "mediterranean-diet-arthritis-14-day-plan",
  "pip-for-arthritis-uk",
  "expert-qa-should-i-apply-for-pip-if-my-arthritis-is-mild",
  "best-supplement-for-knee-joint",
  "best-walking-shoes-arthritis-uk",
] as const;

/** Real, crawlable topic hubs surfaced above the grid. */
const TOPIC_HUBS: { label: string; to: string; blurb: string }[] = [
  { label: "Exercise hub", to: "/exercises", blurb: "Joint-by-joint NICE-aligned routines" },
  { label: "Diet hub", to: "/diet", blurb: "Anti-inflammatory & Mediterranean eating" },
  { label: "Conditions", to: "/conditions/osteoarthritis", blurb: "OA, RA and joint-specific guides" },
  { label: "Benefits & PIP", to: "/benefits-pip", blurb: "Claims, evidence and appeals" },
  { label: "Treatments", to: "/blog/category/treatment", blurb: "Medication, physio and surgery" },
  { label: "Flare-ups", to: "/blog/arthritis-flare-up-what-to-do", blurb: "What to do when pain spikes" },
  { label: "Full archive", to: "/blog/archive", blurb: "All guides by date and topic" },
];

const postMatchesCategory = postMatchesTopic;
const countInCategory = countInTopic;
const slugToCategory = topicFilterFromSlug;

function effectiveUpdated(post: { date: string; updated_at?: string | null }): string {
  return post.updated_at || post.date || "";
}

function collectTags(posts: { tags?: string[] | null }[]): string[] {
  const set = new Set<string>();
  for (const p of posts) {
    if (!Array.isArray(p.tags)) continue;
    for (const t of p.tags) {
      if (typeof t === "string" && t.trim()) set.add(t.trim());
    }
  }
  return [...set].sort((a, b) => a.localeCompare(b, "en-GB"));
}

interface BlogIndexProps {
  initialCategory?: string;
  heroTitle?: ReactNode;
  heroSubtitle?: string;
}

const BlogIndex = ({ initialCategory, heroTitle, heroSubtitle }: BlogIndexProps = {}) => {
  const [activeCategory, setActiveCategory] = useState<Category>(slugToCategory(initialCategory));
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeAuthor, setActiveAuthor] = useState<string | null>(null);
  const [bookmarkSlugs, setBookmarkSlugs] = useState<string[]>([]);
  const [lastRead, setLastReadState] = useState<LastReadArticle | null>(null);

  const { data: blogPosts = [], isLoading } = useBlogArticlesList();
  const { data: editorPicks = [] } = useFeaturedArticles(6);

  useEffect(() => {
    setBookmarkSlugs([...getBookmarks()]);
    setLastReadState(getLastRead());
    const onFocus = () => {
      setBookmarkSlugs([...getBookmarks()]);
      setLastReadState(getLastRead());
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onFocus);
    };
  }, []);

  const availableTags = useMemo(() => collectTags(blogPosts), [blogPosts]);

  const availableAuthors = useMemo(() => {
    const set = new Set<string>();
    for (const p of blogPosts) {
      if (typeof p.author === "string" && p.author.trim()) set.add(p.author.trim());
    }
    return [...set].sort((a, b) => a.localeCompare(b, "en-GB"));
  }, [blogPosts]);

  const showAuthorFilter = availableAuthors.length >= 2;

  const savedPosts = useMemo(() => {
    if (bookmarkSlugs.length === 0) return [];
    const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));
    return bookmarkSlugs
      .map((s) => bySlug.get(s))
      .filter((p): p is (typeof blogPosts)[number] => Boolean(p))
      .slice(0, 6);
  }, [bookmarkSlugs, blogPosts]);

  const continuePost = useMemo(() => {
    if (!lastRead?.slug) return null;
    return blogPosts.find((p) => p.slug === lastRead.slug) ?? null;
  }, [lastRead, blogPosts]);

  const featuredPosts = useMemo(() => {
    const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));
    const picked: typeof blogPosts = [];
    const seen = new Set<string>();
    for (const slug of PRIORITY_SLUGS) {
      const post = bySlug.get(slug);
      if (post && !seen.has(slug)) {
        picked.push(post);
        seen.add(slug);
      }
    }
    for (const post of editorPicks) {
      if (picked.length >= 6) break;
      if (!seen.has(post.slug)) {
        picked.push(post);
        seen.add(post.slug);
      }
    }
    return picked.slice(0, 6);
  }, [blogPosts, editorPicks]);

  const featuredSlugs = useMemo(() => new Set(featuredPosts.map((p) => p.slug)), [featuredPosts]);

  const recentlyUpdated = useMemo(() => {
    return [...blogPosts]
      .sort((a, b) => effectiveUpdated(b).localeCompare(effectiveUpdated(a)))
      .filter((p) => !featuredSlugs.has(p.slug))
      .slice(0, 6);
  }, [blogPosts, featuredSlugs]);

  const filtered = useMemo(() => {
    const base =
      activeCategory === "All" && !searchQuery.trim() && !activeTag && !activeAuthor
        ? blogPosts.filter((p) => !featuredSlugs.has(p.slug))
        : blogPosts;
    let posts =
      activeCategory === "All"
        ? base
        : base.filter((p) => postMatchesCategory(p.category, activeCategory));

    if (activeTag) {
      posts = posts.filter(
        (p) => Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()),
      );
    }

    if (activeAuthor) {
      posts = posts.filter((p) => (p.author || "").trim() === activeAuthor);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          (p.author && p.author.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)),
      );
    }

    const sorted = [...posts];
    if (sortMode === "newest") {
      sorted.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    } else if (sortMode === "updated") {
      sorted.sort((a, b) => effectiveUpdated(b).localeCompare(effectiveUpdated(a)));
    } else {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "en-GB", { sensitivity: "base" }));
    }
    return sorted;
  }, [activeCategory, searchQuery, blogPosts, featuredSlugs, sortMode, activeTag, activeAuthor]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const handleCategory = (cat: Category) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(totalPages, Math.max(1, page)));
    document.getElementById("all-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
    setActiveTag(null);
    setActiveAuthor(null);
    setSortMode("newest");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    activeCategory !== "All" ||
    Boolean(searchQuery.trim()) ||
    Boolean(activeTag) ||
    Boolean(activeAuthor) ||
    sortMode !== "newest";

  const showDiscovery =
    activeCategory === "All" &&
    !searchQuery.trim() &&
    !activeTag &&
    !activeAuthor &&
    safePage === 1;

  return (
    <>
      <Helmet>
        <title>Arthritis blog UK | Exercise, diet, PIP and pain guides</title>
        <meta
          name="description"
          content="Arthritis blog UK: clinically reviewed guides on exercise, anti-inflammatory diet, PIP and benefits, treatments and flare-ups from Living With Arthritis."
        />
        <meta
          name="keywords"
          content="arthritis blog UK, joint pain advice, arthritis, anti-inflammatory diet UK, osteoarthritis exercises, arthritis help UK, joint pain diet, rheumatoid arthritis UK, swimming arthritis, yoga arthritis, turmeric arthritis, arthritis flare up"
        />
        <meta property="og:title" content="Arthritis blog UK | Exercise, diet, PIP and pain guides" />
        <meta
          property="og:description"
          content="Arthritis blog UK: clinically reviewed guides on exercise, anti-inflammatory diet, PIP and benefits, treatments and flare-ups from Living With Arthritis."
        />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/blog" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/og/landing-share.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Arthritis blog UK | Exercise, diet, PIP and pain guides" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og/landing-share.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arthritis blog UK | Exercise, diet, PIP and pain guides" />
        <meta
          name="twitter:description"
          content="Arthritis blog UK: clinically reviewed guides on exercise, anti-inflammatory diet, PIP and benefits, treatments and flare-ups from Living With Arthritis."
        />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Arthritis Blog UK",
            description:
              "Expert UK arthritis articles on diet, exercise, supplements and osteoarthritis. Free guidance for living well with joint pain.",
            url: "https://livingwitharthritis.org.uk/blog",
            inLanguage: "en-GB",
            isPartOf: {
              "@type": "WebSite",
              name: "Living With Arthritis UK",
              url: "https://livingwitharthritis.org.uk",
            },
            about: { "@type": "MedicalCondition", name: "Arthritis" },
            audience: {
              "@type": "MedicalAudience",
              audienceType: "Patient",
              geographicArea: { "@type": "Country", name: "United Kingdom" },
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://livingwitharthritis.org.uk/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://livingwitharthritis.org.uk/blog" },
            ],
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main id="main-content" role="main" tabIndex={-1} className="outline-none">
        <PageHero
          compact
          gradient="from-primary/8 via-background to-primary/5"
          pattern="dots"
          badge={
            <div className="flex items-center gap-3">
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Newspaper className="w-3 h-3 mr-1.5" aria-hidden="true" />
                {blogPosts.length} Articles
              </Badge>
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" aria-hidden="true" />
                Evidence-Based
              </Badge>
            </div>
          }
          title={
            heroTitle ?? (
              <>
                Arthritis blog UK: <span className="text-primary">exercise, diet, PIP and pain guides</span>
              </>
            )
          }
          subtitle={
            heroSubtitle ??
            `${formatInventoryCount(CONTENT_INVENTORY.blogArticles)} clinically reviewed articles for UK readers — practical help when living with arthritis feels exhausting. You are not alone.`
          }
        />

        <div className="container mx-auto max-w-6xl px-5 sm:px-6 md:px-10 py-8 md:py-12">
          <p className="max-w-prose text-base md:text-[1.05rem] leading-relaxed text-muted-foreground mb-8">
            This arthritis blog is written for people in the United Kingdom who need plain-English help
            with joint pain, flare-ups, exercise, diet, PIP and treatments. Browse by topic below, or{" "}
            <Link to="/search" className="text-primary underline underline-offset-2">
              search
            </Link>{" "}
            when you know what you need, or browse the{" "}
            <Link to="/blog/archive" className="text-primary underline underline-offset-2">
              full archive by date
            </Link>
            . Living With Arthritis UK (registered charity 1218461)
            publishes clinically reviewed guides — honest evidence, no invented miracle cures. Start
            with{" "}
            <Link to="/blog/category/exercise" className="text-primary underline underline-offset-2">
              exercise articles
            </Link>
            , the{" "}
            <Link to="/exercises" className="text-primary underline underline-offset-2">
              exercise hub
            </Link>
            , or see{" "}
            <Link to="/seo-content-framework" className="text-primary underline underline-offset-2">
              how we write SEO content
            </Link>
            .
          </p>

          {/* Continue reading — last opened article on this device */}
          {continuePost && (
            <section aria-labelledby="continue-heading" className="mb-8 max-w-3xl">
              <h2
                id="continue-heading"
                className="flex items-center gap-2 font-display text-base font-semibold text-foreground mb-3"
              >
                <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" /> Continue reading
              </h2>
              <BlogCard post={continuePost} variant="compact" />
            </section>
          )}

          {/* Find a guide — search + topic + sort; no fake metrics */}
          <section
            id="blog-filters"
            aria-labelledby="find-heading"
            className="scroll-mt-24 mb-10 rounded-2xl border border-border/60 bg-card p-4 sm:p-5 dark:border-border/70"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 id="find-heading" className="font-display text-base font-semibold text-foreground">
                Find a guide
              </h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="min-h-11 rounded px-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="relative mb-3">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="blog-search"
                type="search"
                placeholder="Search by title, topic or author…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full min-h-12 rounded-xl border border-border bg-background pl-11 pr-12 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary/50"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-1 top-1/2 -translate-y-1/2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div
              role="group"
              aria-label="Filter by category"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 snap-x md:flex-wrap md:overflow-visible md:pb-0 [scrollbar-width:thin]"
            >
              {categories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategory(cat)}
                    aria-pressed={active}
                    className={`snap-start shrink-0 inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {cat}
                    {cat !== "All" && (
                      <span className={`ml-1.5 tabular-nums ${active ? "opacity-90" : "text-muted-foreground"}`}>
                        {countInCategory(blogPosts, cat)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Optional tags — only when posts carry tags */}
            {availableTags.length > 0 && (
              <div role="group" aria-label="Filter by tag" className="mt-3 flex flex-wrap gap-2">
                <span className="self-center mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tags
                </span>
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={activeTag === tag}
                    onClick={() => {
                      setActiveTag((prev) => (prev === tag ? null : tag));
                      setCurrentPage(1);
                    }}
                    className={`min-h-11 rounded-full border px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeTag === tag
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-3 flex flex-col gap-2 border-t border-border/50 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                Showing {paginated.length} of {filtered.length} article
                {filtered.length !== 1 ? "s" : ""}
                {searchQuery && (
                  <span className="text-foreground font-medium"> for &ldquo;{searchQuery}&rdquo;</span>
                )}
                {activeTag && <span className="text-foreground font-medium"> tagged {activeTag}</span>}
                {activeAuthor && <span className="text-foreground font-medium"> by {activeAuthor}</span>}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {showAuthorFilter && (
                  <div className="flex items-center gap-2">
                    <label htmlFor="blog-author" className="text-sm text-muted-foreground">
                      Author
                    </label>
                    <select
                      id="blog-author"
                      value={activeAuthor ?? ""}
                      onChange={(e) => {
                        setActiveAuthor(e.target.value || null);
                        setCurrentPage(1);
                      }}
                      className="min-h-11 max-w-[14rem] rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Any author</option>
                      {availableAuthors.map((author) => (
                        <option key={author} value={author}>
                          {author}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex items-center gap-2">
                <label htmlFor="blog-sort" className="text-sm text-muted-foreground">
                  Sort
                </label>
                <select
                  id="blog-sort"
                  value={sortMode}
                  onChange={(e) => {
                    setSortMode(e.target.value as SortMode);
                    setCurrentPage(1);
                  }}
                  className="min-h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              </div>
            </div>
          </section>

          {/* Editor's picks — lead card spans two columns on md+ */}
          {showDiscovery && featuredPosts.length > 0 && (
            <section aria-labelledby="featured-heading" className="mb-14">
              <h2 id="featured-heading" className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">
                Editor&rsquo;s picks
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post, i) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    featured
                    priority={i === 0}
                    variant={i === 0 ? "lead" : "default"}
                    className={i === 0 ? "md:col-span-2" : undefined}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Saved for later — local bookmarks only; hidden until something is saved */}
          {savedPosts.length > 0 && (
            <section aria-labelledby="saved-heading" className="mb-14">
              <h2
                id="saved-heading"
                className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-foreground mb-5"
              >
                <Bookmark className="w-5 h-5 text-primary" aria-hidden="true" /> Saved on this device
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedPosts.map((post) => (
                  <BlogCard key={`saved-${post.slug}`} post={post} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="all-heading">
            <h2 id="all-heading" className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">
              {activeCategory === "All" ? "All guides" : `${activeCategory} guides`}
            </h2>

            {isLoading && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading articles">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-border/60 bg-card">
                    <Skeleton className="aspect-[16/9] w-full rounded-none" />
                    <div className="space-y-3 p-5">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filtered.length === 0 && (
              <div
                className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center"
                role="status"
                aria-live="polite"
              >
                <p className="font-semibold text-foreground text-lg">No articles match that filter</p>
                <p className="mx-auto mt-2 max-w-md text-sm md:text-base text-muted-foreground">
                  Try another topic, clear your search, or head back to all articles.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Show all articles
                </button>
              </div>
            )}

            {!isLoading && filtered.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-7">
                {paginated.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            {totalPages > 1 && filtered.length > 0 && (
              <nav aria-label="Blog pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage === 1}
                  onClick={() => goToPage(safePage - 1)}
                  className="gap-1 rounded-full min-h-11"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => page === 1 || page === totalPages || Math.abs(page - safePage) <= 1)
                  .map((page, i, pages) => (
                    <span key={page} className="flex items-center gap-2">
                      {i > 0 && page - pages[i - 1] > 1 && (
                        <span className="text-xs text-muted-foreground" aria-hidden="true">
                          …
                        </span>
                      )}
                      <Button
                        variant={page === safePage ? "default" : "outline"}
                        size="icon"
                        aria-label={`Page ${page}`}
                        aria-current={page === safePage ? "page" : undefined}
                        className="w-11 h-11 text-sm rounded-full"
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </Button>
                    </span>
                  ))}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={safePage === totalPages}
                  onClick={() => goToPage(safePage + 1)}
                  className="gap-1 rounded-full min-h-11"
                >
                  Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </nav>
            )}
          </section>

          {/* Recently updated — real dates only, never popular/view counts */}
          {showDiscovery && recentlyUpdated.length > 0 && (
            <section aria-labelledby="updated-heading" className="mt-16">
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 id="updated-heading" className="font-display text-xl md:text-2xl font-bold text-foreground">
                  Recently updated
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setSortMode("updated");
                    setCurrentPage(1);
                    document.getElementById("blog-filters")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="min-h-11 rounded px-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Sort all by updated
                </button>
              </div>
              <ul className="divide-y divide-border/50 rounded-2xl border border-border/60 bg-card">
                {recentlyUpdated.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                    >
                      <span className="flex-1 font-medium text-foreground group-hover:text-primary transition-colors">
                        {post.title}
                      </span>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        Updated <time dateTime={effectiveUpdated(post)}>{formatBlogDate(effectiveUpdated(post))}</time>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Explore — topic hubs, pillar journeys and categories as calm link lists */}
          <section aria-labelledby="explore-heading" className="mt-16 border-t border-border/50 pt-12">
            <h2 id="explore-heading" className="font-display text-xl md:text-2xl font-bold text-foreground mb-8">
              Explore by topic
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              <nav aria-label="Browse by category">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Blog categories
                </h3>
                <ul className="space-y-1">
                  {BLOG_CATEGORY_KEYS.map((key) => {
                    const label = BLOG_TOPIC_LABELS[key];
                    return (
                      <li key={key}>
                        <Link
                          to={`/blog/category/${key}`}
                          className="group flex min-h-11 items-start justify-between gap-3 rounded-lg px-2 py-2 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <span>
                            <span className="block font-medium text-foreground group-hover:text-primary">
                              {label} Articles
                            </span>
                            <span className="block text-sm text-muted-foreground">{BLOG_TOPIC_BLURBS[key]}</span>
                          </span>
                          <span className="shrink-0 pt-0.5 text-sm tabular-nums text-muted-foreground">
                            {countInCategory(blogPosts, label)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <nav aria-label="Browse arthritis topics">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Topic hubs
                </h3>
                <ul className="space-y-1">
                  {TOPIC_HUBS.map((hub) => (
                    <li key={hub.to}>
                      <Link
                        to={hub.to}
                        className="group block min-h-11 rounded-lg px-2 py-2 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="block font-medium text-foreground group-hover:text-primary">{hub.label}</span>
                        <span className="block text-sm text-muted-foreground">{hub.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-labelledby="journeys-heading">
                <h3
                  id="journeys-heading"
                  className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Editor journeys
                </h3>
                <ul className="space-y-1">
                  {TOPIC_CLUSTERS.map((cluster) => (
                    <li key={cluster.id}>
                      <Link
                        to={cluster.pillarPath}
                        className="group block min-h-11 rounded-lg px-2 py-2 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="block text-xs font-semibold uppercase tracking-wider text-primary">
                          {cluster.label}
                        </span>
                        <span className="block font-medium text-foreground group-hover:text-primary">
                          {cluster.pillarTitle}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/blog-hub"
                  className="mt-4 inline-flex min-h-11 items-center gap-1 px-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Open the Advice Hub <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </section>

          <BlogSoftCTAs variant="banner" />
        </div>
        </main>
        <InternalLinks />
        <Footer />
      </div>
    </>
  );
};

export default BlogIndex;
