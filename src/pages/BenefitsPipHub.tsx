import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_DISABILITY_PIP } from "@/data/clinical/ukCitations";

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
        <title>Benefits & PIP for Arthritis UK | Start Your Claim Prep</title>
        <meta
          name="description"
          content="Arthritis affecting dressing, cooking or walking? Start here for UK PIP and benefits: full guide, evidence diary, work rights and next-step links."
        />
        <meta property="og:title" content="Benefits & PIP for Arthritis UK | Start Your Claim Prep" />
        <meta
          property="og:description"
          content="PIP looks at how arthritis affects daily living and mobility — start the full guide, then use the evidence diary and disability support links."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/benefits-pip" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Benefits & PIP Hub",
          url: "https://livingwitharthritis.org.uk/benefits-pip",
          inLanguage: "en-GB",
          areaServed: { "@type": "Country", name: "United Kingdom" },
          isPartOf: {
            "@type": "WebSite",
            name: "Living With Arthritis UK",
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
        <PageHero
          badge={
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Money &amp; benefits
            </span>
          }
          title="Benefits & PIP: start here"
          subtitle="When arthritis makes dressing, cooking or walking harder, this hub points you to PIP prep, evidence tools and related UK support — not just the diagnosis name."
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-4xl py-12 space-y-8">
          <p className="speakable-intro text-muted-foreground text-base leading-relaxed m-0">
            PIP is a UK working-age benefit that looks at how arthritis affects daily living and mobility, not just your diagnosis name — check GOV.UK for the latest rules.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/guides/benefits-pip"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90"
            >
              Next step: full PIP guide <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <Link
              to="/resources/pip-evidence-diary"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/5"
            >
              Printable evidence diary
            </Link>
            <Link
              to="/guides/arthritis-pain-relief"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/40"
            >
              Still in pain?
            </Link>
          </div>
          <EducationalDisclaimerBox lastReviewed="2026-09-20" />
          <TopicClusterNav path="/benefits-pip" />
          <ArticleCitations citations={CITATIONS_DISABILITY_PIP} />
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>
              If getting dressed, cooking or walking to the shops feels harder than it should,
              you are not imagining it — and you are not alone. In the UK,{" "}
              <strong>Personal Independence Payment (PIP)</strong> is the main working-age benefit
              that looks at how your condition affects daily living and mobility — not just your
              diagnosis name. This hub points you to our full guide and the related pages most
              people need next.
            </p>
            <p>
              Rules and forms change. Always check{" "}
              <a
                href="https://www.gov.uk/pip"
                target="_blank"
                rel="noopener noreferrer"
              >
                GOV.UK PIP guidance
              </a>{" "}
              for the latest official information, and speak with a welfare adviser if your
              situation is complex.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {LINKS.map((item) => (
              <Card key={item.href} className="hover:border-primary/40 transition-colors">
                <CardContent className="p-5 flex flex-col h-full">
                  <h2 className="font-semibold mb-2 text-base">
                    <Link to={item.href} className="hover:text-primary">
                      {item.title}
                    </Link>
                  </h2>
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
