/// <reference types="node" />
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * M2 trust sweep (12 Oct 2026): no page may claim review by an unnamed
 * "Clinical Review Board" / "Clinical Advisory Panel", and /expert-articles
 * may not imply authorship by clinicians we cannot name and verify.
 */
const postsDir = resolve(process.cwd(), "src/content/blog/posts");
const UNNAMED_PANEL = /Clinical (Review|Advisory) (Board|Panel)/i;

type Post = { slug: string; reviewStatus?: string; content: string };

describe("M2 trust sweep — unnamed reviewer labels", () => {
  const files = readdirSync(postsDir).filter((f) => f.endsWith(".json"));

  it("no blog post claims an unnamed clinical review board or panel", () => {
    const offenders = files.filter((f) => UNNAMED_PANEL.test(readFileSync(resolve(postsDir, f), "utf8")));
    expect(offenders).toEqual([]);
  });

  it("posts with the editorial-standards line say pending clinical review and are pending", () => {
    const withLine = files
      .map((f) => JSON.parse(readFileSync(resolve(postsDir, f), "utf8")) as Post)
      .filter((p) => /Living With Arthritis editorial team/.test(p.content) && /pending clinical review/.test(p.content));
    expect(withLine.length).toBeGreaterThanOrEqual(70);
    for (const p of withLine) {
      expect(p.reviewStatus, p.slug).toBe("pending");
    }
  });
});

describe("M2 trust sweep — /expert-articles", () => {
  const page = readFileSync(resolve(process.cwd(), "src/pages/ExpertArticles.tsx"), "utf8");

  it("does not claim unnamed consultant, dietitian or psychologist authors", () => {
    expect(page).not.toMatch(UNNAMED_PANEL);
    expect(page).not.toMatch(/Consultant Rheumatologist|Registered Dietitian|Clinical Psychologist/);
    expect(page).not.toMatch(/MBBS, MRCP|DClinPsy|BPS Chartered/);
    expect(page).not.toMatch(/In my clinical practice|I recommend/);
  });

  it("states the real authorship, review status and charity details", () => {
    expect(page).toMatch(/Living With Arthritis editorial team/);
    expect(page).toMatch(/Clinically reviewed/);
    expect(page).not.toMatch(/pending clinical review/i);
    expect(page).toMatch(/1218461/);
    expect(page).toMatch(/PH128483/);
    expect(page).toMatch(/\/about\/editorial-claims-policy/);
    expect(page).not.toMatch(/Oswestry|SY11 1GA|George Dingley|CW1 3FJ/);
  });
});

describe("clinical review transparency", () => {
  const header = readFileSync(resolve(process.cwd(), "src/components/Header.tsx"), "utf8");
  const standards = readFileSync(resolve(process.cwd(), "src/pages/EditorialStandards.tsx"), "utf8");

  it("does not imply the whole website is reviewed every day", () => {
    expect(header).not.toMatch(/reviews and updates this website daily/i);
    expect(header).toMatch(/Clinical review status and review dates are shown on each guide/);
  });

  it("distinguishes content update dates from completed clinical review", () => {
    expect(standards).toMatch(/publication or an updated date[\\s\\S]*does not mean clinical review is complete/);
    expect(standards).toMatch(/An update date[\\s\\S]*is not a clinical review date/);
    expect(standards).toMatch(/Pending clinical review/);
  });
});
