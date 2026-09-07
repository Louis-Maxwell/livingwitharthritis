import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import SeoContentFramework from "@/components/seo/SeoContentFramework";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/seo-content-framework`;

/**
 * Lightweight public page for Louis Maxwell's SEO content framework.
 * Canonical human copy also lives on /editorial-standards#seo-content-framework.
 */
export default function SeoContentFrameworkPage() {
  return (
    <>
      <Helmet>
        <title>How we write SEO content | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Louis Maxwell's 8-step SEO content framework: search intent, keyword, strong title, H2/H3 outline, helpful content, on-page SEO, internal links and readability."
        />
        <meta property="og:title" content="How we write SEO content | Living With Arthritis UK" />
        <meta
          property="og:description"
          content="Great SEO content = search intent + clarity + helpful value. Our eight-step framework for UK arthritis guides and blog posts."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={`${BASE}/og/seo-content-framework.png`} />
        <meta property="og:image:alt" content="How to write SEO content — 8-step framework" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${BASE}/og/seo-content-framework.png`} />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
        <link rel="canonical" href={URL} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "How we write SEO content",
          url: URL,
          inLanguage: "en-GB",
          description:
            "Eight-step SEO content framework used by Living With Arthritis UK for guides and blog posts.",
          isPartOf: { "@type": "WebSite", name: "Living With Arthritis UK", url: BASE },
          about: { "@type": "Thing", name: "SEO content framework" },
          publisher: { "@id": `${BASE}/#organization` },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Editorial standards", item: `${BASE}/editorial-standards` },
            { "@type": "ListItem", position: 3, name: "SEO content framework", item: URL },
          ],
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[
            { label: "Editorial standards", href: "/editorial-standards" },
            { label: "SEO content framework" },
          ]}
        />
        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <header className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
              Editorial · SEO · AEO · GEO
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              How we write SEO content
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Living With Arthritis UK (charity 1218461, UK national charity) publishes free, clinically
              reviewed guidance. This page documents the framework every new guide and blog post
              should follow — independent of Arthritis UK.
            </p>
          </header>

          <SeoContentFramework showStandaloneLink={false} />

          <p className="text-sm text-muted-foreground mt-8">
            Related:{" "}
            <Link to="/editorial-standards" className="text-primary underline hover:no-underline">
              Editorial standards
            </Link>
            {" · "}
            <Link to="/about/ai-transparency" className="text-primary underline hover:no-underline">
              AI transparency
            </Link>
            {" · "}
            <Link to="/about" className="text-primary underline hover:no-underline">
              About us
            </Link>
          </p>
        </main>
        <Footer />
      </div>
    </>
  );
}
