import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { marked } from "marked";
import {
  dedentIndentedHtmlForMarked,
  repairFencedArticleHtml,
  unwrapEscapedHtmlCodeBlocks,
} from "@/lib/articleHtmlCodeBlocks.mjs";
import { renderArticleHtml } from "../../../scripts/static-article-html.mjs";
import { ALL_BLOG_POSTS as blogArticles } from "@/test/blogPosts";

describe("article HTML code-block guards", () => {
  it("unwraps escaped block HTML trapped in pre/code", () => {
    const fenced =
      `<p>Intro</p><pre><code>  &lt;h2&gt;Types of Arthritis in Young People&lt;/h2&gt;\n` +
      `  &lt;ul&gt;&lt;li&gt;Oligoarticular JIA&lt;/li&gt;&lt;/ul&gt;\n</code></pre>`;
    const out = unwrapEscapedHtmlCodeBlocks(fenced);
    expect(out).toContain("<h2>Types of Arthritis in Young People</h2>");
    expect(out).not.toMatch(/<pre><code>[\s\S]*&lt;h2/);
  });

  it("dedents indented HTML so marked does not fence it", () => {
    const mixed = `<p class="quick-answer">QA</p>

    <h2>Types of Arthritis in Young People</h2>
    <ul>
      <li>Oligoarticular JIA</li>
    </ul>

## Practical next steps

Pick one change.
`;
    const prepared = dedentIndentedHtmlForMarked(mixed);
    const raw = String(marked.parse(prepared, { async: false }));
    const html = unwrapEscapedHtmlCodeBlocks(raw);
    expect(html).toContain("<h2>Types of Arthritis in Young People</h2>");
    expect(html).not.toMatch(/<pre><code>[\s\S]*&lt;h2/);
  });

  it("renderArticleHtml never emits escaped h2 inside pre/code for mixed content", () => {
    const mixed = `<p>Lead</p>

    <h2>Types of Arthritis in Young People</h2>
    <p>Body</p>

## Next

Done.
`;
    const html = renderArticleHtml(mixed);
    expect(html).toContain("<h2>Types of Arthritis in Young People</h2>");
    expect(html).not.toMatch(/<pre><code>[\s\S]*&lt;h2/);
  });

  it("arthritis-in-young-people-uk content is clean", () => {
    const arts = blogArticles as { slug?: string; content?: string }[];
    const yp = arts.find((a) => a.slug === "arthritis-in-young-people-uk");
    expect(yp).toBeTruthy();
    const content = String(yp?.content || "");
    expect(content).toContain("<h2>Types of Arthritis in Young People</h2>");
    expect(content).not.toMatch(/<pre><code>[\s\S]*&lt;h2/);
    expect(content).not.toMatch(/&lt;h2&gt;Types of Arthritis in Young People/);
    // expansion dupes collapsed
    expect((content.match(/Keep expectations kind/g) || []).length).toBeLessThanOrEqual(1);
  });

  it("no published catalog post stores escaped h2 inside pre/code", () => {
    const arts = blogArticles as { slug?: string; content?: string; is_published?: boolean }[];
    const bad = arts.filter((a) => {
      if (a.is_published === false) return false;
      const c = String(a.content || "");
      return /<pre><code>/.test(c) && /&lt;h[1-6]|&lt;p|&lt;ul|&lt;ol|&lt;li/.test(c);
    });
    expect(bad.map((a) => a.slug)).toEqual([]);
  });

  it("repairFencedArticleHtml is idempotent on young-people sample", () => {
    const raw = readFileSync(
      resolve("src/content/blog/posts/arthritis-in-young-people-uk.json"),
      "utf8",
    );
    expect(raw).toContain("arthritis-in-young-people-uk");
    const once = repairFencedArticleHtml(
      `<pre><code>&lt;h2&gt;Hello&lt;/h2&gt;\n&lt;p&gt;x&lt;/p&gt;</code></pre>`,
    );
    expect(repairFencedArticleHtml(once)).toBe(once);
  });
});
