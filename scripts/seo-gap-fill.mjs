#!/usr/bin/env node
/**
 * SEO gap filler: internal linking (orphan rescue), topic clustering,
 * quick-answer boxes and key takeaways.
 *
 * Reads the checked-in article catalogue, rewrites article HTML in place and
 * emits recommendation/audit artefacts. Idempotent: re-running does not
 * duplicate blocks.
 *
 *   bun scripts/seo-gap-fill.mjs            # dry run
 *   bun scripts/seo-gap-fill.mjs --apply    # write files
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stripTags } from './lib/strip-tags.mjs';

const APPLY = process.argv.includes('--apply');
const LINKS_PER_ARTICLE = 4;
const MIN_INBOUND = 3;

const SOURCES = [
  'src/content/blog/frailty-batch.json',
  'src/content/blog/phase2-batch.json',
  'src/data/blogArticles.json',
];

const CLUSTERS = {
  'sexual-health': ['intimacy', 'sex', 'libido', 'relationship', 'partner', 'dating'],
  'caregiver-support': ['caregiver', 'carer', 'caring', 'family', 'spouse'],
  'fatigue-management': ['fatigue', 'energy', 'pacing', 'sleep', 'tired', 'rest'],
  'medication-safety': ['medication', 'drug', 'methotrexate', 'biologic', 'nsaid', 'dmard', 'supplement', 'painkiller'],
  'mental-health': ['anxiety', 'depression', 'grief', 'mental', 'mood', 'stress', 'wellbeing'],
  'condition-specific': ['rheumatoid', 'psoriatic', 'osteoarthritis', 'gout', 'lupus', 'ankylosing', 'diagnosis', 'symptom'],
  'exercise-movement': ['exercise', 'movement', 'walking', 'yoga', 'pilates', 'swimming', 'strength', 'stretch', 'physiotherapy'],
  'pain-management': ['pain', 'flare', 'relief', 'inflammation', 'swelling', 'stiffness'],
  'daily-living': ['work', 'home', 'travel', 'driving', 'cooking', 'aids', 'benefits', 'shopping', 'clothing', 'garden'],
  nutrition: ['diet', 'food', 'nutrition', 'eating', 'weight', 'vitamin', 'omega', 'turmeric', 'anti-inflammatory'],
};

const STOP = new Set(
  ('the a an and or for with your you how what when why to of in on is are it its this that from best guide uk ' +
    'arthritis living help tips can does do about into more using use').split(' '),
);

const tokens = (s = '') =>
  String(s)
    .toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP.has(w));

function clustersFor(article) {
  const hay = `${article.title} ${article.excerpt ?? ''} ${article.keywords ?? ''} ${article.category ?? ''} ${article.slug}`.toLowerCase();
  const hits = Object.entries(CLUSTERS)
    .map(([key, words]) => [key, words.filter((w) => hay.includes(w)).length])
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);
  return hits.length ? hits.slice(0, 2).map(([k]) => k) : ['daily-living'];
}

// ---------------------------------------------------------------- load
const files = SOURCES.map((path) => ({ path, rows: JSON.parse(readFileSync(path, 'utf8')) }));
const bySlug = new Map();
for (const file of files) {
  for (const row of file.rows) {
    if (row.is_published === false) continue;
    if (!bySlug.has(row.slug)) bySlug.set(row.slug, { row, file });
  }
}
const STRIP_RE = /\n?\s*<(?:aside|section) class="internal-links"[\s\S]*?<\/(?:aside|section)>\s*/g;
for (const { row } of bySlug.values()) {
  row.content = String(row.content).replace(STRIP_RE, '\n');
}
const articles = [...bySlug.values()].map(({ row, file }) => ({
  slug: row.slug,
  title: row.title,
  row,
  file,
  clusters: clustersFor(row),
  tokens: new Set([...tokens(row.title), ...tokens(row.keywords), ...tokens(row.excerpt)]),
  words: String(row.content).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length,
  h2: (String(row.content).match(/<h2\b/g) || []).length,
  faq: (String(row.content).match(/<h3\b/g) || []).length,
}));

const inboundOf = () => {
  const counts = new Map(articles.map((a) => [a.slug, 0]));
  for (const a of articles) {
    for (const slug of new Set(String(a.row.content).match(/\/blog\/[a-z0-9-]+/g) || [])) {
      const key = slug.replace('/blog/', '');
      if (counts.has(key) && key !== a.slug) counts.set(key, counts.get(key) + 1);
    }
  }
  return counts;
};

const before = inboundOf();
const orphans = articles.filter((a) => (before.get(a.slug) ?? 0) === 0);

// ------------------------------------------------------- scoring/pairing
function score(source, target) {
  if (source.slug === target.slug) return -1;
  let s = 0;
  const shared = target.clusters.filter((c) => source.clusters.includes(c)).length;
  s += shared * 6;
  if (source.row.category && source.row.category === target.row.category) s += 3;
  let overlap = 0;
  for (const t of target.tokens) if (source.tokens.has(t)) overlap += 1;
  s += Math.min(overlap, 6) * 2;
  return s;
}

const inboundPlanned = new Map(articles.map((a) => [a.slug, before.get(a.slug) ?? 0]));
const plan = new Map(articles.map((a) => [a.slug, []])); // source -> targets

// Pass 1: give every under-linked article inbound links from its best matches.
const needy = articles
  .slice()
  .sort((a, b) => (inboundPlanned.get(a.slug) ?? 0) - (inboundPlanned.get(b.slug) ?? 0));

for (const target of needy) {
  while ((inboundPlanned.get(target.slug) ?? 0) < MIN_INBOUND) {
    const candidate = articles
      .filter(
        (a) =>
          a.slug !== target.slug &&
          plan.get(a.slug).length < LINKS_PER_ARTICLE &&
          !plan.get(a.slug).some((t) => t.slug === target.slug) &&
          !String(a.row.content).includes(`/blog/${target.slug}`),
      )
      .map((a) => ({ a, s: score(a, target) - plan.get(a.slug).length }))
      .sort((x, y) => y.s - x.s)[0];
    if (!candidate) break;
    plan.get(candidate.a.slug).push(target);
    inboundPlanned.set(target.slug, (inboundPlanned.get(target.slug) ?? 0) + 1);
  }
}

// Pass 2: top up every article to LINKS_PER_ARTICLE outbound links.
for (const source of articles) {
  const chosen = plan.get(source.slug);
  if (chosen.length >= LINKS_PER_ARTICLE) continue;
  const ranked = articles
    .filter(
      (t) =>
        t.slug !== source.slug &&
        !chosen.some((c) => c.slug === t.slug) &&
        !String(source.row.content).includes(`/blog/${t.slug}`),
    )
    .map((t) => ({ t, s: score(source, t) }))
    .sort((x, y) => y.s - x.s);
  for (const { t, s } of ranked) {
    if (chosen.length >= LINKS_PER_ARTICLE || s <= 0) break;
    chosen.push(t);
    inboundPlanned.set(t.slug, (inboundPlanned.get(t.slug) ?? 0) + 1);
  }
}

// ---------------------------------------------------------- content edits
const BLOCK_RE = /\n?\s*<(?:aside|section) class="internal-links"[\s\S]*?<\/(?:aside|section)>\s*/g;
const anchorText = (t) => t.row.meta_title && t.row.meta_title.length <= 60 ? t.row.meta_title : t.title;

function linkBlock(targets) {
  const items = targets
    .map(
      (t) =>
        `      <li><a href="/blog/${t.slug}">${anchorText(t)}</a> — ${escapeHtml(
          shortenExcerpt(t.row.excerpt || t.title),
        )}</li>`,
    )
    .join('\n');
  return `\n  <section class="internal-links" aria-labelledby="continue-reading">\n    <h2 id="continue-reading">Continue reading</h2>\n    <ul>\n${items}\n    </ul>\n  </section>\n`;
}

function shortenExcerpt(text) {
  const clean = String(text).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (clean.length <= 110) return clean;
  return `${clean.slice(0, 107).replace(/[,;\s]+\S*$/, '')}…`;
}
const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function withQuickAnswer(html, article) {
  if (/class="quick-answer"/.test(html)) return html;
  const answer = article.row.direct_answer || shortenExcerpt(article.row.excerpt || '');
  if (!answer || answer.length < 40) return html;
  const block = `\n  <p class="quick-answer"><strong>Quick answer:</strong> ${escapeHtml(answer)}</p>\n`;
  const firstParaEnd = html.indexOf('</p>');
  if (firstParaEnd === -1) return block + html;
  return html.slice(0, firstParaEnd + 4) + block + html.slice(firstParaEnd + 4);
}

function withTakeaways(html, article) {
  if (/id="key-takeaways"/i.test(html) || /Key takeaways/i.test(html)) return html;
  const points = (html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/g) || [])
    .map((h) => stripTags(h))
    .filter((t) => t && !/continue reading|frequently asked|faq/i.test(t))
    .slice(0, 5);
  if (points.length < 3) return html;
  const items = points.map((p) => `      <li>${escapeHtml(p)}</li>`).join('\n');
  const block = `\n  <section class="key-takeaways" aria-labelledby="key-takeaways">\n    <h2 id="key-takeaways">Key takeaways</h2>\n    <ul>\n${items}\n    </ul>\n  </section>\n`;
  const idx = html.lastIndexOf('</article>');
  return idx === -1 ? html + block : html.slice(0, idx) + block + html.slice(idx);
}

// Top 20 for featured-snippet work: depth + breadth + inbound.
const top20 = articles
  .slice()
  .sort(
    (a, b) =>
      (inboundPlanned.get(b.slug) ?? 0) * 3 + b.words / 500 + b.h2 -
      ((inboundPlanned.get(a.slug) ?? 0) * 3 + a.words / 500 + a.h2),
  )
  .slice(0, 20);
const top20Set = new Set(top20.map((a) => a.slug));

let edited = 0;
const csvRows = [['orphan_slug', 'linked_from_slug', 'recommended_anchor_text', 'rationale']];
for (const source of articles) {
  const targets = plan.get(source.slug);
  let html = String(source.row.content);
  const original = html;
  if (targets.length) {
    html = html.replace(BLOCK_RE, '\n');
    const idx = html.lastIndexOf('</article>');
    const block = linkBlock(targets);
    html = idx === -1 ? html + block : html.slice(0, idx) + block + html.slice(idx);
  }
  html = withQuickAnswer(html, source);
  if (top20Set.has(source.slug)) html = withTakeaways(html, source);
  if (html !== original) {
    source.row.content = html;
    source.row.updated_at = new Date().toISOString();
    edited += 1;
  }
  for (const t of targets) {
    if ((before.get(t.slug) ?? 0) === 0) {
      csvRows.push([
        t.slug,
        source.slug,
        anchorText(t).replace(/"/g, "'"),
        `shared cluster: ${t.clusters.filter((c) => source.clusters.includes(c)).join('|') || 'topical overlap'}`,
      ]);
    }
  }
}

// ------------------------------------------------------------- artefacts
const csv = csvRows
  .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
  .join('\n');

const snippetAudit = top20.map((a) => ({
  article_slug: a.slug,
  main_query: (a.row.keywords || a.title).split(',')[0].trim(),
  answer_box_text: (a.row.direct_answer || shortenExcerpt(a.row.excerpt || a.title)).slice(0, 220),
  current_faq_quality: a.faq >= 5 ? 'good' : 'needs-work',
  h2_count: a.h2,
  word_count: a.words,
  recommended_changes: [
    /class="quick-answer"/.test(String(a.row.content)) ? 'quick answer present' : 'add quick answer',
    a.faq >= 5 ? 'FAQ depth ok' : 'expand FAQ to 5+ pairs',
    a.h2 >= 3 && a.h2 <= 8 ? 'heading hierarchy ok' : 'rebalance H2 count to 3-8',
    /id="key-takeaways"/.test(String(a.row.content)) ? 'key takeaways present' : 'add key takeaways',
  ],
}));

const after = inboundOf();
const summary = {
  articles: articles.length,
  orphans_before: orphans.length,
  orphans_after: articles.filter((a) => (after.get(a.slug) ?? 0) === 0).length,
  articles_edited: edited,
  links_added: [...plan.values()].reduce((n, t) => n + t.length, 0),
  clusters: Object.keys(CLUSTERS).length,
};

if (APPLY) {
  for (const file of files) writeFileSync(file.path, `${JSON.stringify(file.rows, null, 2)}\n`);
  writeFileSync('scripts/internal-linking-recommendations.csv', `${csv}\n`);
  writeFileSync('scripts/featured-snippet-audit.json', `${JSON.stringify(snippetAudit, null, 2)}\n`);
  const cluster = articles.map((a) => ({ slug: a.slug, clusters: a.clusters }));
  writeFileSync('scripts/topic-clusters.json', `${JSON.stringify(cluster, null, 2)}\n`);
}

console.log(JSON.stringify(summary, null, 2));
console.log(APPLY ? 'Applied.' : 'Dry run — pass --apply to write.');
