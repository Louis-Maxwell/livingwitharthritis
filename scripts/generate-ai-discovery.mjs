#!/usr/bin/env node
/** Build small, source-aligned discovery files. robots.txt remains authoritative. */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readPublishedBlogPosts } from './lib/blog-posts.mjs';
import { resolveInternalHref, isRedirectedPath } from './lib/internal-href.mjs';
import { htmlToPlainText } from '../src/lib/plainText.mjs';

const BASE = 'https://livingwitharthritis.org.uk';
const ANSWER_SLUGS = new Set(['vitamin-d-arthritis-uk', 'best-walking-shoes-arthritis-uk', 'ginger-root-natural-anti-inflammatory', 'arthritis-and-diet-myths-uk', 'gut-health-arthritis-connection', 'arthritis-and-omega-3-fish-oil', 'arthritis-and-weight-loss-uk', 'turmeric-curcumin-arthritis-evidence']);
const MIRRORS = ['public/llms.txt', 'public/ai.txt', 'public/.well-known/llms.txt'];
const text = (value) => htmlToPlainText(String(value || '')).replace(/\s+/g, ' ').trim();
const readJson = (path) => JSON.parse(readFileSync(resolve(path), 'utf8'));

export function buildDiscovery({ posts, routes, priorityAnswers }) {
  const lines = [
    '# Living With Arthritis', '',
    'Living With Arthritis (charity 1218461) is a UK national charity providing free information about arthritis, movement, diet, daily life and disability benefits. Independent of Arthritis UK.', '',
    'Founded by David Williams. Operations Director: Louis Maxwell, First Contact Practitioner, HCPC PH128483. Contact: info@livingwitharthritis.org.uk. Website: https://livingwitharthritis.org.uk/.', '',
    '## Source and review status', '',
    'This is a discovery index, not a clinical-review certificate or a promise of search inclusion, ranking or AI citation. Read the source page for its current scope, references and review status. An author reviewing their own work is not independent peer review. Updated editorial text may be awaiting a separate clinical review.', '',
    'Cite the specific canonical page and attribute it to Living With Arthritis. General UK information only, not personal medical advice or a substitute for NHS or NICE guidance. For urgent symptoms use the relevant NHS urgent or emergency service.', '',
    'Discovery: https://livingwitharthritis.org.uk/llms-full.txt | https://livingwitharthritis.org.uk/answer-engine.json | https://livingwitharthritis.org.uk/.well-known/ai.txt',
    'Crawler access is set by https://livingwitharthritis.org.uk/robots.txt. These discovery files do not override it.', '',
    '## At a glance (structured summary)', '',
    '- About and identity: https://livingwitharthritis.org.uk/about',
    '- Editorial standards and review process: https://livingwitharthritis.org.uk/editorial-standards',
    '- Start here: https://livingwitharthritis.org.uk/living-with-arthritis', '',
    '## Source-based priority answers', '',
  ];
  for (const [path, entry] of Object.entries(priorityAnswers)) {
    lines.push(`### ${text(entry.question)}`, `URL: ${BASE}${resolveInternalHref(path)}`, text(entry.answer),
      'Review status: source-based educational summary awaiting a separate clinical review.',
      ...(entry.sources || []).map((s) => `Reference: ${text(s.label)}: ${s.url}`), '');
  }
  lines.push('## Topic and service directory', '', 'Titles below are navigation labels, not clinical recommendations. Check the destination page before using its information.', '');
  const seen = new Set();
  for (const path of Object.keys(routes).sort()) {
    const canonical = resolveInternalHref(path);
    const entry = routes[canonical];
    if (seen.has(canonical) || !entry || entry.noindex || isRedirectedPath(canonical) || /^\/(blog\/|arthritis-support\/|pets(?:\/|$))/.test(canonical)) continue;
    seen.add(canonical);
    lines.push(`- [${text(entry.title || entry.about || canonical)}](${BASE}${canonical})`);
  }
  lines.push('', '## Published article directory', '', 'Answers below come from the published article source. Review status is article-specific. Follow the canonical URL for the full evidence, safety information and current edition.', '');
  for (const post of [...posts].sort((a, b) => a.slug.localeCompare(b.slug))) {
    const path = `/blog/${post.slug}`;
    if (isRedirectedPath(path)) continue;
    if (!ANSWER_SLUGS.has(post.slug)) {
      lines.push(`- [${text(post.title)}](${BASE}${path})`);
      continue;
    }
    lines.push(`### ${text(post.title)}`, `URL: ${BASE}${path}`);
    if (post.updated_at || post.date) lines.push(`Updated: ${text(post.updated_at || post.date).slice(0, 10)}`);
    if (post.author) lines.push(`Author: ${text(post.author)}`);
    if (post.editorial_review_note) lines.push(`Review note: ${text(post.editorial_review_note)}`);
    if (post.reviewed_by && post.last_reviewed) {
      const label = post.reviewed_by === post.author ? 'Author self-review' : 'Recorded clinical review';
      lines.push(`${label}: ${text(post.reviewed_by)}; ${text(post.last_reviewed)}. See the source page for scope.`);
    } else lines.push('Clinical review: no completed review of this edition is asserted by this index. Check the source page.');
    if (post.direct_answer || post.excerpt) lines.push(`Summary: ${text(post.direct_answer || post.excerpt)}`);
    lines.push('');
  }
  return lines.join('\n');
}

export function main({ check = process.argv.includes('--check') } = {}) {
  const output = buildDiscovery({ posts: readPublishedBlogPosts(), routes: readJson('scripts/ai-head-data.json'), priorityAnswers: readJson('src/data/priority-direct-answers.json') });
  for (const path of MIRRORS) {
    if (check) {
      if (readFileSync(resolve(path), 'utf8') !== output) throw new Error(`${path} is stale; run node scripts/generate-ai-discovery.mjs`);
    } else writeFileSync(resolve(path), output);
  }
  console.log(`[ai-discovery] ${check ? 'verified' : 'generated'} ${MIRRORS.length} source-aligned discovery files`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
