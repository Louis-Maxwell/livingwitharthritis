import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ChevronLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";
import { getGlossaryEntry, GLOSSARY_CONTENT } from "@/data/glossary-content";

const Footer = lazy(() => import("@/components/Footer"));

const LAST_REVIEWED_ISO = "2026-07-11";
const LAST_REVIEWED_LABEL = new Date(LAST_REVIEWED_ISO).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

/**
 * /glossary/:term — Individual glossary entry.
 *
 * Uses GLOSSARY_CONTENT for real, evidence-based definitions where available,
 * with a lightweight editorial fallback for terms not yet fleshed out.
 */
export default function GlossaryTerm() {
  const { term } = useParams<{ term: string }>();
  const slug = term ?? "";
  const href = `/glossary/${slug}`;
  if (!slug || !GLOSSARY_ROUTES.includes(href)) {
    return <Navigate to="/glossary" replace />;
  }

  const entry = getGlossaryEntry(slug);
  const label = entry?.label ?? prettify(slug);
  const description =
    entry?.short ??
    `${label}: a plain-English definition of this arthritis / rheumatology term for UK patients.`;

  const relatedSlugs =
    entry?.related?.filter((s) => GLOSSARY_CONTENT[s]) ??
    GLOSSARY_ROUTES.filter((r) => r !== "/glossary" && r !== href)
      .slice(0, 6)
      .map((r) => r.replace("/glossary/", ""));

  const related = relatedSlugs.map((s) => ({
    href: `/glossary/${s}`,
    label: GLOSSARY_CONTENT[s]?.label ?? prettify(s),
  }));

  return (
    <>
      <Helmet>
        <title>{label} — Arthritis Glossary | Living With Arthritis UK</title>
        <meta name="description" content={description} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          "@id": `https://livingwitharthritis.org.uk${href}#term`,
          "name": label,
          "description": entry?.short ?? description,
          "inDefinedTermSet": {
            "@type": "DefinedTermSet",
            "@id": "https://livingwitharthritis.org.uk/glossary#termset",
            "url": "https://livingwitharthritis.org.uk/glossary",
            "name": "Arthritis & Musculoskeletal Glossary",
          },
          "url": `https://livingwitharthritis.org.uk${href}`,
          "inLanguage": "en-GB",
        })}</script>
      </Helmet>

      <Header />
      <main id="main-content" role="main" tabIndex={-1} className="bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/glossary"
            className="inline-flex items-center gap-1 text-sm text-primary font-semibold mb-6 hover:underline"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> Back to glossary
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Glossary term
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{label}</h1>

          {entry ? (
            <>
              <p className="text-lg text-foreground/80 mb-6 font-medium">{entry.short}</p>
              <div className="prose prose-slate max-w-none mb-10">
                <p className="text-base leading-relaxed">{entry.body}</p>
              </div>
            </>
          ) : (
            <p className="text-lg text-muted-foreground mb-6">
              A plain-English definition for UK arthritis patients. This term is part
              of our growing glossary of rheumatology and musculoskeletal vocabulary.
              A fuller definition is being written by our clinical team.
            </p>
          )}

          <section className="rounded-2xl border border-border p-6 bg-secondary/40 mb-10">
            <h2 className="text-lg font-bold mb-2">Talk to your team</h2>
            <p className="text-sm text-muted-foreground">
              This page is general information, not medical advice. If you've seen{" "}
              <strong>{label}</strong> mentioned in an NHS letter or clinic and want it
              explained for your situation, ask your GP, rheumatology nurse or pharmacist.
            </p>
          </section>

          {related.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-4">Related terms</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((r) => (
                  <li key={r.href}>
                    <Link
                      to={r.href}
                      className="flex items-center gap-2 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                      <span className="text-sm font-semibold">{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      </main>
      <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
}
