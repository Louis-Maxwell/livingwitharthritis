#!/usr/bin/env node
/**
 * Local smoke test for Supabase edge functions.
 *
 * Spawns target functions with Deno using an import map that swaps Supabase,
 * Stripe, and email SDKs for in-repo mocks, then sends a sample HTTP request
 * to each and asserts that the handler returns a non-error response without
 * crashing at import or runtime.
 *
 * Catches: missing imports, top-level await errors, signature/payload mishandling,
 * RPC misnames, and other runtime issues that pure `deno check` cannot find.
 *
 * Usage:
 *   node scripts/smoke-edge-functions.mjs
 *   node scripts/smoke-edge-functions.mjs --function process-donation
 */
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { connect as netConnect } from "node:net";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const FUNCTIONS_DIR = resolve(ROOT, "supabase/functions");
const REPORTS_DIR = resolve(ROOT, ".preflight-reports");
const IMPORT_MAP = resolve(__dirname, "smoke/import-map.json");

const ENV_BASE = {
  SUPABASE_URL: "http://127.0.0.1:54321",
  SUPABASE_ANON_KEY: "smoke-anon-key",
  SUPABASE_SERVICE_ROLE_KEY: "smoke-service-role-key",
  STRIPE_SECRET_KEY: "sk_test_smoke",
  STRIPE_WEBHOOK_SECRET: "whsec_smoke",
  RESEND_API_KEY: "re_smoke",
  LOVABLE_API_KEY: "lk_smoke",
  SUPABASE_JWKS: "{}",
};

/** Sample request payloads keyed by function name. */
const SAMPLES = {
  "process-donation": {
    method: "POST",
    headers: { "stripe-signature": "t=1,v1=smoke", "Content-Type": "application/json" },
    body: JSON.stringify({
      id: "evt_smoke",
      type: "checkout.session.completed",
      data: {
        object: {
          id: "cs_smoke",
          amount_total: 2500,
          currency: "gbp",
          payment_intent: "pi_smoke",
          customer_details: { email: "donor@example.com", name: "Smoke Donor", address: null },
          metadata: { fundType: "general", donorName: "Smoke Donor", giftAid: "no" },
        },
      },
    }),
    expectStatus: (s) => s >= 200 && s < 300,
  },
  "process-email-queue": {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    expectStatus: (s) => s >= 200 && s < 500, // empty queue => 200; 401 also acceptable if jwt-checked
  },
};

// Both edge functions bind to 8000 by default (std `serve` and `Deno.serve`),
// so we run them sequentially on the same port rather than trying to inject one.
const FN_PORT = 8000;

async function readDenoVersion() {
  const p = resolve(ROOT, ".deno-version");
  if (!existsSync(p)) return null;
  return (await readFile(p, "utf8")).trim();
}

function spawnDeno(args, env, cwd) {
  return spawn("deno", args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: ["ignore", "pipe", "pipe"],
  });
}

async function waitForReady(port, timeoutMs = 8000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      // Any TCP connection success means the server is listening.
      await new Promise((res, rej) => {
        const sock = netConnect(port, "127.0.0.1", () => {
          sock.end();
          res();
        });
        sock.on("error", rej);
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 150));
    }
  }
  return false;
}

async function smokeOne(fnName) {
  const fnDir = resolve(FUNCTIONS_DIR, fnName);
  const entry = resolve(fnDir, "index.ts");
  if (!existsSync(entry)) {
    return { fnName, ok: false, error: `Entrypoint not found: ${entry}` };
  }
  const sample = SAMPLES[fnName];
  if (!sample) {
    return { fnName, ok: false, error: `No smoke sample defined for ${fnName}` };
  }

  const port = await getFreePort();
  const env = { ...ENV_BASE, PORT: String(port), DENO_NO_PROMPT: "1" };

  const child = spawnDeno(
    [
      "run",
      "--allow-net",
      "--allow-env",
      "--allow-read",
      `--import-map=${IMPORT_MAP}`,
      "--no-lock",
      entry,
    ],
    env,
    ROOT,
  );

  let stdout = "";
  let stderr = "";
  child.stdout.on("data", (b) => (stdout += b.toString()));
  child.stderr.on("data", (b) => (stderr += b.toString()));

  const exited = new Promise((res) => child.on("exit", (code, signal) => res({ code, signal })));

  const ready = await Promise.race([
    waitForReady(port),
    exited.then(() => false),
  ]);

  let response = null;
  let requestError = null;
  if (ready) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/`, {
        method: sample.method,
        headers: sample.headers,
        body: sample.body,
      });
      response = { status: res.status, body: (await res.text()).slice(0, 500) };
    } catch (e) {
      requestError = e instanceof Error ? e.message : String(e);
    }
  }

  child.kill("SIGTERM");
  // Give it a moment to exit before forcing.
  await new Promise((r) => setTimeout(r, 200));
  if (!child.killed) child.kill("SIGKILL");

  const ok =
    ready &&
    !requestError &&
    response &&
    sample.expectStatus(response.status) &&
    !/SyntaxError|ReferenceError|TypeError/.test(stderr);

  return { fnName, ok, port, ready, response, requestError, stdout, stderr };
}

async function main() {
  const argv = process.argv.slice(2);
  const onlyIdx = argv.indexOf("--function");
  const only = onlyIdx >= 0 ? argv[onlyIdx + 1] : null;
  const targets = only ? [only] : Object.keys(SAMPLES);

  const denoVersion = await readDenoVersion();
  console.log(`Smoke testing ${targets.length} edge function(s) with Deno ${denoVersion ?? "(any)"}.\n`);

  const results = [];
  for (const fn of targets) {
    process.stdout.write(`• ${fn} ... `);
    const r = await smokeOne(fn);
    results.push(r);
    if (r.ok) {
      console.log(`PASS (HTTP ${r.response.status})`);
    } else {
      console.log("FAIL");
      if (r.error) console.log(`    error: ${r.error}`);
      if (r.requestError) console.log(`    request: ${r.requestError}`);
      if (r.response) console.log(`    response: ${r.response.status} ${r.response.body}`);
      if (r.stderr) console.log(`    stderr (tail):\n${r.stderr.split("\n").slice(-15).join("\n")}`);
    }
  }

  await mkdir(REPORTS_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const report = {
    timestamp: new Date().toISOString(),
    denoVersion,
    results: results.map((r) => ({
      fnName: r.fnName,
      ok: r.ok,
      status: r.response?.status ?? null,
      requestError: r.requestError ?? null,
      stderrTail: (r.stderr ?? "").split("\n").slice(-30).join("\n"),
    })),
  };
  const reportPath = resolve(REPORTS_DIR, `smoke-${stamp}.json`);
  await writeFile(reportPath, JSON.stringify(report, null, 2));
  console.log(`\nReport: ${reportPath}`);

  const failed = results.filter((r) => !r.ok);
  process.exit(failed.length === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
