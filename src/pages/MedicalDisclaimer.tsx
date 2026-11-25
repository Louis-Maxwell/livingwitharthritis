import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { CHARITY } from "@/config/charity";
import { MEDICAL_DISCLAIMER_SHORT } from "@/lib/medicalDisclaimer";
import { MEDICAL_DISCLAIMER_FULL, UK_URGENT_CARE } from "@/data/reviewedPublicCopy";

const Footer = lazyWithRetry(() => import("@/components/Footer"));

const URL = `${CHARITY.siteUrl}/disclaimer`;

/**
 * Full educational medical disclaimer — not formal legal advice.
 */
export default function MedicalDisclaimer() {
  useEffect(() => {
    // A direct static load already has this page node. Client-side navigation
    // needs one too, without a second competing MedicalWebPage or review claim.
    const pageId = `${URL}#webpage`;
    const alreadyPresent = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).some((script) => {
      try {
        const node = JSON.parse(script.textContent || "{}");
        return [node, ...(Array.isArray(node["@graph"]) ? node["@graph"] : [])]
          .some((item) => item?.["@id"] === pageId && item?.["@type"] === "WebPage");
      } catch { return false; }
    });
    if (alreadyPresent) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "medical-disclaimer-page-jsonld";
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": pageId,
      url: URL,
      name: "Medical disclaimer | Living With Arthritis",
      description: MEDICAL_DISCLAIMER_SHORT,
      inLanguage: "en-GB",
      isPartOf: { "@id": `${CHARITY.siteUrl}/#website` },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <Helmet>
        <title>Medical Disclaimer | {CHARITY.shortName}</title>
        <meta
          name="description"
          content="Educational medical disclaimer for Living With Arthritis: not a diagnosis, not personal advice. Seek NHS care when needed."
        />
        <meta property="og:title" content={`Medical Disclaimer | ${CHARITY.shortName}`} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <link rel="canonical" href={URL} />
      </Helmet>

      <div className="min-h-dvh bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Medical disclaimer" }]} />

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <header className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <ShieldAlert className="w-3 h-3" aria-hidden /> Important
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight">
              Medical disclaimer
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Living With Arthritis ({CHARITY.type}, Charity Commission number{" "}
              {CHARITY.number}) publishes educational information about arthritis for a UK
              audience. This page explains the limits of that information.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground/85 leading-relaxed">
            <section aria-labelledby="disclaimer-information">
              <h2 id="disclaimer-information" className="text-xl font-bold text-foreground">Using this information</h2>
              {MEDICAL_DISCLAIMER_FULL.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>

            <section aria-labelledby="urgent-care" className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 not-prose">
              <h2 id="urgent-care" className="flex items-start gap-3 text-xl font-bold text-foreground">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden />
                When to seek urgent care
              </h2>
              <p className="mt-3">Living With Arthritis does not provide emergency medical care. Do not delay seeking help because of something you read here or while waiting for an online response.</p>
              <div className="mt-6 space-y-6">
                {UK_URGENT_CARE.map((item) => <section key={item.q}>
                  <h3 className="text-base sm:text-lg leading-snug font-bold text-foreground">{item.q}</h3>
                  <p className="mt-2">{item.a}</p>
                </section>)}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Related pages</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link to="/editorial-standards" className="text-primary underline">
                    Editorial standards
                  </Link>
                </li>
                <li>
                  <Link to="/about/editorial-claims-policy" className="text-primary underline">
                    Claims policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-primary underline">
                    Terms &amp; conditions
                  </Link>
                </li>
                <li>
                  <Link to="/complaints" className="text-primary underline">
                    Complaints
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-primary underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </section>

            <p className="text-sm text-muted-foreground">
              Last updated: 22 November 2026. This disclaimer is for transparency; it is not a
              substitute for solicitor-drafted terms or clinical indemnity arrangements.
            </p>
          </div>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
