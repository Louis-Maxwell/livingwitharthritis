/**
 * Living With Arthritis UK — Homepage (customer-first)
 *
 * Obsessive customer focus: people living with arthritis in the UK + carers.
 * Hierarchy: hero (one primary + one secondary action) → trust strip (real
 * facts only) → visitor-job router (8 jobs, real URLs) → joint exercises →
 * tools → what-is / FAQ (AEO) → conditions + latest → research fund + donate.
 * Donate never louder than help. No invented testimonials/metrics.
 * See docs/CUSTOMER-FIRST.md.
 */

import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredMount from "@/components/DeferredMount";
import ViewportSection from "@/components/ViewportSection";

// Above-the-fold sections stay eager — the hero is the LCP element and the
// router is the page's main job, so neither waits on a chunk request.
import OAHero from "@/components/landing/OAHero";
import HomeTrustStrip from "@/components/landing/HomeTrustStrip";
import HomeJobRouter from "@/components/landing/HomeJobRouter";

import { VISITOR_STATS_SNIPPET } from "@/config/visitorStats";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
/** Prefixes `rest` with the visitor-stats snippet when one is set (a real,
 * verified count), without leaving a stray leading space when it's empty. */
const withVisitorSnippet = (rest: string) =>
  [VISITOR_STATS_SNIPPET, rest].filter(Boolean).join(" ");

// Everything below the router mounts only when scrolled near, so it never
// competes with the hero for bandwidth or main-thread time on first load.
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const HomeToolsBand = lazy(() => import("@/components/landing/HomeToolsBand"));
const HomeZakatLink = lazy(() => import("@/components/landing/HomeZakatLink"));
const ConditionPillBand = lazy(() => import("@/components/landing/ConditionPillBand"));
const LatestGrid = lazy(() => import("@/components/landing/LatestGrid"));
const ImpactProgressBand = lazy(() => import("@/components/landing/ImpactProgressBand"));
const FinalDonateBand = lazy(() => import("@/components/landing/FinalDonateBand"));
const Footer = lazy(() => import("@/components/Footer"));
const NextReadStrip = lazy(() => import("@/components/NextReadStrip"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const MobileBottomCTA = lazy(() => import("@/components/landing/MobileBottomCTA"));

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
        <title>Living With Arthritis UK | Evidence-Based Health Guides</title>
        <meta
          name="description"
          content={withVisitorSnippet(
            "Living With Arthritis UK (charity 1218461) is independent of Arthritis UK. Free, clinically reviewed UK guides for joint pain — NICE-aligned exercise, diet, PIP and waiting-list help.",
          )}
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Living With Arthritis UK | Evidence-Based Health Guides"
        />
        <meta
          name="twitter:title"
          content="Living With Arthritis UK | Evidence-Based Health Guides"
        />
        <meta
          property="og:description"
          content={withVisitorSnippet(
            "Living With Arthritis UK (charity 1218461) is independent of Arthritis UK. Free clinically reviewed UK arthritis guidance. Registered charity 1218461.",
          )}
        />
        <meta
          name="twitter:description"
          content={withVisitorSnippet(
            "Living With Arthritis UK (charity 1218461) — independent of Arthritis UK. Free UK arthritis exercises, diet guidance and support.",
          )}
        />
        <meta property="og:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="People walking together — Living With Arthritis UK free joint-pain support"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta
          name="twitter:image:alt"
          content="People walking together — Living With Arthritis UK free joint-pain support"
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          {/* 01 — Hero (eager LCP): one H1, one primary + one secondary action */}
          <OAHero />

          {/* 02 — Trust strip: verifiable facts only */}
          <HomeTrustStrip />

          {/* 03 — Visitor-job router: the main way into the site */}
          <HomeJobRouter />

          {/* 04 — Motion is Lotion: pick a joint for a home exercise plan */}
          <ViewportSection fallback={<SectionFallback />}>
            <JointExerciseSection />
            <HomeToolsBand />
          </ViewportSection>

          {/* 05 — Answer-first summary + FAQ (single FAQPage JSON-LD) */}
          <div className="container mx-auto px-5 md:px-10 max-w-3xl py-6">
            <AeoEnhancement route="/" />
          </div>

          {/* 06 — Conditions (target of "/#conditions" breadcrumbs) + latest */}
          <div id="conditions" className="scroll-mt-28">
            <ViewportSection fallback={<SectionFallback />}>
              <ConditionPillBand />
              <LatestGrid />
            </ViewportSection>
          </div>

          {/* 07 — Research fund (accurate £5k / £50k only) + donate */}
          <ViewportSection fallback={<SectionFallback />}>
            <ImpactProgressBand />
            <FinalDonateBand />
          </ViewportSection>

          {/* 08 — Deprioritised Zakat entry (small link only) */}
          <Suspense fallback={null}>
            <HomeZakatLink />
          </Suspense>
        </main>

        <ViewportSection fallback={<div className="h-64" aria-hidden="true" />}>
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
