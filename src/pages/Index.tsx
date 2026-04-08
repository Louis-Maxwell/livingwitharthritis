import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ErrorBoundary from "@/components/ErrorBoundary";
import ViewportSection from "@/components/ui/ViewportSection";

// ─── Below-fold lazy imports ─────────────────────────────────────────────────
const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));
const Footer = lazy(() => import("@/components/Footer"));
const ScrollProgress = lazy(() => import("@/components/ScrollProgress"));
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

// ─── Deferred overlays (idle-loaded, never blocking) ─────────────────────────
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

// ─── Lightweight section placeholder ─────────────────────────────────────────
const SectionLoader = memo(() => (
  <div className="py-8 flex items-center justify-center" role="status" aria-label="Loading section">
    <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary/30 border-t-primary" aria-hidden="true" />
  </div>
));
SectionLoader.displayName = "SectionLoader";

// ─── Structured data ─────────────────────────────────────────────────────────
const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO"],
  name: "Living With Arthritis UK",
  alternateName: "Living With Arthritis",
  url: "https://livingwitharthritis.org.uk",
  logo: "https://livingwitharthritis.org.uk/og-image.jpg",
  image: "https://livingwitharthritis.org.uk/og-image.jpg",
  description:
    "Social enterprise operated by LIVING WITH ARTHRITIS LTD providing free virtual " +
    "physiotherapy, anti-inflammatory nutrition guidance, joint exercises, AI health " +
    "assistant and community support for people living with arthritis in the UK. " +
    "HCPC registered clinicians. No waiting lists.",
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
    email: "info@livingwitharthritis.org.uk",
    contactType: "customer support",
    availableLanguage: "English",
    areaServed: "GB",
  },
  inLanguage: "en-GB",
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
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://livingwitharthritis.org.uk/",
    },
  ],
};

// ─── Page component ──────────────────────────────────────────────────────────
export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const donationToastShown = useRef(false);

  useEffect(() => {
    if (donationToastShown.current) return;
    const donation = searchParams.get("donation");
    if (donation === "success") {
      donationToastShown.current = true;
      toast.success("Thank you! Your donation means the world to us.", { duration: 7000 });
      setSearchParams((prev) => { prev.delete("donation"); return prev; }, { replace: true });
    } else if (donation === "cancelled") {
      donationToastShown.current = true;
      toast.info("No problem — your donation was cancelled. You can donate any time.", { duration: 5000 });
      setSearchParams((prev) => { prev.delete("donation"); return prev; }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const schemas = [orgSchema, websiteSchema, breadcrumbSchema];
    const scripts = schemas.map((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.textContent = JSON.stringify(schema);
      document.head.appendChild(el);
      return el;
    });
    return () => scripts.forEach((el) => el.remove());
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <div className="p-12 text-center text-destructive" role="alert">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p>
            Please refresh the page or contact us at{" "}
            <a href="mailto:info@livingwitharthritis.org.uk" className="underline">
              info@livingwitharthritis.org.uk
            </a>
          </p>
        </div>
      }
    >
      <Helmet>
        <html lang="en-GB" dir="ltr" />
        <title>Living With Arthritis UK – Free Physio, Diet Plans & Joint Pain Help</title>
        <meta
          name="description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK. No referrals or waiting lists."
        />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="application-name" content="Living With Arthritis UK" />
        <meta name="theme-color" content="#0F6E56" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Living With Arthritis UK" />
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "script-src 'self' https://js.stripe.com https://checkout.stripe.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' https://api.livingwitharthritis.org.uk https://checkout.stripe.com",
            "frame-src https://js.stripe.com https://hooks.stripe.com",
            "frame-ancestors 'none'",
            "form-action 'self'",
            "base-uri 'self'",
            "upgrade-insecure-requests",
          ].join("; ")}
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Permissions-Policy"
          content={[
            "camera=()", "microphone=()", "geolocation=()", "payment=(self)",
            "usb=()", "bluetooth=()", "accelerometer=()", "gyroscope=()",
            "magnetometer=()", "clipboard-read=()", "display-capture=()", "serial=()",
          ].join(", ")}
        />
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta httpEquiv="Cross-Origin-Resource-Policy" content="same-origin" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
        <meta property="og:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
        <meta property="og:description" content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK. No referrals or waiting lists." />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Living With Arthritis UK — free physio, diet plans and joint pain support" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LivingArthritisUK" />
        <meta name="twitter:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
        <meta name="twitter:description" content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK." />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og-image.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://checkout.stripe.com" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" />
      </Helmet>

      <a
        href="#main-content"
        className="skip-link fixed top-2 left-2 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm -translate-y-16 focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      <div aria-live="polite" aria-atomic="true" className="sr-only" id="toast-announcer" />

      <div className="min-h-screen bg-background">
        <Suspense fallback={null}>
          <ScrollProgress />
        </Suspense>

        <Header />

        <DeferredOverlays />

        <main id="main-content" role="main" tabIndex={-1}>
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

          <ViewportSection minHeight="500px">
            <Suspense fallback={<SectionLoader />}>
              <ServicesGrid />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="400px">
            <Suspense fallback={null}>
              <PhotoBreakSection
                image={photoBreakCommunity}
                alt="Community members supporting each other while living with arthritis"
                quote="No one should face arthritis alone. Together, we're changing what's possible."
                attribution="Living With Arthritis UK"
              />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="250px">
            <Suspense fallback={null}>
              <QuoteSection />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="500px">
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="500px">
            <Suspense fallback={<SectionLoader />}>
              <TestimonialsSection />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="400px">
            <Suspense fallback={null}>
              <PhotoBreakSection
                image={photoBreakActive}
                alt="Senior couple enjoying an active lifestyle supported by arthritis care"
                quote="Movement is medicine. Every step forward is a victory worth celebrating."
                attribution="Clinical Team, Living With Arthritis UK"
              />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="500px">
            <Suspense fallback={<SectionLoader />}>
              <DonationImpactSection />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="500px">
            <Suspense fallback={<SectionLoader />}>
              <FAQSection />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="300px">
            <Suspense fallback={<SectionLoader />}>
              <NewsletterSection />
            </Suspense>
          </ViewportSection>

          <ViewportSection minHeight="400px">
            <Suspense fallback={<SectionLoader />}>
              <GetInTouchSection />
            </Suspense>
          </ViewportSection>
        </main>

        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
            <h1>Living With Arthritis UK</h1>
            <p>Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK.</p>
            <p>Please enable JavaScript to use this site, or contact us at <a href="mailto:info@livingwitharthritis.org.uk">info@livingwitharthritis.org.uk</a></p>
          </div>
        </noscript>

        <Suspense fallback={<div className="h-96 bg-muted" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
