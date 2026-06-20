/**
 * JSON-LD builders. Inject via useEffect (per project memory — avoids
 * react-helmet-async crashes when stringifying complex schemas).
 */

import { CHARITY } from '@/config/charity';

const SITE_URL = 'https://livingwitharthritis.org.uk';

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
  logo: `${SITE_URL}/favicon.png`,
  taxID: CHARITY.number,
  foundingDate: CHARITY.registrationDate,
  identifier: [
    {
      '@type': 'PropertyValue',
      propertyID: 'UK Charity Commission Registration',
      value: CHARITY.number,
    },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${CHARITY.address.name}, ${CHARITY.address.street}`,
    addressLocality: CHARITY.address.locality,
    postalCode: CHARITY.address.postalCode,
    addressRegion: CHARITY.address.region,
    addressCountry: CHARITY.address.country,
  },
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
