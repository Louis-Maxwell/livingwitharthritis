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
          "How Living With Arthritis states public facts: inventory-backed counts only, educational not diagnostic, no invented visitor statistics.",
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
        description="How Living With Arthritis publishes counts and claims: inventory-backed facts only, educational not diagnostic, no fake visitor stats."
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
            Public content counts reflect the guides currently published on this website.
            They are not counts of people supported or proof of clinical outcomes.
            Our current collection includes{" "}
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
            Pages show whether clinical review is complete or pending. A completed-review
            claim should be supported by a named reviewer and a recorded review date.
            It does not replace your GP, rheumatology team or pharmacist.
          </p>
        </section>

        <section className="mb-10 space-y-3 text-foreground/85">
          <h2 className="font-display text-2xl font-bold">Patient stories and original research</h2>
          <p>
            Patient stories must come from real contributors who have agreed to publication.
            Personal experiences are identified as experiences, not evidence that a treatment
            will work for everyone. We do not invent testimonials, quotes or survey responses.
          </p>
          <p>
            When publishing a survey, we explain how participants were recruited, when the
            survey ran, how many people answered each question and the limitations of the
            sample. An open online survey is not presented as representative of everyone
            living with arthritis. Planned research is not described as completed research.
          </p>
        </section>

        <section className="mb-10 space-y-3 text-foreground/85">
          <h2 className="font-display text-2xl font-bold">Independence and partnerships</h2>
          <p>
            Living With Arthritis has its own identity and governance. We only describe an
            organisation as a partner, sponsor or endorser when that relationship has been
            agreed. A link to another organisation is a reference, not an endorsement.
            Claims such as “largest”, “leading” or “most trusted” need published evidence.
          </p>
        </section>

        <section className="mb-10 space-y-3 text-foreground/85">
          <h2 className="font-display text-2xl font-bold">Corrections and review dates</h2>
          <p>
            Please <Link to="/contact" className="text-primary underline underline-offset-2">contact us</Link>{" "}
            with the page address and details of any suspected error. An editorial update
            is not the same as a clinical review: changing wording or a page date does not
            establish that a clinician has checked the advice.
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
