import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import clusters from "@/data/topicClusterLinks.json";
import publishedSlugs from "@/data/blog-slugs.generated.json";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";
import { resolvedClusters } from "@/lib/topicClusterLinks";

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

  it("every non-blog link in the topic list is a real route", () => {
    const app = readFileSync("src/App.tsx", "utf8");
    const component = readFileSync("src/components/seo/TopicClusterLinks.tsx", "utf8");
    expect(app).toContain('path="/blog/:slug"');
    const targets = [...component.matchAll(/to="(\/[^"]+)"/g)].map((m) => m[1]);
    expect(targets.length).toBeGreaterThan(0);
    for (const t of targets) expect(app, t).toContain(`path="${t}"`);
  });
});
