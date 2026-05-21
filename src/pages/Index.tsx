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
import OAProblemBand from "@/components/landing/OAProblemBand";
import CharityTrustStrip from "@/components/landing/CharityTrustStrip";
import FacesStrip from "@/components/landing/FacesStrip";
import OAPlanPillarsSection from "@/components/landing/OAPlanPillarsSection";
import MissionStatementBand from "@/components/landing/MissionStatementBand";
import DonationImpactSection from "@/components/landing/DonationImpactSection";
import OpenSourceEthosBand from "@/components/landing/OpenSourceEthosBand";

const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const BlogPreview = lazy(() => import("@/components/landing/BlogPreview"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const Footer = lazy(() => import("@/components/Footer"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));

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
        "UK arthritis charity sharing clinically-reviewed, plain-English help on diet, movement and pain relief — free for everyone living with arthritis.",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Osteoarthritis",
        "Anti-inflammatory diet",
        "Physiotherapy",
        "Chronic pain management",
      ],
    });
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          UK Arthritis Charity · Plain-English Help · Living With Arthritis
        </title>
        <meta
          name="description"
          content="UK arthritis charity sharing clinically-reviewed, plain-English help on diet, movement and pain relief — free for everyone living with arthritis."
        />
        <link rel="canonical" href={SITE_URL + "/"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="UK Arthritis Charity · Plain-English Help · Living With Arthritis"
        />
        <meta
          property="og:description"
          content="A UK arthritis charity unlocking clinically-reviewed help on diet, movement and pain relief — in plain English, free for everyone."
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          <OAHero />
          <CharityTrustStrip />
          <OAProblemBand />
          <FacesStrip />
          <OAPlanPillarsSection />
          <MissionStatementBand />

          <Suspense fallback={<SectionFallback />}>
            <QuoteSection />
          </Suspense>

          <DonationImpactSection />

          <OpenSourceEthosBand />

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
