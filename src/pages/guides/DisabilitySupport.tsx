import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeoHead from '@/components/SeoHead';
import { injectJsonLd, buildBreadcrumb } from '@/lib/jsonLd';
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_DISABILITY_PIP } from "@/data/clinical/ukCitations";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  DIS_RIGHTS_DESCRIPTION,
  DIS_RIGHTS_FAQS,
  DIS_RIGHTS_HTML,
  DIS_RIGHTS_META_TITLE,
  DIS_RIGHTS_QUICK_ANSWER,
  DIS_RIGHTS_TITLE,
} from "@/data/benefitsGuides/disabilityRightsContent";

/**
 * /guides/disability-support — "Your disability rights in the UK: the
 * Equality Act 2010" (Benefits & UK Support batch 3, topic 53). Content lives
 * in src/data/benefitsGuides/disabilityRightsContent.ts. Facts checked on
 * GOV.UK / legislation.gov.uk on 10 October 2026; pending clinical and
 * editorial review, so no reviewer is claimed in schema or on the page.
 */
export default function DisabilitySupport() {
  useEffect(() => {
    const article = {
      '@context': 'https://schema.org', '@type': 'MedicalWebPage',
      headline: DIS_RIGHTS_TITLE,
      description: DIS_RIGHTS_DESCRIPTION,
      inLanguage: 'en-GB',
      author: { '@type': 'Organization', name: 'Living With Arthritis Editorial Team' },
      publisher: { '@type': 'MedicalOrganization', name: 'Living With Arthritis' },
      datePublished: '2026-06-22', dateModified: '2026-10-10',
      mainEntityOfPage: 'https://livingwitharthritis.org.uk/guides/disability-support',
    };
    const faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: DIS_RIGHTS_FAQS.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    };
    const breadcrumb = buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guides' },
      { name: 'Your disability rights', path: '/guides/disability-support' },
    ]);
    const c1 = injectJsonLd('disability-article', article);
    const c2 = injectJsonLd('disability-faq', faq);
    const c3 = injectJsonLd('disability-breadcrumb', breadcrumb);
    return () => { c1(); c2(); c3(); };
  }, []);

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <SeoHead
        title={DIS_RIGHTS_META_TITLE}
        description={DIS_RIGHTS_DESCRIPTION}
        path="/guides/disability-support"
        type="article"
        keywords="disability rights uk, equality act 2010 arthritis, is arthritis a disability, reasonable adjustments, disability discrimination, disability discrimination act northern ireland"
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/guides" className="hover:text-primary">Guides</Link> / <span>Your disability rights</span>
      </nav>

      <h1 className="text-4xl md:text-5xl font-bold mb-6">{DIS_RIGHTS_TITLE}</h1>
      <p className="speakable-intro text-lg text-muted-foreground mb-6 leading-relaxed">
        <strong>Quick answer:</strong> {DIS_RIGHTS_QUICK_ANSWER}
      </p>
      <AeoEnhancement route="/guides/disability-support" />
      <EducationalDisclaimerBox lastReviewed="2026-09-16" reviewStatus="pending" />

      <div
        className="prose prose-neutral dark:prose-invert max-w-none prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(DIS_RIGHTS_HTML) }}
      />

      <section id="faq" className="my-12">
        <h2 className="text-2xl font-bold mb-6">Frequently asked questions</h2>
        {DIS_RIGHTS_FAQS.map((f) => (
          <div key={f.question} className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
            <p className="leading-relaxed text-foreground/85">{f.answer}</p>
          </div>
        ))}
      </section>

      <section id="related" className="mb-12 bg-muted p-6 rounded-lg border-l-4 border-primary">
        <h2 className="text-2xl font-bold mb-4">Related guides</h2>
        <ul className="space-y-2">
          <li><Link to="/guides/work-with-arthritis" className="text-primary underline">Working with arthritis toolkit</Link></li>
          <li><Link to="/guides/benefits-pip" className="text-primary underline">Complete PIP guide</Link></li>
          <li><Link to="/benefits-pip" className="text-primary underline">Benefits and financial help directory</Link></li>
          <li><Link to="/library/access-to-work" className="text-primary underline">Access to Work</Link></li>
          <li><Link to="/living-with-arthritis" className="text-primary underline">Living with arthritis</Link></li>
          <li><Link to="/guides/fall-prevention-older-adults" className="text-primary underline">Fall prevention for older adults</Link></li>
        </ul>
      </section>

      <ArticleCitations citations={CITATIONS_DISABILITY_PIP} />
      <TopicClusterNav path="/guides/disability-support" />
    </article>
  );
}
