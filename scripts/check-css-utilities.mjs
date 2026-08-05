#!/usr/bin/env node
/**
 * CSS utility guard.
 *
 * Two passes:
 *   1. Static scan of src/ for risky Tailwind utility patterns — chiefly
 *      bare arbitrary duration/delay/easing values (`duration-[1200ms]`),
 *      which Tailwind v3 flags as ambiguous because they can compile to
 *      either a transition or an animation duration.
 *   2. Tailwind CLI compile (best effort) — any "ambiguous", "does not
 *      exist" or "Unnecessary" warning on stderr fails the check.
 *
 * Usage:
 *   node scripts/check-css-utilities.mjs
 *   node scripts/check-css-utilities.mjs --json
 *   node scripts/check-css-utilities.mjs --strict   # colour-token warnings fail too
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, 'src');
const REPORT_DIR = join(ROOT, '.preflight-reports');

const argv = process.argv.slice(2);
const wantsJson = argv.includes('--json');
// Colour-token violations are reported as warnings for now; flip this (or
// pass --strict) once the existing occurrences have been triaged.
const COLOUR_TOKENS_FAIL = argv.includes('--strict');

const SOURCE_EXTENSIONS = ['.ts', '.tsx', '.css'];
const IGNORED_DIRS = new Set(['node_modules', 'dist', '.git', 'generated']);

/** Patterns that must never appear in source. */
const ERROR_RULES = [
  {
    id: 'ambiguous-duration',
    // duration-[1200ms] but NOT [transition-duration:1200ms]
    pattern: /(?<![\w:[-])duration-\[[^\]]+\]/g,
    message:
      'Ambiguous Tailwind utility. Use [transition-duration:...] or [animation-duration:...] instead.',
  },
  {
    id: 'ambiguous-delay',
    pattern: /(?<![\w:[-])delay-\[[^\]]+\]/g,
    message:
      'Ambiguous Tailwind utility. Use [transition-delay:...] or [animation-delay:...] instead.',
  },
  {
    id: 'ambiguous-ease',
    pattern: /(?<![\w:[-])ease-\[[^\]]+\]/g,
    message:
      'Ambiguous Tailwind utility. Use [transition-timing-function:...] or [animation-timing-function:...] instead.',
  },
];

/** Patterns that bypass the design tokens — warnings for now. */
const WARN_RULES = [
  {
    id: 'hardcoded-colour',
    pattern: /(?<![\w:[-])(?:bg|text|border)-(?:white|black|\[#[0-9a-fA-F]{3,8}\])/g,
    message: 'Hardcoded colour bypasses the design tokens — use a semantic token instead.',
  },
];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      walk(full, out);
    } else if (SOURCE_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

function scanFile(file, rules, severity, sink) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, index) => {
    for (const rule of rules) {
      rule.pattern.lastIndex = 0;
      let match;
      while ((match = rule.pattern.exec(line)) !== null) {
        sink.push({
          severity,
          rule: rule.id,
          file: relative(ROOT, file),
          line: index + 1,
          match: match[0],
          message: rule.message,
        });
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Pass 1 — static scan
// ---------------------------------------------------------------------------
const findings = [];
if (existsSync(SRC)) {
  for (const file of walk(SRC)) {
    scanFile(file, ERROR_RULES, 'error', findings);
    scanFile(file, WARN_RULES, COLOUR_TOKENS_FAIL ? 'error' : 'warning', findings);
  }
}

// ---------------------------------------------------------------------------
// Pass 2 — Tailwind CLI compile (best effort)
// ---------------------------------------------------------------------------
const tailwindBin = join(ROOT, 'node_modules', '.bin', 'tailwindcss');
let tailwindState = 'skipped';
if (existsSync(tailwindBin)) {
  const inputPath = join(ROOT, '.preflight-reports', '.tw-input.css');
  mkdirSync(REPORT_DIR, { recursive: true });
  writeFileSync(inputPath, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
  const r = spawnSync(tailwindBin, ['-i', inputPath, '-o', join(REPORT_DIR, '.tw-output.css')], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  const stderr = `${r.stderr ?? ''}`;
  const suspicious = stderr
    .split('\n')
    .filter((l) => /ambiguous|does not exist|Unnecessary/i.test(l))
    .map((l) => l.trim())
    .filter(Boolean);
  tailwindState = suspicious.length ? 'warnings' : 'clean';
  for (const line of suspicious) {
    findings.push({
      severity: 'error',
      rule: 'tailwind-cli',
      file: 'tailwind build',
      line: 0,
      match: '',
      message: line,
    });
  }
} else {
  tailwindState = 'skipped (tailwindcss binary not found)';
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
const errors = findings.filter((f) => f.severity === 'error');
const warnings = findings.filter((f) => f.severity === 'warning');

function printGroup(list, label) {
  if (!list.length) return;
  console.log(`\n${label} (${list.length})`);
  const byFile = new Map();
  for (const f of list) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, items] of byFile) {
    console.log(`  ${file}`);
    for (const item of items) {
      const where = item.line ? `:${item.line}` : '';
      const what = item.match ? ` \`${item.match}\`` : '';
      console.log(`    ${file}${where}${what} — ${item.message}`);
    }
  }
}

console.log('CSS utility check');
console.log(`  Tailwind CLI pass: ${tailwindState}`);
printGroup(errors, 'ERRORS');
printGroup(warnings, 'WARNINGS (non-failing)');

if (wantsJson) {
  mkdirSync(REPORT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const path = join(REPORT_DIR, `css-utilities-${stamp}.json`);
  writeFileSync(
    path,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        ok: errors.length === 0,
        tailwindState,
        errors,
        warnings,
      },
      null,
      2,
    ),
  );
  console.log(`\nReport: ${path}`);
}

if (errors.length) {
  console.log('\nCSS UTILITY CHECK: FAIL');
  process.exit(1);
}
console.log('\nCSS UTILITY CHECK: PASS');
