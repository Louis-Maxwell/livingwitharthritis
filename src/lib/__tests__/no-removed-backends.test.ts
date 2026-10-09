/// <reference types="node" />
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

// Card donations (StripeDonationModal) are the ONLY allowed backend use.
const ALLOWED_BACKEND_FILES = new Set([
  "src/components/StripeDonationModal.tsx",
]);
const ALLOWED_FUNCTIONS = ["_shared", "create-donation-checkout"];

const FORBIDDEN_IMPORT = [
  /\bfrom\s+['"]@supabase\//,
  /\bfrom\s+['"]@\/integrations\/supabase/,
  /\bimport\s*\(\s*['"]@supabase\//,
  /\bimport\s*\(\s*['"]@\/integrations\/supabase/,
  /\brequire\s*\(\s*['"]@supabase\//,
  /\bfrom\s+['"]@vercel\//,
  /\bfrom\s+['"]vercel\//,
  /\bfrom\s+['"]wrangler['"]/,
  /\bfrom\s+['"]@cloudflare\//,
  /\bfrom\s+['"]cloudflare:(?:workers|email)['"]/,
];

/** Live backend resurrection signals (not historical denial comments). */
const FORBIDDEN_LIVE = [
  { label: "@supabase/ package import", re: /from\s+['"]@supabase\// },
  { label: "@/integrations/supabase", re: /@\/integrations\/supabase/ },
  { label: "supabase.functions path usage", re: /supabase\/functions\/[a-z]/ },
  { label: ".vercel directory ref", re: /['"]\.vercel['"]/ },
  { label: "vercelRedirects export use", re: /\bvercelRedirects\b/ },
  { label: "mcpPlugin( invocation", re: /\bmcpPlugin\s*\(/ },
  { label: "express Router API stub", re: /require\s*\(\s*['"]express['"]\s*\)/ },
];

const FORBIDDEN_PACKAGE_DEPS = [
  "@supabase/auth-js",
  "wrangler",
  "@cloudflare/workers-types",
];

const SCAN_ROOTS = ["src", "scripts", "public", ".github"];
const SKIP_FILES = new Set([
  "src/lib/__tests__/no-removed-backends.test.ts",
]);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === "dist" || name === ".git") continue;
      walk(full, out);
    } else if (/\.(ts|tsx|mts|js|jsx|mjs|cjs|yml|yaml|json|html)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
}

function pathExists(rel: string): boolean {
  try {
    statSync(join(ROOT, rel));
    return true;
  } catch {
    return false;
  }
}

describe("no removed backends", () => {
  it("does not import removed supabase/vercel/cloudflare packages in src/", () => {
    const files = walk(join(ROOT, "src")).filter(
      (f) =>
        !f.endsWith(`${join("lib", "__tests__", "no-removed-backends.test.ts")}`) &&
        !relative(ROOT, f).startsWith(join("src", "integrations")) &&
        !ALLOWED_BACKEND_FILES.has(relative(ROOT, f)),
    );
    const hits: string[] = [];
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const pattern of FORBIDDEN_IMPORT) {
        if (pattern.test(text)) hits.push(`${relative(ROOT, file)} matches ${pattern}`);
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });

  it("does not resurrect vercel.json or .vercel", () => {
    expect(pathExists("vercel.json")).toBe(false);
    expect(pathExists(".vercel")).toBe(false);
  });

  it("only keeps the card-donation backend function", () => {
    if (!pathExists("supabase/functions")) return;
    const extra = readdirSync(join(ROOT, "supabase/functions")).filter(
      (name) => !ALLOWED_FUNCTIONS.includes(name),
    );
    expect(extra, extra.join(", ")).toEqual([]);
  });

  it("does not keep dormant Express server.js, src/api stubs, or supabase/", () => {
    expect(pathExists("server.js")).toBe(false);
    expect(pathExists("src/api")).toBe(false);
    expect(pathExists("src/api/routes/articles.js")).toBe(false);
    expect(pathExists(".github/workflows/edge-functions-preflight.yml")).toBe(false);
    expect(pathExists("database-optimizations.sql")).toBe(false);
    expect(pathExists("scripts/meta-descriptions-update.sql")).toBe(false);
    expect(pathExists("deploy-performance-optimizations.sh")).toBe(false);
    expect(pathExists("scripts/fix-long-page-titles.mjs")).toBe(false);
  });

  it("does not keep CodeRabbit or Cursor config (Grok Bot owns reviews)", () => {
    for (const rel of [".coderabbit.yaml", ".coderabbit.yml", ".cursor", ".cursorrules", ".cursorignore", ".cursorindexingignore", ".vercelignore"]) {
      expect(pathExists(rel), rel).toBe(false);
    }
  });

  it("does not declare removed backend packages in package.json", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const hits = FORBIDDEN_PACKAGE_DEPS.filter((name) => name in deps);
    expect(hits, hits.join(", ")).toEqual([]);
  });

  it("does not keep deleted GSC client stubs", () => {
    expect(pathExists("src/lib/gsc-indexing.ts")).toBe(false);
    expect(pathExists("src/lib/gsc-advanced.ts")).toBe(false);
    expect(pathExists("src/lib/bulk-indexing.ts")).toBe(false);
    expect(pathExists("src/components/GSCDashboard.tsx")).toBe(false);
  });

  it("scans src/scripts/public/.github for live backend resurrection signals", () => {
    const hits: string[] = [];
    for (const root of SCAN_ROOTS) {
      if (!pathExists(root)) continue;
      for (const file of walk(join(ROOT, root))) {
        const rel = relative(ROOT, file);
        if (SKIP_FILES.has(rel) || ALLOWED_BACKEND_FILES.has(rel) || rel.startsWith(join("src", "integrations"))) continue;
        const text = readFileSync(file, "utf8");
        for (const { label, re } of FORBIDDEN_LIVE) {
          if (re.test(text)) hits.push(`${rel}: ${label}`);
        }
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });
});
