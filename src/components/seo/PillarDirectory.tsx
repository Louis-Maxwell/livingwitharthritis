import { Link } from "react-router-dom";
import pillars from "@/data/seoPillars.json";
import { trackEvent } from "@/lib/analytics";
export default function PillarDirectory() {
  return <nav aria-label="Explore arthritis topics" className="my-8 rounded-xl border border-border p-5">
    <h2 className="text-xl font-bold mb-4">Explore arthritis topics</h2>
    <ul className="grid gap-2 sm:grid-cols-2">{pillars.map(p => <li key={p.path}>
      <Link className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-primary rounded" to={p.path}
        onClick={() => trackEvent("related_content_click", { placement: "pillar_directory", destination_path: p.path })}>{p.title}</Link>
    </li>)}</ul>
  </nav>;
}
