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

/** Return the cleaned search title (brand-normalised); no suffix is added. */
export function distinctSeoTitle(title, _headline) {
  return cleanBrand(title).trim();
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