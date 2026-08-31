#!/usr/bin/env bun
/**
 * Batch generate audio narrations for all published blog posts
 *
 * Usage: bun scripts/generate-all-blog-audio.ts
 *
 * Environment variables required:
 * - SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * - LOVABLE_API_KEY
 */

import blogSlugs from '../src/data/blog-slugs.generated.json';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !LOVABLE_API_KEY) {
  console.error('❌ Missing required environment variables:');
  if (!SUPABASE_URL) console.error('  - SUPABASE_URL');
  if (!SERVICE_ROLE_KEY) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  if (!LOVABLE_API_KEY) console.error('  - LOVABLE_API_KEY');
  process.exit(1);
}

const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/article-audio`;
const CONCURRENT_REQUESTS = 3; // Rate limit to avoid overwhelming the API
const DELAY_BETWEEN_BATCHES_MS = 2000; // 2 second delay between batches

interface GenerationResult {
  slug: string;
  status: 'success' | 'error' | 'rate_limited' | 'skipped';
  url?: string;
  duration?: number;
  cached?: boolean;
  error?: string;
}

async function generateAudioForSlug(slug: string): Promise<GenerationResult> {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return {
          slug,
          status: 'rate_limited',
          error: 'Rate limited by API',
        };
      }
      return {
        slug,
        status: 'error',
        error: data.message || `HTTP ${response.status}`,
      };
    }

    return {
      slug,
      status: 'success',
      url: data.url,
      duration: data.duration,
      cached: data.cached,
    };
  } catch (error) {
    return {
      slug,
      status: 'error',
      error: String(error),
    };
  }
}

async function processBatch(slugs: string[]): Promise<GenerationResult[]> {
  const results: GenerationResult[] = [];

  for (let i = 0; i < slugs.length; i += CONCURRENT_REQUESTS) {
    const batch = slugs.slice(i, i + CONCURRENT_REQUESTS);
    const batchResults = await Promise.all(batch.map(generateAudioForSlug));
    results.push(...batchResults);

    if (i + CONCURRENT_REQUESTS < slugs.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES_MS));
    }
  }

  return results;
}

async function main() {
  console.log(`\n🎙️  Starting blog audio generation for ${blogSlugs.length} articles...\n`);

  const startTime = Date.now();
  const results = await processBatch(blogSlugs);
  const duration = (Date.now() - startTime) / 1000;

  // Statistics
  const successful = results.filter(r => r.status === 'success');
  const cached = successful.filter(r => r.cached);
  const generated = successful.filter(r => !r.cached);
  const errors = results.filter(r => r.status === 'error');
  const rateLimited = results.filter(r => r.status === 'rate_limited');

  console.log('\n📊 Generation Complete!\n');
  console.log(`Total processed: ${results.length}`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`   └─ Generated new: ${generated.length}`);
  console.log(`   └─ Used cached: ${cached.length}`);
  console.log(`⚠️  Rate limited: ${rateLimited.length}`);
  console.log(`❌ Errors: ${errors.length}`);
  console.log(`⏱️  Time taken: ${duration.toFixed(2)} seconds\n`);

  if (errors.length > 0) {
    console.log('Errors:');
    errors.slice(0, 10).forEach(r => {
      console.log(`  - ${r.slug}: ${r.error}`);
    });
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more`);
    }
    console.log();
  }

  if (rateLimited.length > 0) {
    console.log(`⚠️  ${rateLimited.length} articles were rate limited.`);
    console.log('You can retry by running this script again.\n');
  }

  console.log(`✨ Audio generation summary:`);
  console.log(`   - New audio files generated: ${generated.length}`);
  console.log(`   - Total audio files available: ${successful.length}`);
  const totalDuration = successful.reduce((sum, r) => sum + (r.duration || 0), 0);
  const minutes = Math.round(totalDuration / 60);
  console.log(`   - Total audio content: ~${minutes} minutes\n`);

  // Exit with error code if there were failures
  if (errors.length > 0 || rateLimited.length > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
