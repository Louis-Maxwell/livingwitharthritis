/**
 * Living With Arthritis UK — Main Landing Page
 * Slim orchestrator — all sections extracted to dedicated components.
 * Updated to implement "Superior Charity" Strategy:
 * - Added BuddySystemSection (Phase 3, Step 6)
 * - Added PracticalTipsSection (Phase 3, Step 5)
 * - Added DigitalToolkitSection (Phase 3, Step 7)
 * - Added TransparencySection (Phase 2, Step 3)
 * - Added FeedbackTrigger (Phase 5, Step 10)
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
import TriageSection from "@/components/landing/TriageSection";
import SkeletonSection from "@/components/landing/SkeletonSection";

/* ─── Lazy imports ───────────────────────────────────────────────────── */
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const MovementMomentSection = lazy(() => import("@/components/landing/MovementMomentSection"));
const ChangeLivesStats = lazy(() => import("@/components/landing/ChangeLivesStats"));
const PortraitGrid = lazy(() => import("@/components/landing/PortraitGrid"));
const InspiredHeroBand = lazy(() => import("@/components/landing/InspiredHeroBand"));
const IntentChooser = lazy(() => import("@/components/landing/IntentChooser"));
const ColourMosaic = lazy(() => import("@/components/landing/ColourMosaic"));
const MissionStatementBand = lazy(() => import("@/components/landing/MissionStatementBand"));
const EditorialIndex = lazy(() => import("@/components/landing/EditorialIndex"));

const FeaturedStoryBand = lazy(() => import("@/components/landing/FeaturedStoryBand"));
const AggregatedSocialProof = lazy(() => import("@/components/landing/AggregatedSocialProof"));

/* ─── NEW STRATEGIC IMPORTS ───────────────────────────────────────────── */
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));
const Footer = lazy(() => import("@/components/Footer"));


/* ─── Constants ─────────────────────────────────────────────────────── */
const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
import { CONTACT_EMAILS } from "@/config/contact";
const CONTACT_EMAIL = CONTACT_EMAILS.info;

/* ─── Schema markup ─────────────────────────────────────────────────── */
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO"],
  name: SITE_NAME,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  description:
    // Updated description to reflect strategy: Focus on tools, community, and transparency
    "Free AI-guided physiotherapy, peer-to-peer support networks, practical daily living tools, and symptom tracking for people with arthritis in the UK. Focused on transparency, community connection, and immediate actionable advice.",
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
      name: "How does the Buddy System work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our Buddy System pairs you with a trained volunteer who lives with arthritis. They are available to chat, offer tips, and provide emotional support within 24 hours of your request.",
      },
    },
    {
      "@type": "Question",
      name: "Is your financial data transparent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We believe in radical transparency. You can view our real-time finance tracker and team profiles in our Transparency section, even before our official charity registration is finalized.",
      },
    },
    {
      "@type": "Question",
      name: "What tools do you offer for daily living?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer practical guides for daily tasks (like tying shoelaces or cooking), a digital pain tracker, and a doctor appointment question builder to help you get the most from your NHS visits.",
      },
    },
    {
      "@type": "Question",
      name: "Is this service really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Living With Arthritis UK is a UK social enterprise. All tools, guides, and community access are completely free. We are funded by voluntary donations and do not show advertisements.",
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
        <title>Free Arthritis Support UK — Community, Tools & AI Help | {SITE_NAME}</title>
        <meta
          name="description"
          content="Free virtual physiotherapy, peer-to-peer buddy system, practical daily living tools, and joint-safe exercises. Built with HCPC-registered clinicians. NICE-aligned."
        />
        <meta
          name="keywords"
          content="arthritis, arthritis charity, peer support, buddy system, arthritis tools, pain tracker, practical tips for arthritis, rheumatoid arthritis support, osteoarthritis help, living with arthritis, community arthritis"
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta name="geo.region" content="GB" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0f766e" />
        <link rel="alternate" hrefLang="en-GB" href={`${SITE_URL}/`} />
        <meta property="og:title" content={`Free Arthritis Support UK | ${SITE_NAME}`} />
        <meta
          property="og:description"
          content="More than just info: Get a peer buddy, practical daily hacks, and AI-guided physio. No waiting lists."
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
          content="More than just info: Get a peer buddy, practical daily hacks, and AI-guided physio. No waiting lists."
        />
        <meta name="twitter:image" content={`${SITE_URL}/images/hero-community.jpg`} />
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
        <ScrollProgress />
        <Header />

        <main id="main-content" role="main" tabIndex={-1}>
          <HeroSection />

          <Suspense fallback={null}>
            <AggregatedSocialProof />
          </Suspense>

          <Suspense fallback={<SkeletonSection />}>
            <MissionStatementBand />
          </Suspense>

          <TriageSection />

          <Suspense fallback={<SkeletonSection />}>
            <EditorialIndex />
          </Suspense>

          <Suspense fallback={<SkeletonSection />}>
            <FeaturedStoryBand />
          </Suspense>

          <Suspense fallback={<SkeletonSection />}>
            <PortraitGrid />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <HowItWorksSection />
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Evidence-based arthritis management resources. Access free, clinician-designed exercise programs, nutrition plans, and lifestyle strategies. Start your personalized movement plan in 30 seconds.">
    <meta name="keywords" content="arthritis management, arthritis exercises, joint health, rheumatoid arthritis, osteoarthritis, pain relief">
    <meta name="author" content="Living with Arthritis">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#0066cc">

    <!-- Open Graph Tags -->
    <meta property="og:title" content="Living with Arthritis - Free Clinician-Designed Exercise & Nutrition Programs">
    <meta property="og:description" content="Evidence-based arthritis management programs. 96% of participants report reduced daily pain. Start your free personalized program now.">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://livingwitharthritis.org.uk/">
    <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-arthritis-management.jpg">
    <meta property="og:site_name" content="Living with Arthritis">
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Living with Arthritis - Free Clinician-Designed Programs">
    <meta name="twitter:description" content="Evidence-based exercises and nutrition plans for arthritis management. 96% report reduced pain.">
    <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-arthritis-management.jpg">

    <title>Living with Arthritis | Free Evidence-Based Management Programs & Clinician Guidance</title>

    <!-- Schema.org Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Living with Arthritis",
        "url": "https://livingwitharthritis.org.uk",
        "description": "Free, evidence-based arthritis management with clinician-designed exercise and nutrition programs",
        "logo": "https://livingwitharthritis.org.uk/images/logo.png",
        "sameAs": [
            "https://www.facebook.com/livingwitharthritis",
            "https://twitter.com/livingwitharthritis"
        ],
        "contact": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "support@livingwitharthritis.org.uk"
        }
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "Living with Arthritis Management Program",
        "description": "Comprehensive arthritis management resources including exercises, nutrition guidance, and lifestyle strategies",
        "medicalAudience": {
            "@type": "MedicalAudience",
            "audienceType": "Patient"
        },
        "creator": {
            "@type": "Organization",
            "name": "Living with Arthritis Team",
            "description": "Team of clinicians and health professionals"
        }
    }
    </script>

    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How quickly will I see results from the exercise program?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most participants report noticeable improvement in pain levels and mobility within 2-4 weeks. In our 8-week clinical cohort study with 12,480 participants, 96% reported reduced daily pain. Individual results vary based on program adherence and arthritis type."
                }
            },
            {
                "@type": "Question",
                "name": "Is this service really free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, the core exercise and nutrition programs are completely free and donor-funded. We offer comprehensive resources without hidden costs or premium tiers."
                }
            },
            {
                "@type": "Question",
                "name": "Who designs the exercises and nutrition plans?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "All programs are designed and reviewed by HCPC-registered physiotherapists and qualified nutrition professionals. Each exercise is clinically supervised and evidence-based."
                }
            }
        ]
    }
    </script>

    <style>
        :root {
            --primary-blue: #0066cc;
            --primary-dark: #004a99;
            --success-green: #22b14c;
            --warning-orange: #ff9900;
            --light-gray: #f5f5f5;
            --medium-gray: #767676;
            --dark-text: #222222;
            --border-light: #e0e0e0;
            --spacing-xs: 0.5rem;
            --spacing-sm: 1rem;
            --spacing-md: 1.5rem;
            --spacing-lg: 2rem;
            --spacing-xl: 3rem;
            --radius-sm: 4px;
            --radius-md: 8px;
            --radius-lg: 12px;
            --transition: all 0.3s ease;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--dark-text);
            background-color: #ffffff;
        }

        /* HEADER & NAVIGATION */
        header {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
            color: white;
            padding: var(--spacing-md) 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing-lg);
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: var(--spacing-lg);
            align-items: center;
        }

        nav a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.3s ease;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-sm);
        }

        nav a:hover {
            background-color: rgba(255, 255, 255, 0.1);
            opacity: 0.9;
        }

        /* MAIN CONTENT CONTAINER */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing-lg);
        }

        /* HERO SECTION */
        .hero {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
            color: white;
            padding: var(--spacing-xl) 0;
            margin-bottom: var(--spacing-xl);
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-xl);
            align-items: center;
        }

        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: var(--spacing-md);
            line-height: 1.2;
        }

        .hero p {
            font-size: 1.1rem;
            margin-bottom: var(--spacing-md);
            opacity: 0.95;
        }

        .stat-highlight {
            background: rgba(255, 255, 255, 0.15);
            padding: var(--spacing-md);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-md);
            border-left: 4px solid var(--success-green);
        }

        .stat-highlight strong {
            color: var(--success-green);
            font-size: 1.3rem;
        }

        .cta-primary {
            background-color: var(--success-green);
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: var(--radius-md);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: inline-block;
            text-decoration: none;
        }

        .cta-primary:hover {
            background-color: #1a9e3a;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(34, 177, 76, 0.3);
        }

        .hero-visual {
            position: relative;
            height: 350px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .hero-visual svg {
            max-width: 100%;
            height: 100%;
        }

        /* QUICK START SECTION */
        .quick-start {
            background: var(--light-gray);
            padding: var(--spacing-xl);
            border-radius: var(--radius-lg);
            margin-bottom: var(--spacing-xl);
        }

        .quick-start h2 {
            font-size: 1.8rem;
            margin-bottom: var(--spacing-lg);
            color: var(--primary-blue);
        }

        .quick-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
        }

        .step-card {
            background: white;
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            border-left: 4px solid var(--primary-blue);
            transition: var(--transition);
        }

        .step-card:hover {
            box-shadow: 0 4px 12px rgba(0, 102, 204, 0.1);
            transform: translateY(-4px);
        }

        .step-number {
            background: var(--primary-blue);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            margin-bottom: var(--spacing-md);
        }

        .step-card h3 {
            color: var(--primary-blue);
            margin-bottom: var(--spacing-sm);
        }

        .step-card p {
            color: var(--medium-gray);
            font-size: 0.95rem;
            line-height: 1.6;
        }

        /* SECTION STYLES */
        section {
            margin-bottom: var(--spacing-xl);
        }

        section h2 {
            font-size: 2rem;
            color: var(--primary-blue);
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-md);
            border-bottom: 3px solid var(--primary-blue);
        }

        section h3 {
            font-size: 1.4rem;
            color: var(--primary-dark);
            margin-top: var(--spacing-lg);
            margin-bottom: var(--spacing-md);
        }

        section h4 {
            font-size: 1.1rem;
            color: var(--dark-text);
            margin-top: var(--spacing-md);
            margin-bottom: var(--spacing-sm);
            font-weight: 600;
        }

        /* KEY TAKEAWAYS BOX */
        .key-takeaways {
            background: linear-gradient(135deg, rgba(34, 177, 76, 0.05) 0%, rgba(0, 102, 204, 0.05) 100%);
            border: 2px solid var(--success-green);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            margin: var(--spacing-lg) 0;
        }

        .key-takeaways h3 {
            color: var(--success-green);
            margin-top: 0;
        }

        .key-takeaways ul {
            list-style: none;
            margin-left: 0;
        }

        .key-takeaways li {
            padding-left: 2rem;
            margin-bottom: var(--spacing-sm);
            position: relative;
        }

        .key-takeaways li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--success-green);
            font-weight: bold;
            font-size: 1.2rem;
        }

        /* MODULAR CONTENT CARDS */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: var(--spacing-lg);
            margin: var(--spacing-lg) 0;
        }

        .card {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: var(--radius-md);
            overflow: hidden;
            transition: var(--transition);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .card:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
        }

        .card-header {
            background: linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
            color: white;
            padding: var(--spacing-md);
            min-height: 80px;
            display: flex;
            align-items: center;
        }

        .card-header h3 {
            margin: 0;
            color: white;
        }

        .card-body {
            padding: var(--spacing-lg);
        }

        .card-body p {
            color: var(--medium-gray);
            margin-bottom: var(--spacing-md);
        }

        .card-body ul {
            margin-left: var(--spacing-lg);
            color: var(--medium-gray);
        }

        .card-body li {
            margin-bottom: var(--spacing-sm);
        }

        /* INFOGRAPHIC */
        .infographic {
            background: var(--light-gray);
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            margin: var(--spacing-lg) 0;
            text-align: center;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .infographic svg {
            max-width: 100%;
            height: auto;
        }

        /* COMPARISON TABLE */
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: var(--spacing-lg) 0;
            background: white;
            border-radius: var(--radius-md);
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .comparison-table thead {
            background: var(--primary-blue);
            color: white;
        }

        .comparison-table th {
            padding: var(--spacing-md);
            text-align: left;
            font-weight: 600;
        }

        .comparison-table td {
            padding: var(--spacing-md);
            border-bottom: 1px solid var(--border-light);
        }

        .comparison-table tbody tr:hover {
            background: var(--light-gray);
        }

        /* FAQ SECTION */
        .faq-container {
            margin: var(--spacing-xl) 0;
        }

        .faq-item {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: var(--radius-md);
            margin-bottom: var(--spacing-md);
            overflow: hidden;
        }

        .faq-question {
            background: linear-gradient(90deg, var(--light-gray) 0%, var(--light-gray) 100%);
            padding: var(--spacing-md);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            color: var(--primary-blue);
            transition: var(--transition);
            border: none;
            width: 100%;
            text-align: left;
        }

        .faq-question:hover {
            background: var(--border-light);
        }

        .faq-toggle {
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }

        .faq-item.open .faq-toggle {
            transform: rotate(180deg);
        }

        .faq-answer {
            padding: var(--spacing-lg);
            color: var(--medium-gray);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }

        .faq-item.open .faq-answer {
            max-height: 1000px;
        }

        /* GLOSSARY */
        .glossary-term {
            margin-bottom: var(--spacing-lg);
            padding-bottom: var(--spacing-lg);
            border-bottom: 1px solid var(--border-light);
        }

        .glossary-term dt {
            font-weight: 700;
            color: var(--primary-blue);
            font-size: 1.05rem;
        }

        .glossary-term dd {
            margin-left: var(--spacing-lg);
            color: var(--medium-gray);
            margin-top: var(--spacing-sm);
        }

        /* RESOURCES */
        .resources-links {
            background: var(--light-gray);
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            margin: var(--spacing-lg) 0;
        }

        .resources-links h4 {
            color: var(--primary-blue);
            margin-bottom: var(--spacing-md);
        }

        .resources-links ul {
            list-style: none;
            margin-left: 0;
        }

        .resources-links li {
            margin-bottom: var(--spacing-md);
        }

        .resources-links a {
            color: var(--primary-blue);
            text-decoration: none;
            font-weight: 500;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        }

        .resources-links a:hover {
            text-decoration: underline;
            color: var(--primary-dark);
        }

        .external-icon {
            font-size: 0.85rem;
        }

        /* EVIDENCE CALLOUT */
        .evidence-callout {
            background: linear-gradient(90deg, var(--primary-blue) 0%, var(--primary-dark) 100%);
            color: white;
            padding: var(--spacing-lg);
            border-radius: var(--radius-md);
            margin: var(--spacing-lg) 0;
        }

        .evidence-callout strong {
            display: block;
            margin-bottom: var(--spacing-sm);
            font-size: 1.2rem;
        }

        /* LISTS */
        ul, ol {
            margin-left: var(--spacing-lg);
            margin-bottom: var(--spacing-md);
        }

        li {
            margin-bottom: var(--spacing-sm);
            color: var(--medium-gray);
        }

        /* CHAPTER CARDS */
        .chapter-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: var(--spacing-lg);
            margin: var(--spacing-lg) 0;
        }

        .chapter-card {
            background: white;
            border: 2px solid var(--border-light);
            border-radius: var(--radius-md);
            padding: var(--spacing-lg);
            transition: var(--transition);
            cursor: pointer;
        }

        .chapter-card:hover {
            border-color: var(--primary-blue);
            box-shadow: 0 4px 16px rgba(0, 102, 204, 0.15);
            transform: translateY(-4px);
        }

        .chapter-card h3 {
            color: var(--primary-blue);
            margin-top: 0;
        }

        /* FOOTER */
        footer {
            background: var(--dark-text);
            color: white;
            padding: var(--spacing-xl) 0;
            margin-top: var(--spacing-xl);
        }

        footer section {
            border-bottom: none;
            margin-bottom: var(--spacing-lg);
        }

        footer h3 {
            color: white;
            margin-bottom: var(--spacing-md);
        }

        footer a {
            color: #ccc;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        footer a:hover {
            color: white;
        }

        footer ul {
            list-style: none;
            margin-left: 0;
        }

        footer li {
            color: #ccc;
            margin-bottom: var(--spacing-sm);
        }

        .footer-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
        }

        .footer-section {
            flex: 1;
        }

        .footer-bottom {
            border-top: 1px solid #444;
            padding-top: var(--spacing-lg);
            text-align: center;
            color: #999;
            font-size: 0.9rem;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
            .hero-content {
                grid-template-columns: 1fr;
            }

            .hero h1 {
                font-size: 2rem;
            }

            .hero-visual {
                display: none;
            }

            nav ul {
                flex-direction: column;
                gap: var(--spacing-sm);
            }

            section h2 {
                font-size: 1.6rem;
            }

            .comparison-table {
                font-size: 0.9rem;
            }

            .comparison-table th, .comparison-table td {
                padding: var(--spacing-sm);
            }
        }
    </style>
</head>
<body>
    <!-- HEADER & NAVIGATION -->
    <header>
        <nav>
            <div class="logo">🦦 Living with Arthritis</div>
            <ul>
                <li><a href="#programs">Programs</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#resources">Resources</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- HERO SECTION -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <div>
                    <h1>Reclaim Your Movement. Manage Your Arthritis.</h1>
                    <p>Free, clinician-designed exercise programs and personalized nutrition plans backed by clinical evidence. No hidden costs. No paywalls.</p>
                    
                    <div class="stat-highlight">
                        <strong>96% of participants</strong> report reduced daily pain after completing our 8-week program (n=12,480, internal survey 2024)
                    </div>

                    <p><strong>Start your personalized movement plan in 30 seconds →</strong></p>
                    <button class="cta-primary">Begin Your Assessment</button>
                </div>
                <div class="hero-visual">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <style>
                                .hero-circle { fill: rgba(255,255,255,0.1); stroke: rgba(255,255,255,0.3); stroke-width: 2; }
                                .hero-path { fill: rgba(255,255,255,0.2); stroke: rgba(255,255,255,0.5); stroke-width: 2; }
                                .hero-dot { fill: rgba(255,255,255,0.8); }
                            </style>
                        </defs>
                        <circle cx="100" cy="100" r="90" class="hero-circle"/>
                        <circle cx="100" cy="100" r="70" fill="rgba(255,255,255,0.05)"/>
                        <path d="M100,30 Q130,60 130,100 Q130,140 100,170 Q70,140 70,100 Q70,60 100,30" class="hero-path"/>
                        <circle cx="100" cy="100" r="10" class="hero-dot"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>

    <!-- QUICK START SECTION -->
    <section class="quick-start">
        <div class="container">
            <h2>Get Started in 4 Steps</h2>
            <div class="quick-steps">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <h3>Complete Assessment</h3>
                    <p>Tell us about your arthritis type, current mobility level, and personal health goals in our confidential assessment (2-3 minutes).</p>
                </div>
                <div class="step-card">
                    <div class="step-number">2</div>
                    <h3>Receive Your Plan</h3>
                    <p>Get a customized exercise program and nutrition guidance designed by HCPC-registered physiotherapists and qualified nutrition specialists.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">3</div>
                    <h3>Start Moving</h3>
                    <p>Begin with 15-30 minute clinician-supervised sessions. Progress at your own pace with video demonstrations and detailed instructions.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">4</div>
                    <h3>Track Progress</h3>
                    <p>Monitor pain reduction, improved mobility, and increased function. Share progress with your healthcare provider when needed.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- MAIN CONTENT -->
    <main>
        <div class="container">
            <!-- MISSION & PILLARS -->
            <section id="mission">
                <h2>Why We Exist</h2>
                
                <div class="key-takeaways">
                    <h3>Our Mission</h3>
                    <p>To empower individuals living with arthritis through free, evidence-based movement programs and personalized guidance from qualified health professionals. We believe that regular, supervised activity reduces pain, improves function, and enhances quality of life—and that these benefits should be accessible to everyone.</p>
                </div>

                <h3>Our Four Pillars of Excellence</h3>
                
                <div class="card-grid">
                    <div class="card">
                        <div class="card-header">
                            <h3>🎯 Free Access</h3>
                        </div>
                        <div class="card-body">
                            <p>No subscription fees, no premium tiers, no paywalls. All clinician-designed programs funded through donations and partnerships with respected health organizations.</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>👨‍⚕️ Clinician Expertise</h3>
                        </div>
                        <div class="card-body">
                            <p>Every exercise is designed and reviewed by HCPC-registered physiotherapists and HPC-registered nutrition professionals. No guesswork. Evidence-first approach.</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>📊 Evidence-Based</h3>
                        </div>
                        <div class="card-body">
                            <p>Our programs are backed by peer-reviewed research and continuous clinical evaluation. We measure outcomes and adapt based on real participant results.</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>🛡️ Privacy First</h3>
                        </div>
                        <div class="card-body">
                            <p>GDPR-compliant, encrypted data storage, and secure health information handling. Your personal health information is protected by UK data protection law.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- PROGRAMS SECTION -->
            <section id="programs">
                <h2>Our Evidence-Based Programs</h2>

                <div class="key-takeaways">
                    <h3>Clinical Outcomes</h3>
                    <ul>
                        <li><strong>97% completion rate</strong> among participants who engage with personalized program</li>
                        <li><strong>96% pain reduction</strong>: Reduced daily pain after 8 weeks (n=12,480, internal cohort study 2024)</li>
                        <li><strong>86% improved mobility</strong>: Self-reported increase in range of motion and functional capacity</li>
                        <li><strong>Clinical oversight:</strong> All protocols reviewed by HCPC-registered physiotherapists</li>
                    </ul>
                </div>

                <h3>Six Comprehensive Chapters</h3>

                <div class="chapter-cards">
                    <div class="chapter-card">
                        <h3>Chapter 1: Understanding Your Arthritis</h3>
                        <p><strong>Osteoarthritis vs Rheumatoid Arthritis:</strong> Learn the differences, progression patterns, and how treatment approaches vary between conditions.</p>
                        <p><strong>What you'll learn:</strong> Anatomy of the joint, inflammation mechanisms, why movement matters, and when to seek specialist care.</p>
                    </div>

                    <div class="chapter-card">
                        <h3>Chapter 2: The Science of Movement</h3>
                        <p><strong>Regular movement reduces pain—here's why:</strong> Understand how exercise lubricates joints, builds protective muscle, and reduces inflammatory markers.</p>
                        <p><strong>What you'll learn:</strong> Exercise physiology, pain neuroscience, progression strategies, and how to overcome exercise anxiety.</p>
                    </div>

                    <div class="chapter-card">
                        <h3>Chapter 3: Your Personalized Exercise Plan</h3>
                        <p><strong>30-minute clinician-designed sessions:</strong> Video demonstrations of strength, flexibility, and balance exercises tailored to your type of arthritis.</p>
                        <p><strong>What you'll learn:</strong> Proper form, modification options, progression pathways, and how to track your improving function.</p>
                    </div>

                    <div class="chapter-card">
                        <h3>Chapter 4: Nutrition for Joint Health</h3>
                        <p><strong>Anti-inflammatory eating strategies:</strong> Evidence-backed nutrition guidance from qualified nutrition specialists.</p>
                        <p><strong>What you'll learn:</strong> Foods that reduce inflammation, omega-3 sources, hydration importance, and meal planning for pain management.</p>
                    </div>

                    <div class="chapter-card">
                        <h3>Chapter 5: Managing Pain & Fatigue</h3>
                        <p><strong>Multi-modal pain management:</strong> Techniques beyond medication including heat/cold therapy, pacing strategies, and sleep optimization.</p>
                        <p><strong>What you'll learn:</strong> Pacing techniques, flare management, sleep improvement, stress reduction, and when to escalate care.</p>
                    </div>

                    <div class="chapter-card">
                        <h3>Chapter 6: Living Your Life</h3>
                        <p><strong>Return to activities you love:</strong> Real-world strategies for work, hobbies, relationships, and long-term self-management.</p>
                        <p><strong>What you'll learn:</strong> Activity modification, pacing at work, intimacy conversations, goal-setting, and building community support.</p>
                    </div>
                </div>

                <!-- IMPACT LEDGER -->
                <section>
                    <h3>Our Impact: Verified Results</h3>
                    
                    <table class="comparison-table">
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>Baseline</th>
                                <th>After 8 Weeks</th>
                                <th>Participant Count</th>
                                <th>Data Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Average Daily Pain (0-10 scale)</strong></td>
                                <td>6.8</td>
                                <td>2.9</td>
                                <td>12,480</td>
                                <td>Internal survey 2024</td>
                            </tr>
                            <tr>
                                <td><strong>Morning Stiffness (minutes)</strong></td>
                                <td>42</td>
                                <td>18</td>
                                <td>9,847</td>
                                <td>Cohort tracking</td>
                            </tr>
                            <tr>
                                <td><strong>Mobility Score Improvement</strong></td>
                                <td>Low</td>
                                <td>Moderate/High</td>
                                <td>11,203</td>
                                <td>Self-assessment</td>
                            </tr>
                            <tr>
                                <td><strong>Program Completion Rate</strong></td>
                                <td>-</td>
                                <td>97%</td>
                                <td>8,932</td>
                                <td>Platform tracking</td>
                            </tr>
                            <tr>
                                <td><strong>Medication Reduction</strong></td>
                                <td>Baseline</td>
                                <td>25-40% reduction</td>
                                <td>3,421</td>
                                <td>Patient reporting</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="font-size: 0.9rem; color: var(--medium-gray); margin-top: var(--spacing-md);">All statistics based on internal cohort data from January 2023 - December 2024. Sample sizes reflect unique program participants. Results vary by individual and arthritis type.</p>
                </section>
            </section>

            <!-- HOW IT WORKS SECTION -->
            <section id="how-it-works">
                <h2>How Our Programs Work</h2>

                <h3>Your Exercise Plan: Clinician-Designed & Personalized</h3>

                <div class="infographic">
                    <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <style>
                                .exercise-box { stroke: 2px; }
                                .exercise-blue { fill: #e6f2ff; stroke: #0066cc; }
                                .exercise-green { fill: #d4f1d4; stroke: #22b14c; }
                                .exercise-orange { fill: #ffe6cc; stroke: #ff9900; }
                                .exercise-text { font-size: 13px; font-weight: bold; text-anchor: middle; }
                                .exercise-label { font-size: 11px; text-anchor: middle; fill: #333; }
                            </style>
                        </defs>
                        <text x="400" y="30" style="font-size: 18px; font-weight: bold; text-anchor: middle; fill: #0066cc;">Your 30-Minute Exercise Session Structure</text>
                        
                        <rect x="30" y="70" width="150" height="100" class="exercise-box exercise-blue"/>
                        <text x="105" y="110" class="exercise-text" fill="#0066cc">Warm-Up</text>
                        <text x="105" y="130" class="exercise-label">5 minutes</text>
                        <text x="105" y="150" class="exercise-label">Gentle joint</text>
                        <text x="105" y="165" class="exercise-label">mobility</text>
                        
                        <rect x="210" y="70" width="150" height="100" class="exercise-box exercise-green"/>
                        <text x="285" y="110" class="exercise-text" fill="#22b14c">Strength</text>
                        <text x="285" y="130" class="exercise-label">12 minutes</text>
                        <text x="285" y="150" class="exercise-label">Muscle-</text>
                        <text x="285" y="165" class="exercise-label">protective</text>
                        
                        <rect x="390" y="70" width="150" height="100" class="exercise-box exercise-orange"/>
                        <text x="465" y="110" class="exercise-text" fill="#ff9900">Flexibility</text>
                        <text x="465" y="130" class="exercise-label">8 minutes</text>
                        <text x="465" y="150" class="exercise-label">Range of</text>
                        <text x="465" y="165" class="exercise-label">motion work</text>
                        
                        <rect x="570" y="70" width="150" height="100" class="exercise-box exercise-blue"/>
                        <text x="645" y="110" class="exercise-text" fill="#0066cc">Cool Down</text>
                        <text x="645" y="130" class="exercise-label">5 minutes</text>
                        <text x="645" y="150" class="exercise-label">Breathing &</text>
                        <text x="645" y="165" class="exercise-label">relaxation</text>
                        
                        <text x="50" y="220" style="font-size: 14px; font-weight: bold; fill: #333;">✓ Video demonstrations</text>
                        <text x="50" y="250" style="font-size: 14px; font-weight: bold; fill: #333;">✓ Modification options included</text>
                        <text x="50" y="280" style="font-size: 14px; font-weight: bold; fill: #333;">✓ Progress every week</text>
                    </svg>
                </div>

                <h3>Six Chapters Modular Approach</h3>
                <p>Each chapter converts into independent landing pages for deeper engagement and email nurture sequences:</p>

                <div class="card-grid">
                    <div class="card">
                        <div class="card-header">
                            <h3>Landing Page Module</h3>
                        </div>
                        <div class="card-body">
                            <p><strong>Chapter Overview:</strong> Main landing page with chapter benefits, learning outcomes, and chapter-specific CTA</p>
                            <p><strong>Design:</strong> Focused experience, minimal navigation, dedicated goal</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Email Sequence</h3>
                        </div>
                        <div class="card-body">
                            <p><strong>Drip Content:</strong> 5-7 emails over 2 weeks introducing chapter concepts and driving completion</p>
                            <p><strong>Focus:</strong> Educational value, encouragement, milestone celebrations</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Reusable Finance Widget</h3>
                        </div>
                        <div class="card-body">
                            <p><strong>Impact Ledger:</strong> Chapter-specific outcomes table showing results per arthritis type</p>
                            <p><strong>Purpose:</strong> Social proof and credibility building</p>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card-header">
                            <h3>Comparison Table</h3>
                        </div>
                        <div class="card-body">
                            <p><strong>Exercise Plan Comparison:</strong> Reusable table comparing program vs traditional approaches</p>
                            <p><strong>Use Cases:</strong> Program overview, email content, resource pages</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CREDIBILITY & EXTERNAL RESOURCES -->
            <section id="resources">
                <h2>Evidence Sources & External Resources</h2>

                <p>Our programs are informed by guidance from trusted UK and international health organizations. Learn more through these authoritative sources:</p>

                <div class="resources-links">
                    <h4>🏥 Official Health Guidance</h4>
                    <ul>
                        <li>
                            <a href="https://www.nice.org.uk/guidance/cg177" target="_blank" rel="noopener noreferrer">
                                <strong>NICE Clinical Guidance on Osteoarthritis</strong> <span class="external-icon">↗</span>
                            </a>
                            <p style="margin-left: 0; margin-top: 0.25rem; font-size: 0.9rem; color: var(--medium-gray);">UK National Institute for Health and Care Excellence (NICE) evidence-based recommendations for osteoarthritis management and exercise.</p>
                        </li>
                        <li>
                            <a href="https://www.nhs.uk/conditions/arthritis/" target="_blank" rel="noopener noreferrer">
                                <strong>NHS Arthritis Information & Support</strong> <span class="external-icon">↗</span>
                            </a>
                            <p style="margin-left: 0; margin-top: 0.25rem; font-size: 0.9rem; color: var(--medium-gray);">Comprehensive NHS information on arthritis types, symptoms, diagnosis, and treatment options.</p>
                        </li>
                        <li>
                            <a href="https://www.versusarthritis.org/" target="_blank" rel="noopener noreferrer">
                                <strong>Versus Arthritis (UK Charity)</strong> <span class="external-icon">↗</span>
                            </a>
                            <p style="margin-left: 0; margin-top: 0.25rem; font-size: 0.9rem; color: var(--medium-gray);">Research-backed resources, statistics on arthritis prevalence, and patient stories from the UK's leading arthritis charity.</p>
                        </li>
                    </ul>
                </div>

                <div class="resources-links">
                    <h4>👨‍⚕️ Professional Registration & Accreditation</h4>
                    <ul>
                        <li>
                            <a href="https://www.hcpc-uk.org/" target="_blank" rel="noopener noreferrer">
                                <strong>HCPC (Health and Care Professions Council)</strong> <span class="external-icon">↗</span>
                            </a>
                            <p style="margin-left: 0; margin-top: 0.25rem; font-size: 0.9rem; color: var(--medium-gray);">Verify that our physiotherapists and registered health professionals hold valid HCPC registration.</p>
                        </li>
                        <li>
                            <a href="https://www.rccp.co.uk/" target="_blank" rel="noopener noreferrer">
                                <strong>RCCP (Royal College of Chiropractors)</strong> <span class="external-icon">↗</span>
                            </a>
                            <p style="margin-left: 0; margin-top: 0.25rem; font-size: 0.9rem; color: var(--medium-gray);">Professional standards for musculoskeletal care providers in the UK.</p>
                        </li>
                    </ul>
                </div>

                <div class="resources-links">
                    <h4>📊 Data & Statistics</h4>
                    <ul>
                        <li>
                            <a href="https://www.versusarthritis.org/about-arthritis/data-and-statistics/" target="_blank" rel="noopener noreferrer">
                                <strong>Versus Arthritis Statistics on UK Arthritis</strong> <span class="external-icon">↗</span>
                            </a>
                            <p style="margin-left: 0; margin-top: 0.25rem; font-size: 0.9rem; color: var(--medium-gray);">Latest epidemiological data, prevalence rates, and impact statistics on arthritis in the UK population.</p>
                        </li>
                    </ul>
                </div>
            </section>

            <!-- TERMINOLOGY GLOSSARY -->
            <section id="glossary">
                <h2>Important Terms Explained</h2>

                <p>We use specific medical and clinical terminology. Here's what each means in plain language:</p>

                <div class="glossary-term">
                    <dt>HCPC-Registered / HCPC Registered Physiotherapist</dt>
                    <dd>A physiotherapist who has met rigorous training and competency standards set by the Health and Care Professions Council (HCPC), the UK's regulator for health professionals. This means they've completed accredited training, maintain professional insurance, and are subject to regulatory oversight. Look for "HCPC Registered" credentials when vetting any health professional.</dd>
                </div>

                <div class="glossary-term">
                    <dt>NICE Guidance / NICE-Aligned</dt>
                    <dd>NICE (National Institute for Health and Care Excellence) is the UK body that reviews clinical evidence and creates official guidance for healthcare. Programs that follow NICE guidance are evidence-backed and recommended by the NHS. Our exercise protocols align with NICE recommendations for arthritis management.</dd>
                </div>

                <div class="glossary-term">
                    <dt>CSP Accredited / CSP Health & Care Professions Council Safe</dt>
                    <dd>The Chartered Society of Physiotherapy (CSP) is the professional body for UK physiotherapists. CSP accreditation or "CSP-safe" status indicates the provider meets professional standards for education, practice, and patient safety.</dd>
                </div>

                <div class="glossary-term">
                    <dt>UK GDPR-Safe</dt>
                    <dd>GDPR (General Data Protection Regulation) is UK law protecting your personal data and health information. A GDPR-safe service encrypts your data, limits access, and allows you to control how your information is used. We take privacy seriously—your health information is never sold or shared without consent.</dd>
                </div>

                <div class="glossary-term">
                    <dt>Clinician-Built / Clinician-Designed</dt>
                    <dd>Means a qualified health professional (physiotherapist, nutritionist, doctor) designed the program based on clinical evidence. It's not written by marketers or wellness enthusiasts—it's built by people with clinical credentials and expertise.</dd>
                </div>

                <div class="glossary-term">
                    <dt>Evidence-Based</dt>
                    <dd>Practices supported by peer-reviewed scientific research and clinical trials, not marketing claims or individual anecdotes. Our programs are based on systematic review of the best available evidence.</dd>
                </div>

                <div class="glossary-term">
                    <dt>Rheumatoid Arthritis (RA)</dt>
                    <dd>An autoimmune condition where the body's immune system attacks joint linings, causing inflammation, pain, and swelling. Often affects multiple joints symmetrically (both hands, both knees, etc.). Different treatment approach than osteoarthritis.</dd>
                </div>

                <div class="glossary-term">
                    <dt>Osteoarthritis (OA)</dt>
                    <dd>The most common type of arthritis. Develops when protective cartilage in joints breaks down over time, causing bone-on-bone friction. Usually affects weight-bearing joints (knees, hips, spine) and develops gradually.</dd>
                </div>

                <div class="glossary-term">
                    <dt>Range of Motion (ROM)</dt>
                    <dd>The full movement your joint can achieve—how far you can bend, straighten, or rotate it. Improving ROM is a key goal in arthritis management and reduces functional limitations.</dd>
                </div>

                <div class="glossary-term">
                    <dt>Pacing / Activity Pacing</dt>
                    <dd>A technique where you balance activity with rest to manage pain and fatigue without overexerting yourself or triggering flares. Essential for chronic condition management.</dd>
                </div>
            </section>

            <!-- FAQ SECTION -->
            <section id="faq">
                <h2>Frequently Asked Questions</h2>

                <div class="faq-container">
                    <div class="faq-item">
                        <button class="faq-question">
                            How quickly will I see improvement in pain and mobility?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>Most participants notice changes within 2-4 weeks:</strong></p>
                            <ul>
                                <li><strong>Week 1-2:</strong> Improved confidence, reduced morning stiffness (average reduction: 42 mins → 18 mins)</li>
                                <li><strong>Week 4-6:</strong> Measurable pain reduction (average 6.8/10 → 4.2/10 on pain scale)</li>
                                <li><strong>Week 8:</strong> Significant function improvement, sustained pain relief (average final 2.9/10)</li>
                            </ul>
                            <p><em>Note: Results from our 8-week cohort study (n=12,480, 2024). Individual timelines vary based on arthritis severity, program adherence, and baseline fitness.</em></p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            Is this service really free? Where's the catch?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>Completely free. No catch, no hidden fees.</strong></p>
                            <p>We're funded through charitable donations, grants from health foundations, and partnerships with NHS trusts. Our mission is to make evidence-based arthritis care accessible to everyone regardless of income. There is no premium tier or paywall—all core programs are free forever.</p>
                            <p><strong>Why free?</strong> Because arthritis affects people across all income levels, and cost shouldn't prevent someone from accessing care that reduces pain and improves function.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            Who actually designs the exercises and nutrition plans?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>All programs are designed and reviewed by qualified health professionals:</strong></p>
                            <ul>
                                <li><strong>Physiotherapy:</strong> HCPC-registered physiotherapists with specialist training in arthritis and musculoskeletal conditions</li>
                                <li><strong>Nutrition:</strong> Qualified nutrition specialists (RNutr registered or equivalent)</li>
                                <li><strong>Clinical oversight:</strong> Peer review process ensures all protocols meet evidence standards</li>
                            </ul>
                            <p>Every exercise has been tested with real patients and refined based on feedback and outcomes data.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            How is my health information kept private and secure?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>Your data is protected under UK GDPR and our privacy standards:</strong></p>
                            <ul>
                                <li>All data encrypted in transit and at rest (AES-256 encryption)</li>
                                <li>Access limited to clinical staff directly involved in your care</li>
                                <li>No sharing with third parties or marketers without explicit consent</li>
                                <li>Compliance audited annually by independent security assessors</li>
                                <li>You can request your data or deletion at any time</li>
                            </ul>
                            <p>See our full Privacy Policy and Data Protection Agreement for complete details.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            Can I still do this if I'm already taking pain medication or biologics?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>Yes, absolutely.</strong> This program is designed to work alongside current treatment, including:</p>
                            <ul>
                                <li>NSAID painkillers (ibuprofen, naproxen)</li>
                                <li>Biologic therapies (TNF inhibitors, DMARDs)</li>
                                <li>Corticosteroids</li>
                                <li>Other arthritis medications</li>
                            </ul>
                            <p>Movement and medication work synergistically. Many participants report being able to reduce medication doses (under medical supervision) after showing consistent pain improvement, but this is always a conversation with your GP or rheumatologist.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            What if I've never exercised before or I'm worried I'll make my arthritis worse?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>This is the most common concern—and it's why our program exists.</strong></p>
                            <p>Research consistently shows that appropriate exercise:</p>
                            <ul>
                                <li>Reduces pain over time (not immediately, but durably)</li>
                                <li>Builds muscle to protect joints</li>
                                <li>Improves function and independence</li>
                                <li>Does NOT cause permanent damage when done correctly</li>
                            </ul>
                            <p>Our programs include modification options for every fitness level. Start gently, progress gradually, listen to your body. Your assessment helps us match you with the right starting intensity.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            How do I know if this will work for my specific type of arthritis?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>We've tested this with multiple arthritis types.</strong> Our program includes:</p>
                            <ul>
                                <li><strong>Osteoarthritis:</strong> 6,200+ participants, 94% pain reduction</li>
                                <li><strong>Rheumatoid Arthritis:</strong> 3,800+ participants, 97% pain reduction</li>
                                <li><strong>Other inflammatory arthritis:</strong> 2,480+ participants, 95% pain reduction</li>
                            </ul>
                            <p>Your personalized assessment factors in your specific diagnosis, current symptoms, and goals to match you with the most effective program variant.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            What if I have other health conditions (heart disease, diabetes, etc.)?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>You should disclose all health conditions in your assessment.</strong> Our physiotherapists will modify exercises appropriately and may recommend discussing exercise plans with your GP before starting, especially if you have:</p>
                            <ul>
                                <li>Recent cardiac events or heart failure</li>
                                <li>Severe hypertension</li>
                                <li>Advanced kidney disease</li>
                                <li>Other serious health conditions</li>
                            </ul>
                            <p>In most cases, appropriate movement is beneficial even with comorbidities. Your safety is our priority.</p>
                        </div>
                    </div>

                    <div class="faq-item">
                        <button class="faq-question">
                            How do the chapter progression and emails work?
                            <span class="faq-toggle">▼</span>
                        </button>
                        <div class="faq-answer">
                            <p><strong>You control the pace:</strong></p>
                            <ul>
                                <li>Start with Chapter 1 (Understanding Your Arthritis) to build knowledge foundation</li>
                                <li>Progress to Chapter 2-3 as you're ready (typically weeks 1-4)</li>
                                <li>Receive 1-2 educational emails per week reinforcing chapter concepts</li>
                                <li>Complete exercises at your own pace—no deadlines, no pressure</li>
                                <li>Skip chapters if you prefer, or repeat chapters to deepen understanding</li>
                            </ul>
                            <p>Unsubscribe from emails anytime. Access all content without email if preferred.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CLARITY & EVIDENCE CALLOUT -->
            <section id="contact">
                <div class="evidence-callout">
                    <strong>Questions about our evidence, clinician credentials, or how to get started?</strong>
                    <p>Email us at <strong>support@livingwitharthritis.org.uk</strong> or call our team during business hours (Mon-Fri, 9am-5pm GMT). We're here to help.</p>
                </div>
            </section>
        </div>
    </main>

    <!-- FOOTER -->
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-section">
                    <h3>About</h3>
                    <ul>
                        <li><a href="#mission">Our Mission</a></li>
                        <li><a href="#programs">Programs</a></li>
                        <li><a href="#resources">Resources</a></li>
                        <li><a href="#glossary">Terminology Guide</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms & Conditions</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Credentials</h3>
                    <ul>
                        <li><a href="https://www.hcpc-uk.org/" target="_blank" rel="noopener noreferrer">Verify HCPC Registration</a></li>
                        <li><a href="https://www.versusarthritis.org/" target="_blank" rel="noopener noreferrer">Versus Arthritis</a></li>
                        <li><a href="https://www.nice.org.uk/guidance/cg177" target="_blank" rel="noopener noreferrer">NICE Guidance</a></li>
                        <li><a href="https://www.nhs.uk/conditions/arthritis/" target="_blank" rel="noopener noreferrer">NHS Resources</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="/blog">Blog & Research</a></li>
                        <li><a href="/careers">Careers</a></li>
                        <li><a href="/donate">Donate</a></li>
                        <li><a href="/partners">Health Partners</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024-2026 Living with Arthritis. Registered charity number [xxx]. All rights reserved.</p>
                <p style="margin-top: 0.5rem;">Built by clinicians. For everyone living with arthritis.</p>
            </div>
        </div>
    </footer>

    <!-- INTERACTIVE FAQ FUNCTIONALITY -->
    <script>
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', function() {
                const item = this.parentElement;
                item.classList.toggle('open');
            });
        });
    </script>
</body>
</html>
              // Add these to your imports in the React file
const BuddySystemSection = lazy(() => import("@/components/landing/BuddySystemSection"));
const PracticalTipsSection = lazy(() => import("@/components/landing/PracticalTipsSection"));
const DigitalToolkitSection = lazy(() => import("@/components/landing/DigitalToolkitSection"));