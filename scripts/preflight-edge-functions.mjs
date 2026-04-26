#!/usr/bin/env node
/**
 * Preflight type-check for Supabase edge functions.
 *
 * Runs `deno check` against each function's index.ts, prints a summary,
 * and writes a timestamped report to .preflight-reports/.
 *
 * Exit code: 0 if all pass, 1 if any fail (so it can gate deploys in CI/scripts).
 *
 * Usage:
 *   node scripts/preflight-edge-functions.mjs
 *   node scripts/preflight-edge-functions.mjs --function=chat
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const FUNCTIONS_DIR = join(ROOT, "supabase", "functions");
const REPORT_DIR = join(ROOT, ".preflight-reports");
const DENO_VERSION_FILE = join(ROOT, ".deno-version");

const argFn = process.argv.find((a) => a.startsWith("--function="))?.split("=")[1];
const skipVersionCheck = process.argv.includes("--skip-version-check");

function readRequiredDenoVersion() {
  if (!existsSync(DENO_VERSION_FILE)) return null;
  return readFileSync(DENO_VERSION_FILE, "utf8").trim();
}

function getInstalledDenoVersion() {
  const result = spawnSync("deno", ["--version"], { encoding: "utf8" });
  if (result.error || result.status !== 0) return null;
  // First line: "deno X.Y.Z (...)"
  const match = result.stdout.match(/^deno\s+(\d+\.\d+\.\d+)/);
  return match ? match[1] : null;
}

function enforceDenoVersion() {
  const required = readRequiredDenoVersion();
  if (!required) {
    console.error("⚠️  No .deno-version file found — skipping version enforcement.");
    return;
  }
  const installed = getInstalledDenoVersion();
  if (!installed) {
    console.error(
      `❌ Deno is not installed or not in PATH. Required version: ${required}.\n` +
        `   Install from https://deno.land or run with --skip-version-check to bypass.`,
    );
    process.exit(1);
  }
  if (installed !== required) {
    console.error(
      `❌ Deno version mismatch.\n` +
        `   Required: ${required} (from .deno-version)\n` +
        `   Installed: ${installed}\n` +
        `   Install the pinned version, or pass --skip-version-check to bypass (not recommended for CI).`,
    );
    process.exit(1);
  }
  console.log(`Deno version OK: ${installed} (matches .deno-version)`);
}


function listFunctions() {
  if (!existsSync(FUNCTIONS_DIR)) {
    console.error(`No functions directory at ${FUNCTIONS_DIR}`);
    process.exit(1);
  }
  return readdirSync(FUNCTIONS_DIR)
    .filter((name) => {
      if (name.startsWith("_") || name.startsWith(".")) return false;
      const full = join(FUNCTIONS_DIR, name);
      if (!statSync(full).isDirectory()) return false;
      return existsSync(join(full, "index.ts"));
    })
    .filter((name) => !argFn || name === argFn);
}

function checkFunction(name) {
  const entry = join(FUNCTIONS_DIR, name, "index.ts");
  const started = Date.now();
  const result = spawnSync("deno", ["check", entry], {
    encoding: "utf8",
    cwd: ROOT,
  });
  const durationMs = Date.now() - started;

  if (result.error) {
    return {
      name,
      ok: false,
      durationMs,
      stdout: "",
      stderr: `Failed to spawn deno: ${result.error.message}. Is Deno installed and in PATH?`,
      exitCode: -1,
    };
  }

  return {
    name,
    ok: result.status === 0,
    durationMs,
    stdout: result.stdout?.trim() ?? "",
    stderr: result.stderr?.trim() ?? "",
    exitCode: result.status ?? -1,
  };
}

function timestamp() {
  // 2026-04-26T14-32-05
  return new Date().toISOString().replace(/:/g, "-").replace(/\..+$/, "");
}

function buildReport(results, ts, denoVersion, requiredVersion) {
  const failed = results.filter((r) => !r.ok);
  const passed = results.filter((r) => r.ok);

  const lines = [];
  lines.push(`Edge Function Preflight Report`);
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Deno: ${denoVersion ?? "unknown"} (required: ${requiredVersion ?? "unpinned"})`);
  lines.push(`Total: ${results.length}  Passed: ${passed.length}  Failed: ${failed.length}`);
  lines.push("=".repeat(72));
  lines.push("");

  lines.push("SUMMARY");
  lines.push("-".repeat(72));
  for (const r of results) {
    const status = r.ok ? "PASS" : "FAIL";
    lines.push(`[${status}] ${r.name}  (${r.durationMs}ms, exit=${r.exitCode})`);
  }
  lines.push("");

  if (failed.length > 0) {
    lines.push("FAILURES (details)");
    lines.push("-".repeat(72));
    for (const r of failed) {
      lines.push(`### ${r.name}`);
      lines.push(`exit code: ${r.exitCode}`);
      if (r.stdout) {
        lines.push("--- stdout ---");
        lines.push(r.stdout);
      }
      if (r.stderr) {
        lines.push("--- stderr ---");
        lines.push(r.stderr);
      }
      lines.push("");
    }
  }

  return lines.join("\n");
}

function main() {
  const fns = listFunctions();
  if (fns.length === 0) {
    console.error(argFn ? `Function "${argFn}" not found.` : "No functions to check.");
    process.exit(1);
  }

  console.log(`Preflight: type-checking ${fns.length} edge function(s)...\n`);

  const results = [];
  for (const name of fns) {
    process.stdout.write(`  ${name} ... `);
    const r = checkFunction(name);
    results.push(r);
    console.log(r.ok ? `ok (${r.durationMs}ms)` : `FAIL (${r.durationMs}ms)`);
  }

  const ts = timestamp();
  mkdirSync(REPORT_DIR, { recursive: true });
  const reportPath = join(REPORT_DIR, `preflight-${ts}.log`);
  const jsonPath = join(REPORT_DIR, `preflight-${ts}.json`);

  writeFileSync(reportPath, buildReport(results, ts), "utf8");
  writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        total: results.length,
        passed: results.filter((r) => r.ok).length,
        failed: results.filter((r) => !r.ok).length,
        results,
      },
      null,
      2,
    ),
    "utf8",
  );

  const failed = results.filter((r) => !r.ok);
  console.log("");
  console.log(`Report: ${reportPath}`);
  console.log(`JSON:   ${jsonPath}`);

  if (failed.length > 0) {
    console.log("");
    console.log(`❌ ${failed.length} function(s) failed type-check:`);
    for (const r of failed) console.log(`   - ${r.name}`);
    process.exit(1);
  }

  console.log(`\n✅ All ${results.length} function(s) passed.`);
}

main();
