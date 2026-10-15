import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldCheck, BookOpen, UserCheck, RefreshCw, Scale, AlertCircle } from "lucide-react";
import SeoContentFramework from "@/components/seo/SeoContentFramework";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import authors from "@/data/medical-authors.json";

const BASE = "https://livingwitharthritis.org.uk";
const URL = `${BASE}/editorial-standards`;

export default function EditorialStandards() {
  const maxwell = authors.maxwell;

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Editorial Standards — Living With Arthritis",
      url: URL,
      inLanguage: "en-GB",
      publisher: {
        "@type": "Organization",
        name: "Living With Arthritis",
        url: BASE,
      },
      mainEntity: {
        "@type": "Person",
        name: maxwell.name,
        jobTitle: maxwell.title,
        hasCredential: maxwell.credential,
        memberOf: {
          "@type": "Organization",
          name: "Chartered Society of Physiotherapy",
        },
        knowsAbout: maxwell.specialties,
      },
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
    return () => {
      s.remove();
    };
  }, [maxwell]);

  return (
    <>
      <Helmet>
        <title>Editorial & Medical Review Standards | Living With Arthritis</title>
        <meta
          name="description"
          content="How Living With Arthritis reviews health content: HCPC-registered clinicians, NICE-aligned sourcing and clear editorial standards."
        />
        <meta property="og:title" content="Editorial Standards | Living With Arthritis" />
        <meta
          property="og:description"
          content="Our medical review process, evidence standards and reviewer credentials."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Editorial Standards" }]} />

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <header className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Trust & Transparency
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Our editorial standards
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Pages carrying a clinically reviewed badge have been reviewed by a
              qualified healthcare professional. Pages still awaiting review are
              labelled “Pending clinical review”; publication or an updated date
              alone does not mean clinical review is complete. We identify sources
              for clinical recommendations and material factual claims, and link to
              relevant guidance or research where available. We also follow a clear
              content framework so answers stay readable and useful for UK readers.
              Content is educational — see our{" "}
              <Link to="/disclaimer" className="text-primary underline underline-offset-2">
                medical disclaimer
              </Link>
              .
            </p>
          </header>

          <Section icon={UserCheck} title="Medical review process">
            <p>
              Clinically reviewed pages are reviewed by a qualified clinician
              before publication and re-checked when guidance changes. New or
              expanding pages remain clearly marked as pending until that review
              is complete.
            </p>
            <ul>
              <li>
                <strong>{maxwell.name}</strong> — {maxwell.title},{" "}
                {maxwell.credential}, {maxwell.organization}
              </li>
              <li>Where specialist input is obtained, the contributor and their role are identified on the relevant page.</li>
            </ul>
          </Section>

          <Section icon={BookOpen} title="Evidence standards">
            <p>For health and care information, writers check relevant primary or authoritative sources, such as:</p>
            <ul>
              <li>NICE (National Institute for Health and Care Excellence) guidelines</li>
              <li>UK healthcare evidence-based recommendations</li>
              <li>Peer-reviewed medical research</li>
              <li>Cochrane systematic reviews</li>
              <li>Royal College guidance (RCP, RCGP)</li>
            </ul>
          </Section>

          <Section icon={ShieldCheck} title="Reviewer credentials">
            <p>
              <strong>{maxwell.name}</strong>
              <br />
              {maxwell.title}
              <br />
              HCPC Registration: PH128483
              <br />
              {maxwell.organization}
            </p>
            <p className="mt-3">
              <em>Specialties:</em> {maxwell.specialties.join(", ")}.
            </p>
            <p className="mt-3 text-sm">{maxwell.bio}</p>
          </Section>

          <Section icon={RefreshCw} title="Update frequency">
            <p>
              Pages show their publication or update date, and a clinical review
              date when that review has been completed and recorded. An update date
              is not a clinical review date. We revisit content when relevant
              evidence, guidance, or service information changes; we do not claim
              that every page is reviewed daily.
            </p>
          </Section>

          <Section icon={Scale} title="Conflict of interest">
            <p>
              Living With Arthritis is independent and not sponsored by
              pharmaceutical companies or medical device manufacturers. We do
              not accept payment for editorial coverage. Affiliate links, where
              used, are disclosed on the page.
            </p>
          </Section>

          <SeoContentFramework />

          <Section icon={AlertCircle} title="Report an inaccuracy">
            <p>
              Found something that looks wrong or out of date? Please{" "}
              <Link to="/contact" className="text-primary underline hover:no-underline">
                contact us
              </Link>{" "}
              with the page URL and a short note — a clinician will review it.
            </p>
          </Section>
        </main>

        <Footer />
      </div>
    </>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
          {title}
        </h2>
      </div>
      <div className="prose prose-lg max-w-none text-foreground/85 prose-strong:text-foreground prose-a:text-primary">
        {children}
      </div>
    </section>
  );
}
