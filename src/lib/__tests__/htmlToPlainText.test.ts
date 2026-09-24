import { describe, expect, it } from "vitest";
import { htmlToPlainText, stripHtml } from "@/lib/sanitize";

describe("htmlToPlainText", () => {
  it("inserts a space between adjacent paragraphs so FAQ answers are not mashed", () => {
    const html = "<p>Pain settles within 24 hours.</p><p>Try a warm shower.</p>";
    const plain = htmlToPlainText(html);
    expect(plain).toContain("hours. Try");
    expect(plain).not.toContain("hours.Try");
    expect(plain).toBe("Pain settles within 24 hours. Try a warm shower.");
  });

  it("inserts a space between list items", () => {
    const html = "<ul><li>Rest the joint.</li><li>Apply a warm compress.</li></ul>";
    const plain = htmlToPlainText(html);
    expect(plain).toContain("joint. Apply");
    expect(plain).not.toContain("joint.Apply");
  });

  it("treats br as a word break", () => {
    const html = "First sentence.<br>Second sentence.";
    expect(htmlToPlainText(html)).toBe("First sentence. Second sentence.");
  });

  it("decodes common entities and collapses whitespace", () => {
    const html = "<p>Heat&nbsp;&amp;&nbsp;ice&nbsp;help.</p>";
    expect(htmlToPlainText(html)).toBe("Heat & ice help.");
  });

  it("documents that bare stripHtml still mashes block boundaries (regression guard)", () => {
    const html = "<p>Pain settles within 24 hours.</p><p>Try a warm shower.</p>";
    const mashed = stripHtml(html).replace(/\s+/g, " ").trim();
    expect(mashed).toContain("hours.Try");
    expect(htmlToPlainText(html)).not.toContain("hours.Try");
  });
});
