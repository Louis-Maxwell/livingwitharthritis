import { describe, expect, it } from "vitest";
import { LIBRARY_TOPIC_SEO, getLibraryTopicSeo } from "@/data/libraryTopicSeo";
import { getHealthTopic } from "@/data/healthTopics";
import { faqArticles } from "@/data/faqArticles";
import { conditionSubpages } from "@/data/conditionSubpages";

describe("library topic SEO overlays", () => {
  it("gives fibromyalgia a unique UK title and description, not the short subtitle", () => {
    const seo = getLibraryTopicSeo("fibromyalgia");
    const topic = getHealthTopic("fibromyalgia");
    expect(topic).toBeTruthy();
    expect(seo?.title).toMatch(/Fibromyalgia UK/i);
    expect(seo?.description.length).toBeGreaterThan(120);
    expect(seo?.description).not.toBe(topic?.subtitle);
    expect(seo?.related?.some((r) => r.href === "/conditions/fibromyalgia")).toBe(
      true,
    );
  });

  it("only overlays slugs that exist in the library", () => {
    for (const slug of Object.keys(LIBRARY_TOPIC_SEO)) {
      expect(getHealthTopic(slug), slug).toBeTruthy();
    }
  });
});

describe("rejected soft pages that still matter", () => {
  it("keeps unique copy for library/fibromyalgia, gout symptoms and cold-weather FAQ", () => {
    const fibro = getHealthTopic("fibromyalgia");
    expect(fibro?.sections.length).toBeGreaterThan(3);
    expect(conditionSubpages.gout?.symptoms?.commonSymptoms.length).toBeGreaterThan(3);
    const cold = faqArticles.find((a) => a.slug === "arthritis-and-cold-weather");
    expect(cold?.sections.length).toBeGreaterThan(3);
    expect(cold?.quickAnswer.length).toBeGreaterThan(40);
  });
});
