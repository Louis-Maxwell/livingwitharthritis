import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Living With Arthritis UK",
          url: "https://livingwitharthritis.org.uk",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://livingwitharthritis.org.uk/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}</script>
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
          subtitle="Search our blog and hub pages, then filter by topic and article length so you can skip the scroll."
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-5xl py-10 space-y-6">
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
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
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
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
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
              <p className="text-muted-foreground">
                No matches. Try a shorter query, or browse the{" "}
                <Link to="/guides" className="text-primary underline underline-offset-2">
                  guides hub
                </Link>
                .
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
