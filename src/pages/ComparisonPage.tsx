import { Helmet } from "react-helmet-async";
import { Link, useLocation, Navigate } from "react-router-dom";
import { lazy, Suspense, useMemo } from "react";
import { ChevronLeft, Scale, ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import { COMPARISON_ROUTES } from "@/data/comparison-routes.generated";
import { getComparisonArticle, COMPARISON_META_DESCRIPTIONS } from "@/data/comparison-content";
import { enforceTitle, enforceDescription } from "@/lib/seoMeta";

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
    .map((w) => (w.length <= 3 && w !== "vs" ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ")
    .replace(/\bVs\b/g, "vs");

/** Split "a-vs-b-for-context" into { a, b, context }. */
function parseComparison(slug: string): { a: string; b: string; context?: string } | null {
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
 * Uses long-form COMPARISON_CONTENT when available, with a lightweight
 * fallback for slugs not yet fleshed out.
 */
export default function ComparisonPage() {
  const location = useLocation();
  const path = location.pathname;
  const slug = path.replace(/^\/guides\//, "");
  const parsed = useMemo(() => parseComparison(slug), [slug]);

  if (!COMPARISON_ROUTES.includes(path) || !parsed) {
    return <Navigate to="/guides" replace />;
  }

  const article = getComparisonArticle(path);
  const a = article?.optionA.name ?? prettify(parsed.a);
  const b = article?.optionB.name ?? prettify(parsed.b);
  const context = parsed.context ? prettify(parsed.context) : undefined;
  const title = article?.title ?? (context ? `${a} vs ${b} for ${context}` : `${a} vs ${b}`);
  const metaDescription =
    article?.metaDescription ??
    COMPARISON_META_DESCRIPTIONS[path] ??
    `${title}: an evidence-informed side-by-side comparison for UK arthritis patients, covering effectiveness, safety and cost.`;

  const others = COMPARISON_ROUTES.filter((r) => r !== path).slice(0, 6);

  const canonicalUrl = `https://livingwitharthritis.org.uk${path}`;
  const medicalWebPageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: title,
    headline: title,
    description: metaDescription,
    url: canonicalUrl,
    inLanguage: "en-GB",
    about: [
      { "@type": "MedicalTherapy", name: a },
      { "@type": "MedicalTherapy", name: b },
    ],
    audience: { "@type": "MedicalAudience", audienceType: "Patient", geographicArea: { "@type": "Country", name: "United Kingdom" } },
    publisher: { "@type": "MedicalOrganization", name: "Living With Arthritis UK" },
    dateModified: LAST_REVIEWED_ISO,
  };

  const fullTitle = enforceTitle(`${title} — Compared`, { route: path });
  const safeDesc = enforceDescription(metaDescription, path);
  const aeoQuestion = `How do ${a} and ${b} compare${context ? ` for ${context.toLowerCase()}` : ""}?`;
  const aeoAnswer = article?.intro ?? metaDescription;
  const aeoFaqs = article?.takeaways?.slice(0, 4).map((t, i) => ({
    q: `Key point ${i + 1}: ${a} vs ${b}`,
    a: t,
  }));

  return (
    <>
      <Helmet>
        <title>{fullTitle}</title>
        <meta name="description" content={safeDesc} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={safeDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(medicalWebPageLd)}</script>
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
          <AeoEnhancement
            route={path}
            question={aeoQuestion}
            answer={aeoAnswer}
            faqs={aeoFaqs}
            updatedAt={LAST_REVIEWED_ISO}
          />
          <p className="text-xs text-muted-foreground mb-4">
            Last reviewed{" "}
            <time dateTime={LAST_REVIEWED_ISO} className="font-medium text-foreground/80">
              {LAST_REVIEWED_LABEL}
            </time>
          </p>
          <p className="text-lg text-muted-foreground mb-10">
            {article?.intro ??
              `A plain-English comparison of ${a} and ${b}${context ? ` for ${context}` : ""}, written for UK arthritis patients. We cover what each option actually is, how effective it tends to be, common side-effects, NHS availability and typical cost.`}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {(article ? [article.optionA, article.optionB] : [
              { name: a } as const,
              { name: b } as const,
            ]).map((opt) => (
              <section
                key={opt.name}
                className="rounded-2xl border border-border bg-white shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold mb-3">{opt.name}</h2>
                {"howItWorks" in opt ? (
                  <ul className="text-sm space-y-2">
                    <li><strong>How it works:</strong> {opt.howItWorks}</li>
                    <li><strong>Best for:</strong> {opt.bestFor}</li>
                    <li><strong>Common side-effects:</strong> {opt.sideEffects}</li>
                    <li><strong>NHS availability:</strong> {opt.nhs}</li>
                    <li><strong>Typical UK cost:</strong> {opt.cost}</li>
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Detailed evidence for {opt.name} is being written by our clinical
                    team — see the summary sections below for now.
                  </p>
                )}
              </section>
            ))}
          </div>

          {article && (
            <>
              {article.sections.map((s) => (
                <section key={s.heading} className="mb-10">
                  <h2 className="text-2xl font-bold mb-3">{s.heading}</h2>
                  {s.paragraphs.map((p, i) => (
                    <p key={i} className="text-base leading-relaxed mb-3 text-foreground/90">
                      {p}
                    </p>
                  ))}
                </section>
              ))}

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">At a glance</h2>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/60">
                      <tr>
                        <th className="text-left p-3 font-bold"> </th>
                        <th className="text-left p-3 font-bold">{article.optionA.name}</th>
                        <th className="text-left p-3 font-bold">{article.optionB.name}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {article.table.map((row) => (
                        <tr key={row.label} className="border-t border-border">
                          <td className="p-3 font-semibold">{row.label}</td>
                          <td className="p-3">{row.a}</td>
                          <td className="p-3">{row.b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-12 rounded-2xl border border-border p-6 bg-primary/5">
                <h2 className="text-xl font-bold mb-4">Key takeaways</h2>
                <ul className="space-y-2">
                  {article.takeaways.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

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
