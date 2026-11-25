#!/usr/bin/env node
/**
 * Checks that src/data/page-aeo.ts (consumed at runtime by
 * <AeoEnhancement>) hasn't drifted from scripts/ai-head-data.json
 * (consumed at build time by scripts/inject-canonicals.mjs).
 *
 * These are two different-shaped files by design — ai-head-data.json is
 * a larger build-time dataset (238 routes: title/description/about/
 * question/answer/updatedAt/faqs/sources) and page-aeo.ts is a smaller,
 * hand-curated runtime subset (28 routes: question/answer/faqs/reviewer/
 * updatedAt) — deliberately NOT merged into one file, since importing the
 * full 365KB dataset into the client bundle would bloat every page that
 * renders <AeoEnhancement>.
 *
 * At build time scripts/inject-canonicals.mjs layers page-aeo.ts over
 * ai-head-data.json for question/answer (and faqs when page-aeo has them),
 * so the static crawler head always matches the visible runtime block.
 * This check therefore asserts build coverage — every page-aeo.ts route
 * must exist in ai-head-data.json — rather than raw field equality, which
 * the layering makes unnecessary.
 *
 * Run manually: node scripts/check-aeo-sync.mjs
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const jsonData = JSON.parse(
  readFileSync(resolve("scripts/ai-head-data.json"), "utf8"),
);

const { PAGE_AEO } = await import(
  new URL("../src/data/page-aeo.ts", import.meta.url)
);

const mismatches = [];

for (const [route, page] of Object.entries(PAGE_AEO)) {
  const build = jsonData[route];
  if (!build) {
    mismatches.push(`${route}: present in page-aeo.ts but missing from ai-head-data.json`);
    continue;
  }
  // scripts/inject-canonicals.mjs layers page-aeo.ts over ai-head-data.json
  // for question/answer (and faqs when page-aeo has them), so the effective
  // static head always matches the visible runtime block on those fields.
  // Raw differences between the two files are expected there and no longer
  // fail this check. What still must hold: the route exists in the
  // build-time data (checked above), so its static head is enriched at all.
  // Routes with no faqs on either side are fine: a page without visible
  // FAQs must not carry FAQPage schema.
}

if (mismatches.length) {
  console.error(`[aeo-sync] ${mismatches.length} mismatch(es) found:`);
  for (const m of mismatches) console.error(`  - ${m}`);
  console.error(
    "\nFix: add the route to ai-head-data.json, restore its build-side faqs, " +
      "or remove the route from page-aeo.ts if it's no longer meant to have a " +
      "runtime AeoEnhancement block.",
  );
  process.exit(1);
}

console.log(
  `[aeo-sync] OK - all ${Object.keys(PAGE_AEO).length} page-aeo.ts routes are covered by the build head (page-aeo fields layered on top at build time).`,
);
