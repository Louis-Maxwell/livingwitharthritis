#!/usr/bin/env node
/**
 * Lighthouse performance budget runner.
 *
 * Builds (unless --no-build), serves dist/ on :4173, runs Lighthouse CI with
 * the assertions in lighthouserc.json + resource budgets in budget.json, then
 * tears the server down. Exits non-zero when a budget is breached, unless
 * --report-only is passed.
 *
 * Usage:
 *   node scripts/perf-lighthouse.mjs
 *   node scripts/perf-lighthouse.mjs --no-build
 *   node scripts/perf-lighthouse.mjs --report-only
 *   PERF_BASE_URL=http://localhost:8080 node scripts/perf-lighthouse.mjs --no-build --no-serve
 */
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const skipBuild = has("--no-build");
const skipServe = has("--no-serve");
const reportOnly = has("--report-only");
const PORT = process.env.PERF_PORT || "4173";
const BASE = process.env.PERF_BASE_URL || `http://localhost:${PORT}`;

function run(cmd, args) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: process.platform === "win32" });
  return r.status ?? 1;
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return true;
    } catch {
      /* not up yet */
    }
    await sleep(1000);
  }
  return false;
}

if (!skipBuild) {
  console.log("→ Building production bundles…");
  const code = run("npm", ["run", "build"]);
  if (code !== 0) {
    console.error("Build failed — aborting performance run.");
    process.exit(code);
  }
}

let server = null;
if (!skipServe) {
  console.log(`→ Serving dist/ on ${BASE}`);
  server = spawn("npx", ["--yes", "serve", "-s", "dist", "-p", PORT], {
    stdio: "ignore",
    detached: true,
    shell: process.platform === "win32",
  });
}

const ready = await waitForServer(BASE);
if (!ready) {
  console.error(`Server never became ready at ${BASE}`);
  if (server) process.kill(-server.pid, "SIGKILL");
  process.exit(1);
}

console.log("→ Running Lighthouse CI…");
const lhStatus = run("npx", ["--yes", "@lhci/cli@0.15.x", "autorun", "--config=./lighthouserc.json"]);

if (server) {
  try {
    process.kill(-server.pid, "SIGKILL");
  } catch {
    /* already gone */
  }
}

if (lhStatus !== 0 && reportOnly) {
  console.log(`Report-only mode: Lighthouse exit ${lhStatus} ignored.`);
  process.exit(0);
}

console.log(lhStatus === 0 ? "PERF BUDGET: PASS" : "PERF BUDGET: FAIL");
process.exit(lhStatus);
