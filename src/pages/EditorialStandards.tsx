import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ShieldCheck, BookOpen, UserCheck, RefreshCw, Scale, AlertCircle } from "lucide-react";
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
      name: "Editorial Standards — Living With Arthritis UK",
      url: URL,
      inLanguage: "en-GB",
      publisher: {
        "@type": "Organization",
        name: "Living With Arthritis UK",
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
        <title>Editorial Standards & Medical Review Process | Living With Arthritis UK</title>
        <meta
          name="description"
          content="How Living With Arthritis UK reviews health content: HCPC-registered First Contact Practitioner, NICE-aligned sourcing, conflict-of-interest policy, and update cadence."
        />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content="Editorial Standards | Living With Arthritis UK" />
        <meta
          property="og:description"
          content="Our medical review process, evidence standards and reviewer credentials."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb segments={[{ label: "Editorial Standards" }]} />

        <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <header className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3 h-3" /> Trust & Transparency
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Our editorial standards
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every health page on Living With Arthritis UK is reviewed by a
              qualified healthcare professional and built on guideline-grade
              evidence. Here is exactly how we work.
            </p>
          </header>

          <Section icon={UserCheck} title="Medical review process">
            <p>
              All health content is reviewed by a qualified clinician before
              publication and re-checked when guidance changes.
            </p>
            <ul>
              <li>
                <strong>{maxwell.name}</strong> — {maxwell.title},{" "}
                {maxwell.credential}, {maxwell.organization}
              </li>
              <li>Additional specialist input from physiotherapists and clinical experts</li>
            </ul>
          </Section>

          <Section icon={BookOpen} title="Evidence standards">
            <p>Our content is based on:</p>
            <ul>
              <li>NICE (National Institute for Health and Care Excellence) guidelines</li>
              <li>NHS evidence-based recommendations</li>
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
              Content is reviewed and updated regularly to reflect the latest
              evidence. Each article shows the date it was last updated. Pages
              referencing NICE or NHS guidance are re-checked whenever those
              sources publish revisions.
            </p>
          </Section>

          <Section icon={Scale} title="Conflict of interest">
            <p>
              Living With Arthritis UK is independent and not sponsored by
              pharmaceutical companies or medical device manufacturers. We do
              not accept payment for editorial coverage. Affiliate links, where
              used, are disclosed on the page.
            </p>
          </Section>

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
