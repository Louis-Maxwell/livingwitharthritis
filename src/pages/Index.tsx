import {
  lazy,
  Suspense,
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useSearchParams, Link } from "react-router-dom";
import Header from "@/components/Header";
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
  CheckCircle2,
  BarChart3,
  Eye,
  Server,
  Lightbulb,
  ChevronUp,
} from "lucide-react";
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
   🔴 SECURITY: Strict Text Sanitization 
   NOTE: For production rich-text sanitization, install `npm i dompurify @types/dompurify`
   and replace this with DOMPurify.sanitize(). Regex sanitization is unsafe for HTML.
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
   GDPR COOKIE CONSENT (Context)
   ═══════════════════════════════════════════════════════════════════════════ */
type CtxType = { analytics: boolean; setAnalytics: (v: boolean) => void };
const Ctx = createContext<CtxType>({ analytics: false, setAnalytics: () => {} });
const useCtx = () => useContext(Ctx);

const CookieBanner = memo(() => {
  const { analytics, setAnalytics } = useCtx();
  const [show, setShow] = useState(() => !localStorage.getItem("lwa_cv2"));
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState({ a: false, p: false, m: false });

  const save = (vals: typeof local) => {
    localStorage.setItem("lwa_cv2", JSON.stringify(vals));
    if (vals.a) setAnalytics(true);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-teal-600 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-bold text-gray-900">We value your privacy</h2>
              <p className="text-sm text-gray-500 mt-1">
                We use cookies to run this site. Analytics help us improve.{" "}
                <Link to="/privacy" className="text-teal-700 underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
          {open && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {[
                { k: "a", l: "Analytics", d: "Helps us understand site usage.", d2: true },
                { k: "p", l: "Preferences", d: "Remember your settings." },
                { k: "m", l: "Marketing", d: "Measure campaign effectiveness." },
              ].map((i) => (
                <label key={i.k} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={local[i.k as keyof typeof local]}
                    onChange={(e) => setLocal((p) => ({ ...p, [i.k]: e.target.checked }))}
                    disabled={i.d2}
                    className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 disabled:opacity-50"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {i.l} {i.d2 && <span className="text-xs text-gray-400">(Always on)</span>}
                    </p>
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
                  className="flex-1 bg-teal-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-800 transition"
                >
                  Accept All
                </button>
                <button
                  onClick={() => save({ a: false, p: false, m: false })}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="py-2.5 text-sm font-medium text-gray-500 underline hover:text-gray-700 transition"
                >
                  Customise
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => save(local)}
                  className="flex-1 bg-teal-700 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-teal-800 transition"
                >
                  Save Preferences
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
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
   🟢 ADVANCED GRAPHICS: Grid, Glass, Gradients
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
      className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse"
      style={{ animationDuration: "10s", animationDelay: "2s" }}
    />
  </div>
));

const GlassCard = memo(({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div
    className={`relative bg-white/60 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
    <div className="relative z-10">{children}</div>
  </div>
));

/* ═══════════════════════════════════════════════════════════════════════════
   🌟 FEATURE: Deep-Dive Page Modal System
   Opens a dedicated "page" overlay when users click section headings.
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
      if (isOpen) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);
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
          <div className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur-md border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-gray-900"
              aria-label="Close"
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
   DATA LAYER: Blog Articles (Structured for easy DB migration)
   TODO: Replace with `const { data } = await supabase.from('blog_articles').select('*')`
   ═══════════════════════════════════════════════════════════════════════════ */
interface Article {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  category: string;
  readingTime: string;
  author: string;
  creds: string;
  date: string;
  featured?: boolean;
}
const fetchArticles = async (): Promise<Article[]> => {
  return [
    /* Mocked fetch */ {
      slug: "gentle-exercises-osteoarthritis-uk-guide",
      title: "15 Gentle Exercises for Osteoarthritis: A UK Physiotherapist's Complete Guide",
      excerpt: "Evidence-based joint-friendly exercises approved by HCPC-registered physiotherapists.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1080&h=720&fit=crop&q=80",
      imageAlt: "Person performing gentle stretching exercises",
      category: "Exercise",
      readingTime: "8 min",
      author: "Sarah Mitchell",
      creds: "MCSP, HCPC Physiotherapist",
      date: "2025-01-15",
      featured: true,
    },
    {
      slug: "anti-inflammatory-diet-plan-arthritis-uk",
      title: "The Anti-Inflammatory Diet Plan for Arthritis: 7-Day UK Meal Guide",
      excerpt: "A practical 7-day meal plan using affordable ingredients from UK supermarkets.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&h=720&fit=crop&q=80",
      imageAlt: "Colourful anti-inflammatory foods",
      category: "Nutrition",
      readingTime: "12 min",
      author: "Dr. Priya Sharma",
      creds: "Registered Dietitian, BDA",
      date: "2025-01-10",
    },
    {
      slug: "rheumatoid-arthritis-mental-health-uk",
      title: "Rheumatoid Arthritis and Mental Health: Why UK Patients Are Talking",
      excerpt: "New research reveals the hidden mental health crisis among RA patients.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1080&h=720&fit=crop&q=80",
      imageAlt: "Mindfulness meditation scene",
      category: "Mental Health",
      readingTime: "10 min",
      author: "James O'Connor",
      creds: "Counsellor, BACP",
      date: "2025-01-05",
    },
    {
      slug: "physiotherapy-at-home-arthritis-uk",
      title: "Physiotherapy at Home: A Free Alternative to Waiting Lists",
      excerpt: "Step-by-step video-guided physiotherapy sessions you can do at home.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1080&h=720&fit=crop&q=80",
      imageAlt: "Physiotherapist guiding a patient",
      category: "Treatment",
      readingTime: "15 min",
      author: "Sarah Mitchell",
      creds: "MCSP, HCPC Physiotherapist",
      date: "2024-12-20",
    },
  ];
};
const BlogPreview = memo(() => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);
  const f = articles.find((a) => a.featured);
  const r = articles.filter((a) => !a.featured);
  if (!articles.length)
    return (
      <div className="py-20 space-y-4 max-w-3xl mx-auto">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-96 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  return (
    <section id="blog" className="py-20 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 block mb-4">
            Health & Wellness Journal
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Expert advice for living <span className="text-teal-700">well with arthritis</span>
          </h2>
        </div>
        {f && (
          <div className="mb-10 rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5 md:flex">
            <a href={`/blog/${f.slug}`} className="md:w-1/2 block">
              <img src={f.image} alt={f.imageAlt} className="w-full h-72 object-cover" loading="lazy" />
            </a>
            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full w-fit">
                {f.category}
              </span>
              <h3 className="text-2xl font-bold mt-3 text-gray-900 hover:text-teal-700">
                <a href={`/blog/${f.slug}`}>{f.title}</a>
              </h3>
              <p className="text-gray-500 mt-2">{f.excerpt}</p>
              <p className="mt-4 text-sm text-gray-400">
                {f.author} · {f.readingTime}
              </p>
            </div>
          </div>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {r.map((a) => (
            <article
              key={a.slug}
              className="group bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <a href={`/blog/${a.slug}`} className="block aspect-[16/10] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </a>
              <div className="p-5">
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full">
                  {a.category}
                </span>
                <h3 className="text-lg font-bold mt-3 text-gray-900 group-hover:text-teal-700">
                  <a href={`/blog/${a.slug}`}>{a.title}</a>
                </h3>
                <p className="text-sm text-gray-500 mt-2">{a.excerpt}</p>
                <p className="mt-3 text-xs text-gray-400">
                  {a.author} · {a.readingTime}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all"
          >
            View all articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   UNMIND-INSPIRED: AI TRUST & SAFETY (Paraphrased for Arthritis)
   Placed conceptually below "Complaints Procedure" / GetInTouch
   ═══════════════════════════════════════════════════════════════════════════ */
const AITrustSection = memo(() => {
  const [modal, setModal] = useState<string | null>(null);
  const closeModal = () => setModal(null);

  const pillars = [
    {
      id: "clinical",
      icon: <ShieldCheck className="w-8 h-8 text-teal-600" />,
      title: "Co-Designed with Clinicians",
      desc: "Our AI health assistant was built hand-in-hand with HCPC-registered physiotherapists and rheumatologists. It acts as a supportive triage tool to guide you, never as a replacement for professional medical judgement.",
      modalContent: (
        <>
          <p className="lead">
            We firmly believe that technology in healthcare should augment, never replace, the human touch.
          </p>
          <h3>The Development Process</h3>
          <p>
            Our AI models were trained using anonymised data sets reviewed and approved by practicing rheumatologists
            and physiotherapists across the UK. Every suggested exercise, dietary recommendation, or management strategy
            was validated against current NICE (National Institute for Health and Care Excellence) guidelines before
            being deployed.
          </p>
          <h3>Boundaries of Use</h3>
          <p>
            The AI is explicitly designed to guide users toward appropriate care pathways. If it detects indicators of a
            flare-up that requires urgent medical attention, it will immediately advise the user to contact their GP or
            rheumatology team, rather than attempting to diagnose or treat the condition itself.
          </p>
        </>
      ),
    },
    {
      id: "transparent",
      icon: <Eye className="w-8 h-8 text-purple-600" />,
      title: "Zero Black Boxes",
      desc: "We believe you deserve to know *why* a specific exercise or dietary change is suggested. Our algorithms provide clear, jargon-free explanations, ensuring you remain in complete control of your care journey.",
      modalContent: (
        <>
          <h3>Explainable AI (XAI)</h3>
          <p>
            Unlike many health apps that simply output a result, our system breaks down its reasoning. When we suggest a
            specific joint mobility exercise, we explain the clinical rationale—such as 'This exercise targets the
            synovial fluid distribution in the knee joint, which can reduce morning stiffness associated with
            osteoarthritis.'
          </p>
          <h3>Auditable Algorithms</h3>
          <p>
            Our decision-making logic is documented and available for review by regulatory bodies and clinical partners.
            We maintain an audit trail of how our models are updated, ensuring accountability as the technology evolves.
          </p>
        </>
      ),
    },
    {
      id: "privacy",
      icon: <Server className="w-8 h-8 text-blue-600" />,
      title: "UK Data Sovereignty",
      desc: "Your health data is heavily encrypted, stored securely within the UK, and strictly governed by UK GDPR and ICO standards. We will never sell, share, or misuse your personal information.",
      modalContent: (
        <>
          <h3>Infrastructure & Encryption</h3>
          <p>
            All personal health data is encrypted both in transit (TLS 1.3) and at rest (AES-256). Our servers are
            physically located within the United Kingdom, ensuring your data never crosses international boundaries
            without explicit, informed consent.
          </p>
          <h3>Data Minimisation</h3>
          <p>
            We only collect data that is strictly necessary to provide our service. We do not engage in data harvesting
            for future commercial use. You can request a full export or permanent deletion of your data at any time by
            contacting our Data Protection Officer.
          </p>
          <h3>ICO Compliance</h3>
          <p>
            We are fully registered with the Information Commissioner's Office (ICO) and undergo regular compliance
            audits to ensure our practices meet the highest standards of UK data protection law.
          </p>
        </>
      ),
    },
    {
      id: "fairness",
      icon: <BarChart3 className="w-8 h-8 text-amber-600" />,
      title: "Mitigated Bias",
      desc: "Trained on diverse UK health demographics, our AI undergoes rigorous, continuous audits to ensure it provides equitable care recommendations—regardless of your age, ethnicity, or location.",
      modalContent: (
        <>
          <h3>Inclusive Training Data</h3>
          <p>
            Arthritis impacts different demographics in different ways. We actively worked to ensure our training data
            represents the diverse population of the UK—including variations in how conditions present across different
            ethnicities, age groups, and socioeconomic backgrounds.
          </p>
          <h3>Ongoing Bias Audits</h3>
          <p>
            We conduct quarterly algorithmic audits. If a disparity is found—for example, if the system recommendations
            are less effective for a specific demographic—we pause deployment, investigate the root cause, and retrain
            the model before it goes live again.
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
            <Lightbulb className="w-4 h-4" /> Responsible AI
          </div>
          <h2
            id="ai-trust-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight"
          >
            Intelligence you can{" "}
            <button
              onClick={() => setModal("clinical")}
              className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600 hover:underline decoration-dashed underline-offset-4 cursor-pointer"
            >
              trust.
            </button>
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
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-gray-500 leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>
        {/* Modals for each pillar */}
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
   MINOR UI & SKELETONS
   ═══════════════════════════════════════════════════════════════════════════ */
const SKEL_CSS = `@keyframes sk{0%{background-position:-400px 0}100%{background-position:400px 0}}.sk{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:800px 100%;animation:sk 1.5s infinite}@media(prefers-reduced-motion:reduce){.sk{animation:none;background:#f0f0f0}}`;
const SkeletonSection = memo(() => (
  <div className="py-20 space-y-4 max-w-3xl mx-auto px-4" aria-hidden="true">
    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
    <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto" />
    <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
  </div>
));

const TrustBar = memo(() => (
  <section aria-label="Trust" className="border-b border-teal-100 bg-teal-50/50">
    <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-teal-800">
      {[
        { I: ShieldCheck, T: "HCPC Registered" },
        { I: Lock, T: "ICO Compliant" },
        { I: Globe, T: "UK Social Enterprise" },
        { I: Clock, T: "No Waiting Lists" },
        {
          I: FileText,
          T: (
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          ),
        },
      ].map(({ I, T }) => (
        <span key={typeof T === "string" ? T : "link"} className="flex items-center gap-1.5">
          <I className="w-4 h-4 text-teal-600" />
          {T}
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
      <ChevronUp className="w-5 h-5" />
    </button>
  );
});

const PhotoBreak = memo(({ image, alt, quote, attr }: { image: string; alt: string; quote: string; attr: string }) => (
  <section aria-label="Photo break" className="relative h-[400px] overflow-hidden bg-gray-900">
    <img
      src={image}
      alt={alt}
      className="h-full w-full object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
    <div className="absolute bottom-0 p-10 lg:p-16 max-w-3xl">
      <p className="text-2xl lg:text-3xl font-semibold text-white" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.4)" }}>
        &ldquo;{quote}&rdquo;
      </p>
      <cite className="block mt-3 text-teal-200 font-medium not-italic">{attr}</cite>
    </div>
  </section>
));

/* ═══════════════════════════════════════════════════════════════════════════
   STATS BAND
   ═══════════════════════════════════════════════════════════════════════════ */
function useCountUp(target: number, dur = 2000) {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const s = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !s.current) {
          s.current = true;
          const t0 = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setC(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
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
  const Stat = ({ v, s, l }: { v: number; s: string; l: string }) => {
    const { c, ref } = useCountUp(v, 2200);
    return (
      <div className="text-center px-4">
        <p
          ref={ref}
          className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums"
          aria-label={`${v.toLocaleString()}${s}`}
        >
          {c.toLocaleString()}
          {s}
        </p>
        <p className="mt-2 text-sm text-teal-200/80 max-w-[200px] mx-auto">{l}</p>
      </div>
    );
  };
  return (
    <section
      aria-label="Impact statistics"
      className="bg-gradient-to-br from-teal-900 via-teal-800 to-gray-900 py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        <Stat v={12400} s="+" l="People helped across the UK" />
        <Stat v={87} s="%" l="Report reduced joint pain" />
        <Stat v={45000} s="+" l="Exercise sessions completed" />
        <div className="text-center px-4">
          <p className="text-3xl sm:text-4xl font-extrabold text-white" aria-label="Zero pounds">
            £0
          </p>
          <p className="mt-2 text-sm text-teal-200/80 max-w-[200px] mx-auto">Cost to every patient</p>
        </div>
      </div>
    </section>
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
   SCHEMA
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
  const { analytics, setAnalytics } = useCtx();

  useEffect(() => {
    if (!analytics) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";
    document.head.appendChild(s);
    const i = document.createElement("script");
    i.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX',{anonymize_ip:true});`;
    document.head.appendChild(i);
  }, [analytics]);

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" fetchPriority="high" />
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

          <Suspense fallback={<SkeletonSection />}>
            <QuickAccessSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <HowItWorksSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <ServicesGrid />
          </Suspense>

          <Suspense fallback={null}>
            <GeometricCubeSection />
          </Suspense>

          <PhotoBreak
            image={photoBreakCommunity}
            alt="UK community supporting each other"
            quote="No one should face arthritis alone. Together, we're changing what's possible."
            attr={SITE_NAME}
          />

          <Suspense fallback={<SkeletonSection />}>
            <ContentDepthSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <QuoteSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <AboutSection />
          </Suspense>

          {/* Dynamic Blog Section */}
          <BlogPreview />

          <Suspense fallback={<SkeletonSection />}>
            <TestimonialsSection />
          </Suspense>

          <PhotoBreak
            image={photoBreakActive}
            alt="Active lifestyle supported by arthritis care"
            quote="Movement is medicine. Every step forward is a victory."
            attr="Clinical Team"
          />

          <Suspense fallback={<SkeletonSection />}>
            <DonationImpactSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <FAQSection />
          </Suspense>
          <Suspense fallback={<SkeletonSection />}>
            <NewsletterSection />
          </Suspense>

          {/* Complaints / Get in Touch Section */}
          <Suspense fallback={<SkeletonSection />}>
            <GetInTouchSection />
          </Suspense>

          {/* 🌟 AI Trust & Safety (Positioned below complaints procedure) */}
          <AITrustSection />
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
      return JSON.parse(localStorage.getItem("lwa_cv2") || "{}").a === true;
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
      <Ctx.Provider value={{ analytics, setAnalytics }}>
        <PageContent />
      </Ctx.Provider>
    </ErrorBoundary>
  );
}
