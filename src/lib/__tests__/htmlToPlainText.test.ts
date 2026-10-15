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

describe("htmlToPlainText entity decoding (CodeQL js/double-escaping guard)", () => {
  it("decodes each entity only once: &amp;lt; stays as literal &lt; text", () => {
    // Double-decoding would turn "&amp;lt;" into "<" and then strip it.
    expect(htmlToPlainText("<p>Type &amp;lt;b&amp;gt; for bold</p>")).toBe(
      "Type &lt;b&gt; for bold",
    );
  });

  it("decodes numeric and hex entities", () => {
    expect(htmlToPlainText("<p>Caf&#233; &#x2014; open</p>")).toBe("Café — open");
    expect(htmlToPlainText("<p>It&#39;s &apos;fine&apos; &QUOT;ok&quot;</p>")).toBe(
      "It's 'fine' \"ok\"",
    );
  });

  it("still removes encoded tags and never emits angle brackets", () => {
    const plain = htmlToPlainText("<p>&lt;script&gt;alert(1)&lt;/script&gt;Hi</p>");
    expect(plain).not.toMatch(/[<>]/);
    expect(plain).toContain("Hi");
  });

  it("leaves unknown or invalid entities untouched", () => {
    expect(htmlToPlainText("<p>A &foo; B &#0; C</p>")).toBe("A &foo; B &#0; C");
  });
});
