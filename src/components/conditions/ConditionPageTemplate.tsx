import { useEffect, type ReactNode, type ElementType } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  ThermometerSun,
  Heart,
  Dumbbell,
  Apple,
  Pill,
  HelpCircle,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InternalLinks from "@/components/InternalLinks";
import CrossLinkBanner from "@/components/CrossLinkBanner";
import ContextualLinks from "@/components/ContextualLinks";
import ConditionBlogStrip from "@/components/ConditionBlogStrip";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";

const BASE = "https://livingwitharthritis.org.uk";

export interface ConditionFAQ {
  question: string;
  answer: string;
}

export interface RelatedLink {
  label: string;
  to: string;
  desc: string;
}

export interface ConditionPageData {
  /** URL slug — e.g. "gout" → /conditions/gout */
  slug: string;
  /** Friendly name — "Gout" */
  name: string;
  /** Short tagline shown under H1 */
  tagline: string;
  /** SEO meta title (without site name) */
  metaTitle: string;
  /** SEO meta description */
  metaDescription: string;
  /** Comma-separated keywords */
  keywords: string;
  /** Schema.org alternate names */
  alternateNames?: string[];
  /** "What is" section content */
  whatIs: ReactNode;
  /** Symptom bullets */
  symptoms: string[];
  /** Causes & risk factors bullets */
  causes: string[];
  /** Treatment & management bullets */
  treatments: string[];
  /** Diet recommendations */
  diet: ReactNode;
  /** Exercise recommendations */
  exercise: ReactNode;
  /** FAQ entries (used for FAQ schema + render) */
  faqs: ConditionFAQ[];
  /** Related internal links */
  related: RelatedLink[];
  /** Optional blog categories used to surface the latest matched articles */
  blogCategories?: string[];
  /** Optional override for og:image (absolute or root-relative path) */
  ogImage?: string;
}

const CONDITION_IMAGES: Record<string, string> = {
  osteoarthritis: "/images/condition-osteoarthritis.jpg",
  "rheumatoid-arthritis": "/images/condition-rheumatoid.jpg",
  "psoriatic-arthritis": "/images/condition-psoriatic.jpg",
  "ankylosing-spondylitis": "/images/condition-ankylosing.jpg",
  fibromyalgia: "/images/condition-fibromyalgia.jpg",
  gout: "/images/condition-gout.jpg",
};

function resolveOgImage(slug: string, override?: string): string {
  const path = override ?? CONDITION_IMAGES[slug] ?? "/images/hero-community.jpg";
  return path.startsWith("http") ? path : `${BASE}${path}`;
}

const Section = ({
  icon: Icon,
  title,
  children,
}: {
  icon: ElementType;
  title: string;
  children: ReactNode;
}) => (
  <section className="mb-12">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="prose prose-lg max-w-none text-foreground/85 prose-headings:font-display prose-headings:text-foreground prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-strong:text-foreground">
      {children}
    </div>
  </section>
);

export default function ConditionPageTemplate({ data }: { data: ConditionPageData }) {
  const url = `${BASE}/conditions/${data.slug}`;
  const ogImage = resolveOgImage(data.slug, data.ogImage);

  useEffect(() => {
    const medicalLd = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: data.metaTitle,
      description: data.metaDescription,
      url,
      inLanguage: "en-GB",
      author: { "@type": "Organization", name: "Living With Arthritis", url: BASE },
      publisher: {
        "@type": "Organization",
        name: "Living With Arthritis",
        url: BASE,
        logo: { "@type": "ImageObject", url: `${BASE}/favicon.ico` },
      },
      about: {
        "@type": "MedicalCondition",
        name: data.name,
        ...(data.alternateNames ? { alternateName: data.alternateNames } : {}),
        signOrSymptom: data.symptoms,
        riskFactor: data.causes,
      },
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
        geographicArea: { "@type": "Country", name: "United Kingdom" },
      },
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Conditions", item: `${BASE}/#conditions` },
        { "@type": "ListItem", position: 3, name: data.name, item: url },
      ],
    };

    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };

    const scripts = [medicalLd, breadcrumbLd, faqLd].map((d) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(d);
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.remove());
  }, [data, url]);

  return (
    <>
      <Helmet>
        <title>{`${data.metaTitle} | Living With Arthritis UK`}</title>
        <meta name="description" content={data.metaDescription} />
        <meta name="keywords" content={data.keywords} />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en-GB" href={url} />
        <meta name="geo.region" content="GB" />
        <meta property="og:title" content={data.metaTitle} />
        <meta property="og:description" content={data.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.metaTitle} />
        <meta name="twitter:description" content={data.metaDescription} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[{ label: "Conditions", href: "/#conditions" }, { label: data.name }]}
        />

        {/* Hero */}
        <div className="relative bg-gradient-to-br from-primary/8 via-background to-primary/5 border-b border-border/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/6 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

          <div className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl relative z-10">
            <Link
              to="/#conditions"
              className="text-primary text-sm font-medium inline-flex items-center gap-1.5 mb-6 hover:gap-2.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to conditions
            </Link>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-primary/10 px-3 py-1 rounded-full">
              <Activity className="w-3 h-3" /> Condition Guide
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight tracking-tight">
              {data.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{data.tagline}</p>
          </div>
        </div>

        <main className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <Section icon={Activity} title={`What is ${data.name}?`}>
            {data.whatIs}
          </Section>

          <Section icon={ThermometerSun} title="Symptoms">
            <ul>
              {data.symptoms.map((s) => (
                <li key={s} dangerouslySetInnerHTML={{ __html: s }} />
              ))}
            </ul>
            <h3>When to see a GP</h3>
            <p>
              If you have persistent joint pain, swelling or stiffness, book a GP appointment.
              Early diagnosis means earlier access to the right care and better long-term outcomes.
            </p>
          </Section>

          <Section icon={Heart} title="Causes & Risk Factors">
            <ul>
              {data.causes.map((c) => (
                <li key={c} dangerouslySetInnerHTML={{ __html: c }} />
              ))}
            </ul>
          </Section>

          <Section icon={Pill} title="Treatment & Management">
            <ul>
              {data.treatments.map((t) => (
                <li key={t} dangerouslySetInnerHTML={{ __html: t }} />
              ))}
            </ul>
          </Section>

          <Section icon={Apple} title="Best Diet">
            {data.diet}
          </Section>

          <Section icon={Dumbbell} title="Exercise & Movement">
            {data.exercise}
          </Section>

          {/* FAQ */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {data.faqs.map((f) => (
                <details
                  key={f.question}
                  className="group rounded-xl border border-border/40 bg-card p-5 open:bg-accent/40"
                >
                  <summary className="cursor-pointer list-none font-display text-base md:text-lg font-semibold text-foreground flex items-center justify-between gap-4">
                    {f.question}
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Live Blog & Stories — Advice & Guidance for this condition */}
          <ConditionBlogStrip
            conditionName={data.name}
            matchCategories={data.blogCategories}
          />

          {/* Contextual SEO links — keyword-rich, page-aware */}
          <ContextualLinks
            heading={`Pair ${data.name} care with the right resources`}
            intro="Use these guides alongside your treatment plan — diet, movement, flare management and other conditions worth knowing about."
            groups={[
              {
                title: "Anti-inflammatory diet",
                links: [
                  { label: `Best diet for ${data.name.toLowerCase()}`, to: "/diet" },
                  { label: "Mediterranean diet pillar guide", to: "/guides/diet" },
                  { label: "Foods to avoid with arthritis", to: "/blog/category/nutrition" },
                  { label: "Turmeric, omega-3 and collagen — what works", to: "/blog/category/supplements" },
                ],
              },
              {
                title: "Exercise & physiotherapy",
                links: [
                  { label: `Arthritis-friendly exercises`, to: "/exercises" },
                  { label: "Exercises to avoid with arthritis", to: "/guides/exercise" },
                  { label: "Tai Chi for balance & stiffness", to: "/exercises/tai-chi-for-balance" },
                  { label: "Self-help joint tool", to: "/self-help" },
                ],
              },
              {
                title: "Flare-ups & support",
                links: [
                  { label: "Managing arthritis flare-ups", to: "/arthritis-flare-ups" },
                  { label: "Help while waiting for rheumatology", to: "/arthritis-waiting-list-help" },
                  { label: "Community & peer support", to: "/community" },
                  { label: "Browse the Advice Hub", to: "/blog-hub" },
                ],
              },
              {
                title: "Other conditions",
                links: [
                  { label: "Osteoarthritis", to: "/conditions/osteoarthritis" },
                  { label: "Rheumatoid arthritis", to: "/conditions/rheumatoid-arthritis" },
                  { label: "Psoriatic arthritis", to: "/conditions/psoriatic-arthritis" },
                  { label: "Gout", to: "/conditions/gout" },
                  { label: "Ankylosing spondylitis", to: "/conditions/ankylosing-spondylitis" },
                  { label: "Juvenile arthritis", to: "/conditions/juvenile-arthritis" },
                  { label: "Fibromyalgia", to: "/conditions/fibromyalgia" },
                  { label: "Lupus (SLE)", to: "/conditions/lupus" },
                ].filter((l) => l.to !== `/conditions/${data.slug}`),
              },
            ]}
          />

          {/* Curated related-link cards (per-page) */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Continue Reading
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {data.related.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  className="group rounded-xl border border-border/40 px-5 py-4 hover:bg-accent transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                    {r.label} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{r.desc}</span>
                </Link>
              ))}
            </div>
          </section>

          <div className="p-8 rounded-2xl bg-accent border border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-3">
              Need more support?
            </h2>
            <p className="text-muted-foreground mb-5">
              Chat with our AI assistant, browse the Advice Hub or book a virtual physiotherapy
              consultation — all free.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Chat with our AI assistant
              </Link>
              <Link
                to="/blog-hub"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold hover:bg-secondary/20 transition-colors"
              >
                Open Advice Hub
              </Link>
            </div>
            <CrossLinkBanner
              preset="condition"
              exclude={`/conditions/${data.slug}`}
              title="Explore related resources"
            />
          </div>
        </main>
        <InternalLinks />
        <Footer />
      </div>
    </>
  );
}
