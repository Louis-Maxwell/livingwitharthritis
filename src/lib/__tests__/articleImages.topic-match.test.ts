import { describe, expect, it } from "vitest";
import {
  coverImage,
  getArticleImages,
  isDietNutritionTopic,
  isNutritionStockPath,
} from "@/lib/articleImages";
import blogCoverMap from "@/data/blog-cover-map.generated.json";

describe("getArticleImages topic matching", () => {
  it("never attaches nutrition/fruit stock to treatment or medication posts", () => {
    const cases: Array<[string, string, string]> = [
      ["Treatment", "Arthritis Treatment Options UK", "arthritis-treatment-hub"],
      ["Medications", "Gout Medication UK", "gout-medication-uk"],
      ["Treatment", "Managing Methotrexate Side Effects Practical Tips", "managing-methotrexate-side-effects-practical-tips"],
      ["Treatment", "Stopping Arthritis Medication Safely", "stopping-arthritis-medication-safely-a-step-by-step-guide"],
      ["Treatment", "Medication Supplement Interactions Arthritis", "medication-supplement-interactions-arthritis"],
      ["Treatments", "DMARDs Explained How Methotrexate Slows Rheumatoid Arthritis", "dmards-explained-how-methotrexate-slows-rheumatoid-arthritis"],
    ];

    for (const [category, title, slug] of cases) {
      expect(isDietNutritionTopic(category, title, slug)).toBe(false);
      const images = getArticleImages(category, title, slug);
      // Hero is unique cover
      expect(images[0].src).toBe(coverImage(category, title, slug).src);
      // Body figures (if any) must not be nutrition/fruit stock
      for (const img of images.slice(1)) {
        expect(
          isNutritionStockPath(img.src),
          `${slug} got nutrition stock ${img.src}`,
        ).toBe(false);
        expect(img.src).not.toMatch(/nutrition-/);
        expect(img.src.toLowerCase()).not.toMatch(/fruit/);
      }
    }
  });

  it("allows nutrition images for diet / food posts", () => {
    const cases: Array<[string, string, string]> = [
      ["Nutrition", "Anti Inflammatory Diet", "anti-inflammatory-diet"],
      ["Living Well", "Best Foods to Eat for Arthritis", "best-foods-to-eat-for-arthritis"],
      ["Nutrition", "Mediterranean Diet Arthritis 14 Day Plan", "mediterranean-diet-arthritis-14-day-plan"],
      ["Nutrition", "Gout Flare Up Diet Foods Avoid", "gout-flare-up-diet-foods-avoid"],
    ];

    for (const [category, title, slug] of cases) {
      expect(isDietNutritionTopic(category, title, slug)).toBe(true);
      const images = getArticleImages(category, title, slug);
      expect(images[0].src).toBe(coverImage(category, title, slug).src);
      const body = images.slice(1);
      // Diet posts should be able to pick nutrition-themed body images when available
      expect(body.length).toBeGreaterThan(0);
      expect(body.some((img) => /nutrition-|fruit|meal|salad|food|olive|acai/i.test(img.src))).toBe(
        true,
      );
    }
  });

  it("keeps cover unique per slug (map still 1:1)", () => {
    const map = blogCoverMap as Record<string, string>;
    const slugs = ["arthritis-treatment-hub", "anti-inflammatory-diet", "gout-medication-uk"];
    const paths = slugs.map((slug) => coverImage("x", "y", slug).src);
    expect(new Set(paths).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(coverImage("x", "y", slug).src).toBe(`/openverse/${map[slug]}`);
    }
  });

  it("returns fewer than 3 images rather than padding with unrelated stock", () => {
    const images = getArticleImages(
      "Treatment",
      "Obscure Niche Topic Without Matching Tokens Zzz",
      "totally-unrelated-obscure-zzz-slug",
    );
    // Always at least the cover; must not invent three forced bucket images
    expect(images.length).toBeGreaterThanOrEqual(1);
    expect(images.length).toBeLessThanOrEqual(3);
    expect(images[0].src).toMatch(/^\/openverse\//);
  });

  it("does not treat lone supplement wording as a diet topic", () => {
    expect(
      isDietNutritionTopic(
        "Treatment",
        "Medication Supplement Interactions Arthritis",
        "medication-supplement-interactions-arthritis",
      ),
    ).toBe(false);
  });
});
