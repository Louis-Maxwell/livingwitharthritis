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
 * captures pass/fail and writes a summary to .preflight-reports/seo-audit-report.md.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

type Step = {
  name: string;
  file: string;
  args: string[];
  required: boolean;
  env?: Record<string, string>;
};

const BASE_URL = process.env.BASE_URL ?? process.env.SITE_URL ?? "http://localhost:8080";
// Allow only absolute http(s) localhost / known site hosts into child env.
function sanitizeBaseUrl(raw: string): string {
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return "http://localhost:8080";
    return u.origin;
  } catch {
    return "http://localhost:8080";
  }
}
const SAFE_BASE = sanitizeBaseUrl(BASE_URL);
const SAFE_DIST =
  process.env.DIST_DIR && /^[a-zA-Z0-9._\/-]+$/.test(process.env.DIST_DIR)
    ? process.env.DIST_DIR
    : "";

const steps: Step[] = [
  { name: "robots.txt exists", file: "test", args: ["-f", "public/robots.txt"], required: true },
  { name: "sitemap.xml exists", file: "test", args: ["-f", "public/sitemap.xml"], required: true },
  {
    name: "sitemap references site sitemap directive",
    file: "grep",
    args: ["-q", "Sitemap:", "public/robots.txt"],
    required: true,
  },
  { name: "audit-sitemap", file: "node", args: ["scripts/audit-sitemap.mjs"], required: true },
  { name: "check-canonicals", file: "node", args: ["scripts/check-canonicals.mjs"], required: false },
  { name: "check-social-meta", file: "node", args: ["scripts/check-social-meta.mjs"], required: false },
  {
    // Prefer DIST_DIR (prerendered HTML on disk) — Puppeteer across ~1000
    // routes exceeds CI's 5m audit timeout. BASE_URL kept for live previews.
    name: "validate-jsonld",
    file: "node",
    args: ["scripts/validate-jsonld.mjs"],
    required: false,
    env: SAFE_DIST
      ? { DIST_DIR: SAFE_DIST }
      : { BASE_URL: SAFE_BASE },
  },
  // Advisory until page-aeo / meta / admin heading debt is cleaned up.
  { name: "aeo-sync", file: "node", args: ["scripts/check-aeo-sync.mjs"], required: false },
  { name: "meta-lengths", file: "bun", args: ["scripts/audit-meta-lengths.ts"], required: false },
  { name: "images", file: "bun", args: ["scripts/audit-images.ts"], required: true },
  { name: "headings", file: "bun", args: ["scripts/audit-headings.ts"], required: false },
];

type Result = { name: string; ok: boolean; out: string };
const results: Result[] = [];

for (const step of steps) {
  try {
    const out = execFileSync(step.file, step.args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, ...(step.env ?? {}) },
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

// Prefer a writable workspace path — /mnt/documents is Lovable-only and
// EACCES on GitHub Actions runners.
const outDir =
  process.env.SEO_AUDIT_REPORT_DIR ??
  resolve(".preflight-reports");
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
