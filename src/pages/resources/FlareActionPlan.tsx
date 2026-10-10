import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import { CONTACT_EMAILS, CONTACT_PHONE } from "@/config/contact";
import { CHARITY } from "@/config/charity";
import { sanitizeHtml, jsonLdScript } from "@/utils/sanitizeHtml";
import {
  FLARE_PLAN_FAQS,
  FLARE_PLAN_HTML,
  FLARE_PLAN_UPDATED,
} from "@/data/resources/flareActionPlanContent";

const PATH = "/resources/flare-action-plan";
const URL = `https://livingwitharthritis.org.uk${PATH}`;
const PRINT_UTM =
  "?utm_source=print-flare-plan&utm_medium=print&utm_campaign=month1-linkable&utm_content=flare-action-plan";

const DIRECT_ANSWER =
  "An arthritis flare-up action plan is a written plan you make while you are well, so you know what to do when a flare starts: your usual and flare signs, gentle self-care steps, medicines your own clinicians have agreed, who to contact, and the red flag signs that mean you need urgent help. Print the free plan below and fill it in.";

const pageLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${URL}#webpage`,
  url: URL,
  name: "Arthritis flare-up action plan (free printable)",
  inLanguage: "en-GB",
  datePublished: "2026-10-03",
  dateModified: "2026-10-10",
  publisher: { "@type": "Organization", name: "Living With Arthritis", url: "https://livingwitharthritis.org.uk" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${URL}#faq`,
  mainEntity: FLARE_PLAN_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const RELATED = [
  { to: "/arthritis-flare-ups", label: "Arthritis flare-ups guide" },
  { to: "/blog/arthritis-flare-up-what-to-do", label: "What to do in a flare-up" },
  { to: "/guides/arthritis-pain-relief", label: "Arthritis pain relief" },
  { to: "/blog/energy-management-and-pacing-arthritis", label: "Pacing and energy management" },
  { to: "/resources/clinic-pack", label: "Clinic appointment pack" },
  { to: "/exercises", label: "Exercise hub" },
];

export default function FlareActionPlan() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Arthritis Flare-Up Action Plan (Free Printable)"
        description="Free printable arthritis flare-up action plan for the UK: green, amber and red zones, comfort steps, agreed medicines, contacts and red flags."
        path={PATH}
        type="article"
      />
      <Helmet>
        <script type="application/ld+json">{jsonLdScript(pageLd)}</script>
        <script type="application/ld+json">{jsonLdScript(faqLd)}</script>
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Resources · Free printable</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full border border-border bg-background px-5 text-sm font-semibold hover:border-primary/40"
          >
            Print / save as PDF
          </button>
        </div>

        <h1 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
          Arthritis flare-up action plan (free printable)
        </h1>
        <p className="speakable-intro quick-answer mb-4 text-lg text-muted-foreground leading-relaxed">
          <strong>Quick answer:</strong> {DIRECT_ANSWER}
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Written by the {CHARITY.shortName} team · pending clinical review by Louis Maxwell (HCPC
          PH128483) · Updated {FLARE_PLAN_UPDATED}
        </p>

        <EducationalDisclaimerBox />
        <TopicClusterNav path="/arthritis-flare-ups" />

        <article
          className="prose prose-neutral max-w-none dark:prose-invert prose-table:text-sm print:prose-sm"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(FLARE_PLAN_HTML) }}
        />

        <section aria-labelledby="flare-plan-faq" className="mt-10 print:break-before-page">
          <h2 id="flare-plan-faq" className="font-display mb-4 text-2xl font-bold text-foreground">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {FLARE_PLAN_FAQS.map((f) => (
              <div key={f.question} className="speakable-faq">
                <h3 className="font-display text-lg font-semibold text-foreground">{f.question}</h3>
                <p className="mt-1 text-foreground/85 leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav
          aria-label="Related flare help"
          className="my-8 rounded-xl border border-border/50 bg-muted/20 p-4 text-sm text-foreground/80 print:hidden"
        >
          <p className="font-semibold text-foreground m-0 mb-2">Related help</p>
          <ul className="m-0 list-disc space-y-1 pl-5">
            {RELATED.map((r) => (
              <li key={r.to}>
                <Link to={r.to} className="text-primary underline underline-offset-2">
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mb-6 text-sm text-muted-foreground">
          <h2 className="font-display mb-2 text-base font-bold text-foreground">Sources</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><a href="https://www.nice.org.uk/guidance/ng226" rel="noopener noreferrer">NICE NG226: Osteoarthritis in over 16s</a></li>
            <li><a href="https://www.nice.org.uk/guidance/ng100" rel="noopener noreferrer">NICE NG100: Rheumatoid arthritis in adults</a></li>
            <li><a href="https://www.nice.org.uk/guidance/ng219" rel="noopener noreferrer">NICE NG219: Gout</a></li>
            <li><a href="https://www.arthritis-uk.org/information-and-support/understanding-arthritis/managing-arthritis-symptoms/managing-arthritis-flare-ups/" rel="noopener noreferrer">Arthritis UK: Managing arthritis flare-ups</a></li>
            <li><a href="https://www.nhs.uk/conditions/septic-arthritis/" rel="noopener noreferrer">NHS: Septic arthritis</a></li>
            <li><a href="https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-use-111/" rel="noopener noreferrer">NHS: When to use 111</a></li>
          </ul>
        </section>

        <p className="mb-4 rounded-lg border border-border/40 bg-card px-4 py-3 text-sm text-foreground/85">
          {CHARITY.shortName} is a UK registered charity ({CHARITY.number}). This printable plan is
          educational information, pending clinical review — not a diagnosis or a personal treatment
          plan. Always follow the advice of your own GP, pharmacist or rheumatology team. In an
          emergency call 999; for urgent advice contact NHS 111.
        </p>
        <p className="text-xs text-muted-foreground">
          {CHARITY.shortName} · Charity {CHARITY.number} · {CONTACT_PHONE} · {CONTACT_EMAILS.info}
          <span className="print-only">
            {" "}
            · livingwitharthritis.org.uk{PATH}
            {PRINT_UTM}
          </span>
        </p>
      </main>
      <Footer />
    </div>
  );
}
