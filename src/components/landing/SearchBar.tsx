import { memo, useMemo, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { healthTopics } from "@/data/healthTopics";
import { trackSearch } from "@/lib/ga-events";

interface IndexEntry {
  title: string;
  body: string;
  category: string;
  url: string;
  keywords: string[];
}

const buildIndex = (): IndexEntry[] =>
  healthTopics.map((t) => ({
    title: t.title,
    body: [t.subtitle, ...t.sections.map((s) => `${s.heading} ${s.body}`)].join(" "),
    category: t.category,
    url: `/health-topics/${t.slug}`,
    keywords: t.keywords ?? [],
  }));

const CATEGORIES = ["All", "Condition", "Treatment", "Medication", "Supplement", "Symptom", "Support"] as const;

const SearchBar = memo(() => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as IndexEntry[];
    const matches = index.filter((entry) => {
      const inCategory = category === "All" || entry.category === category;
      if (!inCategory) return false;
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.body.toLowerCase().includes(q) ||
        entry.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
    return matches.slice(0, 8);
  }, [query, category, index]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) trackSearch(query.trim(), results.length);
  };

  return (
    <section
      aria-label="Search our guides"
      className="bg-background border-y border-border/40 py-10 lg:py-14"
    >
      <div className="container mx-auto px-6 lg:px-16 max-w-4xl">
        <h2 className="text-center font-display text-2xl sm:text-3xl font-bold text-foreground mb-2 tracking-tight">
          Find guidance, fast
        </h2>
        <p className="text-center text-sm text-foreground/60 mb-6">
          Search across our clinically-reviewed library of arthritis topics.
        </p>

        <form onSubmit={handleSubmit} className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 pointer-events-none"
          />
          <label htmlFor="site-search" className="sr-only">
            Search guides
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'knee exercises', 'arthritis diet', 'flare up tips'…"
            className="w-full h-14 pl-14 pr-5 rounded-full bg-card border border-border text-foreground placeholder:text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
            autoComplete="off"
          />
        </form>

        {/* Filter chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`min-h-9 px-4 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                category === c
                  ? "bg-foreground text-background"
                  : "bg-card text-foreground/70 hover:text-foreground border border-border"
              }`}
              aria-pressed={category === c}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results */}
        {query.trim() && (
          <div className="mt-6 rounded-2xl border border-border bg-card overflow-hidden">
            {results.length === 0 ? (
              <p className="p-6 text-center text-sm text-foreground/60">
                No matches for "{query}". Try broader terms like "knee" or "diet".
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {results.map((r) => (
                  <li key={r.url}>
                    <Link
                      to={r.url}
                      className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-muted/40 transition-colors min-h-11"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-0.5">
                          {r.category}
                        </div>
                        <div className="text-sm font-semibold text-foreground truncate">{r.title}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-foreground/40 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
});

SearchBar.displayName = "SearchBar";
export default SearchBar;
