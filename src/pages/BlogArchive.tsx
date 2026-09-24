import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Archive, ArrowLeft, CalendarDays } from "lucide-react";
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
  BLOG_CATEGORY_KEYS,
  canonicalBlogCategoryKey,
  type BlogCategoryKey,
} from "@/data/blogCategories";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";

const SITE = "https://livingwitharthritis.org.uk";
const ARCHIVE_PATH = "/blog/archive";

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

type CategoryFilter = "All" | (typeof CATEGORY_LABELS)[BlogCategoryKey];

const CATEGORY_FILTERS: CategoryFilter[] = [
  "All",
  ...BLOG_CATEGORY_KEYS.map((key) => CATEGORY_LABELS[key]),
];

function postMatchesCategory(postCategory: string, active: CategoryFilter): boolean {
  if (active === "All") return true;
  const activeKey = canonicalBlogCategoryKey(active);
  const postKey = canonicalBlogCategoryKey(postCategory);
  return !!activeKey && postKey === activeKey;
}

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

  const filtered = useMemo(() => {
    return (blogPosts as ArchiveListItem[]).filter((p) =>
      postMatchesCategory(p.category, activeCategory),
    );
  }, [blogPosts, activeCategory]);

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

        <div className="container mx-auto px-6 md:px-10 py-7 md:py-10 max-w-4xl">
          <p className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded min-h-11"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to blog home
            </Link>
          </p>

          <nav aria-label="Filter archive by topic" className="mb-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Topic
            </h2>
            <div
              role="group"
              aria-label="Filter by category"
              className="flex flex-wrap gap-2"
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
                  className={`min-h-11 px-4 py-2 rounded-full text-xs font-bold tracking-wide border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border/50 hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </nav>

          {yearGroups.length > 1 && (
            <nav aria-label="Jump to year" className="mb-8">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
                Year
              </h2>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <button
                    type="button"
                    aria-pressed={activeYear === "all"}
                    onClick={() => setActiveYear("all")}
                    className={`min-h-11 px-3.5 py-2 rounded-full text-xs font-semibold border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activeYear === "all"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border/50 text-muted-foreground hover:border-primary/30"
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
                      className={`inline-flex min-h-11 items-center px-3.5 py-2 rounded-full text-xs font-semibold border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        activeYear === g.year
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border/50 text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {g.year}
                      <span className="ml-1.5 opacity-80">({g.count})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <p className="text-sm text-muted-foreground mb-6" aria-live="polite">
            Showing <strong className="text-foreground">{totalShown}</strong>
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""} of{" "}
            {blogPosts.length} published guides
            {isLoading ? " (loading…)" : ""}.
          </p>

          {visibleGroups.length === 0 && !isLoading ? (
            <p className="rounded-xl border border-dashed border-border/60 bg-muted/20 px-5 py-8 text-sm text-muted-foreground">
              No guides match this filter.{" "}
              <button
                type="button"
                className="text-primary font-semibold underline underline-offset-2"
                onClick={() => {
                  setActiveCategory("All");
                  setActiveYear("all");
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
                  className="flex items-center gap-2 font-display text-2xl font-bold text-foreground mb-6"
                >
                  <CalendarDays className="w-5 h-5 text-primary" aria-hidden="true" />
                  {yearGroup.year}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({yearGroup.count})
                  </span>
                </h2>

                {yearGroup.months.map((month) => (
                  <section
                    key={month.key}
                    aria-labelledby={`month-${month.key}`}
                    className="mb-8"
                  >
                    <h3
                      id={`month-${month.key}`}
                      className="font-display text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3"
                    >
                      {month.label}
                    </h3>
                    <ul className="divide-y divide-border/40 rounded-xl border border-border/40 bg-card overflow-hidden">
                      {month.posts.map((post) => {
                        const iso = (post.date || "").slice(0, 10);
                        return (
                          <li key={post.slug}>
                            <Link
                              to={`/blog/${post.slug}`}
                              data-archive-slug={post.slug}
                              className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3.5 min-h-11 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring transition-colors"
                            >
                              <time
                                dateTime={iso}
                                className="shrink-0 w-28 text-xs sm:text-sm tabular-nums text-muted-foreground"
                              >
                                {formatArchiveDay(iso)}
                              </time>
                              <span className="flex-1 font-display text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                                {displayTitle(post)}
                              </span>
                              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-primary/80 sm:text-right">
                                {post.category}
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
