#!/usr/bin/env node
/**
 * Generate / refresh Deno lockfiles for each Supabase edge function.
 *
 * For every function with an entrypoint, runs:
 *   deno cache --lock=<fn>/deno.lock --lock-write --reload <entrypoint>
 *
 * This pins all transitive deps (npm:, jsr:, https:) to specific versions
 * + integrity hashes so every environment (local, CI, edge-runtime) resolves
 * the exact same modules.
 *
 * Defaults to write mode. Pass --check to verify lockfiles are up to date
 * without modifying them (suitable for CI).
 *
 * Usage:
 *   node scripts/lock-edge-functions.mjs
 *   node scripts/lock-edge-functions.mjs --function=chat
 *   node scripts/lock-edge-functions.mjs --check
 */
import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  copyFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const FUNCTIONS_DIR = join(ROOT, "supabase", "functions");
const DENO_VERSION_FILE = join(ROOT, ".deno-version");

const argFn = process.argv.find((a) => a.startsWith("--function="))?.split("=")[1];
const checkOnly = process.argv.includes("--check");
const skipVersionCheck = process.argv.includes("--skip-version-check");

const ENTRYPOINT_CANDIDATES = ["index.ts", "main.ts", "mod.ts", "handler.ts", "server.ts"];

function readPinned() {
  return existsSync(DENO_VERSION_FILE)
    ? readFileSync(DENO_VERSION_FILE, "utf8").trim()
    : null;
}

function getInstalledDeno() {
  const r = spawnSync("deno", ["--version"], { encoding: "utf8" });
  if (r.error || r.status !== 0) return null;
  return r.stdout.match(/^deno\s+(\d+\.\d+\.\d+)/)?.[1] ?? null;
}

function enforceDenoVersion() {
  const required = readPinned();
  if (!required) return;
  const installed = getInstalledDeno();
  if (!installed) {
    console.error(`❌ Deno not installed. Required: ${required}`);
    process.exit(1);
  }
  if (installed !== required) {
    console.error(
      `❌ Deno version mismatch.\n   Required: ${required}\n   Installed: ${installed}`,
    );
    process.exit(1);
  }
  console.log(`Deno version OK: ${installed}`);
}

function discoverEntrypoint(name) {
  const dir = join(FUNCTIONS_DIR, name);
  for (const c of ENTRYPOINT_CANDIDATES) {
    const full = join(dir, c);
    if (existsSync(full)) return full;
  }
  return null;
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
      return discoverEntrypoint(name) !== null;
    })
    .filter((name) => !argFn || name === argFn);
}

function lockFunction(name, mode) {
  const entry = discoverEntrypoint(name);
  const lockPath = join(FUNCTIONS_DIR, name, "deno.lock");

  if (mode === "check") {
    // Generate to a temp file and diff against committed lockfile.
    const tmp = mkdtempSync(join(tmpdir(), `denolock-${name}-`));
    const tmpLock = join(tmp, "deno.lock");
    const r = spawnSync(
      "deno",
      ["cache", `--lock=${tmpLock}`, "--lock-write", "--reload", entry],
      { encoding: "utf8", cwd: ROOT },
    );
    if (r.status !== 0) {
      rmSync(tmp, { recursive: true, force: true });
      return { name, ok: false, reason: "cache failed", stderr: r.stderr?.trim() ?? "" };
    }
    const fresh = readFileSync(tmpLock, "utf8");
    rmSync(tmp, { recursive: true, force: true });

    if (!existsSync(lockPath)) {
      return { name, ok: false, reason: "missing deno.lock — run without --check to generate" };
    }
    const current = readFileSync(lockPath, "utf8");
    if (current !== fresh) {
      return { name, ok: false, reason: "deno.lock is out of date — run without --check to refresh" };
    }
    return { name, ok: true, reason: "lockfile matches" };
  }

  // write mode
  const r = spawnSync(
    "deno",
    ["cache", `--lock=${lockPath}`, "--lock-write", "--reload", entry],
    { encoding: "utf8", cwd: ROOT, stdio: ["ignore", "pipe", "pipe"] },
  );
  if (r.status !== 0) {
    return { name, ok: false, reason: "cache failed", stderr: r.stderr?.trim() ?? "" };
  }
  return { name, ok: true, reason: "lockfile written" };
}

function main() {
  if (!skipVersionCheck) enforceDenoVersion();

  const fns = listFunctions();
  if (fns.length === 0) {
    console.error(argFn ? `Function "${argFn}" not found.` : "No functions to lock.");
    process.exit(1);
  }

  const mode = checkOnly ? "check" : "write";
  console.log(`Lockfiles: ${mode === "check" ? "verifying" : "generating"} for ${fns.length} function(s)...\n`);

  const results = [];
  for (const name of fns) {
    process.stdout.write(`  ${name} ... `);
    const r = lockFunction(name, mode);
    results.push(r);
    console.log(r.ok ? `ok (${r.reason})` : `FAIL (${r.reason})`);
    if (!r.ok && r.stderr) {
      console.log(r.stderr.split("\n").map((l) => `      ${l}`).join("\n"));
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log("");
  if (failed.length > 0) {
    console.log(`❌ ${failed.length} function(s) failed:`);
    for (const r of failed) console.log(`   - ${r.name}: ${r.reason}`);
    process.exit(1);
  }
  console.log(`✅ All ${results.length} function(s) ${mode === "check" ? "verified" : "locked"}.`);
}

main();
