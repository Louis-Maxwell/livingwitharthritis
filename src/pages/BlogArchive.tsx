import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Archive, ArrowLeft, Search, X } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/badge";
import { useBlogArticlesList } from "@/hooks/useBlogArticles";
import { displayTitle } from "@/lib/blogTitle";
import {
  formatArchiveDay,
  groupPostsByYearMonth,
  type ArchiveListItem,
} from "@/lib/blogArchive";
import {
  BLOG_TOPIC_FILTERS,
  postMatchesTopic,
  type BlogTopicFilter,
} from "@/lib/blog/topics";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";

const SITE = "https://livingwitharthritis.org.uk";
const ARCHIVE_PATH = "/blog/archive";

type CategoryFilter = BlogTopicFilter;
const CATEGORY_FILTERS = BLOG_TOPIC_FILTERS;
const postMatchesCategory = postMatchesTopic;

const TITLE = "Arthritis blog archive UK — browse by date and topic";
const DESCRIPTION =
  "Full archive of Living With Arthritis UK guides: browse every published article by year, month and topic — exercise, diet, PIP, treatments and more.";

/**
 * Chronological archive of every published blog guide.
 * Complements /blog (discovery + search) with date-first browsing.
 */
const BlogArchive = () => {
  const { data: blogPosts = [], isLoading } = useBlogArticlesList();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [activeYear, setActiveYear] = useState<number | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (blogPosts as ArchiveListItem[]).filter(
      (p) =>
        postMatchesCategory(p.category, activeCategory) &&
        (!q || p.title.toLowerCase().includes(q) || (p.meta_title ?? "").toLowerCase().includes(q)),
    );
  }, [blogPosts, activeCategory, query]);

  const yearGroups = useMemo(() => groupPostsByYearMonth(filtered), [filtered]);

  const visibleGroups = useMemo(() => {
    if (activeYear === "all") return yearGroups;
    return yearGroups.filter((g) => g.year === activeYear);
  }, [yearGroups, activeYear]);

  const totalShown = visibleGroups.reduce((n, g) => n + g.count, 0);

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE}${ARCHIVE_PATH}`,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      name: "Living With Arthritis UK",
      url: SITE,
    },
    about: { "@type": "MedicalCondition", name: "Arthritis" },
    numberOfItems: blogPosts.length,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: "Archive", item: `${SITE}${ARCHIVE_PATH}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title={TITLE}
        description={DESCRIPTION}
        path={ARCHIVE_PATH}
        includeSiteName={false}
        keywords="arthritis blog archive UK, arthritis articles by date, arthritis guides by topic, joint pain archive"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <Header />
      <main id="main-content" role="main" tabIndex={-1} className="outline-none flex-1">
        <PageHero
          compact
          gradient="from-primary/8 via-background to-primary/5"
          pattern="dots"
          badge={
            <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
              <Archive className="w-3 h-3 mr-1.5" aria-hidden="true" />
              {formatInventoryCount(CONTENT_INVENTORY.blogArticles)} guides
            </Badge>
          }
          title={
            <>
              Blog archive: <span className="text-primary">browse by date and topic</span>
            </>
          }
          subtitle="Every published Living With Arthritis UK guide in one place — dated, filterable by topic, and ready to open. Charity 1218461."
        />

        <div className="container mx-auto max-w-4xl px-5 sm:px-6 md:px-10 py-8 md:py-12">
          <p className="mb-6">
            <Link
              to="/blog"
              className="inline-flex min-h-11 items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to blog home
            </Link>
          </p>

          <div className="mb-10 rounded-2xl border border-border/60 bg-card p-4 sm:p-5 dark:border-border/70">
            <div className="relative mb-4">
              <label htmlFor="archive-search" className="sr-only">
                Search archive titles
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveYear("all");
                }}
                placeholder="Search guide titles…"
                className="w-full min-h-12 rounded-xl border border-border bg-background pl-11 pr-12 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-1 top-1/2 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <nav aria-label="Filter archive by topic">
              <h2 className="mb-2 text-sm font-semibold text-foreground">Topic</h2>
              <div
                role="group"
                aria-label="Filter by category"
                className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible md:pb-0"
              >
                {CATEGORY_FILTERS.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={activeCategory === cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveYear("all");
                    }}
                    className={`shrink-0 inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      activeCategory === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </nav>

            {yearGroups.length > 1 && (
              <nav aria-label="Jump to year" className="mt-4">
                <h2 className="mb-2 text-sm font-semibold text-foreground">Year</h2>
                <ul className="flex flex-wrap gap-2">
                  <li>
                    <button
                      type="button"
                      aria-pressed={activeYear === "all"}
                      onClick={() => setActiveYear("all")}
                      className={`min-h-11 rounded-full border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeYear === "all"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground/80 hover:border-primary/40"
                      }`}
                    >
                      All years
                    </button>
                  </li>
                  {yearGroups.map((g) => (
                    <li key={g.year}>
                      <a
                        href={`#year-${g.year}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveYear(g.year);
                          requestAnimationFrame(() => {
                            document.getElementById(`year-${g.year}`)?.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                          });
                        }}
                        className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          activeYear === g.year
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground/80 hover:border-primary/40"
                        }`}
                      >
                        {g.year}
                        <span className="ml-1.5 tabular-nums opacity-80">{g.count}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <p className="mt-4 border-t border-border/50 pt-3 text-sm text-muted-foreground" aria-live="polite">
              Showing <strong className="text-foreground">{totalShown}</strong>
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""} of{" "}
              {blogPosts.length} published guides
              {query.trim() ? <> matching &ldquo;{query.trim()}&rdquo;</> : null}
              {isLoading ? " (loading…)" : ""}.
            </p>
          </div>

          {visibleGroups.length === 0 && !isLoading ? (
            <p className="rounded-xl border border-dashed border-border/60 bg-muted/20 px-5 py-8 text-sm text-muted-foreground">
              No guides match this filter.{" "}
              <button
                type="button"
                className="min-h-11 font-semibold text-primary underline underline-offset-2"
                onClick={() => {
                  setActiveCategory("All");
                  setActiveYear("all");
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            </p>
          ) : (
            visibleGroups.map((yearGroup) => (
              <section
                key={yearGroup.year}
                id={`year-${yearGroup.year}`}
                aria-labelledby={`year-heading-${yearGroup.year}`}
                className="mb-12 scroll-mt-24"
              >
                <h2
                  id={`year-heading-${yearGroup.year}`}
                  className="mb-6 flex items-baseline gap-2 font-display text-2xl font-bold text-foreground"
                >
                  {yearGroup.year}
                  <span className="text-sm font-normal text-muted-foreground">
                    {yearGroup.count} guides
                  </span>
                </h2>

                {yearGroup.months.map((month) => (
                  <section key={month.key} aria-labelledby={`month-${month.key}`} className="mb-8">
                    <h3
                      id={`month-${month.key}`}
                      className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {month.label}
                    </h3>
                    <ul className="divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/60 bg-card">
                      {month.posts.map((post) => {
                        const iso = (post.date || "").slice(0, 10);
                        return (
                          <li key={post.slug}>
                            <Link
                              to={`/blog/${post.slug}`}
                              data-archive-slug={post.slug}
                              className="group grid min-h-11 gap-1 px-4 py-3.5 transition-colors hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-4 sm:px-5"
                            >
                              <time dateTime={iso} className="text-sm tabular-nums text-muted-foreground">
                                {formatArchiveDay(iso)}
                              </time>
                              <span className="font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                                {displayTitle(post)}
                              </span>
                              <span className="text-sm text-muted-foreground sm:text-right">
                                {post.category}
                                {post.reading_minutes ? (
                                  <span className="whitespace-nowrap"> · {post.reading_minutes} min</span>
                                ) : null}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </section>
            ))
          )}

          <p className="text-sm text-muted-foreground mt-10">
            Prefer cards and search?{" "}
            <Link to="/blog" className="text-primary underline underline-offset-2">
              Open the blog home
            </Link>{" "}
            or{" "}
            <Link to="/search" className="text-primary underline underline-offset-2">
              search all guides
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogArchive;
