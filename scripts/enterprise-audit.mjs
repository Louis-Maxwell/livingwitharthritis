// Reproducible first-response audit. No crawl, submissions or clinical review.
import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parse } from 'parse5';
const dist = resolve(process.env.DIST_DIR || 'dist');
const out = resolve(process.env.AUDIT_DIR || 'artifacts/enterprise-seo');
const text = (node) => node.nodeName === '#text' ? node.value : ['script', 'style'].includes(node.tagName) ? '' : (node.childNodes || []).map(text).join(' ');
const attr = (node, key) => node?.attrs?.find((a) => a.name === key)?.value || '';
const pages = [];
const xml = readFileSync('public/sitemap.xml', 'utf8');
const urls = [...xml.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g)].map((m) => m[1]);
for (const url of urls) {
  const path = new URL(url).pathname;
  const file = join(dist, path, 'index.html');
  if (!existsSync(file)) { pages.push({ url, issues: ['CRITICAL: missing build HTML'] }); continue; }
  const html = readFileSync(file, 'utf8');
  const doc = parse(html); const nodes = [];
  const walk = (n) => { nodes.push(n); (n.childNodes || []).forEach(walk); }; walk(doc);
  const tags = (tag) => nodes.filter((n) => n.tagName === tag);
  const meta = (name) => attr(tags('meta').find((n) => attr(n, 'name') === name), 'content');
  const title = text(tags('title')[0] || {}).trim();
  const description = meta('description');
  const canonical = attr(tags('link').find((n) => attr(n, 'rel') === 'canonical'), 'href');
  const headings = tags('h1').map((n) => text(n).replace(/\s+/g, ' ').trim());
  const article = nodes.find((n) => attr(n, 'id') === 'static-article');
  const words = text(article || tags('body')[0] || {}).trim().split(/\s+/).filter(Boolean).length;
  const schemas = []; const issues = [];
  for (const n of tags('script').filter((n) => attr(n, 'type') === 'application/ld+json')) {
    try { const data = JSON.parse(n.childNodes.map((c) => c.value || '').join('')); const collect = (x) => { if (Array.isArray(x)) x.forEach(collect); else if (x && typeof x === 'object') { if (x['@type']) schemas.push(...[].concat(x['@type'])); if (x['@graph']) collect(x['@graph']); } }; collect(data); }
    catch { issues.push('HIGH: invalid JSON-LD'); }
  }
  if (!title) issues.push('HIGH: missing title');
  if (!description) issues.push('HIGH: missing description');
  if (canonical !== url) issues.push('HIGH: canonical mismatch');
  if (/noindex/i.test(meta('robots'))) issues.push('HIGH: sitemap URL is noindex');
  if (headings.length !== 1) issues.push(`MEDIUM: ${headings.length} first-response H1s`);
  if (words < 250) issues.push('MEDIUM: short first-response copy; review rendered intent before expanding');
  if (title.length > 65) issues.push('LOW: long title; pixel-width review needed');
  const links = tags('a').map((n) => attr(n, 'href')).filter((s) => s.startsWith('/') && !s.startsWith('//')).map((s) => s.split(/[?#]/)[0]);
  const images = tags('img');
  const missingAlt = images.filter((n) => !n.attrs?.some((a) => a.name === 'alt')).length;
  if (missingAlt) issues.push(`MEDIUM: ${missingAlt} images without alt attribute`);
  pages.push({ url, path, title, description, canonical, robots: meta('robots'), h1: headings, words, schemaTypes: [...new Set(schemas)], htmlBytes: Buffer.byteLength(html), links: [...new Set(links)], missingAlt, issues });
}
const posts = readdirSync('src/content/blog/posts').filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(join('src/content/blog/posts', f), 'utf8'))).filter((p) => p.is_published !== false);
const blogs = posts.map((p) => {
  const issues = []; const body = String(p.content || ''); const words = text(parse(body)).trim().split(/\s+/).length;
  if (p.review_status === 'pending' || p.reviewStatus === 'pending') issues.push('HIGH: review status not recorded (needs Louis Maxwell sign-off)');
  if (!p.reviewed_by) issues.push('HIGH: no named reviewer recorded');
  if (!p.citations?.length) issues.push('HIGH: no structured citations; inspect inline sources');
  if (/Here is a plain-English take/i.test(p.direct_answer || '')) issues.push('MEDIUM: generic opening; write a specific answer after clinical review');
  if (words < 500) issues.push('MEDIUM: short article; assess search intent');
  return { slug: p.slug, title: p.title, category: p.category, keywords: p.keywords, words, author: p.author, reviewer: p.reviewed_by || '', reviewStatus: p.review_status || p.reviewStatus || 'unspecified (runtime defaults reviewed)', lastReviewed: p.last_reviewed || '', references: p.citations?.length || 0, issues,
    intent: /\?|how |what |when |can |should /i.test(p.title) ? 'Informational answer' : 'Informational guide',
    recommendations: 'Align introduction to the title; keep useful headings; add claim-level primary references and reviewer approval. Link to the canonical topic hub and related guides. Extract FAQs only from supported visible answers.' };
});
const pathSet = new Set(pages.map((p) => p.path)); const incoming = new Map();
for (const p of pages) for (const link of p.links || []) if (pathSet.has(link)) incoming.set(link, (incoming.get(link) || 0) + 1);
for (const p of pages) p.firstResponseIncomingLinks = incoming.get(p.path) || 0;
const data = { generatedAt: new Date().toISOString(), scope: 'Built first-response HTML and all published source blogs; excludes browser rendering, clinical validation and search account state', pages, blogs };
mkdirSync(out, { recursive: true }); writeFileSync(join(out, 'enterprise-audit.json'), JSON.stringify(data, null, 2) + '\n');
console.log(JSON.stringify({ pages: pages.length, blogs: blogs.length, issues: pages.reduce((n, p) => n + p.issues.length, 0), output: join(out, 'enterprise-audit.json') }));
