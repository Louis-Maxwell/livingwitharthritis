/**
 * Living With Arthritis UK — Homepage
 *
 * Focused fundraising landing page for the open-source osteoarthritis
 * management plan. Composed from existing landing primitives + three
 * OA-specific sections (Hero, Problem Band, Plan Pillars, Ethos Band).
 *
 * Strict editorial voice. UK English. No fabricated stats beyond
 * publicly cited figures (8.75M, 1 in 6, £10bn).
 */

import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

import OAHero from "@/components/landing/OAHero";
import HeroStatsStrip from "@/components/landing/HeroStatsStrip";
import OAProblemBand from "@/components/landing/OAProblemBand";
import FacesStrip from "@/components/landing/FacesStrip";
import OAPlanPillarsSection from "@/components/landing/OAPlanPillarsSection";
import MissionStatementBand from "@/components/landing/MissionStatementBand";
import DonationImpactSection from "@/components/landing/DonationImpactSection";
import OpenSourceEthosBand from "@/components/landing/OpenSourceEthosBand";
import SEOTeaserSection from "@/components/landing/SEOTeaserSection";

const AboutArthritisCards = lazy(
  () => import("@/components/landing/AboutArthritisCards"),
);
const ResourcesForYouSection = lazy(
  () => import("@/components/landing/ResourcesForYouSection"),
);
const ConditionPillBand = lazy(
  () => import("@/components/landing/ConditionPillBand"),
);

const InspiredHeroBand = lazy(() => import("@/components/landing/InspiredHeroBand"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const BlogPreview = lazy(() => import("@/components/landing/BlogPreview"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const Footer = lazy(() => import("@/components/Footer"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));
const StickyDonateBar = lazy(() => import("@/components/landing/StickyDonateBar"));

const SITE_URL = "https://livingwitharthritis.org.uk";

const SectionFallback = () => <div className="h-32" aria-hidden="true" />;

function HomePage() {
  // JSON-LD injected manually (per project memory) to avoid Helmet crashes.
  useEffect(() => {
    const id = "ld-home-ngo";
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Living With Arthritis UK",
      url: SITE_URL,
      description:
        "An open-source osteoarthritis management plan — clinically reviewed, freely published, and made for everyone living with OA in the UK.",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Osteoarthritis",
        "Anti-inflammatory diet",
        "Physiotherapy",
        "Chronic pain management",
      ],
    });
    document.head.appendChild(script);

    // BreadcrumbList — home anchors the breadcrumb trail.
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

    // FAQPage — mirrors the FAQSection rendered below for rich results.
    const faqId = "ld-home-faq";
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
            text: "No. Our guidance is educational and complements — never replaces — care from your GP, physiotherapist or rheumatologist. Always seek medical advice for new or worsening symptoms.",
          },
        },
        {
          "@type": "Question",
          name: "How do you use my donation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Donations fund clinical reviewers, plain-English writers, and hosting so we can keep every guide free for people in the UK living with arthritis.",
          },
        },
      ],
    });
    document.head.appendChild(faqScript);

    return () => {
      [id, breadcrumbId, faqId].forEach((scriptId) => {
        const el = document.getElementById(scriptId);
        if (el) el.remove();
      });
    };
  }, []);


  return (
    <>
      <Helmet>
        <title>
          Open-Source Osteoarthritis Plan · Living With Arthritis UK
        </title>
        <meta
          name="description"
          content="Open-source osteoarthritis plan: clinically reviewed diet, movement and pain-relief guidance in plain English. Free for everyone in the UK."
        />
        <link rel="canonical" href={SITE_URL + "/"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Open-Source Osteoarthritis Plan · Living With Arthritis UK"
        />
        <meta
          property="og:description"
          content="The evidence to manage osteoarthritis well already exists. We're unlocking it — in plain English, free for everyone."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          <OAHero />
          <HeroStatsStrip />
          <OAProblemBand />

          <Suspense fallback={<SectionFallback />}>
            <AboutArthritisCards />
          </Suspense>

          <FacesStrip />
          <OAPlanPillarsSection />

          <Suspense fallback={<SectionFallback />}>
            <ResourcesForYouSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <ConditionPillBand />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <InspiredHeroBand />
          </Suspense>

          <MissionStatementBand />

          <Suspense fallback={<SectionFallback />}>
            <QuoteSection />
          </Suspense>

          <DonationImpactSection />

          <OpenSourceEthosBand />

          <SEOTeaserSection />



          <Suspense fallback={<SectionFallback />}>
            <BlogPreview />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<SectionFallback />}>
            <NewsletterSection />
          </Suspense>
        </main>

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
