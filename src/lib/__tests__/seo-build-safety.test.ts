/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { assertSafeBlogInventory } from "@/lib/seoBuildSafety";
import {
  SUPABASE_PROJECT_ID,
  SUPABASE_URL,
} from "@/integrations/supabase/config";

describe("SEO build safety", () => {
  it("blocks unexplained canonical blog inventory loss above five percent", () => {
    expect(() => assertSafeBlogInventory(237, 224, false)).toThrow(
      /refusing to reduce canonical blog inventory/,
    );
    expect(() => assertSafeBlogInventory(237, 226, false)).not.toThrow();
    expect(() => assertSafeBlogInventory(237, 0, true)).not.toThrow();
  });

  it("does not prerender invalid regional routes that navigate over the homepage", () => {
    const source = readFileSync(
      resolve(process.cwd(), "scripts/prerender-routes.mjs"),
      "utf8",
    );

    expect(source).not.toContain('"/regions/england"');
    expect(source).not.toContain('"/regions/northern-ireland"');
    expect(source).toContain('"/regions/scotland"');
    expect(source).toContain('"/regions/wales"');
  });

  it("falls back to the active production Supabase project", () => {
    expect(SUPABASE_PROJECT_ID).toBe("eswdtpmknwjxtvkyxvmi");
    expect(SUPABASE_URL).toBe(
      "https://eswdtpmknwjxtvkyxvmi.supabase.co",
    );
  });
});
