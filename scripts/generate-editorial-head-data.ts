// Export existing FAQ/glossary copy into the first response. No generated
// medical answers, dates or review claims are introduced here.
import { writeFileSync } from 'node:fs';
import { faqArticles } from '../src/data/faqArticles';
import { GLOSSARY_CONTENT } from '../src/data/glossary-content';
const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const entries: Record<string, unknown> = {};
for (const article of faqArticles) {
  entries[`/faq/${article.slug}`] = {
    title: article.seoTitle || `${article.question} | Living With Arthritis`,
    description: article.metaDescription || article.quickAnswer,
    question: article.question, answer: article.quickAnswer, breadcrumb: article.title,
    bodyHtml: article.sections.map((s) => `<h2>${esc(s.heading)}</h2><p>${esc(s.content)}</p>`).join(''),
    faqs: [{ q: article.question, a: article.quickAnswer }],
    sources: (article.citations || []).map((c) => ({ name: c.label, url: c.url })),
    relatedLinks: [{ path: '/faq', title: 'More arthritis questions and answers' }, { path: '/blog/archive', title: 'Browse all arthritis guides' }],
  };
}
for (const [slug, term] of Object.entries(GLOSSARY_CONTENT)) {
  entries[`/glossary/${slug}`] = {
    title: `${term.label}: meaning and arthritis care | Living With Arthritis`,
    description: term.short, question: term.label, answer: term.short,
    breadcrumb: term.label, bodyHtml: `<p>${esc(term.body)}</p>`,
    definedTerm: { name: term.label, description: term.body },
    relatedLinks: [{ path: '/glossary', title: 'Arthritis glossary' }, ...(term.related || [])
      .filter((s) => GLOSSARY_CONTENT[s]).map((s) => ({ path: `/glossary/${s}`, title: GLOSSARY_CONTENT[s].label }))],
  };
}
writeFileSync('scripts/editorial-head-data.json', JSON.stringify(entries, null, 2) + '\n');
console.log(`[editorial-head-data] exported ${Object.keys(entries).length} existing FAQ and glossary pages`);
