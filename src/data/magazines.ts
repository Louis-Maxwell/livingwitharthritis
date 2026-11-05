/**
 * Monthly magazine catalogue for /magazine.
 *
 * How to publish a new issue
 * --------------------------
 * 1. Save the PDF at `public/magazine/YYYY-MM.pdf`
 *    (for example `public/magazine/2026-11.pdf`). It will be served as `/magazine/2026-11.pdf`.
 * 2. Optionally add a portrait cover image, e.g. `public/magazine/covers/2026-11.webp`,
 *    and set `coverImage` to `/magazine/covers/2026-11.webp`.
 * 3. Append one object to `magazines` below. Do not invent placeholder issues —
 *    only add an entry when the matching PDF is ready to publish.
 * 4. `getMagazineIssues()` sorts by `publishedAt` (newest first) so you do not
 *    have to keep the array in order.
 */
export interface MagazineIssue {
  /** Stable id, usually the same as slug (e.g. "2026-11"). */
  id: string;
  /** URL-safe slug (e.g. "2026-11"). */
  slug: string;
  /** Issue title shown on the archive and featured card. */
  title: string;
  /** Human-readable month, UK English (e.g. "November 2026"). */
  month: string;
  /** ISO 8601 date the issue was published (e.g. "2026-11-01"). */
  publishedAt: string;
  /** Short summary for cards and the featured issue. */
  description: string;
  /** Public path to the PDF (e.g. "/magazine/2026-11.pdf"). */
  pdfPath: string;
  /** Optional portrait cover image path (e.g. "/magazine/covers/2026-11.webp"). */
  coverImage?: string;
  /** Optional bullet points shown on the featured issue. */
  highlights?: string[];
}

/**
 * Published issues. Append a new object whenever a PDF is uploaded to `public/magazine`.
 *
 * Example entry (do not commit this as a live issue without the matching PDF):
 *
 * {
 *   id: "2026-12",
 *   slug: "2026-12",
 *   title: "December 2026 magazine",
 *   month: "December 2026",
 *   publishedAt: "2026-12-01",
 *   description: "Practical tips for colder-weather stiffness, chair-based exercises, and a plain-English look at PIP evidence.",
 *   pdfPath: "/magazine/2026-12.pdf",
 *   coverImage: "/magazine/covers/2026-12.webp",
 *   highlights: ["Winter stiffness tips", "Chair-based exercises", "PIP evidence notes"],
 * }
 */
export const magazines: MagazineIssue[] = [
  {
    id: "2026-11",
    slug: "2026-11",
    title: "Move With Confidence",
    month: "November 2026",
    publishedAt: "2026-11-05",
    description:
      "Issue 01 — free edition. Practical steps for fluctuating pain, gentle movement that fits your day, questions to ask before joint surgery, and everyday wellbeing tips.",
    pdfPath: "/magazine/2026-11.pdf",
    highlights: [
      "Three pain myths to leave behind",
      "Movement that fits your day",
      "Seven questions before joint surgery",
      "Small changes that protect your energy",
    ],
  },
];

/** All issues, newest first. */
export function getMagazineIssues(): MagazineIssue[] {
  return [...magazines].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Newest issue, or undefined when the catalogue is empty. */
export function getLatestMagazineIssue(): MagazineIssue | undefined {
  return getMagazineIssues()[0];
}

/** Every issue except the latest, newest first. */
export function getPastMagazineIssues(): MagazineIssue[] {
  return getMagazineIssues().slice(1);
}
