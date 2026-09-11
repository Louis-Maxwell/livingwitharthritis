import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import { CONTACT_EMAILS, CONTACT_PHONE } from "@/config/contact";
import { CHARITY } from "@/config/charity";

const PATH = "/resources/flare-action-plan";
const PRINT_UTM =
  "?utm_source=print-flare-plan&utm_medium=print&utm_campaign=month1-linkable&utm_content=flare-action-plan";

const STEPS = [
  {
    title: "Pause and pace",
    body: "Stop boom-and-bust activity. Rest the hottest joint briefly, then use gentle range-of-motion every hour you are awake.",
  },
  {
    title: "Heat or cold",
    body: "Cold pack 10–15 minutes for hot, swollen joints. Warmth for stiff, aching joints. Protect skin with a cloth.",
  },
  {
    title: "Medicines you already have",
    body: "Use only treatments your GP or pharmacist has advised. Topical NSAID gels are often first-line for knee/hand OA — check the label.",
  },
  {
    title: "Track the flare",
    body: "Note start time, joints affected, sleep, stress, and what helped. Bring the note to your next appointment.",
  },
  {
    title: "When to seek urgent help",
    body: "Sudden single hot joint with fever, inability to weight-bear, chest pain, or new neurological symptoms — call 111 or 999 as appropriate.",
  },
];

export default function FlareActionPlan() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="Arthritis flare action plan (printable)"
        description="Printable UK arthritis flare action plan: pace, heat/cold, medicines you already have, tracking, and when to seek help. Educational only."
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
          Arthritis flare action plan
        </h1>
        <p className="speakable-intro mb-6 text-lg text-muted-foreground leading-relaxed">
          A short, printable checklist for the first hours of an arthritis flare in the UK —
          educational pacing steps, not a diagnosis or personal treatment plan.
        </p>

        <EducationalDisclaimerBox />
        <TopicClusterNav path="/arthritis-flare-ups" />

        <ol className="mb-10 space-y-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="rounded-xl border border-border/50 bg-card p-5 print:break-inside-avoid"
            >
              <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">
                Step {i + 1}
              </p>
              <h2 className="font-display text-xl font-bold text-foreground">{s.title}</h2>
              <p className="mt-2 text-foreground/85 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <section className="mb-10 rounded-xl border border-dashed border-border p-5 print:break-inside-avoid">
          <h2 className="font-display mb-3 text-lg font-bold">My flare notes</h2>
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>Date / time started: ________________________________</p>
            <p>Joints affected: ____________________________________</p>
            <p>What I tried: _______________________________________</p>
            <p>Sleep / stress notes: ________________________________</p>
          </div>
        </section>

        <p className="mb-4 text-sm text-foreground/80">
          Full guide:{" "}
          <Link to={`/arthritis-flare-ups${PRINT_UTM}`} className="text-primary underline underline-offset-2">
            Arthritis flare-ups
          </Link>
          {" · "}
          Pain:{" "}
          <Link
            to={`/guides/arthritis-pain-relief${PRINT_UTM}`}
            className="text-primary underline underline-offset-2"
          >
            Pain relief guide
          </Link>
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
