import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import {
  getClusterForSlug,
  type TopicCluster,
} from "@/data/topicClusters";

interface ClusterRelatedLinksProps {
  slug: string;
  title?: string;
  excerpt?: string;
  category?: string;
  keywords?: string | null;
  className?: string;
}

/**
 * Surfaces related conditions / exercises / diet hubs from the topic cluster map.
 * Only links that already exist on the site — no invented doorways.
 */
const ClusterRelatedLinks = ({
  slug,
  title,
  excerpt,
  category,
  keywords,
  className = "",
}: ClusterRelatedLinksProps) => {
  const hay = [title, excerpt, category, keywords].filter(Boolean).join(" ");
  const cluster: TopicCluster | null = getClusterForSlug(slug, hay);
  if (!cluster) return null;

  const links = [
    { to: cluster.pillarPath, label: cluster.pillarTitle, kind: "Pillar" },
    ...cluster.supportingPaths.slice(0, 4).map((to) => ({
      to,
      label: pathLabel(to),
      kind: "Related",
    })),
    { to: cluster.toolPath, label: cluster.toolLabel, kind: "Tool" },
  ].filter(
    (item, i, arr) => arr.findIndex((x) => x.to === item.to) === i,
  );

  return (
    <aside
      aria-label={`Related ${cluster.label} resources`}
      className={`mt-10 rounded-2xl border border-border/40 bg-muted/30 p-5 md:p-6 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1.5 inline-flex items-center gap-1.5">
        <Compass className="w-3 h-3" aria-hidden="true" /> {cluster.label} journey
      </p>
      <h2 className="font-display text-lg font-bold text-foreground mb-3">
        Related conditions, exercises and diet hubs
      </h2>
      <ul className="grid sm:grid-cols-2 gap-2">
        {links.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="group flex min-h-11 items-center justify-between gap-2 rounded-xl border border-border/40 bg-card px-3.5 py-2.5 text-sm hover:border-primary/30 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {item.kind}
                </span>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {item.label}
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

function pathLabel(path: string): string {
  const leaf = path.split("/").filter(Boolean).pop() ?? path;
  return leaf
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default ClusterRelatedLinks;
