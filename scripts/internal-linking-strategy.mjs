#!/usr/bin/env node
/**
 * Internal Linking Strategy
 * Identify orphan pages and generate linking recommendations
 * Output: CSV with orphan_slug, target_pillar, anchor_text, rationale
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';

if (!process.env.VITE_SUPABASE_URL) {
  for (const line of readFileSync('.env', 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

const PILLAR_KEYWORDS = {
  exercise: ['exercise', 'workout', 'movement', 'physical', 'activity'],
  pain: ['pain', 'ache', 'hurt', 'relief', 'discomfort'],
  diet: ['diet', 'food', 'nutrition', 'eat', 'meal'],
  medication: ['medication', 'drug', 'treatment', 'therapy', 'medicine'],
  fatigue: ['fatigue', 'tired', 'energy', 'exhaustion', 'tiredness'],
  work: ['work', 'job', 'employment', 'workplace', 'career'],
  mental: ['anxiety', 'depression', 'mental', 'mood', 'stress', 'emotion'],
  relationships: ['relationship', 'partner', 'intimacy', 'sex', 'family'],
  sleep: ['sleep', 'rest', 'bed', 'insomnia', 'night'],
  mobility: ['mobility', 'movement', 'joint', 'flexibility', 'range'],
};

const ANCHOR_TEXT_TEMPLATES = {
  exercise: ['arthritis exercises', 'low-impact workouts', 'joint-friendly movement'],
  pain: ['pain management', 'relief strategies', 'pain relief techniques'],
  diet: ['anti-inflammatory diet', 'nutritional support', 'food choices'],
  medication: ['medication guide', 'treatment options', 'drug information'],
  fatigue: ['fatigue management', 'energy strategies', 'pacing techniques'],
  work: ['workplace rights', 'work accommodations', 'employment support'],
  mental: ['mental health support', 'anxiety management', 'emotional wellness'],
  relationships: ['relationship support', 'intimacy advice', 'partner communication'],
  sleep: ['sleep optimization', 'rest strategies', 'sleep techniques'],
  mobility: ['mobility improvement', 'joint flexibility', 'movement techniques'],
};

function findRelevantPillars(title, excerpt) {
  const text = (title + ' ' + (excerpt || '')).toLowerCase();
  const matches = {};

  for (const [pillar, keywords] of Object.entries(PILLAR_KEYWORDS)) {
    const count = keywords.filter(k => text.includes(k)).length;
    if (count > 0) matches[pillar] = count;
  }

  return Object.entries(matches)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pillar]) => pillar);
}

function getAnchorText(pillar) {
  const options = ANCHOR_TEXT_TEMPLATES[pillar] || ['learn more'];
  return options[Math.floor(Math.random() * options.length)];
}

async function main() {
  console.log('🔍 Fetching all published articles...');

  const { data: allArticles, error } = await supabase
    .from('blog_articles')
    .select('id,slug,title,excerpt,created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Identify orphan pages (created > 3 months ago)
  const orphans = allArticles.filter(a => new Date(a.created_at) < threeMonthsAgo);

  console.log(`📊 Total articles: ${allArticles.length}`);
  console.log(`🏜️  Potential orphans (>3 months old): ${orphans.length}`);

  const recommendations = [];

  // For each orphan, find pillar pages to link from
  for (const orphan of orphans.slice(0, 50)) {
    const pillars = findRelevantPillars(orphan.title, orphan.excerpt);

    if (pillars.length === 0) {
      // Assign to generic pillar based on first word
      pillars.push('exercise');
    }

    for (const pillar of pillars.slice(0, 3)) {
      // Find articles matching this pillar
      const pillarArticles = allArticles.filter(a => {
        const text = (a.title + ' ' + (a.excerpt || '')).toLowerCase();
        return PILLAR_KEYWORDS[pillar].some(k => text.includes(k)) && a.slug !== orphan.slug;
      });

      if (pillarArticles.length > 0) {
        const target = pillarArticles[0];
        recommendations.push({
          orphan_slug: orphan.slug,
          orphan_title: orphan.title,
          target_slug: target.slug,
          target_title: target.title,
          anchor_text: getAnchorText(pillar),
          pillar_category: pillar,
          rationale: `${orphan.title.slice(0, 40)} relates to ${pillar}; link from ${target.title.slice(0, 40)}`,
        });
      }
    }
  }

  // Write CSV
  const csv = [
    'orphan_slug,orphan_title,target_slug,target_title,anchor_text,pillar_category,rationale',
    ...recommendations.map(r =>
      [
        r.orphan_slug,
        `"${r.orphan_title.replace(/"/g, '""')}"`,
        r.target_slug,
        `"${r.target_title.replace(/"/g, '""')}"`,
        `"${r.anchor_text}"`,
        r.pillar_category,
        `"${r.rationale}"`,
      ].join(','),
    ),
  ].join('\n');

  writeFileSync('scripts/internal-linking-recommendations.csv', csv);

  console.log(`\n✅ Generated ${recommendations.length} linking recommendations`);
  console.log(`📄 Output: scripts/internal-linking-recommendations.csv`);
  console.log(`\n🎯 Top 10 recommendations (preview):`);

  recommendations.slice(0, 10).forEach((r, i) => {
    console.log(`\n${i + 1}. ${r.orphan_slug} → ${r.target_slug}`);
    console.log(`   Anchor: "${r.anchor_text}"`);
    console.log(`   Why: ${r.rationale}`);
  });
}

main().catch(console.error);
