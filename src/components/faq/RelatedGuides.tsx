import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RelatedGuideItem {
  title: string;
  href: string;
  description?: string;
}

interface RelatedGuidesProps {
  title?: string;
  /** Unique id for the heading — set this if more than one instance appears on a page. */
  headingId?: string;
  items: RelatedGuideItem[];
  className?: string;
}

/**
 * Lightweight cross-link block, e.g. one supplement guide pointing at others.
 * Plain internal <Link>s only — no client-side fetch, no layout-shifting
 * async content, so it costs nothing extra on load.
 */
export default function RelatedGuides({
  title = "Related guides",
  headingId = "related-guides-heading",
  items,
  className,
}: RelatedGuidesProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className={cn("mt-12", className)}>
      <div className="flex items-center gap-2 mb-5">
        <BookOpen className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 id={headingId} className="font-display text-xl md:text-2xl font-bold text-foreground m-0">
          {title}
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="group flex items-start justify-between gap-3 rounded-xl border border-border/40 bg-card p-5 hover:border-primary/50 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div>
              <p className="font-semibold text-foreground group-hover:text-primary">{item.title}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              )}
            </div>
            <ArrowRight
              className="w-4 h-4 text-primary shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
