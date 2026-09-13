#!/usr/bin/env bun
/**
 * Composite SEO audit. Runs deterministic local checks against the build
 * artefact and writes a portable report under .preflight-reports/.
 *
 * Network-dependent validation belongs in dedicated deployment checks; this
 * audit must remain safe to run in CI without access to external services.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

type Step = { name: string; cmd: string; required: boolean };

const BASE_URL = process.env.BASE_URL ?? "http://localhost:4173";
const REPORT_DIR = resolve(".preflight-reports");

const steps: Step[] = [
  { name: "robots.txt exists", cmd: "test -f public/robots.txt", required: true },
  { name: "sitemap.xml exists", cmd: "test -f public/sitemap.xml", required: true },
  {
    name: "sitemap references site sitemap directive",
    cmd: "grep -q 'Sitemap:' public/robots.txt",
    required: true,
  },
  { name: "audit-sitemap", cmd: "node scripts/audit-sitemap.mjs", required: true },
  { name: "check-canonicals", cmd: "node scripts/check-canonicals.mjs", required: true },
  { name: "check-social-meta", cmd: "node scripts/check-social-meta.mjs", required: true },
  {
    name: "validate-jsonld",
    cmd: `BASE_URL=${BASE_URL} node scripts/validate-jsonld.mjs`,
    required: true,
  },
  { name: "aeo-sync", cmd: "node scripts/check-aeo-sync.mjs", required: true },
  { name: "meta-lengths", cmd: "bun scripts/audit-meta-lengths.ts", required: true },
  { name: "images", cmd: "bun scripts/audit-images.ts", required: true },
  { name: "headings", cmd: "bun scripts/audit-headings.ts", required: true },
  { name: "blog-html", cmd: "node scripts/check-blog-html.mjs", required: true },
  { name: "redirects", cmd: "node scripts/check-redirects.mjs", required: true },
];

type Result = { name: string; ok: boolean; out: string };
const results: Result[] = [];

for (const step of steps) {
  try {
    const out = execSync(step.cmd, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120_000,
      env: { ...process.env, BASE_URL },
    });
    results.push({ name: step.name, ok: true, out });
    console.log(`[PASS] ${step.name}`);
  } catch (e: unknown) {
    const err = e as { stdout?: Buffer | string; stderr?: Buffer | string; message?: string };
    const out = `${err.stdout?.toString() ?? ""}${err.stderr?.toString() ?? ""}${err.message ?? ""}`;
    results.push({ name: step.name, ok: false, out });
    console.log(`[FAIL] ${step.name}`);
    if (step.required) console.log(out.slice(0, 800));
  }
}

mkdirSync(REPORT_DIR, { recursive: true });
const reportPath = resolve(REPORT_DIR, "seo-audit-report.md");
const md = [
  "# SEO Audit Report",
  "",
  `Ran ${results.length} deterministic checks at ${new Date().toISOString()}`,
  "",
  `- Passed: **${results.filter((r) => r.ok).length}**`,
  `- Failed: **${results.filter((r) => !r.ok).length}**`,
  "",
  ...results.map(
    (r) => `## ${r.ok ? "✅" : "❌"} ${r.name}\n\n\`\`\`\n${r.out.slice(0, 4000).trim()}\n\`\`\`\n`,
  ),
].join("\n");

writeFileSync(reportPath, md);
console.log(`\nReport written to ${reportPath}`);

const failedRequired = results.filter((r, i) => !r.ok && steps[i].required).length;
if (failedRequired > 0) {
  console.error(`${failedRequired} required check(s) failed.`);
  process.exit(1);
}
