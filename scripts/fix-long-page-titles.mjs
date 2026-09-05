#!/usr/bin/env node
/**
 * One-time SEO task: shorten long blog article page titles.
 *
 * Formula: [Primary Keyword] | [Unique Angle]  ->  55-60 chars max.
 * Writes to blog_articles.meta_title (the SEO title field).
 *
 * Usage:
 *   node scripts/fix-long-page-titles.mjs           # dry run: before/after only
 *   node scripts/fix-long-page-titles.mjs --apply   # write updates to database
 */
import { createClient } from '@supabase/supabase-js';

const MAX = 60;

// Bun auto-loads .env; fall back to parsing it manually for plain node.
if (!process.env.VITE_SUPABASE_URL) {
  const { readFileSync } = await import('node:fs');
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

const stripMd = (s = '') =>
  String(s).replace(/<[^>]+>/g, ' ').replace(/[*_#>`[\]()!]/g, '').replace(/\s+/g, ' ').trim();

const FILLERS = [
  'a complete guide', 'the complete guide', 'complete guide', 'an ultimate guide',
  'the ultimate guide', 'ultimate guide', 'a comprehensive guide', 'comprehensive guide',
  'everything you need to know', 'what you need to know', 'explained', 'in the uk',
  'for beginners', 'a practical guide', 'your guide', 'our guide', 'guide',
];

const ANGLES = [
  'UK Guide', 'Practical Guide', 'Expert Guide', 'Simple Guide', 'Evidence-Based Guide',
  'What Works', 'Tips That Help', 'Step by Step', 'Key Facts', 'Your Options',
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function titleCase(s) {
  const small = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'vs', 'with']);
  return s.split(' ').map((w, i) => {
    if (i > 0 && small.has(w.toLowerCase())) return w.toLowerCase();
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join(' ');
}

const FILLER_ONLY = new RegExp(
  `^(${FILLERS.map((f) => f.replace(/\s/g, '\\s')).join('|')}|uk guide|uk comparison|what really works|benefits.*|tips.*)$`,
  'i',
);

function cleanPart(p) {
  let s = p
    .replace(/^(how to|why|what is|what are|when to|can you|does|do|is|are)\s+/i, '')
    .trim();
  for (const f of [...FILLERS, 'uk guide', 'uk comparison', 'uk evidence guide']) {
    const re = new RegExp(`\\s*[:–—,(\\-]?\\s*${f.replace(/\s/g, '\\s')}\\)?\\s*$`, 'i');
    s = s.replace(re, '');
  }
  return s.replace(/[.,;:!?]+$/, '').replace(/[(:–—-]\s*$/, '').trim();
}

const CONNECTOR_END = /\s+(with|for|and|or|the|a|an|of|to|in|on|vs|&|your|our)$/i;

/** Trim a phrase to max chars at a word boundary, never ending on a connector. */
function trimTo(phrase, max) {
  if (phrase.length <= max) return phrase;
  let words = phrase.split(' ');
  while (words.length > 2) {
    words = words.slice(0, -1);
    const cand = words.join(' ');
    if (cand.length <= max && !CONNECTOR_END.test(cand)) return cand;
  }
  return phrase.slice(0, max).replace(/\s+\S*$/, '');
}

/** Extract primary keyword phrase from the title. */
function keywordFrom(title) {
  const t = stripMd(title).replace(/\s*[|:–—-]\s*Living With Arthritis.*$/i, '');
  const parts = t.split(/\s*[|:–—]\s*|\s+-\s+/).map((p) => p.trim()).filter(Boolean);

  // Clean each part; drop pure-filler and empty fragments.
  let cleaned = parts
    .filter((p) => !FILLER_ONLY.test(p.trim()))
    .map(cleanPart)
    .filter((p) => p.length >= 3);
  if (!cleaned.length) cleaned = [cleanPart(t) || titleCase(t.split(' ').slice(0, 5).join(' '))];

  // Prefer the longest part that still leaves room for " | Angle" (10 chars),
  // skipping fragments that end mid-thought.
  const budget = MAX - 10;
  const viable = cleaned.filter((p) => p.length <= budget && !CONNECTOR_END.test(p));
  const kw = viable.length
    ? viable.reduce((a, b) => (b.length > a.length ? b : a))
    : trimTo(cleaned.reduce((a, b) => (b.length > a.length ? b : a), cleaned[0]), MAX);
  return titleCase(kw);
}

function build(title) {
  const kw = keywordFrom(title);
  const full = stripMd(title).replace(/\s*[|:–—-]\s*Living With Arthritis.*$/i, '');

  // Deterministic angle choice; skip angles that repeat the keyword's tail
  // (e.g. "Juvenile Arthritis UK | UK Guide").
  const ordered = [...ANGLES.slice(hash(full) % ANGLES.length), ...ANGLES.slice(0, hash(full) % ANGLES.length)];
  const usable = ordered.filter((a) => !kw.toLowerCase().endsWith(a.split(' ')[0].toLowerCase()) || !/uk/i.test(a));

  for (const angle of usable) {
    const candidate = `${kw} | ${angle}`;
    if (candidate.length <= MAX && candidate.length >= 25) return candidate;
  }
  // Keyword alone already fits within the cap.
  if (kw.length <= MAX) return kw;
  return trimTo(kw, MAX);
}

async function main() {
  const apply = process.argv.includes('--apply');

  const { data: articles, error } = await supabase
    .from('blog_articles')
    .select('slug,title,meta_title')
    .eq('is_published', true)
    .order('slug');
  if (error) throw error;

  // Long titles: base article title over 60 chars. The shortened version is
  // written to meta_title (the SEO title field); the visible title is untouched.
  const targets = articles.filter((a) => (a.title || '').length > MAX);

  console.log(`Published articles:        ${articles.length}`);
  console.log(`Titles over ${MAX} chars:        ${targets.length}\n`);

  if (targets.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  const updates = [];
  for (const a of targets) {
    const before = a.meta_title || a.title;
    const after = build(a.title);
    updates.push({ slug: a.slug, before, after });
  }

  // Preview table
  for (const u of updates) {
    console.log(`${u.slug}`);
    console.log(`  BEFORE (${u.before.length}): ${u.before}`);
    console.log(`  AFTER  (${u.after.length}): ${u.after}\n`);
  }

  const overMax = updates.filter((u) => u.after.length > MAX);
  if (overMax.length) {
    console.error(`ERROR: ${overMax.length} generated titles still exceed ${MAX} chars:`);
    for (const u of overMax) console.error(`  ${u.slug}: ${u.after}`);
    process.exit(1);
  }

  if (!apply) {
    console.log(`Dry run complete. ${updates.length} titles would be updated. Re-run with --apply to write changes.`);
    return;
  }

  let updated = 0;
  let failed = 0;
  for (const u of updates) {
    const { error: upErr } = await supabase
      .from('blog_articles')
      .update({ meta_title: u.after, updated_at: new Date().toISOString() })
      .eq('slug', u.slug);
    if (upErr) {
      failed++;
      console.error(`FAILED ${u.slug}: ${upErr.message}`);
    } else {
      updated++;
    }
  }
  console.log(`Applied: ${updated} updated, ${failed} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
