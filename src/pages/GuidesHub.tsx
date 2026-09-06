import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import PageHero from "@/components/ui/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  GUIDE_REGISTRY,
  type GuideCluster,
  type GuideEntry,
} from "@/lib/guideRegistry";

const CLUSTER_LABELS: Record<GuideCluster, string> = {
  medication: "Medication",
  msk: "Movement & MSK",
  lifestyle: "Lifestyle",
  support: "Support & benefits",
  surgery: "Surgery",
  condition: "Conditions",
};

const CLUSTER_ORDER: GuideCluster[] = [
  "support",
  "msk",
  "lifestyle",
  "medication",
  "surgery",
  "condition",
];

function byCluster(cluster: GuideCluster): GuideEntry[] {
  return GUIDE_REGISTRY.filter((g) => g.cluster === cluster);
}

const GuidesHub = () => {
  return (
    <>
      <Helmet>
        <title>Arthritis Guides Hub | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Browse clinician-written UK arthritis guides: PIP and benefits, exercise, diet, pain relief, newly diagnosed steps, and navigating NHS care."
        />
        <meta property="og:title" content="Arthritis Guides Hub | Living With Arthritis UK" />
        <meta
          property="og:description"
          content="Browse clinician-written UK arthritis guides covering benefits, movement, diet, medication and support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Arthritis Guides Hub",
          url: "https://livingwitharthritis.org.uk/guides",
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
            { "@type": "ListItem", position: 2, name: "Guides", item: "https://livingwitharthritis.org.uk/guides" },
          ],
        })}</script>
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/guides" />
      </Helmet>

      <Header />
      <main id="main-content" className="min-h-screen bg-background text-foreground">
        <PageHero
          badge={
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full">
              Guides
            </span>
          }
          title="Arthritis guides hub"
          subtitle="Practical UK guides for living with arthritis — benefits and PIP, exercise, diet, pain relief, and finding your way through NHS care."
        />

        <section className="container mx-auto px-6 sm:px-8 lg:px-16 max-w-6xl py-12 space-y-12">
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            Living with arthritis is exhausting — and hunting for trustworthy answers should not
            be another job. This hub is for UK readers who want clear next steps: benefits and PIP,
            safe movement, anti-inflammatory eating, and finding your way through NHS care.
            Prefer to search by topic? Use the{" "}
            <Link to="/search" className="text-primary underline underline-offset-2">
              site search
            </Link>
            , browse the{" "}
            <Link to="/blog" className="text-primary underline underline-offset-2">
              arthritis blog
            </Link>
            , or jump to the{" "}
            <Link to="/benefits-pip" className="text-primary underline underline-offset-2">
              Benefits &amp; PIP hub
            </Link>
            . You are not alone in figuring this out.
          </p>
          <nav aria-label="Related hubs" className="flex flex-wrap gap-2 text-sm">
            <Link to="/exercises" className="rounded-full border border-border/60 px-3 py-1.5 hover:border-primary/40 hover:text-primary">Exercise hub</Link>
            <Link to="/diet" className="rounded-full border border-border/60 px-3 py-1.5 hover:border-primary/40 hover:text-primary">Diet hub</Link>
            <Link to="/benefits-pip" className="rounded-full border border-border/60 px-3 py-1.5 hover:border-primary/40 hover:text-primary">Benefits &amp; PIP</Link>
            <Link to="/blog" className="rounded-full border border-border/60 px-3 py-1.5 hover:border-primary/40 hover:text-primary">Blog</Link>
            <Link to="/editorial-standards" className="rounded-full border border-border/60 px-3 py-1.5 hover:border-primary/40 hover:text-primary">How we write</Link>
          </nav>

          {CLUSTER_ORDER.map((cluster) => {
            const guides = byCluster(cluster);
            if (!guides.length) return null;
            return (
              <div key={cluster}>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="text-primary" size={20} aria-hidden="true" />
                  <h2 className="text-xl font-semibold">{CLUSTER_LABELS[cluster]}</h2>
                  <Badge variant="secondary">{guides.length}</Badge>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {guides.map((guide) => (
                    <Card key={guide.path} className="hover:border-primary/40 transition-colors">
                      <CardContent className="p-5 flex flex-col h-full">
                        <h3 className="font-semibold mb-2">
                          <Link to={guide.path} className="hover:text-primary">
                            {guide.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground flex-1">{guide.description}</p>
                        <Link
                          to={guide.path}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4"
                        >
                          Read guide <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <InternalLinks />
      <Footer />
    </>
  );
};

export default GuidesHub;
