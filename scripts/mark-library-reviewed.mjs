#!/usr/bin/env node
/**
 * Mark one or more /library/<slug> topics as clinically reviewed.
 *
 *   npm run library:mark-reviewed -- <slug> [<slug> ...]
 *   npm run library:mark-reviewed -- --date 2026-10-01 <slug>
 *
 * Sets `{ "reviewStatus": "reviewed", "lastReviewed": <today, Europe/London> }`
 * for each slug in src/data/libraryReviewStatus.json. The topic's review box
 * then says "Clinically reviewed · Louis Maxwell, HCPC PH128483 · <date>" and
 * its "About this page" note drops the pending wording.
 * Then run `npm run build` (regenerates scripts/library-head-data.json) and
 * commit both files.
 */
import { closeSync, ftruncateSync, openSync, readFileSync, writeSync } from "node:fs";
import { resolve } from "node:path";
import { todayInLondon } from "./lib/blog-review.mjs";
import {
  LIBRARY_REVIEW_STATUS_PATH,
  markLibraryTopicReviewed,
  serializeLibraryReviewStatus,
} from "./lib/library-review.mjs";

const USAGE = "Usage: npm run library:mark-reviewed -- [--date YYYY-MM-DD] <slug...>";
const args = process.argv.slice(2);
let date = todayInLondon();
const slugs = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--date") date = args[++i];
  else if (a.startsWith("--date=")) date = a.slice(7);
  else if (a === "-h" || a === "--help") {
    console.log(USAGE);
    process.exit(0);
  } else slugs.push(a);
}
if (slugs.length === 0) {
  console.error(USAGE);
  process.exit(1);
}

// Read and rewrite through one file descriptor (no check-then-use race).
const fd = openSync(resolve(LIBRARY_REVIEW_STATUS_PATH), "r+");
let failed = false;
try {
  let map = JSON.parse(readFileSync(fd, "utf8"));
  for (const slug of slugs) {
    try {
      const was = map[slug]?.reviewStatus ?? "reviewed";
      map = markLibraryTopicReviewed(map, slug, date);
      console.log(`✓ ${slug}: ${was} → reviewed (lastReviewed ${date})`);
    } catch (err) {
      console.error(`✗ ${err.message}`);
      failed = true;
    }
  }
  if (!failed) {
    const out = Buffer.from(serializeLibraryReviewStatus(map), "utf8");
    ftruncateSync(fd, 0);
    writeSync(fd, out, 0, out.length, 0);
    console.log("Next: npm run build, then commit src/data/libraryReviewStatus.json and scripts/library-head-data.json.");
  } else {
    console.error("No changes written.");
  }
} finally {
  closeSync(fd);
}
process.exit(failed ? 1 : 0);
