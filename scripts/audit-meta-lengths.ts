#!/usr/bin/env bun
/**
 * Static meta-length audit.
 *
 * Scans every .tsx page/component for:
 *   - <SeoHead title="…" description="…" includeSiteName={?}>
 *   - <title>literal</title>
 *   - <meta name="description" content="literal" />
 *
 * Reports any composed title > 60 chars or description outside 120–160.
 * Dynamic (`${…}`) values are skipped — those are covered by render-time
 * enforcement in src/lib/seoMeta.ts.
 *
 * Exit code: non-zero when any violation is found.
 */
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

const SITE_SUFFIX = " | Living With Arthritis UK";
const MAX_TITLE = 60;
const MAX_DESC = 160;
const MIN_DESC = 120;

type Finding = {
  file: string;
  kind: "title" | "description";
  length: number;
  limit: string;
  value: string;
};

const files = globSync("src/**/*.tsx");
const findings: Finding[] = [];

const seoHeadRe =
  /<SeoHead\b([\s\S]*?)\/?>/g;
const attrRe = (name: string) =>
  new RegExp(`\\b${name}\\s*=\\s*(?:\\{\\s*)?(?:"((?:[^"\\\\]|\\\\.)*)"|'((?:[^'\\\\]|\\\\.)*)'|\`([^\`$]*)\`)`);
const titleTagRe = /<title>\s*([^<{`][^<{]*?)\s*<\/title>/g;
const descMetaRe =
  /<meta\s+name=["']description["']\s+content=(?:\{\s*)?["']([^"']+)["']/g;

function unescape(s: string): string {
  return s.replace(/\\"/g, '"').replace(/\\'/g, "'");
}

for (const file of files) {
  const src = readFileSync(file, "utf8");

  // SeoHead usage
  for (const m of src.matchAll(seoHeadRe)) {
    const attrs = m[1];
    const titleMatch = attrs.match(attrRe("title"));
    const descMatch = attrs.match(attrRe("description"));
    const includeSiteName =
      !/includeSiteName\s*=\s*\{\s*false\s*\}/.test(attrs);
    const isNoindex = /\bnoindex(\s|=|\/|>)/.test(attrs);

    if (titleMatch) {
      const raw = unescape(titleMatch[1] || titleMatch[2] || titleMatch[3] || "");
      const composed = includeSiteName ? `${raw}${SITE_SUFFIX}` : raw;
      if (composed.length > MAX_TITLE) {
        findings.push({
          file,
          kind: "title",
          length: composed.length,
          limit: `> ${MAX_TITLE}`,
          value: composed,
        });
      }
    }
    if (descMatch && !isNoindex) {
      const raw = unescape(descMatch[1] || descMatch[2] || descMatch[3] || "");
      if (raw.length > MAX_DESC || raw.length < MIN_DESC) {
        findings.push({
          file,
          kind: "description",
          length: raw.length,
          limit: raw.length > MAX_DESC ? `> ${MAX_DESC}` : `< ${MIN_DESC}`,
          value: raw,
        });
      }
    }
  }


  // Direct <title>…</title>
  for (const m of src.matchAll(titleTagRe)) {
    const raw = m[1].trim();
    if (!raw) continue;
    if (raw.length > MAX_TITLE) {
      findings.push({
        file,
        kind: "title",
        length: raw.length,
        limit: `> ${MAX_TITLE}`,
        value: raw,
      });
    }
  }

  // Direct <meta name="description" content="…" />
  for (const m of src.matchAll(descMetaRe)) {
    const raw = m[1].trim();
    if (raw.length > MAX_DESC || raw.length < MIN_DESC) {
      findings.push({
        file,
        kind: "description",
        length: raw.length,
        limit: raw.length > MAX_DESC ? `> ${MAX_DESC}` : `< ${MIN_DESC}`,
        value: raw,
      });
    }
  }
}

if (findings.length === 0) {
  console.log(`[seo:meta-lengths] PASS — all static titles ≤ ${MAX_TITLE} chars, descriptions ${MIN_DESC}–${MAX_DESC} chars.`);
  process.exit(0);
}

console.log(`[seo:meta-lengths] FAIL — ${findings.length} violation(s):\n`);
for (const f of findings) {
  console.log(`  ${f.file}`);
  console.log(`    ${f.kind} (${f.length} chars, ${f.limit}): "${f.value}"`);
}
process.exit(1);
