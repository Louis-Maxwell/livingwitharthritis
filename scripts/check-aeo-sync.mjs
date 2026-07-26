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
 * renders <AeoEnhancement>. Instead, this check ensures every route
 * page-aeo.ts DOES cover stays byte-for-byte aligned with
 * ai-head-data.json's question/answer/faqs for that same route, so the
 * two can't silently disagree about what a page says.
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
  if (page.question !== build.question) {
    mismatches.push(`${route}: question differs`);
  }
  if (page.answer !== build.answer) {
    mismatches.push(`${route}: answer differs`);
  }
  const pageFaqs = page.faqs ?? [];
  const buildFaqs = build.faqs ?? [];
  if (pageFaqs.length !== buildFaqs.length) {
    mismatches.push(
      `${route}: faq count differs (page-aeo.ts=${pageFaqs.length}, ai-head-data.json=${buildFaqs.length})`,
    );
  } else {
    pageFaqs.forEach((f, i) => {
      const b = buildFaqs[i];
      if (f.q !== b?.q || f.a !== b?.a) {
        mismatches.push(`${route}: faq #${i + 1} text differs`);
      }
    });
  }
}

if (mismatches.length) {
  console.error(`[aeo-sync] ${mismatches.length} mismatch(es) found:`);
  for (const m of mismatches) console.error(`  - ${m}`);
  console.error(
    "\nFix: update whichever file is stale so both agree, or remove the " +
      "route from page-aeo.ts if it's no longer meant to have a runtime " +
      "AeoEnhancement block.",
  );
  process.exit(1);
}

console.log(
  `[aeo-sync] OK — all ${Object.keys(PAGE_AEO).length} page-aeo.ts routes match ai-head-data.json.`,
);
