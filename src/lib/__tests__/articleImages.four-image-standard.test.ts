import { describe, expect, it } from "vitest";
import catalog from "@/content/blog/catalog.generated.json";
import { coverFromFile, pickArticleImages } from "@/lib/articleImagePicks";

describe("four-image blog standard", () => {
  it("returns a unique cover plus three related images for every catalogue article", () => {
    const failures: string[] = [];
    for (const article of catalog as Array<{ slug: string; title: string; category: string; cover?: string; keywords?: string[] | null }>) {
      const cover = coverFromFile(article.cover);
      const images = pickArticleImages(
        cover,
        article.category,
        article.title,
        article.slug,
        article.keywords,
      );
      const paths = images.map((image) => image.src);
      if (images.length !== 4 || new Set(paths).size !== 4 || images.some((image) => !image.alt.trim() || !image.credit.trim())) {
        failures.push(article.slug);
      }
    }
    expect(failures, `Articles failing four-image standard: ${failures.slice(0, 20).join(", ")}`).toEqual([]);
  });
});
