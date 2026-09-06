import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import blogCoverMap from "@/data/blog-cover-map.generated.json";

const SLUG = "supporting-a-partner-with-arthritis-strategies";
const HEAD = resolve("scripts/blog-head-data.json");

describe("blog-head-data social meta (share preview)", () => {
  it("ships full partner title and cover-map ogImage for crawlers", () => {
    expect(existsSync(HEAD)).toBe(true);
    const data = JSON.parse(readFileSync(HEAD, "utf8"));
    const entry = data[`/blog/${SLUG}`];
    expect(entry).toBeTruthy();
    expect(entry.title).toBe(
      "Supporting a Partner With Arthritis: Practical and Emotional Strategies | Living With Arthritis UK",
    );
    expect(entry.title).not.toMatch(/Partner With \|/);
    const cover = (blogCoverMap as Record<string, string>)[SLUG];
    expect(cover).toBeTruthy();
    expect(entry.ogImage).toBe(
      `https://livingwitharthritis.org.uk/openverse/${cover}`,
    );
  });

  it("sets ogImage from cover map for the majority of blogs", () => {
    const data = JSON.parse(readFileSync(HEAD, "utf8"));
    const entries = Object.values(data) as Array<{ ogImage?: string }>;
    const fromCover = entries.filter((e) => e.ogImage?.includes("/openverse/")).length;
    expect(fromCover).toBeGreaterThan(400);
  });
});
