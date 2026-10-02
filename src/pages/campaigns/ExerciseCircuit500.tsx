import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import CampaignBand from "@/components/landing/CampaignBand";

const StickyDonateBar = lazyWithRetry(() => import("@/components/landing/StickyDonateBar"));
const BackToTopButton = lazyWithRetry(() => import("@/components/landing/BackToTopButton"));

const SITE_URL = "https://livingwitharthritis.org.uk";

function ExerciseCircuit500() {
  return (
    <>
      <Helmet>
        <title>Fund 500 Personalised Exercise Plans | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Help fund free, clinician-reviewed exercise guidance from Living With Arthritis UK. Donations support guides and tools, not a private physio appointment."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/campaigns/exercise-circuit-500`} />
        <meta
          property="og:title"
          content="Fund 500 Personalised Exercise Plans | Living With Arthritis UK"
        />
        <meta
          property="og:description"
          content="Help fund free, clinician-reviewed exercise guidance from Living With Arthritis UK."
        />
        <meta property="og:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="People walking outdoors — Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og/landing-share.png`} />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          <Suspense fallback={<div className="h-96 bg-muted" />}>
            <CampaignBand
              title="Fund 500 Personalised Exercise Plans"
              subtitle="Help us grow free, clinician-reviewed exercise support"
              description="Living With Arthritis UK aims to fund free educational exercise plans for people living with arthritis. Donations support content, tools and guidance reviewed by our clinical lead — not a promised private physio waiting-list bypass. Goal figures are fundraising targets; we only show a progress meter when totals are verified from donation records."
              goalGbp={50000}
              beneficiaries={500}
              urgency="none"
              cta="Donate to support free exercise education"
            />
          </Suspense>

          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What donations support
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="rounded-xl bg-card border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-2">Free exercise guides</h3>
                    <p className="text-sm text-foreground/70">
                      Plain-English home routines people can start without an appointment, including knee and flare-safe movement.
                    </p>
                  </div>
                  <div className="rounded-xl bg-card border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-2">Tools people can use</h3>
                    <p className="text-sm text-foreground/70">
                      Printable plans and diaries that sit alongside NHS care. They do not replace a GP, physio or rheumatology appointment.
                    </p>
                  </div>
                  <div className="rounded-xl bg-card border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-2">Clinical review</h3>
                    <p className="text-sm text-foreground/70">
                      Educational pages are checked by our clinical lead before we publish them. We do not invent patient results.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-foreground/70 mt-6">
                  We do not publish named success stories unless the person has agreed and we can stand behind the details.{" "}
                  <Link to="/exercises" className="text-primary underline underline-offset-2">Browse free exercises</Link>
                  {" · "}
                  <Link to="/resources/flare-action-plan" className="text-primary underline underline-offset-2">Flare action plan</Link>
                  {" · "}
                  <Link to="/guides/knee-exercises-for-osteoarthritis" className="text-primary underline underline-offset-2">Knee exercises for osteoarthritis</Link>
                </p>
              </div>
            </div>
          </section>

        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTopButton />
        </Suspense>
        <Suspense fallback={null}>
          <StickyDonateBar />
        </Suspense>
      </div>
    </>
  );
}

export default function CampaignPage() {
  return (
    <ErrorBoundary fallback={<div>Error loading campaign</div>}>
      <ExerciseCircuit500 />
    </ErrorBoundary>
  );
}
