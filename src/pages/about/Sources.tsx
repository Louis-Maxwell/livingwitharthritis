import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { injectJsonLd, buildBreadcrumb } from "@/lib/jsonLd";

const PATH = "/sources";
const SITE = "https://livingwitharthritis.org.uk";

interface SrcLink { label: string; url: string; note?: string; id?: string }

const sections: { title: string; id: string; items: SrcLink[] }[] = [
  {
    title: "UK Clinical Guidelines",
    id: "uk-guidelines",
    items: [
      { id: "nice-oa", label: "NICE â€” Osteoarthritis: care and management (NG226)", url: "https://www.nice.org.uk/guidance/ng226" },
      { label: "NICE â€” Rheumatoid arthritis in adults: management (NG100)", url: "https://www.nice.org.uk/guidance/ng100" },
      { label: "Royal College of Physicians â€” Rheumatology clinical guidance", url: "https://www.rcp.ac.uk/" },
      { label: "Versus Arthritis â€” patient resources", url: "https://www.versusarthritis.org/" },
      { label: "Arthritis Society Canada â€” exercise & lifestyle", url: "https://arthritis.ca/" },
      { label: "Chartered Society of Physiotherapy (CSP) â€” practice standards", url: "https://www.csp.org.uk/" },
    ],
  },
  {
    title: "Evidence & Research",
    id: "research",
    items: [
      { label: "Cochrane Library â€” systematic reviews on arthritis treatments and exercise", url: "https://www.cochranelibrary.com/" },
      { label: "PubMed Central â€” peer-reviewed medical and physiotherapy journals", url: "https://www.ncbi.nlm.nih.gov/pmc/" },
    ],
  },
  {
    title: "Condition-Specific Sources",
    id: "conditions",
    items: [
      { label: "Osteoarthritis â€” NICE NG226, Versus Arthritis", url: "https://www.nice.org.uk/guidance/ng226" },
      { label: "Rheumatoid Arthritis â€” British Society for Rheumatology guidelines", url: "https://www.rheumatology.org.uk/practice-quality/guidelines" },
      { label: "Frailty â€” British Geriatrics Society", url: "https://www.bgs.org.uk/" },
      { label: "Musculoskeletal â€” CSP guidelines", url: "https://www.csp.org.uk/" },
    ],
  },
  {
    title: "Lifestyle & Nutrition",
    id: "lifestyle",
    items: [
      { label: "Mediterranean Diet â€” WHO and UK healthcare nutrition guidance", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "Supplements â€” Natural Medicines Database (evidence-based)", url: "https://naturalmedicines.therapeuticresearch.com/" },
      { label: "Exercise â€” American College of Sports Medicine (ACSM)", url: "https://www.acsm.org/" },
    ],
  },
];

const Sources = () => {
  useEffect(() => {
    const c1 = injectJsonLd("sources-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Clinical Sources & Evidence",
      description:
        "Clinical guidelines, peer-reviewed research and authoritative bodies used to inform content across Living With Arthritis UK.",
      author: {
        "@type": "Person",
        name: "Maxwell",
        jobTitle: "First Contact Practitioner",
        identifier: "HCPC PH128483",
        affiliation: { "@type": "Organization", name: "Chartered Society of Physiotherapy" },
      },
      publisher: { "@id": `${SITE}/#organization` },
      mainEntityOfPage: `${SITE}${PATH}`,
      inLanguage: "en-GB",
      dateModified: "2026-06-25",
    });
    const c2 = injectJsonLd(
      "sources-breadcrumb",
      buildBreadcrumb([
        { name: "Home", path: "/" },
        { name: "Sources", path: PATH },
      ])
    );
    return () => { c1(); c2(); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Clinical Sources & Evidence"
        description="Clinical sources & evidence: NICE guidelines, Cochrane reviews, peer-reviewed research. Full bibliography of trusted sources."
        path={PATH}
      />
      <Header />
      <main id="main-content" className="container mx-auto px-6 md:px-12 py-16 lg:py-24 max-w-3xl">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">About</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Clinical Sources &amp; Evidence
          </h1>
          <p className="text-lg text-foreground/75 leading-relaxed">
            This page lists the clinical sources, guidelines, and evidence used
            across Living With Arthritis UK.
          </p>
        </header>

        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">{s.title}</h2>
            <ul className="space-y-3 text-foreground/85">
              {s.items.map((item) => (
                <li key={item.url + item.label} id={item.id}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-primary underline underline-offset-2 hover:opacity-80"
                  >
                    {item.label}
                  </a>
                  {item.note && <span className="text-foreground/70"> â€” {item.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Sources;
