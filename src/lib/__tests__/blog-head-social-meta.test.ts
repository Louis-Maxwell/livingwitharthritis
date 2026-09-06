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
      "Supporting a Partner With Arthritis: Practical and Emotional Strategies",
    );
    expect(entry.title).not.toMatch(/Partner With \|/);
    const cover = (blogCoverMap as Record<string, string>)[SLUG];
    expect(cover).toBeTruthy();
    expect(entry.ogImage).toBe(
      `https://livingwitharthritis.org.uk/openverse/${cover}`,
    );
  });

  it("sets ogImage from cover map for every /blog/* head entry", () => {
    const data = JSON.parse(readFileSync(HEAD, "utf8")) as Record<
      string,
      { title?: string; ogImage?: string }
    >;
    const map = blogCoverMap as Record<string, string>;
    const bad: string[] = [];
    for (const [path, entry] of Object.entries(data)) {
      if (!path.startsWith("/blog/")) continue;
      const slug = path.slice("/blog/".length);
      const expected = `https://livingwitharthritis.org.uk/openverse/${map[slug]}`;
      const og = entry?.ogImage ?? "";
      const title = entry?.title ?? "";
      if (
        !og.includes("/openverse/") ||
        (map[slug] && og !== expected && og !== `/openverse/${map[slug]}`)
      ) {
        bad.push(`${path} ogImage=${og}`);
      }
      if (!title || title.includes("Page not found") || /\bWith\s*\|/.test(title)) {
        bad.push(`${path} title=${title}`);
      }
    }
    expect(bad, bad.slice(0, 10).join("\n")).toEqual([]);
  });
});
