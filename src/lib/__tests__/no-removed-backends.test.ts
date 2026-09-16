/// <reference types="node" />
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();

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
      (f) => !f.endsWith(`${join("lib", "__tests__", "no-removed-backends.test.ts")}`),
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

  it("does not resurrect vercel.json, .vercel, or src/integrations/supabase", () => {
    expect(pathExists("vercel.json")).toBe(false);
    expect(pathExists(".vercel")).toBe(false);
    expect(pathExists("src/integrations/supabase")).toBe(false);
    expect(pathExists("src/integrations/supabase/client.ts")).toBe(false);
  });

  it("does not keep dormant Express server.js or supabase/functions", () => {
    expect(pathExists("server.js")).toBe(false);
    expect(pathExists("supabase")).toBe(false);
    expect(pathExists("supabase/functions")).toBe(false);
    expect(pathExists(".github/workflows/edge-functions-preflight.yml")).toBe(false);
    expect(pathExists("database-optimizations.sql")).toBe(false);
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
        if (SKIP_FILES.has(rel)) continue;
        const text = readFileSync(file, "utf8");
        for (const { label, re } of FORBIDDEN_LIVE) {
          if (re.test(text)) hits.push(`${rel}: ${label}`);
        }
      }
    }
    expect(hits, hits.join("\n")).toEqual([]);
  });
});
