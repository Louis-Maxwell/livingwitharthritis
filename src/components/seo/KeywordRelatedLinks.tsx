import { Link } from "react-router-dom";
import links from "@/data/keywordRelatedLinks.generated.json";
const byPath = links as Record<string, { href: string; title: string }[]>;
export default function KeywordRelatedLinks({ path }: { path: string }) {
  const rows = byPath[path] || [];
  if (!rows.length) return null;
  return <nav aria-label="Related reading" className="my-8 rounded-xl border border-border/50 p-5">
    <h2 className="mb-3 text-lg font-medium">Related reading</h2>
    <ul className="space-y-2">{rows.map(row => <li key={row.href}>
      <Link to={row.href} className="text-primary underline underline-offset-2">{row.title}</Link>
    </li>)}</ul>
  </nav>;
}
