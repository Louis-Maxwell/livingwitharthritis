import { Helmet } from "react-helmet-async";
import { Link, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useMemo } from "react";
import { ChevronLeft, Scale, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import { COMPARISON_ROUTES } from "@/data/comparison-routes.generated";

const Footer = lazy(() => import("@/components/Footer"));

const prettify = (slug: string) =>
  slug
    .split("-")
    .map((w) => (w.length <= 3 && w !== "vs" ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/\bVs\b/g, "vs");

/** Split "a-vs-b-for-context" into { a, b, context }. */
function parseComparison(slug: string): { a: string; b: string; context?: string } | null {
  // Handle "-vs-" separator, with optional "-for-<context>" or "-<context>" tail.
  const m = slug.match(/^(.+?)-vs-(.+)$/);
  if (!m) return null;
  const a = m[1];
  const rest = m[2];
  const forMatch = rest.match(/^(.+?)-for-(.+)$/);
  if (forMatch) return { a, b: forMatch[1], context: forMatch[2] };
  return { a, b: rest };
}

/**
 * Renders any of the auto-generated `/guides/*-vs-*` comparison routes.
 * The route slug fully drives the page — no per-slug component needed. Long-
 * form content can later be layered in via a `comparison-content.generated.ts`
 * dataset without changing this route shape.
 */
export default function ComparisonPage() {
  const location = useLocation();
  const path = location.pathname;
  const slug = path.replace(/^\/guides\//, "");
  const parsed = useMemo(() => parseComparison(slug), [slug]);

  if (!COMPARISON_ROUTES.includes(path) || !parsed) {
    return <Navigate to="/guides" replace />;
  }

  const a = prettify(parsed.a);
  const b = prettify(parsed.b);
  const context = parsed.context ? prettify(parsed.context) : undefined;
  const title = context ? `${a} vs ${b} for ${context}` : `${a} vs ${b}`;

  const others = COMPARISON_ROUTES.filter((r) => r !== path).slice(0, 6);

  return (
    <>
      <Helmet>
        <title>{title} — Compared | Living With Arthritis UK</title>
        <meta
          name="description"
          content={`${title}: an evidence-informed side-by-side comparison for UK arthritis patients, covering effectiveness, safety and cost.`}
        />
        <link rel="canonical" href={`https://livingwitharthritis.org.uk${path}`} />
      </Helmet>

      <Header />
      <main id="main-content" role="main" tabIndex={-1} className="bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/guides"
            className="inline-flex items-center gap-1 text-sm text-primary font-semibold mb-6 hover:underline"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" /> All guides
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-primary" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground">
              Compared, side-by-side
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground mb-10">
            A plain-English comparison of <strong>{a}</strong> and <strong>{b}</strong>
            {context ? ` for ${context}` : ""}, written for UK arthritis patients. We
            cover what each option actually is, how effective it tends to be, common
            side-effects, NHS availability and typical cost.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[{ name: a }, { name: b }].map(({ name }) => (
              <section
                key={name}
                className="rounded-2xl border border-border bg-white shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold mb-3">{name}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  A quick summary of what {name} is and when clinicians typically
                  recommend it for arthritis or musculoskeletal pain.
                </p>
                <ul className="text-sm space-y-2">
                  <li><strong>How it works:</strong> — to be added</li>
                  <li><strong>Best for:</strong> — to be added</li>
                  <li><strong>Common side-effects:</strong> — to be added</li>
                  <li><strong>NHS availability:</strong> — to be added</li>
                  <li><strong>Typical UK cost:</strong> — to be added</li>
                </ul>
              </section>
            ))}
          </div>

          <section className="rounded-2xl border border-border p-6 bg-secondary/40 mb-12">
            <h2 className="text-lg font-bold mb-2">Talk to your clinician</h2>
            <p className="text-sm text-muted-foreground">
              This is general information, not medical advice. Discuss {a} and {b} with
              your GP, rheumatology team or pharmacist before starting, stopping or
              switching treatment.
            </p>
          </section>

          <h2 className="text-xl font-bold mb-4">Other comparisons</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {others.map((r) => {
              const p = parseComparison(r.replace(/^\/guides\//, ""));
              const label = p
                ? p.context
                  ? `${prettify(p.a)} vs ${prettify(p.b)} for ${prettify(p.context)}`
                  : `${prettify(p.a)} vs ${prettify(p.b)}`
                : r;
              return (
                <li key={r}>
                  <Link
                    to={r}
                    className="flex items-center justify-between gap-2 p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="text-sm font-semibold">{label}</span>
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      </main>
      <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
}
