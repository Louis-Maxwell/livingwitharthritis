import { describe, expect, it } from "vitest";
import fs from "node:fs";
import { GLOSSARY_CONTENT } from "@/data/glossary-content";
import { GLOSSARY_ROUTES } from "@/data/glossary-routes.generated";
import { buildStaticArticleInner } from "../../../scripts/static-article-html.mjs";

const selected = ["sulfasalazine", "raynauds"];
describe("source-checked glossary replacements", () => {
  it("replaces two existing placeholders with concise sourced definitions and no clinical attestation", () => {
    for (const slug of selected) {
      const entry = GLOSSARY_CONTENT[slug];
      expect(GLOSSARY_ROUTES).toContain(`/glossary/${slug}`);
      expect(entry.body.split(/\s+/).length).toBeGreaterThanOrEqual(50);
      expect(entry.body.split(/\s+/).length).toBeLessThanOrEqual(100);
      expect(entry.editorialUpdatedAt).toBe("2026-11-17");
      expect(entry.reviewNote).toContain("not yet had an independent clinical review");
      expect(entry.sources?.length).toBeGreaterThanOrEqual(2);
      for (const source of entry.sources || []) expect(new URL(source.url).hostname).toMatch(/(^|\.)nhs\.uk$/);
      expect(entry.body).not.toMatch(/safe in pregnancy|clinical team|guarantee/i);
    }
  });
  it("renders the source links, actual editorial update and pending-review note in first-response articles", () => {
    for (const slug of selected) {
      const entry = GLOSSARY_CONTENT[slug];
      const html = buildStaticArticleInner({ question: entry.label, answer: entry.short,
        bodyHtml: `<p>${entry.body}</p>`, updatedAt: entry.editorialUpdatedAt,
        sources: entry.sources, summaryReviewNote: entry.reviewNote });
      expect(html).toContain(entry.body);
      expect(html).toContain(entry.reviewNote);
      expect(html).toContain("Last updated 2026-11-17");
      expect(html).not.toContain("Clinically reviewed");
      for (const source of entry.sources || []) expect(html).toContain(source.url);
    }
  });
  it("keeps unknown definitions unchanged and limits seed-answer precedence to explicitly updated glossary entries", () => {
    for (const slug of ["stem-cell", "unknown-term"]) expect(GLOSSARY_CONTENT[slug]).toBeUndefined();
    const script = fs.readFileSync("scripts/inject-canonicals.mjs", "utf8");
    expect(script).toContain('route.startsWith("/glossary/") && entry.summaryReviewNote');
    const page = fs.readFileSync("src/pages/GlossaryTerm.tsx", "utf8");
    expect(page).toContain("noindex={!entry}");
    expect(page).toContain("entry?.reviewNote");
    expect(page).toContain("entry.sources.map");
    expect(page).toContain("updatedAt={updatedIso}");
  });
});
