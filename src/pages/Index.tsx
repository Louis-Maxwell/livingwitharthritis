import { lazy, Suspense, memo, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollProgress from "@/components/ScrollProgress";
import ErrorBoundary from "@/components/ErrorBoundary";

const FeedbackPopup    = lazy(() => import("@/components/FeedbackPopup"));
const Footer           = lazy(() => import("@/components/Footer"));
const QuickAccessSection    = lazy(() => import("@/components/landing/QuickAccessSection"));
const ContentDepthSection   = lazy(() => import("@/components/landing/ContentDepthSection"));
const HowItWorksSection     = lazy(() => import("@/components/landing/HowItWorksSection"));
const ServicesGrid          = lazy(() => import("@/components/ServicesGrid"));
const GeometricCubeSection  = lazy(() => import("@/components/landing/GeometricCubeSection"));
const QuoteSection          = lazy(() => import("@/components/landing/QuoteSection"));
const AboutSection          = lazy(() => import("@/components/AboutSection"));
const TestimonialsSection   = lazy(() => import("@/components/landing/TestimonialsSection"));
const DonationImpactSection = lazy(() => import("@/components/landing/DonationImpactSection"));
const FAQSection            = lazy(() => import("@/components/landing/FAQSection"));
const NewsletterSection     = lazy(() => import("@/components/landing/NewsletterSection"));
const GetInTouchSection     = lazy(() => import("@/components/landing/GetInTouchSection"));

import { photoBreakCommunity, photoBreakActive } from "@/data/images";

/* ═══════════════════════════════════════════════════════════════════════════════
   TRUST BAR — Instant UK credibility (Babylon Health pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
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
  ];

  return (
    <section aria-label="Trust indicators" className="border-b border-sage-200/60 bg-sage-50/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-[13px] font-medium text-sage-800 sm:gap-x-8">
          {items.map((item) => (
            <li key={item.text} className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="text-sage-600" aria-hidden="true">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   STATS BAND — Animated counter with IntersectionObserver (Forward pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

const STATS = [
  { value: 12400, suffix: "+", label: "People helped across the UK" },
  { value: 87, suffix: "%", label: "Report reduced joint pain" },
  { value: 45000, suffix: "+", label: "Exercise sessions completed" },
  { value: 0, suffix: "£0", label: "Cost to every patient — always free" },
];

const StatBlock = memo(function StatBlock({ stat }: { stat: typeof STATS[0] }) {
  const { count, ref } = useCountUp(stat.value, 2200);
  return (
    <div className="text-center px-4 sm:px-6">
      <p
        ref={ref}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white tabular-nums"
        aria-label={stat.suffix === "£0" ? "Zero pounds — always free" : `${stat.value.toLocaleString("en-GB")}${stat.suffix}`}
      >
        {stat.suffix === "£0" ? <span>£0</span> : <>{count.toLocaleString("en-GB")}{stat.suffix}</>}
      </p>
      <p className="mt-2 text-sm sm:text-base text-teal-100/80 font-medium max-w-[200px] mx-auto">{stat.label}</p>
    </div>
  );
});

const StatsBand = memo(function StatsBand() {
  return (
    <section aria-label="Impact statistics" className="relative overflow-hidden bg-gradient-to-br from-teal-800 via-teal-900 to-gray-900 py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-coral-400/8 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-10 sm:gap-y-12 lg:grid-cols-4">
          {STATS.map((stat) => <StatBlock key={stat.label} stat={stat} />)}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   MEDIA BAR — Social proof (Hims & Hers pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
const MediaBar = memo(function MediaBar() {
  const logos = [
    { name: "BBC", abbr: "BBC" },
    { name: "NHS", abbr: "NHS" },
    { name: "The Guardian", abbr: "TGU" },
    { name: "ITV", abbr: "ITV" },
    { name: "Sky News", abbr: "SKY" },
    { name: "Versus Arthritis", abbr: "VA" },
  ];
  return (
    <section aria-label="As featured in" className="border-y border-gray-100 bg-white/60 backdrop-blur-sm py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">Recognised &amp; Featured By</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {logos.map((logo) => (
            <span key={logo.name} className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-300 select-none" aria-label={logo.name}>
              {logo.abbr}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   ASSESSMENT CTA — Quiz-first conversion (K Health / Babylon pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
const AssessmentCTA = memo(function AssessmentCTA() {
  return (
    <section aria-labelledby="assessment-heading" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-teal-100/40 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-amber-100/30 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-[13px] font-semibold text-teal-700 mb-6">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI-Powered Health Assessment
        </div>
        <h2 id="assessment-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Not sure where to start?
          <br />
          <span className="text-teal-700">Take our 2-minute quiz</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-gray-500 leading-relaxed" style={{ fontSize: "18px" }}>
          Answer a few simple questions about your joint pain and our AI health assistant will create a personalised care plan — completely free, no sign-up required.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/assessment"
            className="group inline-flex items-center gap-2.5 rounded-full bg-teal-700 px-8 py-4 text-[16px] font-semibold text-white shadow-lg shadow-teal-700/25 transition-all duration-200 hover:bg-teal-800 hover:shadow-xl hover:shadow-teal-800/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700"
          >
            Start free assessment
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <span className="text-[14px] text-gray-400">No email required · Takes 2 minutes · 100% free</span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-gray-400">
          {["Based on NICE guidelines", "GDPR compliant", "Clinical review by HCPC physios"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   ARTICLE CARD — Editorial blog card (Ro pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
const CATEGORY_STYLES: Record<string, string> = {
  Exercise: "bg-sage-100 text-sage-800",
  Nutrition: "bg-amber-50 text-amber-800",
  "Mental Health": "bg-lavender-100 text-lavender-800",
  Treatment: "bg-coral-50 text-coral-800",
  Research: "bg-sky-50 text-sky-800",
  "Daily Living": "bg-rose-50 text-rose-800",
};

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  readingTime: string;
  authorName: string;
  authorCredentials: string;
  date: string;
  featured?: boolean;
}

const ArticleCard = memo(function ArticleCard({
  slug, title, excerpt, image, imageAlt, category,
  readingTime, authorName, authorCredentials, date, featured = false,
}: Article) {
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-lg hover:ring-black/10 hover:-translate-y-1 ${featured ? "md:flex-row" : ""}`}>
      <a href={`/blog/${slug}`} className={`relative block overflow-hidden ${featured ? "md:w-1/2" : "aspect-[16/10]"}`} aria-hidden="true" tabIndex={-1}>
        <img
          src={image} alt={imageAlt}
          width={featured ? 720 : 480} height={featured ? 480 : 300}
          loading="lazy" decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </a>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? "md:justify-center md:p-8 lg:p-10" : ""}`}>
        <div className="mb-3 flex items-center gap-3">
          <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${CATEGORY_STYLES[category] || "bg-gray-100 text-gray-700"}`}>
            {category}
          </span>
          <time dateTime={date} className="text-[13px] text-gray-400">
            {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </time>
        </div>
        <h3 className={`font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-teal-700 ${featured ? "text-xl sm:text-2xl lg:text-[28px]" : "text-lg sm:text-xl"}`}>
          <a href={`/blog/${slug}`} className="after:absolute after:inset-0">{title}</a>
        </h3>
        <p className="mt-2.5 leading-relaxed text-gray-500" style={{ fontSize: featured ? "17px" : "15px" }}>{excerpt}</p>
        <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-[13px] font-bold text-teal-700">
              {authorName.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-800 leading-tight">{authorName}</p>
              <p className="text-[11px] text-gray-400 leading-tight">{authorCredentials}</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[12px] text-gray-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readingTime}
          </span>
        </div>
      </div>
    </article>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   BLOG PREVIEW SECTION — Editorial layout (Ro / Calibrate pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
const ARTICLES: Article[] = [
  {
    slug: "gentle-exercises-osteoarthritis-uk-guide",
    title: "15 Gentle Exercises for Osteoarthritis: A UK Physiotherapist's Complete Guide",
    excerpt: "Evidence-based joint-friendly exercises approved by HCPC-registered physiotherapists. Designed specifically for UK adults living with osteoarthritis who want to stay active without worsening joint pain.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=720&fit=crop&q=80",
    imageAlt: "Person performing gentle stretching exercises for arthritis joint pain relief",
    category: "Exercise", readingTime: "8 min read",
    authorName: "Sarah Mitchell", authorCredentials: "MCSP, HCPC Registered Physiotherapist",
    date: "2025-01-15", featured: true,
  },
  {
    slug: "anti-inflammatory-diet-plan-arthritis-uk",
    title: "The Anti-Inflammatory Diet Plan for Arthritis: 7-Day UK Meal Guide",
    excerpt: "A practical 7-day meal plan using affordable ingredients from UK supermarkets. Backed by research from the University of Glasgow and Arthritis Action.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&h=720&fit=crop&q=80",
    imageAlt: "Colourful anti-inflammatory foods arranged on a kitchen table including berries, leafy greens and oily fish",
    category: "Nutrition", readingTime: "12 min read",
    authorName: "Dr. Priya Sharma", authorCredentials: "Registered Dietitian, BDA Member",
    date: "2025-01-10",
  },
  {
    slug: "rheumatoid-arthritis-mental-health-uk",
    title: "Rheumatoid Arthritis and Mental Health: Why UK Patients Are Talking About It",
    excerpt: "New research from Versus Arthritis reveals the hidden mental health crisis among RA patients in the UK. Here's what helps, from CBT to peer support groups.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080&h=720&fit=crop&q=80",
    imageAlt: "Peaceful mindfulness meditation scene with soft natural lighting for stress and pain management",
    category: "Mental Health", readingTime: "10 min read",
    authorName: "James O'Connor", authorCredentials: "Counsellor, BACP Registered",
    date: "2025-01-05",
  },
  {
    slug: "joint-pain-weather-uk-myth-or-science",
    title: "Does Weather Really Affect Arthritis Pain? What UK Research Actually Shows",
    excerpt: "We analysed data from the University of Manchester's study on 13,000 UK arthritis patients to separate fact from fiction about weather and joint pain.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1080&h=720&fit=crop&q=80",
    imageAlt: "Rainy UK weather scene with person looking out window exploring the link between weather and arthritis pain",
    category: "Research", readingTime: "7 min read",
    authorName: "Dr. Emma Thompson", authorCredentials: "Rheumatologist, MRCP",
    date: "2024-12-28",
  },
  {
    slug: "physiotherapy-at-home-arthritis-uk-nhs-alternative",
    title: "Physiotherapy at Home for Arthritis: A Free Alternative to NHS Waiting Lists",
    excerpt: "Step-by-step video-guided physiotherapy sessions you can do at home. Created by NHS-experienced physios to bridge the gap while you wait for an appointment.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1080&h=720&fit=crop&q=80",
    imageAlt: "Physiotherapist guiding a patient through gentle home exercises for arthritis management",
    category: "Treatment", readingTime: "15 min read",
    authorName: "Sarah Mitchell", authorCredentials: "MCSP, HCPC Registered Physiotherapist",
    date: "2024-12-20",
  },
  {
    slug: "morning-routine-arthritis-joint-stiffness",
    title: "The 20-Minute Morning Routine That Eases Arthritis Joint Stiffness",
    excerpt: "A gentle morning routine developed with occupational therapists to help UK arthritis patients start their day with less pain and more mobility.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1080&h=720&fit=crop&q=80",
    imageAlt: "Morning sunlight streaming through window onto a yoga mat with gentle stretching props",
    category: "Daily Living", readingTime: "6 min read",
    authorName: "Dr. Priya Sharma", authorCredentials: "Registered Dietitian, BDA Member",
    date: "2024-12-15",
  },
];

const BlogPreviewSection = memo(function BlogPreviewSection() {
  const featured = ARTICLES.find((a) => a.featured);
  const rest = ARTICLES.filter((a) => !a.featured);
  return (
    <section id="blog" aria-labelledby="blog-heading" className="relative py-20 sm:py-28 bg-cream-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "24px 24px" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-18">
          <span className="inline-block text-[12px] font-bold uppercase tracking-[0.2em] text-teal-600 mb-4">Health &amp; Wellness Journal</span>
          <h2 id="blog-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-900 leading-[1.15]">
            Expert advice for living <span className="text-teal-700">well with arthritis</span>
          </h2>
          <p className="mt-4 text-gray-500 leading-relaxed" style={{ fontSize: "18px" }}>
            Evidence-based articles written by UK healthcare professionals. No sponsored content, no misinformation — just practical guidance you can trust.
          </p>
        </div>
        {featured && <div className="mb-10"><ArticleCard {...featured} /></div>}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => <ArticleCard key={article.slug} {...article} />)}
        </div>
        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-gray-900/20 transition-all duration-200 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            View all articles
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   PHOTO BREAK — Cinematic full-width (Noom / Forward pattern)
   ═══════════════════════════════════════════════════════════════════════════════ */
const PhotoBreak = memo(function PhotoBreak({ image, alt, quote, attribution }: {
  image: string; alt: string; quote: string; attribution: string;
}) {
  return (
    <section aria-label="Photo break" className="relative">
      <div className="relative h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden">
        <img src={image} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <blockquote className="mx-auto max-w-3xl">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug tracking-tight" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
              &ldquo;{quote}&rdquo;
            </p>
            {attribution && <cite className="mt-4 block text-sm sm:text-base text-teal-200/90 font-medium not-italic">— {attribution}</cite>}
          </blockquote>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   DEFERRED OVERLAYS — Idle-loaded feedback popup
   ═══════════════════════════════════════════════════════════════════════════════ */
const DeferredOverlays = memo(function DeferredOverlays() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(() => setShow(true), { timeout: 5000 })
      : (setTimeout(() => setShow(true), 4000) as unknown as number);
    return () => {
      if (typeof cancelIdleCallback !== "undefined") cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);
  if (!show) return null;
  return (<Suspense fallback={null}><FeedbackPopup /></Suspense>);
});

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION LOADER — Accessible inline spinner
   ═══════════════════════════════════════════════════════════════════════════════ */
const SectionLoader = memo(function SectionLoader() {
  return (
    <div className="py-12 flex items-center justify-center" role="status" aria-label="Loading section">
      <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-teal-200 border-t-teal-600" aria-hidden="true" />
    </div>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════════
   STRUCTURED DATA — UK-optimised for maximum local search visibility
   ═══════════════════════════════════════════════════════════════════════════════ */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "NGO", "LocalBusiness"],
  name: "Living With Arthritis UK",
  alternateName: "Living With Arthritis",
  url: "https://livingwitharthritis.org.uk",
  logo: "https://livingwitharthritis.org.uk/og-image.jpg",
  image: "https://livingwitharthritis.org.uk/og-image.jpg",
  description: "UK social enterprise providing free virtual physiotherapy, anti-inflammatory nutrition guidance, joint exercises, AI health assistant and community support for people living with arthritis in England, Scotland, Wales and Northern Ireland. HCPC registered clinicians. No NHS waiting lists required.",
  medicalSpecialty: "Rheumatology",
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "AdministrativeArea", name: "England" },
    { "@type": "AdministrativeArea", name: "Scotland" },
    { "@type": "AdministrativeArea", name: "Wales" },
    { "@type": "AdministrativeArea", name: "Northern Ireland" },
  ],
  address: { "@type": "PostalAddress", addressCountry: "GB", addressLocality: "United Kingdom" },
  serviceType: ["Free Virtual Physiotherapy UK", "Anti-Inflammatory Diet Plans UK", "Joint Exercise Programmes", "AI Arthritis Health Assistant", "Arthritis Peer Support Community UK", "Rheumatology Self-Management"],
  contactPoint: { "@type": "ContactPoint", email: "info@livingwitharthritis.org.uk", contactType: "customer support", availableLanguage: ["English"], areaServed: "GB" },
  inLanguage: "en-GB",
  foundingDate: "2024",
  knowsAbout: ["Osteoarthritis UK", "Rheumatoid Arthritis UK", "Psoriatic Arthritis", "Juvenile Idiopathic Arthritis", "Joint Pain Management UK", "Anti-Inflammatory Diet", "NHS Physiotherapy Alternatives", "Arthritis Exercise UK", "Arthritis Mental Health UK", "DMARDs Information"],
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "HCPC Registration", recognizedBy: { "@type": "Organization", name: "Health and Care Professions Council" } },
  sameAs: ["https://www.facebook.com/livingwitharthritisuk", "https://twitter.com/LivingArthritisUK", "https://www.instagram.com/livingwitharthritisuk", "https://www.linkedin.com/company/living-with-arthritis-uk"],
};

const websiteSchema = {
  "@context": "https://schema.org", "@type": "WebSite", name: "Living With Arthritis UK",
  url: "https://livingwitharthritis.org.uk", inLanguage: "en-GB",
  potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://livingwitharthritis.org.uk/search?q={search_term_string}" }, "query-input": "required name=search_term_string" },
};

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://livingwitharthritis.org.uk/" }] };

const faqPageSchema = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is Living With Arthritis UK really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. As a UK social enterprise, all our services including virtual physiotherapy, exercise programmes, nutrition guidance and AI health assessments are completely free. There are no hidden charges, no subscriptions, and no insurance required." } },
    { "@type": "Question", name: "Do I need an NHS referral to use your services?", acceptedAnswer: { "@type": "Answer", text: "No referral is needed. You can access our services directly without a GP referral or NHS waiting list. Our HCPC-registered physiotherapists provide safe, evidence-based care that complements any existing NHS treatment." } },
    { "@type": "Question", name: "Who are the clinicians behind Living With Arthritis UK?", acceptedAnswer: { "@type": "Answer", text: "All our clinical content and physiotherapy programmes are developed by HCPC-registered physiotherapists, BDA-registered dietitians, and rheumatology consultants working within the UK healthcare system." } },
    { "@type": "Question", name: "What types of arthritis do you support?", acceptedAnswer: { "@type": "Answer", text: "We provide support for all types of arthritis including osteoarthritis, rheumatoid arthritis, psoriatic arthritis, juvenile idiopathic arthritis, ankylosing spondylitis, gout, and other musculoskeletal conditions affecting joints." } },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
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

  return (
    <ErrorBoundary
      fallback={
        <div className="flex min-h-screen items-center justify-center p-12" role="alert">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 mb-6">We&apos;re sorry about this. Please try refreshing the page.</p>
            <button onClick={() => window.location.reload()} className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors">Refresh page</button>
            <p className="mt-4 text-sm text-gray-400">Still having trouble? <a href="mailto:info@livingwitharthritis.org.uk" className="underline hover:text-gray-600">Contact us</a></p>
          </div>
        </div>
      }
    >
      {/* ═════════════════ HEAD — UK-optimised SEO ═══════════════ */}
      <Helmet>
        <html lang="en-GB" dir="ltr" />
        <link rel="alternate" hrefLang="en-GB" href="https://livingwitharthritis.org.uk/" />
        <link rel="alternate" hrefLang="x-default" href="https://livingwitharthritis.org.uk/" />
        <title>Free Arthritis Support UK — Physiotherapy, Diet &amp; Exercise Plans | Living With Arthritis</title>
        <meta name="description" content="Free virtual physiotherapy, anti-inflammatory diet plans and joint exercise programmes for people with arthritis in the UK. No NHS referral needed. HCPC registered clinicians. Trusted by over 12,000 people across England, Scotland, Wales and Northern Ireland." />
        <meta name="keywords" content="arthritis support UK, free physiotherapy UK, arthritis exercises, anti-inflammatory diet UK, rheumatoid arthritis help UK, osteoarthritis treatment, joint pain relief UK, arthritis community UK, NHS physiotherapy alternative, arthritis charity UK, Living With Arthritis" />
        <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="geo.region" content="GB-ENG" />
        <meta name="geo.placename" content="United Kingdom" />
        <meta name="geo.position" content="54.0;-2.0" />
        <meta name="ICBM" content="54.0, -2.0" />
        <meta name="application-name" content="Living With Arthritis UK" />
        <meta name="theme-color" content="#0A6E5C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LWA UK" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:title" content="Free Arthritis Support UK — Physiotherapy, Diet & Exercise Plans" />
        <meta property="og:description" content="Free virtual physiotherapy, anti-inflammatory diet plans and joint exercise programmes for people with arthritis in the UK." />
        <meta property="og:url" content="https://livingwitharthritis.org.uk/" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Arthritis Support UK | Living With Arthritis" />
        <meta name="twitter:description" content="Free virtual physiotherapy, anti-inflammatory diet plans and joint exercise programmes for people with arthritis in the UK." />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Living With Arthritis UK",
          url: "https://livingwitharthritis.org.uk",
          description: "Free arthritis support and virtual physiotherapy for people in the UK.",
          areaServed: { "@type": "Country", name: "United Kingdom" },
        })}</script>
      </Helmet>

      <ScrollProgress />
      <Header />

      {/* ═══════════ HERO ═══════════ */}
      <HeroSection />

      {/* ═══════════ TRUST BAR ═══════════ */}
      <TrustBar />

      {/* ═══════════ MAIN CONTENT ═══════════ */}
      <main id="main-content">
        <Suspense fallback={<SectionSkeleton />}>
          <QuickAccessSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ContentDepthSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <HowItWorksSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ServicesGrid />
        </Suspense>

        {/* ═══════════ 3D CUBE SECTION ═══════════ */}
        <Suspense fallback={<SectionSkeleton />}>
          <GeometricCubeSection />
        </Suspense>

        {/* Photo break */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={photoBreakCommunity} alt="Arthritis community support group in the UK" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <Suspense fallback={<SectionSkeleton />}>
          <QuoteSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TestimonialsSection />
        </Suspense>

        {/* Photo break */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={photoBreakActive} alt="Active lifestyle with arthritis exercises" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <Suspense fallback={<SectionSkeleton />}>
          <DonationImpactSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <FAQSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <NewsletterSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <GetInTouchSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <FeedbackPopup />
      </Suspense>
    </ErrorBoundary>
  );
}