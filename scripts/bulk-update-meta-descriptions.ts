/**
 * Bulk update meta descriptions for all blog articles
 * Formula: [Benefit] + [How/Proof] + [CTA] (155-160 characters)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  meta_description?: string;
  excerpt?: string;
  content?: string;
}

// Meta description templates by keyword pattern
const metaTemplates: Record<string, string> = {
  exercise: '[Benefit: Manage pain & improve mobility] with arthritis-safe exercises. [Proof: Expert-backed, low-impact] strategies. [CTA: Learn our guide →]',
  pain: '[Benefit: Reduce joint pain effectively] using proven techniques. [Proof: Recommended by rheumatologists] for long-term relief. [CTA: Discover methods →]',
  fatigue: '[Benefit: Combat arthritis fatigue] and boost your energy. [Proof: Science-backed pacing strategies] that work. [CTA: Start here →]',
  diet: '[Benefit: Reduce inflammation with food] choices that matter. [Proof: Research-supported] anti-inflammatory diet. [CTA: Read our guide →]',
  medication: '[Benefit: Understand your arthritis drugs] and side effects. [Proof: Medical expert explanations] for safety. [CTA: Learn more →]',
  work: '[Benefit: Know your rights at work] with arthritis. [Proof: UK legal protections & accommodations] explained. [CTA: Get guidance →]',
  mental: '[Benefit: Support your mental health] through arthritis. [Proof: Professional strategies] for coping. [CTA: Find help →]',
  relationships: '[Benefit: Maintain intimacy and closeness] with arthritis. [Proof: Practical, proven approaches] for couples. [CTA: Read more →]',
  children: '[Benefit: Support kids with arthritis] effectively. [Proof: Expert parenting & medical guidance] combined. [CTA: Learn strategies →]',
  sleep: '[Benefit: Sleep better despite arthritis] pain. [Proof: Tested pain management techniques] for rest. [CTA: Improve sleep →]',
};

function generateMetaDescription(article: BlogArticle): string {
  const title = article.title.toLowerCase();
  const excerpt = (article.excerpt || '').toLowerCase();

  // Find matching template keyword
  for (const [keyword, template] of Object.entries(metaTemplates)) {
    if (title.includes(keyword) || excerpt.includes(keyword)) {
      return truncateToLength(template.replace(/\[.+?\]/g, ''), 155, 160);
    }
  }

  // Fallback: generic template
  const benefit = `Learn about ${article.title.toLowerCase()}`;
  const proof = 'Evidence-based information for arthritis support.';
  const cta = 'Read our guide →';
  const combined = `${benefit}. ${proof} ${cta}`;
  return truncateToLength(combined, 155, 160);
}

function truncateToLength(text: string, min: number, max: number): string {
  text = text.replace(/\[.+?\]/g, '').trim();

  if (text.length <= max) {
    return text;
  }

  let truncated = text.substring(0, max);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > min) {
    truncated = truncated.substring(0, lastSpace);
  }

  if (!truncated.endsWith('.') && !truncated.endsWith('→')) {
    truncated = truncated.trimEnd() + '.';
  }

  return truncated.substring(0, max);
}

async function bulkUpdateMetaDescriptions() {
  console.log('🔄 Fetching all blog articles...');

  // Fetch all articles
  const { data: articles, error: fetchError } = await supabase
    .from('blog_articles')
    .select('id, slug, title, meta_description, excerpt, content')
    .order('created_at', { ascending: false });

  if (fetchError) {
    console.error('❌ Error fetching articles:', fetchError);
    return;
  }

  if (!articles || articles.length === 0) {
    console.log('⚠️  No articles found');
    return;
  }

  console.log(`📝 Found ${articles.length} articles`);

  // Generate new meta descriptions
  const updates = articles
    .filter(a => !a.meta_description || a.meta_description.length < 50)
    .map(article => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      meta_description: generateMetaDescription(article as BlogArticle),
    }));

  console.log(`✏️  Updating ${updates.length} articles with new meta descriptions...`);

  // Batch update in chunks of 10
  const chunkSize = 10;
  for (let i = 0; i < updates.length; i += chunkSize) {
    const chunk = updates.slice(i, i + chunkSize);

    for (const update of chunk) {
      const { error } = await supabase
        .from('blog_articles')
        .update({ meta_description: update.meta_description })
        .eq('id', update.id);

      if (error) {
        console.error(`❌ Error updating ${update.slug}:`, error);
      } else {
        console.log(`✅ ${update.slug}`);
      }
    }

    console.log(`  Progress: ${Math.min(i + chunkSize, updates.length)}/${updates.length}`);
  }

  // Verify
  const { data: updated } = await supabase
    .from('blog_articles')
    .select('id, meta_description')
    .not('meta_description', 'is', null);

  console.log(`\n✅ Completed!`);
  console.log(`📊 Total articles with meta descriptions: ${updated?.length || 0}/${articles.length}`);
}

bulkUpdateMetaDescriptions().catch(console.error);
