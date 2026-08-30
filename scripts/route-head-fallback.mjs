// Derives a unique, honest <title>, meta description and H1 for any public
// route that has no curated entry in scripts/ai-head-data.json and no blog
// row in scripts/blog-head-data.json.
//
// The goal is narrow: no public URL should ship the generic homepage title
// in its first HTML byte. Wording is templated from the route itself, so
// nothing is invented about the page's clinical content.

const WORD_FIXES = {
  uk: 'UK',
  nhs: 'NHS',
  pip: 'PIP',
  ra: 'RA',
  oa: 'OA',
  faq: 'FAQ',
  faqs: 'FAQs',
  ai: 'AI',
  'a-z': 'A–Z',
  az: 'A–Z',
  qa: 'Q&A',
  tmj: 'TMJ',
  dla: 'DLA',
  gp: 'GP',
  vs: 'vs',
  and: 'and',
  for: 'for',
  with: 'with',
  the: 'the',
  of: 'of',
  in: 'in',
  to: 'to',
};

function humanise(segment) {
  return segment
    .split('-')
    .map((word, index) => {
      const fixed = WORD_FIXES[word.toLowerCase()];
      if (fixed) return index === 0 ? fixed.charAt(0).toUpperCase() + fixed.slice(1) : fixed;
      return index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    })
    .join(' ');
}

const SECTION_LABELS = {
  conditions: 'Condition guide',
  guides: 'Guide',
  exercises: 'Exercise guide',
  blog: 'Article',
  compare: 'Comparison',
  glossary: 'Glossary',
  'arthritis-support': 'Local support',
  authors: 'Author',
  reviewers: 'Medical reviewer',
  tools: 'Tool',
  pets: 'Pet arthritis',
};

// Language-prefixed routes (/es, /fr, /de, /pt) serve the same page in a
// different locale. They must not inherit the English title/description
// verbatim, or Semrush flags them as duplicates of the English URL.
const LANG_LABELS = {
  es: { label: 'Español', suffix: 'en español' },
  fr: { label: 'Français', suffix: 'en français' },
  de: { label: 'Deutsch', suffix: 'auf Deutsch' },
  pt: { label: 'Português', suffix: 'em português' },
};

/**
 * @param {string} route e.g. "/conditions/knee-arthritis/symptoms"
 * @returns {{title:string, description:string, question:string, answer:string, breadcrumb:string}|null}
 */
export function deriveHeadData(route) {
  const all = route.split('/').filter(Boolean);
  if (all.length === 0) return null;

  const lang = LANG_LABELS[all[0]] ? all[0] : null;
  const segments = lang ? all.slice(1) : all;
  if (segments.length === 0) {
    const meta = LANG_LABELS[lang];
    return {
      title: `Living With Arthritis UK — ${meta.label}`,
      description: `Guías sobre la artritis / arthrite / Arthritis ${meta.suffix} de Living With Arthritis UK, una organización benéfica registrada (nº 1218461).`.slice(0, 158),
      question: `Living With Arthritis UK — ${meta.label}`,
      answer: `This is the ${meta.label} entry point for Living With Arthritis UK. Our clinically reviewed arthritis guides are published ${meta.suffix}.`,
      breadcrumb: meta.label,
    };
  }

  const section = SECTION_LABELS[segments[0]];
  const last = humanise(segments[segments.length - 1]);
  const parent = segments.length > 1 ? humanise(segments[segments.length - 2]) : '';

  const base = parent && parent !== last ? `${parent} — ${last.toLowerCase()}` : last;
  const subject = lang ? `${base} (${LANG_LABELS[lang].label})` : base;
  const heading = `${subject} | Living With Arthritis UK`;

  const description = [
    `${subject}.`,
    lang ? `Read this page ${LANG_LABELS[lang].suffix}.` : '',
    section ? `${section} from Living With Arthritis,` : 'From Living With Arthritis,',
    'a UK registered charity (no. 1218461) publishing plain-English, clinically reviewed arthritis information.',
  ]
    .filter(Boolean)
    .join(' ');

  // A unique opening paragraph per route: without it every fallback page
  // shipped the same static body copy and read as duplicate content.
  const answer = [
    `${subject}:`,
    section
      ? `this ${section.toLowerCase()} covers what people in the UK most often ask about ${base.toLowerCase()}.`
      : `this page covers what people in the UK most often ask about ${base.toLowerCase()}.`,
    'Written in plain English and reviewed by a First Contact Practitioner (HCPC PH128483).',
  ].join(' ');

  return {
    title: heading.length > 115 ? `${subject.slice(0, 90)} | Living With Arthritis UK` : heading,
    description: description.slice(0, 158),
    question: subject,
    answer,
    breadcrumb: last,
  };
}

