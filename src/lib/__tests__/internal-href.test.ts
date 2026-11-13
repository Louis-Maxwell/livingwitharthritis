import { describe, expect, it } from "vitest";
// @ts-expect-error plain .mjs build helper
import { resolveInternalHref, rewriteRedirectedHrefs } from "../../../scripts/lib/internal-href.mjs";

describe("internal hrefs skip redirect stubs", () => {
  it("resolves the four crawled redirect sources", () => {
    expect(resolveInternalHref("/blog/category/health")).toBe("/blog/category/conditions");
    expect(resolveInternalHref("/blog/category/treatment")).toBe("/blog/category/treatments");
    expect(resolveInternalHref("/blog/knee-arthritis-exercises-uk")).toBe("/guides/knee-exercises-for-osteoarthritis");
    expect(resolveInternalHref("/authors/louis-maxwell#bio")).toBe("/authors/maxwell#bio");
  });
  it("rewrites anchors in HTML", () => {
    expect(rewriteRedirectedHrefs('<a class="x" href="/blog/category/health">C</a>'))
      .toBe('<a class="x" href="/blog/category/conditions">C</a>');
  });
});
