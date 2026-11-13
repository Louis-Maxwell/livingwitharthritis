/**
 * Clinical review records for static HTML, read from the same data the React
 * pages render (src/data/reviewRecords.json, libraryReviewStatus.json,
 * faqArticles.ts, conditionSubpages.ts). Never infers a date: routes without
 * an explicit record return null.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (p) => readFileSync(resolve(p), "utf8");
const RECORDS = JSON.parse(read("src/data/reviewRecords.json"));
const LIBRARY = JSON.parse(read("src/data/libraryReviewStatus.json"));
const FAQ_SLUGS = new Set([...read("src/data/faqArticles.ts").matchAll(/^\s+slug: '([a-z0-9-]+)'/gm)].map((m) => m[1]));
const SUBPAGE_CONDITIONS = new Set([...read("src/data/conditionSubpages.ts")
  .matchAll(/^ {2}"?([a-z-]+)"?: \{/gm)].map((m) => m[1]));
const SUBPAGES = new Set(["symptoms", "treatment", "exercises", "diet"]);
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

/** Same 12-month cycle as src/lib/reviewDates.ts (REVIEW_CYCLE_MONTHS). */
export const REVIEW_CYCLE_MONTHS = 12;
export function nextReviewDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]) + REVIEW_CYCLE_MONTHS / 12, Number(m[2]) - 1, Number(m[3])));
  return d.toISOString().slice(0, 10);
}
export function formatReviewDate(iso) {
  const [y, mo, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[mo - 1]} ${y}`;
}

/** @returns {{reviewer:string,lastReviewed:string}|null} */
export function reviewRecordFor(route) {
  const path = String(route || "").replace(/\/$/, "") || "/";
  let date = RECORDS.pages[path] || null;
  let m;
  if (!date && (m = /^\/conditions\/([^/]+)\/([^/]+)$/.exec(path))) {
    if (SUBPAGE_CONDITIONS.has(m[1]) && SUBPAGES.has(m[2])) date = RECORDS.conditionSubpage;
  } else if (!date && (m = /^\/faq\/([^/]+)$/.exec(path))) {
    if (FAQ_SLUGS.has(m[1])) date = RECORDS.faqArticles[m[1]] || RECORDS.faqArticleFallback;
  } else if (!date && (m = /^\/library\/([^/]+)$/.exec(path))) {
    const entry = LIBRARY[m[1]];
    // Mirrors getLibraryLastReviewed(): pending topics show no review date.
    if (!entry) date = RECORDS.librarySitewide;
    else if (entry.reviewStatus === "reviewed" && ISO.test(entry.lastReviewed || "")) date = entry.lastReviewed;
  }
  return date && ISO.test(date) ? { reviewer: RECORDS.reviewer, lastReviewed: date } : null;
}

export function reviewLineHtml({ reviewer, lastReviewed }) {
  const next = nextReviewDate(lastReviewed);
  return `Clinically reviewed by ${reviewer} · Last reviewed <time datetime="${lastReviewed}">${formatReviewDate(lastReviewed)}</time>`
    + ` · Next review <time datetime="${next}">${formatReviewDate(next)}</time>`;
}

// Older snapshot wording of the same review line (scripts/data/rendered-bodies.json).
const OLD_LINE = /Clinically reviewed · Louis Maxwell, HCPC PH128483 · \d{1,2} [A-Z][a-z]+ \d{4}/;

/** Attach reviewedBy/lastReviewed and the visible line to a route's head data. */
export function withReviewRecord(route, data) {
  if (!data || data.noindex || data.article) return data;
  const rec = reviewRecordFor(route);
  if (!rec) return data;
  const line = reviewLineHtml(rec);
  const body = String(data.bodyHtml || "");
  const hasCurrent = body.includes(line);
  const inBody = hasCurrent || OLD_LINE.test(body);
  return {
    ...data,
    reviewedBy: "Louis Maxwell",
    reviewerCredentials: "HCPC PH128483",
    lastReviewed: rec.lastReviewed,
    ...(inBody && !hasCurrent ? { bodyHtml: body.replace(OLD_LINE, line) } : {}),
    reviewLine: inBody ? "body" : line,
  };
}
