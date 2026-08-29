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

/**
 * @param {string} route e.g. "/conditions/knee-arthritis/symptoms"
 * @returns {{title:string, description:string, question:string, breadcrumb:string}|null}
 */
export function deriveHeadData(route) {
  const segments = route.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const section = SECTION_LABELS[segments[0]];
  const last = humanise(segments[segments.length - 1]);
  const parent = segments.length > 1 ? humanise(segments[segments.length - 2]) : '';

  const subject = parent && parent !== last ? `${parent} — ${last.toLowerCase()}` : last;
  const heading = `${subject} | Living With Arthritis UK`;

  const description = [
    `${subject}.`,
    section ? `${section} from Living With Arthritis,` : 'From Living With Arthritis,',
    'a UK registered charity (no. 1218461) publishing plain-English, clinically reviewed arthritis information.',
  ].join(' ');

  return {
    title: heading.length > 115 ? `${subject.slice(0, 90)} | Living With Arthritis UK` : heading,
    description: description.slice(0, 158),
    question: subject,
    breadcrumb: last,
  };
}
