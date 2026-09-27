#!/usr/bin/env node
/**
 * Mark one or more blog guides as clinically reviewed.
 *
 *   npm run blog:mark-reviewed -- <slug> [<slug> ...]
 *   npm run blog:mark-reviewed -- --date 2026-10-01 <slug>   # explicit review date
 *   npm run blog:mark-reviewed -- --no-catalog <slug>        # skip catalog regen
 *
 * For each slug, sets `"reviewStatus": "reviewed"` and `"last_reviewed"` to
 * today (Europe/London) in src/content/blog/posts/<slug>.json, then
 * regenerates the listing catalog. The page then shows "Clinically reviewed ·
 * Louis Maxwell" again and the JSON-LD may carry reviewedBy.
 * Run `npm run build` and commit the regenerated files, as for any edit.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { BLOG_POSTS_DIR } from "./lib/blog-posts.mjs";
import { markPostReviewed, serializePost, todayInLondon } from "./lib/blog-review.mjs";

const args = process.argv.slice(2);
let date = todayInLondon();
let regenerate = true;
const slugs = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--date") date = args[++i];
  else if (a.startsWith("--date=")) date = a.slice(7);
  else if (a === "--no-catalog") regenerate = false;
  else if (a === "-h" || a === "--help") {
    console.log("Usage: npm run blog:mark-reviewed -- [--date YYYY-MM-DD] [--no-catalog] <slug...>");
    process.exit(0);
  } else slugs.push(a);
}

if (slugs.length === 0) {
  console.error("Usage: npm run blog:mark-reviewed -- [--date YYYY-MM-DD] [--no-catalog] <slug...>");
  process.exit(1);
}

let failed = false;
for (const slug of slugs) {
  const file = resolve(BLOG_POSTS_DIR, `${slug}.json`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !existsSync(file)) {
    console.error(`✗ ${slug}: no guide at ${BLOG_POSTS_DIR}/${slug}.json`);
    failed = true;
    continue;
  }
  try {
    const post = JSON.parse(readFileSync(file, "utf8"));
    const was = post.reviewStatus ?? "reviewed";
    writeFileSync(file, serializePost(markPostReviewed(post, date)));
    console.log(`✓ ${slug}: ${was} → reviewed (last_reviewed ${date})`);
  } catch (err) {
    console.error(`✗ ${slug}: ${err.message}`);
    failed = true;
  }
}

if (regenerate && !failed) {
  const r = spawnSync("bun", ["scripts/generate-blog-catalog.ts"], { stdio: "inherit" });
  if (r.error || r.status !== 0) {
    console.error("Catalog regeneration failed — run `npm run blog:catalog` yourself.");
    failed = true;
  }
}

if (!failed) console.log("Next: npm run build, then commit the post(s) and regenerated files.");
process.exit(failed ? 1 : 0);
