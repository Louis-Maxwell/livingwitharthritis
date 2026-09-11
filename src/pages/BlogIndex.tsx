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
  RefreshCw,
  Compass,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBlogArticlesList, useFeaturedArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";
import {
  BLOG_CATEGORY_KEYS,
  canonicalBlogCategoryKey,
  type BlogCategoryKey,
} from "@/data/blogCategories";
import { TOPIC_CLUSTERS } from "@/data/topicClusters";
import BlogCard from "@/components/blog/BlogCard";
import BlogSoftCTAs from "@/components/blog/BlogSoftCTAs";
import { getBookmarks } from "@/lib/bookmarkedArticles";
import { getLastRead, type LastReadArticle } from "@/lib/lastReadArticle";

const CATEGORY_LABELS: Record<BlogCategoryKey, string> = {
  exercise: "Exercise",
  nutrition: "Nutrition",
  lifestyle: "Lifestyle",
  health: "Health",
  "mental-health": "Mental Health",
  supplements: "Supplements",
  treatment: "Treatment",
  frailty: "Frailty",
};

type Category = "All" | (typeof CATEGORY_LABELS)[BlogCategoryKey];

type SortMode = "newest" | "updated" | "az";

const SORT_OPTIONS: { id: SortMode; label: string }[] = [
  { id: "newest", label: "Newest" },
  { id: "updated", label: "Recently updated" },
  { id: "az", label: "A–Z" },
];

const categories: Category[] = [
  "All",
  ...BLOG_CATEGORY_KEYS.map((key) => CATEGORY_LABELS[key]),
];
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
];

const categoryColors: Record<Category, string> = {
  All: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Exercise: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Nutrition: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Lifestyle: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Health: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  "Mental Health": "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Supplements: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Treatment: "bg-background text-primary hover:bg-primary/10 border-primary/40",
  Frailty: "bg-background text-primary hover:bg-primary/10 border-primary/40",
};

function postMatchesCategory(postCategory: string, active: Category): boolean {
  if (active === "All") return true;
  const activeKey = canonicalBlogCategoryKey(active);
  const postKey = canonicalBlogCategoryKey(postCategory);
  return !!activeKey && postKey === activeKey;
}

function countInCategory(posts: { category: string }[], cat: Category): number {
  return posts.filter((p) => postMatchesCategory(p.category, cat)).length;
}

function slugToCategory(slug?: string): Category {
  if (!slug) return "All";
  const key = canonicalBlogCategoryKey(slug);
  if (key) return CATEGORY_LABELS[key];
  return "All";
}

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

        <PageHero
          gradient="from-primary/8 via-background to-primary/5"
          pattern="dots"
          badge={
            <div className="flex items-center gap-3">
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Newspaper className="w-3 h-3 mr-1.5" />
                {blogPosts.length} Articles
              </Badge>
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
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

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-6 md:py-8">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-8">
            This arthritis blog is written for people in the United Kingdom who need plain-English help
            with joint pain, flare-ups, exercise, diet, PIP and treatments. Browse by topic below, or{" "}
            <Link to="/search" className="text-primary underline underline-offset-2">
              search
            </Link>{" "}
            when you know what you need. Living With Arthritis UK (registered charity 1218461)
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

          <nav aria-label="Browse arthritis topics" className="mb-10">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
              Browse by topic
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {TOPIC_HUBS.map((hub) => (
                <li key={hub.to}>
                  <Link
                    to={hub.to}
                    className="group flex h-full flex-col rounded-xl border border-border/40 bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {hub.label}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1 leading-relaxed">{hub.blurb}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Continue reading — last opened article on this device */}
          {continuePost && (
            <section aria-labelledby="continue-heading" className="mb-10">
              <div className="flex items-baseline justify-between mb-4">
                <h2
                  id="continue-heading"
                  className="flex items-center gap-2 font-display text-lg md:text-xl font-bold text-foreground"
                >
                  <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" /> Continue reading
                </h2>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Resume</span>
              </div>
              <BlogCard post={continuePost} variant="compact" className="max-w-3xl" />
            </section>
          )}

          {/* Saved for later — local bookmarks only; no view counts */}
          <section aria-labelledby="saved-heading" className="mb-12">
            <div className="flex items-baseline justify-between mb-4">
              <h2
                id="saved-heading"
                className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-foreground"
              >
                <Bookmark className="w-5 h-5 text-primary" aria-hidden="true" /> Saved articles
              </h2>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">This device</span>
            </div>
            {savedPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPosts.map((post) => (
                  <BlogCard key={`saved-${post.slug}`} post={post} />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-dashed border-border/60 bg-muted/20 px-5 py-6 text-sm md:text-base text-muted-foreground dark:border-border/70">
                No saved articles yet. Open any guide and tap <strong className="text-foreground">Save</strong>{" "}
                to bookmark it on this device — we never invent popularity or view counts.
              </p>
            )}
          </section>

          {/* Featured / Editor's picks — magazine lead spans 2 cols on md+ */}
          {showDiscovery && featuredPosts.length > 0 && (
            <section aria-labelledby="featured-heading" className="mb-12">
              <div className="flex items-baseline justify-between mb-5">
                <h2
                  id="featured-heading"
                  className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-foreground"
                >
                  <Sparkles className="w-5 h-5 text-primary" aria-hidden="true" /> Editor&rsquo;s Picks
                </h2>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Featured</span>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Recently updated — real dates only, never popular/view counts */}
          {showDiscovery && recentlyUpdated.length > 0 && (
            <section aria-labelledby="updated-heading" className="mb-12">
              <div className="flex items-baseline justify-between mb-5">
                <h2
                  id="updated-heading"
                  className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-foreground"
                >
                  <RefreshCw className="w-5 h-5 text-primary" aria-hidden="true" /> Recently updated
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setSortMode("updated");
                    setCurrentPage(1);
                    document.getElementById("blog-filters")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                >
                  Sort all by updated
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentlyUpdated.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* Editor journeys → topic cluster pillars */}
          {showDiscovery && (
            <section aria-labelledby="journeys-heading" className="mb-12">
              <h2
                id="journeys-heading"
                className="flex items-center gap-2 font-display text-xl md:text-2xl font-bold text-foreground mb-2"
              >
                <Compass className="w-5 h-5 text-primary" aria-hidden="true" /> Editor journeys
              </h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Follow a pillar topic — pain, osteoarthritis, exercises, diet, treatments, flare-ups or
                PIP — then open the practical tool that sits beside it.
              </p>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {TOPIC_CLUSTERS.map((cluster) => (
                  <li key={cluster.id}>
                    <Link
                      to={cluster.pillarPath}
                      className="group flex h-full flex-col rounded-xl border border-border/40 bg-card p-4 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary mb-1">
                        {cluster.label}
                      </span>
                      <span className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {cluster.pillarTitle}
                      </span>
                      <span className="mt-auto pt-3 text-xs text-primary font-medium inline-flex items-center gap-1">
                        Open pillar <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {showDiscovery && <BlogSoftCTAs variant="inline" className="mb-12" />}

          {/* Sticky compact filter bar (md+) — search + category + sort; no fake metrics */}
          <div
            id="blog-filters"
            className="scroll-mt-24 mb-6 md:sticky md:top-16 md:z-30 md:-mx-2 md:px-2 md:py-3 md:rounded-2xl md:border md:border-border/40 md:bg-background/85 md:backdrop-blur-md dark:md:border-border/60 dark:md:bg-background/80"
          >
            <div className="relative max-w-xl mb-4 md:mb-3">
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
                aria-label="Search articles"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full min-h-11 pl-11 pr-12 py-3 rounded-xl border border-border/50 bg-card text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all dark:border-border/70"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 min-h-11 min-w-11 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div
              role="group"
              aria-label="Filter by category"
              className="flex flex-wrap gap-2 mb-3"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategory(cat)}
                  aria-pressed={activeCategory === cat}
                  className={`min-h-11 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide border transition-all duration-200 cursor-pointer inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    activeCategory === cat
                      ? `${categoryColors[cat]} border-current shadow-sm scale-105`
                      : "bg-muted/30 text-muted-foreground border-border/40 hover:bg-muted/50 dark:border-border/55"
                  }`}
                >
                  {cat}
                  {cat !== "All" && (
                    <span className="ml-1.5 opacity-80">({countInCategory(blogPosts, cat)})</span>
                  )}
                </button>
              ))}
            </div>

            {showAuthorFilter && (
              <div role="group" aria-label="Filter by author" className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground self-center mr-1">
                  Author
                </span>
                {availableAuthors.map((author) => (
                  <button
                    key={author}
                    type="button"
                    aria-pressed={activeAuthor === author}
                    onClick={() => {
                      setActiveAuthor((prev) => (prev === author ? null : author));
                      setCurrentPage(1);
                    }}
                    className={`min-h-11 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeAuthor === author
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-muted-foreground border-border/50 hover:border-primary/30 dark:border-border/60"
                    }`}
                  >
                    {author}
                  </button>
                ))}
              </div>
            )}

            {/* Optional tags — only when posts carry tags */}
            {availableTags.length > 0 && (
              <div role="group" aria-label="Filter by tag" className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground self-center mr-1">
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
                    className={`min-h-11 px-3 py-1.5 rounded-full text-xs font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeTag === tag
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border/40 hover:border-primary/30"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                Showing {paginated.length} of {filtered.length} article
                {filtered.length !== 1 ? "s" : ""}
                {searchQuery && (
                  <span className="text-primary font-medium"> for &ldquo;{searchQuery}&rdquo;</span>
                )}
                {activeTag && (
                  <span className="text-primary font-medium"> tagged {activeTag}</span>
                )}
                {activeAuthor && (
                  <span className="text-primary font-medium"> by {activeAuthor}</span>
                )}
              </p>
              <div role="group" aria-label="Sort articles" className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                  Sort
                </span>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={sortMode === opt.id}
                    onClick={() => {
                      setSortMode(opt.id);
                      setCurrentPage(1);
                    }}
                    className={`min-h-11 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      sortMode === opt.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-card text-muted-foreground border-border/40 hover:border-primary/30 dark:border-border/60"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" aria-busy="true" aria-label="Loading articles">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border border-border/40 bg-card overflow-hidden dark:border-border/60 ${
                    i === 0 ? "md:col-span-2 md:flex md:flex-row" : ""
                  }`}
                >
                  <Skeleton
                    className={`aspect-[16/9] w-full rounded-none ${
                      i === 0 ? "md:aspect-auto md:w-[48%] md:min-h-[240px]" : ""
                    }`}
                  />
                  <div className={`p-6 space-y-3 ${i === 0 ? "md:w-[52%] md:flex md:flex-col md:justify-center" : ""}`}>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div
              className="rounded-2xl border border-dashed border-border bg-muted/20 p-10 text-center mb-6"
              role="status"
              aria-live="polite"
            >
              <p className="font-semibold text-foreground text-lg md:text-xl">No articles match that filter</p>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-md mx-auto">
                Try another category, clear your search, or head back to all articles — we keep the
                list honest and useful.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                  setActiveTag(null);
                  setActiveAuthor(null);
                  setSortMode("newest");
                  setCurrentPage(1);
                }}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Show all articles
              </button>
            </div>
          )}

          {!isLoading && filtered.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
              {paginated.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 && filtered.length > 0 && (
            <nav aria-label="Blog pagination" className="flex items-center justify-center gap-2 mt-14">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="gap-1 rounded-full min-h-11"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Previous
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) => page === 1 || page === totalPages || Math.abs(page - safePage) <= 1,
                )
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
                      className="w-11 h-11 text-xs rounded-full"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  </span>
                ))}

              <Button
                variant="outline"
                size="sm"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="gap-1 rounded-full min-h-11"
              >
                Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </nav>
          )}

          <BlogSoftCTAs variant="banner" />

          <div className="mt-16 rounded-2xl border border-primary/20 bg-primary/[0.04] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
                Looking for answers by topic?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Visit the Advice Hub for guidance grouped by diet, exercises, flare-ups and treatment —
                including the questions readers ask Google most.
              </p>
            </div>
            <Button asChild className="rounded-full self-start md:self-auto min-h-11">
              <Link to="/blog-hub">
                Open Advice Hub <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <nav aria-label="Browse by category" className="mt-16 pt-10 border-t border-border/30">
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground text-sm mb-6">Explore all our arthritis advice topics</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories
                .filter((c) => c !== "All")
                .map((cat) => {
                  const count = countInCategory(blogPosts, cat);
                  const isActive = activeCategory === cat;
                  return (
                    <Link
                      key={cat}
                      to={`/blog/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`group flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? `${categoryColors[cat]} border-current bg-opacity-20`
                          : "border-border/40 bg-card hover:border-primary/30"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold ${categoryColors[cat]}`}
                      >
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
                          {cat === "Frailty" && "Falls prevention, sarcopenia & longevity"}
                        </p>
                      </div>
                      <ArrowRight
                        className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                        aria-hidden="true"
                      />
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
