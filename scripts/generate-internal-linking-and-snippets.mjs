/**
 * One-off SEO analysis script.
 *
 * Reads published blog_articles (read-only) and produces:
 *   1. scripts/internal-linking-recommendations.csv  (top 50 orphan -> pillar links)
 *   2. scripts/featured-snippet-audit.json           (top 20 articles, snippet readiness)
 *
 * No database writes are performed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const THREE_MONTHS_MS = 1000 * 60 * 60 * 24 * 90;

/** Topic buckets used to score relevance between an orphan and a pillar. */
const TOPIC_RULES = [
  { topic: 'exercise', terms: ['exercise', 'exercises', 'yoga', 'pilates', 'swimming', 'cycling', 'walking', 'strength', 'stretch', 'physiotherapy', 'hydrotherapy', 'tai chi', 'movement', 'active'] },
  { topic: 'diet', terms: ['diet', 'food', 'foods', 'nutrition', 'eating', 'anti-inflammatory', 'mediterranean', 'weight', 'recipe', 'smoothie'] },
  { topic: 'supplements', terms: ['supplement', 'supplements', 'turmeric', 'curcumin', 'omega', 'fish oil', 'glucosamine', 'collagen', 'vitamin', 'ginger', 'magnesium'] },
  { topic: 'treatment', terms: ['treatment', 'medication', 'drugs', 'nsaid', 'steroid', 'injection', 'surgery', 'replacement', 'dmard', 'methotrexate', 'biologic', 'tens', 'gp', 'diagnosis', 'diagnosed'] },
  { topic: 'pain', terms: ['pain', 'flare', 'flare-up', 'relief', 'stiffness', 'swelling'] },
  { topic: 'sleep', terms: ['sleep', 'fatigue', 'tired', 'rest', 'insomnia'] },
  { topic: 'mental-health', terms: ['mental health', 'mindfulness', 'meditation', 'anxiety', 'depression', 'mood', 'stress', 'relationships', 'wellbeing'] },
  { topic: 'work', terms: ['work', 'employment', 'employer', 'job', 'workplace', 'benefits', 'pip', 'rights'] },
  { topic: 'daily-living', terms: ['daily', 'living', 'home', 'aids', 'gadgets', 'driving', 'travel', 'shopping', 'cooking', 'mobility', 'independence'] },
  { topic: 'hands', terms: ['hand', 'hands', 'finger', 'thumb', 'wrist', 'grip'] },
  { topic: 'knee', terms: ['knee', 'knees'] },
  { topic: 'hip', terms: ['hip', 'hips'] },
  { topic: 'foot', terms: ['foot', 'feet', 'ankle', 'toe', 'shoes', 'footwear'] },
  { topic: 'shoulder', terms: ['shoulder', 'neck', 'elbow'] },
  { topic: 'back', terms: ['back', 'spine', 'spinal', 'lower back'] },
  { topic: 'osteoarthritis', terms: ['osteoarthritis', 'wear and tear', 'cartilage'] },
  { topic: 'rheumatoid', terms: ['rheumatoid', 'inflammatory arthritis', 'autoimmune', 'psoriatic', 'ankylosing', 'lupus'] },
  { topic: 'gout', terms: ['gout', 'uric acid', 'purine'] },
  { topic: 'weather', terms: ['weather', 'winter', 'cold', 'damp', 'seasonal', 'summer'] },
  { topic: 'older-adults', terms: ['older adults', 'ageing', 'aging', 'longevity', 'seniors', 'over 60', 'frailty'] },
];

const ANCHOR_PREFIXES = [
  (t) => `read our guide to ${t.toLowerCase()}`,
  (t) => `more on ${t.toLowerCase()}`,
  (t) => `${t.toLowerCase()}`,
  (t) => `how ${t.toLowerCase()} can help`,
  (t) => `practical advice on ${t.toLowerCase()}`,
];

const stripHtml = (html = '') =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const wordCount = (html) => stripHtml(html).split(' ').filter(Boolean).length;

const topicsFor = (article) => {
  const haystack = `${article.title} ${article.slug} ${article.excerpt || ''} ${article.category || ''}`.toLowerCase();
  const found = new Set();
  for (const rule of TOPIC_RULES) {
    if (rule.terms.some((term) => haystack.includes(term))) found.add(rule.topic);
  }
  return found;
};

const linkedSlugsIn = (content = '', allSlugs) => {
  const linked = new Set();
  for (const slug of allSlugs) {
    if (content.includes(`/blog/${slug}`)) linked.add(slug);
  }
  return linked;
};

const shortTopic = (title) =>
  title
    .split(/[:|–—-]/)[0]
    .replace(/^(the|a|an)\s+/i, '')
    .replace(/\s+UK$/i, '')
    .trim();

const csvCell = (value) => `"${String(value).replace(/"/g, '""')}"`;

async function fetchArticles() {
  const rows = [];
  const pageSize = 200;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from('blog_articles')
      .select('slug,title,excerpt,category,content,created_at,updated_at')
      .eq('is_published', true)
      .order('created_at', { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    rows.push(...(data || []));
    if (!data || data.length < pageSize) break;
  }
  return rows;
}

function buildLinkGraph(articles) {
  const allSlugs = articles.map((a) => a.slug);
  const outbound = new Map();
  const inbound = new Map(allSlugs.map((s) => [s, new Set()]));
  for (const article of articles) {
    const links = linkedSlugsIn(article.content || '', allSlugs);
    links.delete(article.slug);
    outbound.set(article.slug, links);
    for (const target of links) inbound.get(target).add(article.slug);
  }
  return { inbound, outbound };
}

function pillarScore(article, inboundCount, outboundCount, words) {
  // Pillars: substantial, well-connected, hub-style articles.
  const hubBonus = /(hub|guide|complete|everything|ultimate)/i.test(article.title) ? 25 : 0;
  return words / 40 + inboundCount * 12 + outboundCount * 3 + hubBonus;
}

function relevance(orphanTopics, pillarTopics) {
  let score = 0;
  for (const topic of orphanTopics) if (pillarTopics.has(topic)) score += 1;
  return score;
}

function rationaleFor(shared, orphan, pillar) {
  if (shared.length) {
    return `Both cover ${shared.join(' and ').replace(/-/g, ' ')}; readers of "${shortTopic(pillar.title)}" are the natural audience for this page.`;
  }
  return `"${shortTopic(pillar.title)}" is a high-authority hub in the same arthritis topic cluster and can pass authority to this page.`;
}

async function main() {
  const articles = await fetchArticles();
  const { inbound, outbound } = buildLinkGraph(articles);
  const now = Date.now();

  const enriched = articles.map((a) => {
    const words = wordCount(a.content || '');
    const inboundCount = inbound.get(a.slug).size;
    const outboundCount = outbound.get(a.slug).size;
    return {
      ...a,
      words,
      inboundCount,
      outboundCount,
      topics: topicsFor(a),
      ageDays: Math.round((now - new Date(a.created_at).getTime()) / 86400000),
      pillar: pillarScore(a, inboundCount, outboundCount, words),
    };
  });

  const bySlug = new Map(enriched.map((a) => [a.slug, a]));

  /* ---------- TASK 1: orphan -> pillar recommendations ---------- */
  const orphans = enriched
    .filter((a) => a.inboundCount === 0 && now - new Date(a.created_at).getTime() > THREE_MONTHS_MS)
    .sort((a, b) => b.words - a.words);

  const pillars = [...enriched].sort((a, b) => b.pillar - a.pillar).slice(0, 60);

  const rows = [];
  const perPillarUsage = new Map();
  for (const orphan of orphans) {
    const candidates = pillars
      .filter((p) => p.slug !== orphan.slug && !outbound.get(p.slug).has(orphan.slug))
      .map((p) => {
        const shared = [...orphan.topics].filter((t) => p.topics.has(t));
        const used = perPillarUsage.get(p.slug) || 0;
        return { pillar: p, shared, score: relevance(orphan.topics, p.topics) * 100 + p.pillar - used * 30 };
      })
      .filter((c) => c.shared.length > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    candidates.forEach((c, index) => {
      perPillarUsage.set(c.pillar.slug, (perPillarUsage.get(c.pillar.slug) || 0) + 1);
      rows.push({
        orphan_slug: orphan.slug,
        target_article_slug: c.pillar.slug,
        recommended_anchor_text: ANCHOR_PREFIXES[index % ANCHOR_PREFIXES.length](shortTopic(orphan.title)),
        rationale: rationaleFor(c.shared, orphan, c.pillar),
      });
    });
  }

  const top50 = rows.slice(0, 50);
  const csv = [
    'orphan_slug,target_article_slug,recommended_anchor_text,rationale',
    ...top50.map((r) =>
      [r.orphan_slug, r.target_article_slug, r.recommended_anchor_text, r.rationale].map(csvCell).join(','),
    ),
  ].join('\n');
  fs.writeFileSync(path.join('scripts', 'internal-linking-recommendations.csv'), `${csv}\n`, 'utf8');

  /* ---------- TASK 2: featured snippet audit ---------- */
  // Traffic data is not stored in the database, so ranking potential is proxied by
  // inbound internal links, depth of content and topic breadth.
  const top20 = [...enriched]
    .sort((a, b) => b.inboundCount * 15 + b.words / 50 - (a.inboundCount * 15 + a.words / 50))
    .slice(0, 20);

  const audit = top20.map((a) => {
    const text = stripHtml(a.content || '');
    const h2Count = (a.content || '').match(/<h2/gi)?.length || 0;
    const h3Count = (a.content || '').match(/<h3/gi)?.length || 0;
    const hasFaq = /frequently asked|<h2[^>]*>\s*(what|how|why|can|is|are|does|do|when|should)/i.test(a.content || '');
    const hasQuickAnswer = /quick answer/i.test(a.content || '');
    const hasTakeaways = /key takeaways|key points/i.test(a.content || '');
    const topic = shortTopic(a.title);

    const answerBox = `${topic}: what helps, what to avoid.`.slice(0, 60);

    const changes = [];
    if (!hasQuickAnswer) changes.push('Add a bold "Quick Answer" paragraph directly after the introduction.');
    if (!hasFaq) changes.push('Add an FAQ block with 4-6 question-style H2s and 50-100 word answers.');
    else changes.push('Tighten existing FAQ answers to 50-100 words and keep each question as a clear H2.');
    if (h2Count < 4) changes.push(`Increase section structure: only ${h2Count} H2 headings found.`);
    if (h3Count === 0 && h2Count >= 4) changes.push('Add H3 subheadings under long H2 sections to improve list-snippet eligibility.');
    if (!hasTakeaways) changes.push('Add a "Key takeaways" bulleted list at the end (4-6 bullets, one line each).');

    return {
      article_slug: a.slug,
      main_query: `${topic.toLowerCase()} uk`,
      answer_box_text: answerBox,
      current_faq_quality: hasFaq && h2Count >= 4 ? 'good' : 'needs-work',
      recommended_changes: changes,
      metrics: {
        word_count: a.words,
        h2_count: h2Count,
        h3_count: h3Count,
        inbound_internal_links: a.inboundCount,
        has_quick_answer: hasQuickAnswer,
        has_key_takeaways: hasTakeaways,
      },
      first_sentence: text.split(/(?<=\.)\s/)[0]?.slice(0, 200) || '',
    };
  });

  fs.writeFileSync(
    path.join('scripts', 'featured-snippet-audit.json'),
    `${JSON.stringify({ generated_at: new Date().toISOString(), ranking_proxy: 'inbound internal links + content depth (no analytics data in database)', articles: audit }, null, 2)}\n`,
    'utf8',
  );

  console.log(`Published articles: ${articles.length}`);
  console.log(`Orphan pages (0 inbound internal links, older than 90 days): ${orphans.length}`);
  console.log(`Linking recommendations generated: ${rows.length} (top 50 written to CSV)`);
  console.log(`Featured snippet audit entries: ${audit.length}`);
  console.log(`Needs-work FAQ sections: ${audit.filter((a) => a.current_faq_quality === 'needs-work').length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
