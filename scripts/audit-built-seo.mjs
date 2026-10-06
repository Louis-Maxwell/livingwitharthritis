import fs from 'node:fs';
import path from 'node:path';
const base = 'https://livingwitharthritis.org.uk';
const paths = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].slice(base.length) || '/');
const errors = [], rows = [], incoming = new Map(), graph = new Map();
const read = route => fs.readFileSync(path.join('dist', route.replace(/^\//, ''), 'index.html'), 'utf8');
function inspect(route, html, indexable) {
  const head = html.split('</head>')[0];
  const canonical = [...head.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)].map(m => m[1]);
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m => m[1].replace(/<[^>]*>/g, ''));
  if (indexable && (canonical.length !== 1 || canonical[0] !== base + route)) errors.push(`${route}: canonical mismatch`);
  if (indexable && /<meta[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(head)) errors.push(`${route}: indexable sitemap URL has noindex`);
  if (indexable && h1.length !== 1) errors.push(`${route}: expected one H1, got ${h1.length}`);
  if (indexable && /id="seo-fallback"[^>]*aria-hidden="true"/.test(html)) errors.push(`${route}: public static content hidden from assistive technology`);
  const body = html.match(/<article id="static-article"[^>]*>([\s\S]*?)<\/article>/)?.[1] || [...html.matchAll(/<main\b[^>]*>([\s\S]*?)<\/main>/g)].map(m => m[1]).join(' ');
  const words = body.replace(/<[^>]+>/g,' ').trim().split(/\s+/).filter(Boolean).length;
  const links = [...html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)].flatMap(m => {
    try { const u = new URL(m[1].replace(/&amp;/g,'&'), base); return u.origin === base && !/\.(xml|css|js|png|webp|woff2|pdf)$/.test(u.pathname) ? [u.pathname.replace(/\/$/, '') || '/'] : []; } catch { return []; }
  });
  graph.set(route, new Set(links));
  for (const target of new Set(links)) if (target !== route) incoming.set(target, (incoming.get(target) || 0) + 1);
  const types = [];
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { const d=JSON.parse(m[1]); for(const item of d['@graph'] || [d]) types.push(item['@type']); } catch { errors.push(`${route}: invalid JSON-LD`); }
  }
  rows.push({ path: route, words, h1: h1[0], types, thinCandidate: words < 120 });
}
for (const route of paths) {
  try { inspect(route, read(route), true); } catch { errors.push(`${route}: missing built document`); }
}
for (const route of ['/site-index']) { try { inspect(route, read(route), false); } catch { errors.push(`${route}: missing human index`); } }
const reachable = new Set(['/']), queue = ['/'];
for (let i=0; i<queue.length; i++) for (const target of graph.get(queue[i]) || []) if (!reachable.has(target)) { reachable.add(target); queue.push(target); }
const orphanCandidates = paths.filter(p => !incoming.get(p));
const unreachableCandidates = paths.filter(p => !reachable.has(p));
const report = { scope: 'Built static HTML only; not live status, rendered crawl or Google index decisions', pages: paths.length, errors, orphanCandidates, unreachableCandidates,
  thinCandidates: rows.filter(r => r.thinCandidate).map(r => ({ path:r.path, words:r.words })), rows };
fs.mkdirSync('docs/seo', { recursive:true });
fs.writeFileSync('docs/seo/built-audit.generated.json', JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({pages:paths.length, errors:errors.length, orphanCandidates:orphanCandidates.length, unreachableCandidates:unreachableCandidates.length, thinCandidates:report.thinCandidates.length}));
if(errors.length) {console.error(errors.slice(0,20).join('\n'));process.exitCode=1;}
