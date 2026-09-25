/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { headDataFor, mergeHeadLayers } from "../../../scripts/inject-canonicals.mjs";

type HeadEntry = { article?: { content?: string }; faqs?: unknown[]; title?: string };

const blogHead = JSON.parse(
  readFileSync(resolve(process.cwd(), "scripts/blog-head-data.json"), "utf8"),
) as Record<string, HeadEntry>;

describe("mergeHeadLayers", () => {
  it("merges per route so curated fields do not drop generated bodies", () => {
    const merged = mergeHeadLayers(
      { "/blog/a": { title: "Generated", article: { content: "<p>body</p>" }, faqs: [{ q: "x", a: "y" }] } },
      { "/blog/a": { title: "Curated", question: "Q?" } },
    ) as Record<string, Record<string, unknown>>;
    expect(merged["/blog/a"].title).toBe("Curated");
    expect(merged["/blog/a"].question).toBe("Q?");
    expect(merged["/blog/a"].article).toEqual({ content: "<p>body</p>" });
    expect(merged["/blog/a"].faqs).toHaveLength(1);
  });

  it("ignores empty curated values", () => {
    const merged = mergeHeadLayers(
      { "/x": { answer: "kept", faqs: [{ q: "a", a: "b" }] } },
      { "/x": { answer: "", faqs: [] } },
    ) as Record<string, Record<string, unknown>>;
    expect(merged["/x"].answer).toBe("kept");
    expect(merged["/x"].faqs).toHaveLength(1);
  });
});

describe("every published blog route keeps its article body in static head data", () => {
  const routes = Object.keys(blogHead).filter((r) => blogHead[r]?.article?.content);

  it("has blog routes with article content", () => {
    expect(routes.length).toBeGreaterThan(100);
  });

  it("no curated layer strips the article from a blog route", () => {
    const stripped = routes.filter((route) => {
      const head = headDataFor(route) as HeadEntry;
      return !head?.article?.content;
    });
    expect(stripped).toEqual([]);
  });

  it.each([
    "/blog/managing-methotrexate-side-effects-practical-tips",
    "/blog/working-with-arthritis-uk-rights",
  ])("%s ships its full body", (route) => {
    const head = headDataFor(route) as HeadEntry;
    expect((head.article?.content ?? "").length).toBeGreaterThan(2000);
  });
});
