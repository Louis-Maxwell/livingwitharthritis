/// <reference types="node" />
/**
 * Build-time guard: every published post must have a real cover image
 * (file exists, not a blank placeholder), credited in ATTRIBUTION.json,
 * with non-empty alt text, and no cover may be reused on more than 3 posts.
 */
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import altOverrides from "@/data/cover-alt-overrides.json";
import { PUBLISHED_BLOG_POSTS } from "@/test/blogPosts";

const OV = resolve(__dirname, "../../../public/openverse");
const attribution = JSON.parse(readFileSync(resolve(OV, "ATTRIBUTION.json"), "utf8")) as Record<string, unknown>;
const alts = altOverrides as Record<string, string>;
const fileOf = (c: string) => c.replace(/^.*\//, "");

describe("blog cover relevance guard", () => {
  it("every published post has an existing, non-placeholder cover", () => {
    const bad = PUBLISHED_BLOG_POSTS.filter((p) => {
      if (!p.cover) return true;
      const f = resolve(OV, fileOf(p.cover));
      return !existsSync(f) || statSync(f).size < 1024;
    }).map((p) => p.slug);
    expect(bad).toEqual([]);
  });
  it("new commons-/lwa-fallback- covers have alt text and credits", () => {
    const bad = PUBLISHED_BLOG_POSTS.filter((p) => /^(commons-|lwa-fallback-)/.test(fileOf(p.cover ?? "")))
      .filter((p) => !(alts[fileOf(p.cover!)] ?? "").trim() || !attribution[fileOf(p.cover!)])
      .map((p) => p.slug);
    expect(bad).toEqual([]);
  });
  it("no cover is used on more than 3 published posts", () => {
    const n = new Map<string, number>();
    for (const p of PUBLISHED_BLOG_POSTS) n.set(fileOf(p.cover ?? ""), (n.get(fileOf(p.cover ?? "")) ?? 0) + 1);
    expect([...n].filter(([, c]) => c > 3)).toEqual([]);
  });
  it("alt text never names another charity", () => {
    expect(Object.values(alts).filter((a) => /arthritis uk|versus arthritis/i.test(a))).toEqual([]);
  });
});
