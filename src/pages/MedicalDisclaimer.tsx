import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AlertTriangle, Phone, ShieldAlert } from "lucide-react";
import Header from "@/components/Header";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { CHARITY } from "@/config/charity";
import { nhsEscalationLine } from "@/lib/medicalDisclaimer";

const Footer = lazy(() => import("@/components/Footer"));

const URL = `${CHARITY.siteUrl}/disclaimer`;

/**
 * Full educational medical disclaimer — not formal legal advice.
 */
export default function MedicalDisclaimer() {
  return (
    <>
      <Helmet>
        <title>Medical Disclaimer | {CHARITY.shortName}</title>
        <meta
          name="description"
          content="Educational medical disclaimer for Living With Arthritis UK: not a diagnosis, not personal advice. Seek NHS care when needed."
        />
        <meta property="og:title" content={`Medical Disclaimer | ${CHARITY.shortName}`} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <link rel="canonical" href={URL} />
      </Helmet>

      <div className="min-h-screen bg-background">
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
              Living With Arthritis UK ({CHARITY.type}, Charity Commission number{" "}
              {CHARITY.number}) publishes educational information about arthritis for a UK
              audience. This page explains the limits of that information.
            </p>
          </header>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground/85 leading-relaxed">
            <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 not-prose">
              <p className="flex items-start gap-3 text-sm sm:text-base">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden />
                <span>
                  <strong>Not a diagnosis. Not personal medical advice.</strong> Nothing on this
                  website — including condition guides, medicines explainers, exercises, diet notes,
                  the symptom checker, or the help chat — replaces advice from your GP, pharmacist,
                  rheumatology team or other qualified clinician.
                </span>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">When to seek urgent care</h2>
              <p className="flex items-start gap-2 mt-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span>{nhsEscalationLine()}</span>
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Suddenly hot, red, swollen joint with fever or feeling very unwell — seek urgent care (possible septic arthritis).</li>
                <li>New loss of bladder or bowel control with back pain, or progressive leg weakness — call 999.</li>
                <li>Chest pain, severe shortness of breath, or signs of a severe allergic reaction — call 999.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Medicines and treatments</h2>
              <p>
                Medicines pages summarise publicly available UK guidance (for example NICE, NHS,
                BNF / SmPC themes) for education. They do <strong>not</strong> tell you what dose to
                take, whether to start, stop or change a medicine, or how to taper steroids. Always
                follow the regimen your rheumatology team or GP has set for you, and check the
                patient information leaflet / SmPC.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">Tools and chat</h2>
              <p>
                The symptom checker and chatbot route you to educational guides. They cannot examine
                you, order tests, or issue a diagnosis. Do not rely on them in an emergency.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">No clinical relationship</h2>
              <p>
                Using this website does not create a clinician–patient relationship with Living With
                Arthritis UK or with Louis Maxwell (HCPC PH128483) personally, unless you have a
                separate, explicit clinical arrangement outside this site.
              </p>
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
              Last updated: 16 September 2026. This disclaimer is for transparency; it is not a
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
