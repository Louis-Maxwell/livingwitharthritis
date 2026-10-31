import { Helmet } from "react-helmet-async";
import { lazyWithRetry } from "@/lib/chunkRecovery";
import PageSchema from "@/components/seo/PageSchema";
import Header from "@/components/Header";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/ui/PageHero";
import TableOfContents, { addHeadingIds } from "@/components/TableOfContents";
import GuideOnwardJourney from "@/components/guides/GuideOnwardJourney";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import FaqAccordion from "@/components/faq/FaqAccordion";

import { sanitizeHtml } from "@/utils/sanitizeHtml";
import { FIN_DIR_FAQS, FIN_DIR_HTML } from "@/data/benefitsGuides/financialHelpDirectoryContent";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_DISABILITY_PIP } from "@/data/clinical/ukCitations";
import {
  PIP_GUIDE_DESCRIPTION,
  PIP_GUIDE_FAQS,
  PIP_GUIDE_HTML,
  PIP_GUIDE_META_TITLE,
  PIP_GUIDE_QUICK_ANSWER,
  PIP_GUIDE_TITLE,
} from "@/data/benefitsGuides/pipGuideContent";

const Footer = lazyWithRetry(() => import("@/components/Footer"));

// /benefits-pip (financial help directory) was merged here on 2026-10-31.
// Its heading ids are prefixed "dir-" so they cannot collide with the PIP
// guide's own ids (both have "sources" and "medical-help").
const DIRECTORY_HTML = FIN_DIR_HTML.replace(/id="([^"]+)"/g, 'id="dir-$1"').replace(/href="#([^"]+)"/g, 'href="#dir-$1"');

const RELATED_GUIDES_HTML = `<h2 id="benefits-and-work-guides">More benefits and work guides</h2>
<ul>
<li><a href="/faq/arthritis-disability-benefits-uk">FAQ: arthritis disability benefits UK</a>: Short answers on PIP, DLA and when arthritis may count as a disability.</li>
<li><a href="/blog/pip-for-arthritis-uk">PIP for arthritis in the UK</a>: How PIP is assessed for arthritis, evidence to keep, and where to get help.</li>
<li><a href="/resources/pip-evidence-diary">Printable PIP evidence diary</a>: A one-week activity diary to support a PIP discussion with an adviser.</li>
<li><a href="/guides/disability-support">Disability support</a>: Aids, adaptations and rights when arthritis limits day-to-day life.</li>
<li><a href="/arthritis-waiting-list-help">Waiting-list help</a>: What to do while waiting for rheumatology, physio or surgery.</li>
<li><a href="/library/access-to-work">Access to Work</a>: UK government grants for workplace equipment, travel and support when arthritis affects your job.</li>
<li><a href="/blog/access-to-work-scheme-arthritis-guide">Access to Work scheme guide</a>: How the scheme can help people with arthritis stay in or return to work.</li>
<li><a href="/blog/sick-pay-fit-notes-time-off-work-arthritis">Sick pay, fit notes and time off</a>: Statutory sick pay, fit notes and talking to your employer about time off.</li>
<li><a href="/blog/carers-allowance-help-if-you-care-for-someone">Carer's Allowance</a>: Help if you care for someone with arthritis. Check eligibility on GOV.UK.</li>
<li><a href="/guides/work-with-arthritis">Working with arthritis</a>: Reasonable adjustments, sick pay and protecting your role.</li>
<li><a href="/guides/newly-diagnosed">Newly diagnosed</a>: your first weeks with arthritis.</li>
<li><a href="/guides/arthritis-pain-relief">Arthritis pain relief</a>: practical steps for painful days.</li>
<li><a href="/guides/insurance-coverage">Treatment access and costs</a>: NHS pathways, private options, grants and related financial support.</li>
</ul>`;

const CONTENT = `${PIP_GUIDE_HTML}
<h2 id="financial-help-directory">Financial help directory: other support to check</h2>
<p>PIP is only one part of the picture. The directory below lists other UK benefits, grants and discounts that people with arthritis may be able to get.</p>
${DIRECTORY_HTML}
${RELATED_GUIDES_HTML}`;

const seenQuestions = new Set<string>();
const ALL_FAQS = [...PIP_GUIDE_FAQS, ...FIN_DIR_FAQS].filter((f) => {
  const key = f.question.trim().toLowerCase();
  if (seenQuestions.has(key)) return false;
  seenQuestions.add(key);
  return true;
});

export default function BenefitsPIPGuide() {
  const html = addHeadingIds(CONTENT);


  return (
    <>
      <PageSchema
        url="/guides/benefits-pip"
        name={PIP_GUIDE_META_TITLE}
        description={PIP_GUIDE_DESCRIPTION}
        medical={{ condition: "Arthritis" }}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Guides", item: "/guides" },
          { name: "Benefits & PIP Guide" },
        ]}
        faqs={ALL_FAQS}
        idPrefix="benefits-pip-guide"
      />
      <Helmet>
        <title>{PIP_GUIDE_META_TITLE}</title>
        <meta name="description" content={PIP_GUIDE_DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/guides/benefits-pip" />
      <meta property="og:title" content={PIP_GUIDE_META_TITLE} />
      <meta property="og:description" content={PIP_GUIDE_DESCRIPTION} />

      <meta property="og:url" content="https://livingwitharthritis.org.uk/guides/benefits-pip" />
      <meta property="og:site_name" content="Living With Arthritis" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={PIP_GUIDE_META_TITLE} />
      <meta name="twitter:description" content={PIP_GUIDE_DESCRIPTION} />
      <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": PIP_GUIDE_TITLE,
        "description": PIP_GUIDE_DESCRIPTION,
        "url": "https://livingwitharthritis.org.uk/guides/benefits-pip",
        "inLanguage": "en-GB",
        "audience": { "@type": "MedicalAudience", "audienceType": "Patient", "geographicArea": { "@type": "Country", "name": "United Kingdom" } },
        "about": { "@type": "MedicalCondition", "name": "Arthritis" },
        "publisher": { "@type": "Organization", "name": "Living With Arthritis", "url": "https://livingwitharthritis.org.uk" },
        "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["h1", ".speakable-intro"] }
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://livingwitharthritis.org.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://livingwitharthritis.org.uk/guides/uk-arthritis" },
          { "@type": "ListItem", "position": 3, "name": "Benefits & PIP Guide", "item": "https://livingwitharthritis.org.uk/guides/benefits-pip" }
        ]
      })}</script>
      {/* FAQPage JSON-LD is emitted once by PageSchema (faqs={ALL_FAQS})
          for the questions rendered visibly in the accordion below. The
          second, hand-written FAQPage block that used to sit here duplicated
          the schema and covered questions that were not visible on the page. */}
    </Helmet>
      <Header />
      <PageBreadcrumb segments={[{ label: "Guides", href: "/guides" }, { label: "PIP and benefits" }]} />
      <main id="main-content" className="min-h-screen bg-background">
        <PageHero
          title="Complete PIP guide for arthritis"
          subtitle="Who can claim, 2026/27 rates, how the points work, the form, the assessment and how to challenge a decision. Facts checked on GOV.UK on 10 October 2026."
          badge="Pillar Guide"
        />
        <div className="container mx-auto px-5 md:px-10 max-w-3xl py-16">
          <AeoEnhancement route="/guides/benefits-pip" />
          <TopicClusterNav path="/guides/benefits-pip" />
          <p className="speakable-intro text-muted-foreground text-base leading-relaxed mb-8">
            <strong>Quick answer:</strong> {PIP_GUIDE_QUICK_ANSWER}
          </p>
          <div className="mb-10 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6 print:hidden">
            <p className="text-sm font-semibold text-foreground m-0 mb-2">Free tool: printable PIP evidence diary</p>
            <p className="text-sm text-muted-foreground m-0 mb-4">
              Record a typical week of daily living and mobility before you fill the PIP2 form — then bring the notes to an adviser.
            </p>
            <Link
              to="/resources/pip-evidence-diary"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
            >
              Open the PIP evidence diary
            </Link>
          </div>
          <TableOfContents html={html} />
          <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary" dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />
          <section id="benefits-pip-faq" className="mt-16 pt-8 border-t border-border/30">
            <h2 className="font-display font-bold text-2xl mb-6">Frequently asked questions</h2>
            <FaqAccordion
              idPrefix="benefits-pip-faq"
              items={ALL_FAQS}
              injectSchema={false}
            />
          </section>
          <div className="mt-16 pt-8 border-t border-border/30">

            <h3 className="font-display font-bold text-lg mb-4">Continue Reading</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/guides/health-services" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">← Previous Guide</p>
                <p className="font-bold text-foreground">Arthritis Services</p>
              </Link>
              <Link to="/guides/uk-arthritis" className="p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-all hover:-translate-y-0.5">
                <p className="text-xs text-primary font-bold mb-1">Start from →</p>
                <p className="font-bold text-foreground">Complete UK Arthritis Guide</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="container mx-auto px-5 md:px-10 max-w-3xl pb-8">
        <ArticleCitations citations={CITATIONS_DISABILITY_PIP} />
        <EducationalDisclaimerBox lastReviewed="2026-10-23" />
      </div>
<GuideOnwardJourney currentPath="/guides/benefits-pip" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


