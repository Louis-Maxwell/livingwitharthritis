import { Link } from "react-router-dom";
import { getClusterForPath, type TopicCluster } from "@/data/topicClusters";
import { isResolvableClusterHref } from "@/lib/clusterHref";

interface TopicClusterNavProps {
  /** Current page path, e.g. /conditions/osteoarthritis */
  path: string;
  /** Optional explicit cluster override when path is not indexed. */
  cluster?: TopicCluster | null;
  className?: string;
  /** Max sibling links to show (pillar + tool always shown when they resolve). */
  maxSiblings?: number;
}

/**
 * Pillar + sibling + tool links from topicClusters.ts.
 * Safe to drop on champion pages; renders nothing if no cluster maps.
 * Hrefs are filtered against real blog/FAQ catalogs so missing pages never ship.
 */
export default function TopicClusterNav({
  path,
  cluster: clusterProp,
  className = "",
  maxSiblings = 4,
}: TopicClusterNavProps) {
  const cluster = clusterProp ?? getClusterForPath(path);
  if (!cluster) return null;

  const siblings = cluster.supportingPaths
    .filter((p) => p !== path && p !== cluster.pillarPath && isResolvableClusterHref(p))
    .slice(0, maxSiblings);

  const pillarOk =
    path !== cluster.pillarPath && isResolvableClusterHref(cluster.pillarPath);
  const toolOk =
    cluster.toolPath !== path && isResolvableClusterHref(cluster.toolPath);

  if (!pillarOk && siblings.length === 0 && !toolOk) return null;

  const labelFor = (p: string) =>
    p
      .replace(/^\/(guides|conditions|diet|exercises|pillar|blog|faq)\//, "")
      .replace(/^\//, "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <nav
      aria-label={`${cluster.label} topic links`}
      className={`my-8 rounded-xl border border-border/50 bg-muted/30 p-5 print:hidden ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
        In this topic · {cluster.label}
      </p>
      <ul className="flex flex-wrap gap-2 text-sm">
        {pillarOk && (
          <li>
            <Link
              to={cluster.pillarPath}
              className="inline-flex rounded-full border border-primary/30 bg-background px-3 py-1.5 font-medium text-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Pillar: {cluster.pillarTitle}
            </Link>
          </li>
        )}
        {siblings.map((p) => (
          <li key={p}>
            <Link
              to={p}
              className="inline-flex rounded-full border border-border bg-background px-3 py-1.5 text-foreground/85 hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {labelFor(p)}
            </Link>
          </li>
        ))}
        {toolOk && (
          <li>
            <Link
              to={cluster.toolPath}
              className="inline-flex rounded-full border border-border bg-primary/10 px-3 py-1.5 font-medium text-primary hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Tool: {cluster.toolLabel}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
