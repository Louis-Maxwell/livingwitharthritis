import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import MedicalReviewBadge from '@/components/MedicalReviewBadge';
import { injectJsonLd, buildBreadcrumb, buildFAQPage } from '@/lib/jsonLd';
import { pillarScaffolds, tier2OutlinesByPillar } from '@/data/tier2Outlines';

/**
 * Pillar page — "Arthritis & Mental Health" complete guide. Scaffold (sections,
 * intro copy, internal-link rail, FAQ schema) ready for Maxwell to expand to
 * ~1,200 words of full clinical content. Article + Breadcrumb + FAQPage JSON-LD
 * injected via useEffect (per project memory).
 */
export default function ArthritisMentalHealth() {
  const pillar = pillarScaffolds.find((p) => p.id === 'mental-health')!;
  const clusters = tier2OutlinesByPillar('mental-health');

  const faqs = [
    {
      question: 'Why does arthritis affect mental health?',
      answer:
        'Persistent pain, fatigue, sleep loss and the grief of changed routines all raise the risk of depression and anxiety. Inflammation itself can also influence mood. Up to one in three people with inflammatory arthritis experience depression at some point.',
    },
    {
      question: 'Is it normal to feel depressed with arthritis?',
      answer:
        'Low mood is common, but persistent depression is treatable — not something you have to live with. If you have had low mood, loss of pleasure or hopelessness most days for two weeks or more, speak to your GP or self-refer to NHS Talking Therapies.',
    },
    {
      question: 'Can mindfulness really help joint pain?',
      answer:
        'Yes. Mindfulness-based programmes are shown in trials to reduce pain interference, anxiety and disability in chronic pain conditions, including arthritis. It does not switch pain off, but it changes your relationship with it.',
    },
    {
      question: 'When should I seek urgent help?',
      answer:
        'If you have thoughts of harming yourself or ending your life, contact 999, Samaritans on 116 123, or NHS 111. You are not alone, and help is available 24/7.',
    },
  ];

  useEffect(() => {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: pillar.title,
      description: pillar.metaDescription,
      author: {
        '@type': 'Person',
        name: 'Maxwell',
        jobTitle: 'First Contact Practitioner',
        identifier: 'HCPC PH128483',
      },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis UK' },
      datePublished: '2026-06-19',
      dateModified: new Date().toISOString().slice(0, 10),
      mainEntityOfPage: `https://livingwitharthritis.org.uk${pillar.route}`,
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Arthritis & Mental Health', path: pillar.route },
    ]);
    const faqLd = buildFAQPage(faqs);
    const c1 = injectJsonLd('mental-health-article', article);
    const c2 = injectJsonLd('mental-health-breadcrumb', breadcrumb);
    const c3 = injectJsonLd('mental-health-faq', faqLd);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title="Arthritis & Mental Health Guide"
        description={pillar.metaDescription}
        path={pillar.route}
        type="article"
        keywords={pillar.targetKeywords.join(', ')}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Arthritis &amp; Mental Health
      </h1>

      <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
        Living with arthritis is not just a physical experience. Persistent pain,
        fatigue and uncertainty take a real toll on mood, sleep and identity. This
        evidence-based guide covers what to look out for, what helps, and where to
        get support — for you and the people around you.
      </p>

      <MedicalReviewBadge />

      <nav aria-label="Table of contents" className="bg-muted p-6 rounded-lg mb-10 border-l-4 border-primary">
        <h2 className="font-bold text-lg mb-4">In this guide</h2>
        <ul className="space-y-2 md:columns-2">
          {pillar.sections.map((s) => (
            <li key={s}>
              <a href={`#${s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="text-primary hover:underline">
                {s}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {pillar.sections.map((s) => {
        const id = s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <section key={id} id={id} className="mb-12 prose prose-lg max-w-none">
            <h2>{s}</h2>
            <p className="text-muted-foreground italic">
              Maxwell will expand this section with full clinical detail in line with the
              pillar word-count target ({pillar.wordCountTarget} words total). Outline points
              live in <code>src/data/tier2Outlines.ts</code>.
            </p>
          </section>
        );
      })}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">In-depth articles</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {clusters.map((c) => (
            <li key={c.slug} className="rounded-lg border p-4 hover:bg-accent/40 transition-colors">
              <Link to={`/blog/${c.slug}`} className="font-semibold text-primary hover:underline">
                {c.title}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                {c.targetKeywords.slice(0, 2).join(' · ')}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section id="faqs" className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details key={f.question} className="rounded-lg border p-5 open:bg-accent/40">
              <summary className="font-semibold cursor-pointer">{f.question}</summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <aside className="bg-accent rounded-lg p-6 border-l-4 border-primary">
        <h2 className="font-bold text-lg mb-2">Need to talk to someone now?</h2>
        <p className="text-muted-foreground mb-3">
          Samaritans are available 24/7 on <a href="tel:116123" className="text-primary underline">116 123</a>,
          or text SHOUT to 85258. In an emergency, call 999.
        </p>
        <Link to="/chat" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
          Start a chat
        </Link>
      </aside>
    </article>
  );
}
