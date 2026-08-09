#!/usr/bin/env node
/**
 * Pre-publish smoke test.
 *
 * Reproduces locally what publishing does:
 *   1. Typecheck the app (tsgo, falls back to tsc --noEmit).
 *   2. Build the production bundles (npm run build → sitemap/llms/OG +
 *      vite build + canonical injection). The Vite MCP plugin regenerates
 *      supabase/functions/mcp/index.ts during this stage, so it MUST run
 *      before the edge function check.
 *   3. Compile-check every Supabase edge function with
 *      scripts/preflight-edge-functions.mjs (deno check per function),
 *      including the freshly generated MCP function.
 *
 * Writes a combined summary to .preflight-reports/prepublish-<timestamp>.json
 * and exits non-zero on the first failing stage, so it can gate a publish.
 *
 * Usage:
 *   node scripts/prepublish-smoke.mjs
 *   node scripts/prepublish-smoke.mjs --skip-build
 *   node scripts/prepublish-smoke.mjs --skip-functions
 *   node scripts/prepublish-smoke.mjs --skip-version-check
 *   node scripts/prepublish-smoke.mjs --strict     # missing Deno = failure
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const REPORT_DIR = join(ROOT, ".preflight-reports");

const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);

const skipBuild = has("--skip-build");
const skipFunctions = has("--skip-functions");
const skipVersionCheck = has("--skip-version-check");
const strict = has("--strict");
const withPerf = has("--perf");

const stages = [];

function hr() {
  console.log("─".repeat(72));
}

function run(cmd, args, { env } = {}) {
  const started = Date.now();
  const r = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, ...env },
    shell: process.platform === "win32",
  });
  return {
    status: r.error ? null : r.status,
    error: r.error ? r.error.message : null,
    durationMs: Date.now() - started,
  };
}

function record(name, state, detail, durationMs) {
  stages.push({ name, state, detail: detail ?? null, durationMs: durationMs ?? 0 });
  const icon = state === "PASS" ? "✅" : state === "SKIPPED" ? "⏭️ " : "❌";
  const secs = durationMs ? ` (${(durationMs / 1000).toFixed(1)}s)` : "";
  console.log(`${icon} ${name}: ${state}${secs}${detail ? ` — ${detail}` : ""}`);
}

function binaryExists(cmd) {
  const probe = spawnSync(process.platform === "win32" ? "where" : "which", [cmd], {
    encoding: "utf8",
  });
  return probe.status === 0;
}

function finish(exitCode) {
  mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportPath = join(REPORT_DIR, `prepublish-${stamp}.json`);
  writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        ok: exitCode === 0,
        options: { skipBuild, skipFunctions, skipVersionCheck, strict, withPerf },
        stages,
      },
      null,
      2,
    ),
  );
  hr();
  console.log(exitCode === 0 ? "PRE-PUBLISH SMOKE: PASS" : "PRE-PUBLISH SMOKE: FAIL");
  console.log(`Report: ${reportPath}`);
  process.exit(exitCode);
}

// ---------------------------------------------------------------------------
// Stage 1 — typecheck
// ---------------------------------------------------------------------------
hr();
console.log("Stage 1/4 — Typecheck (TypeScript, no emit)");
hr();
{
  const useTsgo = binaryExists("tsgo") || existsSync(join(ROOT, "node_modules", ".bin", "tsgo"));
  const cmd = useTsgo ? "tsgo" : "npx";
  const args = useTsgo ? ["--noEmit"] : ["tsc", "--noEmit"];
  const r = run(cmd, args);
  if (r.status !== 0) {
    record("Typecheck", "FAIL", r.error ?? `exit ${r.status}`, r.durationMs);
    finish(1);
  }
  record("Typecheck", "PASS", useTsgo ? "tsgo" : "tsc --noEmit", r.durationMs);
}

// ---------------------------------------------------------------------------
// Stage 2 — CSS utility guard (ambiguous / non-tokenised Tailwind utilities)
// ---------------------------------------------------------------------------
hr();
console.log("Stage 2/4 — CSS utility check");
hr();
{
  const r = run("node", ["scripts/check-css-utilities.mjs", "--json"]);
  if (r.status !== 0) {
    record("CSS utility check", "FAIL", r.error ?? `exit ${r.status}`, r.durationMs);
    finish(1);
  }
  record("CSS utility check", "PASS", "no ambiguous utilities", r.durationMs);
}

// ---------------------------------------------------------------------------
// Stage 3 — production build (also regenerates the MCP edge function)
// ---------------------------------------------------------------------------
hr();
console.log("Stage 3/4 — Production build");
hr();

if (skipBuild) {
  record("Production build", "SKIPPED", "--skip-build");
} else {
  const r = run("npm", ["run", "build"]);
  if (r.status !== 0) {
    record("Production build", "FAIL", r.error ?? `exit ${r.status}`, r.durationMs);
    finish(1);
  }
  record("Production build", "PASS", "dist/ + generated edge functions", r.durationMs);
}

// ---------------------------------------------------------------------------
// Stage 4 — edge function compilation check
// ---------------------------------------------------------------------------
hr();
console.log("Stage 4/4 — Edge function compilation check");
hr();
if (skipFunctions) {
  record("Edge function check", "SKIPPED", "--skip-functions");
} else if (!binaryExists("deno") && !strict) {
  record(
    "Edge function check",
    "SKIPPED",
    "Deno not found on PATH — install the version in .deno-version, or pass --strict to make this a failure",
  );
} else {
  const args = ["scripts/preflight-edge-functions.mjs"];
  if (skipVersionCheck) args.push("--skip-version-check");
  const r = run("node", args);
  if (r.status !== 0) {
    record("Edge function check", "FAIL", r.error ?? `exit ${r.status}`, r.durationMs);
    finish(1);
  }
  record("Edge function check", "PASS", "deno check across supabase/functions", r.durationMs);
}

finish(0);
