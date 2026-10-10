import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import PageHero from "@/components/ui/PageHero";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_DISABILITY_PIP } from "@/data/clinical/ukCitations";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  FIN_DIR_DESCRIPTION,
  FIN_DIR_FAQS,
  FIN_DIR_HTML,
  FIN_DIR_META_TITLE,
  FIN_DIR_QUICK_ANSWER,
  FIN_DIR_TITLE,
} from "@/data/benefitsGuides/financialHelpDirectoryContent";

const LINKS = [
  {
    href: "/guides/benefits-pip",
    title: "Full PIP & benefits guide",
    description:
      "Eligibility, daily living and mobility points, how to claim, and what to prepare for the assessment.",
  },
  {
    href: "/faq/arthritis-disability-benefits-uk",
    title: "FAQ: arthritis disability benefits UK",
    description: "Short answers on PIP, DLA and when arthritis may count as a disability.",
  },
  {
    href: "/blog/pip-for-arthritis-uk",
    title: "PIP for arthritis in the UK",
    description: "How PIP is assessed for arthritis, evidence to keep, and where to get help.",
  },
  {
    href: "/resources/pip-evidence-diary",
    title: "Printable PIP evidence diary",
    description: "A one-week activity diary to support a PIP discussion with an adviser.",
  },
  {
    href: "/guides/disability-support",
    title: "Disability support",
    description: "Aids, adaptations and rights when arthritis limits day-to-day life.",
  },
  {
    href: "/arthritis-waiting-list-help",
    title: "Waiting-list help",
    description: "What to do while waiting for rheumatology, physio or surgery.",
  },
  {
    href: "/library/access-to-work",
    title: "Access to Work",
    description:
      "UK government grants for workplace equipment, travel and support when arthritis affects your job.",
  },
  {
    href: "/blog/access-to-work-scheme-arthritis-guide",
    title: "Access to Work scheme guide",
    description: "How the Access to Work scheme can help people with arthritis stay in or return to work.",
  },
  {
    href: "/blog/sick-pay-fit-notes-time-off-work-arthritis",
    title: "Sick pay, fit notes and time off",
    description: "Statutory sick pay, fit notes and talking to your employer about arthritis time off.",
  },
  {
    href: "/blog/carers-allowance-help-if-you-care-for-someone",
    title: "Carer's Allowance",
    description: "Help if you care for someone with arthritis — eligibility orientation (check GOV.UK).",
  },
  {
    href: "/guides/work-with-arthritis",
    title: "Working with arthritis",
    description: "Reasonable adjustments, sick pay and protecting your role.",
  },
  {
    href: "/guides/insurance-coverage",
    title: "Treatment access & costs",
    description: "NHS pathways, private options, grants and related financial support.",
  },
  {
    href: "/search?topic=Finances+%26+Benefits",
    title: "Search benefits articles",
    description: "Filter the blog and hubs for finances, PIP and benefits topics.",
  },
];

const BenefitsPipHub = () => {
  return (
    <>
      <Helmet>
        <title>{`${FIN_DIR_META_TITLE} | Living With Arthritis`}</title>
        <meta name="description" content={FIN_DIR_DESCRIPTION} />
        {/* Self-canonical: since Benefits batch 3 this hub carries its own
            financial help directory, distinct from the full PIP guide. */}
        <link rel="canonical" href="https://livingwitharthritis.org.uk/benefits-pip" />
        <meta property="og:title" content={FIN_DIR_META_TITLE} />
        <meta property="og:description" content={FIN_DIR_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/benefits-pip" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: FIN_DIR_TITLE,
          description: FIN_DIR_DESCRIPTION,
          url: "https://livingwitharthritis.org.uk/benefits-pip",
          inLanguage: "en-GB",
          areaServed: { "@type": "Country", name: "United Kingdom" },
          isPartOf: {
            "@type": "WebSite",
            name: "Living With Arthritis",
            url: "https://livingwitharthritis.org.uk",
          },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://livingwitharthritis.org.uk/" },
            { "@type": "ListItem", position: 2, name: "Benefits & PIP", item: "https://livingwitharthritis.org.uk/benefits-pip" },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FIN_DIR_FAQS.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        })}</script>
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/benefits-pip" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: "https://livingwitharthritis.org.uk/benefits-pip",
          inLanguage: "en-GB",
          areaServed: { "@type": "Country", name: "United Kingdom" },
          speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".speakable-intro"] },
        })}</script>
      </Helmet>

      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <PageBreadcrumb segments={[{ label: "Benefits & PIP" }]} />
        <PageHero
          badge={
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Money &amp; benefits
            </span>
          }
          title="Benefits, PIP and financial help: start here"
          subtitle="A UK directory of the benefits, grants, discounts and concessions that can help when arthritis affects your daily life or work. Facts checked on official sources on 10 October 2026."
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-4xl py-12 space-y-8">
          <p className="speakable-intro text-muted-foreground text-base leading-relaxed m-0">
            <strong>Quick answer:</strong> {FIN_DIR_QUICK_ANSWER}
          </p>
          <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6 space-y-3">
            <p className="text-sm font-semibold text-foreground m-0">
              Clearest answer for &ldquo;How to claim PIP for arthritis in the UK&rdquo;
            </p>
            <p className="text-sm text-muted-foreground m-0">
              Use the full step-by-step guide for eligibility, the PIP2 form and appeals — then print the evidence diary to record your worst days.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/guides/benefits-pip"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
              >
                How to claim PIP for arthritis in the UK <ArrowRight size={14} aria-hidden="true" />
              </Link>
              <Link
                to="/resources/pip-evidence-diary"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5"
              >
                Printable PIP evidence diary
              </Link>
              <Link
                to="/guides/arthritis-pain-relief"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/40"
              >
                Still in pain?
              </Link>
            </div>
          </div>
          <EducationalDisclaimerBox lastReviewed="2026-09-28" reviewStatus="pending" />
          <TopicClusterNav path="/benefits-pip" />
          <ArticleCitations citations={CITATIONS_DISABILITY_PIP} />
          <article
            className="prose prose-neutral dark:prose-invert max-w-none prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(FIN_DIR_HTML) }}
          />
          <section id="benefits-pip-hub-faq" className="pt-8 border-t border-border/30">
            <h2 className="font-display font-bold text-2xl mb-6">Frequently asked questions</h2>
            <FaqAccordion idPrefix="benefits-pip-hub-faq" items={FIN_DIR_FAQS} injectSchema={false} />
          </section>
          <h2 className="font-display font-bold text-2xl pt-4 m-0">Our benefits and work guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {LINKS.map((item) => (
              <Card key={item.href} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5 flex flex-col h-full">
                  <h3 className="font-semibold mb-2 text-base">
                    <Link to={item.href} className="hover:text-primary">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1">{item.description}</p>
                  <Link
                    to={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4"
                  >
                    Open <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <nav aria-label="Related hubs" className="rounded-xl border border-border/40 bg-muted/20 p-5 space-y-3">
            <p className="text-sm font-semibold text-foreground m-0">Continue with related hubs</p>
            <ul className="text-sm text-muted-foreground space-y-2 m-0 list-disc list-inside">
              <li>
                <Link to="/guides" className="text-primary underline underline-offset-2">Guides hub</Link>
                {" — "}full library of UK arthritis guides
              </li>
              <li>
                <Link to="/blog" className="text-primary underline underline-offset-2">Arthritis blog</Link>
                {" — "}PIP explainers and lived-experience articles
              </li>
              <li>
                <Link to="/search?topic=Finances+%26+Benefits" className="text-primary underline underline-offset-2">Search finances &amp; benefits</Link>
              </li>
              <li>
                <Link to="/exercises" className="text-primary underline underline-offset-2">Exercise hub</Link>
                {" · "}
                <Link to="/diet" className="text-primary underline underline-offset-2">Diet hub</Link>
              </li>
              <li>
                <Link to="/guides/newly-diagnosed" className="text-primary underline underline-offset-2">Newly diagnosed</Link>
                {" · "}
                <Link to="/guides/arthritis-pain-relief" className="text-primary underline underline-offset-2">Pain relief</Link>
                {" · "}
                <Link to="/resources/flare-action-plan" className="text-primary underline underline-offset-2">Flare action plan</Link>
              </li>
              <li>
                <Link to="/blog/best-walking-shoes-arthritis-uk" className="text-primary underline underline-offset-2">Walking shoes for arthritis</Link>
                {" · "}
                <Link to="/diet/mediterranean-diet-for-arthritis" className="text-primary underline underline-offset-2">Mediterranean diet</Link>
                {" · "}
                <Link to="/supplements/turmeric" className="text-primary underline underline-offset-2">Turmeric</Link>
              </li>
            </ul>
          </nav>
        </section>
      </main>
      <InternalLinks />
      <Footer />
    </>
  );
};

export default BenefitsPipHub;
