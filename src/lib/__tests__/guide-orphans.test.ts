import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { getBlogCatalog } from "@/lib/blog/catalog";
import { topicNeighbours, relatedGuidesForPath, latestGuides, mostHelpfulGuides } from "@/lib/blog/guideLinks";
import { exactRedirects } from "../../../scripts/seo-redirect-map.mjs";

describe("guide discoverability", () => {
  const guides = getBlogCatalog();

  it("every published guide has at least 3 internal inbound links", () => {
    const inbound = new Map<string, Set<string>>();
    const add = (to: string, from: string) => {
      if (to === from) return;
      if (!inbound.has(to)) inbound.set(to, new Set());
      inbound.get(to)!.add(from);
    };
    for (const g of guides) {
      add(g.slug, "/blog/archive"); // A–Z archive lists every guide
      const { topic, prev, next } = topicNeighbours(g.slug);
      add(g.slug, `/blog/category/${topic}`); // topic page lists every guide in it
      if (prev) add(prev.slug, `/blog/${g.slug}`);
      if (next) add(next.slug, `/blog/${g.slug}`);
    }
    const orphans = guides.filter((g) => (inbound.get(g.slug)?.size ?? 0) < 3).map((g) => g.slug);
    expect(orphans).toEqual([]);
  });

  it("every published guide has a canonical sitemap destination and a source RSS entry", () => {
    const root = path.resolve(__dirname, "../../..");
    const sitemap = fs.readFileSync(path.join(root, "public/sitemap.xml"), "utf8");
    const rss = fs.readFileSync(path.join(root, "public/rss.xml"), "utf8");
    const destinations = new Map(exactRedirects().map(({ from, to }) => [from, to]));
    const missing = guides.filter((g) => {
      const source = `/blog/${g.slug}`;
      const canonical = destinations.get(source) ?? source;
      return !sitemap.includes(`${canonical}<`) || !rss.includes(`${source}<`);
    });
    expect(missing.map((g) => g.slug)).toEqual([]);
  });

  it("homepage and related blocks return real guides", () => {
    expect(latestGuides(4)).toHaveLength(4);
    expect(mostHelpfulGuides(4)).toHaveLength(4);
    expect(relatedGuidesForPath("/benefits-pip", 4)).toHaveLength(4);
    expect(relatedGuidesForPath("/contact", 4)).toHaveLength(4);
  });
});
