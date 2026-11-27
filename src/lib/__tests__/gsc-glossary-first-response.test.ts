import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { GLOSSARY_CONTENT } from "@/data/glossary-content";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";
import { collectRoutes, rewriteHead } from "../../../scripts/inject-canonicals.mjs";
import { buildRedirectHtml, exactRedirects } from "../../../scripts/seo-redirect-map.mjs";

const selected = ["dass-score", "cfs", "passive-vs-active-movement", "meniscus"];
describe("Google soft-404 glossary repairs", () => {
  it("provides source-checked definitions at all four existing URLs", () => {
    for (const slug of selected) {
      const entry = GLOSSARY_CONTENT[slug];
      expect(GLOSSARY_ROUTES).toContain(`/glossary/${slug}`);
      expect(entry.body.split(/\s+/).length).toBeGreaterThanOrEqual(50);
      expect(entry.body.split(/\s+/).length).toBeLessThanOrEqual(110);
      expect(entry.sources?.length).toBeGreaterThan(0);
      expect(entry.editorialUpdatedAt).toBe("2026-11-18");
      expect(entry.reviewNote).toContain("not yet had an independent clinical review");
      expect(entry.body).not.toMatch(/fuller definition|being written|clinical team/);
    }
    expect(GLOSSARY_CONTENT["dass-score"].body).toContain("DAS28 is a different assessment");
    expect(GLOSSARY_CONTENT.cfs.body).toContain("post-exertional malaise");
  });
  it("includes all four routes with their own content and canonical in the first response", () => {
    const routes = collectRoutes();
    const template = '<html><head><title>Home</title></head><body><div id="root"><div id="seo-fallback"><main><h1>Home</h1></main></div></div></body></html>';
    for (const slug of selected) {
      const path = `/glossary/${slug}`;
      expect(routes).toContain(path);
      const term = GLOSSARY_CONTENT[slug];
      const entry = { title: term.label, description: term.short, question: term.label, answer: term.short, bodyHtml: `<p>${term.body}</p>`, updatedAt: term.editorialUpdatedAt, summaryReviewNote: term.reviewNote, sources: term.sources, definedTerm: { name: term.label, description: term.body } };
      const html = rewriteHead(template, path, entry);
      expect(html).toContain(`href="https://livingwitharthritis.org.uk${path}"`);
      expect(html).toContain(GLOSSARY_CONTENT[slug].body);
      expect(html).toContain('id="static-article"');
      expect(html).not.toContain('content="noindex');
      expect(html).toContain("not yet had an independent clinical review");
      for (const source of GLOSSARY_CONTENT[slug].sources || []) expect(html).toContain(source.url);
    }
  });
  it("keeps every redirect destination and JS redirect with noindex and no meta-refresh", () => {
    for (const { from, to } of exactRedirects()) {
      const html = buildRedirectHtml(from, to);
      expect(html).toContain('name="robots" content="noindex, follow"');
      expect(html).not.toContain('http-equiv="refresh"');
      expect(html).toContain(`rel="canonical" href="https://livingwitharthritis.org.uk${to}"`);
    }
    expect(fs.readFileSync("public/_redirects", "utf8")).toContain(" 301");
  });
});
