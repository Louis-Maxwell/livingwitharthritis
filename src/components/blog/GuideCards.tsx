import { Link } from "react-router-dom";
import type { BlogListItem } from "@/lib/blog/catalog";

export default function GuideCards({ guides }: { guides: BlogListItem[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
      {guides.map((g) => (
        <li key={g.slug} className="rounded-xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors">
          <Link to={`/blog/${g.slug}`} className="block no-underline">
            <span className="block text-xs uppercase tracking-wide text-muted-foreground mb-1">{g.category}</span>
            <span className="block font-semibold text-foreground leading-snug">{g.title}</span>
            {g.reading_minutes ? (
              <span className="block mt-2 text-sm text-muted-foreground">{g.reading_minutes} min read</span>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
