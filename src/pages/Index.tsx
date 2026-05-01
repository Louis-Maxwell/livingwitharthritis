/**
 * Living With Arthritis UK — Main Landing Page
 * Slim orchestrator — all sections extracted to dedicated components.
 */

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

/* ─── Critical path (above the fold only) ────────────────────────────── */
import TrustBar from "@/components/landing/TrustBar";
import TriageSection from "@/components/landing/TriageSection";
import SkeletonSection from "@/components/landing/SkeletonSection";

/* ─── Lazy imports — the 5 essentials only ───────────────────────────── */
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));

const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));
const Footer = lazy(() => import("@/components/Footer"));

/* ─── Constants ─────────────────────────────────────────────────────── */
const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
const CONTACT_EMAIL = "info@livingwitharthritis.org.uk";

/* ─── Schema markup ─────────────────────────────────────────────────── */
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO"],
  name: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    "Free AI-guided physiotherapy, anti-inflammatory diet plans, and symptom tracking for people with arthritis in the UK. HCPC-registered clinicians, NICE-aligned guidance, no waiting lists.",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  medicalSpecialty: "Rheumatology",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "HCPC Registration",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: CONTACT_EMAIL,
    availableLanguage: "English",
  },
};

const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is your AI health assistant safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our AI is co-designed with HCPC-registered clinicians, fully transparent in its reasoning, and strictly compliant with UK GDPR. It guides you to appropriate NHS care — it never replaces your doctor.",
      },
    },
    {
      "@type": "Question",
      name: "How do I manage an arthritis flare-up?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Apply heat or cold to the affected joint, rest but maintain gentle movement, and contact your rheumatology team if the flare lasts more than 48 hours. See our full flare-up guide for more detail.",
      },
    },
    {
      "@type": "Question",
      name: "What exercises are good for arthritis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Low-impact exercises such as walking, swimming, cycling, and gentle yoga are recommended. Resistance band strength training also helps support and protect joints. Always consult your physiotherapist before starting a new exercise programme.",
      },
    },
    {
      "@type": "Question",
      name: "Is this service really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Living With Arthritis UK is a UK social enterprise. All tools, guides, and our AI assistant are completely free. We are funded by voluntary donations and do not show advertisements.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact Living With Arthritis UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: `Email us at ${CONTACT_EMAIL}. We reply to all enquiries within 2 business days.`,
      },
    },
  ],
};

const schemaWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en-GB",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const schemaBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
};

/* ─── Page content ──────────────────────────────────────────────────── */
function PageContent({ onAnalyticsChange }: { onAnalyticsChange: (v: boolean) => void }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const toastShown = useRef(false);
  const [analytics, setAnalyticsLocal] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lwa_cv3") || "{}").a === true;
    } catch {
      return false;
    }
  });

  const handleAnalyticsChange = (v: boolean) => {
    setAnalyticsLocal(v);
    onAnalyticsChange(v);
  };

  /* GA — only loads when analytics consent is given */
  useEffect(() => {
    if (!analytics) return;
    const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!GA_ID) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    const i = document.createElement("script");
    i.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
    document.head.appendChild(i);
  }, [analytics]);

  /* Donation toast */
  useEffect(() => {
    if (toastShown.current) return;
    const d = searchParams.get("donation");
    if (d === "success") {
      toastShown.current = true;
      toast.success("Thank you so much for your donation! Every pound makes a difference.", { duration: 6000 });
      setSearchParams(() => new URLSearchParams(), { replace: true });
    } else if (d === "cancelled") {
      toastShown.current = true;
      toast("Donation cancelled — no charge was made.", { duration: 4000 });
      setSearchParams(() => new URLSearchParams(), { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Helmet>
        <html lang="en-GB" />
        <title>Free Arthritis Support UK — NHS-Aligned Physio, Diet & AI Help | {SITE_NAME}</title>
        <meta
          name="description"
          content="Free virtual physiotherapy, anti-inflammatory meal plans and joint-safe exercises for arthritis in the UK. Built with HCPC-registered clinicians. NICE-aligned. No waiting list."
        />
        <meta
          name="keywords"
          content="arthritis support UK, free arthritis physiotherapy, rheumatoid arthritis help, osteoarthritis exercises, arthritis symptom tracker, anti-inflammatory diet arthritis, arthritis flare-up management, NHS arthritis waiting list"
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta name="geo.region" content="GB" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0f766e" />
        <link rel="alternate" hrefLang="en-GB" href={`${SITE_URL}/`} />
        <meta property="og:title" content={`Free Arthritis Support UK | ${SITE_NAME}`} />
        <meta
          property="og:description"
          content="Free AI-guided arthritis support — physiotherapy, diet plans, symptom tracking. No waiting lists. HCPC-registered clinicians."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:image" content={`${SITE_URL}/images/hero-community.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="People supported by Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Free Arthritis Support UK | ${SITE_NAME}`} />
        <meta
          name="twitter:description"
          content="Free AI-guided arthritis support — physiotherapy, diet plans, symptom tracking. No waiting lists."
        />
        <meta name="twitter:image" content={`${SITE_URL}/images/hero-community.jpg`} />
        {/* preconnect/dns-prefetch already in index.html — no duplicates */}
        <style>{`
          html { scroll-padding-top: 1rem; }
          body { font-size: 17px; line-height: 1.7; -webkit-font-smoothing: antialiased; }
          *:focus-visible { outline: 2px solid hsl(var(--primary)); outline-offset: 2px; }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
          }
          @media print { nav, footer, .cookie-banner { display: none !important; } }
        `}</style>
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaWebsite)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
      </Helmet>

      {/* Skip link */}
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[9999] bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm -translate-y-20 focus:translate-y-0 transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-background text-foreground antialiased">
        {/* Ambient background blobs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-violet/5 blur-[100px]" />
        </div>

        <ScrollProgress />
        <Header />
        <TrustBar />

        <main id="main-content" role="main" tabIndex={-1}>
          <HeroSection />
          <TriageSection />

          <Suspense fallback={<SkeletonSection />}>
            <QuickAccessSection />
          </Suspense>

          <Suspense fallback={<SkeletonSection />}>
            <HowItWorksSection />
          </Suspense>

          <Suspense fallback={<SkeletonSection />}>
            <TestimonialsSection />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <BackToTopButton />
        </Suspense>
        <Suspense fallback={null}>
          <CookieBanner onAnalyticsChange={handleAnalyticsChange} />
        </Suspense>

        <noscript>
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              fontFamily: "Georgia, serif",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <h1 style={{ color: "hsl(350 100% 45%)" }}>Living With Arthritis UK</h1>
            <p>
              This site works best with JavaScript enabled. Please enable it, or contact us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "hsl(350 100% 45%)" }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </noscript>

        <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

/* ─── Root export ───────────────────────────────────────────────────── */
export default function Index() {
  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center p-12 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-muted-foreground mb-6">
              Please refresh the page. If the problem persists, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Refresh page
            </button>
          </div>
        </div>
      }
    >
      <PageContent onAnalyticsChange={() => {}} />
    </ErrorBoundary>
  );
}
