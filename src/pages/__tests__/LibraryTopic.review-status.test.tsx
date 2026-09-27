/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  DEFAULT_LIBRARY_LAST_REVIEWED,
  LIBRARY_PENDING_REVIEW_TEXT,
  LIBRARY_REVIEW_STATUS,
  getLibraryLastReviewed,
  getLibraryReviewStatus,
  libraryAboutNote,
} from "@/data/libraryReview";
import { getLibraryTopicSeo } from "@/data/libraryTopicSeo";
import {
  markLibraryTopicReviewed,
  serializeLibraryReviewStatus,
} from "../../../scripts/lib/library-review.mjs";

vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));

/** Library topics expanded in PRs #94–#96 that Louis has not reviewed yet. */
const PENDING_LIBRARY_TOPICS = [
  "hydroxychloroquine",
  "shoulder-pain",
  "plantar-fasciitis",
  "osteoporosis",
  "carpal-tunnel",
  "knee-pain",
  "raynauds",
  "sjogrens",
  "vasculitis",
];

let LibraryTopicPage: React.ComponentType;
beforeAll(async () => {
  LibraryTopicPage = (await import("../LibraryTopic")).default;
});

function renderTopic(slug: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/library/${slug}`]}>
        <Routes>
          <Route path="/library/:slug" element={<LibraryTopicPage />} />
          <Route path="/library" element={<div>library index</div>} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>,
  );
}

function pageJsonLd(): string {
  return Array.from(document.head.querySelectorAll('script[type="application/ld+json"]'))
    .map((s) => s.textContent || "")
    .join("\n");
}

describe("library review status data", () => {
  it("flags exactly the 9 expanded topics as pending", () => {
    const pending = Object.entries(LIBRARY_REVIEW_STATUS)
      .filter(([, e]) => e.reviewStatus === "pending")
      .map(([slug]) => slug)
      .sort();
    expect(pending).toEqual([...PENDING_LIBRARY_TOPICS].sort());
  });

  it("pending topics have no review date; unlisted topics keep the default", () => {
    for (const slug of PENDING_LIBRARY_TOPICS) {
      expect(getLibraryReviewStatus(slug)).toBe("pending");
      expect(getLibraryLastReviewed(slug)).toBeNull();
    }
    expect(getLibraryReviewStatus("fibromyalgia")).toBe("reviewed");
    expect(getLibraryLastReviewed("fibromyalgia")).toBe(DEFAULT_LIBRARY_LAST_REVIEWED);
  });

  it("About note is pending for pending topics and drops the wording once reviewed", () => {
    expect(libraryAboutNote("knee-pain").body).toMatch(/pending clinical review/);
    expect(getLibraryTopicSeo("knee-pain")?.extraSections?.at(-1)?.body).toMatch(/pending clinical review/);
    expect(libraryAboutNote("fibromyalgia").body).not.toMatch(/pending/);
  });

  it("static library head data carries the pending note, no review claim", () => {
    const head = JSON.parse(
      readFileSync(resolve(process.cwd(), "scripts/library-head-data.json"), "utf8"),
    ) as Record<string, { bodyHtml: string }>;
    for (const slug of PENDING_LIBRARY_TOPICS) {
      const html = head[`/library/${slug}`]?.bodyHtml ?? "";
      expect(html).toContain("pending clinical review");
      expect(html).not.toMatch(/Clinically reviewed|clinically reviewed\./);
    }
  });
});

describe("library:mark-reviewed helper", () => {
  const map = { b: { reviewStatus: "pending" as const }, a: { reviewStatus: "pending" as const } };

  it("flips one topic, stamps the date and keeps the file format", () => {
    const out = markLibraryTopicReviewed(map, "b", "2026-09-27");
    expect(out.b).toEqual({ reviewStatus: "reviewed", lastReviewed: "2026-09-27" });
    expect(out.a).toEqual({ reviewStatus: "pending" });
    expect(serializeLibraryReviewStatus(out)).toBe(
      '{\n  "a": { "reviewStatus": "pending" },\n  "b": { "reviewStatus": "reviewed", "lastReviewed": "2026-09-27" }\n}\n',
    );
  });

  it("rejects unknown topics and bad dates", () => {
    expect(() => markLibraryTopicReviewed(map, "zzz", "2026-09-27")).toThrow(/not listed/);
    expect(() => markLibraryTopicReviewed(map, "a", "27/09/2026")).toThrow(/invalid/);
  });

  it("committed JSON matches the serializer format", () => {
    const text = readFileSync(resolve(process.cwd(), "src/data/libraryReviewStatus.json"), "utf8");
    expect(serializeLibraryReviewStatus(JSON.parse(text))).toBe(text);
  });
});

describe("LibraryTopic page review box", () => {
  it.each(PENDING_LIBRARY_TOPICS)("%s: says pending, claims no completed review", (slug) => {
    renderTopic(slug);
    expect(screen.getByText(LIBRARY_PENDING_REVIEW_TEXT)).toBeInTheDocument();
    const text = document.body.textContent || "";
    expect(text).not.toMatch(/Clinically reviewed/);
    expect(text).not.toMatch(/\bclinically reviewed\b/i);
    const ld = pageJsonLd();
    expect(ld).toContain("MedicalWebPage");
    expect(ld).not.toMatch(/reviewedBy|lastReviewed/);
    cleanup();
  });

  it("a reviewed topic still shows 'Clinically reviewed' with its date", () => {
    renderTopic("fibromyalgia");
    expect(screen.getByText(/Clinically reviewed · Louis Maxwell, HCPC PH128483 · 18 September 2026/)).toBeInTheDocument();
    expect(screen.queryByText(LIBRARY_PENDING_REVIEW_TEXT)).not.toBeInTheDocument();
  });
});
