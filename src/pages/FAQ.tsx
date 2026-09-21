import { lazy, Suspense, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import SkeletonSection from "@/components/landing/SkeletonSection";
import PageHero from "@/components/ui/PageHero";
import { faqArticles } from "@/data/faqArticles";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import RelatedGuides from "@/components/faq/RelatedGuides";
import ArticleCitations from "@/components/blog/ArticleCitations";
import { CITATIONS_FAQ_HUB } from "@/data/clinical/ukCitations";
import EmailSignupForm from "@/components/EmailSignupForm";

const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const Footer = lazy(() => import("@/components/Footer"));

const SITE = "https://livingwitharthritis.org.uk";

const FAQ = () => {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqArticles>();
    for (const article of faqArticles) {
      const list = map.get(article.category) ?? [];
      list.push(article);
      map.set(article.category, list);
    }
    return [...map.entries()];
  }, []);

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UK arthritis frequently asked questions",
    url: `${SITE}/faq`,
    numberOfItems: faqArticles.length,
    itemListElement: faqArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: article.question,
      url: `${SITE}/faq/${article.slug}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Arthritis FAQs UK: symptoms, treatment, diet & PIP</title>
        <meta
          name="description"
          content="UK arthritis FAQs answered in plain English — OA vs RA, gout, cold weather, PIP, exercise, diet and when to see a GP. Free Living With Arthritis charity answers."
        />
        <meta
          name="keywords"
          content="what causes arthritis, is arthritis curable, how to reduce joint inflammation, best pain relief for arthritis, difference between osteoarthritis and rheumatoid arthritis, exercises to avoid with arthritis, how to support someone with chronic pain, arthritis symptoms, arthritis treatment, arthritis medication, arthritis diet, anti-inflammatory diet, arthritis flare up, joint swelling causes, natural remedies for arthritis, arthritis FAQ"
        />
        <meta property="og:title" content="Arthritis FAQs UK: symptoms, treatment, diet & PIP" />
        <meta
          property="og:description"
          content="UK arthritis FAQs answered in plain English — OA vs RA, gout, cold weather, PIP, exercise, diet and when to see a GP. Free Living With Arthritis charity answers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE}/faq`} />
        <meta property="og:site_name" content="Living With Arthritis UK" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:image" content={`${SITE}/images/hero-walking-group-1600.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Frequently Asked Questions | Living With Arthritis UK" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arthritis FAQs UK: symptoms, treatment, diet & PIP" />
        <meta
          name="twitter:description"
          content="UK arthritis FAQs answered in plain English — OA vs RA, gout, cold weather, PIP, exercise, diet and when to see a GP. Free Living With Arthritis charity answers."
        />
        <meta name="twitter:image" content={`${SITE}/images/hero-walking-group-1600.webp`} />
        <script type="application/ld+json">{JSON.stringify(itemListLd)}</script>
      </Helmet>
      <Header />
      <main id="main-content" role="main" tabIndex={-1}>
        <PageHero
          badge="FAQ"
          title="Arthritis questions answered for people in the UK"
          subtitle="Start with pain, a new diagnosis, benefits/PIP or the symptom checker — then browse the full library. Written for people with arthritis and carers, not search engines."
        />
        <Suspense fallback={<SkeletonSection />}>
          <FAQSection />
        </Suspense>

        <section className="py-16 bg-muted/30 border-t border-border/40" aria-labelledby="faq-article-index">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <h2 id="faq-article-index" className="text-2xl md:text-3xl font-display font-bold mb-3">
              Full FAQ library
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl">
              Each question below is a standalone page with a longer answer. These are the
              URLs we want Google to index — not empty stubs.
            </p>
            <RelatedGuides
              title="Start with high-intent questions"
              headingId="faq-high-intent"
              items={[
                {
                  title: "Pain now — relief guide",
                  href: "/guides/arthritis-pain-relief",
                  description: "Practical UK steps for joint pain today, with links to flares and when to seek help.",
                },
                {
                  title: "Newly diagnosed",
                  href: "/guides/newly-diagnosed",
                  description: "What to ask your GP, how to prepare, and where to start without overwhelm.",
                },
                {
                  title: "Symptom checker (educational)",
                  href: "/symptom-checker",
                  description: "Organise symptoms and open the right guides — not a diagnosis.",
                },
                {
                  title: "What disability benefits can I get with arthritis?",
                  href: "/faq/arthritis-disability-benefits-uk",
                  description: "PIP, Adult Disability Payment, ESA and Blue Badge — based on daily tasks, not diagnosis.",
                },
                {
                  title: "PIP for arthritis in the UK",
                  href: "/blog/pip-for-arthritis-uk",
                  description: "How PIP is assessed for arthritis, evidence and next steps.",
                },
                {
                  title: "Best exercises for arthritis",
                  href: "/faq/best-exercises-arthritis",
                  description: "Low-impact movement, including swimming and hip OA routines.",
                },
              ]}
            />
            <div className="mb-10">
              <EducationalDisclaimerBox lastReviewed="2026-09-21" />
              <TopicClusterNav path="/faq" />
              <ArticleCitations citations={CITATIONS_FAQ_HUB} />
            </div>
            {grouped.map(([category, articles]) => (
              <div key={category} className="mb-10">
                <h3 className="text-lg font-semibold text-foreground mb-3">{category}</h3>
                <ul className="space-y-2">
                  {articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        to={`/faq/${article.slug}`}
                        className="text-primary font-medium hover:underline"
                      >
                        {article.question}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <aside
              aria-label="Optional email updates"
              className="mb-10 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5 sm:p-6"
            >
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                Prefer answers by email?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
                Free PECR-consent updates when we publish useful UK arthritis guides.
                Educational only — not medical advice. Charity 1218461.
              </p>
              <EmailSignupForm
                sequence="faq-hub"
                buttonText="Request guides by email"
                label="Email for practical arthritis FAQs"
              />
            </aside>

            <p className="text-sm text-muted-foreground">
              Looking for a condition overview instead? Start with{" "}
              <Link to="/conditions/osteoarthritis" className="text-primary hover:underline">
                osteoarthritis
              </Link>
              ,{" "}
              <Link to="/conditions/rheumatoid-arthritis" className="text-primary hover:underline">
                rheumatoid arthritis
              </Link>
              ,{" "}
              <Link to="/conditions/gout" className="text-primary hover:underline">
                gout
              </Link>{" "}
              or the{" "}
              <Link to="/library/fibromyalgia" className="text-primary hover:underline">
                fibromyalgia library guide
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </>
  );
};

export default FAQ;
