import { Link } from "react-router-dom";
import GovernancePolicyPage from "./GovernancePolicyPage";
import { CHARITY } from "@/config/charity";
import register from "@/data/evidence-register.generated.json";

type Source = { url: string; type: "NHS" | "NICE" | "Research"; label: string; topic: string; pages: string[] };
const sources = (register as { sources: Source[] }).sources;

const groups = sources.reduce<Record<string, Source[]>>((acc, s) => {
  (acc[s.topic] ??= []).push(s);
  return acc;
}, {});
const topics = Object.keys(groups).sort((a, b) =>
  a.startsWith("General") ? 1 : b.startsWith("General") ? -1 : a.localeCompare(b),
);
const counts = sources.reduce<Record<string, number>>((a, s) => ((a[s.type] = (a[s.type] ?? 0) + 1), a), {});
const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function PageLinks({ pages }: { pages: string[] }) {
  const items = pages.map((p) =>
    p.startsWith("/") ? (
      <li key={p}><Link to={p}>{p}</Link></li>
    ) : (
      <li key={p}>{p}</li>
    ),
  );
  if (pages.length <= 6) return <ul className="text-sm">{items}</ul>;
  return (
    <details className="text-sm">
      <summary>Cited on {pages.length} pages</summary>
      <ul>{items}</ul>
    </details>
  );
}

const EvidenceRegister = () => (
  <GovernancePolicyPage
    path="/evidence-register"
    title={`Evidence Register: NHS, NICE & Research Sources | ${CHARITY.shortName}`}
    heading="Evidence register"
    subtitle="Every NHS, NICE and research source cited on this site, grouped by topic, with the pages that cite it."
    description="The full list of NHS, NICE and research sources cited across Living With Arthritis guides, grouped by topic, with links to every page that uses each source."
  >
    <section>
      <h2>About this register</h2>
      <p>
        This register is generated automatically from the site&rsquo;s content each time the site is built, so it
        stays in step with our guides. It currently lists {sources.length} sources: {counts.NHS ?? 0} NHS,{" "}
        {counts.NICE ?? 0} NICE and {counts.Research ?? 0} research sources. Other organisations we link to, such as
        GOV.UK and charities, are not included here. Read how sources are chosen and checked in our{" "}
        <Link to="/clinical-governance">clinical governance</Link> and{" "}
        <Link to="/editorial-standards">editorial standards</Link> pages.
      </p>
      <p>
        Guides are educational information, not a diagnosis or personal medical advice. For emergencies call 999;
        for urgent advice use NHS 111.
      </p>
      <nav aria-label="Topics">
        <ul>
          {topics.map((t) => (
            <li key={t}><a href={`#${slugify(t)}`}>{t}</a> ({groups[t].length})</li>
          ))}
        </ul>
      </nav>
    </section>
    {topics.map((t) => (
      <section key={t} id={slugify(t)}>
        <h2>{t}</h2>
        <ul>
          {groups[t].map((s) => (
            <li key={s.url} className="mb-3">
              <strong>{s.type}:</strong>{" "}
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              <PageLinks pages={s.pages} />
            </li>
          ))}
        </ul>
      </section>
    ))}
  </GovernancePolicyPage>
);

export default EvidenceRegister;
