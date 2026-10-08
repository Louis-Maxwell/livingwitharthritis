import test from "node:test";
import assert from "node:assert/strict";
import { patchEnglishAlternates } from "../lib/english-alternates.mjs";
const base = "https://livingwitharthritis.org.uk";
test("English articles get their own catch-all, British and default URLs", () => {
  const html = patchEnglishAlternates('<head><link rel="canonical" href="keep"></head>', "/conditions/osteoarthritis/", base);
  for (const lang of ["en", "en-GB", "x-default"]) assert.ok(html.includes(`hreflang="${lang}" href="${base}/conditions/osteoarthritis"`));
  assert.ok(html.includes('rel="canonical" href="keep"'));
});
test("replaces inherited English links, preserves real translations, avoids duplicates", () => {
  const input = `<head><link href="${base}/" hreflang="en-GB" rel="alternate"><link rel="alternate" hreflang="fr" href="${base}/fr"></head>`;
  const once = patchEnglishAlternates(input, "/", base);
  const twice = patchEnglishAlternates(once, "/", base);
  assert.equal((twice.match(/hreflang="en"/g) || []).length, 1);
  assert.equal((twice.match(/hreflang="en-GB"/g) || []).length, 1);
  assert.ok(twice.includes(`hreflang="fr" href="${base}/fr"`));
});
test("translated routes never receive fabricated English annotations", () => {
  for (const route of ["/es", "/fr/conditions/osteoarthritis", "/de", "/pt"]) assert.equal(patchEnglishAlternates("<head></head>", route, base), "<head></head>");
});
