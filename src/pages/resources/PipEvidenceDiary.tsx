import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import TopicClusterNav from "@/components/seo/TopicClusterNav";
import { CONTACT_EMAILS, CONTACT_PHONE } from "@/config/contact";
import { CHARITY } from "@/config/charity";

const PATH = "/resources/pip-evidence-diary";
const PRINT_UTM =
  "?utm_source=print-pip-diary&utm_medium=print&utm_campaign=month1-linkable&utm_content=pip-evidence-diary";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PROMPTS = [
  "Getting dressed / undressed",
  "Preparing food / eating",
  "Washing / bathing",
  "Moving around indoors",
  "Leaving the house",
  "Pain / stiffness (0–10)",
  "Help needed from someone else",
];

export default function PipEvidenceDiary() {
  return (
    <div className="min-h-screen bg-background">
      <SeoHead
        title="PIP evidence diary checklist (printable)"
        description="Printable UK PIP evidence diary for arthritis: daily activity prompts to support a Personal Independence Payment claim. Educational, not legal advice."
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
          PIP evidence diary checklist
        </h1>
        <p className="speakable-intro mb-6 text-lg text-muted-foreground leading-relaxed">
          A one-week printable diary to record how arthritis affects daily living and mobility —
          to support a PIP discussion with an adviser. Not legal advice and not a DWP form.
        </p>

        <EducationalDisclaimerBox />
        <TopicClusterNav path="/guides/benefits-pip" />

        <section className="mb-8 rounded-xl border border-border/50 bg-muted/20 p-5 text-sm leading-relaxed text-foreground/85">
          <h2 className="font-display mb-2 text-lg font-bold">How to use this</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Fill one column per day for a typical week, including bad days.</li>
            <li>Note aids, time taken, pain, and whether you need help or rest.</li>
            <li>Keep copies of clinic letters and prescription lists with this diary.</li>
            <li>Citizens Advice or a welfare-rights adviser can help interpret PIP descriptors.</li>
          </ul>
        </section>

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

        <p className="mb-4 text-sm text-foreground/80">
          Full guide:{" "}
          <Link to={`/guides/benefits-pip${PRINT_UTM}`} className="text-primary underline underline-offset-2">
            Benefits &amp; PIP guide
          </Link>
          {" · "}
          Hub:{" "}
          <Link to={`/benefits-pip${PRINT_UTM}`} className="text-primary underline underline-offset-2">
            Benefits &amp; PIP hub
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
