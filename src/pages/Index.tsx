import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import ViewportSection from "@/components/ui/ViewportSection";
// ─── Module-level lazy imports [F-1 FIXED] ───────────────────────────────────
const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));
const Footer = lazy(() => import("@/components/Footer"));
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
// ─── Security: CSP nonce would be injected server-side. ──────────────────────
// [S-1] NOTE: For a proper CSP, your server must send the
//   Content-Security-Policy HTTP header (not just meta tag) with a nonce:
//   Content-Security-Policy:
//     default-src 'self';
//     script-src 'self' 'nonce-{SERVER_NONCE}' https://js.stripe.com;
//     style-src 'self' 'nonce-{SERVER_NONCE}' https://fonts.googleapis.com;
//     font-src 'self' https://fonts.gstatic.com;
//     img-src 'self' data: https:;
//     connect-src 'self' https://api.livingwitharthritis.org.uk https://checkout.stripe.com;
//     frame-ancestors 'none';
//     form-action 'self';
//     base-uri 'self';
//     upgrade-insecure-requests;
//
// [M-1] Cookie security — server must set:
//   Set-Cookie: session=TOKEN; HttpOnly; Secure; SameSite=Strict; Path=/
//
// [C-3] JWT — use RS256, short expiry, httpOnly refresh cookie, NEVER localStorage.
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
  <div className="py-8 flex items-center justify-center" role="status" aria-label="Loading section">
        
    <div
      className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary"
      aria-hidden="true"
    />
      
  </div>
));
SectionLoader.displayName = "SectionLoader";
// ─── Structured data ─────────────────────────────────────────────────────────
// [S-6] Phone number removed from public JSON-LD to reduce PII exposure.
//       Contact details should only appear in authenticated/consent-gated UI.
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
    "@type": "ContactPoint", // [S-6] Only expose email in schema — phone number removed to limit PII.
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
// [F-5] Fixed: deprecated query-input syntax replaced with correct EntryPoint form.
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
  const [searchParams, setSearchParams] = useSearchParams(); // [F-13] useRef guard: prevents double-fire in React 18 Strict Mode
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
        (prev) => {
          prev.delete("donation");
          return prev;
        },
        { replace: true },
      );
    } else if (donation === "cancelled") {
      donationToastShown.current = true;
      toast.info("No problem — your donation was cancelled. You can donate any time.", { duration: 5000 });
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
        // [S-8] Generic error message — no stack traces or internal paths exposed
        <div className="p-12 text-center text-destructive" role="alert">
                    <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                    
          <p>
                        Please refresh the page or contact us at             
            <a href="mailto:info@livingwitharthritis.org.uk" className="underline">
                            info@livingwitharthritis.org.uk             
            </a>
                      
          </p>
                  
        </div>
      }
    >
            
      <Helmet>
                {/* ── Core ── */}
                
        <html lang="en-GB" dir="ltr" />
                
        <title>          Living With Arthritis UK – Free Physio, Diet Plans & Joint Pain           Help         </title>
                
        <meta
          name="description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK. No referrals or waiting lists."
        />
                
        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
                {/* ── Indexing ── */}
                
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
                {/* ── Geo ── */}
                
        <meta name="geo.region" content="GB" />
                
        <meta name="geo.placename" content="United Kingdom" />
                {/* ── Branding / PWA ── */}
                
        <meta name="application-name" content="Living With Arthritis UK" />
                
        <meta name="theme-color" content="#0F6E56" />
                
        <meta name="apple-mobile-web-app-capable" content="yes" />
                
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                
        <meta name="apple-mobile-web-app-title" content="Living With Arthritis UK" />
                
        {/*
         * ════════════════════════════════════════════════════════════
         * SECURITY HEADERS (meta-tag layer — defence-in-depth)
         * ════════════════════════════════════════════════════════════
         *
         * IMPORTANT: These meta tags are a SECONDARY defence only.
         * The primary defence MUST be HTTP response headers set by
         * your web server / CDN (nginx, Cloudflare, Vercel headers).
         * Meta tags do NOT protect against all attack vectors.
         *
         * ── nginx snippet (add to your server block): ──────────────
         *   add_header Content-Security-Policy "default-src 'self'; script-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://checkout.stripe.com; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; upgrade-insecure-requests;" always;
         *   add_header X-Content-Type-Options "nosniff" always;
         *   add_header X-Frame-Options "DENY" always;
         *   add_header Referrer-Policy "strict-origin-when-cross-origin" always;
         *   add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=(self), usb=(), bluetooth=(), accelerometer=(), gyroscope=()" always;
         *   add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
         *   add_header Cross-Origin-Opener-Policy "same-origin" always;
         *   add_header Cross-Origin-Resource-Policy "same-origin" always;
         *   add_header Cross-Origin-Embedder-Policy "require-corp" always;
         */}
                {/* [S-1] Content Security Policy — meta fallback */}
                
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
                {/* [S-2] Prevent MIME sniffing attacks */}
                
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
                {/* [S-5] Clickjacking prevention */}
                
        <meta httpEquiv="X-Frame-Options" content="DENY" />
                {/* [S-3] Referrer policy — no full URL leakage to third parties */}
                
        <meta name="referrer" content="strict-origin-when-cross-origin" />
                {/* [S-4] Permissions policy — disable unused/dangerous browser APIs */}
                
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
                
        {/* [M-11 / M-7] HSTS — enforce HTTPS. Must also be set as HTTP header.
            Add to nginx: add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
            Submit to https://hstspreload.org once confirmed stable. */}
                
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
                {/* Cross-Origin policies */}
                
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
                
        <meta httpEquiv="Cross-Origin-Resource-Policy" content="same-origin" />
                {/* ── Open Graph ── */}
                
        <meta property="og:type" content="website" />
                
        <meta property="og:locale" content="en_GB" />
                
        <meta property="og:site_name" content="Living With Arthritis UK" />
                
        <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
                
        <meta property="og:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
                
        <meta
          property="og:description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK. No referrals or waiting lists."
        />
                
        <meta property="og:image" content="https://livingwitharthritis.org.uk/og-image.jpg" />
                
        <meta property="og:image:width" content="1200" />
                
        <meta property="og:image:height" content="630" />
                
        <meta
          property="og:image:alt"
          content="Living With Arthritis UK — free physio, diet plans and joint pain support"
        />
                {/* ── Twitter / X card ── */}
                
        <meta name="twitter:card" content="summary_large_image" />
                
        <meta name="twitter:site" content="@LivingArthritisUK" />
                
        <meta name="twitter:title" content="Living With Arthritis UK – Free Physio, Diet & Joint Pain Help" />
                
        <meta
          name="twitter:description"
          content="Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain in the UK."
        />
                
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/og-image.jpg" />
                {/* ── Performance: preconnect to critical origins ── */}
                
        {/*
         * [S-9] SUBRESOURCE INTEGRITY (SRI):
         * For any external script tags in index.html, add integrity + crossorigin:
         * <script src="https://cdn.example.com/lib.min.js"
         *   integrity="sha384-HASH" crossorigin="anonymous"></script>
         * Generate hashes: https://www.srihash.org/
         */}
                
        <link rel="preconnect" href="https://fonts.googleapis.com" />
                
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                
        <link rel="dns-prefetch" href="https://js.stripe.com" />
                
        <link rel="dns-prefetch" href="https://checkout.stripe.com" />
                {/* LCP optimisation: preload hero image */}
                
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" />
                {/* ── Structured data ── */}
                
              
      </Helmet>
            {/* [F-8] Skip-to-content for keyboard / assistive tech users */}
            
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
            {/* [F-14] aria-live region for screen reader toast announcements */}
            
      <div aria-live="polite" aria-atomic="true" className="sr-only" id="toast-announcer" />
            
      {/*
       * ══════════════════════════════════════════════════════════════
       * COLOURFUL VISUAL LAYER — gradient backgrounds & accent rings
       * applied via Tailwind utility classes layered on top of the
       * existing component tree. Swap colour tokens here to re-theme.
       * ══════════════════════════════════════════════════════════════
       */}
            
      <div
        className="
          min-h-screen bg-background
          [--colour-teal:#0F6E56] [--colour-coral:#E8633A]
          [--colour-lavender:#7C5CBF] [--colour-amber:#F5A623]
          [--colour-sky:#2A9ED8] [--colour-rose:#D94F70]
        "
      >
                {/* Decorative gradient orbs — purely visual, aria-hidden */}
                
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
                    {/* Top-left teal bloom */}
                    
          <div
            className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #0F6E56, transparent 70%)" }}
          />
                    {/* Top-right coral bloom */}
                    
          <div
            className="absolute -top-24 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #E8633A, transparent 70%)" }}
          />
                    {/* Mid-left lavender bloom */}
                    
          <div
            className="absolute top-1/3 -left-64 w-[700px] h-[700px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #7C5CBF, transparent 70%)" }}
          />
                    {/* Mid-right sky bloom */}
                    
          <div
            className="absolute top-1/2 -right-48 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #2A9ED8, transparent 70%)" }}
          />
                    {/* Bottom amber bloom */}
                    
          <div
            className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(ellipse, #F5A623, transparent 70%)" }}
          />
                  
        </div>
                
        <ScrollProgress />
                
        <Header />
                
        <DeferredOverlays />
                
        <main id="main-content" role="main" tabIndex={-1}>
                    {/* HERO — reduced top padding on desktop per design recommendation */}
                    
          <HeroSection />
                    {/* Colourful gradient divider — teal → coral */}
                    
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #0F6E56 0%, #2A9ED8 33%, #7C5CBF 66%, #E8633A 100%)",
            }}
          />
                    
          <Suspense fallback={<SectionLoader />}>
                        
            <QuickAccessSection />
                      
          </Suspense>
                    
          <Suspense fallback={<SectionLoader />}>
                        
            <ContentDepthSection />
                      
          </Suspense>
                    {/* Gradient divider — lavender → sky */}
                    
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #7C5CBF 0%, #2A9ED8 50%, #0F6E56 100%)",
            }}
          />
                    
          <Suspense fallback={<SectionLoader />}>
                        
            <HowItWorksSection />
                      
          </Suspense>
                    
          <ViewportSection minHeight="400px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <ServicesGrid />
                          
            </Suspense>
                      
          </ViewportSection>
                    {/* Community photo break */}
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={null}>
                            
              <PhotoBreakSection
                image={photoBreakCommunity}
                alt="Community members supporting each other while living with arthritis"
                quote="No one should face arthritis alone. Together, we're changing what's possible."
                attribution="Living With Arthritis UK"
              />
                          
            </Suspense>
                      
          </ViewportSection>
                    
          <ViewportSection minHeight="200px">
                        
            <Suspense fallback={null}>
                            
              <QuoteSection />
                          
            </Suspense>
                      
          </ViewportSection>
                    {/* Gradient divider — coral → amber */}
                    
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #E8633A 0%, #F5A623 50%, #D94F70 100%)",
            }}
          />
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <AboutSection />
                          
            </Suspense>
                      
          </ViewportSection>
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <TestimonialsSection />
                          
            </Suspense>
                      
          </ViewportSection>
                    {/* Active lifestyle photo break */}
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={null}>
                            
              <PhotoBreakSection
                image={photoBreakActive}
                alt="Senior couple enjoying an active lifestyle supported by arthritis care"
                quote="Movement is medicine. Every step forward is a victory worth celebrating."
                attribution="Clinical Team, Living With Arthritis UK"
              />
                          
            </Suspense>
                      
          </ViewportSection>
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <DonationImpactSection />
                          
            </Suspense>
                      
          </ViewportSection>
                    {/* Gradient divider — full spectrum */}
                    
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #0F6E56, #2A9ED8, #7C5CBF, #D94F70, #F5A623)",
            }}
          />
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <FAQSection />
                          
            </Suspense>
                      
          </ViewportSection>
                    
          <ViewportSection minHeight="200px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <NewsletterSection />
                          
            </Suspense>
                      
          </ViewportSection>
                    {/* Gradient divider — teal → sky */}
                    
          <div
            aria-hidden="true"
            className="h-1 w-full"
            style={{
              background: "linear-gradient(90deg, #0F6E56 0%, #2A9ED8 100%)",
            }}
          />
                    
          <ViewportSection minHeight="300px">
                        
            <Suspense fallback={<SectionLoader />}>
                            
              <GetInTouchSection />
                          
            </Suspense>
                      
          </ViewportSection>
                  
        </main>
                
        {/*
         * [S-7] noscript — minimal, no PII or sensitive operational details.
         * REMOVED: phone number, internal tech stack hints.
         */}
                
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
                            Free physiotherapy, anti-inflammatory diet plans, evidence-based               exercises and
              24/7 support for arthritis and joint pain in the               UK. No referrals or waiting lists.
                          
            </p>
                        
            <p>
                            Please enable JavaScript to use this site, or contact us at               
              <a href="mailto:info@livingwitharthritis.org.uk">
                                info@livingwitharthritis.org.uk               
              </a>
                          
            </p>
                        
            <p>
                            
              <em>                Operated by LIVING WITH ARTHRITIS LTD (social enterprise).               </em>
                          
            </p>
                      
          </div>
                  
        </noscript>
                
        <Suspense fallback={<div className="h-96 bg-muted" aria-hidden="true" />}>
                    
          <Footer />
                  
        </Suspense>
              
      </div>
          
    </ErrorBoundary>
  );
}
{
  /* Example: Place this in your Governance / Policies / About page */
}
<section className="max-w-4xl mx-auto px-6 py-16">
  <h1 className="text-4xl font-bold tracking-tight mb-8">Governance & Policies</h1>

  <p className="text-lg text-muted-foreground mb-12">
    Living With Arthritis UK is a social enterprise committed to transparency, accountability, and the highest standards
    of governance. We are operated by <strong>LIVING WITH ARTHRITIS LTD</strong>, a company registered in England and
    Wales.
  </p>

  {/* Charitable Objects – Improved */}
  <div className="mb-16">
    <h2 className="text-2xl font-semibold mb-4">Our Charitable Objects</h2>
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <p>
        The objects of the organisation are to relieve sickness and distress and to promote good health, for the public
        benefit, among people living with arthritis, joint pain, and related musculoskeletal conditions in the United
        Kingdom.
      </p>
      <p>In particular, we advance these aims by providing free, accessible, and evidence-based support including:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Virtual physiotherapy and personalised exercise programmes</li>
        <li>Anti-inflammatory nutrition guidance and lifestyle support</li>
        <li>AI-powered health assistance and educational resources</li>
        <li>Peer support communities and emotional wellbeing services</li>
        <li>Information and guidance to help people manage their condition effectively and improve quality of life</li>
      </ul>
      <p className="mt-4">
        We aim to remove barriers to care by offering immediate access to HCPC-registered clinicians with no waiting
        lists or referrals required.
      </p>
    </div>
  </div>

  {/* Registered Details – Updated Address */}
  <div className="mb-16">
    <h2 className="text-2xl font-semibold mb-4">Registered Details</h2>
    <div className="bg-muted/50 p-6 rounded-xl space-y-4">
      <p>
        <strong>Operating Name:</strong> Living With Arthritis UK
      </p>
      <p>
        <strong>Company Name:</strong> LIVING WITH ARTHRITIS LTD
      </p>
      <p>
        <strong>Registered Address:</strong>
        <br />
        Oswestry Health Centre
        <br />
        Thomas Savin Road
        <br />
        Off Gobowen Road
        <br />
        Oswestry
        <br />
        SY11 1GA
      </p>
      <p>
        <strong>Contact Email:</strong>{" "}
        <a href="mailto:info@livingwitharthritis.org.uk" className="underline">
          info@livingwitharthritis.org.uk
        </a>
      </p>
    </div>
  </div>

  {/* Complaints Procedure – Email Added */}
  <div className="mb-16">
    <h2 className="text-2xl font-semibold mb-4">Complaints Procedure</h2>
    <p className="mb-4">
      We are committed to providing high-quality services and welcome feedback to help us improve. If you have a
      complaint about any aspect of our service, please contact us as soon as possible.
    </p>
    <p className="mb-6">
      You can reach our team by email at{" "}
      <a href="mailto:info@livingwitharthritis.org.uk" className="font-medium underline">
        info@livingwitharthritis.org.uk
      </a>
      .
    </p>
    <p>
      We aim to acknowledge all complaints within 3 working days and provide a full response within 15 working days. If
      you are not satisfied with the outcome, you may request a review by a senior member of the team.
    </p>
  </div>

  {/* Other Policies (keep or expand as needed) */}
  <div>
    <h2 className="text-2xl font-semibold mb-6">Our Policies</h2>
    <ul className="grid gap-4 md:grid-cols-2">
      <li className="border rounded-lg p-5 hover:bg-muted/50 transition-colors">
        <a href="/policies/privacy" className="font-medium block">
          Privacy Policy
        </a>
        <p className="text-sm text-muted-foreground mt-1">How we collect, use and protect your personal information.</p>
      </li>
      <li className="border rounded-lg p-5 hover:bg-muted/50 transition-colors">
        <a href="/policies/safeguarding" className="font-medium block">
          Safeguarding Policy
        </a>
        <p className="text-sm text-muted-foreground mt-1">Our commitment to protecting vulnerable adults.</p>
      </li>
      <li className="border rounded-lg p-5 hover:bg-muted/50 transition-colors">
        <a href="/policies/accessibility" className="font-medium block">
          Accessibility Statement
        </a>
        <p className="text-sm text-muted-foreground mt-1">Our dedication to making our services inclusive.</p>
      </li>
      <li className="border rounded-lg p-5 hover:bg-muted/50 transition-colors">
        <a href="/policies/data-protection" className="font-medium block">
          Data Protection Policy
        </a>
        <p className="text-sm text-muted-foreground mt-1">Compliance with UK GDPR and best practices.</p>
      </li>
    </ul>
  </div>

  <p className="text-sm text-muted-foreground mt-16">
    Last reviewed: April 2026. We review our governance documents regularly to ensure they remain fit for purpose.
  </p>
</section>;
