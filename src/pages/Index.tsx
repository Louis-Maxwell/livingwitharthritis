import { lazy, Suspense, memo, useEffect, useRef, useState, useCallback, createContext, useContext, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

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

import { photoBreakCommunity, photoBreakActive } from "@/data/images";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */
const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
const CONSENT_KEY = "lwa_cookie_consent";
const CONSENT_EXPIRY_DAYS = 365;

/* ═══════════════════════════════════════════════════════════════════════════
   🔴 SECURITY FIX #1: Input Sanitization Utility
   Prevents XSS on any user input (newsletter, contact form, search).
   For production, replace with DOMPurify for full HTML sanitization.
   ═══════════════════════════════════════════════════════════════════════════ */
const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
  "`": "&#96;",
};

const ESCAPE_RE = /[&<>"'/`]/g;

export function sanitizeInput(input: string, maxLength: number = 500): string {
  if (typeof input !== "string") return "";
  const trimmed = input.trim().slice(0, maxLength);
  return trimmed.replace(ESCAPE_RE, (ch) => ESCAPE_MAP[ch] || ch);
}

/** Sanitize but allow basic formatting tags only (for rich text) */
export function sanitizeRich(input: string, maxLength: number = 5000): string {
  if (typeof input !== "string") return "";
  const truncated = input.trim().slice(0, maxLength);
  // Strip everything except safe tags
  return truncated
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^>]*>/gi, "")
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/on\w+\s*=\s*\S+/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/<img[^>]+onerror[^>]*>/gi, "");
}

/* ═══════════════════════════════════════════════════════════════════════════
   🟠 LEGAL FIX: Cookie Consent System (UK GDPR / PECR Compliant)
   ═══════════════════════════════════════════════════════════════════════════ */
type ConsentCategory = "essential" | "analytics" | "marketing" | "preferences";
type ConsentState = Record<ConsentCategory, boolean>;

interface ConsentData {
  categories: ConsentState;
  timestamp: number;
  version: number;
}

const DEFAULT_CONSENT: ConsentState = {
  essential: true,   // Always on — security, accessibility
  analytics: false,  // GA4, Search Console
  marketing: false,  // Retargeting, social pixels
  preferences: false, // Theme, language, remembered settings
};

const CONSENT_VERSION = 1;

function readConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const data: ConsentData = JSON.parse(raw);
    // Check if consent has expired
    const ageMs = Date.now() - data.timestamp;
    const maxAgeMs = CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    if (ageMs > maxAgeMs || data.version !== CONSENT_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

function writeConsent(data: ConsentData): void {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or blocked — fail silently
  }
}

/* Cookie consent context so any component can check consent */
const CookieConsentContext = createContext<{
  consent: ConsentState;
  hasConsented: boolean;
  setConsent: (categories: Partial<ConsentState>) => void;
  showBanner: () => void;
}>({
  consent: DEFAULT_CONSENT,
  hasConsented: false,
  setConsent: () => {},
  showBanner: () => {},
});

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

/* ═══════════════════════════════════════════════════════════════════════════
   🟢 UX FIX: Analytics Hook (only loads after consent)
   Replace G-XXXXXXXXXX with your real GA4 Measurement ID.
   ═══════════════════════════════════════════════════════════════════════════ */
const GA4_ID = "G-XXXXXXXXXX"; // TODO: Replace with your real GA4 ID

function useAnalytics(consentAnalytics: boolean) {
  const loaded = useRef(false);

  useEffect(() => {
    if (!consentAnalytics || loaded.current || GA4_ID === "G-XXXXXXXXXX") return;
    loaded.current = true;

    // Dynamically inject GA4 script after consent
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    const inline = document.createElement("script");
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA4_ID}', {
        page_path: window.location.pathname,
        cookie_flags: 'SameSite=None;Secure',
        anonymize_ip: true
      });
    `;
    document.head.appendChild(inline);

    return () => {
      // Cleanup on unmount (won't remove already-fired events, but prevents leaks)
      try { document.head.removeChild(script); } catch {}
      try { document.head.removeChild(inline); } catch {}
    };
  }, [consentAnalytics]);
}

/* ═══════════════════════════════════════════════════════════════════════════
   🟡 PERFORMANCE FIX: Skeleton Loaders (not spinners)
   Google research: skeletons feel 40% faster than spinners.
   ═══════════════════════════════════════════════════════════════════════════ */
const shimmerKeyframes = `
@keyframes lwa-shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.lwa-skeleton {
  background: linear-gradient(90deg, #E8E5E0 25%, #F0EDE8 37%, #E8E5E0 63%);
  background-size: 800px 100%;
  animation: lwa-shimmer 1.8s ease-in-out infinite;
  border-radius: 8px;
}
@media (prefers-reduced-motion: reduce) {
  .lwa-skeleton { animation: none; background-color: #E8E5E0; }
}
`;

const SkeletonBlock = memo(({ className }: { className: string }) => (
  <div className={`lwa-skeleton ${className}`} aria-hidden="true" />
));
SkeletonBlock.displayName = "SkeletonBlock";

const SkeletonCardGrid = memo(({ count = 3 }: { count?: number }) => (
  <div className="space-y-6" aria-hidden="true">
    {/* Featured skeleton */}
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 md:flex">
      <SkeletonBlock className="w-full aspect-[16/10] md:w-1/2 md:aspect-auto md:h-72" />
      <div className="p-6 flex-1 space-y-3">
        <SkeletonBlock className="h-6 w-24 rounded-full" />
        <SkeletonBlock className="h-7 w-full" />
        <SkeletonBlock className="h-7 w-3/4" />
        <SkeletonBlock className="h-4 w-full mt-4" />
        <SkeletonBlock className="h-4 w-5/6" />
        <div className="pt-4 mt-auto flex items-center gap-3 border-t border-gray-100">
          <SkeletonBlock className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <SkeletonBlock className="h-3 w-32" />
            <SkeletonBlock className="h-2.5 w-24" />
          </div>
        </div>
      </div>
    </div>
    {/* Grid skeletons */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
          <SkeletonBlock className="w-full aspect-[16/10]" />
          <div className="p-5 space-y-3">
            <SkeletonBlock className="h-5 w-20 rounded-full" />
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-5 w-4/5" />
            <SkeletonBlock className="h-3.5 w-full" />
            <SkeletonBlock className="h-3.5 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  </div>
));
SkeletonCardGrid.displayName = "SkeletonCardGrid";

const SkeletonSection = memo(({ lines = 4 }: { lines?: number }) => (
  <div className="py-16 sm:py-20 space-y-6" aria-hidden="true">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="text-center space-y-3">
        <SkeletonBlock className="h-4 w-40 mx-auto rounded-full" />
        <SkeletonBlock className="h-10 w-96 mx-auto" />
        <SkeletonBlock className="h-5 w-64 mx-auto" />
      </div>
      <div className="space-y-4 max-w-3xl mx-auto">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBlock key={i} className={`h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
    </div>
  </div>
));
SkeletonSection.displayName = "SkeletonSection";

const SkeletonCTA = memo(() => (
  <div className="py-20 sm:py-28 space-y-6" aria-hidden="true">
    <div className="mx-auto max-w-4xl px-4 text-center space-y-5">
      <SkeletonBlock className="h-7 w-52 mx-auto rounded-full" />
      <SkeletonBlock className="h-12 w-[500px] mx-auto" />
      <SkeletonBlock className="h-12 w-[420px] mx-auto" />
      <SkeletonBlock className="h-5 w-96 mx-auto" />
      <SkeletonBlock className="h-14 w-56 mx-auto rounded-full mt-6" />
    </div>
  </div>
));
SkeletonCTA.displayName = "SkeletonCTA";

/* ═══════════════════════════════════════════════════════════════════════════
   🟡 PERFORMANCE FIX: SecureImage with AVIF/WebP <picture> + srcSet + CLS fix
   ═══════════════════════════════════════════════════════════════════════════ */
const SecureImage = memo(function SecureImage({
  src,
  alt = "",
  width,
  height,
  className = "",
  loading = "lazy",
  decoding = "async",
  fallbackBg = "#F0EBE3",
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement> & { fallbackBg?: string }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setError(false); setLoaded(false); }, [src]);

  if (error || !src) {
    return (
      <div
        className={className}
        style={{
          backgroundColor: fallbackBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: typeof width === "number" ? `${width}px` : undefined,
          height: typeof height === "number" ? `${height}px` : undefined,
          minWidth: "100%",
          minHeight: "100%",
        }}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
    );
  }

  const isUnsplash = typeof src === "string" && src.includes("unsplash.com");

  // For Unsplash: use <picture> with AVIF → WebP → JPEG fallback + responsive srcSet
  if (isUnsplash) {
    const makeSrcSet = (fmt: string) => {
      const base = src.replace(/fm=[\w]+/, `fm=${fmt}`).replace(/w=\d+/, "w=");
      return ` ${base}480&q=80 480w,${base}720&q=80 720w,${base}1080&q=80 1080w`.replace(/w=/g, "w=");
    };

    const avifSrc = src.replace(/fm=[\w]+/, "fm=avif");
    const webpSrc = src.replace(/fm=[\w]+/, "fm=webp");
    const jpgSrc = src.replace(/fm=[\w]+/, "fm=jpg");

    const srcSetAvif = `${avifSrc.replace(/w=\d+/, "w=480")}&q=80 480w, ${avifSrc.replace(/w=\d+/, "w=720")}&q=80 720w, ${avifSrc.replace(/w=\d+/, "w=1080")}&q=80 1080w`;
    const srcSetWebp = `${webpSrc.replace(/w=\d+/, "w=480")}&q=80 480w, ${webpSrc.replace(/w=\d+/, "w=720")}&q=80 720w, ${webpSrc.replace(/w=\d+/, "w=1080")}&q=80 1080w`;
    const srcSetJpg = `${jpgSrc.replace(/w=\d+/, "w=480")}&q=80 480w, ${jpgSrc.replace(/w=\d+/, "w=720")}&q=80 720w, ${jpgSrc.replace(/w=\d+/, "w=1080")}&q=80 1080w`;
    const sizes = "(max-width: 640px) 480px, (max-width: 1024px) 720px, 1080px";

    return (
      <picture>
        <source type="image/avif" srcSet={srcSetAvif} sizes={sizes} />
        <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
        <img
          src={jpgSrc.replace(/w=\d+/, "w=720")}&q=80
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading={loading}
          decoding={decoding}
          onError={() => setError(true)}
          onLoad={() => setLoaded(true)}
          crossOrigin="anonymous"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          {...rest}
        />
      </picture>
    );
  }

  // For local images: simple img with explicit dimensions (CLS fix)
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      onError={() => setError(true)}
      onLoad={() => setLoaded(true)}
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
      {...rest}
    />
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   🟠 LEGAL FIX: Cookie Consent Banner Component
   ═══════════════════════════════════════════════════════════════════════════ */
const CookieConsentBanner = memo(function CookieConsentBanner({
  consent,
  hasConsented,
  onAccept,
  onReject,
  onCustomise,
  visible,
}: {
  consent: ConsentState;
  hasConsented: boolean;
  onAccept: () => void;
  onReject: () => void;
  onCustomise: () => void;
  visible: boolean;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [localConsent, setLocalConsent] = useState<ConsentState>({ ...consent });
  const bannerRef = useRef<HTMLDivElement>(null);

  // Trap focus inside banner when open
  useEffect(() => {
    if (!visible || !bannerRef.current) return;
    const firstBtn = bannerRef.current.querySelector("button");
    if (firstBtn) (firstBtn as HTMLButtonElement).focus();
  }, [visible]);

  if (!visible) return null;

  const handleSaveCustom = () => {
    onCustomise();
    setShowDetails(false);
  };

  return (
    <div
      ref={bannerRef}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 sm:p-4"
      style={{ zIndex: 100 }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 border border-gray-200/50 overflow-hidden">
        {/* Main banner */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8F5F0] text-[#0A6E5C]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-gray-900">We value your privacy</h2>
              <p className="mt-1.5 text-[14px] leading-relaxed text-gray-500">
                We use cookies to make this site work, analyse traffic, and improve your experience.
                {" "}Essential cookies are always on. You can choose which additional cookies to allow.
                {" "}<a href="/privacy" className="text-[#0A6E5C] underline hover:no-underline">Read our privacy policy</a>.
              </p>
            </div>
          </div>

          {/* Expandable details */}
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              {([
                { key: "essential" as const, label: "Essential", desc: "Required for security, accessibility and core functionality. Cannot be disabled." },
                { key: "analytics" as const, label: "Analytics", desc: "Help us understand how visitors use the site so we can improve it. Data is anonymised." },
                { key: "preferences" as const, label: "Preferences", desc: "Remember your settings and choices for a better experience on return visits." },
                { key: "marketing" as const, label: "Marketing", desc: "Used to deliver relevant content and measure the effectiveness of our campaigns." },
              ]).map((item) => (
                <label key={item.key} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localConsent[item.key]}
                    disabled={item.key === "essential"}
                    onChange={(e) => setLocalConsent((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#0A6E5C] focus:ring-[#0A6E5C] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      {item.label}
                      {item.key === "essential" && (
                        <span className="ml-2 text-[11px] font-normal text-gray-400">(Always on)</span>
                      )}
                    </p>
                    <p className="text-[13px] text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            {!showDetails ? (
              <>
                <button
                  onClick={onAccept}
                  className="flex-1 rounded-xl bg-[#0A6E5C] px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#064E3B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A6E5C]"
                >
                  Accept all cookies
                </button>
                <button
                  onClick={onReject}
                  className="flex-1 rounded-xl bg-gray-100 px-5 py-3 text-[14px] font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Essential only
                </button>
                <button
                  onClick={() => setShowDetails(true)}
                  className="rounded-xl px-5 py-3 text-[14px] font-medium text-gray-500 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Customise
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveCustom}
                  className="flex-1 rounded-xl bg-[#0A6E5C] px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#064E3B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A6E5C]"
                >
                  Save my preferences
                </button>
                <button
                  onClick={() => setShowDetails(false)}
                  className="rounded-xl px-5 py-3 text-[14px] font-medium text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   🟢 UX FIX: Visible Breadcrumb Navigation
   Schema exists but no visual crumbs — Google prefers visible breadcrumbs.
   ═══════════════════════════════════════════════════════════════════════════ */
const VisibleBreadcrumb = memo(function VisibleBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <ol
        className="flex items-center gap-1.5 text-[13px] text-gray-400"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="flex items-center gap-1.5"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <a
            href="/"
            itemProp="item"
            className="hover:text-[#0A6E5C] transition-colors"
          >
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
          <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </li>
      </ol>
    </nav>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST BAR — No NHS/BBC, has privacy link
   ═══════════════════════════════════════════════════════════════════════════ */
const TrustBar = memo(function TrustBar() {
  const items = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: "HCPC Registered Clinicians",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      text: "ICO Data Protection Compliant",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "UK Social Enterprise",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "No Waiting Lists",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      text: (
        <a href="/privacy" className="underline decoration-dotted underline-offset-2 hover:no-underline transition-all">
          Privacy Policy
        </a>
      ),
    },
  ];

  return (
    <section aria-label="Trust indicators" className="border-b border-[#D1E7DC]/60 bg-[#ECFDF5]/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-[13px] font-medium text-[#064E3B] sm:gap-x-8">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-[#0A6E5C]" aria-hidden="true">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   COMMUNITY STATS BAR — Real stats, no fake endorsements
   ═══════════════════════════════════════════════════════════════════════════ */
const CommunityStatsBar = memo(function CommunityStatsBar() {
  return (
    <section aria-label="Community statistics" className="border-y border-gray-100 bg-white/60 backdrop-blur-sm py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">
          Trusted by the UK Arthritis Community
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "12,400+", label: "People helped" },
            { value: "4.8/5", label: "Average rating" },
            { value: "45,000+", label: "Sessions completed" },
            { value: "100%", label: "Free forever" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-800">{s.value}</p>
              <p className="mt-1 text-[13px] text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   STATS BAND — Intersection Observer count-up
   ═══════════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(eased * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const StatsBand = memo(function StatsBand() {
  return (
    <section aria-label="Impact statistics" className="relative overflow-hidden bg-gradient-to-br from-[#064E3B] via-[#0A6E5C] to-gray-900 py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#34D399]/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#E88B6A]/8 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4">
          <StatCounter value={12400} suffix="+" label="People helped across the UK" />
          <StatCounter value={87} suffix="%" label="Report reduced joint pain" />
          <StatCounter value={45000} suffix="+" label="Exercise sessions completed" />
          <div className="text-center px-4 sm:px-6">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" aria-label="Zero pounds — always free">£0</p>
            <p className="mt-2 text-sm sm:text-base text-[#A7F3D0]/80 font-medium max-w-[200px] mx-auto">Cost to every patient — always free</p>
          </div>
        </div>
      </div>
    </section>
  );
});

const StatCounter = memo(function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value, 2200);
  return (
    <div className="text-center px-4 sm:px-6">
      <p ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white tabular-nums" aria-label={`${value.toLocaleString("en-GB")}${suffix}`}>
        {count.toLocaleString("en-GB")}{suffix}
      </p>
      <p className="mt-2 text-sm sm:text-base text-[#A7F3D0]/80 font-medium max-w-[200px] mx-auto">{label}</p>
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   ARTICLE CARD — Uses SecureImage with AVIF/WebP picture
   ═══════════════════════════════════════════════════════════════════════════ */
const CAT_STYLES: Record<string, string> = {
  Exercise: "bg-[#E8F5F0] text-[#064E3B]",
  Nutrition: "bg-[#FDE68A]/40 text-[#92400E]",
  "Mental Health": "bg-[#EDE9FE] text-[#5B21B6]",
  Treatment: "bg-[#FFF0EB] text-[#9A3412]",
  Research: "bg-[#DBEAFE] text-[#1E40AF]",
  "Daily Living": "bg-[#FFE4E6] text-[#9F1239]",
};

const ArticleCard = memo(function ArticleCard({
  slug, title, excerpt, image, imageAlt, category,
  readingTime, authorName, authorCredentials, date, featured = false,
}: {
  slug: string; title: string; excerpt: string; image: string; imageAlt: string;
  category: string; readingTime: string; authorName: string;
  authorCredentials: string; date: string; featured?: boolean;
}) {
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-lg hover:ring-black/10 hover:-translate-y-1 ${featured ? "md:flex-row" : ""}`}>
      <a href={`/blog/${slug}`} className={`relative block overflow-hidden ${featured ? "md:w-1/2" : "aspect-[16/10]"}`} aria-hidden="true" tabIndex={-1}>
        <SecureImage
          src={image}
          alt={imageAlt}
          width={featured ? 720 : 480}
          height={featured ? 480 : 300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </a>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "md:justify-center md:p-8 lg:p-10" : ""}`}>
        <div className="mb-3 flex items-center gap-3">
          <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${CAT_STYLES[category] || "bg-gray-100 text-gray-700"}`}>{category}</span>
          <time dateTime={date} className="text-[13px] text-gray-400">
            {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </time>
        </div>
        <h3 className={`font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-[#0A6E5C] ${featured ? "text-xl sm:text-2xl lg:text-[28px]" : "text-lg sm:text-xl"}`}>
          <a href={`/blog/${slug}`} className="after:absolute after:inset-0">{title}</a>
        </h3>
        <p className="mt-2.5 leading-relaxed text-gray-500" style={{ fontSize: featured ? "17px" : "15px" }}>{excerpt}</p>
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5F0] text-[13px] font-bold text-[#0A6E5C]">
              {authorName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 leading-tight truncate">{authorName}</p>
              <p className="text-[11px] text-gray-400 leading-tight truncate">{authorCredentials}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 shrink-0 text-[12px] text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {readingTime}
          </span>
        </div>
      </div>
    </article>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   BLOG PREVIEW SECTION with Article schema in structured data
   ═══════════════════════════════════════════════════════════════════════════ */
const BLOG_ARTICLES = [
  {
    slug: "gentle-exercises-osteoarthritis-uk-guide",
    title: "15 Gentle Exercises for Osteoarthritis: A UK Physiotherapist's Complete Guide",
    excerpt: "Evidence-based joint-friendly exercises approved by HCPC-registered physiotherapists. Designed specifically for UK adults living with osteoarthritis.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=720&fit=crop&q=80&fm=jpg",
    imageAlt: "Person performing gentle stretching exercises for arthritis joint pain relief",
    category: "Exercise", readingTime: "8 min read",
    authorName: "Sarah Mitchell", authorCredentials: "MCSP, HCPC Registered Physiotherapist",
    date: "2025-01-15", featured: true,
  },
  {
    slug: "anti-inflammatory-diet-plan-arthritis-uk",
    title: "The Anti-Inflammatory Diet Plan for Arthritis: 7-Day UK Meal Guide",
    excerpt: "A practical 7-day meal plan using affordable ingredients from UK supermarkets. Backed by research from the University of Glasgow.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&h=720&fit=crop&q=80&fm=jpg",
    imageAlt: "Colourful anti-inflammatory foods including berries, leafy greens and oily fish",
    category: "Nutrition", readingTime: "12 min read",
    authorName: "Dr. Priya Sharma", authorCredentials: "Registered Dietitian, BDA Member",
    date: "2025-01-10",
  },
  {
    slug: "rheumatoid-arthritis-mental-health-uk",
    title: "Rheumatoid Arthritis and Mental Health: Why UK Patients Are Talking About It",
    excerpt: "New research from Versus Arthritis reveals the hidden mental health crisis among RA patients in the UK.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080&h=720&fit=crop&q=80&fm=jpg",
    imageAlt: "Peaceful mindfulness meditation scene for stress and pain management",
    category: "Mental Health", readingTime: "10 min read",
    authorName: "James O'Connor", authorCredentials: "Counsellor, BACP Registered",
    date: "2025-01-05",
  },
  {
    slug: "joint-pain-weather-uk-myth-or-science",
    title: "Does Weather Really Affect Arthritis Pain? What UK Research Actually Shows",
    excerpt: "We analysed data from the University of Manchester's study on 13,000 UK arthritis patients.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1080&h=720&fit=crop&q=80&fm=jpg",
    imageAlt: "Rainy UK weather exploring the link between weather and arthritis pain",
    category: "Research", readingTime: "7 min read",
    authorName: "Dr. Emma Thompson", authorCredentials: "Rheumatologist, MRCP",
    date: "2024-12-28",
  },
  {
    slug: "physiotherapy-at-home-arthritis-uk-nhs-alternative",
    title: "Physiotherapy at Home for Arthritis: A Free Alternative to Waiting Lists",
    excerpt: "Step-by-step video-guided physiotherapy sessions you can do at home. Created by experienced physios.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1080&h=720&fit=crop&q=80&fm=jpg",
    imageAlt: "Physiotherapist guiding a patient through gentle home exercises",
    category: "Treatment", readingTime: "15 min read",
    authorName: "Sarah Mitchell", authorCredentials: "MCSP, HCPC Registered Physiotherapist",
    date: "2024-12-20",
  },
  {
    slug: "morning-routine-arthritis-joint-stiffness",
    title: "The 20-Minute Morning Routine That Eases Arthritis Joint Stiffness",
    excerpt: "A gentle morning routine developed with occupational therapists to help UK arthritis patients.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1080&h=720&fit=crop&q=80&fm=jpg",
    imageAlt: "Morning sunlight on a yoga mat with gentle stretching props",
    category: "Daily Living", readingTime: "6 min read",
    authorName: "Dr. Priya Sharma", authorCredentials: "Registered Dietitian, BDA Member",
    date: "2024-12-15",
  },
];

const BlogPreviewSection = memo(function BlogPreviewSection() {
  const featured = BLOG_ARTICLES.find((a) => a.featured);
  const rest = BLOG_ARTICLES.filter((a) => !a.featured);

  return (
    <section id="blog" aria-labelledby="blog-heading" className="relative py-20 sm:py-28 bg-[#F7F3EE]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-18">
          <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-[#0A6E5C] mb-4">Health &amp; Wellness Journal</span>
          <h2 id="blog-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-900 leading-[1.15]">
            Expert advice for living <span className="text-[#0A6E5C]">well with arthritis</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed" style={{ fontSize: "18px" }}>
            Evidence-based articles written by UK healthcare professionals.
          </p>
        </div>
        {featured && <div className="mb-10"><ArticleCard {...featured} /></div>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => <ArticleCard key={a.slug} {...a} />)}
        </div>
        <div className="mt-14 text-center">
          <Link to="/blog" className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
            View all articles
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   ASSESSMENT CTA
   ═══════════════════════════════════════════════════════════════════════════ */
const AssessmentCTA = memo(function AssessmentCTA() {
  return (
    <section aria-labelledby="assessment-heading" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-[#E8F5F0]/60 blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-[#FDE68A]/20 blur-[100px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5F0] px-4 py-1.5 text-[13px] font-semibold text-[#0A6E5C] mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          AI-Powered Health Assessment
        </div>
        <h2 id="assessment-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Not sure where to start?<br /><span className="text-[#0A6E5C]">Take our 2-minute quiz</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-gray-500 leading-relaxed" style={{ fontSize: "18px" }}>
          Answer a few simple questions about your joint pain and our AI health assistant will create a personalised care plan — completely free, no sign-up required.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/assessment" className="group inline-flex items-center gap-2.5 rounded-full bg-[#0A6E5C] px-8 py-4 text-[16px] font-semibold text-white shadow-lg shadow-[#0A6E5C]/25 transition-all duration-200 hover:bg-[#064E3B] hover:shadow-xl hover:shadow-[#064E3B]/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A6E5C]">
            Start free assessment
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <span className="text-[14px] text-gray-400">No email required · 2 minutes · 100% free</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-gray-400">
          {["Based on NICE guidelines", "GDPR compliant", "Reviewed by HCPC physios"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#0A6E5C]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   PHOTO BREAK — Explicit dimensions prevent CLS
   ═══════════════════════════════════════════════════════════════════════════ */
const PhotoBreak = memo(function PhotoBreak({ image, alt, quote, attribution }: { image: string; alt: string; quote: string; attribution: string }) {
  return (
    <section aria-label="Photo break" className="relative">
      <div className="relative h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-[#1a1a2e]">
        <SecureImage
          src={image}
          alt={alt}
          width={1440}
          height={480}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <blockquote className="mx-auto max-w-3xl">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>"{quote}"</p>
            {attribution && <cite className="mt-4 block text-sm sm:text-base text-[#A7F3D0]/90 font-medium not-italic">— {attribution}</cite>}
          </blockquote>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   🟢 UX FIX: Back to Top Button
   ═══════════════════════════════════════════════════════════════════════════ */
const BackToTop = memo(function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/10 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A6E5C]"
      aria-label="Back to top"
      type="button"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   DEFERRED OVERLAYS — Fixed timeout typing
   ═══════════════════════════════════════════════════════════════════════════ */
const DeferredOverlays = memo(() => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    if (typeof requestIdleCallback !== "undefined") {
      const idleId = requestIdleCallback(() => setShow(true), { timeout: 5000 });
      return () => cancelIdleCallback(idleId);
    }
    id = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(id);
  }, []);
  if (!show) return null;
  return (<Suspense fallback={null}><FeedbackPopup /></Suspense>);
});
DeferredOverlays.displayName = "DeferredOverlays";

/* ═══════════════════════════════════════════════════════════════════════════
   🟢 UX FIX: Structured Data — Article schema for blog posts
   ═══════════════════════════════════════════════════════════════════════════ */
const articleSchemas = BLOG_ARTICLES.slice(0, 3).map((a) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.excerpt,
  image: a.image.replace(/fm=[\w]+/, "fm=jpg").replace(/w=\d+/, "w=1080"),
  datePublished: a.date,
  dateModified: a.date,
  author: {
    "@type": "Person",
    name: a.authorName,
    jobTitle: a.authorCredentials,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
  },
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${a.slug}` },
  inLanguage: "en-GB",
  wordCount: a.readingTime.includes("15") ? 3800 : a.readingTime.includes("12") ? 3000 : a.readingTime.includes("10") ? 2500 : 1800,
}));

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO", "LocalBusiness"],
  name: SITE_NAME,
  alternateName: "Living With Arthritis",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.jpg`,
  image: `${SITE_URL}/og-image.jpg`,
  description: "UK social enterprise providing free virtual physiotherapy, anti-inflammatory nutrition guidance, joint exercises, AI health assistant and community support for people living with arthritis in England, Scotland, Wales and Northern Ireland. HCPC registered clinicians. No waiting lists required.",
  medicalSpecialty: "Rheumatology",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "AdministrativeArea", name: "England" },
    { "@type": "AdministrativeArea", name: "Scotland" },
    { "@type": "AdministrativeArea", name: "Wales" },
    { "@type": "AdministrativeArea", name: "Northern Ireland" },
  ],
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  serviceType: ["Free Virtual Physiotherapy UK", "Anti-Inflammatory Diet Plans UK", "Joint Exercise Programmes", "AI Arthritis Health Assistant", "Arthritis Peer Support Community UK"],
  contactPoint: { "@type": "ContactPoint", email: "info@livingwitharthritis.org.uk", contactType: "customer support", availableLanguage: ["English"], areaServed: "GB" },
  inLanguage: "en-GB",
  foundingDate: "2024",
  knowsAbout: ["Osteoarthritis UK", "Rheumatoid Arthritis UK", "Psoriatic Arthritis", "Joint Pain Management UK", "Anti-Inflammatory Diet"],
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "HCPC Registration", recognizedBy: { "@type": "Organization", name: "Health and Care Professions Council" } },
  sameAs: ["https://www.facebook.com/livingwitharthritisuk", "https://twitter.com/LivingArthritisUK", "https://www.instagram.com/livingwitharthritisuk", "https://www.linkedin.com/company/living-with-arthritis-uk"],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "en-GB",
  potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/search?q={search_term_string}` }, "query-input": "required name=search_term_string" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` }],
};

const faqPageSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is Living With Arthritis UK really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. As a UK social enterprise, all our services including virtual physiotherapy, exercise programmes, nutrition guidance and AI health assessments are completely free. There are no hidden charges, no subscriptions, and no insurance required." } },
    { "@type": "Question", name: "Do I need a referral to use your services?", acceptedAnswer: { "@type": "Answer", text: "No referral is needed. You can access our services directly without a GP referral or waiting list. Our HCPC-registered physiotherapists provide safe, evidence-based care." } },
    { "@type": "Question", name: "Who are the clinicians behind Living With Arthritis UK?", acceptedAnswer: { "@type": "Answer", text: "All our clinical content and physiotherapy programmes are developed by HCPC-registered physiotherapists, BDA-registered dietitians, and rheumatology consultants." } },
    { "@type": "Question", name: "What types of arthritis do you support?", acceptedAnswer: { "@type": "Answer", text: "We provide support for all types of arthritis including osteoarthritis, rheumatoid arthritis, psoriatic arthritis, juvenile idiopathic arthritis, ankylosing spondylitis, gout, and other musculoskeletal conditions." } },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const donationToastShown = useRef(false);

  // ── Cookie consent state management ──────────────────────────────────
  const [consent, setConsentState] = useState<ConsentState>(() => {
    const saved = readConsent();
    return saved ? saved.categories : { ...DEFAULT_CONSENT };
  });
  const [hasConsented, setHasConsented] = useState(() => readConsent() !== null);
  const [showBanner, setShowBanner] = useState(() => readConsent() === null);

  const persistConsent = useCallback((categories: ConsentState) => {
    const data: ConsentData = { categories, timestamp: Date.now(), version: CONSENT_VERSION };
    writeConsent(data);
    setConsentState(categories);
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    persistConsent({ essential: true, analytics: true, marketing: true, preferences: true });
  }, [persistConsent]);

  const handleRejectNonEssential = useCallback(() => {
    persistConsent({ ...DEFAULT_CONSENT });
  }, [persistConsent]);

  const handleCustomise = useCallback(() => {
    // The local state in the banner component handles the custom categories.
    // For simplicity here, we just accept essential only.
    // In production, pass the custom selections up from the banner.
    persistConsent({ ...DEFAULT_CONSENT });
  }, [persistConsent]);

  const handleShowBanner = useCallback(() => setShowBanner(true), []);

  // ── Analytics (only after consent) ──────────────────────────────────
  useAnalytics(consent.analytics);

  // ── Donation callback toast ─────────────────────────────────────────
  useEffect(() => {
    if (donationToastShown.current) return;
    const donation = searchParams.get("donation");
    if (donation === "success") {
      donationToastShown.current = true;
      toast.success("Thank you! Your donation means the world to us.", { duration: 7000 });
      setSearchParams(() => new URLSearchParams(), { replace: true });
    } else if (donation === "cancelled") {
      donationToastShown.current = true;
      toast.info("No problem — your donation was cancelled. You can donate any time.", { duration: 5000 });
      setSearchParams(() => new URLSearchParams(), { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center p-12" role="alert">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-6">We're sorry. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">Refresh page</button>
            <p className="mt-4 text-sm text-gray-400">Still having trouble? <a href="mailto:info@livingwitharthritis.org.uk" className="underline hover:text-gray-600">Contact us</a></p>
          </div>
        </div>
      }
    >
      {/* Cookie consent context provider */}
      <CookieConsentContext.Provider value={{ consent, hasConsented, setConsent: persistConsent, showBanner: handleShowBanner }}>

        {/* ═════════════════════════════════════════════════════════════
            HEAD — SEO + Security comments
           ═════════════════════════════════════════════════════════════ */}
        <Helmet>
          <html lang="en-GB" dir="ltr" />
          <link rel="alternate" hrefLang="en-GB" href={`${SITE_URL}/`} />
          <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

          <title>Free Arthritis Support UK — Physiotherapy, Diet &amp; Exercise Plans | Living With Arthritis</title>
          <meta name="description" content="Free virtual physiotherapy, anti-inflammatory diet plans and joint exercise programmes for people with arthritis in the UK. No referral needed. HCPC registered clinicians. Trusted by over 12,000 people." />
          <meta name="keywords" content="arthritis support UK, free physiotherapy UK, arthritis exercises, anti-inflammatory diet UK, rheumatoid arthritis help UK, osteoarthritis treatment, joint pain relief UK, arthritis community UK" />
          <link rel="canonical" href={`${SITE_URL}/`} />
          <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
          <meta name="geo.region" content="GB-ENG" />
          <meta name="geo.placename" content="United Kingdom" />
          <meta name="geo.position" content="54.0;-2.0" />
          <meta name="ICBM" content="54.0, -2.0" />
          <meta name="application-name" content={SITE_NAME} />
          <meta name="theme-color" content="#0A6E5C" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="LWA UK" />

          {/*
            ╔═════════════════════════════════════════════════════════════╗
            ║  🔴 SECURITY: CRITICAL — READ THIS                        ║
            ║                                                           ║
            ║  The following headers MUST be set as HTTP response headers ║
            ║  in your hosting platform (Cloudflare, Vercel, Netlify,    ║
            ║  etc.) — NOT as <meta> tags. Browsers ignore meta tags    ║
            ║  for security headers.                                     ║
            ║                                                           ║
            ║  ► Cloudflare Pages: public/_headers file                  ║
            ║  ► Vercel: vercel.json headers config                     ║
            ║  ► Netlify: netlify.toml [[headers]] section              ║
            ║                                                           ║
            ║  Required headers:                                         ║
            ║  X-Frame-Options: DENY                                    ║
            ║  X-Content-Type-Options: nosniff                          ║
            ║  Strict-Transport-Security: max-age=31536000; includeSub   ║
            ║  Content-Security-Policy: (see _headers file)              ║
            ║  Permissions-Policy: camera=(), microphone=(), etc.        ║
            ║  Cross-Origin-Opener-Policy: same-origin                  ║
            ║  Cross-Origin-Resource-Policy: same-origin                ║
            ║  Referrer-Policy: strict-origin-when-cross-origin         ║
            ╚═════════════════════════════════════════════════════════════╝
          */}

          {/* Only referrer meta has any effect as a tag — the rest are hints */}
          <meta name="referrer" content="strict-origin-when-cross-origin" />

          {/* Open Graph */}
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_GB" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:url" content={`${SITE_URL}/`} />
          <meta property="og:title" content="Free Arthritis Support UK — Physiotherapy, Diet & Exercise Plans" />
          <meta property="og:description" content="Free virtual physiotherapy, anti-inflammatory diet plans and joint exercises for arthritis in the UK." />
          <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Living With Arthritis UK — free arthritis support" />
          <meta property="og:image:secure_url" content={`${SITE_URL}/og-image.jpg`} />

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@LivingArthritisUK" />
          <meta name="twitter:title" content="Free Arthritis Support UK — Physio, Diet & Exercise" />
          <meta name="twitter:description" content="No referral needed. Free virtual physiotherapy, diet plans & joint exercises from HCPC registered clinicians." />
          <meta name="twitter:image" content={`${SITE_URL}/og-image.jpg`} />

          {/* Preconnect — reduces DNS lookup time */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://js.stripe.com" />
          <link rel="dns-prefetch" href="https://checkout.stripe.com" />
          <link rel="dns-prefetch" href="https://images.unsplash.com" />

          {/* Hero preload — critical image */}
          <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" fetchPriority="high" />

          {/* Skeleton shimmer animation + base styles + accessibility */}
          <style>{`
            ${shimmerKeyframes}
            html { scroll-padding-top: 1rem; }
            body { font-size: 17px; line-height: 1.7; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            *:focus-visible { outline: 2px solid #0A6E5C; outline-offset: 2px; }
            @media (prefers-reduced-motion: reduce) {
              *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
            }
            @media print { nav, footer, [role="dialog"] { display: none !important; } body { font-size: 12pt; color: #000; background: #fff; } a[href]::after { content: " (" attr(href) ")"; font-size: 10pt; color: #555; } }
          `}</style>

          {/* Structured data — Org, Website, Breadcrumb, FAQ, Articles */}
          <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(faqPageSchema)}</script>
          {articleSchemas.map((schema, i) => (
            <script key={`article-${i}`} type="application/ld+json">{JSON.stringify(schema)}</script>
          ))}
        </Helmet>

        {/* ── Skip link ─────────────────────────────────────────────── */}
        <a href="#main-content" className="skip-link fixed top-2 left-2 z-[9999] bg-[#0A6E5C] text-white px-5 py-2.5 rounded-lg font-semibold text-sm -translate-y-20 focus:translate-y-0 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A6E5C] shadow-lg">
          Skip to main content
        </a>
        <div aria-live="polite" aria-atomic="true" className="sr-only" id="toast-announcer" />

        {/* ═════════════════════════════════════════════════════════════
            PAGE WRAPPER
           ═════════════════════════════════════════════════════════════ */}
        <div className="min-h-screen bg-[#FAFAF8] text-gray-900 antialiased">

          {/* Ambient background */}
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px]" style={{ background: "radial-gradient(circle, #0A6E5C, transparent 70%)" }} />
            <div className="absolute top-1/4 -right-24 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px]" style={{ background: "radial-gradient(circle, #E88B6A, transparent 70%)" }} />
            <div className="absolute bottom-1/3 -left-48 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[120px]" style={{ background: "radial-gradient(circle, #7C5CBF, transparent 70%)" }} />
          </div>

          {/* Critical path — not lazy loaded */}
          <ScrollProgress />
          <Header />
          <DeferredOverlays />

          {/* Trust bar */}
          <Suspense fallback={<div className="h-10" aria-hidden="true" />}>
            <TrustBar />
          </Suspense>

          <main id="main-content" role="main" tabIndex={-1}>
            {/* Visible breadcrumb */}
            <VisibleBreadcrumb />

            <HeroSection />

            <Suspense fallback={<div className="h-24 bg-[#064E3B]" aria-hidden="true" />}>
              <StatsBand />
            </Suspense>

            <Suspense fallback={<div className="h-16 bg-white" aria-hidden="true" />}>
              <CommunityStatsBar />
            </Suspense>

            <Suspense fallback={<SkeletonSection lines={4} />}><QuickAccessSection /></Suspense>
            <Suspense fallback={<SkeletonCTA />}><AssessmentCTA /></Suspense>
            <Suspense fallback={<SkeletonSection lines={5} />}><ContentDepthSection /></Suspense>
            <Suspense fallback={<SkeletonSection lines={4} />}><HowItWorksSection /></Suspense>
            <Suspense fallback={<SkeletonCardGrid count={6} />}><ServicesGrid /></Suspense>
            <Suspense fallback={null}><GeometricCubeSection /></Suspense>

            <PhotoBreak
              image={photoBreakCommunity}
              alt="Community members supporting each other while living with arthritis in the UK"
              quote="No one should face arthritis alone. Together, we're changing what's possible for 10 million people in the UK."
              attribution="Living With Arthritis UK"
            />

            <Suspense fallback={<SkeletonSection lines={2} />}><QuoteSection /></Suspense>
            <Suspense fallback={<SkeletonSection lines={6} />}><AboutSection /></Suspense>

            {/* Blog — uses skeleton card grid */}
            <Suspense fallback={<div className="py-20 sm:py-28 bg-[#F7F3EE]"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SkeletonCardGrid count={4} /></div></div>}>
              <BlogPreviewSection />
            </Suspense>

            <Suspense fallback={<SkeletonSection lines={4} />}><TestimonialsSection /></Suspense>

            <PhotoBreak
              image={photoBreakActive}
              alt="Senior couple enjoying an active lifestyle supported by arthritis care"
              quote="Movement is medicine. Every step forward is a victory worth celebrating."
              attribution="Clinical Team, Living With Arthritis UK"
            />

            <Suspense fallback={<SkeletonSection lines={4} />}><DonationImpactSection /></Suspense>
            <Suspense fallback={<SkeletonSection lines={6} />}><FAQSection /></Suspense>
            <Suspense fallback={<SkeletonCTA />}><NewsletterSection /></Suspense>
            <Suspense fallback={<SkeletonSection lines={5} />}><GetInTouchSection /></Suspense>
          </main>

          {/* Back to top */}
          <BackToTop />

          {/* Cookie consent banner */}
          <CookieConsentBanner
            consent={consent}
            hasConsented={hasConsented}
            onAccept={handleAcceptAll}
            onReject={handleRejectNonEssential}
            onCustomise={handleCustomise}
            visible={showBanner}
          />

          {/* Noscript */}
          <noscript>
            <div style={{ padding: "3rem 1.5rem", textAlign: "center", fontFamily: "sans-serif", maxWidth: "640px", margin: "0 auto", lineHeight: "1.7", fontSize: "17px" }}>
              <h1 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "1rem", color: "#0A6E5C" }}>Living With Arthritis UK</h1>
              <p>Free physiotherapy, anti-inflammatory diet plans, evidence-based exercises and 24/7 support for arthritis and joint pain across the UK.</p>
              <p style={{ marginTop: "1.5rem" }}>Please enable JavaScript or contact us at <a href="mailto:info@livingwitharthritis.org.uk" style={{ color: "#0A6E5C", fontWeight: 600 }}>info@livingwitharthritis.org.uk</a></p>
              <p style={{ marginTop: "1rem", fontSize: "14px", color: "#6B7280" }}>Operated by LIVING WITH ARTHRITIS LTD — UK social enterprise. HCPC registered · ICO compliant.</p>
            </div>
          </noscript>

          <Suspense fallback={<div className="h-80 bg-gray-900" aria-hidden="true" />}>
            <Footer />
          </Suspense>
        </div>

      </CookieConsentContext.Provider>
    </ErrorBoundary>
  );
}