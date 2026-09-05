#!/usr/bin/env node
/**
 * Fix long page titles for SEO
 * Formula: [Primary Keyword] | [Unique Angle] (55-60 characters)
 *
 * Usage:
 *   bun scripts/fix-long-page-titles.mjs       # dry run
 *   bun scripts/fix-long-page-titles.mjs --apply # update database
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';

// Load .env if needed
if (!process.env.VITE_SUPABASE_URL) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const MIN = 55;
const MAX = 60;
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

function stripMarkdown(text = '') {
  return String(text)
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_#>`[\]()!]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractKeywords(title, excerpt = '') {
  const t = stripMarkdown(title);

  // Remove common suffixes that take up space
  let cleaned = t
    .replace(/\s*[|:–—-]\s*(Guide|Tips?|Explained?|Everything|Complete|Full).*$/i, '')
    .replace(/\s*(Guide|Tips?|Explained?|Everything|Complete|Full)\s*$/i, '')
    .trim();

  // Extract primary keyword (first 2-3 words usually)
  const words = cleaned.split(/\s+/);
  const primary = words.slice(0, Math.min(3, words.length)).join(' ');

  // Extract unique angle from remainder or excerpt
  const remainder = words.slice(3).join(' ');
  let angle = remainder.slice(0, 40);

  if (!angle && excerpt) {
    const ex = stripMarkdown(excerpt).replace(/\.\s*$/, '');
    angle = ex.slice(0, 40);
  }

  if (!angle) {
    // Generate generic angle based on keyword patterns
    const patterns = {
      exercise: 'Best Techniques',
      pain: 'Pain Relief',
      fatigue: 'Energy Tips',
      diet: 'Dietary Guide',
      medication: 'Medication Facts',
      work: 'Work Rights',
      mental: 'Mental Health',
      sleep: 'Sleep Better',
      children: 'Kids Guide',
      relationships: 'Relationships',
    };

    for (const [keyword, suggestion] of Object.entries(patterns)) {
      if (primary.toLowerCase().includes(keyword)) {
        angle = suggestion;
        break;
      }
    }

    if (!angle) angle = 'Essential Guide';
  }

  return { primary, angle };
}

function buildTitle(title, excerpt) {
  const { primary, angle } = extractKeywords(title, excerpt);

  const candidates = [
    `${primary} | ${angle}`,
    `${primary}: ${angle}`,
    primary,
  ];

  for (const candidate of candidates) {
    if (candidate.length >= MIN && candidate.length <= MAX) {
      return candidate;
    }
  }

  // Force fit: trim angle until it fits
  let trimmedAngle = angle;
  while (trimmedAngle.length > 2 && (primary + ' | ' + trimmedAngle).length > MAX) {
    trimmedAngle = trimmedAngle.slice(0, -1).trim();
  }

  return `${primary} | ${trimmedAngle}`.slice(0, MAX);
}

const esc = (s) => `'${String(s).replace(/'/g, "''")}'`;

async function main() {
  const apply = process.argv.includes('--apply');

  const { data: articles, error } = await supabase
    .from('blog_articles')
    .select('id,slug,title,excerpt,seo_title')
    .eq('is_published', true)
    .filter('length(title)', 'gt', MAX);

  if (error) {
    console.error('Error fetching articles:', error);
    return;
  }

  if (!articles || articles.length === 0) {
    console.log('✅ No long titles found!');
    return;
  }

  console.log(`\n🔍 Found ${articles.length} articles with titles > ${MAX} characters:\n`);

  const updates = [];
  for (const article of articles) {
    const oldLen = article.title.length;
    const newTitle = buildTitle(article.title, article.excerpt);
    const newLen = newTitle.length;

    console.log(`  ${article.slug}`);
    console.log(`    OLD (${oldLen}): ${article.title.slice(0, 70)}${article.title.length > 70 ? '...' : ''}`);
    console.log(`    NEW (${newLen}): ${newTitle}`);
    console.log();

    updates.push(
      `UPDATE blog_articles SET seo_title = ${esc(newTitle)}, updated_at = now() WHERE id = ${esc(article.id)};`,
    );
  }

  writeFileSync(
    'scripts/fix-titles-update.sql',
    `-- Fix ${articles.length} long page titles for SEO\nBEGIN;\n${updates.join('\n')}\nCOMMIT;\n`,
  );

  console.log(`\n📊 Summary:`);
  console.log(`   Articles with long titles: ${articles.length}`);
  console.log(`   SQL written to: scripts/fix-titles-update.sql`);

  if (apply) {
    console.log(`\n⚙️  Applying updates...`);

    for (const article of articles) {
      const newTitle = buildTitle(article.title, article.excerpt);
      const { error: updateError } = await supabase
        .from('blog_articles')
        .update({ seo_title: newTitle, updated_at: new Date().toISOString() })
        .eq('id', article.id);

      if (updateError) {
        console.error(`  ❌ ${article.slug}:`, updateError.message);
      } else {
        console.log(`  ✅ ${article.slug}`);
      }
    }

    console.log(`\n✅ All ${articles.length} titles updated!`);
  } else {
    console.log(`\nRun with --apply to update the database.`);
  }
}

main().catch(console.error);
