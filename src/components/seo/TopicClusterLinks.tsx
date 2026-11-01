import { Link } from "react-router-dom";
import clusters from "@/data/topicClusterLinks.json";
import publishedSlugs from "@/data/blog-slugs.generated.json";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";

const pretty = (slug: string) =>
  slug.replace(/-uk$/, "").replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

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

/** Hub-level internal links into each arthritis topic cluster. */
export default function TopicClusterLinks() {
  return (
    <section aria-labelledby="topic-clusters-heading" className="my-10">
      <h2 id="topic-clusters-heading" className="font-display text-2xl font-bold text-foreground mb-4">
        Browse guides by topic
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resolvedClusters.map((c) => (
          <div key={c.label}>
            <h3 className="font-semibold text-foreground mb-2">{c.label}</h3>
            <ul className="space-y-1 list-disc pl-5">
              {c.slugs.map((s) => (
                <li key={s}>
                  <Link to={`/blog/${s}`} className="text-primary underline underline-offset-2">{pretty(s)}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4">
        <Link to="/resources/symptom-flare-tracker" className="text-primary underline underline-offset-2 font-semibold">
          Free printable symptom and flare tracker
        </Link>
      </p>
    </section>
  );
}
