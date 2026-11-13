#!/usr/bin/env node
/**
 * Write 800px-wide copies of /openverse WebPs for mobile srcset.
 * The originals stay for wide screens. Output is public/openverse/w800
 * (gitignored) and is copied into dist by Vite when this runs before build,
 * or written straight into an existing dist/openverse/w800 after build.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

const SRC = "public/openverse";
const OUT_DIRS = ["public/openverse/w800", "dist/openverse/w800"].filter((dir) =>
  dir.startsWith("dist/") ? existsSync("dist/openverse") : true,
);

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "ignore", "pipe"] });
    let err = "";
    child.stderr.on("data", (chunk) => {
      err += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.slice(-400) || `${cmd} exited ${code}`));
    });
  });
}

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

await pool(files, 6, async (name) => {
  const src = join(SRC, name);
  const srcMtime = statSync(src).mtimeMs;
  for (const dir of OUT_DIRS) {
    mkdirSync(dir, { recursive: true });
    const dest = join(dir, name);
    if (existsSync(dest) && statSync(dest).mtimeMs >= srcMtime) {
      skipped += 1;
      continue;
    }
    await run("ffmpeg", [
      "-y",
      "-i",
      src,
      "-vf",
      "scale=800:-2",
      "-c:v",
      "libwebp",
      "-quality",
      "70",
      dest,
    ]);
    written += 1;
  }
});

console.log(`[image-variants] ${files.length} covers, wrote ${written}, skipped ${skipped}`);
