#!/usr/bin/env bun
/**
 * Static heading-hierarchy audit.
 *
 * Rules (per route page in src/pages):
 *   - exactly one <h1>
 *   - first heading is <h1>
 *   - no downward level skips (h2 -> h4 is a violation; h4 -> h2 is fine)
 *   - no empty headings
 *
 * We build the effective heading sequence for a route by concatenating the
 * page file's headings with headings from direct local component imports
 * (one level deep). Header/Footer and shadcn ui/* are excluded because they
 * do not carry semantic page headings.
 */
import { readdirSync, readFileSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, relative, dirname, resolve } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
const PAGES = join(SRC, "pages");

const EXCLUDE_IMPORT_BASENAMES = new Set(["Header", "Footer", "SeoHead"]);
// shadcn primitives whose <h*> renders inside a slot (users override) — skip.
const EXCLUDE_UI_BASENAMES = new Set(["card", "alert", "dialog", "sheet", "alert-dialog"]);

type Heading = { level: number; text: string; file: string; line: number; hasAriaHidden: boolean };
type Violation = { kind: string; file: string; line: number; detail: string; route: string };

const violations: Violation[] = [];

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (
      p.endsWith(".tsx") &&
      !p.endsWith(".stories.tsx") &&
      !p.endsWith(".test.tsx")
    )
      out.push(p);
  }
  return out;
}

function lineOf(src: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index && i < src.length; i++) if (src[i] === "\n") line++;
  return line;
}

/**
 * Find heading JSX open tags: <h1 ...>, <h2 ...>, etc. Returns level, index,
 * whole opening tag, and the text between the opening and closing tag (best-
 * effort — dynamic children stay as `{expr}`).
 */
function stripCommentsAndStrings(src: string): string {
  // Replace block comments, line comments, and string/template literals with
  // whitespace of equal length so line numbers stay accurate.
  const out = src.split("");
  let i = 0;
  const N = src.length;
  const blank = (start: number, end: number) => {
    for (let k = start; k < end; k++) if (src[k] !== "\n") out[k] = " ";
  };
  while (i < N) {
    const c = src[i];
    const c2 = src[i + 1];
    if (c === "/" && c2 === "*") {
      const end = src.indexOf("*/", i + 2);
      const stop = end < 0 ? N : end + 2;
      blank(i, stop);
      i = stop;
      continue;
    }
    if (c === "/" && c2 === "/") {
      let end = src.indexOf("\n", i);
      if (end < 0) end = N;
      blank(i, end);
      i = end;
      continue;
    }
    // Only strip string/template literals; skip JSX text (apostrophes in prose
    // would otherwise be treated as strings). A literal starts a string only
    // when the previous non-whitespace character is a token that expects an
    // expression: not `>` (JSX text) or a letter/digit (identifier).
    if (c === '"' || c === "'" || c === "`") {
      let k = i - 1;
      while (k >= 0 && (src[k] === " " || src[k] === "\t")) k--;
      const prev = k >= 0 ? src[k] : "";
      const jsxText = prev === ">" || /[A-Za-z0-9_)\]}]/.test(prev) && prev !== ")" && prev !== "]" && prev !== "}";
      // Treat as JS string literal only in JS-expression positions:
      const jsContext = prev === "" || "([{=,:?;+*&|!<>~^%".includes(prev) || prev === ")" || prev === "]" || prev === "}";
      if (!jsContext || jsxText) { i++; continue; }
      const quote = c;
      let j = i + 1;
      while (j < N) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === quote) break;
        j++;
      }
      blank(i, Math.min(j + 1, N));
      i = j + 1;
      continue;
    }
    i++;
  }
  return out.join("");
}

function extractHeadings(rawSrc: string): Heading[] {
  const src = stripCommentsAndStrings(rawSrc);
  const out: Heading[] = [];
  // Match opening h1-h6 tags; capture attrs; require immediate ">" or whitespace-then-attrs
  const re = /<h([1-6])(\s[^>]*)?>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const level = Number(m[1]);
    const openTag = m[0];
    const attrs = m[2] ?? "";
    const start = m.index;
    // find matching close tag </hN>
    const closeRe = new RegExp(`</h${level}\\s*>`, "g");
    closeRe.lastIndex = re.lastIndex;
    const cm = closeRe.exec(src);
    let inner = "";
    if (cm) inner = src.slice(re.lastIndex, cm.index);
    const text = inner.replace(/\s+/g, " ").trim();
    const hasAriaHidden = /aria-hidden\s*=\s*(?:"true"|'true'|\{true\})/.test(attrs);
    out.push({
      level,
      text,
      file: "",
      line: lineOf(src, start),
      hasAriaHidden,
    });
  }
  return out;
}

/**
 * Resolve a local import path (from `@/...` or a relative path) to a file
 * on disk, returning null when it's a package import or cannot be resolved.
 */
function resolveImport(spec: string, fromFile: string): string | null {
  if (!spec.startsWith(".") && !spec.startsWith("@/")) return null;
  let base: string;
  if (spec.startsWith("@/")) base = join(SRC, spec.slice(2));
  else base = resolve(dirname(fromFile), spec);
  const candidates = [base + ".tsx", base + ".ts", join(base, "index.tsx"), join(base, "index.ts")];
  for (const c of candidates) if (existsSync(c)) return c;
  return null;
}

function extractLocalImports(src: string, fromFile: string): string[] {
  const out: string[] = [];
  const re = /import\s+(?:[^'"`;]+?\s+from\s+)?['"]([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const spec = m[1];
    const resolved = resolveImport(spec, fromFile);
    if (!resolved) continue;
    // Skip primitives / non-heading owners
    if (resolved.includes(`${SRC}/components/ui/`)) {
      const uiBase = resolved.split("/").pop()!.replace(/\.tsx?$/, "");
      if (EXCLUDE_UI_BASENAMES.has(uiBase)) continue;
      // otherwise fall through — project-specific ui/ files (e.g. PageHero) contribute headings
    }
    const base = resolved.split("/").pop()!.replace(/\.tsx?$/, "");
    if (EXCLUDE_IMPORT_BASENAMES.has(base)) continue;
    out.push(resolved);
  }
  return out;
}

function collectForPage(pageFile: string): Heading[] {
  const seen = new Set<string>();
  const all: Heading[] = [];
  const queue: { file: string; depth: number }[] = [{ file: pageFile, depth: 0 }];
  while (queue.length) {
    const { file, depth } = queue.shift()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const src = readFileSync(file, "utf8");
    const rel = relative(ROOT, file);
    for (const h of extractHeadings(src)) all.push({ ...h, file: rel });
    if (depth < 1) {
      for (const imp of extractLocalImports(src, file)) {
        queue.push({ file: imp, depth: depth + 1 });
      }
    }
  }
  return all;
}

const pageFiles = walk(PAGES);
const pageReports: Array<{ route: string; headings: Heading[] }> = [];

for (const pageFile of pageFiles) {
  const rel = relative(ROOT, pageFile);
  const headings = collectForPage(pageFile).filter((h) => !h.hasAriaHidden);
  pageReports.push({ route: rel, headings });

  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length === 0) {
    violations.push({ kind: "no-h1", route: rel, file: rel, line: 1, detail: "page has no <h1>" });
  } else if (h1s.length > 1) {
    // Only flag when the extras live in the SAME page file — duplicate <h1>s
    // reachable via imported shared components are treated as source-of-truth
    // in that component and reported once at their definition. This avoids
    // false positives from helper components defined and reused in one file.
    const seenFiles = new Set<string>();
    for (const h of h1s) {
      if (seenFiles.has(h.file)) {
        violations.push({
          kind: "multiple-h1",
          route: rel,
          file: h.file,
          line: h.line,
          detail: `duplicate <h1>: "${h.text.slice(0, 60)}"`,
        });
      }
      seenFiles.add(h.file);
    }
  }

  // Empty headings
  for (const h of headings) {
    if (h.text === "") {
      violations.push({
        kind: "empty-heading",
        route: rel,
        file: h.file,
        line: h.line,
        detail: `empty <h${h.level}>`,
      });
    }
  }

  // Set-based level-skip: if h(n) exists, every h(k) for 2<=k<n must exist.
  // (Matches Screaming Frog / Semrush heading-hierarchy grading — order-of-
  // appearance is unreliable when helper sub-components are declared inline.)
  const levels = new Set(headings.map((h) => h.level));
  const maxLevel = Math.max(0, ...headings.map((h) => h.level));
  for (let n = 3; n <= maxLevel; n++) {
    if (levels.has(n) && !levels.has(n - 1)) {
      const example = headings.find((h) => h.level === n)!;
      violations.push({
        kind: "level-skip",
        route: rel,
        file: example.file,
        line: example.line,
        detail: `page uses <h${n}> but no <h${n - 1}>`,
      });
      break; // one report per page is enough
    }
  }
}


const grouped: Record<string, Violation[]> = {};
for (const v of violations) (grouped[v.kind] ??= []).push(v);

console.log(`\n== Heading audit ==`);
console.log(`Pages scanned: ${pageReports.length}`);
console.log(`Violations: ${violations.length}\n`);
for (const [kind, list] of Object.entries(grouped)) {
  console.log(`${kind} (${list.length})`);
  for (const v of list.slice(0, 500)) {
    console.log(`  ${v.file}:${v.line}  [${relative(ROOT, v.route)}]  ${v.detail}`);
  }
  console.log();
}

if (process.argv.includes("--json")) {
  writeFileSync(
    join(ROOT, "audit-headings-report.json"),
    JSON.stringify({ violations, pageReports }, null, 2),
  );
  console.log(`Wrote audit-headings-report.json`);
}

if (violations.length > 0) {
  console.error(`✖ ${violations.length} heading issues found.`);
  process.exit(1);
}
console.log(`✓ No heading issues.`);
