import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildPageTitle,
  extractBlogFaqs,
  looksTruncatedMeta,
  pickHeadline,
  resolveOgImage,
} from "../generate-blog-head-data.mjs";

describe("generate-blog-head-data title + ogImage", () => {
  it("prefers full title when meta_title is mid-phrase clipped", () => {
    const row = {
      title: "Supporting a Partner With Arthritis: Practical and Emotional Strategies",
      meta_title: "Supporting a Partner With",
    };
    expect(looksTruncatedMeta(row.meta_title, row.title)).toBe(true);
    expect(pickHeadline(row)).toBe(row.title);
    expect(buildPageTitle(pickHeadline(row))).toBe(
      "Supporting a Partner With Arthritis: Practical and Emotional Strategies",
    );
  });

  it("keeps a good meta_title when it is not a truncated prefix", () => {
    const row = {
      title: "Short Title",
      meta_title: "Arthritis at Work UK – Rights, Adjustments & Practical Tips",
    };
    expect(looksTruncatedMeta(row.meta_title, row.title)).toBe(false);
    expect(pickHeadline(row)).toBe(row.meta_title);
  });

  it("resolves ogImage from cover map to absolute /openverse URL", () => {
    const coverMap = {
      "supporting-a-partner-with-arthritis-strategies":
        "lwa-supporting-a-partner-with-arthritis-strategies.webp",
    };
    expect(
      resolveOgImage("supporting-a-partner-with-arthritis-strategies", null, coverMap),
    ).toBe(
      "https://livingwitharthritis.org.uk/openverse/lwa-supporting-a-partner-with-arthritis-strategies.webp",
    );
  });

  it("falls back to /og/landing-share.png only when no cover and no image_url", () => {
    expect(resolveOgImage("missing-slug", null, {})).toBe(
      "https://livingwitharthritis.org.uk/og/landing-share.png",
    );
  });
});

describe("generate-blog-head-data catalog preference", () => {
  it("reads guides only from the single posts source (no stale head-data seeding)", () => {
    // Behavioral contract: head entries come from src/content/blog/posts/*.json
    // via scripts/lib/blog-posts.mjs, so inject/prerender titles and Soft-404
    // bodies stay catalog-true and removed guides cannot linger.
    const src = readFileSync(resolve("scripts/generate-blog-head-data.mjs"), "utf8");
    expect(src).toMatch(/Catalog is source of truth/);
    expect(src).toMatch(/readPublishedBlogPosts/);
    expect(src).not.toMatch(/blogArticles\.json/);
  });
});


describe("complete build-side FAQ answers", () => {
  it("keeps all authored PIP wording beyond 500 characters", () => {
    const pip = JSON.parse(readFileSync(resolve("src/content/blog/posts/pip-for-arthritis-uk.json"), "utf8"));
    const actual = extractBlogFaqs(pip.content);
    expect(actual).toHaveLength(3);
    expect(actual.map((faq: { a: string }) => faq.a.length)).toEqual([845, 1063, 699]);
    const head = JSON.parse(readFileSync(resolve("scripts/blog-head-data.json"), "utf8"));
    expect(head["/blog/pip-for-arthritis-uk"].faqs).toEqual(actual);
  });

  it("does not cut a long Markdown answer mid-word", () => {
    const answer = "Complete authored sentence. ".repeat(30).trim();
    const faqs = extractBlogFaqs("## Does this preserve the whole answer?\n\n" + answer + "\n\n## Next section\nOther text.");
    expect(faqs).toEqual([{ q: "Does this preserve the whole answer?", a: answer }]);
  });
});
