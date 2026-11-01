import { describe, expect, it } from "vitest";
import clusters from "@/data/topicClusterLinks.json";
import publishedSlugs from "@/data/blog-slugs.generated.json";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";
import { resolvedClusters } from "@/components/seo/TopicClusterLinks";

const PUBLISHED = new Set<string>(publishedSlugs as string[]);

describe("topic cluster links", () => {
  it("every listed slug is published or redirects to a published post", () => {
    const broken = clusters.flatMap((c) =>
      c.slugs.filter((s) => !PUBLISHED.has(s) && !PUBLISHED.has(BLOG_SLUG_REDIRECTS[s] ?? "")),
    );
    expect(broken).toEqual([]);
  });

  it("rendered links only point at published posts", () => {
    for (const c of resolvedClusters) for (const s of c.slugs) expect(PUBLISHED.has(s)).toBe(true);
  });
});
