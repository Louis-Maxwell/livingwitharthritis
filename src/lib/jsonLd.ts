/**
 * JSON-LD builders. Inject via useEffect (per project memory — avoids
 * react-helmet-async crashes when stringifying complex schemas).
 */

const SITE_URL = 'https://livingwitharthritis.org.uk';

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
