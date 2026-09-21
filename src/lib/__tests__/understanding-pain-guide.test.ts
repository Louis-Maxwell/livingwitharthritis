/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function read(rel: string) {
  return readFileSync(resolve(root, rel), "utf8");
}

const PATH = "/guides/understanding-pain";
const TITLE = "Understanding Pain | Types, Causes & Talking to Your GP | UK";

describe("Understanding Pain guide (PR #73 follow-up)", () => {
  it("is routed, registered, prerendered and in the sitemap", () => {
    expect(read("src/App.tsx")).toContain(`path="${PATH}"`);
    expect(read("src/lib/guideRegistry.ts")).toContain(`path: "${PATH}"`);
    expect(read("src/data/prerender-routes.generated.json")).toContain(`"${PATH}"`);
    expect(read("public/sitemap.xml")).toContain(
      `https://livingwitharthritis.org.uk${PATH}`,
    );
    expect(read("public/sitemap.xml")).toContain("<lastmod>2026-09-21</lastmod>");
    expect(read("scripts/generate-sitemap.ts")).toContain(`"${PATH}": "2026-09-21"`);
  });

  it("has unique AI head data matching the on-page title and AEO answers", () => {
    const ai = JSON.parse(read("scripts/ai-head-data.json")) as Record<
      string,
      {
        title?: string;
        description?: string;
        question?: string;
        answer?: string;
        faqs?: { q: string; a: string }[];
      }
    >;
    const head = ai[PATH];
    expect(head, "missing scripts/ai-head-data.json entry").toBeTruthy();
    expect(head.title).toBe(TITLE);
    expect(head.description!.length).toBeGreaterThan(110);
    expect(head.title).not.toMatch(/^Conditions —/i);
    expect(head.title).not.toBe(ai["/"]?.title);

    const page = read("src/pages/guides/UnderstandingPain.tsx");
    expect(page).toContain(`<title>${TITLE.replace(/&/g, "&amp;")}</title>`);
    expect(page).toContain("geo.placename");
    expect(page).toContain("United Kingdom");
    expect(page).toContain('href="https://www.nice.org.uk/guidance/ng193"');
    expect(page).toContain("/arthritis-support");
    expect(page).toContain("prefers-reduced-motion");
    expect(page).not.toMatch(/Roughly a quarter/i);

    const aeo = read("src/data/page-aeo.ts");
    expect(aeo).toContain(`"${PATH}"`);
    expect(aeo).toContain(head.question!);
    expect(head.faqs?.length).toBe(3);
  });

  it("is listed for AI citation and does not resurrect removed backends", () => {
    expect(read("public/llms.txt")).toContain(
      `https://livingwitharthritis.org.uk${PATH}`,
    );
    const page = read("src/pages/guides/UnderstandingPain.tsx");
    expect(page).not.toMatch(/@supabase\//);
    expect(page).not.toMatch(/createClient/);
  });
});
