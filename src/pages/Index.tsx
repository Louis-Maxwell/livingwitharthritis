import { lazy, Suspense, memo, useEffect, useRef, useState, useCallback, createContext, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import { photoBreakCommunity, photoBreakActive } from "@/data/images";

/* ═══════════════════════════════════════════════════════════════════════════
   LAZY IMPORTS
   ═══════════════════════════════════════════════════════════════════════════ */
const FeedbackPopup = lazy(() => import("@/components/FeedbackPopup"));
const Footer = lazy(() => import("@/components/Footer"));
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const ContentDepthSection = lazy(() => import("@/components/landing/ContentDepthSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const GeometricCubeSection = lazy(() => import("@/components/landing/GeometricCubeSection"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));
const GetInTouchSection = lazy(() => import("@/components/landing/GetInTouchSection"));

const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";

/* ═══════════════════════════════════════════════════════════════════════════
   🔴 SECURITY: Strict Text Sanitization (XSS Prevention)
   ═══════════════════════════════════════════════════════════════════════════ */
const ESCAPE_MAP: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" };
const ESCAPE_RE = /[&<>"']/g;
const sanitize = (str: string, max = 500) =>
  typeof str === "string"
    ? str
        .trim()
        .slice(0, max)
        .replace(ESCAPE_RE, (c) => ESCAPE_MAP[c] || c)
    : "";

/* ═══════════════════════════════════════════════════════════════════════════
   GDPR COOKIE CONSENT CONTEXT
   ═══════════════════════════════════════════════════════════════════════════ */
type ConsentCtx = { analytics: boolean; setAnalytics: (v: boolean) => void };
const CookieCtx = createContext<ConsentCtx>({ analytics: false, setAnalytics: () => {} });
const useCookieCtx = () => useContext(CookieCtx);

const CookieBanner = memo(() => {
  const { analytics, setAnalytics } = useCookieCtx();
  const [show, setShow] = useState(() => !localStorage.getItem("lwa_consent_v1"));
  const accept = () => {
    localStorage.setItem("lwa_consent_v1", JSON.stringify({ a: true }));
    setAnalytics(true);
    setShow(false);
  };
  const reject = () => {
    localStorage.setItem("lwa_consent_v1", JSON.stringify({ a: false }));
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row items-center gap-4">
        <p className="flex-1 text-sm text-gray-600">
          We use essential cookies to run this site. Analytics cookies help us improve it.{" "}
          <Link to="/privacy" className="text-teal-700 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   🟢 ADVANCED GRAPHICS: Animated Tech Grid & Glassmorphism
   ═══════════════════════════════════════════════════════════════════════════ */
const AdvancedGridBg = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
      <defs>
        <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-teal-800" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tech-grid)" />
    </svg>
    {/* Animated Gradient Orbs */}
    <div
      className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-400/20 rounded-full blur-[120px] animate-pulse"
      style={{ animationDuration: "8s" }}
    />
    <div
      className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse"
      style={{ animationDuration: "10s", animationDelay: "2s" }}
    />
    <div
      className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[80px] animate-pulse"
      style={{ animationDuration: "12s", animationDelay: "4s" }}
    />
  </div>
));

const GlassCard = memo(({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={`relative bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
));

/* ═══════════════════════════════════════════════════════════════════════════
   INSPIRED BY UNMIND: AI TRUST & SAFETY SECTION (Paraphrased)
   Concepts adapted: Clinical Governance, Transparency, Privacy, Fairness.
   ═══════════════════════════════════════════════════════════════════════════ */
const AITrustSection = memo(() => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: "Co-Designed with Clinicians",
      desc: "Our AI health assistant was built hand-in-hand with HCPC-registered physiotherapists and rheumatologists. It acts as a supportive triage tool to guide you, never as a replacement for professional medical judgement.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Zero Black Boxes",
      desc: "We believe you deserve to know *why* a specific exercise or dietary change is suggested. Our algorithms provide clear, jargon-free explanations, ensuring you remain in complete control of your care journey.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      title: "UK Data Sovereignty",
      desc: "Your health data is heavily encrypted, stored securely within the UK, and strictly governed by UK GDPR and ICO standards. We will never sell, share, or misuse your personal information. Period.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
          />
        </svg>
      ),
      title: "Mitigated Bias",
      desc: "Trained on diverse UK health demographics, our AI undergoes rigorous, continuous audits to ensure it provides equitable care recommendations—regardless of your age, ethnicity, or location in the UK.",
    },
  ];

  return (
    <section
      aria-labelledby="ai-trust-heading"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      <AdvancedGridBg />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
              />
            </svg>
            Responsible AI
          </div>
          <h2
            id="ai-trust-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]"
          >
            Intelligence you can{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600">trust.</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed">
            Our AI Health Assistant wasn't just engineered—it was co-designed with clinical experts to ensure it serves
            you safely, transparently, and fairly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((f) => (
            <GlassCard
              key={f.title}
              className="p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>

        {/* Advanced Security Footer Graphic */}
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <div className="flex -space-x-2">
              {["bg-teal-200", "bg-purple-200", "bg-blue-200", "bg-amber-200"].map((bg, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}
                >
                  <svg
                    className="w-3.5 h-3.5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              ))}
            </div>
            <span>Audited by independent UK clinical leads</span>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   SKELETON LOADERS
   ═══════════════════════════════════════════════════════════════════════════ */
const SKEL_CSS = `@keyframes sk{0%{background-position:-400px 0}100%{background-position:400px 0}}.sk{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:800px 100%;animation:sk 1.5s infinite}@media(prefers-reduced-motion:reduce){.sk{animation:none;background:#f0f0f0}}`;
const Skel = memo(({ c = "h-4 w-full" }: { c?: string }) => (
  <div className={`sk rounded-lg ${c}`} aria-hidden="true" />
));
const SkeletonSection = memo(() => (
  <div className="py-20 space-y-4 max-w-3xl mx-auto px-4" aria-hidden="true">
    <Skel c="h-6 w-48 mx-auto" />
    <Skel c="h-10 w-96 mx-auto" />
    <Skel c="h-4 w-full" />
    <Skel c="h-4 w-5/6" />
  </div>
));

/* ═══════════════════════════════════════════════════════════════════════════
   MINOR UI COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
const TrustBar = memo(() => (
  <section aria-label="Trust" className="border-b border-teal-100 bg-teal-50/50">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-teal-800">
      {["HCPC Registered", "ICO Compliant", "UK Social Enterprise", "No Waiting Lists"].map((t) => (
        <span key={t} className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          {t}
        </span>
      ))}
    </div>
  </section>
));

const BackToTop = memo(() => {
  const [v, setV] = useState(false);
  useEffect(() => {
    const fn = () => setV(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!v) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full bg-white shadow-lg ring-1 ring-black/10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-teal-600"
      aria-label="Back to top"
      type="button"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
});

const SecureImage = memo(
  ({
    src,
    alt,
    className,
    ...rest
  }: { src: string; alt: string; className?: string } & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onError">) => {
    const [err, setErr] = useState(false);
    if (err)
      return (
        <div className={`bg-gray-100 flex items-center justify-center ${className}`} role="img" aria-label={alt}>
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        </div>
      );
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={() => setErr(true)}
        {...rest}
      />
    );
  },
);

/* ═══════════════════════════════════════════════════════════════════════════
   STRUCTURED DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const schemaOrg = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO"],
  name: SITE_NAME,
  url: SITE_URL,
  areaServed: { "@type": "Country", name: "United Kingdom" },
  medicalSpecialty: "Rheumatology",
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "HCPC Registration" },
};
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is your AI safe?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. It is co-designed with clinicians, transparent, and strictly UK GDPR compliant.",
      },
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function PageContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const toastShown = useRef(false);
  const { analytics, setAnalytics } = useCookieCtx();

  // 🔴 SECURITY: Analytics loaded ONLY on explicit GDPR consent
  useEffect(() => {
    if (!analytics || analytics === undefined) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    document.head.appendChild(s);
    const i = document.createElement("script");
    i.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX',{anonymize_ip:true});`;
    document.head.appendChild(i);
  }, [analytics]);

  // Donation Callback
  useEffect(() => {
    if (toastShown.current) return;
    const d = searchParams.get("donation");
    if (d === "success" || d === "cancelled") {
      toastShown.current = true;
      toast.success(d === "success" ? "Thank you for your donation!" : "Donation cancelled.", { duration: 5000 });
      setSearchParams(() => new URLSearchParams(), { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <Helmet>
        <html lang="en-GB" />
        <title>Free Arthritis Support UK — AI-Guided Physio & Diet | {SITE_NAME}</title>
        <meta
          name="description"
          content="Free AI-guided physiotherapy, anti-inflammatory diet plans, and joint exercises for arthritis in the UK. Safe, transparent, HCPC-registered clinicians."
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta name="geo.region" content="GB" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0f766e" />
        {/* Security: External links must not leak referrers */}
        <meta name="robots" content="max-image-preview:large" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" fetchPriority="high" />
        {/* Advanced Graphics + Accessibility + Security CSS */}
        <style>{`${SKEL_CSS} html{scroll-padding-top:1rem} body{font-size:17px;line-height:1.7;-webkit-font-smoothing:antialiased} *:focus-visible{outline:2px solid #0f766e;outline-offset:2px} @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important}} @media print{nav,footer{display:none!important}}`}</style>
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
      </Helmet>

      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[9999] bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm -translate-y-20 focus:translate-y-0 transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700"
      >
        Skip to main
      </a>

      <div className="min-h-screen bg-stone-50 text-gray-900 antialiased">
        {/* Ambient Background Gradients */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px]" />
          <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
        </div>

        <ScrollProgress />
        <Header />
        <TrustBar />

        <main id="main-content" role="main" tabIndex={-1}>
          <HeroSection />

          {/* Quick Access */}
          <Suspense fallback={<SkeletonSection />}>
            <QuickAccessSection />
          </Suspense>

          {/* 🌟 NEW: Unmind-Inspired AI Trust & Safety Section with Advanced Graphics */}
          <AITrustSection />

          {/* How it works */}
          <Suspense fallback={<SkeletonSection />}>
            <HowItWorksSection />
          </Suspense>

          {/* Services */}
          <Suspense fallback={<SkeletonSection />}>
            <ServicesGrid />
          </Suspense>

          {/* Visual Break 1 */}
          <Suspense fallback={null}>
            <GeometricCubeSection />
          </Suspense>
          <section aria-label="Photo break" className="relative h-[400px] overflow-hidden bg-gray-900">
            <SecureImage
              src={photoBreakCommunity}
              alt="UK community supporting each other with arthritis"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            <div className="absolute bottom-0 p-10 lg:p-16 max-w-3xl">
              <p
                className="text-2xl lg:text-3xl font-semibold text-white"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
              >
                &ldquo;No one should face arthritis alone. Together, we're changing what's possible.&rdquo;
              </p>
              <cite className="block mt-3 text-teal-200 font-medium not-italic">{SITE_NAME}</cite>
            </div>
          </section>

          <Suspense fallback={<SkeletonSection />}>
            <ContentDepthSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <QuoteSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <TestimonialsSection />
          </Suspense>

          {/* Visual Break 2 */}
          <section aria-label="Photo break" className="relative h-[400px] overflow-hidden bg-gray-900">
            <SecureImage
              src={photoBreakActive}
              alt="Active lifestyle supported by arthritis care"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
            <div className="absolute bottom-0 p-10 lg:p-16 max-w-3xl">
              <p
                className="text-2xl lg:text-3xl font-semibold text-white"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
              >
                &ldquo;Movement is medicine. Every step forward is a victory.&rdquo;
              </p>
              <cite className="block mt-3 text-teal-200 font-medium not-italic">Clinical Team</cite>
            </div>
          </section>

          <Suspense fallback={<SkeletonSection />}>
            <DonationImpactSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <FAQSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <NewsletterSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <GetInTouchSection />
          </Suspense>
        </main>

        <BackToTop />
        <CookieBanner />

        <noscript>
          <div
            style={{
              padding: "3rem",
              textAlign: "center",
              fontFamily: "sans-serif",
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <h1 style={{ color: "#0f766e" }}>Living With Arthritis UK</h1>
            <p>
              Please enable JavaScript or contact{" "}
              <a href="mailto:info@livingwitharthritis.org.uk" style={{ color: "#0f766e" }}>
                info@livingwitharthritis.org.uk
              </a>
            </p>
          </div>
        </noscript>

        <Suspense fallback={<div className="h-80 bg-gray-900" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default function Index() {
  const [analytics, setAnalytics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lwa_consent_v1") || "{}").a === true;
    } catch {
      return false;
    }
  });

  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center p-12 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-4">Error loading page</h1>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-gray-900 text-white rounded-lg">
              Refresh
            </button>
          </div>
        </div>
      }
    >
      <CookieCtx.Provider value={{ analytics, setAnalytics }}>
        <PageContent />
      </CookieCtx.Provider>
    </ErrorBoundary>
  );
}
