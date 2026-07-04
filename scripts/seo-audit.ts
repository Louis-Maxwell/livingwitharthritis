#!/usr/bin/env bun
/**
 * Composite SEO audit — runs the existing single-purpose checks and produces
 * one clear pass/fail report. Invoked via `npm run seo:audit`.
 *
 *   • sitemap presence + validity     (scripts/audit-sitemap.mjs)
 *   • canonical presence per route    (scripts/check-canonicals.mjs)
 *   • Open Graph + Twitter meta       (scripts/check-social-meta.mjs)
 *   • JSON-LD required fields         (scripts/validate-jsonld.mjs)
 *
 * The individual scripts are unchanged — this one just orchestrates them,
 * captures pass/fail and writes a summary to /mnt/documents/seo-audit-report.md.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type Step = { name: string; cmd: string; required: boolean };

const BASE_URL = process.env.BASE_URL ?? "http://localhost:8080";

const steps: Step[] = [
  { name: "robots.txt exists", cmd: "test -f public/robots.txt", required: true },
  { name: "sitemap.xml exists", cmd: "test -f public/sitemap.xml", required: true },
  {
    name: "sitemap references site sitemap directive",
    cmd: "grep -q 'Sitemap:' public/robots.txt",
    required: true,
  },
  { name: "audit-sitemap", cmd: "node scripts/audit-sitemap.mjs", required: true },
  { name: "check-canonicals", cmd: "node scripts/check-canonicals.mjs", required: false },
  { name: "check-social-meta", cmd: "node scripts/check-social-meta.mjs", required: false },
  {
    name: "validate-jsonld",
    cmd: `BASE_URL=${BASE_URL} node scripts/validate-jsonld.mjs`,
    required: false,
  },
 { name: "meta-lengths", cmd: "bun scripts/audit-meta-lengths.ts", required: true },
 { name: "images", cmd: "bun scripts/audit-images.ts", required: true },
 { name: "headings", cmd: "bun scripts/audit-headings.ts", required: true },
];

type Result = { name: string; ok: boolean; out: string };
const results: Result[] = [];

for (const step of steps) {
  try {
    const out = execSync(step.cmd, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    results.push({ name: step.name, ok: true, out });
    console.log(`[PASS] ${step.name}`);
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer | string; stderr?: Buffer | string; message?: string };
    const out = (err.stdout?.toString() ?? "") + (err.stderr?.toString() ?? "") + (err.message ?? "");
    results.push({ name: step.name, ok: false, out });
    console.log(`[FAIL] ${step.name}`);
    if (step.required) {
      console.log(out.slice(0, 500));
    }
  }
}

const outDir = "/mnt/documents";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const md = [
  `# SEO Audit Report`,
  ``,
  `Ran ${results.length} checks at ${new Date().toISOString()}`,
  ``,
  `- Passed: **${results.filter((r) => r.ok).length}**`,
  `- Failed: **${results.filter((r) => !r.ok).length}**`,
  ``,
  ...results.map(
    (r) =>
      `## ${r.ok ? "✅" : "❌"} ${r.name}\n\n\`\`\`\n${r.out.slice(0, 2000).trim()}\n\`\`\`\n`,
  ),
].join("\n");

writeFileSync(resolve(outDir, "seo-audit-report.md"), md);
console.log(`\nReport written to ${outDir}/seo-audit-report.md`);

const failedRequired = results.filter(
  (r, i) => !r.ok && steps[i].required,
).length;
if (failedRequired > 0) {
  console.error(`${failedRequired} required check(s) failed.`);
  process.exit(1);
}
