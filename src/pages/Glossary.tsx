import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense, useMemo } from "react";
import { BookOpen, Search } from "lucide-react";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";
import { GLOSSARY_CONTENT } from "@/data/glossary-content";

const Footer = lazy(() => import("@/components/Footer"));

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

/**
 * /glossary — Arthritis & MSK terminology hub.
 *
 * Terms come from the auto-generated GLOSSARY_ROUTES dataset. Each slug maps
 * to /glossary/:term, rendered by GlossaryTerm.tsx.
 */
export default function Glossary() {
  const terms = useMemo(
    () =>
      GLOSSARY_ROUTES.filter((r) => r !== "/glossary").map((r) => {
        const slug = r.replace("/glossary/", "");
        return { slug, label: prettify(slug), href: r };
      }),
    [],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, typeof terms>();
    for (const t of terms) {
      const key = t.label[0]?.toUpperCase() || "#";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(t);
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [terms]);

  return (
    <>
      <Helmet>
        <title>Arthritis Glossary A–Z | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Plain-English definitions of arthritis, rheumatology and MSK terms — from DMARDs to synovium — reviewed for UK patients."
        />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/glossary" />
      </Helmet>

      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          badge="Glossary"
          title="Arthritis Glossary A–Z"
          subtitle={`Plain-English definitions of ${terms.length} arthritis and musculoskeletal terms — no jargon, no medical acronyms without a translation.`}
        />

        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>Tip: use your browser's find (Ctrl/⌘ + F) to jump to a term.</span>
            </div>

            {grouped.map(([letter, entries]) => (
              <section key={letter} className="mb-10">
                <h2 className="text-2xl font-bold border-b border-border pb-2 mb-4">
                  {letter}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {entries.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to={t.href}
                        className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <BookOpen className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                        <span className="text-sm font-semibold text-foreground">{t.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
      <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
}
