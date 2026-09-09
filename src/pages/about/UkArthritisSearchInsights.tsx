import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Search, Users, AlertTriangle, BookOpen, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import { CHARITY } from "@/config/charity";

const PATH = "/about/uk-arthritis-search-insights";
const BASE = CHARITY.siteUrl;
const URL = `${BASE}${PATH}`;

const HUB_LINKS = [
  { label: "Managing arthritis pain", href: "/guides/arthritis-pain-relief" },
  { label: "Arthritis flare-ups", href: "/arthritis-flare-ups" },
  { label: "Exercise hub", href: "/exercises" },
  { label: "Diet & nutrition hub", href: "/diet" },
  { label: "Benefits & PIP guide", href: "/guides/benefits-pip" },
] as const;

const TOPIC_CLUSTERS = [
  { cluster: "Pain & relief", themes: "Managing arthritis pain; heat/cold; TENS; naproxen / NSAIDs" },
  { cluster: "Movement", themes: "Exercising with arthritis; physio; swimming/walking" },
  { cluster: "Flares & pacing", themes: "Flare-up advice; boom-bust; active rest" },
  { cluster: "Fatigue & sleep", themes: "Arthritis fatigue; sleep and pain" },
  { cluster: "Diet & weight", themes: "Mediterranean diet; anti-inflammatory foods; weight and joints" },
  { cluster: "Medicines & supplements", themes: "Naproxen; glucosamine; DMARDs / methotrexate (IA)" },
  { cluster: "Mental health", themes: "Arthritis anxiety/depression; stress and flares" },
  { cluster: "Access to care", themes: "MSK self-referral; waiting lists; joint replacement" },
] as const;

const COMPETITORS = [
  {
    name: "Arthritis UK",
    note: "Strong UK charity authority — managing arthritis pain / symptoms hubs.",
    href: "https://www.arthritis-uk.org/information-and-support/understanding-arthritis/managing-arthritis-symptoms/managing-arthritis-pain/",
  },
  {
    name: "NHS.uk",
    note: "Condition and treatment hubs; community MSK self-referral pathways.",
    href: "https://www.nhs.uk/conditions/arthritis/",
  },
  {
    name: "NRAS",
    note: "Rheumatoid arthritis pain management (non-drug and drug pathways).",
    href: "https://nras.org.uk/resource/managing-the-pain-of-rheumatoid-arthritis/",
  },
  {
    name: "Patient.info",
    note: "UK consumer clinical encyclopaedia for OA and arthritis.",
    href: "https://patient.info/bones-joints-muscles/arthritis/osteoarthritis",
  },
  {
    name: "NICE",
    note: "OA quality standards and chronic pain guideline NG193 inform NHS authority.",
    href: "https://www.nice.org.uk/",
  },
  {
    name: "US / international publishers",
    note: "Healthline, Mayo Clinic, WebMD and Arthritis Foundation still compete in UK SERPs.",
    href: "https://www.healthline.com/health/chronic-pain/managing-arthritis-pain",
  },
] as const;

export default function UkArthritisSearchInsights() {
  return (
    <>
      <Helmet>
        <html lang="en-GB" />
        <title>UK arthritis search insights | Living With Arthritis</title>
        <meta
          name="description"
          content="Sourced UK search insights on where people look for arthritis help, related topics, and which sites compete — with honest data caveats. Charity 1218461."
        />
        <meta property="og:title" content="UK arthritis search insights | Living With Arthritis" />
        <meta
          property="og:description"
          content="Where UK search demand and MSK need concentrate, related topic clusters, and the competitive set for managing arthritis pain — sourced only."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content={CHARITY.shortName} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="UK arthritis search insights | Living With Arthritis" />
        <meta
          name="twitter:description"
          content="Sourced UK arthritis search geography, related topics and competitor set — with Trends and Semrush API caveats."
        />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="United Kingdom" />
        <link rel="canonical" href={URL} />
        <link rel="alternate" hrefLang="en-GB" href={URL} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <PageBreadcrumb
          segments={[
            { label: "About", href: "/about" },
            { label: "UK arthritis search insights" },
          ]}
        />

        <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 md:py-16 max-w-3xl">
          <header className="mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3 bg-background border border-primary/20 px-3 py-1 rounded-full">
              <Search className="w-3 h-3" aria-hidden="true" /> Research notes
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              UK arthritis search insights
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A plain-English summary of sourced UK search and MSK research for{" "}
              {CHARITY.shortName}. We only report figures we can cite — no invented
              volumes or Trends rankings.
            </p>
            <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
              {CHARITY.legalName} is a registered charity in England and Wales (no.{" "}
              <a
                href={CHARITY.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80"
              >
                {CHARITY.number}
              </a>
              ). We are <strong>independent of Arthritis UK</strong> (formerly Versus
              Arthritis) and of the US Arthritis Foundation.
            </p>
          </header>

          <aside
            className="mb-12 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5"
            aria-labelledby="data-caveats"
          >
            <h2 id="data-caveats" className="flex items-center gap-2 font-display text-lg font-bold mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
              Honest data caveats
            </h2>
            <ul className="space-y-2 text-sm text-foreground/85 leading-relaxed list-disc pl-5">
              <li>
                A live Google Trends (GB) geo pull for <code className="text-xs">arthritis</code>{" "}
                returned HTTP <strong>429 Too Many Requests</strong> at research time
                (9 September 2026). We do <em>not</em> claim a live regional RSV league table.
              </li>
              <li>
                Semrush MCP keyword research could not run because the account had{" "}
                <strong>insufficient API units</strong>. Public Semrush website overview
                pages were usable and are cited. Top-up:{" "}
                <a
                  href="https://www.semrush.com/mcp-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  semrush.com/mcp-access
                </a>
                .
              </li>
              <li>
                Where search geography is incomplete we use labelled{" "}
                <strong>proxies</strong> (related joint-query volume; clinical prevalence
                by region).
              </li>
            </ul>
          </aside>

          {/* Q1 */}
          <section id="where-uk-searches" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl md:text-3xl font-bold mb-4">
              <MapPin className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
              1. Where in the UK do people search most?
            </h2>
            <div className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 space-y-4 leading-relaxed">
              <p>
                <strong>Absolute related search demand</strong> for knee and hip
                replacement terms is highest in Greater London. Elanic Medical’s Google
                Keyword Planner analysis (Dec 2024–Nov 2025) put UK averages at about{" "}
                <strong>370,440 searches/month</strong> for knee/hip replacement terms
                (~255,770 knee; ~114,670 hip), with Greater London leading (~47,310/month
                knee; ~25,080/month hip). Source:{" "}
                <a
                  href="https://www.guardian-series.co.uk/news/25880756.london-searches-knee-hip-replacements/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Guardian Series / Elanic
                </a>
                .
              </p>
              <p>
                <strong>Raw search volume is not the same as per-capita need.</strong>{" "}
                London’s self-reported long-term MSK prevalence was{" "}
                <strong>13.4%</strong> in 2023 versus England <strong>18.4%</strong> (OHID
                Fingertips / GP Patient Survey).
              </p>
              <p>
                <strong>Highest regional prevalence</strong> (a proxy for local info need)
                is the <strong>North East</strong> at <strong>23.1%</strong> in 2023.
                South West (~19.0%) and North West (~19.1%) sit above or near the England
                average. Deprived areas also concentrate MSK burden (OHID; Arthritis UK
                State of MSK Health 2025).
              </p>
              <div className="overflow-x-auto not-prose my-6">
                <table className="w-full text-sm border border-border/40 rounded-lg overflow-hidden">
                  <thead className="bg-muted/40 text-left">
                    <tr>
                      <th className="p-3 font-semibold">Priority lens</th>
                      <th className="p-3 font-semibold">Where to lean</th>
                      <th className="p-3 font-semibold">Why (sourced)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    <tr>
                      <td className="p-3">Absolute related search volume</td>
                      <td className="p-3">Greater London + large metros</td>
                      <td className="p-3">Elanic Keyword Planner knee/hip</td>
                    </tr>
                    <tr>
                      <td className="p-3">Prevalence / unmet need</td>
                      <td className="p-3">North East, then northern/deprived localities</td>
                      <td className="p-3">Fingertips GPPS; deprivation gradients</td>
                    </tr>
                    <tr>
                      <td className="p-3">Content localisation</td>
                      <td className="p-3">“Find NHS MSK / physio near you” by ICB / nation</td>
                      <td className="p-3">NHS community MSK self-referral pathway</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Q2 */}
          <section id="related-topics" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl md:text-3xl font-bold mb-4">
              <BookOpen className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
              2. What related topics do people search alongside arthritis?
            </h2>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
              <p>
                <strong>Pain</strong> is the dominant accompanying theme for inflammatory
                arthritis in UK Google Trends research (2011–2022): mean RSV for “pain”
                with RA <strong>58</strong>, PsA <strong>34</strong>, AS{" "}
                <strong>39</strong> — far above stiffness, fatigue, mood or work
                (typically 2–7 where available). Source:{" "}
                <a
                  href="https://doi.org/10.1093/rheumatology/keae163.087"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Rheumatology keae163.087
                </a>
                .
              </p>
              <p>
                Public Semrush organic keywords for Arthritis UK (UK database, Jul 2026)
                show medicine and supplement adjacency — for example{" "}
                <code className="text-xs">arthritis</code> (position 2, volume{" "}
                <strong>74,000</strong>), <code className="text-xs">naproxen</code>{" "}
                (position 4, volume <strong>165,000</strong>), and{" "}
                <code className="text-xs">glucosamine</code> (position 1, volume{" "}
                <strong>27,100</strong>). Source:{" "}
                <a
                  href="https://www.semrush.com/website/arthritis-uk.org/overview/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  Semrush arthritis-uk.org overview
                </a>
                .
              </p>
              <p>
                NHS pathway language people are steered toward includes physiotherapy,
                occupational therapy, community{" "}
                <a
                  href="https://www.nhs.uk/nhs-services/get-nhs-help-for-back-joint-problems/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2"
                >
                  MSK self-referral
                </a>
                , medicines, TENS, aids and surgery when severe. Flare / pacing education
                is a strong long-tail theme in NHS trust leaflets.
              </p>

              <h3 className="font-display text-xl font-bold pt-2">Related topic clusters</h3>
              <ul className="grid gap-3 sm:grid-cols-2 not-prose">
                {TOPIC_CLUSTERS.map((row) => (
                  <li
                    key={row.cluster}
                    className="rounded-lg border border-border/40 bg-muted/20 p-4"
                  >
                    <p className="font-semibold text-foreground">{row.cluster}</p>
                    <p className="text-sm text-muted-foreground mt-1">{row.themes}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Q3 */}
          <section id="competitor-set" className="mb-14">
            <h2 className="flex items-center gap-2 font-display text-2xl md:text-3xl font-bold mb-4">
              <Users className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
              3. What other sites appear for “managing arthritis pain”?
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Without Semrush SERP API units we could not dump a live ranked top-10 for
              the exact phrase on <code className="text-xs">google.co.uk</code>. Below is
              the <strong>verified competitive set</strong> that consistently surfaces for
              this intent in UK search and NHS/NICE pathways.
            </p>
            <ul className="space-y-3">
              {COMPETITORS.map((c) => (
                <li
                  key={c.name}
                  className="rounded-lg border border-border/40 p-4 flex flex-col gap-1"
                >
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    {c.name}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <span className="text-sm text-muted-foreground">{c.note}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-foreground/90 leading-relaxed">
              Expect <strong>NHS + Arthritis UK</strong> to own YMYL trust signals.{" "}
              {CHARITY.shortName} differentiates with lived-experience, UK practical daily
              living, peer support, and clear “what to do next on the NHS” guidance —
              without claiming medical authority over NHS or NICE.
            </p>
          </section>

          <section id="explore-our-hubs" className="mb-14">
            <h2 className="font-display text-2xl font-bold mb-4">Explore our related hubs</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {HUB_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="block rounded-lg border border-border/40 px-4 py-3 text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="sources" className="mb-8">
            <h2 className="font-display text-xl font-bold mb-3">Key sources</h2>
            <ul className="text-sm text-foreground/80 space-y-2 list-disc pl-5">
              <li>
                <a href="https://www.semrush.com/website/arthritis-uk.org/overview/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Semrush arthritis-uk.org overview</a>
              </li>
              <li>
                <a href="https://fingertips.phe.org.uk/static-reports/health-trends-in-england/North_East/musculoskeletal_health.html" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">OHID Fingertips — North East MSK</a>
              </li>
              <li>
                <a href="https://www.arthritis-uk.org/media/flpbvm2m/arthritisuk_state_of_msk_health_-report_2025.pdf" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Arthritis UK State of MSK Health 2025</a>
              </li>
              <li>
                <a href="https://doi.org/10.1093/rheumatology/keae163.087" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Google Trends IA study (Rheumatology)</a>
              </li>
              <li>
                <a href="https://www.nhs.uk/conditions/arthritis/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">NHS Arthritis</a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Full bibliography: see the internal note{" "}
              <code className="text-xs">docs/SEO-UK-SEARCH-RESEARCH.md</code> in the
              project repo, and our{" "}
              <Link to="/sources" className="text-primary underline underline-offset-2">
                clinical sources
              </Link>{" "}
              page.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
