import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const LINKS = [
  {
    href: "/guides/benefits-pip",
    title: "Full PIP & benefits guide",
    description:
      "Eligibility, daily living and mobility points, how to claim, and what to prepare for the assessment.",
  },
  {
    href: "/guides/disability-support",
    title: "Disability support",
    description: "Aids, adaptations and rights when arthritis limits day-to-day life.",
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
    href: "/faq/arthritis-disability-benefits-uk",
    title: "FAQ: arthritis disability benefits UK",
    description: "Short answers on PIP, DLA and when arthritis may count as a disability.",
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
        <title>Benefits & PIP Hub | Living With Arthritis UK</title>
        <meta
          name="description"
          content="UK hub for arthritis benefits and PIP: start with our full PIP guide, then explore disability support, work rights and related FAQs."
        />
        <meta property="og:title" content="Benefits & PIP Hub | Living With Arthritis UK" />
        <meta
          property="og:description"
          content="Find PIP and UK benefits guidance for people living with arthritis, plus work rights and disability support."
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
      </Helmet>

      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <PageHero
          badge={
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Benefits
            </span>
          }
          title="Benefits & PIP hub"
          subtitle="A clear starting point for Personal Independence Payment and related UK support when arthritis affects daily living or mobility."
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-4xl py-12 space-y-8">
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

          <p className="text-sm text-muted-foreground">
            Looking for every guide we publish? Visit the{" "}
            <Link to="/guides" className="text-primary underline underline-offset-2">
              guides hub
            </Link>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BenefitsPipHub;
