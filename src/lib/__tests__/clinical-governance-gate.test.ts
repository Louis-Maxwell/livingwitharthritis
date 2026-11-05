/**
 * CI gate: every guide must carry reviewer, lastReviewed and nextReview,
 * and guide schema must be MedicalWebPage with reviewedBy, lastReviewed and
 * an Organization publisher carrying charity number 1218461.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import reviewIndex from "@/data/blogReviewIndex.generated.json";
import libraryStatus from "@/data/libraryReviewStatus.json";
import { getLibraryLastReviewed, LIBRARY_SITEWIDE_REVIEW_DATE } from "@/data/libraryReview";
import { nextReviewDate, CLINICAL_REVIEWER, GUIDE_PUBLISHER_SCHEMA } from "@/lib/reviewDates";

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => {
    const p = join(d, f);
    return statSync(p).isDirectory() ? (f === "__tests__" ? [] : walk(p)) : /\.tsx?$/.test(f) ? [p] : [];
  });
const src = walk(join(process.cwd(), "src"));

describe("clinical governance gate", () => {
  it("nextReview = lastReviewed + 12 months", () => {
    expect(nextReviewDate("2026-10-23")).toBe("2027-10-23");
    expect(nextReviewDate("")).toBeNull();
  });

  it("every blog guide has reviewer, lastReviewed and nextReview", () => {
    const entries = Object.entries(reviewIndex.lastReviewed as Record<string, string | null>);
    expect(entries.length).toBeGreaterThan(0);
    const bad = entries.filter(([, d]) => !d || !ISO.test(d) || !nextReviewDate(d)).map(([s]) => s);
    expect(bad).toEqual([]);
    expect(CLINICAL_REVIEWER).toMatch(/Louis Maxwell.*PH128483/);
  });

  it("every library topic is reviewed with dates (never pending)", () => {
    expect(ISO.test(LIBRARY_SITEWIDE_REVIEW_DATE)).toBe(true);
    for (const [slug, e] of Object.entries(libraryStatus as Record<string, { reviewStatus: string }>)) {
      expect(e.reviewStatus, slug).toBe("reviewed");
      const d = getLibraryLastReviewed(slug);
      expect(d && nextReviewDate(d), slug).toBeTruthy();
    }
  });

  it("every EducationalDisclaimerBox passes a lastReviewed date", () => {
    const missing = src.filter((f) => /<EducationalDisclaimerBox(\s*\/>|\s+(?![^>]*lastReviewed)[^>]*\/>)/s.test(readFileSync(f, "utf8")));
    expect(missing).toEqual([]);
  });

  it("no 'review date not recorded' copy anywhere", () => {
    expect(src.filter((f) => /review date not recorded/i.test(readFileSync(f, "utf8")))).toEqual([]);
  });

  it("blog guide MedicalWebPage schema has reviewedBy, lastReviewed and charity publisher", () => {
    const blog = readFileSync(join(process.cwd(), "src/pages/BlogPost.tsx"), "utf8");
    const block = blog.slice(blog.indexOf('"@type": "MedicalWebPage"'), blog.indexOf('"@type": "Article"'));
    expect(block).toContain('"publisher": GUIDE_PUBLISHER_SCHEMA');
    expect(block).toContain("...reviewSchemaFields");
    expect(GUIDE_PUBLISHER_SCHEMA["@type"]).toBe("Organization");
    expect(GUIDE_PUBLISHER_SCHEMA.identifier.value).toBe("1218461");
  });

  it("governance pages are routed, in the footer and in the sitemap", () => {
    const r = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
    for (const p of ["/clinical-governance", "/corrections-policy"]) {
      expect(r("src/App.tsx")).toContain(`path="${p}"`);
      expect(r("src/components/Footer.tsx")).toContain(`href: "${p}"`);
      expect(r("scripts/generate-sitemap.ts")).toContain(`push("${p}")`);
      expect(r("public/sitemap.xml")).toContain(`https://livingwitharthritis.org.uk${p}<`);
    }
    for (const f of ["src/pages/ClinicalGovernance.tsx", "src/pages/CorrectionsPolicy.tsx"]) {
      const s = r(f);
      expect(s).toMatch(/PH128483/);
      expect(s).toMatch(/NHS/);
      expect(s).toMatch(/NICE/);
      expect(s).toContain("contactEmail");
      expect(s).not.toMatch(/Living With Arthritis UK|for Arthritis UK|Crewe|Oswestry/);
    }
  });
});
