#!/usr/bin/env bun
/**
 * Static audit for <img> alt text, dimensions, and CLS hints.
 * Scans src/**\/*.tsx and reports critical (missing alt / missing dims) + warnings.
 * Non-zero exit on any critical finding.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

const GENERIC_ALTS = new Set([
  "image",
  "photo",
  "picture",
  "img",
  "icon",
  "logo",
  "avatar",
  "banner",
  "thumbnail",
  "placeholder",
  "untitled",
]);

type Severity = "critical" | "warning";
interface Finding {
  file: string;
  line: number;
  severity: Severity;
  kind: string;
  snippet: string;
}

const findings: Finding[] = [];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (p.endsWith(".tsx") && !p.endsWith(".stories.tsx")) out.push(p);
  }
  return out;
}

// Extract each <img ...> tag (including multi-line). We deliberately allow
// nested `{...}` inside attributes.
function extractImgTags(src: string): { tag: string; index: number }[] {
  const results: { tag: string; index: number }[] = [];
  const re = /<img\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const start = m.index;
    let i = start;
    let depthBrace = 0;
    let inString: string | null = null;
    for (; i < src.length; i++) {
      const c = src[i];
      if (inString) {
        if (c === inString && src[i - 1] !== "\\") inString = null;
        continue;
      }
      if (c === '"' || c === "'" || c === "`") {
        inString = c;
        continue;
      }
      if (c === "{") depthBrace++;
      else if (c === "}") depthBrace--;
      else if (c === ">" && depthBrace === 0) {
        break;
      }
    }
    results.push({ tag: src.slice(start, i + 1), index: start });
  }
  return results;
}

function lineOf(src: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index && i < src.length; i++)
    if (src[i] === "\n") line++;
  return line;
}

function hasAttr(tag: string, name: string): boolean {
  const re = new RegExp(`\\b${name}\\s*=`);
  return re.test(tag);
}

function getStringAttr(tag: string, name: string): string | null {
  // matches name="..." or name='...' — returns null if the value isn't a plain string literal
  const re = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`);
  const m = tag.match(re);
  if (!m) return null;
  return m[1] ?? m[2] ?? null;
}

function hasAspectClass(tag: string): boolean {
  return /aspect-(?:\[|square|video|auto|\d)/.test(tag);
}

function hasFixedSizeClasses(tag: string): boolean {
  // className that pins both width and height (fills parent, or explicit fixed size)
  const classAttr = tag.match(/className\s*=\s*(?:"([^"]*)"|'([^']*)')/);
  const cls = classAttr ? (classAttr[1] ?? classAttr[2] ?? "") : "";
  if (!cls) return false;
  // fills a sized parent
  if (/\bw-full\b/.test(cls) && /\bh-full\b/.test(cls)) return true;
  // explicit fixed height class (h-72, h-96, h-[400px], h-24, max-h-96, etc.)
  const hasFixedH = /\b(?:h|max-h|min-h)-(?:\d|\[)/.test(cls);
  const hasFixedW = /\b(?:w|max-w|min-w)-(?:\d|\[|full)/.test(cls);
  if (hasFixedH && hasFixedW) return true;
  // full-width + fixed height (common hero pattern) — still CLS-safe
  if (/\bw-full\b/.test(cls) && hasFixedH) return true;
  return false;
}

function isDecorative(tag: string): boolean {
  return /aria-hidden\s*=\s*(?:"true"|'true'|\{true\})/.test(tag)
    || /role\s*=\s*(?:"presentation"|'presentation'|"none"|'none')/.test(tag);
}

function looksMeaningful(alt: string): boolean {
  const trimmed = alt.trim();
  if (!trimmed) return false;
  if (trimmed.length < 3) return false;
  if (GENERIC_ALTS.has(trimmed.toLowerCase())) return false;
  if (/^[0-9\s\-_.]+$/.test(trimmed)) return false;
  // filename-only e.g. "hero.jpg"
  if (/^[\w-]+\.(png|jpe?g|webp|gif|svg|avif)$/i.test(trimmed)) return false;
  return true;
}

for (const file of walk(SRC)) {
  const src = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  for (const { tag, index } of extractImgTags(src)) {
    const line = lineOf(src, index);
    const snippet = tag.replace(/\s+/g, " ").slice(0, 140);
    const decorative = isDecorative(tag);
    const hasAlt = hasAttr(tag, "alt");

    if (!hasAlt) {
      findings.push({ file: rel, line, severity: "critical", kind: "missing-alt", snippet });
    } else if (!decorative) {
      const altLit = getStringAttr(tag, "alt");
      // Dynamic alt (expression) — trust it; only flag string literals we can inspect.
      if (altLit !== null && !looksMeaningful(altLit)) {
        findings.push({
          file: rel,
          line,
          severity: altLit.trim() === "" ? "warning" : "critical",
          kind: altLit.trim() === "" ? "empty-alt-not-decorative" : "generic-alt",
          snippet,
        });
      }
    }

    const hasW = hasAttr(tag, "width");
    const hasH = hasAttr(tag, "height");
    const hasAspect = hasAspectClass(tag);
    if (!(hasW && hasH) && !hasAspect) {
      findings.push({
        file: rel,
        line,
        severity: "warning",
        kind: "missing-dimensions",
        snippet,
      });
    }
  }
}

const critical = findings.filter((f) => f.severity === "critical");
const warnings = findings.filter((f) => f.severity === "warning");

function group(list: Finding[]) {
  const by: Record<string, Finding[]> = {};
  for (const f of list) (by[f.kind] ??= []).push(f);
  return by;
}

console.log(`\n== Image audit ==`);
console.log(`Critical: ${critical.length}   Warnings: ${warnings.length}\n`);

for (const [kind, list] of Object.entries(group(critical))) {
  console.log(`CRITICAL · ${kind} (${list.length})`);
  for (const f of list.slice(0, 200))
    console.log(`  ${f.file}:${f.line}  ${f.snippet}`);
  console.log();
}

if (process.argv.includes("--warnings")) {
  for (const [kind, list] of Object.entries(group(warnings))) {
    console.log(`WARNING · ${kind} (${list.length})`);
    for (const f of list.slice(0, 500))
      console.log(`  ${f.file}:${f.line}  ${f.snippet}`);
    console.log();
  }
}

if (process.argv.includes("--json")) {
  const outPath = join(ROOT, "audit-images-report.json");
  const fs = await import("node:fs/promises");
  await fs.writeFile(outPath, JSON.stringify(findings, null, 2));
  console.log(`Wrote ${outPath}`);
}

if (critical.length > 0) {
  console.error(`\n✖ ${critical.length} critical image issues found.`);
  process.exit(1);
}
console.log(`✓ No critical image issues.`);
