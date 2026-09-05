import { lazy, Suspense, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import PageHero from "@/components/ui/PageHero";
import SkeletonSection from "@/components/landing/SkeletonSection";
import { faqArticles } from "@/data/faqArticles";

const Footer = lazy(() => import("@/components/Footer"));

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

  return (
  <>
    <Helmet>
      <title>Arthritis FAQs UK – PIP, exercise, pain and work rights</title>
      <meta
        name="description"
        content="In-depth UK arthritis FAQs: PIP and benefits, osteoarthritis, exercise, pain, work rights and mental health. Written in plain English by Living With Arthritis UK."
      />
      <meta property="og:title" content="Arthritis FAQs UK – PIP, exercise, pain and work rights" />
      <meta
        property="og:description"
        content="Browse every in-depth arthritis FAQ. Start with PIP, exercise or osteoarthritis — then donate if you can keep this free."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://livingwitharthritis.org.uk/faq" />
      <meta property="og:site_name" content="Living With Arthritis UK" />
      <meta property="og:locale" content="en_GB" />
      <link rel="canonical" href="https://livingwitharthritis.org.uk/faq" />
    </Helmet>
    <Header />
    <main id="main-content" role="main" tabIndex={-1}>
      <PageHero
        badge="FAQ"
        title="Arthritis questions, answered in plain English"
        subtitle="Click any card for a full UK guide. These are the questions people ask most about PIP, exercise, pain, work and living with arthritis."
      />
      <Suspense fallback={<SkeletonSection />}>
        <div className="container mx-auto max-w-6xl px-6 pb-20">
          <p className="mb-10 text-center text-sm text-muted-foreground">
            {faqArticles.length} in-depth guides · free to read · no sign-up
          </p>
          {grouped.map(([category, articles]) => (
            <section key={category} className="mb-14" aria-labelledby={`faq-cat-${category}`}>
              <h2
                id={`faq-cat-${category}`}
                className="mb-5 font-display text-xl font-bold text-foreground sm:text-2xl"
              >
                {category}
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      to={`/faq/${article.slug}`}
                      className="flex h-full min-h-[88px] flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <span className="font-semibold text-foreground">{article.question}</span>
                      <span className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                        {article.quickAnswer}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Read the full answer <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-center text-sm text-muted-foreground">
            Want to keep these answers free?{" "}
            <Link to="/donate" className="font-semibold text-primary hover:underline">
              Donate
            </Link>
            .
          </p>
        </div>
      </Suspense>
    </main>
    <Suspense fallback={<div className="h-80 bg-secondary" aria-hidden="true" />}>
      <Footer />
    </Suspense>
  </>
  );
};

export default FAQ;
