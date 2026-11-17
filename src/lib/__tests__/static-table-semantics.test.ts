import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { renderArticleHtml } from "../../../scripts/static-article-html.mjs";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const scopes = (html: string) => {
  const root = document.createElement("div");
  root.innerHTML = html;
  return [...root.querySelectorAll("th")].map((th) => ({ text: th.textContent, scope: th.getAttribute("scope") }));
};

describe("static and hydrated article table semantics", () => {
  it("adds column and row scopes without changing table structure or content", () => {
    const html = '<table><caption>Recovery stages</caption><thead><tr><th>Stage</th><th>Notes</th></tr></thead><tbody><tr><th>Week one</th><td>Follow your care plan.</td></tr></tbody></table>';
    const result = renderArticleHtml(html);
    expect(scopes(result)).toEqual([{ text: "Stage", scope: "col" }, { text: "Notes", scope: "col" }, { text: "Week one", scope: "row" }]);
    expect(result).toContain('<caption>Recovery stages</caption>');
    expect(result).toContain('<td>Follow your care plan.</td>');
    expect(scopes(result)).toEqual(scopes(sanitizeHtml(html)));
  });

  it("preserves explicit header groups and spans", () => {
    const html = '<table><thead><tr><th scope="colgroup" colspan="2">Activity</th></tr></thead><tbody><tr><th scope="rowgroup" rowspan="2">Morning</th><td>Notes</td></tr></tbody></table>';
    const result = renderArticleHtml(html);
    expect(scopes(result)).toEqual([{ text: "Activity", scope: "colgroup" }, { text: "Morning", scope: "rowgroup" }]);
    expect(result).toContain('colspan="2"');
    expect(result).toContain('rowspan="2"');
  });

  it("keeps the published recovery milestones table equivalent before hydration", () => {
    const post = JSON.parse(readFileSync(resolve("src/content/blog/posts/hip-replacement-recovery-week-by-week.json"), "utf8"));
    const result = renderArticleHtml(post.content);
    const headers = scopes(result);
    expect(headers.length).toBeGreaterThan(2);
    expect(headers.slice(0, 2).map((h) => h.scope)).toEqual(["col", "col"]);
    expect(headers.slice(2).every((h) => h.scope === "row")).toBe(true);
    expect(headers).toEqual(scopes(sanitizeHtml(post.content)));
  });

  it("does not promote data cells or allow scripts through", () => {
    const result = renderArticleHtml('<table><tbody><tr><td>Data only</td></tr></tbody></table><script>alert(1)</script>');
    expect(scopes(result)).toEqual([]);
    expect(result).not.toContain("<script");
    expect(result).toContain("<td>Data only</td>");
  });
});
