#!/usr/bin/env node
import { readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || "dist");
const maxFiles = 20_000;
const maxFileBytes = 25 * 1024 * 1024;
const files = [];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else files.push({ path, size: stat.size });
  }
}

walk(root);
const oversized = files.filter((file) => file.size > maxFileBytes);
const largest = [...files].sort((a, b) => b.size - a.size).slice(0, 5);

console.log(
  `[cloudflare-assets] ${files.length} files; largest ${(
    (largest[0]?.size ?? 0) /
    1024 /
    1024
  ).toFixed(2)} MiB`,
);

if (files.length > maxFiles) {
  console.error(
    `Cloudflare free-plan asset limit exceeded: ${files.length} > ${maxFiles}`,
  );
}
for (const file of oversized) {
  console.error(
    `Cloudflare 25 MiB asset limit exceeded: ${relative(root, file.path)} (${(
      file.size /
      1024 /
      1024
    ).toFixed(2)} MiB)`,
  );
}

if (files.length > maxFiles || oversized.length > 0) process.exit(1);
