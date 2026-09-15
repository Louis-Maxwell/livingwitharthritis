#!/usr/bin/env node
/**
 * AI identity validator.
 *
 * Asserts that the public AI/crawler guidance files carry the verified
 * charity identity (registration 1218461, UK national / remote support,
 * independence from Arthritis UK, clinician HCPC PH128483) and that robots.txt keeps
 * Bytespider explicitly disallowed.
 *
 * Matches the style of scripts/check-redirects.mjs — ESM, no deps,
 * reads static files from the repo, exits non-zero on any failure.
 */
import { readFileSync } from 'node:fs';

const files = {
  robots: 'public/robots.txt',
  llms: 'public/llms.txt',
  ai: 'public/ai.txt',
};

const failures = [];
const contents = {};

for (const [key, path] of Object.entries(files)) {
  try {
    contents[key] = readFileSync(path, 'utf8');
  } catch {
    failures.push(`${path}: file missing`);
    contents[key] = '';
  }
}

// --- robots.txt: Bytespider block must contain its own Disallow: / ----
// Split on User-agent lines so a later wildcard Allow cannot rescue a
// missing/explicitly-allowed Bytespider block.
const robotsText = contents.robots;
if (robotsText) {
  const blocks = [];
  let current = null;
  for (const line of robotsText.split(/\r?\n/)) {
    const match = line.match(/^\s*User-agent:\s*(.+?)\s*$/i);
    if (match) {
      current = { agent: match[1].toLowerCase(), rules: [] };
      blocks.push(current);
    } else if (current) {
      current.rules.push(line);
    }
  }

  const bytespider = blocks.find((b) => b.agent === 'bytespider');
  if (!bytespider) {
    failures.push('public/robots.txt: no Bytespider User-agent block found');
  } else {
    const disallowRoot = bytespider.rules.some((r) =>
      /^\s*Disallow:\s*\/\s*$/i.test(r),
    );
    const allowRoot = bytespider.rules.some((r) =>
      /^\s*Allow:\s*\/\s*$/i.test(r),
    );
    if (!disallowRoot) {
      failures.push('public/robots.txt: Bytespider block missing Disallow: /');
    }
    if (allowRoot) {
      failures.push('public/robots.txt: Bytespider block contains Allow: /');
    }
  }
}

// --- llms.txt and ai.txt: required identity strings (case-insensitive) -
const requiredStrings = ['1218461', 'independent of Arthritis UK', 'PH128483'];
for (const key of ['llms', 'ai']) {
  const text = contents[key];
  if (!text) continue; // missing-file failure already recorded
  const lower = text.toLowerCase();
  for (const needle of requiredStrings) {
    if (!lower.includes(needle.toLowerCase())) {
      failures.push(`${files[key]}: missing "${needle}"`);
    }
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`✗ ${failure}`);
  process.exit(1);
}

console.log('✓ robots.txt, llms.txt and ai.txt identity checks passed (Bytespider Disallow: /).');
