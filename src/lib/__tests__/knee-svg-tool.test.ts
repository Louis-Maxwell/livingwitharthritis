import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { headDataFor } from "../../../scripts/inject-canonicals.mjs";
import { buildStaticArticleInner } from "../../../scripts/static-article-html.mjs";
const html = readFileSync("public/resources/knee-joint-map.html", "utf8");
const css = readFileSync("public/assets/knee-map/knee-map.css", "utf8");
const js = readFileSync("public/assets/knee-map/knee-map.js", "utf8");
describe("standalone progressive knee schematic", () => {
  it("keeps a no-script static SVG and all explanations readable", () => {
    const parsed = new DOMParser().parseFromString(html, "text/html");
    expect(parsed.querySelectorAll("h1")).toHaveLength(1);
    expect(parsed.querySelectorAll("svg")).toHaveLength(1);
    expect(parsed.querySelectorAll("dl>div")).toHaveLength(3);
    expect(parsed.querySelectorAll("canvas,iframe")).toHaveLength(0);
    expect(parsed.body.textContent).toContain("not an anatomically accurate 3D model");
    expect(parsed.body.textContent).toContain("separate clinical review pending");
    expect(buildStaticArticleInner({ question: "Knee diagram", bodyHtml: html })).toContain("Cartilage");
  });
  it("keeps the supplemental tool indexable and canonical without implying clinical review", () => {
    const parsed = new DOMParser().parseFromString(html, "text/html");
    expect(parsed.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("index,follow");
    expect(parsed.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(parsed.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://livingwitharthritis.org.uk/resources/knee-joint-map.html");
    expect(parsed.querySelector('a[href="https://www.niams.nih.gov/health-topics/osteoarthritis"]')).not.toBeNull();
    expect(html).toContain("separate clinical review pending");
    const sitemap = readFileSync("scripts/generate-sitemap.ts", "utf8");
    expect(sitemap).toContain('entries.push({ path: "/resources/knee-joint-map.html", lastmod: "2026-11-17" })');
    expect(sitemap).toContain('!p.endsWith(".html")');
    const injector = readFileSync("scripts/inject-canonicals.mjs", "utf8");
    expect(injector).toContain("if (STATIC_RESOURCES.has(route) ||");
  });
  it("links from raw and hydrated guides without loading a 3D runtime", () => {
    expect(headDataFor("/conditions/knee-arthritis").bodyHtml).toContain("/resources/knee-joint-map.html");
    const page = readFileSync("src/pages/conditions/KneeArthritis.tsx", "utf8");
    expect(page).toContain('href="/resources/knee-joint-map.html"');
    expect(page).not.toContain("KneeJointMap");
    expect(js).not.toContain("fetch(");
  });
  it("provides keyboard selection and immediate reduced-motion cancellation", () => {
    for (const key of ["ArrowRight", "ArrowLeft", "Home", "End"]) expect(js).toContain(key);
    expect(js).toContain("checkbox.disabled=reduce.matches");
    expect(js).toContain("checkbox.checked=false;reset()");
    expect(css).toContain("transform:none!important;transition:none!important");
    expect(css).toContain("touch-action:auto");
    expect(css).toContain("aspect-ratio:1");
  });
});
