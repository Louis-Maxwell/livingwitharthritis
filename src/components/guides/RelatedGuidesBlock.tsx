import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getRelatedGuides, clusterLabel } from "@/lib/guideRegistry";

interface RelatedGuidesBlockProps {
  currentPath: string;
  heading?: string;
  limit?: number;
}

/**
 * Peer-pillar onward navigation rendered at the foot of every
 * /guides page. Pairs with NextReadStrip for a two-CTA exit.
 */
export default function RelatedGuidesBlock({
  currentPath,
  heading = "Related guides",
  limit = 3,
}: RelatedGuidesBlockProps) {
  const related = getRelatedGuides(currentPath, limit);
  if (related.length === 0) return null;

  return (
    <nav
      aria-label={heading}
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          {heading}
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {related.map((guide) => (
            <li key={guide.path}>
              <Link
                to={guide.path}
                className="group block h-full rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {clusterLabel(guide.cluster)}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {guide.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {guide.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
