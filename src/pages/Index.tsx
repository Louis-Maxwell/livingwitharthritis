import { lazy, Suspense, memo, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import ViewportSection from "@/components/ui/ViewportSection";

const Footer = lazy(() => import("@/components/Footer"));

// Deferred overlays
const DeferredOverlays = memo(() => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(() => setShow(true), { timeout: 4000 })
      : setTimeout(() => setShow(true), 3000) as unknown as number;
    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  if (!show) return null;
  const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));
  return (
    <Suspense fallback={null}>
      <FeedbackPopup />
    </Suspense>
  );
});
DeferredOverlays.displayName = "DeferredOverlays";

// Above-fold
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));

// Below-fold
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const GetInTouchSection = lazy(() => import("@/components/landing/GetInTouchSection"));

const SectionLoader = memo(() => (
  <div className="py-8 flex items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const donation = searchParams.get("donation");
    if (donation === "success") {
      toast.success("Thank you! Your donation means a lot.", { duration: 7000 });
      setSearchParams((prev) => { prev.delete("donation"); return prev; }, { replace: true });
    } else if (donation === "cancelled") {
      toast.info("Donation cancelled.", { duration: 5000 });
      setSearchParams((prev) => { prev.delete("donation"); return prev; }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <ErrorBoundary
      fallback={<div className="p-12 text-center text-destructive">Something went wrong. Please refresh.</div>}
    >
      <Helmet>
        <title>Living With Arthritis UK – Free Physio, Diet Plans & Joint Pain Help</title>
        <meta name="description" content="Free arthritis support for people across the UK. Virtual physiotherapy, anti-inflammatory Mediterranean diet plans, joint exercises, AI health assistant and community support for osteoarthritis, rheumatoid arthritis and psoriatic arthritis." />
        <meta property="og:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
        <meta property="og:description" content="Free NHS-complementary arthritis resources for UK residents: virtual physiotherapy, Mediterranean diet plans, gentle exercises, AI chatbot and expert guidance for osteoarthritis and RA." />
        <meta name="keywords" content="arthritis UK, NHS arthritis help, joint pain relief UK, osteoarthritis help UK, rheumatoid arthritis support UK, free physiotherapy UK, anti-inflammatory diet UK, arthritis exercises UK, living with arthritis, joint pain NHS, arthritis charity UK, first contact practitioner, psoriatic arthritis UK, knee pain UK, hip arthritis UK, arthritis supplements UK, PIP arthritis disability, NICE guidelines arthritis, Mediterranean diet arthritis UK, arthritis flare up UK, arthritis treatment UK, arthritis GP referral, rheumatology NHS referral, arthritis support group UK, swimming arthritis UK, yoga arthritis UK, turmeric arthritis UK, glucosamine collagen arthritis, arthritis pain management UK, gentle exercises arthritis UK, arthritis self help tools" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Living With Arthritis",
          "alternateName": "Living With Arthritis UK",
          "url": "https://livingwitharthritis.org.uk",
          "description": "UK charity providing free virtual physiotherapy, nutrition guidance, joint exercises, AI health assistant and community support for people living with arthritis.",
          "medicalSpecialty": "Rheumatology",
          "areaServed": { "@type": "Country", "name": "United Kingdom" },
          "serviceType": ["Virtual Physiotherapy", "Nutrition Guidance", "Joint Exercise Programmes", "AI Health Assistant"],
          "contactPoint": { "@type": "ContactPoint", "telephone": "+44-7760-512-084", "email": "info@livingwitharthritis.org.uk", "contactType": "customer support", "availableLanguage": "English", "areaServed": "GB" },
          "inLanguage": "en-GB"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Living With Arthritis UK",
          "url": "https://livingwitharthritis.org.uk",
          "inLanguage": "en-GB",
          "potentialAction": {
            "@type": "SearchAction",
            "target": { "@type": "EntryPoint", "urlTemplate": "https://livingwitharthritis.org.uk/?q={search_term_string}" },
            "query-input": "required name=search_term_string"
          }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <ScrollProgress />
        <Header />
        <DeferredOverlays />

        <main id="main-content" role="main">
          <HeroSection />

          <Suspense fallback={<SectionLoader />}>
            <QuickAccessSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <HowItWorksSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ServicesGrid />
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

          <Suspense fallback={<SectionLoader />}>
            <DonationImpactSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <NewsletterSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <GetInTouchSection />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-96 bg-foreground" />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
