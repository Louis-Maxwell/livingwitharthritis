/// <reference types="node" />
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { readAllBlogPosts } from "../../../scripts/lib/blog-posts.mjs";
import pendingUnverified from "./fixtures/pending-unverified-reviewer-2026-10-08.json";

/**
 * Guard: no reviewer label that names nobody real.
 *
 * The only clinician who reviews Living With Arthritis content is the founder,
 * Louis Maxwell (HCPC PH128483). Made-up panels ("Clinical Advisory Panel",
 * "Clinical Review Board") and invented named experts ("Dr. Hannah Clarke,
 * Consultant Rheumatologist" and similar) were removed on 8 Oct 2026; those
 * guides are now "pending clinical review". To add a real reviewer, add their
 * name to ALLOWED_REVIEWERS in the same PR that publishes their credentials.
 */
const ALLOWED_REVIEWERS = ["Louis Maxwell", "Maxwell"];

const BANNED_LABELS =
  /Clinical Advisory Panel|Clinical Review Board|reviewed by our clinical team|medical advisory (?:board|panel)|clinical (?:advisory|review) (?:board|panel)|Living With Arthritis Clinical Review/i;

/** "Reviewed by Dr. Jane Doe", "Written by John Smith", "Clinically reviewed by …". */
const NAMED_BYLINE =
  /\b(?:Medically |Clinically )?(?:Reviewed|Written|Checked|Approved|Vetted|Authored) by:? (?:Dr\.? |Prof\.? |Professor |Mr\.? |Mrs\.? |Ms\.? )?((?:[A-Z][a-z]+)(?:[ -][A-Z][a-z]+)+)/g;

const ROOT = process.cwd();
const isAllowedName = (name: string) =>
  ALLOWED_REVIEWERS.some((allowed) => name === allowed || name.startsWith(`${allowed} `));

function namedBylineViolations(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(NAMED_BYLINE)) {
    if (!isAllowedName(m[1])) out.push(m[0]);
  }
  return out;
}

function walk(dir: string, exts: RegExp, skip: RegExp): string[] {
  const abs = resolve(ROOT, dir);
  if (!existsSync(abs)) return [];
  const files: string[] = [];
  for (const name of readdirSync(abs)) {
    const full = join(abs, name);
    const rel = relative(ROOT, full);
    if (skip.test(rel)) continue;
    if (statSync(full).isDirectory()) files.push(...walk(rel, exts, skip));
    else if (exts.test(name)) files.push(rel);
  }
  return files;
}

type Post = {
  slug: string;
  reviewed_by?: string | null;
  reviewer_credentials?: string | null;
  reviewStatus?: string;
  last_reviewed?: string;
  [key: string]: unknown;
};
const posts = readAllBlogPosts() as unknown as Post[];

describe("blog guides name no invented reviewers", () => {
  it.each(posts.map((p) => [p.slug, p] as const))("%s", (_slug, post) => {
    if (post.reviewed_by != null) expect(ALLOWED_REVIEWERS).toContain(post.reviewed_by);
    else expect(post.reviewer_credentials ?? null).toBeNull();

    const text = ["title", "meta_title", "meta_description", "excerpt", "direct_answer", "content"]
      .map((k) => String(post[k] ?? ""))
      .join("\n");
    expect(text).not.toMatch(BANNED_LABELS);
    expect(namedBylineViolations(text)).toEqual([]);
  });
});

describe("guides that carried an invented reviewer label are pending clinical review", () => {
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  it.each(pendingUnverified as string[])("%s", (slug) => {
    const post = bySlug.get(slug);
    expect(post, `missing guide ${slug}`).toBeDefined();
    // Louis may later review a guide (`npm run blog:mark-reviewed -- <slug>`).
    if (post!.reviewStatus === "reviewed") {
      expect(post!.last_reviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      return;
    }
    expect(post!.reviewStatus).toBe("pending");
    expect(post!.reviewed_by).toBeNull();
    expect(post!.reviewer_credentials).toBeNull();
    expect(post!.last_reviewed).toBeUndefined();
  });
});

describe("generated data, AI files and page source carry no invented reviewers", () => {
  const surfaces = [
    "src/content/blog/catalog.generated.json",
    "scripts/blog-head-data.json",
    "scripts/ai-head-data.json",
    "public/llms.txt",
    "public/llms-full.txt",
    "public/ai.txt",
    "public/.well-known/ai.txt",
    "public/.well-known/llms.txt",
    "public/humans.txt",
    "public/search-index.json",
    "index.html",
    ...walk("src", /\.(?:tsx?|json)$/, /__tests__|\.test\.|\.spec\.|src[\\/]test[\\/]/),
  ].filter((f) => existsSync(resolve(ROOT, f)));

  it("scans a meaningful set of files", () => {
    expect(surfaces.length).toBeGreaterThan(100);
  });

  it.each(surfaces)("%s", (file) => {
    const text = readFileSync(resolve(ROOT, file), "utf8");
    expect(text).not.toMatch(BANNED_LABELS);
    expect(namedBylineViolations(text)).toEqual([]);
  });

  it("head data never carries a reviewer outside the allowlist", () => {
    const head = JSON.parse(readFileSync(resolve(ROOT, "scripts/blog-head-data.json"), "utf8")) as Record<
      string,
      { article?: { reviewed_by?: string | null } }
    >;
    for (const [route, entry] of Object.entries(head)) {
      const reviewer = entry.article?.reviewed_by;
      if (reviewer != null) expect(ALLOWED_REVIEWERS, route).toContain(reviewer);
    }
  });

  it("the llms-full header no longer claims all content is medically reviewed", () => {
    const header = readFileSync(resolve(ROOT, "public/llms-full.txt"), "utf8").split("\n").slice(0, 6).join("\n");
    expect(header).not.toMatch(/All content (?:medically|clinically) reviewed/i);
  });
});

describe("guard self-test", () => {
  it("flags panels and invented names, allows Louis Maxwell", () => {
    expect("Reviewed by Clinical Advisory Panel").toMatch(BANNED_LABELS);
    expect("reviewed by our Clinical Review Board").toMatch(BANNED_LABELS);
    expect(namedBylineViolations("<em>Reviewed by Dr. Hannah Clarke, Consultant Rheumatologist</em>")).toHaveLength(1);
    expect(namedBylineViolations("Written by Emma Richards, Occupational Therapist")).toHaveLength(1);
    expect(namedBylineViolations("Reviewed by Louis Maxwell, HCPC PH128483")).toEqual([]);
    expect(namedBylineViolations("Written by the Living With Arthritis team")).toEqual([]);
  });
});
