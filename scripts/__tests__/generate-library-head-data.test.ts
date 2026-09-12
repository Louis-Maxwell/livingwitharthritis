import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { rewriteHead } from "../inject-canonicals.mjs";
import { HOME_SHELL_HEADING, stripToText } from "../static-article-html.mjs";
import { buildLibraryHeadData } from "../generate-library-head-data.ts";
import { getLibraryTopicSeo } from "../../src/data/libraryTopicSeo";
import { getHealthTopic } from "../../src/data/healthTopics";

const TEMPLATE = `<!doctype html>
<html lang="en-GB">
  <head>
    <title>Living With Arthritis | UK charity for arthritis and frailty support</title>
    <meta name="description" content="UK charity homepage description" />
    <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
    <link rel="canonical" href="https://livingwitharthritis.org.uk/" />
  </head>
  <body>
    <div id="root">
      <div id="seo-fallback">
      <main>
        <h1>${HOME_SHELL_HEADING}</h1>
        <p>Living With Arthritis is a UK charity helping the 10 million people in Britain living with arthritis and joint pain.</p>
      </main>
      </div>
    </div>
  </body>
</html>`;

function wordCount(html: string): number {
  return stripToText(html).split(/\s+/).filter(Boolean).length;
}

describe("library head data for GSC indexing", () => {
  const data = buildLibraryHeadData();

  it("does not emit Library — slug stub titles for lupus-symptoms", () => {
    const page = data["/library/lupus-symptoms"];
    expect(page).toBeTruthy();
    expect(page.title).not.toMatch(/^Library —/i);
    expect(page.question).not.toMatch(/^Library —/i);
    expect(page.question).toMatch(/lupus/i);
    expect(page.bodyHtml).toMatch(/butterfly|malar|fatigue/i);
    expect(wordCount(page.bodyHtml)).toBeGreaterThan(500);
  });

  it("skips redirected library slugs such as glucosamine", () => {
    expect(data["/library/glucosamine"]).toBeUndefined();
    expect(data["/library/lupus"]).toBeTruthy();
    expect(data["/library/gout-symptoms"]).toBeTruthy();
    expect(data["/library/ankylosing-spondylitis"]).toBeTruthy();
  });

  it("bakes unique article HTML that is not the homepage shell", () => {
    const page = data["/library/lupus-symptoms"];
    const html = rewriteHead(TEMPLATE, "/library/lupus-symptoms", page);
    expect(html).toContain("<title>");
    expect(html).not.toContain("Library — lupus symptoms");
    expect(html).toContain("butterfly");
    expect(html).not.toContain(HOME_SHELL_HEADING);
    expect(html).toContain('rel="canonical" href="https://livingwitharthritis.org.uk/library/lupus-symptoms"');
  });
});

describe("library SEO overlays for rejected stubs", () => {
  it("gives lupus-symptoms a unique UK title and extra sections", () => {
    const seo = getLibraryTopicSeo("lupus-symptoms");
    const topic = getHealthTopic("lupus-symptoms");
    expect(topic).toBeTruthy();
    expect(seo?.title).toMatch(/Lupus symptoms UK/i);
    expect(seo?.h1).not.toMatch(/^Library —/i);
    expect(seo?.extraSections?.length).toBeGreaterThan(3);
    expect(seo?.related?.some((r) => r.href === "/conditions/lupus/symptoms")).toBe(
      true,
    );
  });
});

describe("committed library-head-data.json stays in sync", () => {
  it("includes the GSC-rejected library URL with real body copy", () => {
    const heads = JSON.parse(
      readFileSync(resolve(process.cwd(), "scripts/library-head-data.json"), "utf8"),
    ) as Record<string, { question?: string; bodyHtml?: string; title?: string }>;
    expect(heads["/library/lupus-symptoms"]?.title).toMatch(/lupus/i);
    expect(heads["/library/lupus-symptoms"]?.question).not.toMatch(/^Library —/i);
    expect(heads["/library/lupus-symptoms"]?.bodyHtml).toMatch(/butterfly|malar/i);
  });
});
