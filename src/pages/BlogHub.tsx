import { lazy, Suspense, useEffect } from "react";
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
} from "lucide-react";

const Footer = lazy(() => import("@/components/Footer"));
const InternalLinks = lazy(() => import("@/components/InternalLinks"));

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
        "Long-tail arthritis guides organised by topic — diet, exercises, flare-ups and treatment. Written for UK patients.",
      url: `${SITE}/blog-hub`,
      inLanguage: "en-GB",
      isPartOf: { "@type": "WebSite", name: "Living With Arthritis UK", url: SITE },
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
            text: "A Mediterranean-style anti-inflammatory diet, regular low-impact movement, healthy weight, sleep and stress management have the strongest evidence for reducing inflammation in arthritis.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best arthritis-friendly exercises?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Walking, swimming, cycling, Tai Chi and targeted strength work for the muscles around affected joints are widely recommended. Avoid high-impact activities during flare-ups.",
          },
        },
        {
          "@type": "Question",
          name: "What's the difference between osteoarthritis and rheumatoid arthritis?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Osteoarthritis is a wear-and-tear cartilage condition, usually worsening with age. Rheumatoid arthritis is an autoimmune disease where the immune system attacks the joint lining, often causing symmetrical pain and morning stiffness lasting over an hour.",
          },
        },
        {
          "@type": "Question",
          name: "Is arthritis curable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no cure for most types of arthritis, but symptoms can be significantly reduced with diet, exercise, medication, physiotherapy and lifestyle changes — many people live full, active lives.",
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

    const scripts = [collectionLd, faqLd, breadcrumbLd].map((data) => {
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
        <title>Arthritis Advice Hub | Living With Arthritis UK</title>
        <meta
          name="description"
          content="Arthritis blog: Expert articles on pain relief, exercise, nutrition, mental health & living well. Evidence-based guidance for arthritis management."
        />
        <meta
          name="keywords"
          content="arthritis advice, arthritis diet, anti-inflammatory diet, arthritis friendly exercises, knee arthritis exercises, hand arthritis exercises, arthritis flare up, managing arthritis flare ups, arthritis treatment, arthritis medication, natural remedies for arthritis, best pain relief for arthritis, how to reduce joint inflammation, exercises to avoid with arthritis, difference between osteoarthritis and rheumatoid arthritis, is arthritis curable, what causes arthritis, arthritis self-care, arthritis in cold weather, working with arthritis, arthritis and mental health"
        />
        <meta property="og:title" content="Arthritis Advice Hub: Diet, Exercises, Flare-Ups & Treatment" />
        <meta
          property="og:description"
          content="Arthritis blog: Expert articles on pain relief, exercise, nutrition, mental health & living well. Evidence-based guidance for arthritis management."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/blog-hub`} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://livingwitharthritis.org.uk/images/hero-walking-group-1600.webp" />
      </Helmet>

      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          gradient="from-primary/8 via-background to-primary/5"
          pattern="dots"
          badge={
            <div className="flex items-center gap-3">
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Newspaper className="w-3 h-3 mr-1.5" />
                Advice Hub
              </Badge>
              <Badge className="bg-primary/10 text-primary border-0 text-xs font-bold px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1.5" />
                Evidence-Based
              </Badge>
            </div>
          }
          title={<>Arthritis Advice <span className="text-primary">by Topic</span></>}
          subtitle="Find clear, evidence-based answers grouped into the four areas people search for most: diet, exercises, flare-ups and treatment."
        />

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
                        <ArrowRight className="w-3.5 h-3.5 mt-1 text-primary/60 group-hover:translate-x-0.5 transition-transform shrink-0" />
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
