import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import { expertArticles } from '@/data/monthlyContent';
import { injectJsonLd } from '@/lib/jsonLd';

/**
 * Monthly expert article template. One entry per month authored by
 * Maxwell (HCPC PH128483). Add entries to src/data/monthlyContent.ts.
 */
export default function ExpertArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = expertArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      author: {
        '@type': 'Person',
        name: article.author,
        jobTitle: article.authorTitle,
        identifier: article.authorCredential,
      },
      datePublished: article.publishDate,
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
    };
    return injectJsonLd(`expert-${article.slug}`, payload);
  }, [article]);

  if (!article) return <Navigate to="/" replace />;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <SeoHead
        title={article.title}
        description={article.summary}
        path={`/expert/${article.slug}`}
        type="article"
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">{article.title}</h1>
      <p className="text-muted-foreground mb-8">
        By {article.author} · {article.month}
      </p>

      <MedicalReviewBadge
        reviewer={article.author}
        title={article.authorTitle}
        credential={article.authorCredential}
        date={article.publishDate}
      />

      <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed">
        {article.content}
      </div>

      <aside className="bg-muted p-6 rounded-lg mt-12">
        <p className="font-bold mb-2">About the author</p>
        <p className="text-sm">
          {article.author} is listed as a {article.authorTitle} (
          {article.authorCredential}).
        </p>
      </aside>
    </article>
  );
}
