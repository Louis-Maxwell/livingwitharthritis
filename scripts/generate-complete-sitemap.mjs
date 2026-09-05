#!/usr/bin/env node
/**
 * Generate complete sitemap with ALL pages:
 * - Blog articles
 * - City support pages (CRITICAL - was missing!)
 * - Library topics
 * - Static pages
 */

import { createClient } from '@supabase/supabase-js';
import { writeFileSync } from 'node:fs';

// Load .env if needed
if (!process.env.VITE_SUPABASE_URL) {
  console.error('ERROR: VITE_SUPABASE_URL not set. Set in .env');
  process.exit(1);
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

async function generateCompleteSitemap() {
  console.log('🔍 Generating complete sitemap with ALL routes...\n');

  try {
    // 1. Static URLs (highest priority)
    const staticUrls = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/blog', priority: '0.9', changefreq: 'daily' },
      { url: '/library', priority: '0.9', changefreq: 'weekly' },
      { url: '/arthritis-support', priority: '0.9', changefreq: 'monthly' },
      { url: '/connect', priority: '0.7', changefreq: 'monthly' },
      { url: '/about', priority: '0.7', changefreq: 'yearly' },
    ];

    console.log(`✅ Static pages: ${staticUrls.length}`);

    // 2. Blog articles (medium priority)
    console.log('📝 Fetching blog articles...');
    const { data: articles, error: articlesError } = await supabase
      .from('blog_articles')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (articlesError) {
      console.error('❌ Error fetching articles:', articlesError);
      throw articlesError;
    }

    const blogUrls = articles.map(a => ({
      url: `/blog/${a.slug}`,
      lastmod: a.updated_at.split('T')[0],
      priority: '0.8',
      changefreq: 'monthly',
    }));

    console.log(`✅ Blog articles: ${blogUrls.length}`);

    // 3. City support pages (CRITICAL - was missing!)
    console.log('🏙️  Fetching city support pages...');
    const { data: cities, error: citiesError } = await supabase
      .from('city_support_pages')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (citiesError) {
      console.warn('⚠️  Could not fetch city pages:', citiesError.message);
      console.warn('    (This table may not exist yet - will continue)');
      var cityUrls = [];
    } else {
      var cityUrls = cities.map(c => ({
        url: `/arthritis-support/${c.slug}`,
        lastmod: c.updated_at.split('T')[0],
        priority: '0.8',
        changefreq: 'monthly',
      }));
      console.log(`✅ City pages: ${cityUrls.length}`);
    }

    // 4. Library topics (medium priority)
    console.log('📚 Fetching library topics...');
    const { data: topics, error: topicsError } = await supabase
      .from('library_topics')
      .select('slug, updated_at')
      .eq('is_published', true);

    if (topicsError) {
      console.warn('⚠️  Could not fetch library topics:', topicsError.message);
      var topicUrls = [];
    } else {
      var topicUrls = topics.map(t => ({
        url: `/library/${t.slug}`,
        lastmod: t.updated_at.split('T')[0],
        priority: '0.7',
        changefreq: 'weekly',
      }));
      console.log(`✅ Library topics: ${topicUrls.length}`);
    }

    // Combine all URLs
    const allUrls = [...staticUrls, ...blogUrls, ...cityUrls, ...topicUrls];

    // Generate XML sitemap
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    u => `  <url>
    <loc>https://livingwitharthritis.org.uk${u.url}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
  </url>`
  )
  .join('\n')}
</urlset>`;

    // Write to public directory
    writeFileSync('public/sitemap.xml', sitemapXml);

    console.log('\n✅ Sitemap generated successfully!\n');
    console.log('📊 Summary:');
    console.log(`   Total URLs: ${allUrls.length}`);
    console.log(`   - Static: ${staticUrls.length}`);
    console.log(`   - Blog: ${blogUrls.length}`);
    console.log(`   - Cities: ${cityUrls.length} 🔴 (CRITICAL - was 0!)`);
    console.log(`   - Library: ${topicUrls.length}`);
    console.log('\n📁 Output: public/sitemap.xml');
    console.log('\n🚀 Next: Submit to Google Search Console');
    console.log('   curl "https://www.google.com/ping?sitemap=https://livingwitharthritis.org.uk/sitemap.xml"');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateCompleteSitemap();
