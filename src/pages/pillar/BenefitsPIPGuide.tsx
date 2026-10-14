import { Helmet } from "react-helmet-async";
import { lazyWithRetry } from "@/lib/chunkRecovery";
import PageSchema from "@/components/seo/PageSchema";
import Header from "@/components/Header";
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

const CONTENT = PIP_GUIDE_HTML;
const REVIEWED_DATE = "2026-10-14";

const CLUSTER_LINKS = [
  {
    title: "Arthritis symptoms",
    href: "/arthritis-symptoms",
    copy: "Use symptom patterns to explain how arthritis affects daily living.",
  },
  {
    title: "Arthritis treatment",
    href: "/arthritis-treatment",
    copy: "Record treatments tried, side effects and functional limits.",
  },
  {
    title: "Arthritis pain relief",
    href: "/guides/arthritis-pain-relief",
    copy: "Turn pain patterns into clear evidence for typical days and flares.",
  },
  {
    title: "Exercise for arthritis",
    href: "/guides/exercise",
    copy: "Document what helps, what worsens symptoms and what support is needed.",
  },
];

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
        faqs={PIP_GUIDE_FAQS}
        lastReviewed={REVIEWED_DATE}
        reviewedBy={{
          name: "Louis Maxwell",
          jobTitle: "First Contact Practitioner",
          identifier: "HCPC PH128483",
        }}
        idPrefix="benefits-pip-guide"
      />
      <Helmet>
        <title>{`${PIP_GUIDE_META_TITLE} | Living With Arthritis`}</title>
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
      {/* MedicalWebPage and FAQPage JSON-LD are emitted by PageSchema above. */}
      {/* FAQPage JSON-LD is emitted once by PageSchema (faqs={PIP_GUIDE_FAQS})
          for the questions rendered visibly in the accordion below. The
          second, hand-written FAQPage block that used to sit here duplicated
          the schema and covered questions that were not visible on the page. */}
    </Helmet>
      <Header />
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
          <section aria-labelledby="pip-authority-path" className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6">
            <h2 id="pip-authority-path" className="font-display text-xl font-bold mb-3">Arthritis benefits authority path</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Strong PIP evidence connects symptoms, treatment, pain, mobility and daily function. These guides help build that picture.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {CLUSTER_LINKS.map((item) => (
                <Link key={item.href} to={item.href} className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  <span className="block font-semibold text-primary underline underline-offset-2">{item.title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{item.copy}</span>
                </Link>
              ))}
            </div>
          </section>
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
              items={PIP_GUIDE_FAQS}
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
        <EducationalDisclaimerBox reviewStatus="pending" pendingText="Updated October 2026; pending clinical and editorial review." />
      </div>
<GuideOnwardJourney currentPath="/guides/benefits-pip" />
      <Suspense fallback={null}><Footer /></Suspense>
    </>
  );
}


