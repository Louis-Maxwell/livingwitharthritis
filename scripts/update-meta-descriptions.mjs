#!/usr/bin/env node
/**
 * One-time SEO task: bulk-generate meta descriptions for published
 * blog_articles rows whose meta_description is NULL or empty.
 *
 * Formula: [Benefit] + [How/Proof] + [CTA]  ->  155-160 chars.
 *
 * Output: writes an SQL file (dist of UPDATE statements) you run once
 * against the database, and logs how many rows would be updated.
 *
 * Usage:
 *   node scripts/update-meta-descriptions.mjs            # dry run + SQL file
 *   node scripts/update-meta-descriptions.mjs --all      # regenerate for ALL rows
 *
 * If the meta_description_staging table already holds approved copy
 * (it does for the 2026 bulk pass), those exact strings are reused so
 * the script stays idempotent with what is live.
 */
import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_PUBLISHABLE_KEY,
} from '../src/integrations/supabase/publicDefaults.ts';

const MIN = 155;
const MAX = 160;
const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

const CTAS = [
  'Read our guide →',
  'Start here →',
  'See how →',
  'Learn more →',
  'Get the guide →',
];

function stripMd(text = '') {
  return String(text)
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_#>`[\]()!]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function lowerFirst(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function build(title, excerpt) {
  const t = stripMd(title).replace(/\s*[|:–—-]\s*Living With Arthritis.*$/i, '');
  const ex = stripMd(excerpt).replace(/\.\s*$/, '');
  const benefit = `Learn ${lowerFirst(t).replace(/^(how to|why|what|the)\s+/i, (m) => m.toLowerCase())}.`;
  const proof = ex
    ? `${ex.charAt(0).toUpperCase() + ex.slice(1)}.`
    : 'Evidence-based UK advice, reviewed for people living with arthritis.';
  const cta = CTAS[Math.abs(hash(t)) % CTAS.length];
  let out = `${benefit} ${proof} ${cta}`;
  // Trim proof until within range; fall back to shorter forms.
  const trimmings = [proof, 'Practical, evidence-based UK advice you can trust.', 'Trusted UK guidance for daily life with arthritis.'];
  for (const p of trimmings) {
    out = `${benefit} ${p} ${cta}`;
    if (out.length >= MIN && out.length <= MAX) return out;
    if (out.length < MIN) continue;
    // shorten proof by cutting at last full sentence/clause that fits
    let words = p.split(' ');
    while (words.length > 3) {
      words = words.slice(0, -1);
      const candidate = `${benefit} ${words.join(' ').replace(/[.,;:\s]+$/, '')}. ${cta}`;
      if (candidate.length >= MIN && candidate.length <= MAX) return candidate;
      if (candidate.length < MIN) break;
    }
  }
  return out.slice(0, MAX);
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

const esc = (s) => `'${String(s).replace(/'/g, "''")}'`;

async function main() {
  const all = process.argv.includes('--all');

  const { data: articles, error } = await supabase
    .from('blog_articles')
    .select('slug,title,excerpt,meta_description')
    .eq('is_published', true);
  if (error) throw error;

  let staging = new Map();
  const { data: staged } = await supabase
    .from('meta_description_staging')
    .select('slug,description');
  for (const row of staged ?? []) staging.set(row.slug, row.description);

  const targets = articles.filter(
    (a) => all || !a.meta_description || !a.meta_description.trim(),
  );

  let reused = 0;
  let generated = 0;
  const updates = [];
  for (const a of targets) {
    let desc = staging.get(a.slug);
    if (desc && desc.length >= MIN && desc.length <= MAX) {
      reused++;
    } else {
      desc = build(a.title, a.excerpt);
      generated++;
    }
    updates.push(
      `UPDATE blog_articles SET meta_description = ${esc(desc)}, updated_at = now() WHERE slug = ${esc(a.slug)};`,
    );
  }

  writeFileSync(
    'scripts/meta-descriptions-update.sql',
    `-- Bulk meta description update (${targets.length} rows)\nBEGIN;\n${updates.join('\n')}\nCOMMIT;\n`,
  );

  console.log(`Total published articles: ${articles.length}`);
  console.log(`Rows needing update:      ${targets.length}${all ? ' (--all forced)' : ''}`);
  console.log(`  reused from staging:    ${reused}`);
  console.log(`  generated fresh:        ${generated}`);
  console.log(`SQL written to scripts/meta-descriptions-update.sql`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
