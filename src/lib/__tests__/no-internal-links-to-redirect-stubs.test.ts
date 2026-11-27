import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { EXACT_SEO_REDIRECTS, BLOG_SLUG_REDIRECTS } from "../../../scripts/seo-redirect-map.mjs";

/**
 * Legacy URLs are served as noindex + canonical stubs (not meta-refresh stubs; Lovable ignores _redirects),
 * so every internal link to one costs crawlers an extra hop and shows up as a
 * soft-404 / "page could not be crawled". Link straight to the destination instead.
 */
const ROOT = process.cwd();
const sources = new Set<string>([
  ...Object.keys(EXACT_SEO_REDIRECTS as Record<string, string>),
  ...Object.keys(BLOG_SLUG_REDIRECTS as Record<string, string>).map((s) => `/blog/${s}`),
]);

function offenders(text: string): string[] {
  const out: string[] = [];
  const re = /(?:href=\\?["']|\]\()(\/[^"'\\)#?\s]*)/g;
  for (const m of text.matchAll(re)) {
    const p = m[1].replace(/\/$/, "") || "/";
    if (sources.has(p)) out.push(p);
  }
  return out;
}

describe("internal links skip legacy redirect stubs", () => {
  it("loads the redirect map", () => {
    expect(sources.size).toBeGreaterThan(20);
  });

  it("index.html no-JS fallback links go to final URLs", () => {
    expect(offenders(readFileSync(join(ROOT, "index.html"), "utf8"))).toEqual([]);
  });

  it("blog guide bodies link to final URLs", () => {
    const dir = join(ROOT, "src/content/blog/posts");
    const bad: string[] = [];
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".json")) continue;
      for (const p of offenders(readFileSync(join(dir, f), "utf8"))) bad.push(`${f}: ${p}`);
    }
    expect(bad).toEqual([]);
  });

  it("related-reading and reader-journey lists link to final URLs", () => {
    const bad: string[] = [];
    for (const f of [
      "src/data/keywordRelatedLinks.generated.json",
      "src/data/readerJourneyLinks.json",
    ]) {
      const data = JSON.parse(readFileSync(join(ROOT, f), "utf8")) as Record<
        string,
        { href: string }[]
      >;
      for (const [path, rows] of Object.entries(data)) {
        for (const row of rows) {
          const p = (row.href || "").replace(/\/$/, "") || "/";
          if (sources.has(p)) bad.push(`${f} ${path}: ${row.href}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
