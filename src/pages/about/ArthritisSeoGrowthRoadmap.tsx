import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  ExternalLink,
  Link2,
  MapPin,
  Target,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { CHARITY } from "@/config/charity";

const PATH = "/about/arthritis-seo-growth-roadmap";
const URL = `${CHARITY.siteUrl}${PATH}`;

const LINK_TARGETS = [
  ["NHS and Integrated Care Boards", "Co-create patient resource pages, waiting-list support links and MSK self-referral signposting."],
  ["Universities", "Offer patient involvement resources, student physiotherapy materials and arthritis lived-experience data."],
  ["Physiotherapy organisations", "Pitch exercise safety resources and printable home programmes."],
  ["Rheumatology groups", "Share reviewed explainer pages for RA, medicines and referral preparation."],
  ["Patient support organisations", "Exchange non-commercial resource links where editorially appropriate."],
  ["Local councils and carers services", "Link benefits, Blue Badge, home adaptations and frailty support pages."],
] as const;

const LOCAL_SEO = [
  ["National UK hub", "/arthritis-support", "Indexable support directory for arthritis support UK intent."],
  ["City support pages", "/arthritis-support/:city", "Target arthritis support, arthritis advice and arthritis exercises in UK cities."],
  ["Service pages", "/uk/:city/:service", "Capture long-tail local intent such as physio, support groups and mobility help."],
  ["Topic-first pages", "/guides/exercise", "Use national clinical pages as the canonical authority source from local pages."],
] as const;

const AI_SEARCH = [
  ["Entity clarity", "Repeat charity name, charity number, UK scope and independence from Arthritis UK on About, AI and trust pages."],
  ["Answer blocks", "Keep short answer-first sections on arthritis, symptoms, treatment, exercise, pain and PIP pages."],
  ["Structured data", "Use MedicalWebPage, FAQPage, BreadcrumbList, Organization and reviewedBy schema consistently."],
  ["Citation graph", "Cite NHS, NICE, GOV.UK, CSP and Arthritis UK where they directly support claims."],
  ["AI policy files", "Maintain /ai.txt, /.well-known/ai.txt, /llms.txt and /llms-full.txt with preferred citation URLs."],
  ["Disambiguation", "State Living With Arthritis is a UK charity independent of Arthritis UK and the US Arthritis Foundation."],
] as const;

const ROADMAP = [
  ["Month 1-2", "Quick wins", "Publish and internally link arthritis hub clusters; refresh sitemap; improve titles; fix crawl blockers.", "Target: 15-25 priority pages refreshed and submitted for indexing."],
  ["Month 3-6", "Authority building", "Launch digital PR outreach, reviewer profiles, patient stories and partner resource links.", "Target: 20-40 relevant referring domains and growth in branded searches."],
  ["Month 6-9", "Content expansion", "Deepen RA, OA, exercise, PIP, work and local support clusters with expert-reviewed content.", "Target: 100+ long-tail keywords in top 20 and stronger page-one coverage for cluster terms."],
  ["Month 9-12", "Keyword domination", "Update winners, consolidate weak pages, build comparison guides and improve conversion paths.", "Target: first-page presence for multiple UK arthritis support/exercise/PIP terms."],
] as const;

const ENGINEERING = [
  ["Schema", "Keep PageSchema as the default JSON-LD injector; add reviewedBy and lastReviewed to YMYL pages."],
  ["Internal links", "Every pillar links to symptoms, treatment, exercise, pain relief and PIP; every cluster links back to /conditions/arthritis."],
  ["Crawl control", "Keep utility, auth and duplicate alias routes out of sitemap; advertise canonical static routes only."],
  ["Performance", "Preserve lazy routes, prioritise hero images, trim duplicate schema and avoid new render-blocking scripts."],
  ["Monitoring", "Run typecheck, production build, link checker, schema checks and sitemap validation before merge."],
] as const;

const PRIORITIES = [
  ["Earn UK health/resource backlinks", 10, 7, "Very high", "High"],
  ["Strengthen arthritis hub and clusters", 10, 5, "Very high", "High"],
  ["Clinical review and source governance", 9, 4, "High", "High"],
  ["AI search entity optimisation", 8, 4, "High", "Medium-high"],
  ["Local support architecture", 8, 6, "Medium-high", "Medium"],
  ["Core Web Vitals and crawl checks", 7, 5, "Medium-high", "Medium"],
] as const;

export default function ArthritisSeoGrowthRoadmap() {
  return (
    <>
      <Helmet>
        <html lang="en-GB" />
        <title>Arthritis SEO growth roadmap UK | Living With Arthritis</title>
        <meta
          name="description"
          content="Public SEO growth roadmap for Living With Arthritis: link building, local SEO, AI search optimisation, 12-month roadmap, technical implementation and priority actions."
        />
        <meta property="og:title" content="Arthritis SEO growth roadmap UK | Living With Arthritis" />
        <meta
          property="og:description"
          content="How Living With Arthritis is building UK topical authority for arthritis, exercises, pain relief, treatment and PIP support."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={CHARITY.shortName} />
        <meta name="twitter:card" content="summary" />
        <meta name="geo.region" content="GB" />
        <link rel="canonical" href={URL} />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Arthritis SEO growth roadmap UK",
            description:
              "Public growth roadmap for Living With Arthritis covering link building, local SEO, AI search optimisation, 12-month priorities and technical SEO implementation.",
            url: URL,
            inLanguage: "en-GB",
            datePublished: "2026-10-14",
            dateModified: "2026-10-14",
            author: { "@type": "Organization", name: CHARITY.shortName, url: CHARITY.siteUrl },
            publisher: { "@id": `${CHARITY.siteUrl}/#organization` },
            about: [
              { "@type": "Thing", name: "arthritis SEO" },
              { "@type": "Thing", name: "AI search optimisation" },
              { "@type": "MedicalCondition", name: "Arthritis" },
            ],
            mainEntityOfPage: URL,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[
            { label: "About", href: "/about" },
            { label: "SEO growth roadmap" },
          ]}
        />

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-5xl">
          <header className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Target className="w-3 h-3" aria-hidden="true" /> Growth roadmap
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Arthritis SEO growth roadmap for the UK
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This public roadmap documents how {CHARITY.shortName} is building topical
              authority for arthritis, symptoms, treatment, exercise, pain relief, PIP and
              living with arthritis in the UK.
            </p>
          </header>

          <section className="grid gap-4 md:grid-cols-3 mb-12" aria-label="Priority arthritis hubs">
            {[
              ["Arthritis hub", "/conditions/arthritis"],
              ["Symptoms", "/arthritis-symptoms"],
              ["Treatment", "/arthritis-treatment"],
              ["Exercise", "/guides/exercise"],
              ["Pain relief", "/guides/arthritis-pain-relief"],
              ["PIP and benefits", "/guides/benefits-pip"],
            ].map(([label, href]) => (
              <Link key={href} to={href} className="rounded-xl border border-border bg-card p-4 hover:border-primary/40">
                <span className="font-semibold text-primary underline underline-offset-2">{label}</span>
                <span className="block mt-1 text-sm text-muted-foreground">Primary cluster page</span>
              </Link>
            ))}
          </section>

          <section id="link-building" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <Link2 className="w-5 h-5 text-primary" aria-hidden="true" /> 7. UK link-building strategy
            </h2>
            <p className="text-foreground/85 leading-relaxed mb-5">
              The backlink plan is white-hat: useful resources, partnerships, expert
              contribution and charity credibility. We should not buy links or publish
              manipulative guest posts.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border/40 rounded-lg overflow-hidden">
                <thead className="bg-muted/40 text-left">
                  <tr>
                    <th className="p-3">Target</th>
                    <th className="p-3">Offer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {LINK_TARGETS.map(([target, offer]) => (
                    <tr key={target}>
                      <td className="p-3 font-medium">{target}</td>
                      <td className="p-3 text-muted-foreground">{offer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="local-seo" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" /> 8. UK local SEO strategy
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {LOCAL_SEO.map(([label, href, note]) => (
                <Link key={href} to={href} className="rounded-xl border border-border bg-card p-5 hover:border-primary/40">
                  <span className="font-semibold text-primary underline underline-offset-2">{label}</span>
                  <code className="block mt-2 text-xs text-muted-foreground">{href}</code>
                  <span className="block mt-2 text-sm text-muted-foreground">{note}</span>
                </Link>
              ))}
            </div>
          </section>

          <section id="ai-search" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <Bot className="w-5 h-5 text-primary" aria-hidden="true" /> 9. AI search optimisation
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {AI_SEARCH.map(([label, note]) => (
                <li key={label} className="rounded-xl border border-border/40 bg-muted/20 p-4">
                  <p className="font-semibold">{label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              Preferred AI citation files:{" "}
              <a href="/ai.txt" className="text-primary underline underline-offset-2">ai.txt</a>,{" "}
              <a href="/llms.txt" className="text-primary underline underline-offset-2">llms.txt</a> and{" "}
              <a href="/llms-full.txt" className="text-primary underline underline-offset-2">llms-full.txt</a>.
            </p>
          </section>

          <section id="roadmap" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <Building2 className="w-5 h-5 text-primary" aria-hidden="true" /> 10. 12-month roadmap
            </h2>
            <div className="space-y-4">
              {ROADMAP.map(([phase, label, work, outcome]) => (
                <article key={phase} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{phase}</p>
                  <h3 className="font-display text-xl font-bold mt-1">{label}</h3>
                  <p className="mt-2 text-foreground/85">{work}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{outcome}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="engineering" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold mb-4">
              <Code2 className="w-5 h-5 text-primary" aria-hidden="true" /> 11. Senior engineer implementation notes
            </h2>
            <ul className="space-y-3">
              {ENGINEERING.map(([label, note]) => (
                <li key={label} className="flex gap-3 rounded-xl border border-border/40 p-4">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-muted-foreground">{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section id="priority-plan" className="mb-10">
            <h2 className="font-display text-2xl font-bold mb-4">12. Priority action plan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border/40 rounded-lg overflow-hidden">
                <thead className="bg-muted/40 text-left">
                  <tr>
                    <th className="p-3">Activity</th>
                    <th className="p-3">Impact</th>
                    <th className="p-3">Difficulty</th>
                    <th className="p-3">Ranking benefit</th>
                    <th className="p-3">ROI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {PRIORITIES.map(([activity, impact, difficulty, benefit, roi]) => (
                    <tr key={activity}>
                      <td className="p-3 font-medium">{activity}</td>
                      <td className="p-3">{impact}/10</td>
                      <td className="p-3">{difficulty}/10</td>
                      <td className="p-3">{benefit}</td>
                      <td className="p-3">{roi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="font-semibold mb-2">Execution rule</p>
            <p className="text-sm text-foreground/85 leading-relaxed">
              Ranking for broad "arthritis" queries is a long-term authority target. The near-term
              win is to earn page-one visibility across specific UK queries such as arthritis
              symptoms, arthritis exercises, arthritis pain relief and PIP and arthritis, then use
              that authority to compete upward.
            </p>
            <Link to="/about/uk-arthritis-search-insights" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-2">
              View the UK search insights <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </aside>
        </main>

        <Footer />
      </div>
    </>
  );
}
