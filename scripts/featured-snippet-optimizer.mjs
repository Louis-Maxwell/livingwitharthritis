#!/usr/bin/env node
/**
 * Featured Snippet Optimization
 * Analyze top 20 articles and generate snippet optimization recommendations
 * Output: JSON audit with answer boxes, FAQ optimization, heading structure
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

// Generate answer boxes based on title/query intent
function generateAnswerBox(title, excerpt) {
  const titleLower = title.toLowerCase();

  // Common query intents and answer templates
  const templates = {
    what: {
      pattern: /^what (is|are)/i,
      template: (term) => `**Quick Answer:** ${term} is a common condition affecting millions of people. It causes joint pain, stiffness, and swelling—manageable with proper treatment, lifestyle changes, and support.`,
    },
    why: {
      pattern: /^why (do|does)/i,
      template: (term) => `**Quick Answer:** ${term} happens due to inflammation and joint wear. Early intervention with medication, exercise, and lifestyle adjustments can significantly slow progression and improve quality of life.`,
    },
    how: {
      pattern: /^how (to|can)/i,
      template: (term) => `**Quick Answer:** Managing ${term} involves combining medical treatment, regular exercise, dietary changes, and stress management. Most people see improvement within 4-8 weeks of consistent effort.`,
    },
    best: {
      pattern: /^(best|top|most effective)/i,
      template: (term) => `**Quick Answer:** The most effective ${term} combine evidence-based medical approaches with lifestyle modifications. Results vary by person, so working with your healthcare team is essential.`,
    },
  };

  let answerBox = null;

  for (const [type, { pattern, template }] of Object.entries(templates)) {
    if (pattern.test(title)) {
      const term = title.replace(pattern, '').replace(/[?!.]/, '').trim();
      answerBox = template(term).substring(0, 160);
      break;
    }
  }

  if (!answerBox) {
    const mainTopic = title.split(/[|:–—]/)[0].trim();
    answerBox =
      `**Quick Answer:** ${mainTopic} is a health topic affecting many people. Effective management typically combines medical treatment, exercise, nutrition, and emotional support.`.substring(
        0,
        160,
      );
  }

  return answerBox;
}

// Rate FAQ quality for snippet eligibility
function rateFAQQuality(content) {
  if (!content) return 'no-faq';

  const hasFAQSection = /##\s*(FAQ|Frequently|Questions)/i.test(content);
  const faqQuestions = (content.match(/^###\s+[^#]*\?/gm) || []).length;
  const avgAnswerLength = content
    .split(/^###\s+[^#]*\?/gm)
    .slice(1)
    .map(s => s.replace(/^###\s+/, '').length)
    .reduce((a, b) => a + b, 0) / Math.max(faqQuestions, 1);

  if (faqQuestions >= 5 && avgAnswerLength > 80) return 'good';
  if (faqQuestions >= 3 && avgAnswerLength > 50) return 'fair';
  return 'needs-work';
}

// Check heading structure quality
function checkHeadingStructure(content) {
  if (!content) return { h2_count: 0, h3_count: 0, structure_score: 0 };

  const h2Count = (content.match(/^##\s+/gm) || []).length;
  const h3Count = (content.match(/^###\s+/gm) || []).length;

  // Good structure: 3-8 H2s, balanced H3s under each
  let score = 50;
  if (h2Count >= 3 && h2Count <= 8) score += 20;
  if (h3Count > 0 && h3Count / h2Count >= 1.5) score += 30;

  return { h2_count: h2Count, h3_count: h3Count, structure_score: Math.min(100, score) };
}

async function main() {
  console.log('📊 Fetching top 20 ranking articles...');

  // Get all published articles sorted by likely ranking potential (created recently, popular keywords)
  const { data: articles, error } = await supabase
    .from('blog_articles')
    .select('slug,title,excerpt,content,meta_description,created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (!articles || articles.length === 0) {
    console.log('No articles found');
    return;
  }

  console.log(`Found ${articles.length} articles. Analyzing for snippet opportunities...\n`);

  const audit = articles.map((article, i) => {
    const answerBox = generateAnswerBox(article.title, article.excerpt);
    const faqQuality = rateFAQQuality(article.content);
    const headingStructure = checkHeadingStructure(article.content);

    // Determine main query from title
    const mainQuery = article.title.split(/[|:–—]/)[0].trim();

    return {
      rank: i + 1,
      slug: article.slug,
      title: article.title,
      main_query: mainQuery,
      meta_description: article.meta_description,
      answer_box: answerBox,
      answer_box_length: answerBox.length,
      current_faq_quality: faqQuality,
      heading_structure: headingStructure,
      snippet_readiness: ['good', 'fair'].includes(faqQuality) && headingStructure.structure_score >= 70 ? 'ready' : 'needs-work',
      recommendations: [
        `Add answer box after intro: "${answerBox.substring(0, 80)}..."`,
        faqQuality === 'needs-work' ? 'Expand FAQ section with 5+ Q&A pairs' : 'FAQ structure is good',
        headingStructure.structure_score < 70 ? 'Improve heading hierarchy (3-8 H2s recommended)' : 'Heading structure is optimal',
        'Use bulleted key takeaways section at end (snippet trigger)',
        'Keep FAQ answers between 50-100 words (snippet sweet spot)',
      ],
    };
  });

  // Write JSON audit
  writeFileSync('scripts/featured-snippet-audit.json', JSON.stringify(audit, null, 2));

  // Summary statistics
  const readyCount = audit.filter(a => a.snippet_readiness === 'ready').length;
  const needsWorkCount = audit.filter(a => a.snippet_readiness === 'needs-work').length;

  console.log('✅ Analysis complete!\n');
  console.log('📊 Summary:');
  console.log(`   Ready for snippets: ${readyCount}/${audit.length}`);
  console.log(`   Needs optimization: ${needsWorkCount}/${audit.length}`);
  console.log(`\n📄 Output: scripts/featured-snippet-audit.json`);

  console.log('\n🎯 Top 5 snippet opportunities:\n');
  audit.slice(0, 5).forEach((a) => {
    console.log(`${a.rank}. ${a.slug}`);
    console.log(`   Status: ${a.snippet_readiness}`);
    console.log(`   Query: "${a.main_query}"`);
    console.log(`   Answer: "${a.answer_box.substring(0, 80)}..."`);
    console.log();
  });
}

main().catch(console.error);
