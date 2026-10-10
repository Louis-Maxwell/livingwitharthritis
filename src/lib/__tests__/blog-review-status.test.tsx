/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { blogPostSchema } from "@/lib/blog/schema";
import {
  DEFAULT_BLOG_REVIEW_STATUS,
  PENDING_REVIEW_TEXT,
  blogReviewSchemaFields,
  isBlogReviewPending,
  resolveBlogReviewStatus,
} from "@/lib/blog/review";
import catalog from "@/content/blog/catalog.generated.json";
import EducationalDisclaimerBox from "@/components/seo/EducationalDisclaimerBox";
import { readAllBlogPosts } from "../../../scripts/lib/blog-posts.mjs";
import {
  markPostPending,
  markPostReviewed,
  serializePost,
  todayInLondon,
} from "../../../scripts/lib/blog-review.mjs";
import {
  STATIC_PENDING_REVIEW_TEXT,
  buildStaticArticleInner,
} from "../../../scripts/static-article-html.mjs";

/**
 * Guides added in PRs #95, #96 and #97 (merged 25 Sep 2026) that were pending
 * clinical review and were flipped by Louis Maxwell with
 * `npm run blog:mark-reviewed -- --date 2026-09-27 ...` on 27 Sep 2026.
 * (#94 only retitled meta fields on older guides.)
 */
const REVIEWED_27_SEP = [
  // #95
  "food-drink-and-arthritis-medicines-interactions",
  "giant-cell-arteritis-headache-warning-signs",
  "leflunomide-for-arthritis-blood-tests-side-effects",
  "septic-arthritis-hot-swollen-joint-emergency",
  "starting-a-new-arthritis-medicine-questions-to-ask",
  "sulfasalazine-for-arthritis-what-to-expect",
  "vaccines-on-dmards-and-biologics-uk-guide",
  // #96
  "how-arthritis-is-diagnosed-tests-scans-results",
  "palindromic-rheumatism-joint-attacks-come-and-go",
  "pseudogout-cppd-sudden-hot-swollen-joints",
  // #97
  "arthritis-and-your-heart-lowering-risk",
  "menopause-hrt-and-joint-pain",
  "running-with-arthritis-knees-and-hips",
  "weight-loss-injections-arthritis-wegovy-mounjaro",
  "your-arthritis-care-team-who-does-what",
];

type PostRow = Record<string, unknown> & { slug: string; reviewStatus?: string; last_reviewed?: string };
const posts = readAllBlogPosts() as unknown as PostRow[];
const bySlug = new Map(posts.map((p) => [p.slug, p]));
const catalogRows = catalog as Array<{ slug: string; reviewStatus?: string }>;
const headData = JSON.parse(
  readFileSync(resolve(process.cwd(), "scripts/blog-head-data.json"), "utf8"),
) as Record<string, { article?: { reviewStatus?: string } }>;

/**
 * Guides rewritten by automated PRs #124 (5 Oct 2026) and #126 (6 Oct 2026),
 * which wrongly marked them reviewed by Louis Maxwell. They are pending until
 * he reviews them (`npm run blog:mark-reviewed -- <slug>`).
 */
const PENDING_CHAMPIONS_62_73 = [
  // #124
  "how-to-sleep-with-arthritis-uk",
  "arthritis-and-mental-health-uk",
  "cold-weather-arthritis-uk-winter",
  // #126
  "staying-active-arthritis-winter-uk",
  "depression-arthritis-when-to-seek-help",
  "flu-jab-arthritis-frailty-uk",
  // Champions 68–70 (7 Oct)
  "covid-winter-arthritis-frailty-uk",
  "winter-arthritis-frailty-cold-houses-uk",
  "best-sleep-positions-joint-pain",
  // Champions 71–73 (8 Oct)
  "vitamin-d-winter-arthritis-frailty-uk",
  "sleep-quality-arthritis-pain",
  "arthritis-and-sleep-problems",
];

/**
 * Benefits & UK Support batch 3 (topics 41–55): new or rewritten guides
 * awaiting clinical and editorial review by Louis Maxwell (`npm run blog:mark-reviewed -- <slug>`).
 */
const PENDING_BENEFITS_SUPPORT_BATCH_3 = [
  "appeal-rejected-pip-arthritis",
  "motability-scheme-arthritis-uk",
  "blue-badge-frailty-arthritis-uk",
  "access-to-work-scheme-arthritis-guide",
  "universal-credit-and-arthritis-limited-capability-for-work",
  "carers-allowance-help-if-you-care-for-someone",
  "workplace-adjustment-letter-templates-arthritis",
  "sick-pay-fit-notes-time-off-work-arthritis",
  "retirement-planning-arthritis-uk",
  "housing-support-arthritis-uk",
];

describe("Champions 62–67 guides awaiting clinical review", () => {
  it.each([...PENDING_CHAMPIONS_62_73, ...PENDING_BENEFITS_SUPPORT_BATCH_3])("%s is pending in the post, catalog, review index and head data", (slug) => {
    const post = bySlug.get(slug)!;
    expect(post.reviewStatus).toBe("pending");
    expect(post.last_reviewed).toBeUndefined();
    expect(post.reviewed_by).toBeNull();
    expect(post.reviewer_credentials).toBeNull();
    expect(String(post.content)).not.toMatch(/Reviewed by/i);
    expect(resolveBlogReviewStatus(post)).toBe("pending");
    expect(catalogRows.find((r) => r.slug === slug)?.reviewStatus).toBe("pending");
    expect(headData[`/blog/${slug}`]?.article?.reviewStatus).toBe("pending");
  });
});

describe("blog reviewStatus schema", () => {
  const base = bySlug.get("menopause-hrt-and-joint-pain")!;

  it("is optional and defaults to reviewed", () => {
    const { reviewStatus: _omit, ...withoutStatus } = base;
    const parsed = blogPostSchema.parse(withoutStatus);
    expect(parsed.reviewStatus).toBeUndefined();
    expect(DEFAULT_BLOG_REVIEW_STATUS).toBe("reviewed");
    expect(resolveBlogReviewStatus(parsed)).toBe("reviewed");
    expect(resolveBlogReviewStatus(undefined, null, {})).toBe("reviewed");
  });

  it("accepts reviewed and pending, rejects anything else", () => {
    expect(blogPostSchema.safeParse({ ...base, reviewStatus: "pending" }).success).toBe(true);
    expect(blogPostSchema.safeParse({ ...base, reviewStatus: "reviewed" }).success).toBe(true);
    expect(blogPostSchema.safeParse({ ...base, reviewStatus: "draft" }).success).toBe(false);
  });

  it("first source that sets the status wins (post, then catalog row)", () => {
    expect(resolveBlogReviewStatus({}, { reviewStatus: "pending" })).toBe("pending");
    expect(resolveBlogReviewStatus({ reviewStatus: "reviewed" }, { reviewStatus: "pending" })).toBe("reviewed");
    expect(isBlogReviewPending({ reviewStatus: "pending" })).toBe(true);
  });
});

describe("guides from PRs #95–#97, clinically reviewed 27 Sep 2026", () => {
  it.each(REVIEWED_27_SEP)("%s is reviewed in the post, catalog and head data", (slug) => {
    expect(bySlug.get(slug)?.reviewStatus).toBe("reviewed");
    expect(bySlug.get(slug)?.last_reviewed).toBe("2026-09-27");
    expect(resolveBlogReviewStatus(bySlug.get(slug))).toBe("reviewed");
    const row = catalogRows.find((r) => r.slug === slug) as { reviewStatus?: string; last_reviewed?: string };
    expect(row?.reviewStatus).toBeUndefined();
    expect(row?.last_reviewed).toBe("2026-09-27");
    expect(headData[`/blog/${slug}`]?.article?.reviewStatus).not.toBe("pending");
  });

  it("all automated rewrites awaiting clinical approval remain pending", () => {
    expect(posts.filter((p) => p.reviewStatus === "pending").map((p) => p.slug).sort()).toEqual(
      [...PENDING_CHAMPIONS_62_73, ...PENDING_BENEFITS_SUPPORT_BATCH_3, "pip-for-arthritis-uk", "anti-inflammatory-diet-rheumatoid-arthritis", "best-supplement-for-knee-joint", "tens-machines-arthritis-uk"].sort(),
    );
  });

  it("guides without an explicit reviewStatus still resolve as reviewed by default", () => {
    expect(bySlug.get("arthritis-fatigue-explained")?.reviewStatus).toBeUndefined();
    expect(resolveBlogReviewStatus(bySlug.get("arthritis-fatigue-explained"))).toBe("reviewed");
    expect(catalogRows.find((r) => r.slug === "arthritis-fatigue-explained")).not.toHaveProperty(
      "reviewStatus",
    );
  });

  it("Sick pay and fit notes blog was rewritten in Benefits batch 3 and is pending re-review", () => {
    const slug = "sick-pay-fit-notes-time-off-work-arthritis";
    expect(bySlug.get(slug)?.reviewStatus).toBe("pending");
    expect(bySlug.get(slug)?.last_reviewed).toBeUndefined();
    expect(resolveBlogReviewStatus(bySlug.get(slug))).toBe("pending");
  });

  it("Carer's Allowance blog was rewritten in Benefits batch 3 and is pending re-review", () => {
    const slug = "carers-allowance-help-if-you-care-for-someone";
    expect(bySlug.get(slug)?.reviewStatus).toBe("pending");
    expect(bySlug.get(slug)?.last_reviewed).toBeUndefined();
    expect(resolveBlogReviewStatus(bySlug.get(slug))).toBe("pending");
  });

  it("Access to Work blog was rewritten in Benefits batch 3 and is pending re-review", () => {
    expect(bySlug.get("access-to-work-scheme-arthritis-guide")?.reviewStatus).toBe("pending");
    expect(bySlug.get("access-to-work-scheme-arthritis-guide")?.last_reviewed).toBeUndefined();
    expect(resolveBlogReviewStatus(bySlug.get("access-to-work-scheme-arthritis-guide"))).toBe(
      "pending",
    );
  });

  it("walking-with-arthritis remains reviewed (date may advance after Champions 52)", () => {
    expect(bySlug.get("walking-with-arthritis-start-build-up-keep-going")?.reviewStatus).toBe(
      "reviewed",
    );
    expect(bySlug.get("walking-with-arthritis-start-build-up-keep-going")?.last_reviewed).toBe(
      "2026-09-29",
    );
    expect(
      resolveBlogReviewStatus(bySlug.get("walking-with-arthritis-start-build-up-keep-going")),
    ).toBe("reviewed");
  });


  it.each([
    "joint-protection-easier-everyday-tasks",
  ])("%s is clinically reviewed on 30 Sep 2026 (Champions 53–55)", (slug) => {
    expect(bySlug.get(slug)?.reviewStatus).toBe("reviewed");
    expect(bySlug.get(slug)?.last_reviewed).toBe("2026-09-30");
    expect(resolveBlogReviewStatus(bySlug.get(slug))).toBe("reviewed");
    const row = catalogRows.find((r) => r.slug === slug) as { last_reviewed?: string };
    expect(row?.last_reviewed).toBe("2026-09-30");
    expect(headData[`/blog/${slug}`]?.article?.reviewStatus).not.toBe("pending");
  });


  it("catalog and head data only flag guides whose post file is pending", () => {
    const pendingPosts = posts.filter((p) => p.reviewStatus === "pending").map((p) => p.slug).sort();
    expect(catalogRows.filter((r) => r.reviewStatus === "pending").map((r) => r.slug).sort()).toEqual(pendingPosts);
    const headPending = Object.entries(headData)
      .filter(([, e]) => e.article?.reviewStatus === "pending")
      .map(([route]) => route.replace(/^\/blog\//, ""))
      .sort();
    expect(headPending).toEqual(pendingPosts);
  });
});

describe("review JSON-LD fields", () => {
  const reviewer = { "@type": "Person", name: "Maxwell" };

  it("pending guides claim no reviewedBy or lastReviewed", () => {
    expect(
      blogReviewSchemaFields({ reviewStatus: "pending", reviewedBy: reviewer, lastReviewed: "2026-09-25" }),
    ).toEqual({});
  });

  it("reviewed guides keep reviewedBy for the verified clinician", () => {
    expect(blogReviewSchemaFields({ reviewStatus: "reviewed", reviewedBy: reviewer })).toEqual({ reviewedBy: reviewer });
    expect(blogReviewSchemaFields({ reviewStatus: "reviewed", reviewedBy: null })).toEqual({});
  });
});

describe("EducationalDisclaimerBox review line", () => {
  it("shows the pending byline instead of 'Clinically reviewed'", () => {
    render(
      <MemoryRouter>
        <EducationalDisclaimerBox lastReviewed="2026-09-25" reviewStatus="pending" />
      </MemoryRouter>,
    );
    expect(screen.getByText(PENDING_REVIEW_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(/Clinically reviewed/)).not.toBeInTheDocument();
  });

  it("still shows 'Clinically reviewed' by default", () => {
    render(
      <MemoryRouter>
        <EducationalDisclaimerBox lastReviewed="2026-09-16" />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Clinically reviewed · Louis Maxwell, HCPC PH128483/)).toBeInTheDocument();
  });
});

describe("static prerendered article HTML", () => {
  it("uses the same pending text as the React template", () => {
    expect(STATIC_PENDING_REVIEW_TEXT).toBe(PENDING_REVIEW_TEXT);
    expect(PENDING_REVIEW_TEXT).toBe(
      "Written by the Living With Arthritis team · pending clinical review by Louis Maxwell (HCPC PH128483)",
    );
  });

  it("adds the pending byline only for pending guides", () => {
    const pending = buildStaticArticleInner({
      title: "T",
      article: { content: "<p>Body text</p>", reviewStatus: "pending" },
    });
    const reviewed = buildStaticArticleInner({ title: "T", article: { content: "<p>Body text</p>" } });
    expect(pending).toContain("pending clinical review by Louis Maxwell (HCPC PH128483)");
    expect(reviewed).not.toContain("pending clinical review");
  });
});

describe("blog:mark-reviewed helpers", () => {
  const post = {
    slug: "x",
    date: "2026-09-25",
    updated_at: "2026-09-25T09:00:00.000Z",
    category: "Health",
  };

  it("markPostPending inserts reviewStatus after updated_at", () => {
    expect(Object.keys(markPostPending(post))).toEqual(["slug", "date", "updated_at", "reviewStatus", "category"]);
  });

  it("markPostReviewed flips status and stamps last_reviewed", () => {
    const out = markPostReviewed(markPostPending(post), "2026-09-27");
    expect(out.reviewStatus).toBe("reviewed");
    expect(out.last_reviewed).toBe("2026-09-27");
    expect(Object.keys(out)).toEqual(["slug", "date", "updated_at", "last_reviewed", "reviewStatus", "category"]);
    expect(blogPostSchema.shape.reviewStatus.parse(out.reviewStatus)).toBe("reviewed");
  });

  it("refuses a review date before the publish date or a malformed date", () => {
    expect(() => markPostReviewed(post, "2026-09-01")).toThrow(/before publish date/);
    expect(() => markPostReviewed(post, "27/09/2026")).toThrow(/invalid/);
  });

  it("uses today's London date and keeps the file format", () => {
    expect(todayInLondon(new Date("2026-09-27T23:30:00Z"))).toBe("2026-09-28");
    expect(serializePost({ a: 1 })).toBe('{\n  "a": 1\n}\n');
  });
});
