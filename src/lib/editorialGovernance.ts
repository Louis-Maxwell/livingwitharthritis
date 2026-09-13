/**
 * Editorial governance metadata for YMYL/medical content.
 *
 * This is intentionally explicit: production content should not silently
 * inherit a fictitious clinician, publication date or evidence grade.
 */
export type EvidenceLevel =
  | "guideline"
  | "systematic-review"
  | "randomised-trial"
  | "observational"
  | "expert-consensus"
  | "patient-information"
  | "mixed"
  | "not-rated";

export interface EditorialSource {
  name: string;
  url: string;
  publisher?: string;
  publishedDate?: string;
  accessedDate?: string;
  type?: "guideline" | "government" | "nhs" | "journal" | "charity" | "other";
}

export interface EditorialGovernance {
  author: string;
  authorUrl?: string;
  clinicalReviewer?: string;
  clinicalReviewerUrl?: string;
  professionalRole?: string;
  publishedDate?: string;
  lastReviewed?: string;
  nextReviewDue?: string;
  sources: EditorialSource[];
  jurisdiction: "UK" | "England" | "Scotland" | "Wales" | "Northern Ireland" | "International";
  evidenceLevel: EvidenceLevel;
  medicalDisclaimer?: string;
}

export const DEFAULT_MEDICAL_DISCLAIMER =
  "This information is for general education and does not replace personalised medical advice from a qualified healthcare professional.";

export function isGovernanceComplete(meta: Partial<EditorialGovernance>): boolean {
  return Boolean(
    meta.author &&
      meta.jurisdiction &&
      meta.evidenceLevel &&
      Array.isArray(meta.sources) &&
      meta.sources.length > 0 &&
      meta.lastReviewed,
  );
}

export function governanceJsonLd(meta: EditorialGovernance) {
  const sourceUrls = meta.sources.map((source) => source.url).filter(Boolean);
  return {
    author: {
      "@type": "Person",
      name: meta.author,
      ...(meta.authorUrl ? { url: meta.authorUrl } : {}),
    },
    ...(meta.clinicalReviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            name: meta.clinicalReviewer,
            ...(meta.clinicalReviewerUrl ? { url: meta.clinicalReviewerUrl } : {}),
            ...(meta.professionalRole ? { jobTitle: meta.professionalRole } : {}),
          },
        }
      : {}),
    ...(meta.publishedDate ? { datePublished: meta.publishedDate } : {}),
    ...(meta.lastReviewed ? { dateModified: meta.lastReviewed } : {}),
    ...(sourceUrls.length ? { citation: sourceUrls } : {}),
    contentLocation: {
      "@type": "Country",
      name: meta.jurisdiction === "UK" ? "United Kingdom" : meta.jurisdiction,
    },
  };
}
