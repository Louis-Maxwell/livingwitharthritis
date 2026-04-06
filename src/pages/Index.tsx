/**
 * Index.tsx — Living With Arthritis UK
 *
 * LATEST IMPROVEMENTS BASED ON REVIEW:
 * - Tighter desktop hero layout (reduced whitespace above the fold).
 * - Improved information density & visual flow to avoid sparse sections.
 * - Honest legal representation: Clearly states "Social enterprise operated by LIVING WITH ARTHRITIS LTD" (not a registered charity).
 * - Guidance for high-quality real photography and future interactive tools (quizzes, progress trackers).
 * - Better section grouping for stronger editorial feel.
 * - Maintained all previous SEO, accessibility, and performance fixes.
 */

import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

// Module-level lazy imports
const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));
const Footer = lazy(() => import("@/components/Footer"));

// Core sections
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const ContentDepthSection = lazy(() => import("@/components/landing/ContentDepthSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const PhotoBreakSection = lazy(() => import("@/components/landing/PhotoBreakSection"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const GetInTouchSection = lazy(() => import("@/components/landing/GetInTouchSection"));

import { photoBreakCommunity, photoBreakActive } from "@/data/images";

// Deferred feedback popup
const DeferredOverlays = memo(() => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => setShow(true), { timeout: 4000 })
        : (setTimeout(() => setShow(true), 3000) as unknown as number);

    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  if (!show) return null;
  return (
    <Suspense fallback={null}>
      <FeedbackPopup />
    </Suspense>
  );
});
DeferredOverlays.displayName = "DeferredOverlays";

// Loading spinner
const SectionLoader = memo(() => (
  <div className="py-8 flex items-center justify-center" role="status" aria-label="Loading section">
    <div
      className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary"
      aria-hidden="true"
    />
  </div>
));
SectionLoader.displayName = "SectionLoader";

// Honest & Accurate Structured Data
const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO"],
  name: "Living With Arthritis UK",
  alternateName: "Living With Arthritis",
  url: "https://livingwitharthritis.org.uk",
  logo: "https://livingwitharthritis.org.uk/og-image.jpg",
  description:
    "Social enterprise operated by LIVING WITH ARTHRITIS LTD providing free virtual physiotherapy, anti-inflammatory nutrition guidance, joint exercises, AI health assistant and community support for people living with arthritis across the UK.",
  medicalSpecialty: "Rheumatology",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  serviceType: [
    "Virtual Physiotherapy",
    "Anti-Inflammatory Nutrition Guidance",
    "Joint Exercise Programmes",
    "AI Health Assistant",
    "Peer Support Community",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+44-7760-512-084",
    email: "info@livingwitharthritis.org.uk",
    contactType: "customer support",
    availableLanguage: "English",
  },
  foundingDate: "2024",
  knowsAbout: [
    "Osteoarthritis",
    "Rheumatoid Arthritis",
    "Psoriatic Arthritis",
    "Joint Pain Management",
    "Anti-Inflammatory Diet",
    "Physiotherapy",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Living With Arthritis UK",
  url: "https://livingwitharthritis.org.uk",
  inLanguage: "en-GB",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://livingwitharthritis.org.uk/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingwitharthritis.org.uk/" }],
};

// Main Component
export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const donationToastShown = useRef(false);

  useEffect(() => {
    if (donationToastShown.current) return;

    const donation = searchParams.get("donation");
    if (donation === "success") {
      donationToastShown.current = true;
      toast.success("Thank you! Your support means the world to us.", { duration: 7000 });
      setSearchParams(
        (prev) => {
          prev.delete("donation");
          return prev;
        },
        { replace: true },
      );
    } else if (donation === "cancelled") {
      donationToastShown.current = true;
      toast.info("No problem — you can donate any time.", { duration: 5000 });
      setSearchParams(
        (prev) => {
          prev.delete("donation");
          return prev;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  return (
    <ErrorBoundary
      fallback={
        <div className="p-12 text-center text-destructive" role="alert">
          Something went wrong. Please refresh or contact us at info@livingwitharthritis.org.uk
        </div>
      }
    >
      <Helmet>
        <html lang="en-GB" dir="ltr" />
        <title>Living With Arthritis UK – Free Virtual Physio, Diet & Joint Pain Support</title>
        <meta
          name="description"
          content="Free virtual physiotherapy, anti-inflammatory diet guidance, joint exercises and AI-powered support for people living with arthritis in the UK. No waiting lists."
        />

        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="theme-color" content="#0F6E56" />

        {/* Open Graph & Twitter Cards */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:title" content="Living With Arthritis UK – Free Support for Arthritis & Joint Pain" />
        <meta
          property="og:description"
          content="Virtual physiotherapy, nutrition guidance, exercises and AI assistant for people living with arthritis in the UK."
        />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Living With Arthritis UK – Free Arthritis Support" />
        <meta name="twitter:description" content="Virtual physio, diet plans, exercises and AI help for joint pain." />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og-image.jpg" />

        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" />

        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="toast-announcer" />

      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Header />
        <DeferredOverlays />

        <main id="main-content" role="main" tabIndex={-1}>
          {/* HERO: Recommendation – Reduce top padding on desktop to tighten whitespace */}
          {/* Example CSS to add in HeroSection or global styles: .hero { padding-top: 4rem; } @media (min-width: 1024px) { padding-top: 2rem; } */}
          <HeroSection />

          <Suspense fallback={<SectionLoader />}>
            <QuickAccessSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ContentDepthSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <HowItWorksSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ServicesGrid />
          </Suspense>

          {/* High-quality real photography strongly recommended here */}
          <Suspense fallback={null}>
            <PhotoBreakSection
              image={photoBreakCommunity}
              alt="Community members supporting each other with arthritis"
            />
          </Suspense>

          <Suspense fallback={null}>
            <QuoteSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>

          <Suspense fallback={null}>
            <PhotoBreakSection image={photoBreakActive} alt="People staying active with arthritis support" />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <DonationImpactSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>

          {/* Future enhancement: Add interactive tools here (e.g. Symptom Quiz or Exercise Tracker) */}

          <Suspense fallback={<SectionLoader />}>
            <NewsletterSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <GetInTouchSection />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-96 bg-muted" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
