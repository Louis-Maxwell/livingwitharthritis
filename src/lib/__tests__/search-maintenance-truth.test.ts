import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

describe("search maintenance without synthetic eligibility", () => {
  it("keeps only published article slugs in the article-specific sitemap", () => {
    execFileSync(process.execPath, ["scripts/generate-article-sitemap.mjs"]);
    const xml = readFileSync("public/sitemap-articles.xml", "utf8");
    const catalog = JSON.parse(readFileSync("src/content/blog/catalog.generated.json", "utf8")) as {slug:string}[];
    const slugs = new Set(catalog.map(post => post.slug));
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
    expect(urls.length).toBeGreaterThan(500);
    expect(urls.every(url => slugs.has(new URL(url).pathname.replace("/blog/", "")))).toBe(true);
    expect(urls).not.toContain("https://livingwitharthritis.org.uk/blog/archive");
    expect(readFileSync("public/sitemap.xml", "utf8")).toContain("https://livingwitharthritis.org.uk/blog/archive</loc>");
  });
  it("does not present a seated clip as a standing rooted demonstration", () => {
    const guide = readFileSync("src/pages/exercises/TaiChiForBalance.tsx", "utf8");
    expect(guide).toContain('m.anim === "rooted-stance"');
    expect(guide).toContain("No matching standing demonstration is available");
    expect(guide).toContain("Where a matching illustrative clip is available");
    expect(guide).not.toContain("/videos/seated-tai-chi-illustration");
  });
});
