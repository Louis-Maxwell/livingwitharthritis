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

    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
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
          <OAProblemBand />
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
