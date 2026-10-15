import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Pill, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SeoHead from '@/components/SeoHead';
import PageBreadcrumb from '@/components/ui/PageBreadcrumb';
import FaqAccordion from '@/components/faq/FaqAccordion';
import EducationalDisclaimerBox from '@/components/seo/EducationalDisclaimerBox';
import { sanitizeHtml } from '@/utils/sanitizeHtml';
import {
  COLLAGEN_DESCRIPTION,
  COLLAGEN_FAQS,
  COLLAGEN_HTML,
  COLLAGEN_META_TITLE,
  COLLAGEN_QUICK_ANSWER,
  COLLAGEN_TITLE,
} from '@/data/dietGuides/collagenContent';

/**
 * /supplements/collagen (Diet & Nutrition batch 4, topic 63). Content lives in
 * src/data/dietGuides/collagenContent.ts. Checked against Arthritis UK, NICE
 * NG226/NG100, NHS medicines pages and PubMed-indexed reviews on 10 October
 * 2026. Pending clinical and editorial review, so no reviewer is claimed.
 */

const BASE = 'https://livingwitharthritis.org.uk';
const PATH = '/supplements/collagen';
const MODIFIED = '2026-10-10';

const PROSE =
  'prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-table:text-sm';

export default function Collagen() {
  useEffect(() => {
    const medical = {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: COLLAGEN_TITLE,
      description: COLLAGEN_DESCRIPTION,
      url: `${BASE}${PATH}`,
      inLanguage: 'en-GB',
      datePublished: '2026-07-31',
      dateModified: MODIFIED,
      about: {
        '@type': 'Substance',
        name: 'Collagen',
        alternateName: ['Collagen peptides', 'Hydrolysed collagen', 'Undenatured type II collagen', 'UC-II'],
      },
      audience: {
        '@type': 'MedicalAudience',
        audienceType: 'Patient',
        geographicArea: { '@type': 'Country', name: 'United Kingdom' },
      },
      publisher: {
        '@type': 'Organization',
        name: 'Living With Arthritis',
        url: BASE,
        logo: { '@type': 'ImageObject', url: `${BASE}/og/landing-share.png` },
      },
    };
    // FAQPage is emitted by <FaqAccordion>; BreadcrumbList by <PageBreadcrumb>.
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify(medical);
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={COLLAGEN_META_TITLE}
        description={COLLAGEN_DESCRIPTION}
        path={PATH}
        type="article"
        keywords="collagen for arthritis, collagen for joints, collagen peptides, hydrolysed collagen, undenatured type II collagen, UC-II, collagen osteoarthritis evidence, collagen side effects, collagen UK"
      />
      <Header />
      <PageBreadcrumb
        segments={[
          { label: 'Supplements', href: '/supplements' },
          { label: 'Collagen' },
        ]}
      />

      <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
          <Link
            to="/supplements"
            className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to supplements
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
            <Pill className="w-3 h-3" /> Supplement Guide
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
            {COLLAGEN_TITLE}
          </h1>
          <p className="speakable-intro text-lg text-muted-foreground leading-relaxed">
            <strong>Quick answer:</strong> {COLLAGEN_QUICK_ANSWER}
          </p>
        </div>
      </div>

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
        <EducationalDisclaimerBox lastReviewed="2026-09-16" reviewStatus="pending" />
        <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(COLLAGEN_HTML) }} />

        <section className="my-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Frequently asked questions
            </h2>
          </div>
          <FaqAccordion idPrefix="supplements-collagen-faq" items={COLLAGEN_FAQS} />
        </section>

        <div className="p-8 rounded-2xl bg-accent border border-border/30">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">Related guides</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { to: '/supplements/collagen-alternatives', label: 'Collagen alternatives' },
              { to: '/supplements/glucosamine', label: 'Glucosamine' },
              { to: '/blog/arthritis-and-omega-3-fish-oil', label: 'Omega-3 evidence review' },
              { to: '/diet/mediterranean-diet-for-arthritis', label: 'Mediterranean diet' },
              { to: '/exercises', label: 'Exercise hub' },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
