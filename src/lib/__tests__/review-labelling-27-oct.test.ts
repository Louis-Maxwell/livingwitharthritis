/// <reference types="node" />
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { isVerifiedMaxwellReviewer } from "@/lib/blog/review";

/** Legacy review metadata must not attest to later editorial revisions. */
const root = process.cwd();
const PENDING = /pending clinical review/i;
const CREDS = "First Contact Practitioner, HCPC PH128483, CSP member";

const walk = (dir: string, out: string[] = []): string[] => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      walk(full, out);
    } else if (/\.(ts|tsx|js|mjs|json|txt|md|xml|html)$/.test(name) && !/\.test\.(ts|tsx)$/.test(name)) {
      out.push(full);
    }
  }
  return out;
};

type Post = { slug: string; is_published?: boolean; reviewed_by?: string | null; reviewer_credentials?: string | null; reviewStatus?: string; review_status?: string; editorial_review_note?: string };

const postsDir = resolve(root, "src/content/blog/posts");
const allPublished = readdirSync(postsDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(postsDir, f), "utf8")) as Post)
  .filter((p) => p.is_published !== false);
const published = allPublished.filter((p) => !p.editorial_review_note);

describe("Review labelling gate (27 Oct 2026)", () => {
  it('no app source, content or public crawler file says "pending clinical review"', () => {
    const files = [
      ...walk(resolve(root, "src")),
      ...readdirSync(resolve(root, "public"))
        .filter((f) => /\.(txt|xml|json)$/.test(f))
        .map((f) => resolve(root, "public", f)),
      ...readdirSync(resolve(root, "public/.well-known")).map((f) => resolve(root, "public/.well-known", f)),
    ];
    const hits = files.filter((f) => PENDING.test(readFileSync(f, "utf8")));
    expect(hits.map((f) => f.replace(root + "/", ""))).toEqual([]);
  });

  it("unrevised guides retain their stored reviewer metadata; revised guides carry explicit review notes", () => {
    expect(allPublished.length).toBeGreaterThan(500);
    expect(published.length).toBeGreaterThan(0);
    for (const p of allPublished.filter((p) => p.editorial_review_note)) {
      expect(p.reviewed_by, p.slug).toBeNull();
      expect(p.reviewer_credentials, p.slug).toBeNull();
      expect(p.editorial_review_note, p.slug).toMatch(/not (yet )?had a fresh/);
    }
    const bad = published.filter(
      (p) =>
        p.reviewed_by !== "Louis Maxwell" ||
        !/PH128483/.test(p.reviewer_credentials || "") ||
        p.reviewStatus === "pending" ||
        p.review_status === "pending",
    );
    expect(bad.map((p) => p.slug)).toEqual([]);
  });

  it('the badge check matches the stored name "Louis Maxwell" (old bug compared against "Maxwell")', () => {
    expect(isVerifiedMaxwellReviewer("Louis Maxwell", CREDS)).toBe(true);
    expect(isVerifiedMaxwellReviewer("  louis   maxwell ", CREDS)).toBe(true);
    expect(isVerifiedMaxwellReviewer("Louis Maxwell", "First Contact Practitioner")).toBe(false);
    expect(isVerifiedMaxwellReviewer("Editorial team", CREDS)).toBe(false);
    for (const p of published) {
      expect(isVerifiedMaxwellReviewer(p.reviewed_by, p.reviewer_credentials), p.slug).toBe(true);
    }
  });

  it("the article page derives the badge from isVerifiedMaxwellReviewer with the full name, never an exact \"Maxwell\" compare", () => {
    const page = readFileSync(resolve(root, "src/pages/BlogPost.tsx"), "utf8");
    expect(page).toMatch(/const MAXWELL_NAME = "Louis Maxwell"/);
    expect(page).toMatch(/const hasVerifiedReviewer = isVerifiedMaxwellReviewer\(reviewerName, reviewerCreds\) && !editorialReviewNote/);
    expect(page).not.toMatch(/===\s*["']Maxwell["']/);
    expect(page).not.toMatch(/isPendingReview/);
  });
});
