#!/usr/bin/env node
/**
 * Write 800px-wide copies of /openverse WebPs for mobile srcset.
 * Uses sharp so CI and Lovable do not need a system ffmpeg.
 * Output is public/openverse/w800 (gitignored). When dist/ already exists
 * (this script runs in postbuild), the same files are written there too.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "public/openverse";
const OUT_DIRS = ["public/openverse/w800", "dist/openverse/w800"].filter((dir) =>
  dir.startsWith("dist/") ? existsSync("dist/openverse") : true,
);

async function pool(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) await worker(queue.shift());
  });
  await Promise.all(runners);
}

const files = existsSync(SRC) ? readdirSync(SRC).filter((name) => name.endsWith(".webp")) : [];
let written = 0;
let skipped = 0;

await pool(files, 8, async (name) => {
  const src = join(SRC, name);
  const srcMtime = statSync(src).mtimeMs;
  const pending = [];
  for (const dir of OUT_DIRS) {
    mkdirSync(dir, { recursive: true });
    const dest = join(dir, name);
    if (existsSync(dest) && statSync(dest).mtimeMs >= srcMtime) skipped += 1;
    else pending.push(dest);
  }
  if (!pending.length) return;
  const buffer = await sharp(src)
    .rotate()
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toBuffer();
  await Promise.all(pending.map((dest) => sharp(buffer).toFile(dest)));
  written += pending.length;
});

console.log(`[image-variants] ${files.length} covers, wrote ${written}, skipped ${skipped}`);
