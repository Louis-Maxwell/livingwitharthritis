import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search, Home, Map, Mail, ArrowRight } from "lucide-react";
import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trackEvent } from "@/lib/analytics";

// Top-viewed evergreen articles — surfaced to keep 404 visitors on-site.
const TOP_ARTICLES = [
  {
    to: "/conditions/osteoarthritis",
    title: "Osteoarthritis: full UK guide",
    blurb: "Symptoms, causes, exercises and treatment — written for the UK.",
  },
  {
    to: "/guides/exercise",
    title: "Best exercises for arthritis",
    blurb: "Low-impact routines for knees, hips and hands, clinically reviewed.",
  },
  {
    to: "/diet",
    title: "Anti-inflammatory diet for arthritis",
    blurb: "Mediterranean eating that helps stiffness and joint pain.",
  },
];

const QUICK_LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/library", label: "Article library", icon: Map },
  { to: "/contact", label: "Report a broken link", icon: Mail },
];

const NotFound = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const missingPath = location.pathname + location.search;
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    console.error("404 Error: User attempted to access non-existent route:", missingPath, "ref:", referrer);
    // Surface the broken URL in GA4 so we can map redirects for the worst offenders.
    trackEvent("page_not_found", {
      missing_path: missingPath,
      referrer: referrer || "direct",
    });
  }, [location.pathname, location.search]);

  const searchTarget = useMemo(() => {
    const q = query.trim();
    return q ? `/library?q=${encodeURIComponent(q)}` : "/library";
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SeoHead
        title="Page Not Found (404)"
        description="The page you are looking for could not be found. Search Living With Arthritis UK or pick a popular guide instead."
        path="/404"
        noindex
      />
      <Header />

      <main className="flex-1 container mx-auto px-6 md:px-10 py-16 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl font-bold text-foreground">
          We couldn't find that page
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          The link may be broken, or the page may have moved. Try a search or jump to a popular guide below.
        </p>

        {/* Search */}
        <form
          action="/library"
          method="get"
          className="mt-8 flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/30"
        >
          <Search className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="notfound-search" className="sr-only">
            Search articles
          </label>
          <input
            id="notfound-search"
            name="q"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, e.g. knee pain, diet, exercises"
            className="flex-1 bg-transparent px-2 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Link
            to={searchTarget}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Search
          </Link>
        </form>

        {/* Top articles */}
        <section aria-labelledby="popular-heading" className="mt-12">
          <h2 id="popular-heading" className="text-xl font-semibold text-foreground">
            Popular right now
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {TOP_ARTICLES.map((a) => (
              <li key={a.to}>
                <Link
                  to={a.to}
                  className="group block h-full rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{a.blurb}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Read now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Quick links */}
        <section aria-labelledby="quicklinks-heading" className="mt-12">
          <h2 id="quicklinks-heading" className="text-xl font-semibold text-foreground">
            Or jump to
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {QUICK_LINKS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-xs text-muted-foreground">
          Requested URL:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">{location.pathname}</code>
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
