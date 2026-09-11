import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { injectJsonLd, buildBreadcrumb, buildMedicalWebPage } from "@/lib/jsonLd";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";
import { CHARITY } from "@/config/charity";

const PATH = "/about/editorial-claims-policy";

/**
 * Public claims policy — Month 1 growth execution.
 * No unverifiable visitor/impact stats; CONTENT_INVENTORY is source of truth.
 */
export default function EditorialClaimsPolicy() {
  useEffect(() => {
    const c1 = injectJsonLd(
      "claims-policy-webpage",
      buildMedicalWebPage({
        path: PATH,
        name: "Editorial claims policy",
        description:
          "How Living With Arthritis UK states public facts: inventory-backed counts only, educational not diagnostic, no invented visitor statistics.",
        lastReviewed: "2026-09-11",
        specialty: "Physiotherapy",
      }),
    );
    const c2 = injectJsonLd(
      "claims-policy-breadcrumb",
      buildBreadcrumb([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Editorial claims policy", path: PATH },
      ]),
    );
    return () => {
      c1();
      c2();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Editorial claims policy"
        description="How Living With Arthritis UK publishes counts and claims: inventory-backed facts only, educational not diagnostic, no fake visitor stats."
        path={PATH}
      />
      <Header />
      <main id="main-content" className="container mx-auto max-w-3xl px-6 py-16 md:px-12 lg:py-24">
        <header className="mb-10">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">About · Trust</p>
          <h1 className="font-display mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Editorial claims policy
          </h1>
          <p className="text-lg leading-relaxed text-foreground/75">
            We only publish numbers we can defend. Marketing copy never invents visitors,
            people supported, specialists, or engagement rates.
          </p>
        </header>

        <section className="mb-10 space-y-3 text-foreground/85">
          <h2 className="font-display text-2xl font-bold">Source of truth</h2>
          <p>
            Public content counts come from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">CONTENT_INVENTORY</code>{" "}
            in code (updated from checked-in catalogues), not from slogans. As of this
            site build that includes approximately{" "}
            <strong>{formatInventoryCount(CONTENT_INVENTORY.blogArticles)} articles</strong>,{" "}
            <strong>{formatInventoryCount(CONTENT_INVENTORY.pillarGuides)} pillar guides</strong>,{" "}
            and{" "}
            <strong>
              {formatInventoryCount(CONTENT_INVENTORY.exerciseJointPages)} exercise joint pages
            </strong>
            .
          </p>
        </section>

        <section className="mb-10 space-y-3 text-foreground/85">
          <h2 className="font-display text-2xl font-bold">What we will not claim</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Unverified “people supported”, “specialists on staff”, or session rates</li>
            <li>Fake or rounded-up visitor, pageview, or conversion statistics</li>
            <li>Diagnostic or personal treatment advice presented as clinical care</li>
            <li>Gift Aid, Fundraising Regulator badges, or grant status before registration is complete</li>
          </ul>
        </section>

        <section className="mb-10 space-y-3 text-foreground/85">
          <h2 className="font-display text-2xl font-bold">Educational, not diagnostic</h2>
          <p>
            {CHARITY.shortName} (charity {CHARITY.number}) publishes plain-English UK education.
            Content is reviewed by an HCPC-registered physiotherapist where clinical claims appear.
            It does not replace your GP, rheumatology team or pharmacist.
          </p>
        </section>

        <p className="text-sm text-muted-foreground">
          Related:{" "}
          <Link to="/editorial-standards" className="text-primary underline underline-offset-2">
            Editorial standards
          </Link>
          {" · "}
          <Link to="/trust" className="text-primary underline underline-offset-2">
            Trust &amp; credibility
          </Link>
          {" · "}
          <Link to="/about/ai-transparency" className="text-primary underline underline-offset-2">
            AI transparency
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
