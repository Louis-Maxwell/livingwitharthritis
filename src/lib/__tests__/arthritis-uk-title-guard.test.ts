/**
 * Guard: our titles and names must never read like "Arthritis UK" (the other charity).
 *
 * Fails when any page title, meta title, H1, og:title / twitter:title, site name or
 * organisation schema name:
 *   - contains "Living With Arthritis UK" (our display name is "Living With Arthritis"), or
 *   - matches /\b(for|with) Arthritis UK\b/i or "<topic> Arthritis UK:" style titles.
 *
 * Only title / name fields are checked. Body text, disclaimers and citations may still
 * mention the real charity, e.g. "Arthritis UK (formerly Versus Arthritis)" or
 * "not affiliated with Arthritis UK".
 *
 * Added after PR #128 ("Make our name and content clearly distinct from Arthritis UK").
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { CHARITY, pageTitle } from "@/config/charity";
import { ORGANIZATION_PAYLOAD, WEBSITE_PAYLOAD } from "@/lib/rootOrganizationSchema";

type Problem = { file: string; field: string; value: string; reason: string };

const OUR_OLD_NAME = /\bLiving With Arthritis UK\b/i;
const TOPIC_FOR_WITH = /\b(for|with) Arthritis UK\b/i;
// e.g. "Spinal Arthritis UK – Back Pain" or "Turmeric for Arthritis UK: Evidence"
const TOPIC_ARTHRITIS_UK_COLON = /\b(?!formerly\b)[A-Za-z&]+ Arthritis UK\s*[:–—]/;

const FIX_TITLE =
  'Fix: drop "UK" after "Arthritis" and keep the UK focus with "(UK)", "UK guide" or "in the UK", ' +
  'e.g. "PIP for Arthritis: Eligibility, Applying and Appeals (UK)". Do not change the slug/URL.';
const FIX_NAME = `Fix: use our display name "${CHARITY.shortName}" (CHARITY.shortName), not "Living With Arthritis UK".`;

/** Check a title-like value (page title, meta title, H1, og/twitter title). */
function checkTitle(problems: Problem[], file: string, field: string, raw: unknown) {
  if (typeof raw !== "string" || !raw.trim()) return;
  const value = decodeEntities(raw).replace(/\s+/g, " ").trim();
  if (OUR_OLD_NAME.test(value)) {
    problems.push({ file, field, value, reason: 'contains "Living With Arthritis UK"' });
  } else if (TOPIC_FOR_WITH.test(value)) {
    problems.push({ file, field, value, reason: 'matches /\\b(for|with) Arthritis UK\\b/i' });
  } else if (TOPIC_ARTHRITIS_UK_COLON.test(value)) {
    problems.push({ file, field, value, reason: 'reads as "<topic> Arthritis UK:" (looks like the charity name)' });
  }
}

/** Check a site / organisation name (only our old name is banned here). */
function checkName(problems: Problem[], file: string, field: string, raw: unknown) {
  if (typeof raw !== "string") return;
  const value = decodeEntities(raw).trim();
  if (OUR_OLD_NAME.test(value)) {
    problems.push({ file, field, value, reason: 'site/organisation name contains "Living With Arthritis UK"' });
  }
}

function decodeEntities(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—");
}

function format(problems: Problem[]): string {
  const lines = problems.slice(0, 40).map((p) => {
    const fix = OUR_OLD_NAME.test(p.value) ? FIX_NAME : FIX_TITLE;
    return `  - ${p.file} → ${p.field}: "${p.value}"\n    Why: ${p.reason}.\n    ${fix}`;
  });
  const more = problems.length > 40 ? `\n  …and ${problems.length - 40} more` : "";
  return `Arthritis UK-style title/name found (${problems.length}):\n${lines.join("\n")}${more}\n`;
}

const TITLE_KEYS = new Set([
  "title",
  "meta_title",
  "metaTitle",
  "seoTitle",
  "seo_title",
  "og_title",
  "ogTitle",
  "twitter_title",
  "twitterTitle",
  "h1",
  "headline",
]);
const NAME_KEYS = new Set(["siteName", "site_name", "publisherName", "organizationName"]);
// Citations and sources may legitimately name the real charity.
const SKIP_KEYS = new Set(["citations", "sources", "references", "ukCitations", "keywords", "faqs", "faq"]);
const HTML_KEYS = new Set(["content", "bodyHtml", "html"]);

function h1sIn(html: string): string[] {
  return [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => m[1]);
}

/** Walk a JSON value checking title/name fields (and H1s inside HTML fields). */
function walkJson(problems: Problem[], file: string, node: unknown, path: string) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkJson(problems, file, v, `${path}[${i}]`));
    return;
  }
  if (!node || typeof node !== "object") return;
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    const here = path ? `${path}.${key}` : key;
    if (SKIP_KEYS.has(key)) continue;
    if (typeof value === "string") {
      if (TITLE_KEYS.has(key)) checkTitle(problems, file, here, value);
      else if (NAME_KEYS.has(key)) checkName(problems, file, here, value);
      else if (HTML_KEYS.has(key)) {
        h1sIn(value).forEach((h, i) => checkTitle(problems, file, `${here} <h1>#${i + 1}`, h));
      }
    } else {
      walkJson(problems, file, value, here);
    }
  }
}

const ORG_TYPES = /Organization|NGO|WebSite|WebPage|Article|BlogPosting|MedicalWebPage|CollectionPage/;

/** JSON-LD: check org/site/page names and headlines. FAQ question names are body text, so skipped. */
function walkJsonLd(problems: Problem[], file: string, node: unknown, path: string) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkJsonLd(problems, file, v, `${path}[${i}]`));
    return;
  }
  if (!node || typeof node !== "object") return;
  const obj = node as Record<string, unknown>;
  const type = ([] as unknown[]).concat(obj["@type"] ?? []).join(",");
  if (ORG_TYPES.test(type)) {
    for (const k of ["name", "legalName", "alternateName", "headline"]) {
      const v = obj[k];
      for (const s of ([] as unknown[]).concat(v ?? [])) {
        if (k === "headline" || (k === "name" && !/Organization|NGO/.test(type))) {
          checkTitle(problems, file, `${path}.${k} (${type})`, s);
        } else {
          checkName(problems, file, `${path}.${k} (${type})`, s);
        }
      }
    }
  }
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object") walkJsonLd(problems, file, v, `${path}.${k}`);
  }
}

/** HTML document: <title>, og/twitter titles, site names, H1s and JSON-LD. */
function checkHtmlDocument(problems: Problem[], file: string, html: string) {
  for (const m of html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)) checkTitle(problems, file, "<title>", m[1]);
  for (const m of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = m[0];
    const prop = /(?:property|name)\s*=\s*"([^"]+)"/i.exec(tag)?.[1]?.toLowerCase();
    const content = /content\s*=\s*"([^"]*)"/i.exec(tag)?.[1];
    if (!prop || content === undefined) continue;
    if (prop === "og:title" || prop === "twitter:title") checkTitle(problems, file, `meta ${prop}`, content);
    if (prop === "og:site_name" || prop === "application-name" || prop === "apple-mobile-web-app-title") {
      checkName(problems, file, `meta ${prop}`, content);
    }
  }
  h1sIn(html).forEach((h, i) => checkTitle(problems, file, `<h1>#${i + 1}`, h));
  for (const m of html.matchAll(/<script\b[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      walkJsonLd(problems, file, JSON.parse(m[1]), "jsonld");
    } catch {
      // Malformed JSON-LD is covered by other tests.
    }
  }
}

/** llms/ai text files: markdown headings, link titles and identity lines. */
function checkLlmsFile(problems: Problem[], file: string, text: string) {
  text.split("\n").forEach((line, i) => {
    const ln = `line ${i + 1}`;
    const heading = /^#{1,6}\s+(.*)$/.exec(line);
    if (heading) checkTitle(problems, file, `${ln} heading`, heading[1]);
    for (const m of line.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]*)\)/g)) {
      checkTitle(problems, file, `${ln} link title`, m[1]);
    }
    const identity = /^\s*[-*]?\s*(Name|Site|Site name|Organisation|Organization|Brand|Publisher|Title)\s*:\s*(.+)$/i.exec(line);
    if (identity) checkName(problems, file, `${ln} ${identity[1]}`, identity[2]);
  });
}

function listFiles(dir: string, exts: RegExp): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      out.push(...listFiles(full, exts));
    } else if (exts.test(name)) out.push(full);
  }
  return out;
}

const rel = (p: string) => relative(process.cwd(), p);
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8").replace(/^\uFEFF/, ""));

function expectClean(problems: Problem[]) {
  expect(problems, format(problems)).toEqual([]);
}


describe("Arthritis UK title guard (no 'Living With Arthritis UK' or '<topic> for/with Arthritis UK' titles)", () => {
  it("blog post data: title, meta_title, og/twitter titles and content H1s", () => {
    const problems: Problem[] = [];
    const dir = resolve("src/content/blog/posts");
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files.length).toBeGreaterThan(100);
    for (const f of files) walkJson(problems, rel(join(dir, f)), readJson(join(dir, f)), "");
    expectClean(problems);
  });

  it("catalog and head data (blog, AI, condition, library, hub guides)", () => {
    const problems: Problem[] = [];
    const files = [
      "src/content/blog/catalog.generated.json",
      "scripts/blog-head-data.json",
      "scripts/ai-head-data.json",
      "scripts/condition-head-data.json",
      "scripts/library-head-data.json",
      "scripts/hub-guide-head-data.json",
    ];
    for (const f of files) {
      expect(existsSync(resolve(f)), `${f} should exist`).toBe(true);
      walkJson(problems, f, readJson(resolve(f)), "");
    }
    expectClean(problems);
  });

  it("index.html: titles, og/twitter titles, site name, H1 and org schema", () => {
    const problems: Problem[] = [];
    checkHtmlDocument(problems, "index.html", readFileSync(resolve("index.html"), "utf8"));
    expectClean(problems);
  });

  it("llms / ai files: headings, link titles and identity lines", () => {
    const problems: Problem[] = [];
    const files = [
      "public/llms.txt",
      "public/ai.txt",
      "public/llms-full.txt",
      "public/.well-known/llms.txt",
      "public/.well-known/ai.txt",
    ].filter((f) => existsSync(resolve(f)));
    expect(files.length).toBeGreaterThanOrEqual(3);
    for (const f of files) checkLlmsFile(problems, f, readFileSync(resolve(f), "utf8"));
    expectClean(problems);
  });

  it("site name, page title suffix and root organisation schema", () => {
    const problems: Problem[] = [];
    checkName(problems, "src/config/charity.ts", "CHARITY.shortName", CHARITY.shortName);
    checkName(problems, "src/config/charity.ts", "CHARITY.legalName", CHARITY.legalName);
    checkTitle(problems, "src/config/charity.ts", 'pageTitle("Example")', pageTitle("Example"));
    walkJsonLd(problems, "src/lib/rootOrganizationSchema.ts", ORGANIZATION_PAYLOAD, "ORGANIZATION_PAYLOAD");
    walkJsonLd(problems, "src/lib/rootOrganizationSchema.ts", WEBSITE_PAYLOAD, "WEBSITE_PAYLOAD");
    expectClean(problems);
  });

  it("React pages/components: literal <title>, og/twitter titles, H1s and pageTitle() labels", () => {
    const problems: Problem[] = [];
    for (const file of [...listFiles(resolve("src/pages"), /\.tsx$/), ...listFiles(resolve("src/components"), /\.tsx$/)]) {
      const src = readFileSync(file, "utf8");
      const f = rel(file);
      for (const m of src.matchAll(/<title>([^<{]+)<\/title>/g)) checkTitle(problems, f, "<title>", m[1]);
      for (const m of src.matchAll(/(?:property|name)="(og:title|twitter:title)"\s+content="([^"]+)"/g)) {
        checkTitle(problems, f, `meta ${m[1]}`, m[2]);
      }
      for (const m of src.matchAll(/content="([^"]+)"\s+(?:property|name)="(og:title|twitter:title)"/g)) {
        checkTitle(problems, f, `meta ${m[2]}`, m[1]);
      }
      for (const m of src.matchAll(/<h1\b[^>]*>([^<{]+)</g)) checkTitle(problems, f, "<h1>", m[1]);
      for (const m of src.matchAll(/pageTitle\(\s*["'`]([^"'`]+)["'`]\s*\)/g)) checkTitle(problems, f, "pageTitle()", m[1]);
      for (const m of src.matchAll(/og:site_name"\s+content="([^"]+)"/g)) checkName(problems, f, "meta og:site_name", m[1]);
    }
    expectClean(problems);
  });

  it("self-test: flags bad titles but allows legitimate body/disclaimer/citation references", () => {
    const bad: Problem[] = [];
    checkTitle(bad, "x", "title", "PIP for Arthritis UK: Eligibility, Applying and Appeals");
    checkTitle(bad, "x", "title", "Walking With Arthritis UK: Start, Build Up, Keep Going");
    checkTitle(bad, "x", "title", "Spinal Arthritis UK – Back Pain Symptoms & Self-Help");
    checkTitle(bad, "x", "og:title", "Guides | Living With Arthritis UK");
    checkName(bad, "x", "og:site_name", "Living With Arthritis UK");
    expect(bad).toHaveLength(5);
    expect(format(bad)).toMatch(/Fix: .*\(UK\)/);
    expect(format(bad)).toMatch(/x → title: "PIP for Arthritis UK/);

    const ok: Problem[] = [];
    checkTitle(ok, "x", "title", "PIP for Arthritis: Eligibility, Applying and Appeals (UK)");
    checkTitle(ok, "x", "title", "Walking With Arthritis: Start, Build Up, Keep Going");
    checkTitle(ok, "x", "title", "Best Knee Exercises for Arthritis – OA & RA Guide (UK)");
    checkTitle(ok, "x", "title", "Arthritis & Mental Health UK: Low Mood, Anxiety & Help");
    walkJson(ok, "x", {
      title: "Living With Arthritis | Evidence-Based Health Guides",
      content:
        "<h1>How to Sleep with Arthritis (UK)</h1><p>Arthritis UK (formerly Versus Arthritis) runs a helpline. " +
        "Living With Arthritis is an independent charity, not affiliated with Arthritis UK.</p>",
      excerpt: "Support from Arthritis UK (formerly Versus Arthritis) and NRAS.",
      citations: [{ label: "Arthritis UK: Work and arthritis", publisher: "Arthritis UK" }],
    }, "");
    expect(ok, format(ok)).toEqual([]);
  });
});
