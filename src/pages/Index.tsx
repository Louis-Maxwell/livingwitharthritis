import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

// ─── Module-level lazy imports [F-1 FIXED] ───────────────────────────────────
const FeedbackPopup    = lazy(() => import("@/components/FeedbackPopup"));
const Footer           = lazy(() => import("@/components/Footer"));

const QuickAccessSection    = lazy(() => import("@/components/landing/QuickAccessSection"));
const ContentDepthSection   = lazy(() => import("@/components/landing/ContentDepthSection"));
const HowItWorksSection     = lazy(() => import("@/components/landing/HowItWorksSection"));
const ServicesGrid          = lazy(() => import("@/components/ServicesGrid"));
const PhotoBreakSection     = lazy(() => import("@/components/landing/PhotoBreakSection"));
const QuoteSection          = lazy(() => import("@/components/landing/QuoteSection"));
const AboutSection          = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection   = lazy(() => import("@/components/landing/TestimonialsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const FAQSection            = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection     = lazy(() => import("@/components/landing/NewsletterSection"));
const GetInTouchSection     = lazy(() => import("@/components/landing/GetInTouchSection"));

import { photoBreakCommunity, photoBreakActive } from "@/data/images";

// ─── Security: CSP nonce would be injected server-side. ──────────────────────
const CSP_NONCE = "rAnd0m-n0nc3-v4lu3";

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

// ─── Section loading spinner (accessible) ────────────────────────────────────
const SectionLoader = memo(() => (
  <div
    className="py-8 flex items-center justify-center"
    role="status"
    aria-label="Loading section"
  >
    <div
      className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary"
      aria-hidden="true"
    />
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
      urlTemplate:
        "https://livingwitharthritis.org.uk/search?q={search_term_string}",
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
      toast.success("Thank you! Your donation means the world to us.", {
        duration: 7000,
      });
      setSearchParams(
        (prev) => { prev.delete("donation"); return prev; },
        { replace: true },
      );
    } else if (donation === "cancelled") {
      donationToastShown.current = true;
      toast.info(
        "No problem — your donation was cancelled. You can donate any time.",
        { duration: 5000 },
      );
      setSearchParams(
        (prev) => { prev.delete("donation"); return prev; },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams]);

  return (
    <ErrorBoundary
      fallback={
        <div className="p-12 text-center text-destructive" role="alert">
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p>
            Please refresh the page or contact us at{" "}
            <a
              href="mailto:info@livingwitharthritis.org.uk"
              className="underline"
            >
              info@livingwitharthritis.org.uk
            </a>
          </p>
        </div>
      }
    >
      <Helmet>
        <html lang="en-GB" dir="ltr" />
        <title>
          Living With Arthritis UK – Free Physio, Diet Plans &amp; Joint Pain
          Help
        </title>
        <meta
          name="description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK. No referrals or waiting lists."
        />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />

        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />

        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />

        <meta name="application-name" content="Living With Arthritis UK" />
        <meta name="theme-color" content="#0F6E56" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Living With Arthritis UK"
        />

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
        <meta
          name="referrer"
          content="strict-origin-when-cross-origin"
        />

        <meta
          httpEquiv="Permissions-Policy"
          content={[
            "camera=()",
            "microphone=()",
            "geolocation=()",
            "payment=(self)",
            "usb=()",
            "bluetooth=()",
            "accelerometer=()",
            "gyroscope=()",
            "magnetometer=()",
            "clipboard-read=()",
            "display-capture=()",
            "serial=()",
          ].join(", ")}
        />

        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta httpEquiv="Cross-Origin-Resource-Policy" content="same-origin" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta
          property="og:site_name"
          content="Living With Arthritis UK"
        />
        <meta
          property="og:url"
          content="https://livingwitharthritis.org.uk/"
        />
        <meta
          property="og:title"
          content="Living With Arthritis UK – Free Physio, Diet &amp; Joint Pain Help"
        />
        <meta
          property="og:description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK. No referrals or waiting lists."
        />
        <meta
          property="og:image"
          content="https://livingwitharthritis.org.uk/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Living With Arthritis UK — free physio, diet plans and joint pain support"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LivingArthritisUK" />
        <meta
          name="twitter:title"
          content="Living With Arthritis UK – Free Physio, Diet &amp; Joint Pain Help"
        />
        <meta
          name="twitter:description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK."
        />
        <meta
          name="twitter:image"
          content="https://livingwitharthritis.org.uk/og-image.jpg"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://checkout.stripe.com" />

        <link
          rel="preload"
          as="image"
          href="/images/hero.webp"
          type="image/webp"
        />

        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <a
        href="#main-content"
        className="
          skip-link
          fixed top-2 left-2 z-[9999]
          bg-primary text-primary-foreground
          px-4 py-2 rounded-md font-semibold text-sm
          -translate-y-16 focus:translate-y-0
          transition-transform duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        "
      >
        Skip to main content
      </a>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="toast-announcer"
      />

      <div
        className="
          min-h-screen bg-background
          [--colour-teal:#0F6E56] [--colour-coral:#E8633A]
          [--colour-lavender:#7C5CBF] [--colour-amber:#F5A623]
          [--colour-sky:#2A9ED8] [--colour-rose:#D94F70]
        "
      >
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
          <div
            className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #0F6E56, transparent 70%)" }}
          />
          <div
            className="absolute -top-24 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #E8633A, transparent 70%)" }}
          />
          <div
            className="absolute top-1/3 -left-64 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #7C5CBF, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #2A9ED8, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #F5A623, transparent 70%)" }}
          />
        </div>

        <ScrollProgress />
        <Header />
        <DeferredOverlays />

        <main id="main-content" role="main" tabIndex={-1}>
          <HeroSection />

          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #0F6E56 0%, #2A9ED8 33%, #7C5CBF 66%, #E8633A 100%)",
            }}
          />

          <Suspense fallback={<SectionLoader />}>
            <QuickAccessSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ContentDepthSection />
          </Suspense>

          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #7C5CBF 0%, #2A9ED8 50%, #0F6E56 100%)",
            }}
          />

          <Suspense fallback={<SectionLoader />}>
            <HowItWorksSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ServicesGrid />
          </Suspense>

          <Suspense fallback={null}>
            <PhotoBreakSection
              image={photoBreakCommunity}
              alt="Community members supporting each other while living with arthritis"
              quote="No one should face arthritis alone. Together, we're changing what's possible."
              attribution="Living With Arthritis UK"
            />
          </Suspense>

          <Suspense fallback={null}>
            <QuoteSection />
          </Suspense>

          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #E8633A 0%, #F5A623 50%, #D94F70 100%)",
            }}
          />

          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>

          <Suspense fallback={null}>
            <PhotoBreakSection
              image={photoBreakActive}
              alt="Senior couple enjoying an active lifestyle supported by arthritis care"
              quote="Movement is medicine. Every step forward is a victory worth celebrating."
              attribution="Clinical Team, Living With Arthritis UK"
            />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <DonationImpactSection />
          </Suspense>

          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, #0F6E56, #2A9ED8, #7C5CBF, #D94F70, #F5A623)",
            }}
          />

          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <NewsletterSection />
          </Suspense>

          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #0F6E56 0%, #2A9ED8 100%)",
            }}
          />

          <Suspense fallback={<SectionLoader />}>
            <GetInTouchSection />
          </Suspense>
        </main>

        <noscript>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              fontFamily: "sans-serif",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h1>Living With Arthritis UK</h1>
            <p>
              Free physiotherapy, anti-inflammatory diet plans, evidence-based
              exercises and 24/7 support for arthritis and joint pain in the
              UK. No referrals or waiting lists.
            </p>
            <p>
              Please enable JavaScript to use this site, or contact us at{" "}
              <a href="mailto:info@livingwitharthritis.org.uk">
                info@livingwitharthritis.org.uk
              </a>
            </p>
            <p>
              <em>
                Operated by LIVING WITH ARTHRITIS LTD (social enterprise).
              </em>
            </p>
          </div>
        </noscript>

        <Suspense
          fallback={<div className="h-96 bg-muted" aria-hidden="true" />}
        >
          <Footer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
