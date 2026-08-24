import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";

const CampaignBand = lazy(() => import("@/components/landing/CampaignBand"));
const StickyDonateBar = lazy(() => import("@/components/landing/StickyDonateBar"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));

const SITE_URL = "https://livingwitharthritis.org.uk";

function ExerciseCircuit500() {
  return (
    <>
      <Helmet>
        <title>Fund 500 Personalised Exercise Plans | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Help us create 500 free, personalised exercise plans for people living with arthritis. Each donation funds one person's recovery journey."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/campaigns/exercise-circuit-500`} />
        <meta
          property="og:title"
          content="Fund 500 Personalised Exercise Plans | Living With Arthritis UK"
        />
        <meta
          property="og:description"
          content="Help us create 500 free, personalised exercise plans for people living with arthritis."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          <Suspense fallback={<div className="h-96 bg-muted" />}>
            <CampaignBand
              title="Fund 500 Personalised Exercise Plans"
              subtitle="Movement is medicine — help us reach people who need it most"
              description="Every person living with arthritis deserves a personalised recovery plan. We're partnering with NHS physiotherapists to create 500 free, tailored exercise programmes—one for each person. Each £100 funds one complete plan: assessment, exercises, progress tracking, and ongoing support. No paywalls. No waiting lists. Just evidence-based care for everyone."
              goalGbp={50000}
              raisedGbp={12500}
              impactMetric={{
                label: "Custom plans created",
                value: "125 of 500",
              }}
              beneficiaries={500}
              urgency="high"
              cta="Give £100 to fund one person's recovery"
            />
          </Suspense>

          {/* Campaign details section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  What £100 pays for
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="rounded-xl bg-card border border-border p-6">
                    <div className="text-2xl font-bold text-primary mb-2">📋</div>
                    <h3 className="font-semibold text-foreground mb-2">Initial Assessment</h3>
                    <p className="text-sm text-foreground/70">
                      NHS physio reviews your condition, mobility, and goals. Full confidentiality, no jargon.
                    </p>
                  </div>
                  <div className="rounded-xl bg-card border border-border p-6">
                    <div className="text-2xl font-bold text-primary mb-2">🎯</div>
                    <h3 className="font-semibold text-foreground mb-2">Custom Exercise Plan</h3>
                    <p className="text-sm text-foreground/70">
                      Tailored to your condition. Videos, step-by-step guides, and progression milestones.
                    </p>
                  </div>
                  <div className="rounded-xl bg-card border border-border p-6">
                    <div className="text-2xl font-bold text-primary mb-2">📈</div>
                    <h3 className="font-semibold text-foreground mb-2">8-Week Support</h3>
                    <p className="text-sm text-foreground/70">
                      Check-ins, adjustments, and access to community. Track progress together.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact stories */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
                  Real impact
                </h2>
                <div className="space-y-6">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
                    <p className="text-sm text-foreground/70 mb-3">From Sarah, age 34 (Knee arthritis)</p>
                    <blockquote className="text-foreground italic">
                      "The personalised plan changed everything. Instead of generic exercises, I got exactly what my knees needed. Three months in, I'm hiking again."
                    </blockquote>
                  </div>
                  <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
                    <p className="text-sm text-foreground/70 mb-3">From Michael, age 52 (Rheumatoid arthritis)</p>
                    <blockquote className="text-foreground italic">
                      "I thought my working life was over. The plan helped me stay active at my desk job. My rheumatologist was impressed with my progress."
                    </blockquote>
                  </div>
                </div>
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
