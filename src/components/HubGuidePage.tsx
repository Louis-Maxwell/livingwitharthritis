import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { MEDICAL_DISCLAIMER_PATH, MEDICAL_DISCLAIMER_SHORT } from "@/lib/medicalDisclaimer";
import { HUB_GUIDE_REVIEWER, type HubGuide } from "@/data/hubGuides";

const BASE = "https://livingwitharthritis.org.uk";

const toId = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Full editorial page for a hub guide (replaces the old StubPage
 * placeholders). Content lives in src/data/hubGuides; the same data is
 * baked into static HTML by scripts/generate-hub-guide-head-data.ts.
 */
export default function HubGuidePage({ guide }: { guide: HubGuide }) {
  const canonical = `${BASE}/${guide.slug}`;

  useEffect(() => {
    const graph: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: guide.breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.label,
          item: `${BASE}${b.href}`,
        })),
      },
    ];
    if (guide.faqs.length > 0) {
      graph.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonical}#faq`,
        url: canonical,
        inLanguage: "en-GB",
        mainEntity: guide.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }
    const nodes = graph.map((data) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.text = JSON.stringify(data);
      document.head.appendChild(el);
      return el;
    });
    return () => nodes.forEach((n) => n.remove());
  }, [guide, canonical]);

  return (
    <>
      <Helmet>
        <title>{`${guide.metaTitle} | Living With Arthritis`}</title>
        <meta name="description" content={guide.description} />
        <meta property="og:title" content={guide.metaTitle} />
        <meta property="og:description" content={guide.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
      </Helmet>

      <main id="main-content" className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
              {guide.breadcrumbs.map((b, i) => (
                <li key={b.href} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3" aria-hidden />}
                  {i === guide.breadcrumbs.length - 1 ? (
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

          <header className="mb-8">
            <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              {guide.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {guide.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Written by{" "}
              <Link to={HUB_GUIDE_REVIEWER.profileHref} className="underline hover:text-foreground">
                {HUB_GUIDE_REVIEWER.name}
              </Link>
              , {HUB_GUIDE_REVIEWER.credentials}. Updated {guide.updated}.
              {guide.reviewStatus === "pending-clinical-review" && (
                <> Pending clinical review.</>
              )}
            </p>
          </header>

          <aside
            aria-label="Quick answer"
            className="border-l-4 border-primary bg-accent/40 p-5 md:p-6 rounded-r-lg mb-10"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Quick answer
            </p>
            <p className="text-base md:text-lg text-foreground leading-relaxed">{guide.answer}</p>
          </aside>

          <article className="prose prose-neutral max-w-none">
            {guide.sections.map((section) => (
              <section key={section.heading} aria-labelledby={toId(section.heading)} className="mb-10">
                <h2 id={toId(section.heading)}>{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul>
                    {section.bullets.map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                )}
                {section.links && section.links.length > 0 && (
                  <p className="text-sm">
                    <strong>Read more: </strong>
                    {section.links.map((l, i) => (
                      <span key={l.href}>
                        {i > 0 && " · "}
                        <Link to={l.href}>{l.label}</Link>
                      </span>
                    ))}
                  </p>
                )}
              </section>
            ))}

            <section aria-labelledby="faq-heading" className="mb-10">
              <h2 id="faq-heading">Frequently asked questions</h2>
              {guide.faqs.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>
          </article>

          <aside
            aria-label="Educational disclaimer"
            className="my-10 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm leading-relaxed text-foreground/90"
          >
            <p className="font-semibold text-foreground">
              Reviewer: {HUB_GUIDE_REVIEWER.name}, {HUB_GUIDE_REVIEWER.credentials}
              {guide.reviewStatus === "pending-clinical-review" ? " · pending clinical review" : ""}
            </p>
            <p className="mt-2">
              {MEDICAL_DISCLAIMER_SHORT} Always follow the advice of your own GP or rheumatology team. See our{" "}
              <Link to={MEDICAL_DISCLAIMER_PATH} className="text-primary underline underline-offset-2">
                medical disclaimer
              </Link>
              .
            </p>
          </aside>

          {guide.related.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Related guides</h2>
              <ul role="list" className="grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
                {guide.related.map((l) => (
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
            </section>
          )}
        </div>
      </main>
    </>
  );
}
