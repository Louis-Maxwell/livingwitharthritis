import { describe, expect, it } from "vitest";
import { displayTitle } from "@/lib/blogTitle";
import {
  BLOG_TOPIC_FILTERS,
  formatBlogDate,
  postMatchesTopic,
  readTimeLabel,
  topicFilterFromSlug,
} from "@/lib/blog/topics";
import { getBlogCatalog } from "@/lib/blog/catalog";

describe("displayTitle", () => {
  it("keeps the full title when meta_title is only a clipped prefix of it", () => {
    expect(
      displayTitle({
        title: "How Arthritis Medications Affect Sexual Function: DMARDs, Biologics and NSAIDs",
        meta_title: "How Arthritis Medications Affect Sexual",
      }),
    ).toBe("How Arthritis Medications Affect Sexual Function: DMARDs, Biologics and NSAIDs");
  });

  it("uses a complete, different meta_title for long titles", () => {
    expect(
      displayTitle({
        title: "Supporting a Partner With Arthritis: Practical and Emotional Strategies",
        meta_title: "Supporting a Partner With Arthritis: Strategies",
      }),
    ).toBe("Supporting a Partner With Arthritis: Strategies");
  });

  it("returns short titles unchanged", () => {
    expect(displayTitle({ title: "Turmeric for Arthritis", meta_title: "x" })).toBe("Turmeric for Arthritis");
  });
});

describe("blog topic helpers", () => {
  it("maps category slugs and editorial labels onto the 8 topics", () => {
    expect(BLOG_TOPIC_FILTERS[0]).toBe("All");
    expect(topicFilterFromSlug("mental-health")).toBe("Mental Health");
    expect(topicFilterFromSlug("nope")).toBe("All");
    expect(postMatchesTopic("Surgery & Recovery", "Treatment")).toBe(true);
    expect(postMatchesTopic("Surgery & Recovery", "Exercise")).toBe(false);
    expect(postMatchesTopic("Anything", "All")).toBe(true);
  });

  it("puts every catalog guide under exactly one topic filter", () => {
    const topics = BLOG_TOPIC_FILTERS.filter((t) => t !== "All");
    const orphans = getBlogCatalog().filter(
      (p) => topics.filter((t) => postMatchesTopic(p.category, t)).length !== 1,
    );
    expect(orphans.map((p) => `${p.slug}:${p.category}`)).toEqual([]);
  });

  it("formats dates and reading time from real catalog values", () => {
    expect(formatBlogDate("2026-06-09")).toBe("9 June 2026");
    expect(formatBlogDate("not-a-date")).toBe("not-a-date");
    expect(readTimeLabel({ reading_minutes: 7, excerpt: "" })).toBe("7 min read");
    const row = getBlogCatalog()[0];
    expect(row.reading_minutes).toBe(Math.max(1, Math.ceil(row.word_count / 200)));
  });
});
