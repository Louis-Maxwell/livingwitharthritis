import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Compass, Route, Wrench } from "lucide-react";
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

function pathLabel(path: string): string {
  const leaf = path.split("/").filter(Boolean).pop() ?? path;
  return leaf
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Next supporting path after the current article (or first sibling if not in list). */
function nextClusterSibling(cluster: TopicCluster, slug: string): { to: string; label: string } | null {
  const currentPath = `/blog/${slug}`;
  const siblings = cluster.supportingPaths.filter((p) => p !== cluster.pillarPath && p !== cluster.toolPath);
  if (siblings.length === 0) return null;
  const idx = siblings.findIndex((p) => p === currentPath || p.endsWith(`/${slug}`));
  const next = idx >= 0 ? siblings[(idx + 1) % siblings.length] : siblings[0];
  if (!next || next === currentPath) {
    const alt = siblings.find((p) => p !== currentPath);
    if (!alt) return null;
    return { to: alt, label: pathLabel(alt) };
  }
  return { to: next, label: pathLabel(next) };
}

/**
 * Surfaces related conditions / exercises / diet hubs from the topic cluster map.
 * Wave 2: visual “Your reading journey” band — next sibling + pillar + tool.
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

  const sibling = nextClusterSibling(cluster, slug);
  const journey = [
    sibling
      ? { to: sibling.to, label: sibling.label, kind: "Next in this topic", icon: Route }
      : null,
    {
      to: cluster.pillarPath,
      label: cluster.pillarTitle,
      kind: "Pillar guide",
      icon: BookOpen,
    },
    {
      to: cluster.toolPath,
      label: cluster.toolLabel,
      kind: "Practical tool",
      icon: Wrench,
    },
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  const journeyPaths = new Set(journey.map((j) => j.to));
  const extra = cluster.supportingPaths
    .filter((to) => !journeyPaths.has(to) && to !== `/blog/${slug}`)
    .slice(0, 3)
    .map((to) => ({
      to,
      label: pathLabel(to),
      kind: "Related",
    }));

  return (
    <aside
      aria-label={`Your reading journey — ${cluster.label}`}
      className={`mt-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-muted/40 p-5 md:p-8 shadow-sm dark:border-primary/30 dark:from-primary/10 ${className}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary mb-1.5 inline-flex items-center gap-1.5">
        <Compass className="w-3.5 h-3.5" aria-hidden="true" /> {cluster.label}
      </p>
      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
        Your reading journey
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mb-5 max-w-2xl leading-relaxed">
        Keep going with the next article in this topic, the pillar guide, and a practical tool —
        educational support only, not a diagnosis.
      </p>

      <ol className="grid gap-3 sm:grid-cols-3 mb-5">
        {journey.map((item, i) => {
          const Icon = item.icon;
          return (
            <li key={`${item.kind}-${item.to}`}>
              <Link
                to={item.to}
                className="group flex h-full min-h-[5.5rem] flex-col justify-between rounded-xl border border-border/50 bg-card/90 px-4 py-3.5 hover:border-primary/40 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-border/60 dark:hover:border-primary/45"
              >
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                  {item.kind}
                </span>
                <span className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {item.label}
                </span>
                <span className="mt-2 text-xs font-medium text-primary inline-flex items-center gap-1">
                  Open <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {extra.length > 0 && (
        <>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            More in this cluster
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {extra.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="group flex min-h-11 items-center justify-between gap-2 rounded-xl border border-border/40 bg-card px-3.5 py-2.5 text-sm hover:border-primary/30 hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-border/55"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.kind}
                    </span>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {item.label}
                    </span>
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 shrink-0 text-muted-foreground group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
};

export default ClusterRelatedLinks;
