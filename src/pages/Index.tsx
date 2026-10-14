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

    const faqId = "ld-home-brand-faq";
    document.getElementById(faqId)?.remove();
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = faqId;
    faqScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Living With Arthritis?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Living With Arthritis is a UK registered charity providing free, evidence-based arthritis guidance, joint-pain support, exercise advice, PIP information and practical resources for people living with arthritis and frailty.",
          },
        },
        {
          "@type": "Question",
          name: "Where should I start if I am living with arthritis?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "Start with the Living With Arthritis homepage, the arthritis overview, the living with arthritis guide, the pain-relief guide, or the exercise and PIP guides depending on your main concern.",
          },
        },
        {
          "@type": "Question",
          name: "Is Living With Arthritis the same as Arthritis UK?",
          acceptedAnswer: {
            "@type": "Answer",
            text:
              "No. Living With Arthritis is an independent UK charity, registered charity 1218461, and is separate from Arthritis UK, formerly Versus Arthritis.",
          },
        },
      ],
    });
    document.head.appendChild(faqScript);

    const hubId = "ld-home-topic-hubs";
    document.getElementById(hubId)?.remove();
    const hubScript = document.createElement("script");
    hubScript.type = "application/ld+json";
    hubScript.id = hubId;
    hubScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Core arthritis support guides from Living With Arthritis",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Arthritis overview", url: `${SITE_URL}/conditions/arthritis` },
        { "@type": "ListItem", position: 2, name: "Living with arthritis guide", url: `${SITE_URL}/living-with-arthritis` },
        { "@type": "ListItem", position: 3, name: "Arthritis pain relief", url: `${SITE_URL}/guides/arthritis-pain-relief` },
        { "@type": "ListItem", position: 4, name: "Exercise for arthritis", url: `${SITE_URL}/guides/exercise` },
        { "@type": "ListItem", position: 5, name: "PIP and benefits for arthritis", url: `${SITE_URL}/guides/benefits-pip` },
        { "@type": "ListItem", position: 6, name: "Free arthritis resources UK", url: `${SITE_URL}/guides/free-arthritis-resources-uk` },
      ],
    });
    document.head.appendChild(hubScript);

    return () => {
      document.getElementById(breadcrumbId)?.remove();
      document.getElementById(faqId)?.remove();
      document.getElementById(hubId)?.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Living With Arthritis | Arthritis Support UK</title>
        <meta
          name="description"
          content="Living With Arthritis offers free UK arthritis support, joint pain guides, exercises, PIP advice and evidence-based help for people with arthritis and frailty."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Living With Arthritis | Arthritis Support UK"
        />
        <meta
          name="twitter:title"
          content="Living With Arthritis | Arthritis Support UK"
        />
        <meta
          property="og:description"
          content="Living With Arthritis offers free UK arthritis support, joint pain guides, exercises, PIP advice and evidence-based help for people with arthritis and frailty."
        />
        <meta
          name="twitter:description"
          content="Living With Arthritis offers free UK arthritis support, joint pain guides, exercises, PIP advice and evidence-based help for people with arthritis and frailty."
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
