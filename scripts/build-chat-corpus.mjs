#!/usr/bin/env node
/**
 * Builds supabase/functions/reindex-content/site-corpus.json — the static
 * (non-blog) half of the chat retrieval corpus.
 *
 * Source: scripts/ai-head-data.json, the same reviewed data already used for
 * on-page schema and llms-full.txt. Nothing here is invented: each entry is
 * the page's own question/answer plus its FAQ pairs, condensed into one
 * retrievable passage per page.
 *
 * Run: node scripts/build-chat-corpus.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const headData = JSON.parse(
  readFileSync(resolve('scripts/ai-head-data.json'), 'utf8'),
);

const items = [];
for (const [route, entry] of Object.entries(headData)) {
  const parts = [];
  if (entry.description) parts.push(entry.description);
  if (entry.question && entry.answer) {
    parts.push(`${entry.question} ${entry.answer}`);
  }
  for (const faq of entry.faqs ?? []) {
    if (faq.q && faq.a) parts.push(`${faq.q} ${faq.a}`);
  }
  const content = parts.join('\n\n').trim();
  if (content.length < 80) continue;

  const sourceType = route.startsWith('/conditions/')
    ? 'condition'
    : route.startsWith('/exercises/')
      ? 'exercise'
      : route.startsWith('/glossary/')
        ? 'glossary'
        : route.startsWith('/pets')
          ? 'pets'
          : 'guide';

  items.push({
    source_type: sourceType,
    source_slug: route.replace(/^\//, '').replace(/\//g, '-') || 'home',
    url: route,
    title: entry.title ?? entry.about ?? route,
    content,
  });
}

items.sort((a, b) => a.url.localeCompare(b.url));

writeFileSync(
  resolve('supabase/functions/reindex-content/site-corpus.json'),
  `${JSON.stringify(items, null, 0)}\n`,
);

console.log(
  `[chat-corpus] wrote ${items.length} page passages -> supabase/functions/reindex-content/site-corpus.json`,
);
