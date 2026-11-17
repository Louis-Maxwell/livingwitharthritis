import InstallBanner from '@/components/pwa/InstallBanner';
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
  dateModified: "2026-11-17",
  publisher: { "@type": "NGO", name: "Living With Arthritis", url: "https://livingwitharthritis.org.uk" },
};

export default function SymptomFlareTracker() {
  return (
    <div className="min-h-dvh bg-background">
      <SeoHead
        title="Symptom and flare tracker PDF"
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
        <p className="mb-6 text-sm text-muted-foreground">These are blank personal records to print and keep. Nothing you write is sent to this website. The new companion sheets and updated guidance are awaiting a separate clinical review.</p>
        <div className="mb-8 flex flex-wrap gap-3 print:hidden">
          <a href={PDF} download className="min-h-11 inline-flex items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
            Download the tracker (PDF)
          </a>
          <button type="button" onClick={() => window.print()} className="min-h-11 rounded-full border border-border px-5 text-sm font-semibold">
            Print this page
          </button>
        </div>
        <section aria-labelledby="companion-downloads" className="my-8 space-y-4">
          <h2 id="companion-downloads" className="font-display text-2xl font-bold">Printable companion sheets</h2>
          <p>Choose a one-page A4 sheet. Fill it in by hand and share only what you want with your healthcare team. The QR code and short link reopen this toolkit, not your completed notes.</p>
          <ul className="space-y-3">
            <li><a href="/resources/gp-appointment-symptom-medication-tracker.pdf" download className="inline-flex min-h-11 items-center text-primary underline">GP appointment symptom and medication tracker (PDF)</a></li>
            <li><a href="/resources/flare-up-daily-log.pdf" download className="inline-flex min-h-11 items-center text-primary underline">Flare-up daily log (PDF)</a></li>
          </ul>
          <p className="text-sm">Keep completed sheets somewhere private. Optional identifying details are for your own use. You do not need to sign in or upload anything.</p>
        </section>
        <InstallBanner immediate />
        <EducationalDisclaimerBox reviewStatus="pending" pendingText="Updated resource guidance and new printables: separate clinical review pending." />
        <h2 className="font-display mt-8 mb-3 text-2xl font-bold text-foreground">What to record each day</h2>
        <ul className="list-disc pl-5 space-y-1">
          {COLUMNS.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <h2 className="font-display mt-8 mb-3 text-2xl font-bold text-foreground">When to get urgent help</h2>
        <p className="mb-3"><strong>Ask for an urgent GP appointment or contact NHS 111:</strong> if a joint is swollen and feels hot, or joint pain comes with feeling unwell, a high temperature, or feeling hot, cold or shivery.</p>
        <p className="mb-3"><strong>Go to A&amp;E or call 999:</strong> if you cannot walk or put weight on a joint, or have very bad joint pain after a fall or injury. Severe or worsening weakness or numbness in both legs, numbness around your genitals or bottom, or new bladder or bowel control problems also need emergency assessment.</p>
        <p>If you are unsure, contact NHS 111. Do not wait to complete a tracker before seeking help.</p>
        <h2 className="font-display mt-8 mb-3 text-2xl font-bold text-foreground">Related help</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link to="/resources/flare-action-plan" className="text-primary underline">Flare-up action plan</Link></li>
          <li><Link to="/arthritis-flare-ups" className="text-primary underline">Arthritis flare-ups guide</Link></li>
          <li><Link to="/blog/arthritis-flare-up-what-to-do" className="text-primary underline">What to do in a flare-up</Link></li>
        </ul>
        <h2 className="font-display mt-8 mb-2 text-base font-bold text-foreground">Sources</h2>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li><a href="https://www.nhs.uk/symptoms/joint-pain/" rel="noopener noreferrer">NHS: joint pain and urgent help</a></li>
          <li><a href="https://www.nhs.uk/conditions/septic-arthritis/" rel="noopener noreferrer">NHS: septic arthritis</a></li>
          <li><a href="https://www.nhs.uk/conditions/sciatica/" rel="noopener noreferrer">NHS: sciatica emergency symptoms</a></li>
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
