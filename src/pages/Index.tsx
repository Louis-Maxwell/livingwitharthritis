/**
 * Living With Arthritis UK — Homepage (customer-first)
 *
 * Obsessive customer focus: people living with arthritis in the UK + carers.
 * Hierarchy: empathy hero (≤2 help CTAs) → trust strip → 4 job pathways →
 * starting point → hubs → tools → medication → research → soft donate.
 * Donate never louder than help. No invented testimonials/metrics.
 * See docs/CUSTOMER-FIRST.md.
 */

import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredMount from "@/components/DeferredMount";
import ViewportSection from "@/components/ViewportSection";

// OAHero stays eager — required for LCP.
import OAHero from "@/components/landing/OAHero";
import HomeTrustStrip from "@/components/landing/HomeTrustStrip";
import HomeQuickPathways from "@/components/landing/HomeQuickPathways";

import { VISITOR_STATS_SNIPPET } from "@/config/visitorStats";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
/** Prefixes `rest` with the visitor-stats snippet when one is set (a real,
 * verified count), without leaving a stray leading space when it's empty. */
const withVisitorSnippet = (rest: string) =>
  [VISITOR_STATS_SNIPPET, rest].filter(Boolean).join(" ");

const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const InteractiveStartPath = lazy(() => import("@/components/landing/InteractiveStartPath"));
const HomeToolsBand = lazy(() => import("@/components/landing/HomeToolsBand"));
const HomeZakatLink = lazy(() => import("@/components/landing/HomeZakatLink"));
const ImpactStats = lazy(() => import("@/components/landing/ImpactStats"));
const WhatWeDo = lazy(() => import("@/components/landing/WhatWeDo"));
const ConditionPillBand = lazy(() => import("@/components/landing/ConditionPillBand"));
const LatestGrid = lazy(() => import("@/components/landing/LatestGrid"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const SearchBar = lazy(() => import("@/components/landing/SearchBar"));
const ImpactProgressBand = lazy(() => import("@/components/landing/ImpactProgressBand"));
const FinalDonateBand = lazy(() => import("@/components/landing/FinalDonateBand"));
const HowYouCanHelp = lazy(() => import("@/components/landing/HowYouCanHelp"));
const StartHereBand = lazy(() => import("@/components/landing/StartHereBand"));
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
          {/* 01 — Hero (eager LCP): one H1, max two CTAs */}
          <OAHero />

          {/* 02 — Trust strip (P1-07), above the fold on mobile */}
          <HomeTrustStrip />

          <div className="container mx-auto px-5 md:px-10 max-w-3xl">
            <AeoEnhancement route="/" />
          </div>

          {/* 03 — Quick pathways + find your starting point */}
          <HomeQuickPathways />

          <Suspense fallback={<SectionFallback />}>
            <InteractiveStartPath />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <JointExerciseSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <StartHereBand />
          </Suspense>

          {/* 04 — Practical hubs (max 5) */}
          <section
            aria-labelledby="hubs-heading"
            className="py-12 md:py-16 bg-background border-y border-border/40"
          >
            <div className="container mx-auto px-5 md:px-10 max-w-6xl">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">
                  Start here
                </p>
                <h2
                  id="hubs-heading"
                  className="font-display font-bold text-2xl md:text-3xl text-foreground"
                >
                  Practical hubs for living with arthritis in the UK
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Clear entry points for diet, exercise, conditions, PIP and the blog —
                  clinically reviewed, free to use.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link
                  to="/diet"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Nutrition</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Diet hub
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Anti-inflammatory and Mediterranean eating patterns.
                  </p>
                </Link>
                <Link
                  to="/exercises"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Exercise</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Exercise hub
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    NICE-aligned routines for knees, hands and more.
                  </p>
                </Link>
                <Link
                  to="/conditions/arthritis"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Conditions</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Condition guides
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    OA, RA, PsA, JIA, AS and more in plain English.
                  </p>
                </Link>
                <Link
                  to="/benefits-pip"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Benefits &amp; PIP</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Benefits &amp; PIP
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Eligibility, evidence, claiming and appeals.
                  </p>
                </Link>
                <Link
                  to="/blog"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Blog</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Arthritis blog
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatInventoryCount(CONTENT_INVENTORY.blogArticles)} clinically reviewed
                    articles for UK readers.
                  </p>
                </Link>
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">
                Looking for everything in one place?{" "}
                <Link
                  to="/resource-centre"
                  className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  Open the Resource Centre
                </Link>
                {" · "}
                <Link
                  to="/healthcare-professionals"
                  className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  Healthcare professionals
                </Link>
                {" · "}
                <Link
                  to="/faq"
                  className="font-semibold text-foreground underline underline-offset-2 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                >
                  FAQs (PIP, exercise, OA)
                </Link>
              </p>
            </div>
          </section>

          {/* 05 — Tools band */}
          <Suspense fallback={<SectionFallback />}>
            <HomeToolsBand />
          </Suspense>

          {/* 06 — UK medication guides */}
          <section
            aria-labelledby="medication-guides-heading"
            className="py-12 md:py-16 bg-background"
          >
            <div className="container mx-auto px-5 md:px-10 max-w-6xl">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">
                  UK Medication Guides
                </p>
                <h2
                  id="medication-guides-heading"
                  className="font-display font-bold text-2xl md:text-3xl text-foreground"
                >
                  Plain-English guides to common arthritis medications
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Clinically reviewed UK guides explaining how each drug works, monitoring, side
                  effects and what to ask your rheumatology team. Educational only — not dosing
                  advice.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  to="/guides/azathioprine-for-arthritis"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">DMARD</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Azathioprine for Arthritis
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    TPMT testing, monitoring and side effects.
                  </p>
                </Link>
                <Link
                  to="/guides/steroids-for-arthritis"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Steroid</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Steroids for Arthritis
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Injections, tablets, side effects and UK access.
                  </p>
                </Link>
                <Link
                  to="/guides/benefits-pip"
                  className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <p className="text-xs text-primary font-bold mb-1">Support</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                    Benefits &amp; PIP Guide
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Eligibility, claiming and appealing PIP for arthritis.
                  </p>
                </Link>
              </div>
            </div>
          </section>

          {/* 07 — Below-fold: mission, conditions, latest */}
          <ViewportSection fallback={<SectionFallback />}>
            <ImpactStats />
            <WhatWeDo />
            <ConditionPillBand />
            <LatestGrid />
          </ViewportSection>

          {/* 08 — Research fund (accurate £5k / £50k only) + support + FAQ */}
          <ViewportSection fallback={<SectionFallback />}>
            <ImpactProgressBand />
            <HowYouCanHelp />
            <QuoteSection />
            <SearchBar />
            <FAQSection />
            <FinalDonateBand />
          </ViewportSection>

          {/* 09 — Deprioritised Zakat entry (small link only) */}
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
