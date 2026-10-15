/** Build an intent map against real canonical URLs; these are candidates, not measured search volumes. */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { readPublishedBlogPosts } from './lib/blog-posts.mjs';

const origin = 'https://livingwitharthritis.org.uk';
const out = 'docs/seo/growth-2026-10-11';
mkdirSync(out, { recursive: true });
const seeds = [
  ['arthritis', '/conditions/arthritis'],
  ['rheumatoid arthritis', '/conditions/rheumatoid-arthritis'],
  ['osteoarthritis', '/conditions/osteoarthritis'],
  ['psoriatic arthritis', '/conditions/psoriatic-arthritis'],
  ['ankylosing spondylitis', '/conditions/ankylosing-spondylitis'],
  ['fibromyalgia', '/conditions/fibromyalgia'],
  ['chronic pain', '/guides/understanding-pain'],
  ['joint pain', '/guides/arthritis-pain-relief'],
  ['inflammation', '/arthritis-flare-ups'],
  ['knee arthritis', '/conditions/knee-arthritis'],
  ['hip arthritis', '/conditions/hip-arthritis'],
  ['hand arthritis', '/conditions/hand-arthritis'],
  ['shoulder arthritis', '/conditions/shoulder-arthritis'],
  ['foot and ankle arthritis', '/conditions/foot-and-ankle-arthritis'],
  ['gout', '/conditions/gout'],
  ['lupus', '/conditions/lupus'],
  ['reactive arthritis', '/conditions/reactive-arthritis'],
  ['polymyalgia rheumatica', '/conditions/polymyalgia-rheumatica'],
  ['juvenile arthritis', '/conditions/juvenile-arthritis'],
  ['frailty', '/guides/frailty-management-hub'],
];
const families = {
  symptoms: ['symptoms', 'early signs', 'morning stiffness', 'swelling', 'fatigue', 'night pain', 'flare symptoms'],
  diagnosis: ['diagnosis', 'blood tests', 'scans', 'when to see a GP', 'rheumatology referral', 'questions for a doctor'],
  causes: ['causes', 'risk factors', 'family history', 'triggers'],
  treatment: ['treatment options', 'NHS treatment', 'medications', 'pain relief', 'medicine side effects', 'treatment review'],
  exercise: ['exercises', 'physiotherapy', 'walking', 'swimming', 'strengthening exercises', 'exercise during a flare', 'home exercises', 'exercise adaptations'],
  nutrition: ['nutrition', 'diet evidence', 'weight management', 'supplement safety', 'healthy eating'],
  'self-management': ['self management', 'pacing', 'sleep', 'daily activity diary', 'joint protection', 'planning appointments'],
  support: ['mental health support', 'support groups UK', 'disability support UK', 'work adjustments', 'help for carers', 'NHS waiting list help'],
};
const questions = [
  ['symptoms', 'What are the symptoms of {k}?'],
  ['symptoms', 'Can {k} cause fatigue?'],
  ['symptoms', 'Why is {k} worse in the morning?'],
  ['diagnosis', 'How is {k} diagnosed?'],
  ['diagnosis', 'When should I see a GP about {k}?'],
  ['diagnosis', 'What should I ask my doctor about {k}?'],
  ['causes', 'What causes {k}?'],
  ['causes', 'Can cold weather affect {k}?'],
  ['treatment', 'What treatments are available for {k}?'],
  ['treatment', 'Can {k} symptoms improve?'],
  ['treatment', 'Who treats {k} on the NHS?'],
  ['exercise', 'Is walking suitable for someone with {k}?'],
  ['exercise', 'How can physiotherapy help with {k}?'],
  ['exercise', 'How do I start exercising with {k}?'],
  ['exercise', 'Should I change exercise during a {k} flare?'],
  ['nutrition', 'Can diet help manage {k}?'],
  ['nutrition', 'What evidence is there for supplements for {k}?'],
  ['self-management', 'How can I sleep better with {k}?'],
  ['self-management', 'How do I pace daily activities with {k}?'],
  ['self-management', 'What can I record in a {k} symptom diary?'],
  ['support', 'Where can I find {k} support in the UK?'],
  ['support', 'Can I work with {k}?'],
  ['support', 'What help is available for carers of someone with {k}?'],
  ['support', 'How can I discuss {k} and low mood with my GP?'],
  ['support', 'Can {k} affect eligibility for disability benefits?'],
];
const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const paths = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(origin, '')));
const posts = readPublishedBlogPosts();
const words = (text) => new Set(String(text).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !['the','and','for','with','how','can','what','are','someone'].includes(w)));
function closest(query) {
  const q = words(query);
  let winner = null, score = 0;
  for (const p of posts) {
    const w = words(p.title);
    const intersection = [...q].filter((x) => w.has(x)).length;
    const similarity = intersection / Math.max(1, new Set([...q, ...w]).size);
    if (similarity > score) { score = similarity; winner = p; }
  }
  return score >= 0.45 ? { path: `/blog/${winner.slug}`, title: winner.title, similarity: score.toFixed(2) } : null;
}
function target(pillar, family) {
  const child = ({ symptoms: 'symptoms', treatment: 'treatment', exercise: 'exercises', nutrition: 'diet' })[family];
  return child && paths.has(`${pillar}/${child}`) ? `${pillar}/${child}` : pillar;
}
function csv(file, rows) {
  const columns = Object.keys(rows[0]);
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  writeFileSync(`${out}/${file}`, [columns.map(cell).join(','), ...rows.map((r) => columns.map((k) => cell(r[k])).join(','))].join('\n') + '\n');
}
const keywords = [];
for (const [keyword, pillar] of seeds) {
  if (!paths.has(pillar)) throw new Error(`Pillar is not canonical: ${pillar}`);
  const candidates = [[keyword, 'overview', 'primary'], ...Object.entries(families).flatMap(([family, list]) => list.map((suffix) => [`${keyword} ${suffix}`, family, 'long-tail'])), ...questions.map(([family, query]) => [query.replace('{k}', keyword), family, 'question'])];
  for (const [query, family, kind] of candidates) {
    const match = closest(query);
    keywords.push({ keyword: query, cluster: keyword, intent: family, query_type: kind, pillar_path: pillar, target_path: match && paths.has(match.path) ? match.path : target(pillar, family), action: match ? 'review existing article; avoid competing new URL' : 'check target section coverage; expand if useful', existing_title_candidate: match?.title ?? '', title_similarity: match?.similarity ?? '', validation: 'generated candidate; no volume, ranking or PAA observation', monthly_volume: '', difficulty: '', priority: ['exercise','symptoms','support'].includes(family) ? 'P1' : 'P2' });
  }
}
if (new Set(keywords.map((r) => r.keyword.toLowerCase())).size !== keywords.length) throw new Error('Duplicate keywords');
if (keywords.length <= 1000) throw new Error('Insufficient keyword candidates');
csv('keyword-map.csv', keywords);
const pillars = seeds.map(([keyword, pillar], i) => ({ cluster: keyword, canonical_path: pillar, status: 'existing pillar; strengthen rather than duplicate', audience_job: `Understand ${keyword}, choose a next step and prepare for professional advice`, sections: 'answer first; symptoms; diagnosis; management; movement; daily life; help; sources', link_policy: 'hub to relevant subpages and reviewed articles; each supporting article back to hub', evidence_required: 'current NHS/NICE guidance plus suitable primary studies; verified author and reviewer', priority: i < 9 ? 'P1' : 'P2' }));
csv('20-pillar-briefs.csv', pillars);
const angles = [
  ['First appointment checklist', 'What to record before an appointment; medicines list; questions; where to find local care'],
  ['A practical diary for better care conversations', 'Track the activities that matter; symptom variation; questions for your treating team'],
  ['Planning a week around symptoms and energy', 'A realistic activity plan; adjustments; when plans need clinical input'],
  ['Explaining your needs to family and friends', 'Practical support requests; consent; accessible social plans; carers resources'],
  ['Checking online advice before trying something new', 'Evidence quality; safety questions; exaggerated claims; pharmacist and clinical advice'],
];
const blogs = seeds.flatMap(([keyword, pillar]) => angles.map(([angle, outline]) => {
  const title = `${keyword.charAt(0).toUpperCase()+keyword.slice(1)}: ${angle.toLowerCase()}`;
  const match = closest(title);
  return { title, cluster: keyword, parent: pillar, outline, answer_first_brief: `Explain the reader's next practical step in two sentences, including limitations; do not promise a cure.`, original_value: 'a tailored checklist or diary plus consented lived experience; no fabricated quotes', expert_input: 'commission relevant clinician review; credit only after approval', existing_article_candidate: match?.path ?? '', status: 'idea only; check overlap and clinical accuracy before commissioning', planned_url: `/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'')}` };
}));
csv('100-blog-briefs.csv', blogs);
const faqQueries = seeds.flatMap(([k,p]) => [questions[5],questions[18]].map(([family,q]) => ({question:q.replace('{k}',k),cluster:k,parent:p,intent:family}))).concat(seeds.slice(0,10).map(([k,p])=>({question:`How can I prepare for a treatment review for ${k}?`,cluster:k,parent:p,intent:'treatment'})));
csv('50-faq-briefs.csv', faqQueries.map((r)=>({...r,answer_structure:'direct answer; practical checklist; limitations and when to seek care; sources; related hub',publication_policy:'draft brief; check existing FAQ and article coverage; merge into a strong page if intent overlaps',schema_policy:'FAQPage only for visible matching questions; no Google FAQ rich-result promise',review_requirement:'named qualified reviewer only after documented sign-off'})));
csv('internal-link-map.csv', keywords.filter((r)=>r.target_path!==r.pillar_path).map((r)=>({source_path:r.target_path,target_path:r.pillar_path,anchor:`${r.cluster} guide`,placement:'contextual next step; add once if missing',status:'recommendation; review relevance and existing links before applying'})).filter((r,i,a)=>a.findIndex((x)=>x.source_path===r.source_path&&x.target_path===r.target_path)===i));
writeFileSync(`${out}/summary.json`, JSON.stringify({keyword_candidates:keywords.length,canonical_inventory:paths.size,published_articles:posts.length,pillar_briefs:pillars.length,blog_ideas:blogs.length,faq_briefs:faqQueries.length,keywords_with_title_match:keywords.filter((r)=>r.existing_title_candidate).length,scope:'Content inventory gap map, not a measured competitor keyword gap analysis; no Search Console or competitor rank export available in this checkout.'},null,2)+'\n');
console.log(`[growth-map] ${keywords.length} deduplicated candidates; 20 existing pillars, 100 blog ideas and 50 FAQ briefs mapped against ${paths.size} canonical URLs.`);
