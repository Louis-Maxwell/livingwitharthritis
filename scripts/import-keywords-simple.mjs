#!/usr/bin/env node
/**
 * Simple keyword importer using CSV parsing without external dependencies
 * Usage: node scripts/import-keywords-simple.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple CSV parser (no dependencies)
function parseCSV(content) {
  const lines = content.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',').map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/^"(.*)"$/, '$1'));
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i];
    });
    return obj;
  });
}

async function importKeywords() {
  try {
    console.log('📋 Starting keyword import...\n');

    const csvPath = path.join(path.dirname(__dirname), 'keywords_for_import.csv');

    if (!fs.existsSync(csvPath)) {
      console.error(`❌ Error: ${csvPath} not found`);
      process.exit(1);
    }

    // Read CSV
    const content = fs.readFileSync(csvPath, 'utf-8');
    const keywords = parseCSV(content);

    console.log(`✓ Parsed ${keywords.length} keywords from CSV\n`);
    console.log('Sample keywords:');
    keywords.slice(0, 5).forEach(kw => {
      console.log(`  - "${kw.keyword}" → ${kw.target_url} (${kw.market})`);
    });

    // Validate environment
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('\n❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
      console.log('\nTo set environment variables:');
      console.log('  1. Get SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from Supabase dashboard');
      console.log('  2. Add to .env.local:');
      console.log('     SUPABASE_URL=https://your-project.supabase.co');
      console.log('     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here');
      process.exit(1);
    }

    console.log('\n✅ Environment variables found');
    console.log(`   URL: ${supabaseUrl.split('//')[1]}`);
    console.log(`   Key: ${supabaseKey.substring(0, 10)}...`);

    // Import via API (requires Bearer token)
    console.log('\n📤 Importing keywords to Supabase...');
    console.log(`   Total: ${keywords.length} keywords`);
    console.log(`   Batch size: 1000 keywords per request`);

    let inserted = 0;
    let skipped = 0;
    const batchSize = 1000;

    for (let i = 0; i < keywords.length; i += batchSize) {
      const batch = keywords.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(keywords.length / batchSize);

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/tracked_keywords`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'resolution=ignore-duplicates'
          },
          body: JSON.stringify(batch.map(kw => ({
            keyword: kw.keyword,
            target_url: kw.target_url,
            market: kw.market || 'uk',
            is_active: kw.is_active === 'true'
          })))
        });

        if (response.ok) {
          inserted += batch.length;
          console.log(`   ✓ Batch ${batchNum}/${totalBatches} complete (${inserted} total)`);
        } else {
          const error = await response.text();
          console.error(`   ❌ Batch ${batchNum} failed:`, error);
          skipped += batch.length;
        }
      } catch (error) {
        console.error(`   ❌ Error in batch ${batchNum}:`, error.message);
        skipped += batch.length;
      }
    }

    console.log(`\n✅ Import complete!`);
    console.log(`   Inserted: ${inserted} keywords`);
    console.log(`   Skipped (conflicts): ${skipped} keywords`);
    console.log(`\n📊 Next steps:`);
    console.log(`   1. Verify in Supabase: SELECT COUNT(*) FROM tracked_keywords`);
    console.log(`   2. Set up rank tracking in .env.local: SEMRUSH_API_KEY=...`);
    console.log(`   3. Monitor rankings at: /admin/rank-tracker`);

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importKeywords();
