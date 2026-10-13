import { Link } from "react-router-dom";
import { subpageSlugs, subpageLabel, conditionSubpages } from "@/data/conditionSubpages";

interface Props {
  conditionSlug: string;
  conditionName: string;
}

/**
 * Renders internal links to the 4 sub-pages (symptoms / treatment / exercises / diet)
 * of a given arthritis condition. Used on each top-level condition page to
 * surface the programmatic sub-pages and remove orphan-page warnings.
 */
export default function ConditionSubpageLinks({ conditionSlug, conditionName }: Props) {
  if (!conditionSubpages[conditionSlug]) return null;

  return (
    <section className="my-12 p-6 md:p-8 rounded-2xl bg-card border border-border" aria-label={`${conditionName} guide sections`}>
      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
        Explore the full {conditionName} guide
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Deep-dive into each part of managing {conditionName.toLowerCase()}.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {subpageSlugs.map((s) => (
          <Link
            key={s}
            to={`/conditions/${conditionSlug}/${s}`}
            className="block p-4 rounded-xl border border-border hover:border-primary hover:bg-accent transition-colors"
          >
            <span className="block font-semibold text-foreground">{subpageLabel[s]}</span>
            <span className="block text-xs text-muted-foreground mt-1">
              {conditionName} {subpageLabel[s].toLowerCase()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
