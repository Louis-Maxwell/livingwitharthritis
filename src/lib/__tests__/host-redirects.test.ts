/// <reference types="node" />
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { resolveSeoRedirect } from "@/lib/seoRedirects";
import {
  buildRedirectHtml,
  exactRedirects,
  exactRedirectPathSet,
} from "../../../scripts/seo-redirect-map.mjs";
import { writeRedirectHtml } from "../../../scripts/write-redirect-html.mjs";
import { hostRedirectsDrift } from "../../../scripts/sync-host-redirects.mjs";
import { collectRoutes, rewriteHead } from "../../../scripts/inject-canonicals.mjs";

describe("host + client SEO redirects", () => {
  it("maps the live GSC soft-404s onto real pages", () => {
    expect(resolveSeoRedirect("/arthritis-support/stockport")).toBe(
      "/arthritis-support/manchester",
    );
    expect(resolveSeoRedirect("/blog/mindfulness-meditation-chronic-pain")).toBe(
      "/blog/mindfulness-chronic-pain-arthritis-guide",
    );
    expect(
      exactRedirectPathSet().has("/arthritis-support/stockport"),
    ).toBe(true);
    expect(
      exactRedirectPathSet().has("/blog/mindfulness-meditation-chronic-pain"),
    ).toBe(true);
  });

  it("keeps the JS map and the TypeScript resolver in lockstep for exact paths", () => {
    for (const { from, to } of exactRedirects()) {
      expect(resolveSeoRedirect(from)).toBe(to);
    }
  });

  it("writes stub HTML with noindex, canonical, refresh and no article body", () => {
    const html = buildRedirectHtml(
      "/blog/mindfulness-meditation-chronic-pain",
      "/blog/mindfulness-chronic-pain-arthritis-guide",
    );
    expect(html).toContain('content="noindex, follow"');
    expect(html).toContain(
      'rel="canonical" href="https://livingwitharthritis.org.uk/blog/mindfulness-chronic-pain-arthritis-guide"',
    );
    expect(html).toContain(
      'http-equiv="refresh" content="0;url=/blog/mindfulness-chronic-pain-arthritis-guide"',
    );
    expect(html).toContain("location.replace");
    expect(html).toContain("This page has moved");
    expect(html).not.toContain('id="static-article"');
    expect(html).not.toContain("Living With Arthritis | UK charity for joint pain support");
  });

  it("drops stub files into dist so the SPA fallback cannot win", () => {
    const dir = mkdtempSync(join(tmpdir(), "lwa-redirects-"));
    writeFileSync(join(dir, "index.html"), "<html><title>home</title></html>");
    try {
      const { written } = writeRedirectHtml(dir);
      expect(written).toBeGreaterThan(20);
      const stockport = readFileSync(
        join(dir, "arthritis-support/stockport/index.html"),
        "utf8",
      );
      const oldBlog = readFileSync(
        join(dir, "blog/mindfulness-meditation-chronic-pain/index.html"),
        "utf8",
      );
      expect(stockport).toContain("/arthritis-support/manchester");
      expect(oldBlog).toContain("/blog/mindfulness-chronic-pain-arthritis-guide");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("keeps vercel.json generated from the map", () => {
    expect(hostRedirectsDrift()).toEqual([]);
    const vercel = JSON.parse(
      readFileSync(resolve(process.cwd(), "vercel.json"), "utf8"),
    );
    const sources = new Set(
      vercel.redirects.map((r: { source: string }) => r.source),
    );
    expect(sources.has("/arthritis-support/stockport")).toBe(true);
    expect(sources.has("/blog/mindfulness-meditation-chronic-pain")).toBe(true);
  });

  it("does not bake article HTML onto redirect sources via inject-canonicals", () => {
    const routes = collectRoutes();
    expect(routes).not.toContain("/arthritis-support/stockport");
    expect(routes).not.toContain("/blog/mindfulness-meditation-chronic-pain");
  });


  it("includes GSC locale + glucosamine + hip exercises in the exact host map", () => {
    const paths = exactRedirectPathSet();
    expect(paths.has("/es/glossary/nice")).toBe(true);
    expect(paths.has("/library/glucosamine")).toBe(true);
    expect(paths.has("/conditions/hip-arthritis/exercises")).toBe(true);
    expect(paths.has("/de/glossary/methotrexate")).toBe(true);
    expect(resolveSeoRedirect("/es/glossary/nice")).toBe("/glossary/nice");
    expect(resolveSeoRedirect("/library/glucosamine")).toBe(
      "/supplements/glucosamine",
    );
  });

  it("still bakes static-article HTML for the live mindfulness guide", () => {
    const template = `<!doctype html>
<html lang="en-GB">
  <head>
    <title>Living With Arthritis | UK charity for joint pain support</title>
    <meta name="description" content="UK charity homepage description" />
    <meta property="og:url" content="https://livingwitharthritis.org.uk/" />
  </head>
  <body>
    <div id="root">
      <div id="seo-fallback"><main><h1>Living With Arthritis — UK charity for people with joint pain</h1></main></div>
    </div>
  </body>
</html>`;
    const html = rewriteHead(template, "/blog/mindfulness-chronic-pain-arthritis-guide", {
      title: "Mindfulness for Chronic Arthritis Pain: A Practical Guide | Living With Arthritis UK",
      description: "Mindfulness-Based Stress Reduction can reduce arthritis pain.",
      question: "Mindfulness for Chronic Arthritis Pain: A Practical Guide",
      answer: "Mindfulness changes your relationship with pain.",
      article: {
        slug: "mindfulness-chronic-pain-arthritis-guide",
        title: "Mindfulness for Chronic Arthritis Pain",
        content: "## Beyond Just Relax\n\nNICE recommends mindfulness-based approaches for chronic pain.",
      },
    });
    expect(html).toContain('id="static-article"');
    expect(html).toContain("NICE recommends mindfulness");
    expect(html).not.toContain("This page has moved");
  });
});
