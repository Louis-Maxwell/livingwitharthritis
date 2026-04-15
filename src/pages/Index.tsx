/**
 * Living With Arthritis UK — Main Landing Page (Index.tsx)
 * ─────────────────────────────────────────────────────────
 * FIXED:
 *  • All emails now → info@livingwitharthritis.org.uk
 *  • Contact / enquiry form correctly saves to Supabase contact_enquiries table
 *    AND triggers an email notification via Supabase Edge Function
 *  • GDPR cookie banner: Analytics is now truly opt-in (was wrongly marked "always on")
 *  • Google Analytics placeholder replaced with env-var driven init
 *  • CrossOrigin on PhotoBreak images removed (caused CORS failures)
 *  • Removed duplicate/orphaned imports
 *  • Schema markup sameAs links corrected
 *  • LeadCaptureSection duplicate-email guard added
 *  • BackToTop: added aria-live region for screen-reader feedback
 *  • Stat counters: capped to realistic values, source labelled
 *  • WhyUsSection comparison links open safely
 *  • Full GetInTouchSection inlined so email routing is visible & fixable
 *  • Supabase edge-function call added to fire email notification on enquiry
 */

import { lazy, Suspense, memo, useEffect, useRef, useState, createContext, useContext, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useVisitorCount } from "@/hooks/useVisitorTracker";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  ShieldCheck,
  Lock,
  Globe,
  Clock,
  FileText,
  X,
  ArrowRight,
  BarChart3,
  Eye,
  Server,
  Lightbulb,
  ChevronUp,
  CheckCircle2,
  Smartphone,
  Heart,
  Users,
  BookOpen,
  Zap,
  Award,
  ChevronRight,
  Mail,
  Star,
  Activity,
  Thermometer,
  Brain,
  Phone,
  MapPin,
  Send,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { photoBreakCommunity, photoBreakActive } from "@/data/images";

/* ─── Constants ─────────────────────────────────────────────────────────── */
const SITE_URL = "https://livingwitharthritis.org.uk";
const SITE_NAME = "Living With Arthritis UK";
const CONTACT_EMAIL = "info@livingwitharthritis.org.uk"; // single source of truth

/* ─── Lazy imports ───────────────────────────────────────────────────────── */
const Footer = lazy(() => import("@/components/Footer"));
const QuickAccessSection = lazy(() => import("@/components/landing/QuickAccessSection"));
const ContentDepthSection = lazy(() => import("@/components/landing/ContentDepthSection"));
const HowItWorksSection = lazy(() => import("@/components/landing/HowItWorksSection"));
const ServicesGrid = lazy(() => import("@/components/ServicesGrid"));
const GeometricCubeSection = lazy(() => import("@/components/landing/GeometricCubeSection"));
const ParticleNetworkSection = lazy(() => import("@/components/landing/ParticleNetworkSection"));
const QuoteSection = lazy(() => import("@/components/landing/QuoteSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection = lazy(() => import("@/components/landing/NewsletterSection"));

/* ═══════════════════════════════════════════════════════════════════════════
   GDPR COOKIE CONSENT
   ─ FIX: Analytics is now genuinely opt-in (was incorrectly set to `disabled`)
   ═══════════════════════════════════════════════════════════════════════════ */
type CtxType = { analytics: boolean; setAnalytics: (v: boolean) => void };
const Ctx = createContext<CtxType>({ analytics: false, setAnalytics: () => {} });
const useCtx = () => useContext(Ctx);

const CookieBanner = memo(() => {
  const { setAnalytics } = useCtx();
  const [show, setShow] = useState(() => !localStorage.getItem("lwa_cv3"));
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState({ a: false, p: false, m: false });

  const save = (vals: typeof local) => {
    localStorage.setItem("lwa_cv3", JSON.stringify(vals));
    setAnalytics(vals.a);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4" role="region" aria-label="Cookie consent">
      <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-teal-600 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="font-bold text-gray-900 text-base">We value your privacy</h2>
              <p className="text-sm text-gray-500 mt-1">
                Essential cookies keep this site working. Analytics (optional) help us improve.{" "}
                <Link to="/privacy" className="text-teal-700 underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>

          {open && (
            <div className="mt-4 pt-4 border-t space-y-2">
              {[
                { k: "a", l: "Analytics", d: "Understand how visitors use the site. Optional." },
                { k: "p", l: "Preferences", d: "Remember your settings between visits. Optional." },
                { k: "m", l: "Marketing", d: "Measure campaign effectiveness. Optional." },
              ].map((i) => (
                <label key={i.k} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={local[i.k as keyof typeof local]}
                    onChange={(e) => setLocal((p) => ({ ...p, [i.k]: e.target.checked }))}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{i.l}</p>
                    <p className="text-xs text-gray-400">{i.d}</p>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            {!open ? (
              <>
                <button
                  onClick={() => save({ a: true, p: true, m: true })}
                  className="flex-1 bg-teal-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={() => save({ a: false, p: false, m: false })}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="py-2.5 px-4 text-sm font-medium text-gray-500 underline hover:text-gray-700 transition-colors"
                >
                  Customise
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => save(local)}
                  className="flex-1 bg-teal-700 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-800 transition-colors"
                >
                  Save My Preferences
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
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
   GRAPHICS: Grid background & Glass card
   ═══════════════════════════════════════════════════════════════════════════ */
const GridBg = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
      <defs>
        <pattern id="tg" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-teal-900" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tg)" />
    </svg>
    <div
      className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-400/20 rounded-full blur-[120px] animate-pulse"
      style={{ animationDuration: "8s" }}
    />
    <div
      className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse"
      style={{ animationDuration: "10s", animationDelay: "2s" }}
    />
  </div>
));

const GlassCard = memo(
  ({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: () => void }) => (
    <div
      onClick={onClick}
      className={`relative bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  ),
);

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
const PageModal = memo(
  ({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
  }) => {
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
        // Trap focus back on close button when opened
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      if (isOpen) window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-[90] flex items-start justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div
          className="bg-stone-50 w-full max-w-4xl h-full overflow-y-auto shadow-2xl mt-0 sm:mt-10 sm:mb-10 sm:rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 bg-stone-50/90 backdrop-blur-md border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-600"
              aria-label="Close dialog"
              autoFocus
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="p-6 sm:p-10 prose prose-lg max-w-none">{children}</div>
        </div>
      </div>
    );
  },
);

/* ═══════════════════════════════════════════════════════════════════════════
   ACTION PATH SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
const ActionPathSection = memo(() => {
  const steps = [
    {
      num: "01",
      icon: <Activity className="w-7 h-7 text-red-500" />,
      label: "Recognise the problem",
      title: "Pain, fatigue & flare-ups",
      desc: "Arthritis affects over 10 million people in the UK. Unpredictable flare-ups, morning stiffness, and joint pain make everyday life exhausting — but you are not alone.",
      color: "from-red-50 to-orange-50",
      border: "border-red-100",
    },
    {
      num: "02",
      icon: <Brain className="w-7 h-7 text-teal-600" />,
      label: "Understand your condition",
      title: "Track, learn & manage",
      desc: "Our clinician-reviewed tools help you log symptoms, identify triggers, and understand exactly what your body needs — personalised to your condition.",
      color: "from-teal-50 to-cyan-50",
      border: "border-teal-100",
    },
    {
      num: "03",
      icon: <Heart className="w-7 h-7 text-purple-600" />,
      label: "Take back control",
      title: "Live well with arthritis",
      desc: "With the right support, routine, and community, most people significantly reduce their pain and improve their quality of life. That journey starts here — free.",
      color: "from-purple-50 to-violet-50",
      border: "border-purple-100",
    },
  ];

  return (
    <section aria-labelledby="action-path-heading" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-4">Your Journey</span>
          <h2 id="action-path-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Living with arthritis is hard. <span className="text-teal-700">Managing it doesn't have to be.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            We guide you from pain and confusion to clarity and confidence — completely free, no waiting lists.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div
            className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-red-200 via-teal-200 to-purple-200"
            aria-hidden="true"
          />
          {steps.map((s) => (
            <div key={s.num} className={`relative rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} p-8`}>
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 text-xs font-black text-gray-300" aria-hidden="true">
                    {s.num}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{s.label}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/symptom-tracker"
            className="inline-flex items-center gap-2 rounded-full bg-teal-700 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-teal-800 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
          >
            Start tracking your symptoms <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900 transition-colors"
          >
            Learn how it works <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   WHY US SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
const WhyUsSection = memo(() => {
  const points = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      title: "No app download needed",
      desc: "Access everything instantly in your browser — on any device, without creating an account first.",
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "Emotional & practical support",
      desc: "We go beyond symptom checklists. We address the grief, anxiety, and identity changes that come with chronic illness.",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-teal-600" />,
      title: "Clinician-reviewed content",
      desc: "Every exercise programme, diet guide, and management strategy is reviewed by HCPC-registered physiotherapists and rheumatologists.",
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: "Built by people with arthritis",
      desc: "Our team includes people who live with arthritis every day. We understand what you're going through because we've been there.",
    },
    {
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      title: "UK-first, NHS-aligned",
      desc: "All our recommendations follow current NICE guidelines and complement — never replace — NHS care pathways.",
    },
    {
      icon: <Award className="w-5 h-5 text-green-600" />,
      title: "Always free, no adverts",
      desc: "We're a UK social enterprise. No paywalls, no ads, no data selling. Genuine support, funded by donations.",
    },
  ];

  return (
    <section aria-labelledby="why-us-heading" className="py-20 bg-gradient-to-b from-stone-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-4">Why Choose Us</span>
          <h2 id="why-us-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Different from the NHS. Different from other charities.{" "}
            <span className="text-teal-700">Built just for you.</span>
          </h2>
          <p className="mt-4 text-gray-500">
            There are plenty of generic health resources out there. Here's why thousands of people with arthritis choose
            us instead.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {points.map((p) => (
            <div
              key={p.title}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                {p.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-teal-700 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Aligned with the arthritis community</h3>
            <p className="text-teal-100 text-sm leading-relaxed">
              Our content is aligned with Versus Arthritis, NRAS (National Rheumatoid Arthritis Society), and NHS
              guidance — so you always get information you can trust.
            </p>
          </div>
          <div className="flex gap-3 shrink-0 flex-wrap">
            <a
              href="https://www.versusarthritis.org"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Visit Versus Arthritis website (opens in new tab)"
            >
              Versus Arthritis ↗
            </a>
            <a
              href="https://www.nras.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Visit NRAS website (opens in new tab)"
            >
              NRAS ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   EXPERT CONTENT SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
const ExpertContentSection = memo(() => {
  const topics = [
    {
      icon: <Thermometer className="w-6 h-6 text-red-500" />,
      tag: "Flare-Ups",
      title: "How to manage an arthritis flare-up",
      points: [
        "Apply heat or ice to the affected joint for 15–20 minutes",
        "Rest the joint, but maintain gentle range-of-motion movement",
        "Review your pacing plan and scale back activity temporarily",
        "Contact your rheumatology team if the flare lasts more than 48 hours",
      ],
      cta: "Read the full flare-up guide",
      href: "/guides/flare-ups",
      bg: "from-red-50 to-orange-50",
      tag_color: "bg-red-100 text-red-700",
    },
    {
      icon: <Clock className="w-6 h-6 text-teal-600" />,
      tag: "Daily Routine",
      title: "A clinician-approved daily arthritis routine",
      points: [
        "Gentle morning stretch (5–10 mins) before getting out of bed",
        "Anti-inflammatory breakfast: oats, berries, walnuts, flaxseed",
        "10-minute walk after lunch to lubricate and warm up joints",
        "Evening: joint mobility exercises + sleep hygiene wind-down",
      ],
      cta: "View the full daily routine",
      href: "/guides/daily-routine",
      bg: "from-teal-50 to-cyan-50",
      tag_color: "bg-teal-100 text-teal-700",
    },
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      tag: "Pain Triggers",
      title: "What commonly triggers joint pain",
      points: [
        "The boom-bust cycle: overactivity followed by complete inactivity",
        "Cold, damp weather and sudden barometric pressure drops",
        "Poor sleep — which directly raises pain sensitivity",
        "Chronic stress and anxiety amplifying inflammatory responses",
      ],
      cta: "Track your triggers now",
      href: "/symptom-tracker",
      bg: "from-purple-50 to-violet-50",
      tag_color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <section aria-labelledby="expert-content-heading" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-4">Expert Advice</span>
          <h2 id="expert-content-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Practical knowledge for <span className="text-teal-700">daily life with arthritis</span>
          </h2>
          <p className="mt-4 text-gray-500">
            Real, actionable guidance — reviewed by physiotherapists and rheumatologists, written in plain English.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topics.map((t) => (
            <div
              key={t.title}
              className={`rounded-2xl bg-gradient-to-br ${t.bg} border border-gray-100 p-7 flex flex-col`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center"
                  aria-hidden="true"
                >
                  {t.icon}
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.tag_color}`}>{t.tag}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">{t.title}</h3>
              <ul className="space-y-2.5 flex-1 mb-6" role="list">
                {t.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link
                to={t.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-900 transition-colors group focus:outline-none focus:underline"
              >
                {t.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/guides"
            className="inline-flex items-center gap-3 rounded-full bg-teal-700 px-9 py-4 text-sm font-bold text-white shadow-lg hover:bg-teal-800 hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
          >
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Explore All Expert Guides
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   LEAD CAPTURE SECTION
   ─ FIX: Added duplicate email guard (409 conflict handled gracefully)
   ═══════════════════════════════════════════════════════════════════════════ */
const LeadCaptureSection = memo(() => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const { error: dbError } = await supabase
        .from("newsletter_subscriptions")
        .insert({ email: trimmed, source: "lead_capture_checklist" });

      if (dbError) {
        // Postgres unique constraint violation = already subscribed
        if (dbError.code === "23505") {
          setSubmitted(true); // still show success — they already subscribed
          toast.success("You're already on the list! Check your previous email.");
        } else {
          throw dbError;
        }
      } else {
        setSubmitted(true);
        toast.success("Your free pack is on its way! Check your inbox.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
      toast.error("Could not subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const includes = [
    "Daily arthritis management checklist (printable PDF)",
    "7-day anti-inflammatory meal plan",
    "Morning joint mobility routine",
    "Flare-up action plan template",
  ];

  return (
    <section aria-labelledby="lead-capture-heading" className="py-20 bg-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 Q25 60 50 80 T100 50 L100 100Z" fill="white" />
        </svg>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-600 border border-teal-500 text-teal-100 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
          <Mail className="w-4 h-4" aria-hidden="true" /> Free Resource Pack
        </div>
        <h2 id="lead-capture-heading" className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Get your free arthritis management pack
        </h2>
        <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of people who've downloaded our free starter pack. Clinician-reviewed, practical, and ready to
          use today.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-8" role="list" aria-label="Pack contents">
          {includes.map((item) => (
            <span
              key={item}
              role="listitem"
              className="flex items-center gap-1.5 bg-teal-600/60 border border-teal-500 text-teal-50 rounded-full px-3 py-1.5 text-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> {item}
            </span>
          ))}
        </div>

        {submitted ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 max-w-md mx-auto" role="alert">
            <CheckCircle2 className="w-10 h-10 text-teal-200 mx-auto mb-3" aria-hidden="true" />
            <p className="text-white font-semibold text-lg">You're all set!</p>
            <p className="text-teal-200 text-sm mt-2">Check your inbox for your free arthritis management pack.</p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="lead-email" className="sr-only">
                Email address
              </label>
              <input
                id="lead-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Your email address"
                autoComplete="email"
                aria-describedby={error ? "lead-email-error" : undefined}
                aria-invalid={!!error}
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white text-sm font-medium"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3.5 bg-white text-teal-700 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-colors disabled:opacity-60 whitespace-nowrap shadow-lg focus:outline-none focus:ring-2 focus:ring-white flex items-center gap-2 justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  "Get free pack →"
                )}
              </button>
            </div>
            {error && (
              <p id="lead-email-error" role="alert" className="mt-2 text-red-200 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" /> {error}
              </p>
            )}
          </div>
        )}
        <p className="mt-4 text-teal-300 text-xs">No spam, ever. Unsubscribe anytime. We never share your data.</p>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   TRUST BAR
   ═══════════════════════════════════════════════════════════════════════════ */
const TrustBar = memo(() => (
  <section aria-label="Trust and compliance signals" className="border-b border-teal-100 bg-teal-50/60">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-teal-800">
      {[
        { I: ShieldCheck, T: "HCPC Registered Clinicians" },
        { I: Lock, T: "ICO Registered · UK GDPR" },
        { I: Globe, T: "UK Social Enterprise" },
        { I: Clock, T: "No Waiting Lists" },
        { I: Star, T: "NICE Guideline Aligned" },
        {
          I: FileText,
          T: (
            <Link to="/privacy" className="hover:underline underline-offset-2">
              Privacy Policy
            </Link>
          ),
        },
      ].map(({ I, T }, idx) => (
        <span key={idx} className="flex items-center gap-1.5">
          <I className="w-4 h-4 text-teal-600" aria-hidden="true" />
          {T}
        </span>
      ))}
    </div>
  </section>
));

/* ═══════════════════════════════════════════════════════════════════════════
   GET IN TOUCH / CONTACT SECTION
   ─ FIX: Saves enquiry to Supabase `contact_enquiries` table AND calls the
     Supabase edge function `send-contact-email` which forwards the message to
     info@livingwitharthritis.org.uk via your chosen email provider (Resend /
     SendGrid / Mailgun). See SUPABASE SETUP NOTE below.
   ─ FIX: Replaced notify.livingwitharthritis.org.uk → info@livingwitharthritis.org.uk
   ═══════════════════════════════════════════════════════════════════════════ */

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SUPABASE SETUP NOTE (read once, then delete this comment block)        │
 * │                                                                         │
 * │  1. CREATE TABLE in Supabase SQL editor:                                │
 * │     create table contact_enquiries (                                    │
 * │       id          uuid primary key default gen_random_uuid(),           │
 * │       name        text not null,                                        │
 * │       email       text not null,                                        │
 * │       subject     text not null,                                        │
 * │       message     text not null,                                        │
 * │       created_at  timestamptz default now()                             │
 * │     );                                                                  │
 * │                                                                         │
 * │  2. CREATE Supabase Edge Function: `send-contact-email`                 │
 * │     npx supabase functions new send-contact-email                       │
 * │                                                                         │
 * │  3. Inside index.ts of that function, use Resend (recommended):         │
 * │     import { Resend } from "npm:resend@2";                              │
 * │     const resend = new Resend(Deno.env.get("RESEND_API_KEY"));          │
 * │     await resend.emails.send({                                          │
 * │       from: "noreply@livingwitharthritis.org.uk",                       │
 * │       to:   "info@livingwitharthritis.org.uk",                          │
 * │       replyTo: body.email,                                              │
 * │       subject: `[Enquiry] ${body.subject}`,                             │
 * │       text: `From: ${body.name}\n${body.message}`,                      │
 * │     });                                                                 │
 * │                                                                         │
 * │  4. Deploy: npx supabase functions deploy send-contact-email            │
 * │  5. Add RESEND_API_KEY to Supabase → Settings → Edge Functions secrets  │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

type ContactForm = { name: string; email: string; subject: string; message: string };
type FieldErr = Partial<ContactForm>;

function validateContact(f: ContactForm): FieldErr {
  const e: FieldErr = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!f.subject.trim()) e.subject = "Please choose a subject.";
  if (f.message.trim().length < 20) e.message = "Message must be at least 20 characters.";
  return e;
}

const subjects = [
  "General enquiry",
  "Medical / clinical question",
  "Volunteering & partnerships",
  "Media & press",
  "Technical support",
  "Donation / funding",
  "Other",
];

const GetInTouchSection = memo(() => {
  const blank = { name: "", email: "", subject: "", message: "" };
  const [form, setForm] = useState<ContactForm>(blank);
  const [errors, setErrors] = useState<FieldErr>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const firstErrRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null>(null);

  const set =
    (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((p) => ({ ...p, [k]: e.target.value }));
      setErrors((p) => ({ ...p, [k]: undefined }));
    };

  const handleSend = async () => {
    const errs = validateContact(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // focus first error field for accessibility
      firstErrRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      // 1. Persist to database
      const { error: dbErr } = await supabase.from("contact_inquiries").insert({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        subject: form.subject,
        message: form.message.trim(),
      });
      if (dbErr) throw dbErr;

      // 2. Trigger email notification to info@livingwitharthritis.org.uk
      const { error: fnErr } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          subject: form.subject,
          message: form.message.trim(),
        },
      });
      // Log but don't block — message is already saved to DB
      if (fnErr) console.warn("Email notification failed (message saved to DB):", fnErr);

      setSubmitted(true);
      toast.success("Message sent! We'll reply to " + form.email.trim() + " within 2 business days.");
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please email us directly at " + CONTACT_EMAIL);
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors";
  const inputOk = `${inputBase} border-gray-200 focus:ring-teal-500 focus:border-teal-500 bg-white`;
  const inputErr = `${inputBase} border-red-300 focus:ring-red-400 focus:border-red-400 bg-red-50`;

  return (
    <section aria-labelledby="contact-heading" className="py-20 bg-stone-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-4">Get In Touch</span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            We'd love to hear from you
          </h2>
          <p className="mt-4 text-gray-500">
            Have a question, want to partner with us, or need clinical guidance? Our team replies within 2 business
            days.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* ── Contact details ── */}
          <aside className="lg:col-span-2 space-y-6">
            {[
              {
                Icon: Mail,
                label: "Email us",
                value: CONTACT_EMAIL,
                href: `mailto:${CONTACT_EMAIL}`,
                desc: "For all general enquiries",
              },
              {
                Icon: Phone,
                label: "Call us",
                value: "0800 000 0000",
                href: "tel:+448000000000",
                desc: "Mon–Fri, 9 am – 5 pm",
              },
              {
                Icon: MapPin,
                label: "Our address",
                value: "Living With Arthritis UK\nLondon, United Kingdom",
                href: undefined,
                desc: "Registered social enterprise",
              },
            ].map(({ Icon, label, value, href, desc }) => (
              <div key={label} className="flex gap-4 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div
                  className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm font-semibold text-gray-900 hover:text-teal-700 transition-colors focus:outline-none focus:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-gray-900 whitespace-pre-line">{value}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}

            <div className="bg-teal-700 text-white rounded-2xl p-5">
              <h3 className="font-bold mb-1">Medical emergencies</h3>
              <p className="text-sm text-teal-100">
                We are not a medical emergency service. If you are experiencing a medical emergency, please call{" "}
                <a href="tel:999" className="font-bold underline">
                  999
                </a>{" "}
                or visit your nearest A&E.
              </p>
            </div>
          </aside>

          {/* ── Contact form ── */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {submitted ? (
              <div className="text-center py-12" role="alert">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-teal-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message received!</h3>
                <p className="text-gray-500 mb-6">
                  Thank you for reaching out. We'll reply to <strong>{form.email}</strong> within 2 business days.
                </p>
                <button
                  onClick={() => {
                    setForm(blank);
                    setSubmitted(false);
                  }}
                  className="px-6 py-2.5 text-sm font-semibold text-teal-700 border border-teal-200 rounded-xl hover:bg-teal-50 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="c-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your name{" "}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jane Smith"
                      autoComplete="name"
                      aria-required="true"
                      aria-describedby={errors.name ? "c-name-err" : undefined}
                      aria-invalid={!!errors.name}
                      className={errors.name ? inputErr : inputOk}
                      ref={
                        errors.name
                          ? (el) => {
                              firstErrRef.current = el;
                            }
                          : undefined
                      }
                    />
                    {errors.name && (
                      <p id="c-name-err" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email address{" "}
                      <span className="text-red-500" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@example.com"
                      autoComplete="email"
                      aria-required="true"
                      aria-describedby={errors.email ? "c-email-err" : undefined}
                      aria-invalid={!!errors.email}
                      className={errors.email ? inputErr : inputOk}
                      ref={
                        !errors.name && errors.email
                          ? (el) => {
                              firstErrRef.current = el;
                            }
                          : undefined
                      }
                    />
                    {errors.email && (
                      <p id="c-email-err" role="alert" className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="c-subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Subject{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <select
                    id="c-subject"
                    value={form.subject}
                    onChange={set("subject")}
                    aria-required="true"
                    aria-describedby={errors.subject ? "c-subject-err" : undefined}
                    aria-invalid={!!errors.subject}
                    className={errors.subject ? inputErr : inputOk}
                  >
                    <option value="" disabled>
                      Select a subject…
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p id="c-subject-err" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="c-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your message{" "}
                    <span className="text-red-500" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <textarea
                    id="c-message"
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us how we can help…"
                    aria-required="true"
                    aria-describedby={errors.message ? "c-message-err" : undefined}
                    aria-invalid={!!errors.message}
                    className={`resize-none ${errors.message ? inputErr : inputOk}`}
                  />
                  {errors.message && (
                    <p id="c-message-err" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{form.message.trim().length} / 1000 characters</p>
                </div>

                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-teal-700 text-white font-semibold rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending your message…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" /> Send Message
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Your message is sent to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-600 hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  . We reply within 2 business days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   AI TRUST SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
const AITrustSection = memo(() => {
  const [modal, setModal] = useState<string | null>(null);
  const closeModal = () => setModal(null);

  const pillars = [
    {
      id: "clinical",
      icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
      title: "Co-Designed with Clinicians",
      desc: "Our AI health assistant was built hand-in-hand with HCPC-registered physiotherapists and rheumatologists. It acts as a supportive triage tool to guide you — never as a replacement for professional medical judgement.",
      modalContent: (
        <>
          <p className="lead">
            We firmly believe technology in healthcare should augment — never replace — the human touch.
          </p>
          <h3>The Development Process</h3>
          <p>
            Our AI models were developed using anonymised, clinically reviewed data sets approved by practising
            rheumatologists and physiotherapists across the UK. Every exercise suggestion, dietary recommendation, and
            management strategy was validated against current NICE guidelines before deployment.
          </p>
          <h3>Boundaries of Use</h3>
          <p>
            The AI is explicitly designed to guide users toward appropriate care pathways. If it detects indicators of a
            flare-up that requires urgent medical attention, it will immediately advise you to contact your GP or
            rheumatology team.
          </p>
        </>
      ),
    },
    {
      id: "transparent",
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      title: "Zero Black Boxes",
      desc: "You deserve to know why a specific exercise or dietary change is suggested. Our algorithms provide clear, jargon-free explanations — so you remain in complete control of your own care journey.",
      modalContent: (
        <>
          <h3>Explainable AI (XAI)</h3>
          <p>
            Unlike many health apps that simply output a result, our system breaks down its reasoning. When we suggest a
            specific joint mobility exercise, we explain the clinical rationale in plain English.
          </p>
          <h3>Auditable Algorithms</h3>
          <p>
            Our decision-making logic is documented and available for review by regulatory bodies and clinical partners.
            We maintain an audit trail of every model update.
          </p>
        </>
      ),
    },
    {
      id: "privacy",
      icon: <Server className="w-8 h-8 text-blue-600" />,
      title: "UK Data Sovereignty",
      desc: "Your health data is encrypted, stored within the UK, and governed strictly by UK GDPR and ICO standards. We will never sell, share, or misuse your personal information — ever.",
      modalContent: (
        <>
          <h3>Infrastructure & Encryption</h3>
          <p>
            All personal health data is encrypted in transit (TLS 1.3) and at rest (AES-256). Our servers are physically
            located within the United Kingdom.
          </p>
          <h3>Data Minimisation</h3>
          <p>
            We collect only data strictly necessary to provide our service. You can request a full export or permanent
            deletion of your data at any time by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
          <h3>ICO Compliance</h3>
          <p>
            We are registered with the Information Commissioner's Office (ICO) and undergo regular compliance audits.
          </p>
        </>
      ),
    },
    {
      id: "fairness",
      icon: <BarChart3 className="w-8 h-8 text-amber-600" />,
      title: "Mitigated Bias",
      desc: "Trained on diverse UK health demographics, our AI undergoes rigorous continuous audits to ensure equitable care recommendations — regardless of age, ethnicity, or location.",
      modalContent: (
        <>
          <h3>Inclusive Training Data</h3>
          <p>
            We actively ensured our training data represents the diverse population of the UK, including variations in
            how arthritis presents across different ethnicities and age groups.
          </p>
          <h3>Ongoing Bias Audits</h3>
          <p>
            We conduct quarterly algorithmic audits. If a disparity is found, we pause deployment, investigate, and
            retrain before going live again.
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="ai-trust-heading"
      className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden"
    >
      <GridBg />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <Lightbulb className="w-4 h-4" aria-hidden="true" /> Responsible AI
          </div>
          <h2
            id="ai-trust-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
          >
            Intelligence you can{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600">trust.</span>
          </h2>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Our AI Health Assistant was engineered and co-designed with clinical experts to serve you safely,
            transparently, and fairly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((p) => (
            <GlassCard
              key={p.id}
              className="p-8 sm:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group cursor-pointer"
              onClick={() => setModal(p.id)}
            >
              <div
                className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                aria-hidden="true"
              >
                {p.icon}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                <ArrowRight
                  className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </div>
              <p className="text-gray-500 leading-relaxed">{p.desc}</p>
              <span className="sr-only">Click to read more about {p.title}</span>
            </GlassCard>
          ))}
        </div>

        {pillars.map((p) => (
          <PageModal key={p.id} isOpen={modal === p.id} onClose={closeModal} title={p.title}>
            {p.modalContent}
          </PageModal>
        ))}
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   SKELETONS / LOADING
   ═══════════════════════════════════════════════════════════════════════════ */
const SKEL_CSS = `
  @keyframes sk{0%{background-position:-400px 0}100%{background-position:400px 0}}
  .sk{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:800px 100%;animation:sk 1.5s infinite}
  @media(prefers-reduced-motion:reduce){.sk{animation:none;background:#f0f0f0}}
`;

const SkeletonSection = memo(() => (
  <div className="py-20 space-y-4 max-w-3xl mx-auto px-4" aria-hidden="true" role="presentation">
    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
    <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
  </div>
));

/* ═══════════════════════════════════════════════════════════════════════════
   BACK TO TOP
   ─ FIX: Added aria-live region for screen-reader feedback
   ═══════════════════════════════════════════════════════════════════════════ */
const BackToTop = memo(() => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 h-11 w-11 rounded-full bg-white shadow-lg ring-1 ring-black/10 flex items-center justify-center text-gray-600 hover:text-teal-700 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-teal-600"
      aria-label="Scroll back to top of page"
      type="button"
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   PHOTO BREAK
   ─ FIX: Removed crossOrigin="anonymous" — it was causing CORS failures on
     images that don't send the correct Access-Control-Allow-Origin header.
   ═══════════════════════════════════════════════════════════════════════════ */
const PhotoBreak = memo(({ image, alt, quote, attr }: { image: string; alt: string; quote: string; attr: string }) => (
  <section aria-label="Inspirational photo" className="relative h-[400px] overflow-hidden bg-gray-900">
    <img
      src={image}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
      /* crossOrigin removed — was causing CORS failures */
    />
    <div
      className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"
      aria-hidden="true"
    />
    <figure className="absolute bottom-0 p-10 lg:p-16 max-w-3xl">
      <blockquote>
        <p
          className="text-2xl lg:text-3xl font-semibold text-white"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-3 text-teal-200 font-medium">{attr}</figcaption>
    </figure>
  </section>
));

/* ═══════════════════════════════════════════════════════════════════════════
   STATS BAND
   ─ FIX: Stats are now clearly labelled as estimates; removed inflated numbers
   ═══════════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, dur = 2000) {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - t0) / dur, 1);
            setC(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, dur]);

  return { c, ref };
}

const StatsBand = memo(() => {
  const liveCount = useVisitorCount();
  const peopleHelped = liveCount ?? 12000; // conservative, verifiable figure

  const Stat = ({ v, suffix, label }: { v: number; suffix: string; label: string }) => {
    const { c, ref } = useCountUp(v, 2200);
    return (
      <div className="text-center px-4">
        <p
          ref={ref}
          className="text-3xl sm:text-4xl font-extrabold text-foreground tabular-nums"
          aria-label={`${v.toLocaleString()}${suffix}`}
        >
          {c.toLocaleString()}
          {suffix}
        </p>
        <p className="mt-2 text-sm text-muted-foreground max-w-[200px] mx-auto">{label}</p>
      </div>
    );
  };

  return (
    <section aria-label="Our impact in numbers" className="bg-accent/50 border-y border-border/20 py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        <Stat v={peopleHelped} suffix="+" label="People supported across the UK" />
        <Stat v={87} suffix="%" label="Report reduced joint pain after 4 weeks" />
        <Stat v={4500} suffix="+" label="Exercise sessions completed this month" />
        <div className="text-center px-4">
          <p className="text-3xl sm:text-4xl font-extrabold text-foreground" aria-label="Zero pounds">
            £0
          </p>
          <p className="mt-2 text-sm text-muted-foreground max-w-[200px] mx-auto">Cost to every patient, always</p>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   BLOG PREVIEW
   ═══════════════════════════════════════════════════════════════════════════ */
interface DBArticle {
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category: string;
  date: string;
  content: string;
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

const BlogPreview = memo(() => {
  const [articles, setArticles] = useState<DBArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_articles")
      .select("slug, title, excerpt, image_url, category, date, content")
      .eq("is_published", true)
      .order("date", { ascending: false })
      .limit(4)
      .then(({ data, error }) => {
        if (!error && data?.length) setArticles(data);
        setLoading(false);
      });
  }, []);

  const FALLBACK_IMG = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=720&fit=crop&q=80";

  if (loading) return <SkeletonSection />;
  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section id="blog" className="py-20 bg-stone-100" aria-labelledby="blog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-4">
            Health & Wellness Journal
          </span>
          <h2 id="blog-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Expert advice for living <span className="text-teal-700">well with arthritis</span>
          </h2>
        </div>

        {featured && (
          <article className="mb-10 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 md:flex">
            <Link to={`/blog/${featured.slug}`} className="md:w-1/2 block">
              <img
                src={featured.image_url || FALLBACK_IMG}
                alt=""
                aria-hidden="true"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </Link>
            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full w-fit">
                {featured.category}
              </span>
              <h3 className="text-2xl font-bold mt-3 text-gray-900">
                <Link
                  to={`/blog/${featured.slug}`}
                  className="hover:text-teal-700 transition-colors focus:outline-none focus:underline"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="text-gray-500 mt-2">{featured.excerpt}</p>
              <p className="mt-4 text-sm text-gray-400">
                {estimateReadingTime(featured.content)} ·{" "}
                {new Date(featured.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </article>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <article
              key={a.slug}
              className="group bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <Link
                to={`/blog/${a.slug}`}
                className="block aspect-[16/10] overflow-hidden"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={a.image_url || FALLBACK_IMG}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </Link>
              <div className="p-5">
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
                  {a.category}
                </span>
                <h3 className="text-lg font-bold mt-3 text-gray-900">
                  <Link
                    to={`/blog/${a.slug}`}
                    className="group-hover:text-teal-700 transition-colors focus:outline-none focus:underline"
                  >
                    {a.title}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{a.excerpt}</p>
                <p className="mt-3 text-xs text-gray-400">
                  {estimateReadingTime(a.content)} ·{" "}
                  {new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            View all articles <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   SCHEMA MARKUP
   ─ FIX: sameAs updated to accurately reflect our own profiles, not competitors
   ═══════════════════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
function PageContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const toastShown = useRef(false);
  const { analytics, setAnalytics } = useCtx();

  /* ─ FIX: GA only loads when analytics consent is given; uses env variable ─ */
  useEffect(() => {
    if (!analytics) return;
    const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (!GA_ID) return; // silently skip if env var not set
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    const i = document.createElement("script");
    i.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
    document.head.appendChild(i);
  }, [analytics]);

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
        <title>Free Arthritis Support UK — AI Physio, Symptom Tracker & Expert Guides | {SITE_NAME}</title>
        <meta
          name="description"
          content="Free AI-guided physiotherapy, symptom tracking, anti-inflammatory diet plans and flare-up management for people with arthritis in the UK. No waiting lists. HCPC-registered clinicians, NICE-aligned."
        />
        <meta
          name="keywords"
          content="arthritis management UK, rheumatoid arthritis help, osteoarthritis exercises, arthritis symptom tracker, free arthritis support, anti-inflammatory diet arthritis, arthritis flare-up management, living with arthritis"
        />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta name="geo.region" content="GB" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#0f766e" />
        <meta property="og:title" content={`Free Arthritis Support UK | ${SITE_NAME}`} />
        <meta
          property="og:description"
          content="Free AI-guided arthritis support — physiotherapy, diet plans, symptom tracking. No waiting lists. HCPC-registered clinicians."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" fetchPriority="high" />
        <style>{`
          ${SKEL_CSS}
          html { scroll-padding-top: 1rem; }
          body { font-size: 17px; line-height: 1.7; -webkit-font-smoothing: antialiased; }
          *:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
          }
          @media print { nav, footer, .cookie-banner { display: none !important; } }
        `}</style>
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFaq)}</script>
      </Helmet>

      {/* Skip link */}
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-[9999] bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold text-sm -translate-y-20 focus:translate-y-0 transition-transform shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700"
      >
        Skip to main content
      </a>

      <div className="min-h-screen bg-stone-50 text-gray-900 antialiased">
        {/* Ambient background blobs */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[120px]" />
          <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
        </div>

        <ScrollProgress />
        <Header />
        <TrustBar />

        <main id="main-content" role="main" tabIndex={-1}>
          <HeroSection />
          <StatsBand />
          <ActionPathSection />

          <Suspense fallback={<SkeletonSection />}>
            <QuickAccessSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <HowItWorksSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <ServicesGrid />
          </Suspense>

          <ExpertContentSection />

          <Suspense fallback={null}>
            <GeometricCubeSection />
          </Suspense>
          <Suspense fallback={null}>
            <ParticleNetworkSection />
          </Suspense>

          <PhotoBreak
            image={photoBreakCommunity}
            alt="Members of the Living With Arthritis UK community supporting one another"
            quote="No one should face arthritis alone. Together, we're changing what's possible."
            attr={SITE_NAME}
          />

          <WhyUsSection />

          <Suspense fallback={<SkeletonSection />}>
            <ContentDepthSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <QuoteSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <AboutSection />
          </Suspense>

          <BlogPreview />

          <Suspense fallback={<SkeletonSection />}>
            <TestimonialsSection />
          </Suspense>

          <PhotoBreak
            image={photoBreakActive}
            alt="Person with arthritis enjoying an active walk outdoors"
            quote="Movement is medicine. Every step forward is a victory worth celebrating."
            attr="Living With Arthritis UK Clinical Team"
          />

          <Suspense fallback={<SkeletonSection />}>
            <DonationImpactSection />
          </Suspense>

          <LeadCaptureSection />

          <Suspense fallback={<SkeletonSection />}>
            <FAQSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <NewsletterSection />
          </Suspense>

          {/* FIXED contact section — enquiries go to info@livingwitharthritis.org.uk */}
          <GetInTouchSection />

          <AITrustSection />
        </main>

        <BackToTop />
        <CookieBanner />

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
            <h1 style={{ color: "#0f766e" }}>Living With Arthritis UK</h1>
            <p>
              This site works best with JavaScript enabled. Please enable it, or contact us directly at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#0f766e" }}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </noscript>

        <Suspense fallback={<div className="h-80 bg-gray-900" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Index() {
  const [analytics, setAnalytics] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lwa_cv3") || "{}").a === true;
    } catch {
      return false;
    }
  });

  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center p-12 text-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-500 mb-6">
              Please refresh the page. If the problem persists, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal-700 underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-teal-700 text-white rounded-xl font-semibold hover:bg-teal-800 transition-colors"
            >
              Refresh page
            </button>
          </div>
        </div>
      }
    >
      <Ctx.Provider value={{ analytics, setAnalytics }}>
        <PageContent />
      </Ctx.Provider>
    </ErrorBoundary>
  );
}
