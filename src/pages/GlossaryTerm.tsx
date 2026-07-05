import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ChevronLeft, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";

const Footer = lazy(() => import("@/components/Footer"));

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length <= 3 ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ");

/**
 * /glossary/:term — Individual glossary entry.
 *
 * Content is intentionally lightweight: the hub + entries are generated
 * from GLOSSARY_ROUTES so SEO / internal-linking / crawlability work today.
 * Long-form definitions can be layered on later (e.g. via a CMS or a
 * dedicated `glossary-content.generated.ts` dataset) without changing the
 * route shape.
 */
export default function GlossaryTerm() {
  const { term } = useParams<{ term: string }>();
  const slug = term ?? "";
  const href = `/glossary/${slug}`;
  if (!slug || !GLOSSARY_ROUTES.includes(href)) {
    return <Navigate to="/glossary" replace />;
  }

  const label = prettify(slug);
  const related = GLOSSARY_ROUTES.filter(
    (r) => r !== "/glossary" && r !== href,
  )
    .slice(0, 8)
    .map((r) => ({ href: r, label: prettify(r.replace("/glossary/", "")) }));

  return (
    <>
      <Helmet>
        <title>{label} — Arthritis Glossary | Living With Arthritis UK</title>
        <meta
          name="description"
          content={`${label}: a plain-English definition of this arthritis / rheumatology term for UK patients.`}
        />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk${href}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          "name": label,
          "inDefinedTermSet": "https://livingwitharthritis.org.uk/glossary",
          "url": `https://livingwitharthritis.org.uk${href}`,
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
          <p className="text-lg text-muted-foreground mb-6">
            A plain-English definition for UK arthritis patients. This term is part of our
            growing glossary of rheumatology and musculoskeletal vocabulary — reviewed by
            our clinical team so you can understand your appointments, test results and
            treatment options in everyday language.
          </p>

          <section className="rounded-2xl border border-border p-6 bg-secondary/40 mb-10">
            <h2 className="text-lg font-bold mb-2">Why this term matters</h2>
            <p className="text-sm text-muted-foreground">
              You may see <strong>{label}</strong> mentioned in NHS letters, discharge
              summaries or patient information leaflets. If your clinician uses it and
              you'd like a fuller written explanation added here, email{" "}
              <a href="mailto:info@livingwitharthritis.org.uk" className="text-primary hover:underline">
                info@livingwitharthritis.org.uk
              </a>{" "}
              and we'll expand this entry.
            </p>
          </section>

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
        </article>
      </main>
      <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
}
