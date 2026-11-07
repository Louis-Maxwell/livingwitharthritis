/// <reference types="node" />
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, it, expect, vi, beforeAll } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  LIBRARY_PENDING_REVIEW_TEXT,
  LIBRARY_REVIEW_STATUS,
  getLibraryLastReviewed,
  getLibraryReviewStatus,
  libraryAboutNote,
  LIBRARY_SITEWIDE_REVIEW_DATE,
} from "@/data/libraryReview";
import { getLibraryTopicSeo } from "@/data/libraryTopicSeo";
import {
  markLibraryTopicReviewed,
  serializeLibraryReviewStatus,
} from "../../../scripts/lib/library-review.mjs";

vi.mock("@/components/Header", () => ({ default: () => <div data-testid="header" /> }));
vi.mock("@/components/Footer", () => ({ default: () => <div data-testid="footer" /> }));

/** Library topics expanded in PRs #94–#96; clinically reviewed by Louis on 23 Oct 2026. */
const EXPANDED_LIBRARY_TOPICS = [
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
  it("has no pending topics left (all clinically reviewed)", () => {
    const pending = Object.entries(LIBRARY_REVIEW_STATUS)
      .filter(([, e]) => e.reviewStatus === "pending")
      .map(([slug]) => slug);
    expect(pending).toEqual([]);
  });

  it("expanded and undocumented topics carry a completed review date", () => {
    for (const slug of EXPANDED_LIBRARY_TOPICS) {
      expect(getLibraryReviewStatus(slug)).toBe("reviewed");
      expect(getLibraryLastReviewed(slug)).toBe("2026-10-23");
    }
    expect(getLibraryReviewStatus("fibromyalgia")).toBe("reviewed");
    expect(getLibraryLastReviewed("fibromyalgia")).toBe(LIBRARY_SITEWIDE_REVIEW_DATE);
  });

  it("requires an explicit completed review and date", () => {
    LIBRARY_REVIEW_STATUS['test-record'] = { reviewStatus: 'reviewed', lastReviewed: '2026-10-11' };
    expect(getLibraryReviewStatus('test-record')).toBe('reviewed');
    expect(getLibraryLastReviewed('test-record')).toBe('2026-10-11');
    delete LIBRARY_REVIEW_STATUS['test-record'];
  });

  it("About note says clinically reviewed, never pending", () => {
    expect(libraryAboutNote("knee-pain").body).toMatch(/clinically reviewed/);
    expect(libraryAboutNote("knee-pain").body).not.toMatch(/pending/);
    expect(getLibraryTopicSeo("knee-pain")?.extraSections?.at(-1)?.body).not.toMatch(/pending clinical review/);
  });

  it("static library head data has no pending wording", () => {
    const head = JSON.parse(
      readFileSync(resolve(process.cwd(), "scripts/library-head-data.json"), "utf8"),
    ) as Record<string, { bodyHtml: string }>;
    for (const slug of EXPANDED_LIBRARY_TOPICS) {
      const html = head[`/library/${slug}`]?.bodyHtml ?? "";
      expect(html).not.toMatch(/pending clinical review/i);
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
  it.each(EXPANDED_LIBRARY_TOPICS)("%s: shows the completed clinical review", (slug) => {
    renderTopic(slug);
    expect(screen.queryByText(LIBRARY_PENDING_REVIEW_TEXT)).not.toBeInTheDocument();
    const text = document.body.textContent || "";
    expect(text).toMatch(/Clinically reviewed · Louis Maxwell, Clinical Lead, HCPC PH128483 · 23 October 2026/);
    expect(text).not.toMatch(/pending clinical review/i);
    cleanup();
  });

  it("a reviewed topic still shows 'Clinically reviewed' with its date", () => {
    LIBRARY_REVIEW_STATUS.fibromyalgia = { reviewStatus: "reviewed", lastReviewed: "2026-09-18" };
    renderTopic("fibromyalgia");
    delete LIBRARY_REVIEW_STATUS.fibromyalgia;
    expect(screen.getByText(/Clinically reviewed · Louis Maxwell, Clinical Lead, HCPC PH128483 · 18 September 2026/)).toBeInTheDocument();
    expect(screen.queryByText(LIBRARY_PENDING_REVIEW_TEXT)).not.toBeInTheDocument();
  });
});
