import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { coverImage } from "@/lib/articleImages";
import blogSlugs from "@/data/blog-slugs.generated.json";
import blogCoverMap from "@/data/blog-cover-map.generated.json";

const OPENVERSE_DIR = join(process.cwd(), "public", "openverse");

describe("coverImage uniqueness", () => {
  it("maps every blog slug to a cover path", () => {
    const slugs = blogSlugs as string[];
    expect(slugs.length).toBeGreaterThan(400);
    for (const slug of slugs) {
      const cover = coverImage("general", slug, slug);
      expect(cover.src).toMatch(/^\/openverse\/.+\.webp$/);
      expect(cover.src.length).toBeGreaterThan("/openverse/x.webp".length);
    }
  });

  it("gives unique coverImage paths for unique slugs", () => {
    const slugs = blogSlugs as string[];
    const paths = slugs.map((slug) => coverImage("general", slug, slug).src);
    expect(new Set(paths).size).toBe(slugs.length);
  });

  it("keeps the generated cover map 1:1 and deterministic", () => {
    const map = blogCoverMap as Record<string, string>;
    const slugs = blogSlugs as string[];
    expect(Object.keys(map).sort()).toEqual([...slugs].sort());
    const files = Object.values(map);
    expect(new Set(files).size).toBe(files.length);
    const sample = slugs[0];
    expect(coverImage("x", "y", sample).src).toBe(coverImage("x", "y", sample).src);
    expect(coverImage("x", "y", sample).src).toBe(`/openverse/${map[sample]}`);
  });

  it("fails if any mapped cover file is missing from public/openverse", () => {
    const map = blogCoverMap as Record<string, string>;
    const missing: string[] = [];
    for (const [slug, file] of Object.entries(map)) {
      // Map stores bare filenames; coverImage prefixes /openverse/
      expect(file).not.toMatch(/^\/|^openverse\//);
      const full = join(OPENVERSE_DIR, file);
      if (!existsSync(full)) missing.push(`${slug} => ${file}`);
    }
    expect(missing, `Missing cover files:\n${missing.slice(0, 20).join("\n")}`).toEqual([]);
  });

  it("never resolves listing covers through category-bucket fallback for mapped slugs", () => {
    const map = blogCoverMap as Record<string, string>;
    const slug = Object.keys(map)[0];
    const cover = coverImage("Exercise", "Totally Unrelated Title That Would Hash Differently", slug);
    expect(cover.src).toBe(`/openverse/${map[slug]}`);
  });
});
