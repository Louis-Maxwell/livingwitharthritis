/**
 * Editorial hub guides that replaced the old `StubPage` placeholders
 * (treatments/*, guides/work-with-arthritis, guides/travel-with-arthritis).
 *
 * One object per route. Rendered by `src/components/HubGuidePage.tsx` and
 * baked into the first HTML response by
 * `scripts/generate-hub-guide-head-data.ts` → `scripts/hub-guide-head-data.json`
 * (merged per route by inject-canonicals.mjs), so crawlers see the same
 * body as readers.
 *
 * Plain text only (no HTML) — the renderer and the head-data generator
 * escape everything.
 */
export interface HubGuideLink {
  label: string;
  href: string;
}

export interface HubGuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: HubGuideLink[];
}

export interface HubGuideFaq {
  q: string;
  a: string;
}

export interface HubGuide {
  /** Route without leading slash, e.g. "treatments/drug-guide". */
  slug: string;
  /** H1. */
  title: string;
  /** <title> (suffix " | Living With Arthritis" is added by the page). */
  metaTitle: string;
  description: string;
  /** Short plain-English answer shown in the quick-answer box. */
  answer: string;
  breadcrumbs: HubGuideLink[];
  sections: HubGuideSection[];
  faqs: HubGuideFaq[];
  related: HubGuideLink[];
  /** YYYY-MM-DD. */
  updated: string;
  /** Written by Louis Maxwell; awaiting a second clinical review. */
  reviewStatus: "pending-clinical-review" | "reviewed";
}
