import { LOUIS_MAXWELL_REF } from "@/lib/louisMaxwell";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import { CHARITY } from "@/config/charity";
import { jsonLdScript } from "@/utils/sanitizeHtml";

const PATH = "/resources/symptom-flare-tracker";
const URL = `https://livingwitharthritis.org.uk${PATH}`;
const PDF = "/downloads/arthritis-symptom-flare-tracker.pdf";
const COLUMNS = ["Pain (0–10)", "Morning stiffness (minutes)", "Fatigue (0–10)", "Swollen or hot joints", "Sleep", "Activity", "Medicines taken", "Flare? (yes/no)", "Notes"];

const pageLd = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": `${URL}#webpage`,
  url: URL,
  name: "Arthritis symptom and flare tracker (free printable)",
  inLanguage: "en-GB",
  datePublished: "2026-10-26",
  dateModified: "2026-10-26",
  lastReviewed: "2026-10-26",
  reviewedBy: { ...LOUIS_MAXWELL_REF },
  publisher: { "@type": "NGO", name: "Living With Arthritis", url: "https://livingwitharthritis.org.uk" },
};

export default function SymptomFlareTracker() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Free Arthritis Symptom and Flare Tracker (Printable PDF)"
        description="Free printable 7-day arthritis symptom and flare tracker: pain, stiffness, fatigue, sleep, activity and medicines to take to your GP or physio."
        path={PATH}
        type="article"
      />
      <Helmet>
        <script type="application/ld+json">{jsonLdScript(pageLd)}</script>
      </Helmet>
      <Header />
      <main id="main-content" className="container mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <h1 className="font-display mb-3 text-3xl font-extrabold text-foreground md:text-4xl">
          Arthritis symptom and flare tracker (free printable)
        </h1>
        <p className="mb-4 text-lg text-muted-foreground leading-relaxed">
          Write down your symptoms each day for a week or two. Patterns are easier to spot, and you
          will have clear notes to share with your GP, physiotherapist or rheumatology team.
        </p>
        <p className="mb-6 text-sm text-muted-foreground">
          Clinically reviewed by <Link to="/authors/maxwell" className="underline">Louis Maxwell</Link> (HCPC PH128483, Band 8 Advanced Practice Physiotherapist) · Last reviewed 2026-10-26
        </p>
        <div className="mb-8 flex flex-wrap gap-3 print:hidden">
          <a href={PDF} download className="min-h-11 inline-flex items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
            Download the tracker (PDF)
          </a>
          <button type="button" onClick={() => window.print()} className="min-h-11 rounded-full border border-border px-5 text-sm font-semibold">
            Print this page
          </button>
        </div>
        <EducationalDisclaimerBox lastReviewed="2026-10-26" />
        <h2 className="font-display mt-8 mb-3 text-2xl font-bold text-foreground">What to record each day</h2>
        <ul className="list-disc pl-5 space-y-1">
          {COLUMNS.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <h2 className="font-display mt-8 mb-3 text-2xl font-bold text-foreground">When to get urgent help</h2>
        <p>
          Contact NHS 111 urgently, or call 999 in an emergency, if a single joint becomes hot, red and
          swollen and you feel feverish or unwell, if you suddenly cannot bear weight, or if you have
          new weakness, numbness or loss of bladder or bowel control.
        </p>
        <h2 className="font-display mt-8 mb-3 text-2xl font-bold text-foreground">Related help</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link to="/resources/flare-action-plan" className="text-primary underline">Flare-up action plan</Link></li>
          <li><Link to="/arthritis-flare-ups" className="text-primary underline">Arthritis flare-ups guide</Link></li>
          <li><Link to="/blog/arthritis-flare-up-what-to-do" className="text-primary underline">What to do in a flare-up</Link></li>
        </ul>
        <h2 className="font-display mt-8 mb-2 text-base font-bold text-foreground">Sources</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li><a href="https://www.nhs.uk/conditions/arthritis/" rel="noopener noreferrer">NHS: Arthritis</a></li>
          <li><a href="https://www.nice.org.uk/guidance/ng100" rel="noopener noreferrer">NICE NG100: Rheumatoid arthritis in adults</a></li>
          <li><a href="https://www.nice.org.uk/guidance/ng226" rel="noopener noreferrer">NICE NG226: Osteoarthritis in over 16s</a></li>
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          {CHARITY.shortName} · Registered charity {CHARITY.number}. Educational information, not a diagnosis or treatment plan.
        </p>
      </main>
      <Footer />
    </div>
  );
}
