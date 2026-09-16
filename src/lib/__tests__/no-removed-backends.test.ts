/// <reference types="node" />
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

/** Match real import/require usage only (not prose or this test's pattern list). */
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

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === "dist") continue;
      walk(full, out);
    } else if (/\.(ts|tsx|js|jsx|mjs|cjs)$/.test(name)) {
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

describe("no removed backends in src/", () => {
  it("does not import removed supabase/vercel/cloudflare packages", () => {
    const files = walk(SRC).filter(
      (f) => !f.endsWith(`${join("lib", "__tests__", "no-removed-backends.test.ts")}`),
    );
    const hits: string[] = [];

    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const pattern of FORBIDDEN_IMPORT) {
        if (pattern.test(text)) {
          hits.push(`${relative(ROOT, file)} matches ${pattern}`);
        }
      }
    }

    expect(hits, hits.join("\n")).toEqual([]);
  });

  it("does not resurrect vercel.json or src/integrations/supabase", () => {
    expect(() => statSync(join(ROOT, "vercel.json"))).toThrow();
    expect(() =>
      statSync(join(ROOT, "src", "integrations", "supabase", "client.ts")),
    ).toThrow();
  });

  it("does not keep dormant Express server.js or supabase/functions", () => {
    expect(pathExists("server.js"), "server.js should be deleted").toBe(false);
    expect(
      pathExists("supabase/functions"),
      "supabase/functions should be deleted",
    ).toBe(false);
    expect(
      pathExists(".github/workflows/edge-functions-preflight.yml"),
      "edge-functions-preflight workflow should be deleted",
    ).toBe(false);
  });
});
