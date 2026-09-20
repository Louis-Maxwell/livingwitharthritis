import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildPageTitle,
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
  it("documents that blogArticles/static overwrite stale head nested articles", () => {
    // Behavioral contract: loadRowsFromLocalJson seeds from prior head-data,
    // then overwrites with blogArticles.json and src/content/blog/*.json.
    // This keeps inject/prerender titles and Soft-404 bodies catalog-true.
    const src = readFileSync(resolve("scripts/generate-blog-head-data.mjs"), "utf8");
    expect(src).toMatch(/Catalog is source of truth/);
    expect(src).toMatch(/blogArticles\.json/);
    expect(src).toMatch(/loadLocalStaticArticles/);
  });
});
