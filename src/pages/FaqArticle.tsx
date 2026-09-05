import { lazy, Suspense, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import SeoHead from "@/components/SeoHead";
import Header from "@/components/Header";
import { faqArticles } from "@/data/faqArticles";
import { injectJsonLd, buildBreadcrumb } from "@/lib/jsonLd";

const Footer = lazy(() => import("@/components/Footer"));

/**
 * Data-driven FAQ article page. Renders every entry in
 * src/data/faqArticles.ts at /faq/:slug.
 */
export default function FaqArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = faqArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    const pageUrl = `https://livingwitharthritis.org.uk/faq/${article.slug}`;
    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: "en-GB",
      mainEntity: [
        {
          "@type": "Question",
          name: article.question,
          acceptedAnswer: { "@type": "Answer", text: article.quickAnswer },
        },
        ...article.sections.map((s) => ({
          "@type": "Question",
          name: s.heading,
          acceptedAnswer: { "@type": "Answer", text: s.content },
        })),
      ],
    };
    const breadcrumb = buildBreadcrumb([
      { name: "Home", path: "/" },
      { name: "FAQs", path: "/faq" },
      { name: article.title, path: `/faq/${article.slug}` },
    ]);
    const cleanup1 = injectJsonLd(`faq-jsonld-${article.slug}`, faq);
    const cleanup2 = injectJsonLd(`faq-breadcrumb-${article.slug}`, breadcrumb);
    return () => {
      cleanup1();
      cleanup2();
    };
  }, [article]);

  if (!article) {
    return <Navigate to="/faq" replace />;
  }

  return (
    <>
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <SeoHead
            title={article.question}
            description={article.quickAnswer.slice(0, 158)}
            path={`/faq/${article.slug}`}
            type="article"
            keywords={`${article.title}, arthritis, ${article.category}`}
          />

          <nav aria-label="Breadcrumb" className="mb-4 text-sm">
            <Link to="/" className="text-primary hover:underline">
              Home
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/faq" className="text-primary hover:underline">
              FAQs
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-muted-foreground">{article.title}</span>
          </nav>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {article.category}
          </p>
          <h1 className="mb-6 font-display text-3xl font-bold md:text-4xl">{article.question}</h1>

          <div className="my-6 rounded-r-lg border-l-4 border-primary bg-accent/40 p-6 text-lg font-semibold">
            {article.quickAnswer}
          </div>

          <div className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-3 mt-8 text-2xl font-bold">{section.heading}</h2>
                <p className="leading-relaxed whitespace-pre-wrap">{section.content}</p>
              </section>
            ))}
          </div>

          {article.relatedArticles.length > 0 && (
            <section className="my-12 rounded-lg bg-muted p-6">
              <h2 className="mb-4 text-xl font-bold">Related questions</h2>
              <ul className="space-y-2">
                {article.relatedArticles.map((relSlug) => {
                  const rel = faqArticles.find((a) => a.slug === relSlug);
                  if (!rel) return null;
                  return (
                    <li key={relSlug}>
                      <Link
                        to={`/faq/${rel.slug}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        → {rel.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className="rounded-lg bg-primary p-8 text-center text-primary-foreground">
            <p className="mb-4 text-lg">Want the full picture?</p>
            <Link to="/living-with-arthritis" className="text-xl font-bold underline">
              Living With Arthritis Guide →
            </Link>
            <p className="mt-4">
              <Link to="/donate" className="underline">
                Donate to keep these answers free
              </Link>
            </p>
          </section>
        </article>
      </main>
      <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
}
