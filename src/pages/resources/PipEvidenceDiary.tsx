import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import { CONTACT_EMAILS, CONTACT_PHONE } from "@/config/contact";
import { CHARITY } from "@/config/charity";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  PIP_DIARY_DESCRIPTION,
  PIP_DIARY_FAQS,
  PIP_DIARY_HTML_AFTER,
  PIP_DIARY_HTML_BEFORE,
  PIP_DIARY_META_TITLE,
  PIP_DIARY_QUICK_ANSWER,
} from "@/data/benefitsGuides/pipDiaryContent";

const PROSE =
  "prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-table:text-xs mb-10";

const PATH = "/resources/pip-evidence-diary";
const PRINT_UTM =
  "?utm_source=print-pip-diary&utm_medium=print&utm_campaign=month1-linkable&utm_content=pip-evidence-diary";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PROMPTS = [
  "Pain / stiffness (0–10)",
  "Preparing food",
  "Eating and drinking",
  "Medicines / injections",
  "Washing and bathing",
  "Using the toilet",
  "Dressing / undressing",
  "Moving around (distance, aid, rests)",
  "Going out / journeys",
  "Help needed from someone else",
  "Falls, near misses, dropped items",
];

export default function PipEvidenceDiary() {
  useEffect(() => {
    const id = "pip-diary-faq-jsonld";
    document.getElementById(id)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PIP_DIARY_FAQS.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
    document.head.appendChild(script);
    return () => document.getElementById(id)?.remove();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title={PIP_DIARY_META_TITLE}
        description={PIP_DIARY_DESCRIPTION}
        type="article"
        keywords="pip evidence diary, pip diary template, pip diary arthritis, printable pip diary uk, pip evidence"
        path={PATH}
      />
      <Header />
      <main id="main-content" className="container mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Resources · Linkable asset</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-11 rounded-full border border-border bg-background px-5 text-sm font-semibold hover:border-primary/40"
          >
            Print / save as PDF
          </button>
        </div>

        <h1 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
          PIP evidence diary for arthritis: free templates
        </h1>
        <p className="speakable-intro mb-6 text-lg text-muted-foreground leading-relaxed">
          <strong>Quick answer:</strong> {PIP_DIARY_QUICK_ANSWER}
        </p>

        <EducationalDisclaimerBox reviewStatus="pending" pendingText="Updated October 2026; pending clinical and editorial review." />
        <TopicClusterNav path="/guides/benefits-pip" />

        <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(PIP_DIARY_HTML_BEFORE) }} />

        <div className="mb-10 overflow-x-auto print:overflow-visible">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr>
                <th className="border border-border bg-muted/40 p-2 font-semibold">Activity</th>
                {DAYS.map((d) => (
                  <th key={d} className="border border-border bg-muted/40 p-2 font-semibold">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROMPTS.map((p) => (
                <tr key={p} className="print:break-inside-avoid">
                  <td className="border border-border p-2 font-medium text-foreground">{p}</td>
                  {DAYS.map((d) => (
                    <td key={`${p}-${d}`} className="border border-border p-2 h-12">
                      &nbsp;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(PIP_DIARY_HTML_AFTER) }} />

        <section className="mb-10 print:hidden" aria-labelledby="pip-diary-faq">
          <h2 id="pip-diary-faq" className="font-display mb-4 text-2xl font-bold">Frequently asked questions</h2>
          <div className="space-y-5">
            {PIP_DIARY_FAQS.map((f) => (
              <div key={f.question}>
                <h3 className="mb-1 font-semibold">{f.question}</h3>
                <p className="leading-relaxed text-foreground/80">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <nav aria-label="Related PIP help" className="mb-4 rounded-xl border border-border/50 bg-muted/20 p-4 text-sm text-foreground/80 print:hidden">
          <p className="font-semibold text-foreground m-0 mb-2">Next steps</p>
          <ul className="m-0 list-disc space-y-1 pl-5">
            <li>
              <Link to={`/guides/benefits-pip${PRINT_UTM}`} className="text-primary underline underline-offset-2">
                Complete PIP guide for arthritis
              </Link>
              {" — "}eligibility, points, the form and challenges
            </li>
            <li>
              <a
                href="https://www.gov.uk/pip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                GOV.UK Personal Independence Payment
              </a>
              {" — "}official rules and claim routes
            </li>
            <li>
              <Link to={`/benefits-pip${PRINT_UTM}`} className="text-primary underline underline-offset-2">
                Benefits &amp; PIP hub
              </Link>
              {" — "}related finances and work links
            </li>
          </ul>
        </nav>
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
