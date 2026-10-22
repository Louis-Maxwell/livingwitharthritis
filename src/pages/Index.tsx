/**
 * Living With Arthritis — Homepage (customer-first)
 *
 * Obsessive customer focus: people living with arthritis in the UK + carers.
 * Hierarchy: hero (one primary + one secondary action) → trust strip (real
 * facts only) → visitor-job router (8 jobs, real URLs) → joint exercises →
 * tools → what-is / FAQ (AEO) → conditions + latest → research fund + donate.
 * Donate never louder than help. No invented testimonials/metrics.
 * See docs/CUSTOMER-FIRST.md.
 */

import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import MotivationMarquee from "@/components/landing/MotivationMarquee";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredMount from "@/components/DeferredMount";
import ViewportSection from "@/components/ViewportSection";

// Above-the-fold sections stay eager — the hero is the LCP element and the
// router is the page's main job, so neither waits on a chunk request.
import OAHero from "@/components/landing/OAHero";
import HomeTrustStrip from "@/components/landing/HomeTrustStrip";
import HomeJobRouter from "@/components/landing/HomeJobRouter";
import HomeTopicGuides from "@/components/landing/HomeTopicGuides";

// Everything below the router mounts only when scrolled near, so it never
// competes with the hero for bandwidth or main-thread time on first load.
// Below the fold; its page-aeo dataset (~47 KB) stays out of the entry bundle.
const AeoEnhancement = lazyWithRetry(() => import("@/components/seo/AeoEnhancement"));
const JointExerciseSection = lazyWithRetry(() => import("@/components/JointExerciseSection"));
const HomeToolsBand = lazyWithRetry(() => import("@/components/landing/HomeToolsBand"));
const HomeZakatLink = lazyWithRetry(() => import("@/components/landing/HomeZakatLink"));
const ConditionPillBand = lazyWithRetry(() => import("@/components/landing/ConditionPillBand"));
const LatestGrid = lazyWithRetry(() => import("@/components/landing/LatestGrid"));
const ImpactProgressBand = lazyWithRetry(() => import("@/components/landing/ImpactProgressBand"));
const FinalDonateBand = lazyWithRetry(() => import("@/components/landing/FinalDonateBand"));
const Footer = lazyWithRetry(() => import("@/components/Footer"));
const NextReadStrip = lazyWithRetry(() => import("@/components/NextReadStrip"));
const BackToTopButton = lazyWithRetry(() => import("@/components/landing/BackToTopButton"));
const MobileBottomCTA = lazyWithRetry(() => import("@/components/landing/MobileBottomCTA"));

const SITE_URL = "https://livingwitharthritis.org.uk";

const SectionFallback = () => <div className="h-32" aria-hidden="true" />;

function HomePage() {
  useEffect(() => {
    // Organization / WebSite JSON-LD is emitted once by
    // <RootOrganizationSchema /> (and the matching static scripts in
    // index.html). A second MedicalOrganization here split the entity
    // and omitted the charity number.
    const breadcrumbId = "ld-home-breadcrumb";
    document.getElementById(breadcrumbId)?.remove();
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.id = breadcrumbId;
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL + "/",
        },
      ],
    });
    document.head.appendChild(breadcrumbScript);

    return () => {
      document.getElementById(breadcrumbId)?.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Living With Arthritis | Exercises & PIP Advice</title>
        <meta
          name="description"
          content="Free arthritis exercises, PIP arthritis guidance and practical support for joint pain and frailty. Explore guides from Living With Arthritis, UK charity 1218461."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Living With Arthritis | Exercises & PIP Advice"
        />
        <meta
          name="twitter:title"
          content="Living With Arthritis | Exercises & PIP Advice"
        />
        <meta
          property="og:description"
          content="Free arthritis exercises, PIP arthritis guidance and practical support for joint pain and frailty. Explore guides from Living With Arthritis, UK charity 1218461."
        />
        <meta
          name="twitter:description"
          content="Free arthritis exercises, PIP arthritis guidance and practical support for joint pain and frailty. Explore guides from Living With Arthritis, UK charity 1218461."
        />
        <meta property="og:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="People walking together — Living With Arthritis free joint-pain support"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta
          name="twitter:image:alt"
          content="People walking together — Living With Arthritis free joint-pain support"
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          {/* 01 — Hero (eager LCP): one H1, one primary + one secondary action */}
          <OAHero />
          <MotivationMarquee />

          {/* 02 — Trust strip: verifiable facts only */}
          <HomeTrustStrip />

          {/* 03 — Visitor-job router: the main way into the site */}
          <HomeJobRouter />

          {/* A simple care journey helps visitors decide what to do next after
              they find an article, without turning the homepage into a quiz. */}
          <section aria-labelledby="next-step-heading" className="border-y border-border/60 bg-muted/30 py-10 md:py-12">
            <div className="container mx-auto max-w-6xl px-5 md:px-10">
              <div className="max-w-2xl">
                <h2 id="next-step-heading" className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  A practical next step
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Use the information at your own pace. Start by understanding your symptoms, then choose one small action and seek support when you need it.
                </p>
              </div>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  ["1", "Understand", "Read a plain-English guide about your symptoms or condition.", "/conditions/arthritis"],
                  ["2", "Try one action", "Choose a gentle exercise, pacing idea or practical self-help tool.", "/exercises"],
                  ["3", "Get support", "Bring questions to your GP, physiotherapist or another trusted professional.", "/healthcare-professionals"],
                ].map(([number, title, description, href]) => (
                  <li key={title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <Link to={href} className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground" aria-hidden="true">{number}</span>
                      <h3 className="mt-3 text-lg font-bold group-hover:text-primary">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                      <span className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-2">Explore this step</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Topic links stay rendered without waiting for a scroll event. */}
          <HomeTopicGuides />

          {/* 04 — Motion is Lotion: pick a joint for a home exercise plan */}
          <ViewportSection rootMargin="200px 0px" fallback={<SectionFallback />}>
            <JointExerciseSection />
            <HomeToolsBand />
          </ViewportSection>

          {/* 05 — Answer-first summary + FAQ (single FAQPage JSON-LD) */}
          <div className="container mx-auto px-5 md:px-10 max-w-3xl py-6">
            <Suspense fallback={null}>
              <AeoEnhancement route="/" />
            </Suspense>
          </div>

          {/* 06 — Conditions (target of "/#conditions" breadcrumbs) + latest */}
          <div id="conditions" className="scroll-mt-28">
            <ViewportSection rootMargin="200px 0px" fallback={<SectionFallback />}>
              <ConditionPillBand />
              <LatestGrid />
            </ViewportSection>
          </div>

          {/* 07 — Research fund appeal (live total on GoFundMe, no static meter) + donate */}
          <ViewportSection rootMargin="200px 0px" fallback={<SectionFallback />}>
            <ImpactProgressBand />
            <FinalDonateBand />
          </ViewportSection>

          {/* 08 — Deprioritised Zakat entry (small link only) */}
          <Suspense fallback={null}>
            <HomeZakatLink />
          </Suspense>
        </main>

        <ViewportSection rootMargin="200px 0px" fallback={<div className="h-64" aria-hidden="true" />}>
          <NextReadStrip currentPath="/" />
          <Footer />
        </ViewportSection>

        <DeferredMount>
          <Suspense fallback={null}>
            <BackToTopButton />
            <MobileBottomCTA />
          </Suspense>
        </DeferredMount>
      </div>
    </>
  );
}

export default function Index() {
  return (
    <ErrorBoundary fallback={<div>Error loading content</div>}>
      <HomePage />
    </ErrorBoundary>
  );
}
