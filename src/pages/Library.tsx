import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, ArrowRight } from "lucide-react";
import {
  healthTopics,
  healthTopicCategories,
  type HealthTopicCategory,
} from "@/data/healthTopics";

const Library = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState<HealthTopicCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return healthTopics
      .filter((t) =>
        activeCategory === "All" ? true : t.category === activeCategory,
      )
      .filter((t) => {
        if (!q) return true;
        if (t.title.toLowerCase().includes(q)) return true;
        if (t.subtitle.toLowerCase().includes(q)) return true;
        if (t.keywords.some((k) => k.includes(q))) return true;
        return t.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.body.toLowerCase().includes(q),
        );
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [query, activeCategory]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: healthTopics.length };
    for (const c of healthTopicCategories) {
      map[c] = healthTopics.filter((t) => t.category === c).length;
    }
    return map;
  }, []);

  return (
    <>
      <Helmet>
        <title>Health Library | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Plain-English library of conditions, medications, supplements and treatments related to arthritis and joint health. Search 65+ clinician-reviewed topics."
        />
        <link
          rel="canonical"
          href="https://livingwitharthritis.org.uk/library"
        />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background text-foreground">
        <PageHero
          eyebrow="Knowledge Base"
          title="Health Library"
          subtitle="Plain-English explanations of conditions, medications, supplements and treatments. Search a term — find what you need."
          icon={BookOpen}
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl py-12">
          <div className="relative mb-6">
            <Search
              className="absolute start-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the library — e.g. naproxen, turmeric, plantar fasciitis"
              className="h-14 ps-12 text-base"
              aria-label="Search the health library"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {(["All", ...healthTopicCategories] as const).map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                  <span className="ms-2 opacity-70">{counts[cat] ?? 0}</span>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <p className="text-muted-foreground py-12 text-center">
              No topics match "{query}". Try a different word.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((topic) => (
                <Link
                  key={topic.slug}
                  to={`/library/${topic.slug}`}
                  className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                >
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-border/70 hover:border-primary/40">
                    <CardContent className="p-6 flex flex-col h-full">
                      <Badge
                        variant="secondary"
                        className="self-start mb-3 text-xs"
                      >
                        {topic.category}
                      </Badge>
                      <h2 className="font-serif text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {topic.title}
                      </h2>
                      {topic.subtitle && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {topic.subtitle}
                        </p>
                      )}
                      <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read topic
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Library;
