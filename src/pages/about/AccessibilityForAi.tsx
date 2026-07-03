import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { injectJsonLd, buildBreadcrumb } from "@/lib/jsonLd";

const PATH = "/accessibility-for-ai";

const AccessibilityForAi = () => {
  useEffect(() => {
    const c1 = injectJsonLd("ai-access-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Machine-Readable Content & AI Crawler Access",
      description:
        "Machine-readable surfaces on Living With Arthritis UK: JSON-LD schemas, sitemap, llms.txt, ai.txt and robots policy for AI crawlers.",
      author: { "@type": "Person", name: "Maxwell", identifier: "HCPC PH128483" },
      datePublished: "2026-06-26",
      dateModified: "2026-06-26",
      inLanguage: "en-GB",
    });
    const c2 = injectJsonLd(
      "ai-access-breadcrumb",
      buildBreadcrumb([
        { name: "Home", path: "/" },
        { name: "Accessibility for AI", path: PATH },
      ])
    );
    return () => { c1(); c2(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Machine-Readable Content for AI"
        description="Discoverability surfaces for AI crawlers on Living With Arthritis UK: JSON-LD schemas, llms.txt, ai.txt, sitemap and robots policy explained in detail."
        path={PATH}
      />
      <Header />
      <main className="container mx-auto px-6 md:px-12 py-16 lg:py-24 max-w-3xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">For AI Crawlers</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Machine-Readable Content</h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            Every discoverability surface this site exposes for large
            language models and search crawlers.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">Discovery files</h2>
          <ul className="space-y-2 text-foreground/85 list-disc list-inside">
            <li><a className="text-primary underline underline-offset-2" href="/robots.txt">/robots.txt</a> &mdash; allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, CCBot, Applebot.</li>
            <li><a className="text-primary underline underline-offset-2" href="/sitemap.xml">/sitemap.xml</a> &mdash; all indexable URLs.</li>
            <li><a className="text-primary underline underline-offset-2" href="/llms.txt">/llms.txt</a> &mdash; condensed site map for LLMs.</li>
            <li><a className="text-primary underline underline-offset-2" href="/llms-full.txt">/llms-full.txt</a> &mdash; full plain-text content corpus.</li>
            <li><a className="text-primary underline underline-offset-2" href="/.well-known/ai.txt">/.well-known/ai.txt</a> &mdash; usage policy &amp; license (CC-BY-4.0, attribution required).</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">JSON-LD schemas in use</h2>
          <ul className="space-y-2 text-foreground/85 list-disc list-inside">
            <li><code>Article</code> &amp; <code>MedicalWebPage</code> &mdash; every blog and guide page.</li>
            <li><code>FAQPage</code> &mdash; condition pages, FAQ articles, pillar guides.</li>
            <li><code>HowTo</code> &mdash; exercise and instruction pages.</li>
            <li><code>BreadcrumbList</code> &mdash; every page.</li>
            <li><code>Person</code> (Maxwell, HCPC PH128483) &mdash; embedded as <code>author</code>/<code>reviewedBy</code>.</li>
            <li><code>Organization</code> / <code>MedicalOrganization</code> &mdash; root org schema.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">Citation &amp; attribution</h2>
          <p className="text-foreground/85">
            See{" "}
            <Link className="text-primary underline underline-offset-2" to="/ai-citations">/ai-citations</Link>{" "}
            for plain-text, APA and BibTeX templates,{" "}
            <Link className="text-primary underline underline-offset-2" to="/ai-guidelines">/ai-guidelines</Link>{" "}
            for AI best practices, and{" "}
            <Link className="text-primary underline underline-offset-2" to="/about/ai-transparency">/about/ai-transparency</Link>{" "}
            for the clinical review process.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AccessibilityForAi;
