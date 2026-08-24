import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import { faqArticles } from '@/data/faqArticles';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';

/**
 * Data-driven FAQ article page. One component renders all 19 entries
 * from src/data/faqArticles.ts via /faq/:slug.
 */
export default function FaqArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = faqArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: article.question,
          acceptedAnswer: { '@type': 'Answer', text: article.quickAnswer },
        },
        ...article.sections.map((s) => ({
          '@type': 'Question',
          name: s.heading,
          acceptedAnswer: { '@type': 'Answer', text: s.content },
        })),
      ],
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Living With Arthritis', path: '/living-with-arthritis' },
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
    return <Navigate to="/living-with-arthritis" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <SeoHead
        title={article.question}
        description={article.quickAnswer.slice(0, 158)}
        path={`/faq/${article.slug}`}
        type="article"
        keywords={`${article.title}, arthritis, ${article.category}`}
      />

      <nav aria-label="Breadcrumb" className="text-sm mb-4">
        <Link to="/" className="text-primary hover:underline">Home</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/living-with-arthritis" className="text-primary hover:underline">
          Living With Arthritis
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{article.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.question}</h1>

      <div className="bg-accent/40 border-l-4 border-primary p-6 rounded-r-lg my-6 text-lg font-semibold">
        {article.quickAnswer}
      </div>

      <div className="space-y-8">
        {article.sections.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-2xl font-bold mt-8 mb-3">{section.heading}</h2>
            <p className="leading-relaxed whitespace-pre-wrap">{section.content}</p>
          </section>
        ))}
      </div>

      {article.relatedArticles.length > 0 && (
        <section className="bg-muted p-6 rounded-lg my-12">
          <h2 className="text-xl font-bold mb-4">Related questions</h2>
          <ul className="space-y-2">
            {article.relatedArticles.map((relSlug) => {
              const rel = faqArticles.find((a) => a.slug === relSlug);
              if (!rel) return null;
              return (
                <li key={relSlug}>
                  <Link to={`/faq/${rel.slug}`} className="text-primary hover:underline font-semibold">
                    → {rel.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
        <p className="mb-4 text-lg text-primary-foreground">Want the full picture? Read our complete</p>
        <Link to="/living-with-arthritis" className="underline text-xl font-bold">
          Living With Arthritis Guide →
        </Link>
      </section>
    </article>
  );
}
