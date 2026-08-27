#!/usr/bin/env node
/**
 * Import 10,000 keywords into Supabase tracked_keywords table
 * Usage: node scripts/import-keywords.js
 *
 * Prerequisites:
 * - Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * - keywords_for_import.csv must exist in project root
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import csv from 'csv-parser';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importKeywords() {
  try {
    console.log('📋 Starting keyword import...');

    const csvPath = path.join(process.cwd(), 'keywords_for_import.csv');

    if (!fs.existsSync(csvPath)) {
      console.error(`❌ Error: ${csvPath} not found`);
      process.exit(1);
    }

    const keywords = [];
    let count = 0;

    // Read and parse CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvPath)
        .pipe(csv())
        .on('data', (row) => {
          keywords.push({
            keyword: row.keyword,
            target_url: row.target_url,
            market: row.market || 'uk',
            is_active: row.is_active === 'true'
          });
          count++;

          // Log progress every 1000 rows
          if (count % 1000 === 0) {
            console.log(`  ✓ Read ${count} keywords...`);
          }
        })
        .on('error', reject)
        .on('end', resolve);
    });

    console.log(`\n✓ Parsed ${keywords.length} keywords from CSV`);

    // Insert in batches to avoid rate limiting
    const batchSize = 500;
    let inserted = 0;
    let skipped = 0;

    for (let i = 0; i < keywords.length; i += batchSize) {
      const batch = keywords.slice(i, i + batchSize);

      const { data, error } = await supabase
        .from('tracked_keywords')
        .insert(batch, { onConflict: 'keyword,market' });

      if (error) {
        console.error(`❌ Error inserting batch at ${i}:`, error);
        // Continue with next batch instead of failing completely
      } else {
        inserted += batch.length;
        console.log(`  ✓ Inserted batch ${Math.floor(i / batchSize) + 1} (${inserted}/${keywords.length})`);
      }
    }

    // Verify insert count
    const { count: dbCount, error: countError } = await supabase
      .from('tracked_keywords')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error checking database count:', countError);
    } else {
      console.log(`\n✅ Success! Database now contains ${dbCount} tracked keywords`);
    }

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importKeywords();
