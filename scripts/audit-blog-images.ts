#!/usr/bin/env bun
/**
 * Complete inventory audit for the published blog image system.
 *
 * This is deliberately provenance-first: a local file is not considered
 * licensed merely because its filename contains "openverse". The audit
 * requires every approved image to have creator, licence and source metadata.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const catalog = JSON.parse(readFileSync(join(root, "src/content/blog/catalog.generated.json"), "utf8")) as Array<Record<string, unknown>>;
const coverMap = JSON.parse(readFileSync(join(root, "src/data/blog-cover-map.generated.json"), "utf8")) as Record<string, string>;
const metadataSource = readFileSync(join(root, "src/data/openverseImages.ts"), "utf8");
const localRoot = join(root, "public/openverse");

const expected = Number(process.env.EXPECTED_BLOG_COUNT ?? 692);
const metadataFiles = [...metadataSource.matchAll(/localPath:\s*"\/openverse\/([^"]+)"/g)].map((m) => m[1]);
const metadataSet = new Set(metadataFiles);
const localFiles = new Set(readdirSync(localRoot));
const findings: Array<{ slug: string; status: string; detail?: string }> = [];

if (catalog.length !== expected) {
  findings.push({ slug: "__catalog__", status: "fail", detail: `Expected ${expected} blogs but found ${catalog.length}` });
}

for (const article of catalog) {
  const slug = String(article.slug ?? "");
  const cover = coverMap[slug];
  if (!cover) {
    findings.push({ slug, status: "fail", detail: "Missing cover-map entry" });
    continue;
  }
  const filename = cover.replace(/^\/openverse\//, "");
  if (!localFiles.has(filename)) {
    findings.push({ slug, status: "fail", detail: `Missing local image ${filename}` });
    continue;
  }
  if (!metadataSet.has(filename)) {
    findings.push({ slug, status: "fail", detail: `No provenance metadata for ${filename}` });
  }
}

for (const file of metadataFiles) {
  const block = metadataSource.slice(metadataSource.indexOf(`localPath: \"/openverse/${file}\"`) - 500, metadataSource.indexOf(`localPath: \"/openverse/${file}\"`) + 500);
  if (!/creator:\s*"[^"]+"/.test(block) || !/license:\s*"[^"]+"/.test(block) || !/sourceUrl:\s*"https?:\/\//.test(block)) {
    findings.push({ slug: file, status: "fail", detail: "Incomplete creator/licence/source provenance" });
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  expectedBlogCount: expected,
  blogCount: catalog.length,
  mappedCoverCount: Object.keys(coverMap).length,
  approvedImageMetadataCount: metadataFiles.length,
  localImageCount: localFiles.size,
  fourImageStandard: "cover + 3 related images",
  failures: findings,
  passed: findings.length === 0,
};
writeFileSync(join(root, "audit-blog-images-report.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exit(1);
