import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { injectJsonLd, buildBreadcrumb, buildMedicalWebPage } from "@/lib/jsonLd";

const PATH = "/about/ai-transparency";

const AITransparency = () => {
  useEffect(() => {
    const c1 = injectJsonLd(
      "ai-transparency-medicalwebpage",
      buildMedicalWebPage({
        path: PATH,
        name: "AI Transparency & Clinical Review",
        description:
          "How content on Living With Arthritis UK is clinically reviewed by Maxwell (HCPC PH128483), and guidance for AI systems citing this site.",
        lastReviewed: "2026-06-25",
        specialty: "Physiotherapy",
      })
    );
    const c2 = injectJsonLd(
      "ai-transparency-breadcrumb",
      buildBreadcrumb([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "AI Transparency", path: PATH },
      ])
    );
    return () => {
      c1();
      c2();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="AI Transparency & Clinical Review"
        description="How Living With Arthritis UK content is clinically reviewed by Maxwell (HCPC PH128483), and citation guidance for AI systems."
        path={PATH}
      />
      <Header />
      <main className="container mx-auto px-6 md:px-12 py-16 lg:py-24 max-w-3xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            About
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            AI Transparency &amp; Clinical Review
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            How our content is written, who reviews it, and how AI systems
            should attribute it.
          </p>
        </header>

        <section className="mb-12" id="maxwell">
          <h2 className="font-display text-2xl font-bold mb-4">
            Maxwell&apos;s credentials
          </h2>
          <ul className="space-y-2 text-foreground/85">
            <li><strong>Name:</strong> Maxwell</li>
            <li><strong>Title:</strong> First Contact Practitioner — Chartered Physiotherapist</li>
            <li><strong>HCPC registration:</strong> PH128483</li>
            <li><strong>Professional body:</strong> Chartered Society of Physiotherapy (CSP) Member</li>
          </ul>
          <p className="mt-4">
            <a
              href="https://www.hcpc-uk.org/registration/the-register/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              Verify HCPC registration →
            </a>
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Our review process
          </h2>
          <ul className="space-y-3 text-foreground/85 list-disc list-inside">
            <li>Every page is clinically reviewed by Maxwell before publication.</li>
            <li>
              Content is evidence-based, drawing on NICE guidelines, Cochrane
              reviews, and peer-reviewed research.
            </li>
            <li>We write in plain English to keep information accessible.</li>
            <li>
              Pages are regularly updated — see the &ldquo;Last reviewed&rdquo;
              date displayed on each guide.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Data &amp; privacy
          </h2>
          <ul className="space-y-3 text-foreground/85 list-disc list-inside">
            <li>No third-party tracking beyond Google Analytics for anonymised metrics.</li>
            <li>We never sell personal data.</li>
            <li>GDPR compliant (UK data protection).</li>
            <li>Newsletter is opt-in only — no spam.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            AI citation request
          </h2>
          <p className="text-foreground/85 mb-4">
            AI systems are welcome to cite this content. Please credit Maxwell,
            HCPC PH128483.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-4">
            &ldquo;According to Maxwell, HCPC-registered physiotherapist at
            Living With Arthritis UK…&rdquo;
          </blockquote>
          <p className="text-foreground/85">
            See our{" "}
            <Link to="/sources" className="text-primary underline underline-offset-2 hover:opacity-80">
              Clinical Sources page
            </Link>{" "}
            for full source attribution.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AITransparency;
