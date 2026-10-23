import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const read = (p: string) => readFileSync(resolve(p), "utf8");
const BRAND_UK = /Living\W+With\W+Arthritis\W+UK\b/i;

describe("23 Oct visibility pass", () => {
  it("never puts UK directly after the charity name in user-facing files", () => {
    const files = ["index.html", "public/llms.txt", "public/search-index.json", "scripts/ai-head-data.json", "src/lib/prerenderReady.ts"];
    for (const dir of ["src/pages", "src/content/blog/posts"]) {
      for (const f of readdirSync(resolve(dir))) if (/\.(tsx|json)$/.test(f)) files.push(join(dir, f));
    }
    const bad = files.filter((f) => BRAND_UK.test(read(f)));
    expect(bad).toEqual([]);
  });

  it("gives crawlers real titles for the PIP diary, flare plan and exercise hub", () => {
    const data = JSON.parse(read("scripts/ai-head-data.json"));
    expect(data["/resources/pip-evidence-diary"].title).toMatch(/PIP Evidence Diary/);
    expect(data["/resources/flare-action-plan"].title).toMatch(/Flare-Up Action Plan/);
    expect(data["/exercises"].title).toMatch(/Physiotherapy Exercises for Arthritis at Home/);
    expect(data["/guides/benefits-pip"].answer).toMatch(/0800 917 2222/);
  });

  it("redirects the guessed diet guide URL to the diet hub", () => {
    expect(read("src/lib/seoRedirects.ts")).toMatch(/"\/guides\/arthritis-diet": "\/diet"/);
  });
});
