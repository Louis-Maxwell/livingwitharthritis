import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (rel: string) => readFileSync(resolve(rel), "utf8");

describe("Tony Jung checklist polish — 24 Sep evening (code-side)", () => {
  it("major visitor-job templates expose PageBreadcrumb (UI + BreadcrumbList)", () => {
    const mustHavePageBreadcrumb = [
      "src/pages/LibraryTopic.tsx",
      "src/pages/BenefitsPipHub.tsx",
      "src/pages/GuidesHub.tsx",
      "src/pages/Contact.tsx",
      "src/pages/FaqArticle.tsx",
      "src/pages/ExerciseHub.tsx",
      "src/pages/DietHub.tsx",
      "src/pages/SymptomChecker.tsx",
      "src/pages/ConditionSubpagePage.tsx",
      "src/components/conditions/ConditionPageTemplate.tsx",
      "src/pages/guides/UnderstandingPain.tsx",
    ];
    for (const file of mustHavePageBreadcrumb) {
      const src = read(file);
      expect(src, `${file} should import/use PageBreadcrumb`).toMatch(
        /PageBreadcrumb/,
      );
    }
  });

  it("BlogPost already ships UI breadcrumb + BreadcrumbList JSON-LD (no duplicate PageBreadcrumb required)", () => {
    const src = read("src/pages/BlogPost.tsx");
    expect(src).toMatch(/aria-label="Breadcrumb"/);
    expect(src).toMatch(/"@type": "BreadcrumbList"/);
  });

  it("Contact map is env-gated and never invents Oswestry / street address", () => {
    const contact = read("src/pages/Contact.tsx");
    const map = read("src/components/contact/GbpMapSection.tsx");
    const cfg = read("src/config/gbpMaps.ts");
    expect(contact).toMatch(/GbpMapSection/);
    expect(map).toMatch(/Map goes live once Google Business Profile is verified/);
    expect(map).toMatch(/Area served: United Kingdom \(GB\)/);
    // UI must not claim Oswestry; config may mention it only as a forbidden example.
    expect(contact).not.toMatch(/Oswestry/i);
    expect(map).not.toMatch(/Oswestry/i);
    expect(cfg).toMatch(/VITE_GBP_MAPS_EMBED_URL/);
    expect(cfg).toMatch(/never invent a street address/i);
  });

  it("Bing verification is empty-safe via env (no invented msvalidate token / BingSiteAuth.xml)", () => {
    const seo = read("src/components/SeoDefaults.tsx");
    const envEx = read(".env.example");
    expect(seo).toMatch(/VITE_BING_SITE_VERIFICATION/);
    expect(seo).toMatch(/msvalidate\.01/);
    expect(envEx).toMatch(/VITE_BING_SITE_VERIFICATION/);
    expect(read("index.html")).not.toMatch(/msvalidate\.01/);
  });

  it("security headers live in public/_headers (SPA — not Wordfence)", () => {
    const headers = read("public/_headers");
    expect(headers).toMatch(/Strict-Transport-Security/);
    expect(headers).toMatch(/X-Content-Type-Options:\s*nosniff/);
    expect(headers).toMatch(/Referrer-Policy:/);
    expect(headers).toMatch(/Permissions-Policy:/);
    expect(headers).toMatch(/frame-ancestors 'none'/);
    expect(headers).not.toMatch(/Wordfence/i);
  });

  it("indexing checklist docs exist for Louis publish / GSC / www 301", () => {
    const doc = read("docs/seo/INDEXING-CHECKLIST.md");
    expect(doc).toMatch(/sitemap\.xml/);
    expect(doc).toMatch(/Request indexing/i);
    expect(doc).toMatch(/www/);
    expect(doc).toMatch(/city doorway/i);
    expect(doc).toMatch(/Wordfence/);
    expect(doc).toMatch(/1218461/);
  });
});
