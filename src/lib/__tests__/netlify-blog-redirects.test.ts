import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BLOG_SLUG_REDIRECTS } from "@/data/blogRedirects";

describe("netlify.toml blog 301s", () => {
  const toml = readFileSync(resolve("netlify.toml"), "utf8");

  it("declares an HTTP 301 for every in-app blog slug redirect", () => {
    for (const [fromSlug, toSlug] of Object.entries(BLOG_SLUG_REDIRECTS)) {
      expect(toml).toContain(`from = "/blog/${fromSlug}"`);
      expect(toml).toContain(`to = "/blog/${toSlug}"`);
    }
  });

  it("keeps the SPA fallback after the 301s", () => {
    const spa = toml.lastIndexOf('from = "/*"');
    const sample301 = toml.indexOf('from = "/blog/knee-osteoarthritis-exercises"');
    expect(spa).toBeGreaterThan(sample301);
    expect(toml).toMatch(/from = "\/\*"\s*\n\s*to = "\/index\.html"\s*\n\s*status = 200/);
  });
});
