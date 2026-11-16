import { describe, it, expect } from "vitest";
import { headDataFor } from "../../../scripts/inject-canonicals.mjs";
import { labelArticleSections, buildStaticArticleInner } from "../../../scripts/static-article-html.mjs";

describe("crawler passage semantics", () => {
  it.each(["/exercises", "/guides/diet", "/library"])("loads captured labelled sections for %s", (route) => {
    const data = headDataFor(route);
    const doc = new DOMParser().parseFromString(String(data.bodyHtml), "text/html");
    const sections = [...doc.querySelectorAll("section[aria-labelledby]")];
    expect(sections.length).toBeGreaterThan(0);
    for (const section of sections) {
      const id = section.getAttribute("aria-labelledby")!;
      expect(doc.getElementById(id)?.tagName).toMatch(/^H[2-4]$/);
    }
  });

  it("labels existing and flat sections with stable unique heading IDs", () => {
    const input = '<section><h2>Exercise safety</h2><p>Keep the existing advice.</p></section><h2>Next steps</h2><p>Speak to your clinician.</p><h2>Next steps</h2><ul><li>Use the guide.</li></ul>';
    const html = labelArticleSections(input);
    const doc = new DOMParser().parseFromString(html, "text/html");
    for (const h of doc.querySelectorAll("h2")) {
      expect(h.closest("section")?.getAttribute("aria-labelledby")).toBe(h.id);
      expect(doc.querySelectorAll(`[id="${h.id}"]`).length).toBe(1);
    }
    expect(labelArticleSections(html)).toBe(html);
    expect(doc.body.textContent).toContain("Keep the existing advice.");
  });
  it("adds a standard note without rewriting or inventing clinical advice", () => {
    const html = buildStaticArticleInner({ question: "How?", answer: "Existing reviewed answer.", bodyHtml: "<h2>Safety</h2><p>Existing advice.</p>" });
    const doc = new DOMParser().parseFromString(html, "text/html");
    expect(doc.querySelector(".answer-box blockquote")?.textContent).toBe("[!NOTE]Existing reviewed answer.");
    expect(doc.querySelector("section[aria-labelledby] h2")?.id).toBe("passage-safety");
  });
});
