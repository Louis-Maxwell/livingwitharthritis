import { describe, expect, it } from "vitest";
import headData from "../../../scripts/blog-head-data.json";
import { getBlogCatalog } from "@/lib/blog/catalog";
import { coverFromFile, pickArticleImages } from "@/lib/articleImagePicks";
import { coverImage, getArticleImages } from "@/lib/articleImages";

type HeadEntry = { article?: { slug?: string; cover?: string | null } };

describe("article page cover parity", () => {
  const catalog = getBlogCatalog();

  it("the guide's own cover file gives the same cover and gallery as the listing map", () => {
    expect(catalog.length).toBeGreaterThan(0);
    for (const row of catalog) {
      const fromFile = coverFromFile(row.cover);
      expect(fromFile, row.slug).toEqual(coverImage(row.category, row.title, row.slug));
      expect(pickArticleImages(fromFile, row.category, row.title, row.slug, row.keywords), row.slug).toEqual(
        getArticleImages(row.category, row.title, row.slug, row.keywords),
      );
    }
  });

  it("the article embedded in static HTML carries its cover file", () => {
    const entries = Object.values(headData as Record<string, HeadEntry>).filter((e) => e?.article?.slug);
    expect(entries.length).toBe(catalog.length);
    const coverBySlug = new Map(catalog.map((row) => [row.slug, row.cover]));
    for (const entry of entries) {
      expect(entry.article?.cover, entry.article?.slug).toBe(coverBySlug.get(entry.article!.slug!));
    }
  });
});
