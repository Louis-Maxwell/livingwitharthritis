/**
 * Pure helper for src/data/libraryReviewStatus.json (per-topic review state
 * of /library/<slug> pages). Used by scripts/mark-library-reviewed.mjs.
 */
export const LIBRARY_REVIEW_STATUS_PATH = "src/data/libraryReviewStatus.json";

/** Return a new status map with `slug` flipped to reviewed on `date`. */
export function markLibraryTopicReviewed(map, slug, date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`invalid review date "${date}"`);
  if (!Object.prototype.hasOwnProperty.call(map, slug)) {
    throw new Error(`${slug}: not listed in ${LIBRARY_REVIEW_STATUS_PATH}`);
  }
  const out = {};
  for (const key of Object.keys(map).sort()) {
    out[key] = key === slug ? { reviewStatus: "reviewed", lastReviewed: date } : map[key];
  }
  return out;
}

/** One entry per line, sorted, matching the committed file format. */
export function serializeLibraryReviewStatus(map) {
  const keys = Object.keys(map).sort();
  const lines = keys.map((k, i) => `  ${JSON.stringify(k)}: ${JSON.stringify(map[k]).replace(/":/g, '": ').replace(/,"/g, ', "').replace(/^\{/, "{ ").replace(/\}$/, " }")}${i < keys.length - 1 ? "," : ""}`);
  return `{\n${lines.join("\n")}\n}\n`;
}
