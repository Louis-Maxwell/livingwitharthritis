import { describe, expect, it } from "vitest";
import {
  filterSearchCatalog,
  mapBlogCategoryToTopic,
  normalizeTopic,
  wordCountInBucket,
  type SearchCatalogItem,
} from "@/lib/siteSearchFilters";

const SAMPLE: SearchCatalogItem[] = [
  {
    id: "1",
    title: "PIP for arthritis",
    href: "/guides/benefits-pip",
    excerpt: "How Personal Independence Payment works in the UK.",
    topic: "Finances & Benefits",
    wordCount: 1400,
    keywords: ["PIP", "benefits"],
  },
  {
    id: "2",
    title: "Knee exercises",
    href: "/guides/knee-exercises-for-osteoarthritis",
    excerpt: "Gentle strength work for painful knees.",
    topic: "Exercise",
    wordCount: 450,
    keywords: ["knee", "exercise"],
  },
  {
    id: "3",
    title: "Mediterranean diet hub",
    href: "/diet",
    excerpt: "Anti-inflammatory eating for joint health.",
    topic: "Guides & hubs",
    wordCount: 900,
    keywords: ["diet"],
  },
];

describe("siteSearchFilters", () => {
  it("maps blog categories onto search topics", () => {
    expect(mapBlogCategoryToTopic("Exercise Guides")).toBe("Exercise");
    expect(mapBlogCategoryToTopic("Finances & Benefits")).toBe("Finances & Benefits");
    expect(mapBlogCategoryToTopic("diet")).toBe("Nutrition");
  });

  it("normalises topic aliases from the URL", () => {
    expect(normalizeTopic("pip")).toBe("Finances & Benefits");
    expect(normalizeTopic("Guides")).toBe("Guides & hubs");
    expect(normalizeTopic("")).toBe("All");
  });

  it("filters by topic", () => {
    const out = filterSearchCatalog(SAMPLE, { topic: "Exercise" });
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("2");
  });

  it("filters by word-count bucket", () => {
    expect(wordCountInBucket(450, "under1000")).toBe(true);
    expect(wordCountInBucket(450, "over1000")).toBe(false);
    expect(wordCountInBucket(1400, "over1000")).toBe(true);
    const shortOnly = filterSearchCatalog(SAMPLE, { wordCount: "under1000" });
    expect(shortOnly.map((i) => i.id).sort()).toEqual(["2", "3"]);
    const longOnly = filterSearchCatalog(SAMPLE, { wordCount: "over1000" });
    expect(longOnly.map((i) => i.id)).toEqual(["1"]);
  });

  it("filters by query across title, excerpt and keywords", () => {
    const out = filterSearchCatalog(SAMPLE, { query: "personal independence" });
    expect(out).toHaveLength(1);
    expect(out[0].href).toBe("/guides/benefits-pip");
  });

  it("combines topic, word count and query", () => {
    const out = filterSearchCatalog(SAMPLE, {
      topic: "Exercise",
      wordCount: "under1000",
      query: "knee",
    });
    expect(out).toHaveLength(1);
    expect(out[0].title).toBe("Knee exercises");

    const none = filterSearchCatalog(SAMPLE, {
      topic: "Exercise",
      wordCount: "over1000",
      query: "knee",
    });
    expect(none).toHaveLength(0);
  });
});
