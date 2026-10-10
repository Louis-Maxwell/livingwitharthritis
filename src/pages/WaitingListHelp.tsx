import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Hospital } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import PageBreadcrumb from "@/components/ui/PageBreadcrumb";
import FaqAccordion from "@/components/faq/FaqAccordion";
import AeoEnhancement from "@/components/seo/AeoEnhancement";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import { sanitizeHtml } from "@/utils/sanitizeHtml";
import {
  WAIT_LIST_DESCRIPTION,
  WAIT_LIST_FAQS,
  WAIT_LIST_HTML,
  WAIT_LIST_META_TITLE,
  WAIT_LIST_QUICK_ANSWER,
  WAIT_LIST_TITLE,
} from "@/data/waitingGuides/waitingListHelpContent";

/**
 * /arthritis-waiting-list-help (Waiting for Treatment batch 5, topic 71).
 * Content lives in src/data/waitingGuides/waitingListHelpContent.ts. Checked
 * against NHS.uk, NHS inform, GOV.WALES, My Waiting Times NI and NICE on
 * 10 October 2026. Pending clinical review, so no reviewer is claimed.
 */

const BASE = "https://livingwitharthritis.org.uk";
const PATH = "/arthritis-waiting-list-help";
const PROSE =
  "prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-a:text-primary prose-table:text-sm";

const related = [
  { to: "/blog/how-nhs-referrals-work-arthritis", title: "How NHS referrals work", desc: "From GP letter to first appointment, step by step." },
  { to: "/blog/rheumatology-appointment-what-to-expect-uk", title: "Your rheumatology appointment", desc: "What happens on the day and afterwards." },
  { to: "/blog/rheumatology-waiting-times-uk", title: "Rheumatology waiting times", desc: "What affects how long you wait." },
  { to: "/exercises", title: "Exercise plans", desc: "Joint-by-joint routines you can start now." },
];

const WaitingListHelp = () => {
  useEffect(() => {
    // FAQPage is emitted by <FaqAccordion>; BreadcrumbList by <PageBreadcrumb>.
    const ld = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: WAIT_LIST_TITLE,
      description: WAIT_LIST_DESCRIPTION,
      url: `${BASE}${PATH}`,
      inLanguage: "en-GB",
      dateModified: "2026-10-10",
      audience: {
        "@type": "MedicalAudience",
        audienceType: "Patient",
        geographicArea: { "@type": "Country", name: "United Kingdom" },
      },
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  return (
    <>
      <SeoHead
        title={WAIT_LIST_META_TITLE}
        description={WAIT_LIST_DESCRIPTION}
        path={PATH}
        type="article"
        keywords="arthritis waiting list, rheumatology waiting time UK, NHS 18 week rule, treatment time guarantee Scotland, what to do while waiting for rheumatology, physiotherapy self-referral"
      />
      <Header />
      <PageBreadcrumb segments={[{ label: "Waiting List Help" }]} />

      <main id="main-content" className="container mx-auto px-6 md:px-10 py-12 max-w-3xl">
        <div className="flex items-center gap-2 text-primary mb-3">
          <Hospital className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-wide">UK patient guide</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-5">{WAIT_LIST_TITLE}</h1>
        <p className="speakable-intro text-lg text-muted-foreground leading-relaxed mb-6">
          <strong>Quick answer:</strong> {WAIT_LIST_QUICK_ANSWER}
        </p>
        <AeoEnhancement route={PATH} />
        <EducationalDisclaimerBox lastReviewed="2026-09-16" reviewStatus="pending" />
        <div className={PROSE} dangerouslySetInnerHTML={{ __html: sanitizeHtml(WAIT_LIST_HTML) }} />

        <section className="my-12">
          <h2 className="text-2xl font-semibold mb-5">Frequently asked questions</h2>
          <FaqAccordion idPrefix="waiting-list-help-faq" items={WAIT_LIST_FAQS} />
        </section>

        <section className="mb-10 grid sm:grid-cols-2 gap-4">
          {related.map((x) => (
            <Link key={x.to} to={x.to} className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition group">
              <p className="font-semibold group-hover:text-primary">{x.title}</p>
              <p className="text-sm text-muted-foreground">{x.desc}</p>
            </Link>
          ))}
        </section>
        <TopicClusterNav path={PATH} />
      </main>
      <Footer />
    </>
  );
};

export default WaitingListHelp;
