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
import { delimiter, join, resolve } from "node:path";
import { homedir, platform } from "node:os";

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
  // Uses the same resolver as `deno check` so version probing benefits from
  // the PATH refresh + filesystem probe fallback.
  return getInstalledDenoVersionResolved().version;
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


// Recognized alternate entrypoint filenames (checked in addition to index.ts).
// index.ts always comes first to preserve existing behavior/ordering.
const ENTRYPOINT_CANDIDATES = ["index.ts", "main.ts", "mod.ts", "handler.ts", "server.ts"];

function readConfigEntrypoint(name) {
  // Best-effort parse of supabase/config.toml for a per-function `entrypoint = "..."`.
  const cfg = join(ROOT, "supabase", "config.toml");
  if (!existsSync(cfg)) return null;
  const txt = readFileSync(cfg, "utf8");
  const re = new RegExp(
    `\\[functions\\.${name.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}\\]([\\s\\S]*?)(?=\\n\\[|$)`,
  );
  const block = txt.match(re);
  if (!block) return null;
  const ep = block[1].match(/^\s*entrypoint\s*=\s*"([^"]+)"/m);
  if (!ep) return null;
  // Resolve relative to project root (Supabase convention).
  return resolve(ROOT, ep[1]);
}

function discoverEntrypoints(name) {
  const dir = join(FUNCTIONS_DIR, name);
  const found = [];
  for (const candidate of ENTRYPOINT_CANDIDATES) {
    const full = join(dir, candidate);
    if (existsSync(full)) found.push({ label: candidate, path: full });
  }
  const cfgEntry = readConfigEntrypoint(name);
  if (cfgEntry && existsSync(cfgEntry) && !found.some((f) => f.path === cfgEntry)) {
    found.push({ label: `config.toml:${cfgEntry.replace(ROOT + "/", "")}`, path: cfgEntry });
  }
  return found;
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
      // Include any function with at least one recognized entrypoint.
      return discoverEntrypoints(name).length > 0;
    })
    .filter((name) => !argFn || name === argFn);
}

// Env vars relevant to `deno check` behaviour. Captured for failure reports so
// engineers can reproduce the exact invocation. Anything secret-looking is
// redacted in `captureRelevantEnv` below.
const RELEVANT_ENV_KEYS = [
  "PATH",
  "HOME",
  "PWD",
  "SHELL",
  "DENO_DIR",
  "DENO_INSTALL",
  "DENO_INSTALL_ROOT",
  "DENO_NO_UPDATE_CHECK",
  "DENO_NO_PACKAGE_JSON",
  "DENO_FUTURE",
  "DENO_TLS_CA_STORE",
  "DENO_CERT",
  "DENO_AUTH_TOKENS", // value redacted
  "NPM_CONFIG_REGISTRY",
  "NODE_EXTRA_CA_CERTS",
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "NO_PROXY",
  "CI",
  "GITHUB_ACTIONS",
  "RUNNER_OS",
];

const SECRET_ENV_KEYS = new Set(["DENO_AUTH_TOKENS"]);

function captureRelevantEnv() {
  const out = {};
  for (const key of RELEVANT_ENV_KEYS) {
    const val = process.env[key];
    if (val === undefined) continue;
    out[key] = SECRET_ENV_KEYS.has(key) ? "***redacted***" : val;
  }
  return out;
}

function formatSpawnCommand(cmd, args) {
  const quote = (s) => (/[\s"'$`\\]/.test(s) ? `'${s.replace(/'/g, "'\\''")}'` : s);
  return [cmd, ...args].map(quote).join(" ");
}

// ---------------------------------------------------------------------------
// Deno binary resolution + automatic spawn-failure retry.
//
// In CI and on contributor machines `deno` may not be on PATH even though it's
// installed (common on macOS via `~/.deno/bin`, Homebrew on Apple Silicon, or
// the `denoland/setup-deno` action which writes to a runner-specific dir).
// When `spawnSync('deno', ...)` fails with ENOENT, we:
//   1) refresh PATH from the shell's login profile (best-effort), and
//   2) probe a list of well-known install locations,
// then retry the spawn against the first working absolute path. Successful
// resolutions are cached so we only pay the discovery cost once per run.
// ---------------------------------------------------------------------------

const COMMON_DENO_PATHS = (() => {
  const home = homedir();
  const isWin = platform() === "win32";
  const exe = isWin ? "deno.exe" : "deno";
  const candidates = [
    process.env.DENO_INSTALL_ROOT && join(process.env.DENO_INSTALL_ROOT, "bin", exe),
    process.env.DENO_INSTALL && join(process.env.DENO_INSTALL, "bin", exe),
    join(home, ".deno", "bin", exe),
    join(home, ".local", "bin", exe),
    join(home, "bin", exe),
    "/opt/homebrew/bin/deno", // Apple Silicon Homebrew
    "/usr/local/bin/deno", // Intel Homebrew / generic
    "/usr/bin/deno",
    "/snap/bin/deno",
    isWin && process.env.USERPROFILE && join(process.env.USERPROFILE, ".deno", "bin", "deno.exe"),
    isWin && "C:/Program Files/deno/deno.exe",
  ];
  return candidates.filter(Boolean);
})();

function refreshPathFromShell() {
  // Best-effort: ask an interactive login shell for its PATH. Skipped on
  // Windows (no portable equivalent) and silently ignored on failure.
  if (platform() === "win32") return null;
  const shell = process.env.SHELL || "/bin/bash";
  const r = spawnSync(shell, ["-l", "-c", "echo $PATH"], { encoding: "utf8", timeout: 3000 });
  if (r.error || r.status !== 0) return null;
  const fresh = (r.stdout || "").trim();
  return fresh || null;
}

let resolvedDenoBin = null; // cached absolute path or "deno"
let denoResolutionLog = []; // diagnostics surfaced into reports on failure

function findDenoBinary() {
  if (resolvedDenoBin) return resolvedDenoBin;

  // Probe common install locations.
  for (const p of COMMON_DENO_PATHS) {
    if (existsSync(p)) {
      resolvedDenoBin = p;
      denoResolutionLog.push(`resolved deno via filesystem probe: ${p}`);
      return resolvedDenoBin;
    }
  }

  // Last resort: refresh PATH from a login shell and look again via spawn.
  const freshPath = refreshPathFromShell();
  if (freshPath && freshPath !== process.env.PATH) {
    process.env.PATH = freshPath;
    denoResolutionLog.push("refreshed PATH from login shell");
    const r = spawnSync("deno", ["--version"], { encoding: "utf8" });
    if (!r.error && r.status === 0) {
      resolvedDenoBin = "deno";
      return resolvedDenoBin;
    }
  }

  return null; // unresolved — caller will surface a clear error
}

function isSpawnFailure(result) {
  return Boolean(result.error) && (result.error.code === "ENOENT" || result.error.code === "EACCES");
}

function spawnDeno(args, opts = {}) {
  // First attempt with whatever's on PATH.
  let attempts = [];
  let bin = "deno";
  let r = spawnSync(bin, args, { encoding: "utf8", ...opts });
  attempts.push({ bin, code: r.error?.code ?? null, status: r.status });

  if (isSpawnFailure(r)) {
    const resolved = findDenoBinary();
    if (resolved) {
      bin = resolved;
      r = spawnSync(bin, args, { encoding: "utf8", ...opts });
      attempts.push({ bin, code: r.error?.code ?? null, status: r.status });
    }
  }

  return { result: r, bin, attempts };
}

function getInstalledDenoVersionResolved() {
  const { result, bin } = spawnDeno(["--version"]);
  if (result.error || result.status !== 0) return { version: null, bin };
  const match = result.stdout.match(/^deno\s+(\d+\.\d+\.\d+)/);
  return { version: match ? match[1] : null, bin };
}

function checkEntrypoint(entryPath) {
  const denoArgs = ["check", entryPath];
  const cwd = ROOT;
  const env = captureRelevantEnv();
  const started = Date.now();
  const { result, bin, attempts } = spawnDeno(denoArgs, { cwd });
  const durationMs = Date.now() - started;
  const spawnCommand = formatSpawnCommand(bin, denoArgs);
  const retryNotes =
    attempts.length > 1
      ? `retried after spawn failure (initial code=${attempts[0].code}); resolved binary=${bin}`
      : null;

  if (result.error) {
    const probed = COMMON_DENO_PATHS.join("\n  - ");
    return {
      ok: false,
      durationMs,
      stdout: "",
      stderr:
        `Failed to spawn deno: ${result.error.message}.\n` +
        `Tried PATH refresh and probed common locations:\n  - ${probed}\n` +
        `Install Deno (https://deno.land) or set DENO_INSTALL_ROOT.`,
      exitCode: -1,
      spawnCommand,
      cwd,
      env,
      spawnAttempts: attempts,
      retryNotes,
    };
  }
  return {
    ok: result.status === 0,
    durationMs,
    stdout: result.stdout?.trim() ?? "",
    stderr: result.stderr?.trim() ?? "",
    exitCode: result.status ?? -1,
    spawnCommand,
    cwd,
    env,
    spawnAttempts: attempts,
    retryNotes,
  };
}

// Functions where we surface extra import-resolution diagnostics inline
// (in addition to the always-on report-file detail).
const VERBOSE_FUNCTIONS = new Set(["process-donation", "process-email-queue"]);

/**
 * Parse `deno check` stderr to extract missing npm specifiers and the file/line
 * that triggered the failure. Handles the common error shapes emitted by Deno 1.x/2.x:
 *
 *   error: Relative import path "foo" not prefixed with / or ./ or ../
 *   error: Module not found "npm:stripe@14.21.0".
 *   error: Cannot resolve module "npm:@supabase/supabase-js@2.45.0" from "file:///.../index.ts".
 *   error: npm package 'stripe' does not exist.
 *     at file:///path/to/index.ts:3:8
 */
function parseDenoCheckErrors(stderr) {
  if (!stderr) return [];
  const findings = [];
  const lines = stderr.split(/\r?\n/);

  // Regexes for the various forms of "missing module" Deno emits.
  const npmSpecRe = /(npm:(?:@[^/\s"'@]+\/)?[^@\s"'<>]+(?:@[^\s"'<>]+)?)/;
  const moduleNotFoundRe = /(?:Module not found|Cannot (?:resolve|load) module|Relative import path|Import .+? could not be resolved|Could not (?:find|resolve)) ["']?([^"'\s]+)["']?/i;
  const npmPkgRe = /npm package ['"]([^'"]+)['"] does not exist/i;
  const fromFileRe = /from ["']?(file:\/\/[^\s"']+|\.\.?\/[^\s"']+)["']?/i;
  const atLocRe = /at\s+(file:\/\/[^\s:]+):(\d+):(\d+)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/^error:/i.test(line) && !/Cannot find module/i.test(line)) continue;

    const finding = { rawLine: line.trim() };

    const npmMatch = line.match(npmSpecRe);
    if (npmMatch) {
      finding.specifier = npmMatch[1];
      const atIdx = npmMatch[1].lastIndexOf("@");
      const hasVersion = atIdx > 4; // skip leading "npm:@" scope
      finding.package = hasVersion ? npmMatch[1].slice(4, atIdx) : npmMatch[1].slice(4);
      finding.version = hasVersion ? npmMatch[1].slice(atIdx + 1) : "(unpinned)";
    } else {
      const pkg = line.match(npmPkgRe);
      if (pkg) {
        finding.package = pkg[1];
        finding.version = "(unresolved)";
        finding.specifier = `npm:${pkg[1]}`;
      } else {
        const mod = line.match(moduleNotFoundRe);
        if (mod) finding.specifier = mod[1];
      }
    }

    const fromMatch = line.match(fromFileRe);
    if (fromMatch) finding.importedFrom = fromMatch[1];

    // Look ahead a couple lines for an "at file://...:line:col" location.
    for (let j = i; j < Math.min(i + 4, lines.length); j++) {
      const loc = lines[j].match(atLocRe);
      if (loc) {
        finding.location = `${loc[1]}:${loc[2]}:${loc[3]}`;
        break;
      }
    }

    if (finding.specifier || finding.package) findings.push(finding);
  }

  return findings;
}

function formatFindings(findings, indent = "    ") {
  return findings
    .map((f) => {
      const parts = [];
      if (f.package) parts.push(`package=${f.package} version=${f.version}`);
      if (f.specifier && !f.package) parts.push(`specifier=${f.specifier}`);
      if (f.importedFrom) parts.push(`imported from ${f.importedFrom}`);
      if (f.location) parts.push(`at ${f.location}`);
      return `${indent}• ${parts.join(" | ") || f.rawLine}`;
    })
    .join("\n");
}

function checkFunction(name) {
  const entrypoints = discoverEntrypoints(name);
  const checks = entrypoints.map((ep) => {
    const r = checkEntrypoint(ep.path);
    const findings = r.ok ? [] : parseDenoCheckErrors(r.stderr);
    return { entrypoint: ep.label, path: ep.path, findings, ...r };
  });
  const ok = checks.every((c) => c.ok);
  const durationMs = checks.reduce((sum, c) => sum + c.durationMs, 0);
  return { name, ok, durationMs, checks };
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
    const eps = r.checks.map((c) => c.entrypoint).join(", ");
    lines.push(`[${status}] ${r.name}  (${r.durationMs}ms, entrypoints: ${eps})`);
    // Show per-entrypoint detail when more than just index.ts is present.
    if (r.checks.length > 1) {
      for (const c of r.checks) {
        const s = c.ok ? "pass" : "fail";
        lines.push(`         └─ ${c.entrypoint}: ${s} (${c.durationMs}ms, exit=${c.exitCode})`);
      }
    }
  }
  lines.push("");

  if (failed.length > 0) {
    lines.push("FAILURES (details)");
    lines.push("-".repeat(72));
    for (const r of failed) {
      for (const c of r.checks.filter((c) => !c.ok)) {
        lines.push(`### ${r.name} :: ${c.entrypoint}`);
        lines.push(`path: ${c.path}`);
        lines.push(`exit code: ${c.exitCode}`);
        lines.push("--- reproduction ---");
        lines.push(`cwd: ${c.cwd ?? "(unknown)"}`);
        lines.push(`command: ${c.spawnCommand ?? "(unknown)"}`);
        if (c.env && Object.keys(c.env).length > 0) {
          lines.push("env:");
          for (const [k, v] of Object.entries(c.env)) {
            lines.push(`  ${k}=${v}`);
          }
        } else {
          lines.push("env: (none of the tracked keys were set)");
        }
        if (c.findings && c.findings.length > 0) {
          lines.push("--- missing imports / unresolved specifiers ---");
          lines.push(formatFindings(c.findings, "  "));
        }
        if (c.stdout) {
          lines.push("--- stdout ---");
          lines.push(c.stdout);
        }
        if (c.stderr) {
          lines.push("--- stderr ---");
          lines.push(c.stderr);
        }
        lines.push("");
      }
    }
  }

  return lines.join("\n");
}

function main() {
  const requiredVersion = readRequiredDenoVersion();
  if (skipVersionCheck) {
    console.log("⚠️  --skip-version-check passed; not enforcing Deno version.");
  } else {
    enforceDenoVersion();
  }
  const installedVersion = getInstalledDenoVersion();

  const fns = listFunctions();
  if (fns.length === 0) {
    console.error(argFn ? `Function "${argFn}" not found.` : "No functions to check.");
    process.exit(1);
  }

  console.log(`Preflight: type-checking ${fns.length} edge function(s)...\n`);

  const results = [];
  for (const name of fns) {
    const r = checkFunction(name);
    const eps = r.checks.map((c) => c.entrypoint).join(", ");
    process.stdout.write(`  ${name} [${eps}] ... `);
    results.push(r);
    console.log(r.ok ? `ok (${r.durationMs}ms)` : `FAIL (${r.durationMs}ms)`);

    // Inline diagnostics for the high-signal functions so devs don't need to
    // open the report file to see what's missing.
    if (!r.ok && VERBOSE_FUNCTIONS.has(name)) {
      for (const c of r.checks.filter((c) => !c.ok)) {
        console.log(`    ↳ ${c.entrypoint} (exit=${c.exitCode}):`);
        if (c.findings && c.findings.length > 0) {
          console.log(formatFindings(c.findings, "      "));
        } else {
          // No structured finding parsed — show first error line from stderr.
          const firstErr = (c.stderr || "")
            .split(/\r?\n/)
            .find((l) => /^error:/i.test(l));
          if (firstErr) console.log(`      • ${firstErr.trim()}`);
        }
      }
    }
  }

  const ts = timestamp();
  mkdirSync(REPORT_DIR, { recursive: true });
  const reportPath = join(REPORT_DIR, `preflight-${ts}.log`);
  const jsonPath = join(REPORT_DIR, `preflight-${ts}.json`);

  writeFileSync(reportPath, buildReport(results, ts, installedVersion, requiredVersion), "utf8");
  writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        deno: { installed: installedVersion, required: requiredVersion },
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
