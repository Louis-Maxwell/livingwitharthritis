import flagship from "@/data/arthritisFlagshipApproved.json";
import approvedKeywordCopy from "@/data/libraryKeyword25.json";
import { describe, it, expect } from "vitest";
import { STANDALONE_ANSWER_CAPSULES } from "@/data/standaloneAnswerCapsules";
import { LIBRARY_ANSWER_CAPSULES } from "@/data/libraryAnswerCapsules";
import { buildLibraryHeadData } from "../../../scripts/generate-library-head-data";
import { conditionSubpages } from "@/data/conditionSubpages";
import { ROUTE_TITLE_OVERRIDES } from "@/data/routeTitleOverrides";
import { EXERCISE_URGENT_ADVICE, EXERCISE_EMERGENCY_ADVICE } from "@/data/exerciseSafety";
import { exerciseJointPages } from "@/data/exerciseJointMatrix";
import { headDataFor } from "../../../scripts/inject-canonicals.mjs";
import { labelArticleSections, buildStaticArticleInner } from "../../../scripts/static-article-html.mjs";

describe("crawler passage semantics", () => {
  it("keeps nine standalone route answers complete and within band", () => {
    expect(Object.keys(STANDALONE_ANSWER_CAPSULES)).toHaveLength(9);
    for (const [route, answer] of Object.entries(STANDALONE_ANSWER_CAPSULES)) {
      expect(answer.split(/\s+/).length, route).toBeGreaterThanOrEqual(40);
      const approved = approvedKeywordCopy[route.split("/").pop() as keyof typeof approvedKeywordCopy];
      if (approved) expect(answer).toBe(approved.answer);
      else expect(answer.split(/\s+/).length, route).toBeLessThanOrEqual(52);
      expect(headDataFor(route).answer).toBe(route === "/conditions/arthritis" ? flagship.answer : answer);
      expect(answer).toMatch(/[.!?]$/);
    }
  });
  it("uses full library answers and preserves approved clinical wording without length-driven truncation", () => {
    const generated = buildLibraryHeadData();
    expect(Object.keys(generated)).toHaveLength(54);
    for (const [route, data] of Object.entries(generated)) {
      const answer = LIBRARY_ANSWER_CAPSULES[route.split("/").pop()!];
      expect(answer, route).toBeTruthy();
      expect(answer.split(/\s+/).length, route).toBeGreaterThanOrEqual(40);
      const approved = approvedKeywordCopy[route.split("/").pop() as keyof typeof approvedKeywordCopy];
      if (approved) expect(answer).toBe(approved.answer);
      else expect(answer.split(/\s+/).length, route).toBeLessThanOrEqual(52);
      expect(answer, route).toMatch(/[.!?]$/);
      expect(data.answer).toBe(answer);
      expect(headDataFor(route).answer).toBe(answer);
    }
  });
  it("uses complete 40-52 word source introductions for all 64 condition subpages", () => {
    let count = 0;
    for (const [condition, sections] of Object.entries(conditionSubpages)) {
      for (const [section, data] of Object.entries(sections)) {
        const words = data.intro.split(/\s+/).length;
        expect(words, `${condition}/${section}`).toBeGreaterThanOrEqual(40);
        expect(words, `${condition}/${section}`).toBeLessThanOrEqual(52);
        expect(headDataFor(`/conditions/${condition}/${section}`).answer).toBe(data.intro);
        expect(data.intro).toMatch(/[.!?]$/);
        count++;
      }
    }
    expect(count).toBe(64);
  });
  it("uses the same specific editorial title in the build data", () => {
    expect(Object.keys(ROUTE_TITLE_OVERRIDES)).toHaveLength(105);
    for (const [route, title] of Object.entries(ROUTE_TITLE_OVERRIDES)) {
      const approved = approvedKeywordCopy[route.split("/").pop() as keyof typeof approvedKeywordCopy];
      if (approved) expect(title).toBe(approved.title);
      else expect(title.length).toBeGreaterThanOrEqual(50);
      expect(title.length).toBeLessThanOrEqual(60);
      expect(title).not.toMatch(/Living With Arthritis UK|\| Guide.*\| Guide/);
      expect(headDataFor(route).title).toBe(title);
    }
  });
  it("keeps all exercise-matrix introductions in the answer band and in sync", () => {
    expect(exerciseJointPages).toHaveLength(48);
    for (const page of exerciseJointPages) {
      const words = page.intro.trim().split(/\s+/).length;
      expect(words).toBeGreaterThanOrEqual(40);
      expect(words).toBeLessThanOrEqual(52);
      const head = headDataFor(`/exercises/${page.slug}`);
      expect(head.answer).toBe(page.intro);
      expect(String(head.bodyHtml)).toContain(EXERCISE_URGENT_ADVICE);
      expect(String(head.bodyHtml)).toContain(EXERCISE_EMERGENCY_ADVICE.replace(/&/g, "&amp;"));
      expect(String(head.bodyHtml)).toContain(page.intro);
      expect(String(head.bodyHtml)).not.toContain("is one of the most recommended activities");
    }
  });
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
    expect(doc.querySelector('.answer-box blockquote[data-callout="note"]')?.textContent).toBe("NoteExisting reviewed answer.");
    expect(doc.querySelector("section[aria-labelledby] h2")?.id).toBe("passage-safety");
  });
});
