import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { faqArticles } from '@/data/faqArticles';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import EducationalDisclaimerBox from '@/components/seo/EducationalDisclaimerBox';
import TopicClusterNav from '@/components/seo/TopicClusterNav';
import { getClusterForPath } from '@/data/topicClusters';

const FAQ_CONDITION_LINKS: Record<string, { label: string; href: string }[]> = {
  'what-is-osteoarthritis': [
    { label: 'Osteoarthritis guide', href: '/conditions/osteoarthritis' },
    { label: 'Osteoarthritis library note', href: '/library/osteoarthritis' },
    { label: 'Swimming exercises for hip osteoarthritis', href: '/blog/swimming-exercises-hip-osteoarthritis' },
    { label: 'Hip exercises for osteoarthritis', href: '/guides/hip-exercises-for-osteoarthritis' },
  ],
  'best-exercises-arthritis': [
    { label: 'Exercise hub', href: '/exercises' },
    { label: 'Swimming exercises for hip osteoarthritis', href: '/blog/swimming-exercises-hip-osteoarthritis' },
    { label: 'Hip exercises for osteoarthritis', href: '/guides/hip-exercises-for-osteoarthritis' },
  ],
  'arthritis-disability-benefits-uk': [
    { label: 'Benefits & PIP hub', href: '/benefits-pip' },
    { label: 'PIP for arthritis in the UK (blog)', href: '/blog/pip-for-arthritis-uk' },
    { label: 'Disability support guide', href: '/guides/disability-support' },
    { label: 'Access to Work', href: '/library/access-to-work' },
    { label: 'Waiting-list help', href: '/arthritis-waiting-list-help' },
    { label: 'Printable PIP evidence diary', href: '/resources/pip-evidence-diary' },
    { label: 'Pain-relief guide', href: '/guides/arthritis-pain-relief' },
    { label: 'Newly diagnosed', href: '/guides/newly-diagnosed' },
  ],
  'what-is-rheumatoid-arthritis': [
    { label: 'Rheumatoid arthritis guide', href: '/conditions/rheumatoid-arthritis' },
  ],
  'osteoarthritis-vs-rheumatoid-arthritis': [
    { label: 'Osteoarthritis guide', href: '/conditions/osteoarthritis' },
    { label: 'Rheumatoid arthritis guide', href: '/conditions/rheumatoid-arthritis' },
  ],
  'arthritis-and-cold-weather': [
    { label: 'Flare-up guide', href: '/arthritis-flare-ups' },
    { label: 'Gout symptoms', href: '/conditions/gout/symptoms' },
    { label: 'Fibromyalgia library guide', href: '/library/fibromyalgia' },
  ],
  'weight-management-osteoarthritis': [
    { label: 'Osteoarthritis guide', href: '/conditions/osteoarthritis' },
    { label: 'Diet hub', href: '/diet' },
  ],
};

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
      { name: 'FAQ', path: '/faq' },
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

  const extraLinks = FAQ_CONDITION_LINKS[article.slug] ?? [];

  return (
    <>
    <Header />
    <article className="max-w-3xl mx-auto py-12 px-4">
      <SeoHead
        title={article.seoTitle ?? article.question}
        description={(article.metaDescription ?? article.quickAnswer).slice(0, 160)}
        path={`/faq/${article.slug}`}
        type="article"
        keywords={`${article.title}, arthritis, ${article.category}`}
      />

      <nav aria-label="Breadcrumb" className="text-sm mb-4">
        <Link to="/" className="text-primary hover:underline">Home</Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link to="/faq" className="text-primary hover:underline">
          FAQ
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


      <EducationalDisclaimerBox lastReviewed={article.lastReviewed ?? "2026-09-16"} />
      {getClusterForPath(`/faq/${article.slug}`) && (
        <TopicClusterNav path={`/faq/${article.slug}`} />
      )}

      {article.citations && article.citations.length > 0 && (
        <section className="my-10" aria-labelledby="faq-citations-heading">
          <h2 id="faq-citations-heading" className="text-xl font-bold mb-3">
            Trusted sources
          </h2>
          <p className="text-sm text-muted-foreground mb-3">
            Confirm current rules and rates on official sites — this FAQ is educational orientation, not legal advice.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            {article.citations.map((c) => (
              <li key={c.url}>
                <a
                  href={c.url}
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.label}
                </a>
                {c.publisher ? (
                  <span className="text-muted-foreground"> — {c.publisher}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(article.relatedArticles.length > 0 || extraLinks.length > 0) && (
        <section className="bg-muted p-6 rounded-lg my-12">
          <h2 className="text-xl font-bold mb-4">Related questions and guides</h2>
          <ul className="space-y-2">
            {extraLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-primary hover:underline font-semibold">
                  → {link.label}
                </Link>
              </li>
            ))}
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
    <Footer />
    </>
  );
}
