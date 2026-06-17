/**
 * Living With Arthritis UK — Homepage (interactive redesign)
 *
 * Scroll-driven editorial composition built around the BRC red palette.
 * Anchors: parallax hero, interactive joint picker, scroll-pinned story,
 * animated counters, 60-second self-check, donation thermometer.
 */

import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredMount from "@/components/DeferredMount";

import HeroParallax from "@/components/landing/interactive/HeroParallax";

const BodyJointPicker = lazy(() => import("@/components/landing/interactive/BodyJointPicker"));
const ScrollStoryStrip = lazy(() => import("@/components/landing/interactive/ScrollStoryStrip"));
const AnimatedImpactCounters = lazy(() => import("@/components/landing/interactive/AnimatedImpactCounters"));
const QuickAssessmentQuiz = lazy(() => import("@/components/landing/interactive/QuickAssessmentQuiz"));
const ProgressThermometer = lazy(() => import("@/components/landing/interactive/ProgressThermometer"));

const OAPlanPillarsSection = lazy(() => import("@/components/landing/OAPlanPillarsSection"));
const FacesStrip = lazy(() => import("@/components/landing/FacesStrip"));
const BlogPreview = lazy(() => import("@/components/landing/BlogPreview"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const FinalDonateBand = lazy(() => import("@/components/landing/FinalDonateBand"));

const Footer = lazy(() => import("@/components/Footer"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));
const StickyDonateBar = lazy(() => import("@/components/landing/StickyDonateBar"));
const MobileBottomCTA = lazy(() => import("@/components/landing/MobileBottomCTA"));
const NextReadStrip = lazy(() => import("@/components/NextReadStrip"));

const SITE_URL = "https://livingwitharthritis.org.uk";

const SectionFallback = () => <div className="h-32" aria-hidden="true" />;

function HomePage() {
  useEffect(() => {
    const scripts = [
      {
        id: "ld-home-ngo",
        json: {
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Living With Arthritis UK",
          url: SITE_URL,
          description:
            "An open-source osteoarthritis management plan — clinically reviewed, freely published, and made for everyone living with arthritis in the UK.",
          areaServed: { "@type": "Country", name: "United Kingdom" },
          knowsAbout: [
            "Osteoarthritis",
            "Anti-inflammatory diet",
            "Physiotherapy",
            "Chronic pain management",
          ],
        },
      },
      {
        id: "ld-home-breadcrumb",
        json: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
          ],
        },
      },
      {
        id: "ld-home-faq",
        json: {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is everything on this site really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Every guide, plan, and resource is free for everyone in the UK living with arthritis. We're a small charity funded entirely by donations.",
              },
            },
            {
              "@type": "Question",
              name: "Who writes and reviews the guidance?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "All clinical content is written or reviewed by HCPC-registered physiotherapists and CSP members, and aligned to NICE guidance for osteoarthritis.",
              },
            },
            {
              "@type": "Question",
              name: "Can this replace seeing my GP or physiotherapist?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Our guidance is educational and complements — never replaces — care from your GP, physiotherapist or rheumatologist.",
              },
            },
          ],
        },
      },
    ];

    scripts.forEach(({ id, json }) => {
      document.getElementById(id)?.remove();
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = id;
      el.text = JSON.stringify(json);
      document.head.appendChild(el);
    });

    return () => {
      scripts.forEach(({ id }) => document.getElementById(id)?.remove());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Living With Arthritis UK | Free, Clinically Reviewed Plan</title>
        <meta
          name="description"
          content="Interactive, clinically reviewed arthritis plan — movement, nutrition and pain-relief guidance in plain English. Free for everyone in the UK."
        />
        <link rel="canonical" href={SITE_URL + "/"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta property="og:title" content="Living With Arthritis UK | Free, Clinically Reviewed Plan" />
        <meta
          property="og:description"
          content="Tap a joint. Take the 60-second check. Get a personalised plan. Free for everyone in the UK living with arthritis."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          <HeroParallax />

          <Suspense fallback={<SectionFallback />}>
            <BodyJointPicker />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ScrollStoryStrip />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <AnimatedImpactCounters />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <QuickAssessmentQuiz />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <OAPlanPillarsSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ProgressThermometer />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <FacesStrip />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <BlogPreview />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <FAQSection />
          </Suspense>

          <DeferredMount>
            <Suspense fallback={<SectionFallback />}>
              <NewsletterSection />
              <FinalDonateBand />
            </Suspense>
          </DeferredMount>
        </main>

        <Suspense fallback={null}>
          <NextReadStrip currentPath="/" />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <BackToTopButton />
        </Suspense>
        <Suspense fallback={null}>
          <CookieBanner onAnalyticsChange={() => {}} />
        </Suspense>
        <Suspense fallback={null}>
          <StickyDonateBar />
        </Suspense>
        <Suspense fallback={null}>
          <MobileBottomCTA />
        </Suspense>
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
