/**
 * Living With Arthritis UK — Homepage
 *
 * Focused fundraising landing page for the osteoarthritis
 * management plan. Composed from existing landing primitives + three
 * OA-specific sections (Hero, Problem Band, Plan Pillars, Ethos Band).
 *
 * Strict editorial voice. UK English. No fabricated stats beyond
 * publicly cited figures (8.75M, 1 in 6, £10bn).
 */

import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredMount from "@/components/DeferredMount";

// OAHero stays eager — required for LCP.
import OAHero from "@/components/landing/OAHero";
import VisitorStats from "@/components/VisitorStats";
import { VISITOR_STATS_SNIPPET } from "@/config/visitorStats";

// Q1: Lazy-load every sub-section to reduce first-paint JS cost.
const HeroStatsStrip = lazy(() => import("@/components/landing/HeroStatsStrip"));
const OAProblemBand = lazy(() => import("@/components/landing/OAProblemBand"));
const JointSelector = lazy(() => import("@/components/JointSelector"));
const FacesStrip = lazy(() => import("@/components/landing/FacesStrip"));
const OAPlanPillarsSection = lazy(() => import("@/components/landing/OAPlanPillarsSection"));
const MissionStatementBand = lazy(() => import("@/components/landing/MissionStatementBand"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const MissionEthosBand = lazy(() => import("@/components/landing/MissionEthosBand"));
const HowWeAreFundedSection = lazy(() => import("@/components/landing/HowWeAreFundedSection"));
const SEOTeaserSection = lazy(() => import("@/components/landing/SEOTeaserSection"));

const AboutArthritisCards = lazy(() => import("@/components/landing/AboutArthritisCards"));
const ResourcesForYouSection = lazy(() => import("@/components/landing/ResourcesForYouSection"));
const ConditionPillBand = lazy(() => import("@/components/landing/ConditionPillBand"));

const InspiredHeroBand = lazy(() => import("@/components/landing/InspiredHeroBand"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const BlogPreview = lazy(() => import("@/components/landing/BlogPreview"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const Footer = lazy(() => import("@/components/Footer"));
const NextReadStrip = lazy(() => import("@/components/NextReadStrip"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
const CookieBanner = lazy(() => import("@/components/landing/CookieBanner"));
const StickyDonateBar = lazy(() => import("@/components/landing/StickyDonateBar"));
const MobileBottomCTA = lazy(() => import("@/components/landing/MobileBottomCTA"));
const NewsletterHeroBanner = lazy(() => import("@/components/landing/NewsletterHeroBanner"));
const SearchBar = lazy(() => import("@/components/landing/SearchBar"));
const TestimonialCollector = lazy(() => import("@/components/landing/TestimonialCollector"));
const StartHereBand = lazy(() => import("@/components/landing/StartHereBand"));
const ImpactFactBand = lazy(() => import("@/components/landing/ImpactFactBand"));
const ImpactProgressBand = lazy(() => import("@/components/landing/ImpactProgressBand"));
const FinalDonateBand = lazy(() => import("@/components/landing/FinalDonateBand"));

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
        <title>Living With Arthritis UK | Evidence-Based Health Guides</title>
        <meta
          name="description"
          content={`${VISITOR_STATS_SNIPPET} Free UK arthritis support: clinically reviewed diet, movement and pain-relief guidance in plain English.`}
        />
        <link rel="canonical" href={SITE_URL + "/"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Living With Arthritis UK | Evidence-Based Health Guides"
        />
        <meta
          property="og:description"
          content={`${VISITOR_STATS_SNIPPET} Clinically reviewed arthritis guidance in plain English — free for everyone in the UK.`}
        />
        <meta
          name="twitter:description"
          content={`${VISITOR_STATS_SNIPPET} Free, clinically reviewed arthritis guidance for the UK.`}
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          {/* 01 — Editorial hero */}
          <OAHero />

          {/* Visitor stats — visible trust signal directly under hero image */}
          <VisitorStats variant="band" />


          {/* 02 — Beginner journey chooser */}
          <Suspense fallback={<SectionFallback />}>
            <StartHereBand />
          </Suspense>


          {/* 03 — Where does it hurt? */}
          <Suspense fallback={<SectionFallback />}>
            <JointSelector />
          </Suspense>

          {/* 04 — Why we exist (problem + national stats merged) */}
          <Suspense fallback={<SectionFallback />}>
            <OAProblemBand />
            <HeroStatsStrip />
          </Suspense>

          {/* 05 — Four pillars (Move/Eat/Rest/Connect) */}
          <Suspense fallback={<SectionFallback />}>
            <OAPlanPillarsSection />
          </Suspense>

          {/* 06 — Real stories */}
          <Suspense fallback={<SectionFallback />}>
            <FacesStrip />
          </Suspense>

          {/* 07 — Featured guides */}
          <Suspense fallback={<SectionFallback />}>
            <BlogPreview />
          </Suspense>

          {/* 08 — Conditions overview (cards + pill links merged) */}
          <Suspense fallback={<SectionFallback />}>
            <AboutArthritisCards />
            <ConditionPillBand />
          </Suspense>

          {/* 09 — Resources hub */}
          <Suspense fallback={<SectionFallback />}>
            <ResourcesForYouSection />
          </Suspense>

          {/* 09b — Medication guides quick links (SEO topical authority) */}
          <section aria-labelledby="medication-guides-heading" className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-5 md:px-10 max-w-6xl">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">UK Medication Guides</p>
                <h2 id="medication-guides-heading" className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  Plain-English guides to common arthritis medications
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Clinically reviewed UK guides explaining how each drug works, monitoring, side effects and what to ask your rheumatology team.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/guides/azathioprine-for-arthritis" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">DMARD</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Azathioprine for Arthritis</p>
                  <p className="text-sm text-muted-foreground mt-1">TPMT testing, dosing, monitoring and side effects.</p>
                </Link>
                <Link to="/guides/steroids-for-arthritis" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Steroid</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Steroids for Arthritis</p>
                  <p className="text-sm text-muted-foreground mt-1">Injections, tablets, side effects and UK access.</p>
                </Link>
                <Link to="/guides/benefits-pip" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Support</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Benefits &amp; PIP Guide</p>
                  <p className="text-sm text-muted-foreground mt-1">Eligibility, claiming and appealing PIP for arthritis.</p>
                </Link>
              </div>
            </div>
          </section>

          {/* 10 — Fundraising progress */}
          <Suspense fallback={<SectionFallback />}>
            <ImpactProgressBand />
          </Suspense>

          {/* 11 — Editorial board quote */}
          <Suspense fallback={<SectionFallback />}>
            <QuoteSection />
          </Suspense>

          {/* 12 — Search the library (deferred — secondary nav) */}
          <DeferredMount>
            <Suspense fallback={<SectionFallback />}>
              <SearchBar />
            </Suspense>
          </DeferredMount>

          {/* 13 — FAQ */}
          <Suspense fallback={<SectionFallback />}>
            <FAQSection />
          </Suspense>

          {/* 14 — Final donate band (closing CTA) */}
          <Suspense fallback={<SectionFallback />}>
            <FinalDonateBand />
          </Suspense>

          {/* 15 — Newsletter footer band */}
          <Suspense fallback={<SectionFallback />}>
            <NewsletterSection />
          </Suspense>
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
