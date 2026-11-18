import { describe, expect, it } from "vitest";
import { GLOSSARY_CONTENT } from "@/data/glossary-content";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";
import { collectRoutes, rewriteHead } from "../../../scripts/inject-canonicals.mjs";

const selected = ["facet-joint-injection", "methotrexate", "pain-scale", "self-referral", "bone-density", "codeine", "nice", "bisphosphonates", "hydroxychloroquine"];
describe("existing moved-page glossary destination repairs", () => {
  it("provides concise source-checked definitions without claiming clinical signoff", () => {
    for (const slug of selected) {
      const entry = GLOSSARY_CONTENT[slug];
      expect(GLOSSARY_ROUTES).toContain(`/glossary/${slug}`);
      expect(entry.body.split(/\s+/).length).toBeGreaterThanOrEqual(50);
      expect(entry.body.split(/\s+/).length).toBeLessThanOrEqual(100);
      expect(entry.editorialUpdatedAt).toBe("2026-11-18");
      expect(entry.reviewNote).toContain("not yet had an independent clinical review");
      expect(entry.sources?.length).toBeGreaterThan(0);
      for (const source of entry.sources || []) expect(new URL(source.url).hostname).toMatch(/(^|\.)(nhs\.uk|nice\.org\.uk)$/);
      for (const related of entry.related || []) expect(GLOSSARY_ROUTES).toContain(`/glossary/${related}`);
      expect(entry.body).not.toMatch(/fuller definition|being written|clinical team/);
    }
    expect(GLOSSARY_CONTENT.methotrexate.body).toContain("once a week");
    expect(GLOSSARY_CONTENT.methotrexate.body).toContain("not every day");
    expect(GLOSSARY_CONTENT["self-referral"].body).toContain("Availability and eligibility vary");
    expect(GLOSSARY_CONTENT.hydroxychloroquine.body).toContain("eye checks");
    expect(GLOSSARY_CONTENT.codeine.body).toContain("addiction");
  });
  it("includes each unchanged URL with its own canonical, content, sources and review note in the first response", () => {
    const routes = collectRoutes();
    const template = '<html><head><title>Home</title></head><body><div id="root"><div id="seo-fallback"><main><h1>Home</h1></main></div></div></body></html>';
    for (const slug of selected) {
      const path = `/glossary/${slug}`;
      expect(routes).toContain(path);
      const term = GLOSSARY_CONTENT[slug];
      const entry = { title: term.label, description: term.short, question: term.label, answer: term.short, bodyHtml: `<p>${term.body}</p>`, updatedAt: term.editorialUpdatedAt, summaryReviewNote: term.reviewNote, sources: term.sources, definedTerm: { name: term.label, description: term.body } };
      const html = rewriteHead(template, path, entry);
      expect(html).toContain(`href="https://livingwitharthritis.org.uk${path}"`);
      expect(html).toContain(term.body);
      expect(html).toContain('id="static-article"');
      expect(html).not.toContain('content="noindex');
      expect(html).toContain("not yet had an independent clinical review");
      for (const source of term.sources || []) expect(html).toContain(source.url);
    }
  });
});
