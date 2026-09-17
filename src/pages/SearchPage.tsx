import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import PageHero from "@/components/ui/PageHero";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight } from "lucide-react";
import { getSiteSearchCatalog } from "@/lib/siteSearchCatalog";
import {
  SEARCH_TOPICS,
  filterSearchCatalog,
  normalizeTopic,
  type SearchTopic,
  type WordCountBucket,
} from "@/lib/siteSearchFilters";

const WORD_OPTIONS: { value: WordCountBucket; label: string }[] = [
  { value: "any", label: "Any length" },
  { value: "under1000", label: "Under 1,000 words" },
  { value: "over1000", label: "1,000+ words" },
];

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [topic, setTopic] = useState<SearchTopic>(normalizeTopic(params.get("topic")));
  const [wordCount, setWordCount] = useState<WordCountBucket>(
    (params.get("length") as WordCountBucket) || "any",
  );

  const catalog = useMemo(() => getSiteSearchCatalog(), []);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query.trim()) next.set("q", query.trim());
    if (topic !== "All") next.set("topic", topic);
    if (wordCount !== "any") next.set("length", wordCount);
    setParams(next, { replace: true });
  }, [query, topic, wordCount, setParams]);

  const results = useMemo(
    () => filterSearchCatalog(catalog, { query, topic, wordCount }),
    [catalog, query, topic, wordCount],
  );

  return (
    <>
      <Helmet>
        <title>Search Arthritis Guides & Articles | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Search Living With Arthritis UK guides and blog articles. Filter by topic and word count to find answers without endless scrolling."
        />
        <meta property="og:title" content="Search Arthritis Guides & Articles | Living With Arthritis UK" />
        <meta
          property="og:description"
          content="Filter blog posts and hub pages by topic and length to find practical UK arthritis answers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/search" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/og/landing-share.png" />
        <meta property="og:image:alt" content="Search Living With Arthritis UK guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Search Arthritis Guides & Articles | Living With Arthritis UK" />
        <meta
          name="twitter:description"
          content="Filter blog posts and hub pages by topic and length to find practical UK arthritis answers."
        />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og/landing-share.png" />
        <meta name="twitter:image:alt" content="Search Living With Arthritis UK guides" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/search" />
      </Helmet>

      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <PageHero
          badge={
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Search
            </span>
          }
          title="Find answers faster"
          subtitle="Search with intent: type a symptom, benefit, diet or exercise question, then filter by topic and length so you can skip the scroll."
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl py-10 space-y-6">
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Looking for a starting point instead of a keyword? Try the{" "}
            <Link to="/guides" className="text-primary underline underline-offset-2">guides hub</Link>,{" "}
            <Link to="/exercises" className="text-primary underline underline-offset-2">exercise hub</Link>,{" "}
            <Link to="/diet" className="text-primary underline underline-offset-2">diet hub</Link>,{" "}
            <Link to="/conditions/osteoarthritis" className="text-primary underline underline-offset-2">conditions</Link>,{" "}
            <Link to="/benefits-pip" className="text-primary underline underline-offset-2">benefits &amp; PIP</Link>, or the{" "}
            <Link to="/blog" className="text-primary underline underline-offset-2">arthritis blog</Link>.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
            Search covers clinically reviewed UK guides on exercise, anti-inflammatory diet, PIP and benefits,
            flare-ups and condition explainers — filter by topic and length when you already know the angle.
          </p>
          <div className="relative">
            <Search
              className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
              aria-hidden="true"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search PIP, knee exercises, diet..."
              className="ps-12 h-12"
              aria-label="Search articles and hubs"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="flex-1 text-sm space-y-1">
              <span className="font-medium">Topic</span>
              <select
                className="w-full min-h-11 h-11 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Filter by topic"
                value={topic}
                onChange={(e) => setTopic(normalizeTopic(e.target.value))}
              >
                {SEARCH_TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex-1 text-sm space-y-1">
              <span className="font-medium">Word count</span>
              <select
                className="w-full min-h-11 h-11 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Filter by word count"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value as WordCountBucket)}
              >
                {WORD_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="text-sm text-muted-foreground" aria-live="polite">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>

          <div className="space-y-3">
            {results.map((item) => (
              <Card key={item.id} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="secondary">{item.topic}</Badge>
                    {item.wordCount > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ~{item.wordCount.toLocaleString("en-GB")} words
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold mb-1">
                    <Link to={item.href} className="hover:text-primary">
                      {item.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">{item.excerpt}</p>
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary"
                  >
                    Open <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            ))}
            {results.length === 0 && (
              <div
                className="rounded-2xl border border-dashed border-border bg-muted/20 p-8 text-center"
                role="status"
                aria-live="polite"
              >
                <p className="font-semibold text-foreground">No matches for that search</p>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Try a shorter phrase, clear a filter, or browse a hub — living with arthritis
                  is hard enough without hunting through empty results.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/guides"
                    className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Guides hub
                  </Link>
                  <Link
                    to="/blog"
                    className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    to="/exercises"
                    className="inline-flex min-h-11 items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Exercises
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <InternalLinks />
      <Footer />
    </>
  );
};

export default SearchPage;
