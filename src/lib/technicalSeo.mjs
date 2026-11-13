export const SITE_ORIGIN = 'https://livingwitharthritis.org.uk';

export function cleanBrand(value) {
  return String(value ?? '').replace(/\bLiving With Arthritis\s+UK\b/gi,
    'Living With Arthritis');
}

export function canonicalPath(value) {
  const path = String(value || '/').split(/[?#]/)[0];
  return ('/' + path.replace(/^\/+/, '')).replace(/\/{2,}/g, '/')
    .replace(/\/$/, '') || '/';
}

/**
 * Benefits, parking, insurance and service-access pages. They stay ordinary
 * WebPages unless their own head data already records a review or condition.
 */
const NON_HEALTH_GUIDE_PATHS = new Set([
  '/guides',
  '/guides/benefits-pip',
  '/guides/pip-vs-attendance-allowance',
  '/guides/blue-badge-vs-disability-parking',
  '/guides/insurance-coverage',
  '/guides/work-with-arthritis',
  '/guides/disability-support',
  '/guides/free-arthritis-resources-uk',
  '/guides/health-services',
  '/guides/nhs-vs-private-rheumatology',
  '/guides/physio-self-referral-vs-gp-referral',
]);

/** Exercise, condition and self-management guides that give health advice. */
export function isHealthAdviceGuide(route) {
  const path = canonicalPath(route);
  if (NON_HEALTH_GUIDE_PATHS.has(path)) return false;
  return path.startsWith('/guides/') || path.startsWith('/treatments/');
}

const MAX_SEO_TITLE = 60;

/** A short token already on the page, used only to separate a search title from its H1. */
function seoTitleQualifier(title, context) {
  const ctx = typeof context === 'string' ? { route: context } : (context || {});
  const hay = title.toLowerCase();
  const missing = (label) => {
    const text = String(label || '').trim();
    return text && !hay.includes(text.toLowerCase()) ? text : '';
  };
  const parts = String(ctx.route || '').split('/').filter(Boolean);
  const slug = parts[1] || '';
  const joint = slug.match(/(?:^|-)for-([a-z]+)-arthritis$/)?.[1]
    || slug.match(/^([a-z]+)-arthritis-exercises$/)?.[1];
  if (joint) {
    const label = missing(joint.charAt(0).toUpperCase() + joint.slice(1));
    if (label) return label;
  }
  if (parts[0] === 'arthritis-support') {
    const city = missing(ctx.breadcrumb || ctx.city);
    if (city && city.length <= 28) return city;
  }
  if (!/\bUK\b/i.test(title)) return 'UK';
  return '';
}

/** Search title. When it repeats the H1 exactly, add a joint, city or "UK"
 * from the page when that word is not already in the title and the result
 * stays within 60 characters. Never append "| Guide".
 */
export function distinctSeoTitle(title, headline, context) {
  const value = cleanBrand(title).trim();
  const head = cleanBrand(headline ?? '').trim();
  if (!value || !head || value.toLowerCase() !== head.toLowerCase()) return value;
  const qualifier = seoTitleQualifier(value, context);
  if (!qualifier) return value;
  const next = `${value} ${qualifier}`;
  return next.length <= MAX_SEO_TITLE ? next : value;
}

/** Remove invalid/retired sitewide properties, never infer review evidence. */
export function cleanJsonLd(value) {
  if (typeof value === 'string') return cleanBrand(value);
  if (Array.isArray(value)) return value.map(cleanJsonLd);
  if (!value || typeof value !== 'object') return value;
  const types = [value['@type']].flat();
  const out = {};
  for (const [key, item] of Object.entries(value)) {
    if (key === 'speakable' || key === 'medicalAudience') continue;
    if (key === 'reviewedBy' && types.some((t) =>
      ['Article', 'BlogPosting', 'NewsArticle'].includes(t))) continue;
    if (key === 'geographicArea' && types.includes('MedicalAudience')) continue;
    // schema.org expects MedicalSpecialty enumeration URLs, not invented enums.
    if (key === 'medicalSpecialty' && [item].flat().some((x) =>
      typeof x === 'string' && !x.startsWith('https://schema.org/'))) continue;
    out[key] = cleanJsonLd(item);
  }
  return out;
}

export function buildShareLinks(path, title, image = '') {
  const url = `${SITE_ORIGIN}${canonicalPath(path)}`;
  const u = encodeURIComponent(url);
  const text = encodeURIComponent(cleanBrand(title));
  return [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${text}%20${u}` },
    { label: 'Pinterest', href: `https://www.pinterest.com/pin/create/button/?url=${u}&description=${text}${image ? `&media=${encodeURIComponent(image)}` : ''}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${text}` },
  ];
}