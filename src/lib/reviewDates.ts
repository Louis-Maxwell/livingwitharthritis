/** Clinical review cycle shared by guides, schema and the governance pages. */
export const REVIEW_CYCLE_MONTHS = 12;
export const CLINICAL_REVIEWER = "Louis Maxwell, HCPC PH128483";

/** Next review date (ISO yyyy-mm-dd) = last reviewed + 12 months. */
export function nextReviewDate(lastReviewed: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(lastReviewed || "");
  if (!m) return null;
  const d = new Date(Date.UTC(Number(m[1]) + REVIEW_CYCLE_MONTHS / 12, Number(m[2]) - 1, Number(m[3])));
  return d.toISOString().slice(0, 10);
}

export function formatReviewDate(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  });
}

/** Organization publisher for MedicalWebPage schema, carrying the charity number. */
export const GUIDE_PUBLISHER_SCHEMA = {
  "@type": "Organization",
  "@id": "https://livingwitharthritis.org.uk/#organization",
  name: "Living With Arthritis",
  url: "https://livingwitharthritis.org.uk",
  identifier: { "@type": "PropertyValue", propertyID: "Charity Commission for England and Wales", value: "1218461" },
  nonprofitStatus: "https://schema.org/NonprofitType",
} as const;
