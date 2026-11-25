import REVIEW_RECORDS from "@/data/reviewRecords.json";

/** Resolve reviewRecords.json references in page source back to their date literals. */
export function inlineReviewRecords(src: string): string {
  const pages = REVIEW_RECORDS.pages as Record<string, string>;
  return src
    .replace(/\{REVIEW_RECORDS\.pages\["([^"]+)"\]\}/g, (_m, k: string) => `"${pages[k]}"`)
    .replace(/REVIEW_RECORDS\.pages\["([^"]+)"\]/g, (_m, k: string) => `"${pages[k]}"`);
}
