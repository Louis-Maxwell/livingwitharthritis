import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import { patientStories } from '@/data/monthlyContent';
import { injectJsonLd } from '@/lib/jsonLd';

/**
 * Monthly patient story template. Real lived-experience accounts.
 * Add entries to src/data/monthlyContent.ts (patientStories array).
 */
export default function PatientStory() {
  const { slug } = useParams<{ slug: string }>();
  const story = patientStories.find((s) => s.slug === slug);

  useEffect(() => {
    if (!story) return;
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: story.title,
      description: story.summary,
      datePublished: story.publishDate,
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
    };
    return injectJsonLd(`patient-${story.slug}`, payload);
  }, [story]);

  if (!story) return <Navigate to="/" replace />;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <SeoHead
        title={story.title}
        description={story.summary}
        path={`/stories/${story.slug}`}
        type="article"
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
      <p className="text-muted-foreground mb-8">
        {story.patientName}'s story · {story.condition} · {story.month}
      </p>

      <blockquote className="border-l-4 border-primary pl-6 my-8 text-xl italic">
        "{story.quote}"
      </blockquote>

      <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed">
        {story.content}
      </div>

      <aside className="bg-muted p-6 rounded-lg mt-12 border-l-4 border-primary">
        <p className="font-bold mb-2">Share your story</p>
        <p className="text-sm mb-4">
          Have arthritis? We'd love to hear your story. Real patient experiences help
          others feel less alone.
        </p>
        <Link to="/contact" className="text-primary hover:underline font-semibold">
          Submit your story →
        </Link>
      </aside>
    </article>
  );
}
