import { test } from "node:test";
import assert from "node:assert/strict";
import { asIsoDate, buildUrlset, buildSitemapIndex, uniqueEntries, sitemapSection, escapeXml } from "./sitemap-quality.mjs";

test("lastmod rejects impossible, future and non-literal dates", () => {
  assert.equal(asIsoDate("2024-02-29", "2026-10-06"), "2024-02-29");
  for (const d of ["2026-02-29", "2026-13-01", "2026-10-07", "today", undefined])
    assert.equal(asIsoDate(d, "2026-10-06"), undefined);
});
test("duplicates preserve the latest valid date regardless of input order", () => {
  const input = [{ path: "/b" }, { path: "/a", lastmod: "2025-01-01" }, { path: "/a", lastmod: "2025-02-01" }];
  assert.deepEqual(uniqueEntries(input), uniqueEntries([...input].reverse()));
  assert.equal(uniqueEntries(input)[0].lastmod, "2025-02-01");
});
test("query, traversal, wildcard and host paths cannot leak into XML", () => {
  for (const path of ["/a?q=x", "/a#x", "//other.test", "/a/../b", "/blog/:slug", "/a/*"])
    assert.throws(() => uniqueEntries([{ path }]), /invalid canonical path/);
  assert.equal(escapeXml('a&<>"\''), "a&amp;&lt;&gt;&quot;&apos;");
});
test("segmented maps partition URLs without double listing categories as articles", () => {
  const paths = ["/", "/blog/category/exercise", "/blog/post", "/conditions/knee-arthritis", "/resources/plan"];
  assert.deepEqual(paths.map(sitemapSection), ["core", "core", "articles", "conditions", "resources"]);
  const xml = buildUrlset(paths.map((path) => ({ path })), "https://livingwitharthritis.org.uk");
  assert.equal((xml.match(/<loc>/g) || []).length, paths.length);
  assert.ok(!buildSitemapIndex(["core"], "https://livingwitharthritis.org.uk").includes("lastmod"));
});
