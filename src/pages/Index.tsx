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
import { Stethoscope, ArrowRight } from "lucide-react";

import Header from "@/components/Header";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import DeferredMount from "@/components/DeferredMount";
import ViewportSection from "@/components/ViewportSection";

// OAHero stays eager — required for LCP.
import OAHero from "@/components/landing/OAHero";

import { VISITOR_STATS_SNIPPET } from "@/config/visitorStats";
import { CONTENT_INVENTORY, formatInventoryCount } from "@/config/contentInventory";
import AeoEnhancement from "@/components/seo/AeoEnhancement";

/** Prefixes `rest` with the visitor-stats snippet when one is set (a real,
 * verified count), without leaving a stray leading space when it's empty. */
const withVisitorSnippet = (rest: string) =>
  [VISITOR_STATS_SNIPPET, rest].filter(Boolean).join(" ");

// Q1: Lazy-load every sub-section to reduce first-paint JS cost.
const HeroStatsStrip = lazy(() => import("@/components/landing/HeroStatsStrip"));
const OAProblemBand = lazy(() => import("@/components/landing/OAProblemBand"));
const JointExerciseSection = lazy(() => import("@/components/JointExerciseSection"));
const InteractiveStartPath = lazy(() => import("@/components/landing/InteractiveStartPath"));

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
const Footer = lazy(() => import("@/components/Footer"));
const NextReadStrip = lazy(() => import("@/components/NextReadStrip"));
const BackToTopButton = lazy(() => import("@/components/landing/BackToTopButton"));
// CookieBanner is mounted once site-wide in App.tsx.
const StickyDonateBar = lazy(() => import("@/components/landing/StickyDonateBar"));
const MobileBottomCTA = lazy(() => import("@/components/landing/MobileBottomCTA"));
const SearchBar = lazy(() => import("@/components/landing/SearchBar"));
const TestimonialCollector = lazy(() => import("@/components/landing/TestimonialCollector"));
const TestimonialDisplay = lazy(() => import("@/components/landing/TestimonialDisplay"));
const StartHereBand = lazy(() => import("@/components/landing/StartHereBand"));
const ImpactFactBand = lazy(() => import("@/components/landing/ImpactFactBand"));
const ImpactProgressBand = lazy(() => import("@/components/landing/ImpactProgressBand"));
const FinalDonateBand = lazy(() => import("@/components/landing/FinalDonateBand"));
const GazaAppealBand = lazy(() => import("@/components/appeal/GazaAppealBand"));

// MAP-inspired landing sections
const HowYouCanHelp = lazy(() => import("@/components/landing/HowYouCanHelp"));
const ImpactStats = lazy(() => import("@/components/landing/ImpactStats"));
const WhatWeDo = lazy(() => import("@/components/landing/WhatWeDo"));
const LatestGrid = lazy(() => import("@/components/landing/LatestGrid"));

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
      "@type": "MedicalOrganization",
      name: "Living With Arthritis UK",
      url: SITE_URL,
      description:
        "An open-source osteoarthritis management plan — clinically reviewed, freely published, and made for everyone living with OA in the UK.",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Osteoarthritis",
        "Rheumatoid arthritis",
        "Gout",
        "Fibromyalgia",
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

    // FAQPage schema is emitted by FAQSection itself (rendered below) — not
    // duplicated here, since two FAQPage blocks with different question sets
    // on one page confuses structured-data validators and rich-result eligibility.

    return () => {
      [id, breadcrumbId].forEach((scriptId) => {
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
          content={withVisitorSnippet(
            "Living With Arthritis UK (charity 1218461): evidence-based guides for joint pain — NICE-aligned exercise, diet, PIP and waiting-list help across the United Kingdom.",
          )}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL + "/"} />
        <meta
          property="og:title"
          content="Living With Arthritis UK | Evidence-Based Health Guides"
        />
        <meta
          name="twitter:title"
          content="Living With Arthritis UK | Evidence-Based Health Guides"
        />
        <meta
          property="og:description"
          content={withVisitorSnippet(
            "Clinically reviewed arthritis guidance in plain English — free for everyone in the UK. Registered charity 1218461.",
          )}
        />
        <meta
          name="twitter:description"
          content={withVisitorSnippet(
            "Free UK arthritis exercises, diet guidance and support. No sign-up required. Registered charity 1218461.",
          )}
        />
        {/* Homepage social share card: branded /og/landing-share.png (1200×630). */}
        <meta property="og:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/og/landing-share.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="People walking together — Living With Arthritis UK free joint-pain support"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og/landing-share.png`} />
        <meta
          name="twitter:image:alt"
          content="People walking together — Living With Arthritis UK free joint-pain support"
        />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <ScrollProgress />

        <main id="main-content" role="main" tabIndex={-1}>
          {/* 01 — Editorial hero (eager LCP) */}
          <OAHero />

          <div className="container mx-auto px-5 md:px-10 max-w-3xl">
            <AeoEnhancement route="/" />
          </div>

          {/* 01b — Interactive start-here path, immediately after the hero. */}
          <Suspense fallback={<SectionFallback />}>
            <InteractiveStartPath />
          </Suspense>

          {/* 01c — Anatomy figure + tap-friendly joint chips, next to the chooser. */}
          <Suspense fallback={<SectionFallback />}>
            <JointExerciseSection />
          </Suspense>

          {/* 01a — Urgent appeal: Palestine & Gaza rehabilitation */}
          <Suspense fallback={<SectionFallback />}>
            <GazaAppealBand />
          </Suspense>

          {/* 02 — Beginner journey chooser */}
          <Suspense fallback={<SectionFallback />}>
            <StartHereBand />
          </Suspense>

          {/* 03b — Bridge to the fuller symptom-matching quiz for visitors
              who aren't sure which joint/condition applies to them. */}
          <section aria-label="Not sure where to start" className="py-10 bg-muted/30 border-y border-border/40">
            <div className="container mx-auto px-6 max-w-3xl text-center">
              <Stethoscope className="w-6 h-6 text-primary mx-auto mb-3" aria-hidden="true" />
              <p className="text-foreground font-semibold mb-1">
                Not sure where to begin — and tired of guessing?
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Answer five gentle questions and we will point you to the guides that fit your symptoms first.
                You are not alone in figuring this out.
              </p>
              <Link
                to="/symptom-checker"
                className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
              >
                Try the symptom checker <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* 04–08a — Below-fold editorial block, mounted on approach */}
          <ViewportSection fallback={<SectionFallback />}>
            <HowYouCanHelp />
            <ImpactStats />
            <WhatWeDo />
            <OAProblemBand />
            <FacesStrip />
            <TestimonialDisplay />
          </ViewportSection>

          {/* 08b — Photo break: movement is medicine */}
          <section aria-label="Movement is medicine" className="relative h-[400px] md:h-[480px] overflow-hidden bg-foreground">
            <img
              src="/images/diver-movement.webp"
              alt="Aerial black-and-white photograph of a diver mid-air above sparkling water, body fully extended in motion"
              width={1920}
              height={1440}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" aria-hidden="true" />
            <figure className="absolute bottom-0 p-8 md:p-14 max-w-3xl">
              <blockquote>
                <p className="font-display text-2xl md:text-4xl font-bold text-primary-foreground leading-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>
                  &ldquo;Motion is lotion — every movement is medicine.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-3 text-sm md:text-base text-primary-foreground font-medium tracking-wide uppercase">Living With Arthritis UK</figcaption>
            </figure>
          </section>



          {/* 09 — Latest articles, conditions overview and resources hub */}
          <ViewportSection fallback={<SectionFallback />}>
            <LatestGrid />
            <AboutArthritisCards />
            <ConditionPillBand />
            <ResourcesForYouSection />
          </ViewportSection>

          {/* 09a — Money-page hubs (internal PageRank toward conversion/intent pages) */}
          <section aria-labelledby="hubs-heading" className="py-12 md:py-16 bg-background border-y border-border/40">
            <div className="container mx-auto px-5 md:px-10 max-w-6xl">
              <div className="text-center mb-8">
                <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-2">Start here</p>
                <h2 id="hubs-heading" className="font-display font-bold text-2xl md:text-3xl text-foreground">
                  Practical hubs for living with arthritis in the UK
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Clear entry points for diet, exercise, conditions, PIP and the blog — clinically reviewed, free to use.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Link to="/diet" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Nutrition</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Diet hub</p>
                  <p className="text-sm text-muted-foreground mt-1">Anti-inflammatory and Mediterranean eating patterns.</p>
                </Link>
                <Link to="/exercises" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Movement</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Exercise hub</p>
                  <p className="text-sm text-muted-foreground mt-1">NICE-aligned routines for knees, hands and more.</p>
                </Link>
                <Link to="/conditions/osteoarthritis" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Conditions</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Condition guides</p>
                  <p className="text-sm text-muted-foreground mt-1">OA, RA and joint-specific explainers in plain English.</p>
                </Link>
                <Link to="/benefits-pip" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Support</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Benefits &amp; PIP</p>
                  <p className="text-sm text-muted-foreground mt-1">Eligibility, evidence, claiming and appeals.</p>
                </Link>
                <Link to="/blog" className="group p-5 rounded-xl border border-border/40 bg-card hover:border-primary/50 hover:shadow-md transition-all">
                  <p className="text-xs text-primary font-bold mb-1">Library</p>
                  <p className="font-bold text-foreground group-hover:text-primary transition-colors">Arthritis blog</p>
                  <p className="text-sm text-muted-foreground mt-1">{formatInventoryCount(CONTENT_INVENTORY.blogArticles)} clinically reviewed articles for UK readers.</p>
                </Link>
              </div>
            </div>
          </section>

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

          {/* 10–14 — Progress, quote, search, FAQ and closing CTA */}
          <ViewportSection fallback={<SectionFallback />}>
            <ImpactProgressBand />
            <QuoteSection />
            <SearchBar />
            <FAQSection />
            <FinalDonateBand />
          </ViewportSection>

        </main>



        <ViewportSection fallback={<div className="h-64" aria-hidden="true" />}>
          <NextReadStrip currentPath="/" />
          <Footer />
        </ViewportSection>

        {/* Floating widgets: never part of first paint. */}
        <DeferredMount>
          <Suspense fallback={null}>
            <BackToTopButton />
            <StickyDonateBar />
            <MobileBottomCTA />
          </Suspense>
        </DeferredMount>
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
