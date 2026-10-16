import { test, expect } from "vitest";
import { patchEnglishAlternates } from "../lib/english-alternates.mjs";
const base = "https://livingwitharthritis.org.uk";
test("English articles get their own catch-all, British and default URLs", () => {
  const html = patchEnglishAlternates('<head><link rel="canonical" href="keep"></head>', "/conditions/osteoarthritis/", base);
  for (const lang of ["en", "en-GB", "x-default"]) expect(html).toContain(`hreflang="${lang}" href="${base}/conditions/osteoarthritis"`);
  expect(html).toContain('rel="canonical" href="keep"');
});
test("replaces inherited English links, preserves real translations, avoids duplicates", () => {
  const input = `<head><link href="${base}/" hreflang="en-GB" rel="alternate"><link rel="alternate" hreflang="fr" href="${base}/fr"></head>`;
  const once = patchEnglishAlternates(input, "/", base);
  const twice = patchEnglishAlternates(once, "/", base);
  expect(twice.match(/hreflang="en"/g)).toHaveLength(1);
  expect(twice.match(/hreflang="en-GB"/g)).toHaveLength(1);
  expect(twice).toContain(`hreflang="fr" href="${base}/fr"`);
});
test("translated routes never receive fabricated English annotations", () => {
  for (const route of ["/es", "/fr/conditions/osteoarthritis", "/de", "/pt"]) expect(patchEnglishAlternates("<head></head>", route, base)).toBe("<head></head>");
});
