import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import MedicalReviewBadge from "@/components/MedicalReviewBadge";
import FaqAccordion from "@/components/faq/FaqAccordion";

export interface StubPageFAQ {
  q: string;
  a: string;
}

export interface StubPageProps {
  /** Page slug (path without leading slash) — used for canonical + breadcrumb. */
  slug: string;
  title: string;
  /** ≤160-char meta description. */
  description: string;
  /** Short plain-English summary shown in the AnswerBox. */
  answer: string;
  /** Breadcrumb trail above the hero (label → href). Last item should be the current page label. */
  breadcrumbs: { label: string; href: string }[];
  /** 6+ FAQ entries — drive `FAQPage` JSON-LD and on-page accordion. */
  faqs: StubPageFAQ[];
  /** Links shown in the “Related” block at the bottom. */
  relatedLinks?: { label: string; href: string }[];
  /** Optional intro paragraph rendered above the FAQs. */
  intro?: React.ReactNode;
}

const BASE = "https://livingwitharthritis.org.uk";

/**
 * Lightweight content stub for navigation destinations that don’t yet have
 * a full editorial page. Renders an AnswerBox, MedicalReviewBadge, FAQ
 * accordion, and JSON-LD (FAQPage + BreadcrumbList) so the URL is
 * indexable, AI-citable, and not an empty 404 in the meantime.
 */
export default function StubPage({
  slug,
  title,
  description,
  answer,
  breadcrumbs,
  faqs,
  relatedLinks = [],
  intro,
}: StubPageProps) {
  const canonical = `${BASE}/${slug.replace(/^\//, "")}`;

  useEffect(() => {
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.label,
        item: `${BASE}${b.href}`,
      })),
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(el);
    return () => el.remove();
  }, [slug, breadcrumbs]);

  return (
    <>
      <Helmet>
        <title>{title} | Living With Arthritis</title>
        <meta name="description" content={description} />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main id="main-content" className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              {breadcrumbs.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3" aria-hidden />}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground font-medium">{b.label}</span>
                  ) : (
                    <Link to={b.href} className="hover:text-foreground hover:underline">
                      {b.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Hero */}
          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              {title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </header>

          {/* AnswerBox */}
          <aside
            aria-label="Quick answer"
            className="border-l-4 border-primary bg-accent/40 p-5 md:p-6 rounded-r-lg mb-8"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Quick answer
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              {answer}
            </p>
          </aside>

          <MedicalReviewBadge />

          {intro && (
            <div className="prose prose-neutral max-w-none my-8">{intro}</div>
          )}

          {/* FAQ */}
          <section aria-labelledby="faq-heading" className="my-12">
            <h2
              id="faq-heading"
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              Frequently asked questions
            </h2>
            <FaqAccordion
              idPrefix={`${slug.replace(/\//g, "-")}-faq`}
              items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
            />
          </section>

          {/* "More coming soon" + Related */}
          <section className="mt-12 border-t border-border pt-8">
            <p className="text-sm text-muted-foreground italic mb-6">
              We’re expanding this guide. Bookmark this page or subscribe to
              our updates for new sections as they’re published.
            </p>

            {relatedLinks.length > 0 && (
              <>
                <h2 className="font-display text-xl font-bold text-foreground mb-4">
                  Related guides
                </h2>
                <ul role="list" className="grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
                  {relatedLinks.map((l) => (
                    <li key={l.href} className="flex list-none">
                      <Link
                        to={l.href}
                        className="flex flex-1 items-center justify-between gap-2 p-4 border border-border rounded-lg bg-card hover:border-primary hover:bg-accent/20 transition-colors group"
                      >
                        <span className="font-medium text-foreground">{l.label}</span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-primary group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
