import { describe, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildRedirectHtml } from "../../../scripts/seo-redirect-map.mjs";
import { writeRedirectHtml } from "../../../scripts/write-redirect-html.mjs";

const destination = "/blog/lwa-archive-daily-living-tips-for-arthritis";
const origin = "/blog/lwa-archive-living-well-with-arthritis";
const headData = JSON.parse(readFileSync("scripts/blog-head-data.json", "utf8"));

describe("redirect fallback social cards", () => {
  it("uses the published destination metadata without removing the redirect", () => {
    const dir = mkdtempSync(join(tmpdir(), "lwa-social-redirect-"));
    try {
      writeFileSync(join(dir, "index.html"), "<html></html>");
      writeRedirectHtml(dir);
      const html = readFileSync(join(dir, origin, "index.html"), "utf8");
      const doc = new DOMParser().parseFromString(html, "text/html");
      const head = headData[destination];
      expect(doc.title).toBe(head.title);
      for (const [property, value] of Object.entries({ "og:title": head.title, "og:description": head.description, "og:image": head.ogImage, "og:url": `https://livingwitharthritis.org.uk${destination}` })) {
        expect(doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content")).toBe(value);
      }
      expect(doc.querySelector('meta[name="twitter:title"]')?.getAttribute("content")).toBe(head.title);
      expect(doc.querySelector('meta[http-equiv="refresh"]')?.getAttribute("content")).toBe(`0;url=${destination}`);
      expect(doc.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`https://livingwitharthritis.org.uk${destination}`);
      expect(html).toContain("location.replace");
      expect(html).toContain("This URL has permanently moved");
      expect(html).not.toContain('id="static-article"');
      expect(html).not.toContain("noindex");
    } finally { rmSync(dir, { recursive: true, force: true }); }
  });
  it("escapes metadata and leaves destinations without checked metadata unchanged", () => {
    const doc = new DOMParser().parseFromString(buildRedirectHtml(origin, destination, { title: 'Daily "tips" & care', description: "Hands < comfort", ogImage: "https://livingwitharthritis.org.uk/image.webp?a=1&b=2" }), "text/html");
    expect(doc.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe('Daily "tips" & care');
    expect(doc.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe("Hands < comfort");
    expect(buildRedirectHtml("/old", "/current")).toContain("<title>Moved permanently to");
  });
});
