/**
 * JSON-LD builders. Inject via useEffect (per project memory — avoids
 * react-helmet-async crashes when stringifying complex schemas).
 */

import { CHARITY } from '@/config/charity';

const SITE_URL = CHARITY.siteUrl;

/**
 * NGO / Charity schema with UK Charity Commission registration number.
 * Use on About, Donate, Trust, Governance pages so AI/search engines
 * can verify the organisation's regulator and registration.
 */
export const buildCharitySchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['NGO', 'Organization'],
  '@id': `${SITE_URL}/#charity`,
  name: CHARITY.shortName,
  legalName: CHARITY.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/og/landing-share.png`,
  taxID: CHARITY.number,
  foundingDate: CHARITY.registrationDate,
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'UK Charity Commission Registration',
      value: CHARITY.number,
    },
  ],
  ...(CHARITY.address.street && CHARITY.address.postalCode
    ? {
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${CHARITY.address.name}, ${CHARITY.address.street}`,
          addressLocality: CHARITY.address.locality,
          postalCode: CHARITY.address.postalCode,
          addressRegion: CHARITY.address.region,
          addressCountry: CHARITY.address.country,
        },
      }
    : {}),
  subjectOf: {
    '@type': 'CreativeWork',
    name: 'UK Charity Commission Register entry',
    url: CHARITY.registerUrl,
  },
});

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const buildBreadcrumb = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: `${SITE_URL}${item.path}`,
  })),
});

export const buildFAQPage = (items: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

/* ---------------------------------------------------------------------- *
 *  MedicalWebPage — strongest E-E-A-T signal for health (YMYL) pages.
 *  Search engines and AI answer engines treat MedicalWebPage as a
 *  higher-authority surface than a generic WebPage and lift it into
 *  AI Overviews / ChatGPT / Perplexity answers with attribution.
 * ---------------------------------------------------------------------- */

export type MedicalSpecialty =
  | 'Rheumatology'
  | 'Physiotherapy'
  | 'Nutrition'
  | 'Orthopedic';

export interface MedicalWebPageInput {
  /** Absolute or relative URL for the page (relative is resolved against SITE_URL). */
  path: string;
  /** Page H1 / browser title. */
  name: string;
  /** 1-2 sentence summary (40-160 words ideal). */
  description: string;
  /** ISO date (YYYY-MM-DD) the content was last clinically reviewed. */
  lastReviewed?: string;
  /** Verified reviewer details. Omit when no named review is documented. */
  reviewedBy?: {
    name: string;
    jobTitle: string;
    identifier?: string;
    profileUrl?: string;
  };
  /** Specialty hint for the search engine. Defaults to Rheumatology. */
  specialty?: MedicalSpecialty | MedicalSpecialty[];
  /** Optional MedicalCondition name(s) this page is about. */
  conditions?: string[];
  /** Alternate name(s) for the FIRST entry in `conditions`. */
  alternateNames?: string[];
  /** Signs/symptoms for the FIRST entry in `conditions`. */
  signOrSymptom?: string[];
  /** Risk factors for the FIRST entry in `conditions`. */
  riskFactor?: string[];
  /** Image URL for the page (absolute). */
  image?: string;
}

export const buildMedicalWebPage = (input: MedicalWebPageInput) => {
  const url = input.path.startsWith('http') ? input.path : `${SITE_URL}${input.path}`;
  const specialty = input.specialty ?? 'Rheumatology';
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${url}#medicalwebpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    specialty,
    ...(input.lastReviewed && input.reviewedBy
      ? {
          lastReviewed: input.lastReviewed,
          reviewedBy: {
            '@type': 'Person',
            name: input.reviewedBy.name,
            jobTitle: input.reviewedBy.jobTitle,
            ...(input.reviewedBy.identifier
              ? { identifier: input.reviewedBy.identifier }
              : {}),
            ...(input.reviewedBy.profileUrl
              ? { url: input.reviewedBy.profileUrl }
              : {}),
          },
        }
      : {}),
    ...(input.conditions && input.conditions.length
      ? {
          about: input.conditions.map((c, i) => ({
            '@type': 'MedicalCondition',
            name: c,
            ...(i === 0 && input.alternateNames?.length
              ? { alternateName: input.alternateNames }
              : {}),
            ...(i === 0 && input.signOrSymptom?.length
              ? { signOrSymptom: input.signOrSymptom }
              : {}),
            ...(i === 0 && input.riskFactor?.length
              ? { riskFactor: input.riskFactor }
              : {}),
          })),
        }
      : {}),
    ...(input.image ? { image: input.image } : {}),
  };
};

/* ---------------------------------------------------------------------- *
 *  HowTo — used for exercise programmes and step-by-step tools so AI
 *  answer engines can surface ordered steps as a rich result.
 * ---------------------------------------------------------------------- */

export interface HowToStepInput {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface HowToInput {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration e.g. "PT10M"
  image?: string;
  supply?: string[];
  tool?: string[];
  steps: HowToStepInput[];
}

export const buildHowTo = (input: HowToInput) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: input.name,
  description: input.description,
  inLanguage: 'en-GB',
  ...(input.totalTime ? { totalTime: input.totalTime } : {}),
  ...(input.image ? { image: input.image } : {}),
  ...(input.supply && input.supply.length
    ? { supply: input.supply.map((s) => ({ '@type': 'HowToSupply', name: s })) }
    : {}),
  ...(input.tool && input.tool.length
    ? { tool: input.tool.map((t) => ({ '@type': 'HowToTool', name: t })) }
    : {}),
  step: input.steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.name,
    text: s.text,
    ...(s.url ? { url: s.url.startsWith('http') ? s.url : `${SITE_URL}${s.url}` } : {}),
    ...(s.image ? { image: s.image } : {}),
  })),
});


/**
 * Inject (or replace) a JSON-LD <script> by id. Returns the cleanup
 * function for useEffect.
 */
export const injectJsonLd = (id: string, payload: unknown) => {
  if (typeof document === 'undefined') return () => {};
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(payload);
  document.head.appendChild(script);
  return () => {
    const el = document.getElementById(id);
    if (el) el.remove();
  };
};
