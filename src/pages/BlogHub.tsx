import { lazyWithRetry } from "@/lib/chunkRecovery";
import { Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import SkeletonSection from "@/components/landing/SkeletonSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Apple,
  Activity,
  Flame,
  Pill,
  HelpCircle,
  Newspaper,
  Sparkles,
  BriefcaseBusiness,
  HeartPulse,
  Users,
} from "lucide-react";

const Footer = lazyWithRetry(() => import("@/components/Footer"));
const InternalLinks = lazyWithRetry(() => import("@/components/InternalLinks"));

interface HubLink {
  label: string;
  to: string;
  /** True for external long-tail keyword targets that point to internal pages */
  description?: string;
}

interface HubCluster {
  id: string;
  title: string;
  intro: string;
  Icon: typeof Apple;
  accent: string;
  primary: { label: string; to: string };
  questions: HubLink[];
  related: HubLink[];
}

const CLUSTERS: HubCluster[] = [
  {
    id: "diet",
    title: "Arthritis Diet & Anti-Inflammatory Nutrition",
    intro:
      "Mediterranean eating, foods that calm inflammation and supplements with real evidence — written for UK readers.",
    Icon: Apple,
    accent: "from-primary/15 to-primary/10",
    primary: { label: "Visit the Diet Hub", to: "/diet" },
    questions: [
      { label: "How to reduce joint inflammation through food", to: "/diet" },
      { label: "What is the best anti-inflammatory diet for arthritis?", to: "/guides/diet" },
      { label: "Foods to avoid with arthritis", to: "/diet" },
      { label: "Mediterranean diet for joint pain — UK guide", to: "/guides/diet" },
      { label: "Are turmeric, omega-3 and collagen worth taking?", to: "/blog/category/supplements" },
    ],
    related: [
      { label: "All Nutrition articles", to: "/blog/category/nutrition" },
      { label: "All Supplements articles", to: "/blog/category/supplements" },
    ],
  },
  {
    id: "exercises",
    title: "Arthritis-Friendly Exercises & Physiotherapy",
    intro:
      "Joint-by-joint routines, low-impact cardio and the moves clinicians say to avoid. Built around HCPC-registered physiotherapy guidance.",
    Icon: Activity,
    accent: "from-primary/15 to-primary/5",
    primary: { label: "Visit the Exercise Hub", to: "/exercises" },
    questions: [
      { label: "Best arthritis-friendly exercises for knee arthritis", to: "/exercises" },
      { label: "Hand & wrist exercises for arthritis", to: "/exercises" },
      { label: "Hip arthritis: safe stretches and strength work", to: "/exercises" },
      { label: "Exercises to avoid with arthritis", to: "/guides/exercise" },
      { label: "Tai Chi for balance and stiffness", to: "/exercises/tai-chi-for-balance" },
      { label: "Physiotherapy for arthritis — what to expect", to: "/guides/exercise" },
    ],
    related: [
      { label: "All Exercise articles", to: "/blog/category/exercise" },
      { label: "Self-help joint tool", to: "/self-help" },
    ],
  },
  {
    id: "flare-ups",
    title: "Arthritis Flare-Ups & Daily Living",
    intro:
      "What to do when pain spikes, how to spot triggers, and lifestyle changes that help you keep working, sleeping and moving.",
    Icon: Flame,
    accent: "from-primary/15 to-primary/5",
    primary: { label: "Read the flare-up guide", to: "/arthritis-flare-ups" },
    questions: [
      { label: "What to do during an arthritis flare-up", to: "/arthritis-flare-ups" },
      { label: "Common arthritis triggers and how to manage them", to: "/arthritis-flare-ups" },
      { label: "Arthritis in cold weather — practical tips", to: "/blog/category/lifestyle" },
      { label: "Working with arthritis — your rights and adjustments", to: "/blog/category/lifestyle" },
      { label: "Arthritis and mental health support", to: "/blog/category/lifestyle" },
      { label: "How to support someone with chronic pain", to: "/community" },
    ],
    related: [
      { label: "All Lifestyle articles", to: "/blog/category/lifestyle" },
      { label: "Community & peer support", to: "/community" },
    ],
  },
  {
    id: "treatment",
    title: "Arthritis Treatment, Medication & Pain Relief",
    intro:
      "Evidence-graded explanations of medication, public healthcare pathways and natural options — including what is and isn't proven.",
    Icon: Pill,
    accent: "from-primary/12 to-primary/8",
    primary: { label: "Browse Treatment articles", to: "/blog/category/treatment" },
    questions: [
      { label: "Best pain relief for arthritis", to: "/blog/category/treatment" },
      { label: "Arthritis medication explained (DMARDs, biologics, NSAIDs)", to: "/conditions/rheumatoid-arthritis" },
      { label: "Natural remedies for arthritis — what works?", to: "/blog/category/supplements" },
      { label: "Difference between osteoarthritis and rheumatoid arthritis", to: "/conditions/osteoarthritis" },
      { label: "Is arthritis curable? Honest answers", to: "/faq" },
      { label: "Help while waiting for rheumatology", to: "/arthritis-waiting-list-help" },
    ],
    related: [
      { label: "All Health articles", to: "/blog/category/health" },
      { label: "All Treatment articles", to: "/blog/category/treatment" },
    ],
  },
  {
    id: "conditions",
    title: "Arthritis Types, Symptoms & Diagnosis",
    intro:
      "Clear routes into osteoarthritis, rheumatoid arthritis and inflammatory conditions, with symptom and diagnosis guidance.",
    Icon: HeartPulse,
    accent: "from-primary/12 to-primary/6",
    primary: { label: "Browse condition guides", to: "/conditions/arthritis" },
    questions: [
      { label: "Osteoarthritis: symptoms, diagnosis and support", to: "/conditions/osteoarthritis" },
      { label: "Rheumatoid arthritis: signs and treatment", to: "/conditions/rheumatoid-arthritis" },
      { label: "When joint symptoms need medical assessment", to: "/blog/arthritis-red-flag-symptoms" },
      { label: "How arthritis is diagnosed", to: "/blog/how-arthritis-is-diagnosed-tests-scans-results" },
    ],
    related: [
      { label: "All Health articles", to: "/blog/category/health" },
      { label: "Newly diagnosed guide", to: "/guides/newly-diagnosed" },
    ],
  },
  {
    id: "benefits-work",
    title: "Benefits, PIP & Working With Arthritis",
    intro:
      "UK-focused guidance on PIP, Access to Work, reasonable adjustments and practical help with employment.",
    Icon: BriefcaseBusiness,
    accent: "from-primary/10 to-primary/5",
    primary: { label: "Visit the Benefits & PIP hub", to: "/benefits-pip" },
    questions: [
      { label: "Can you claim PIP for arthritis?", to: "/blog/pip-for-arthritis-uk" },
      { label: "Access to Work grants and support", to: "/blog/access-to-work-scheme-arthritis-guide" },
      { label: "Reasonable adjustments at work", to: "/guides/work-with-arthritis" },
      { label: "Fit notes, sick pay and time off", to: "/blog/sick-pay-fit-notes-time-off-work-arthritis" },
    ],
    related: [
      { label: "All Lifestyle articles", to: "/blog/category/lifestyle" },
      { label: "Benefits and PIP guide", to: "/guides/benefits-pip" },
    ],
  },
  {
    id: "frailty-support",
    title: "Frailty, Independence & Carer Support",
    intro:
      "Practical guidance for maintaining strength, reducing falls risk and supporting older adults and carers.",
    Icon: Users,
    accent: "from-primary/12 to-primary/7",
    primary: { label: "Browse frailty support", to: "/guides/frailty-management-hub" },
    questions: [
      { label: "Arthritis and frailty: maintaining independence", to: "/blog/lwa-archive-frailty-and-arthritis-maintaining-strength-mobility-and-independence" },
      { label: "Falls prevention and balance", to: "/blog/balance-training-arthritis" },
      { label: "Support for carers and families", to: "/blog/caring-for-parent-with-arthritis" },
      { label: "Strength and resilience in later life", to: "/blog/building-strength-resilience-exercise-frailty-prevention" },
    ],
    related: [
      { label: "All Frailty articles", to: "/blog/category/frailty" },
      { label: "Community support", to: "/community" },
    ],
  },
];

const SITE = "https://livingwitharthritis.org.uk";

const BlogHub = () => {
  // JSON-LD via useEffect (per project rule)
  useEffect(() => {
    const collectionLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Arthritis Advice Hub",
      description:
        "UK arthritis guides organised by condition, treatment, exercise, diet, benefits, work, frailty and daily living.",
      url: `${SITE}/blog-hub`,
      inLanguage: "en-GB",
      isPartOf: { "@type": "WebSite", name: "Living With Arthritis", url: SITE },
      about: { "@type": "MedicalCondition", name: "Arthritis" },
    };

    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I reduce joint inflammation naturally?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A balanced Mediterranean-style eating pattern, regular activity, sleep and weight management where appropriate can support general health and may help some arthritis symptoms. Food does not replace diagnosis or prescribed treatment.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best arthritis-friendly exercises?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Walking, swimming, cycling, Tai Chi and tailored strengthening may suit many people. The safest choice depends on the type of arthritis, current symptoms and other health conditions; modify activity if symptoms clearly worsen.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between osteoarthritis and rheumatoid arthritis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Osteoarthritis affects the whole joint and is influenced by age, previous injury, genetics and other factors. Rheumatoid arthritis is an autoimmune inflammatory condition that often causes persistent swelling, pain and stiffness and needs timely clinical assessment.",
          },
        },
        {
          "@type": "Question",
          name: "Is arthritis curable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many types of arthritis are long-term conditions. Treatment depends on the diagnosis and may include education, tailored activity, medication, physiotherapy, weight management where relevant and specialist care.",
          },
        },
      ],
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: "Advice Hub", item: `${SITE}/blog-hub` },
      ],
    };

    const itemListLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Living With Arthritis topic guides",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 8,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Living with arthritis", url: `${SITE}/living-with-arthritis` },
        { "@type": "ListItem", position: 2, name: "Arthritis diet and nutrition", url: `${SITE}/diet` },
        { "@type": "ListItem", position: 3, name: "Arthritis exercises", url: `${SITE}/exercises` },
        { "@type": "ListItem", position: 4, name: "Arthritis flare-ups and daily living", url: `${SITE}/arthritis-flare-ups` },
        { "@type": "ListItem", position: 5, name: "Arthritis treatment and pain relief", url: `${SITE}/blog/category/treatment` },
        { "@type": "ListItem", position: 6, name: "Arthritis conditions", url: `${SITE}/conditions/arthritis` },
        { "@type": "ListItem", position: 7, name: "Benefits, PIP and work", url: `${SITE}/benefits-pip` },
        { "@type": "ListItem", position: 8, name: "Frailty and carer support", url: `${SITE}/guides/frailty-management-hub` },
      ],
    };

    const scripts = [collectionLd, faqLd, breadcrumbLd, itemListLd].map((data) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      return s;
    });

    return () => scripts.forEach((s) => s.remove());
  }, []);

  return (
    <>
      <Helmet>
        <title>Arthritis Advice Hub | Living With Arthritis</title>
        <meta
          name="description"
          content="Browse UK arthritis guidance by condition, treatment, exercise, diet, benefits, work, frailty and daily living, with clear routes to related articles."
        />
        <meta
          name="keywords"
          content="arthritis advice, arthritis diet, anti-inflammatory diet, arthritis friendly exercises, knee arthritis exercises, hand arthritis exercises, arthritis flare up, managing arthritis flare ups, arthritis treatment, arthritis medication, natural remedies for arthritis, best pain relief for arthritis, how to reduce joint inflammation, exercises to avoid with arthritis, difference between osteoarthritis and rheumatoid arthritis, is arthritis curable, what causes arthritis, arthritis self-care, arthritis in cold weather, working with arthritis, arthritis and mental health"
        />
        <meta property="og:title" content="Arthritis Advice Hub: Diet, Exercises, Flare-Ups & Treatment" />
        <meta
          property="og:description"
          content="Browse UK arthritis guidance by condition, treatment, exercise, diet, benefits, work, frailty and daily living, with clear routes to related articles."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/blog-hub`} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Arthritis Advice Hub: Diet, Exercises, Flare-Ups & Treatment" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="alternate" hrefLang="en-GB" href={`${SITE}/blog-hub`} />
      </Helmet>

      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          gradient="from-primary/8 via-background to-primary/5"
          pattern="dots"
          badge={
            <div className="flex items-center gap-3">
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Newspaper className="w-3 h-3 mr-1.5" />
                Advice Hub
              </Badge>
              <Badge className="bg-background text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Evidence-Based
              </Badge>
            </div>
          }
          title={<>Arthritis Advice <span className="text-primary">by Topic</span></>}
          subtitle="Find clear, evidence-informed guidance organised by diet, exercise, flare-ups, treatment, conditions, benefits and frailty support."
        />

        <section className="container mx-auto px-6 md:px-10 pt-8 md:pt-12">
          <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold mb-2">Start here</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Living with arthritis: the main guides</h2>
            <p className="max-w-3xl text-foreground/75 leading-relaxed mb-5">
              Begin with the complete living-with-arthritis guide, then choose a topic for practical support with movement, food, flares or treatment.
            </p>
            <nav aria-label="Main arthritis topic guides" className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Link to="/living-with-arthritis" className="rounded-xl bg-background p-4 font-semibold hover:ring-2 hover:ring-primary/30">Living with arthritis</Link>
              <Link to="/diet" className="rounded-xl bg-background p-4 font-semibold hover:ring-2 hover:ring-primary/30">Diet & nutrition</Link>
              <Link to="/exercises" className="rounded-xl bg-background p-4 font-semibold hover:ring-2 hover:ring-primary/30">Exercise</Link>
              <Link to="/arthritis-flare-ups" className="rounded-xl bg-background p-4 font-semibold hover:ring-2 hover:ring-primary/30">Flares & daily life</Link>
              <Link to="/blog/category/treatment" className="rounded-xl bg-background p-4 font-semibold hover:ring-2 hover:ring-primary/30">Treatment</Link>
            </nav>
          </div>
        </section>

        <section className="container mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {CLUSTERS.map(({ id, title, intro, Icon, accent, primary, questions, related }) => (
              <article
                key={id}
                id={id}
                className={`relative rounded-3xl border border-border/40 bg-gradient-to-br ${accent} p-8 md:p-10 hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start gap-4 mb-5">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-background/80 backdrop-blur shadow-sm shrink-0">
                    <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground leading-tight mb-2">
                      {title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{intro}</p>
                  </div>
                </div>

                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" /> People often ask
                </h3>
                <ul className="space-y-2 mb-6">
                  {questions.map((q) => (
                    <li key={q.label}>
                      <Link
                        to={q.to}
                        className="group flex items-start gap-2 text-sm text-foreground hover:text-primary transition-colors leading-snug"
                      >
                        <ArrowRight className="w-3.5 h-3.5 mt-1 text-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
                        <span>{q.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/30">
                  <Button asChild size="sm" className="rounded-full">
                    <Link to={primary.to}>
                      {primary.label} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                  {related.map((r) => (
                    <Link
                      key={r.label}
                      to={r.to}
                      className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                    >
                      {r.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Quick links to all categories */}
          <div className="mt-14 pt-10 border-t border-border/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-2">Browse all articles</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Prefer chronological reading? Jump straight into the full article library.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog">All articles</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog/category/nutrition">Nutrition</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog/category/exercise">Exercise</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog/category/lifestyle">Lifestyle</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog/category/health">Health</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog/category/supplements">Supplements</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog/category/treatment">Treatment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Suspense fallback={<SkeletonSection />}>
        <InternalLinks />
      </Suspense>
      <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default BlogHub;
