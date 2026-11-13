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
 * Hand-written heads for utility pages. The generic builder below must not
 * invent a "what people most often ask" intro, or the charity-number
 * boilerplate, for these URLs.
 */
const PAGE_HEADS = {
  "/contact": {
    title: "Contact | Living With Arthritis",
    description: "Email info@livingwitharthritis.org.uk or call 07760 512 084, Monday to Friday, 9am to 5pm. We aim to reply within two working days.",
    question: "Contact Living With Arthritis",
    answer: "Email info@livingwitharthritis.org.uk or call 07760 512 084, Monday to Friday, 9am to 5pm. We aim to reply within two working days. This is a small charity phone line, not a 24-hour clinical service.",
    breadcrumb: "Contact",
  },
  "/privacy": {
    title: "Privacy | Living With Arthritis",
    description: "How Living With Arthritis uses personal information under UK GDPR: enquiries, the weekday phone line, donations and analytics. No virtual physiotherapy.",
    question: "Privacy policy",
    answer: "This policy explains what personal information the website collects and why. We publish free written guides and answer the phone on weekdays. We do not provide virtual physiotherapy.",
    breadcrumb: "Privacy",
  },
  "/cookies": {
    title: "Cookies | Living With Arthritis",
    description: "Which cookies this website uses, which are strictly necessary, and how to refuse analytics cookies. Analytics stays off until you accept it.",
    question: "Cookies policy",
    answer: "Strictly necessary cookies keep the site working. Analytics cookies are off until you accept them. You can change that choice in your browser at any time.",
    breadcrumb: "Cookies",
  },
  "/disclaimer": {
    title: "Disclaimer | Living With Arthritis",
    description: "Guides on this website are general UK information, not a diagnosis or a personal treatment plan. They are not a substitute for your own clinician.",
    question: "Medical disclaimer",
    answer: "The guides are general educational information for people in the UK. They are not a diagnosis, a prescription or a personal treatment plan. Speak to your own clinician about your care.",
    breadcrumb: "Disclaimer",
  },
  "/safeguarding": {
    title: "Safeguarding | Living With Arthritis",
    description: "How to raise a safeguarding concern with Living With Arthritis, and what the charity will do if a child or an adult at risk may be unsafe.",
    question: "Safeguarding",
    answer: "If you are worried that a child or an adult at risk is unsafe, contact the charity and, where someone is in immediate danger, call 999. This page sets out how we respond.",
    breadcrumb: "Safeguarding",
  },
  "/complaints": {
    title: "Complaints | Living With Arthritis",
    description: "How to complain about Living With Arthritis, how soon we acknowledge a complaint, and how to contact the Charity Commission if you are not satisfied.",
    question: "Complaints",
    answer: "Email the charity with what happened and what you would like us to do. We acknowledge complaints and say how they will be handled. You can also contact the Charity Commission.",
    breadcrumb: "Complaints",
  },
  "/terms": {
    title: "Terms | Living With Arthritis",
    description: "Terms for using this website: free educational guides, no personal medical advice, and how donations and published material may be used.",
    question: "Terms of use",
    answer: "You may read the free guides for personal use. They are not personal medical advice. Donations are voluntary and do not buy a clinical service.",
    breadcrumb: "Terms",
  },
  "/helpline": {
    title: "Helpline | Living With Arthritis",
    description: "Call 07760 512 084, Monday to Friday, 9am to 5pm, or email us. We aim to reply within two working days. We do not give personal medical advice.",
    question: "Helpline",
    answer: "The phone line is open Monday to Friday, 9am to 5pm, on 07760 512 084. Email info@livingwitharthritis.org.uk if you prefer. We aim to reply within two working days. We cannot diagnose or prescribe.",
    breadcrumb: "Helpline",
  },
  "/events": {
    title: "Events | Living With Arthritis",
    description: "Living With Arthritis does not currently run public events or webinars. Free written guides and a weekday phone line are what the charity offers now.",
    question: "Events",
    answer: "There is no public events programme at the moment. Please use the free written guides or the weekday phone line instead of waiting for a webinar.",
    breadcrumb: "Events",
  },
  "/services": {
    title: "Services | Living With Arthritis",
    description: "What the charity offers now: free written guides and a phone line, Monday to Friday, 9am to 5pm. No clinic, referral service or virtual physiotherapy.",
    question: "Services",
    answer: "Living With Arthritis publishes free written guides and answers a phone line on weekdays. It does not run a clinic, a referral service or virtual physiotherapy.",
    breadcrumb: "Services",
  },
  "/volunteer": {
    title: "Volunteer | Living With Arthritis",
    description: "There is no open volunteer vacancy list. Email the charity if you want to help, and we will say whether anything is available.",
    question: "Volunteer",
    answer: "We do not advertise a standing list of volunteer roles. If you would like to help, email info@livingwitharthritis.org.uk and we will reply with what, if anything, is open.",
    breadcrumb: "Volunteer",
  },
  "/research": {
    title: "Research | Living With Arthritis",
    description: "This page does not award research grants or list trials. The charity publishes free guides and can be contacted on the weekday phone line.",
    question: "Research",
    answer: "Living With Arthritis does not award research grants from this website and does not run a trials service. Read the published guides, or contact us on weekdays.",
    breadcrumb: "Research",
  },
  "/governance": {
    title: "Governance | Living With Arthritis",
    description: "Trustees listed on the Charity Commission register: Ena Dulom, Tina Dulom and Jaibee Jacob. Charity 1218461, registered on 15 June 2026.",
    question: "Governance",
    answer: "The Charity Commission register lists the trustees as Ena Dulom, Tina Dulom and Jaibee Jacob. Living With Arthritis was registered on 15 June 2026. Biographies are not published here.",
    breadcrumb: "Governance",
  },
  "/magazine": {
    title: "Magazine | Living With Arthritis",
    description: "There is no regular magazine to subscribe to. This page is not included in the search index. Read the free guides instead.",
    question: "Magazine",
    answer: "A regular magazine is not part of what the charity publishes. This page is kept off the search index. The free written guides are the place to start.",
    breadcrumb: "Magazine",
    noindex: true,
  },
  "/community": {
    title: "Community | Living With Arthritis",
    description: "Free written arthritis guides and a weekday phone line. We do not publish outcome percentages or a round-the-clock help chat.",
    question: "Community",
    answer: "This hub links to free written guides and the weekday phone line. We do not publish outcome percentages, invented user counts, or a 24-hour chat.",
    breadcrumb: "Community",
  },
};

/**
 * @param {string} route e.g. "/conditions/knee-arthritis/symptoms"
 * @returns {{title:string, description:string, question:string, answer:string, breadcrumb:string}|null}
 */
export function deriveHeadData(route) {
  if (PAGE_HEADS[route]) return PAGE_HEADS[route];

  const all = route.split('/').filter(Boolean);
  if (all.length === 0) return null;

  const lang = LANG_LABELS[all[0]] ? all[0] : null;
  const segments = lang ? all.slice(1) : all;
  if (segments.length === 0) {
    const meta = LANG_LABELS[lang];
    return {
      title: `Living With Arthritis — ${meta.label}`,
      description: `Guías sobre la artritis / arthrite / Arthritis ${meta.suffix} de Living With Arthritis, una organización benéfica registrada (nº 1218461).`.slice(0, 158),
      question: `Living With Arthritis — ${meta.label}`,
      answer: `This is the ${meta.label} entry point for Living With Arthritis. Our clinically reviewed arthritis guides are published ${meta.suffix}.`,
      breadcrumb: meta.label,
    };
  }

  const section = SECTION_LABELS[segments[0]];
  const last = humanise(segments[segments.length - 1]);
  const parent = segments.length > 1 ? humanise(segments[segments.length - 2]) : '';

  const base = parent && parent !== last ? `${parent} — ${last.toLowerCase()}` : last;
  const subject = lang ? `${base} (${LANG_LABELS[lang].label})` : base;
  const heading = `${subject} | Living With Arthritis`;

  // Unique enough for an uncurated URL, without a fake "people most often
  // ask" intro or the charity-number boilerplate used on every utility page.
  const description = [
    `${subject}: educational information for people in the UK.`,
    lang ? `Read this page ${LANG_LABELS[lang].suffix}.` : 'Free written guides and a weekday phone line.',
    'Not a personal medical assessment.',
  ]
    .filter(Boolean)
    .join(' ')
    .slice(0, 160);

  const answer = description;

  return {
    title: heading.length > 115 ? `${subject.slice(0, 90)} | Living With Arthritis` : heading,
    description: description.slice(0, 158),
    question: subject,
    answer,
    breadcrumb: last,
  };
}

