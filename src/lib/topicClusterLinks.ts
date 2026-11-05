import clusters from "@/data/topicClusterLinks.json";
import publishedSlugs from "@/data/blog-slugs.generated.json";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";

const PUBLISHED = new Set<string>(publishedSlugs as string[]);

/**
 * Resolve a cluster slug to a live blog slug: published posts link directly,
 * redirected legacy slugs link to their published target, anything else is dropped
 * so the hub never links to a "Page Not Found" screen.
 */
export const resolveClusterSlug = (slug: string): string | null => {
  if (PUBLISHED.has(slug)) return slug;
  const target = BLOG_SLUG_REDIRECTS[slug];
  return target && PUBLISHED.has(target) ? target : null;
};

export const resolvedClusters = clusters
  .map((c) => ({
    label: c.label,
    slugs: Array.from(
      new Set(c.slugs.map(resolveClusterSlug).filter((s): s is string => s !== null)),
    ),
  }))
  .filter((c) => c.slugs.length > 0);
