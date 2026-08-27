#!/usr/bin/env node
/**
 * Import 10,000 keywords into Supabase tracked_keywords table
 * Usage: npx ts-node scripts/import-keywords.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { createClient } from '@supabase/supabase-js';

interface KeywordRow {
  keyword: string;
  target_url: string;
  market: string;
  is_active: string;
}

interface TrackedKeyword {
  keyword: string;
  target_url: string;
  market: string;
  is_active: boolean;
}

async function importKeywords() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      '❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set'
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    console.log('📋 Starting keyword import...');

    const csvPath = path.join(process.cwd(), 'keywords_for_import.csv');

    if (!fs.existsSync(csvPath)) {
      console.error(`❌ Error: ${csvPath} not found`);
      process.exit(1);
    }

    // Read and parse CSV
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }) as KeywordRow[];

    console.log(`✓ Parsed ${records.length} keywords from CSV`);

    // Transform to database format
    const keywords: TrackedKeyword[] = records.map((row) => ({
      keyword: row.keyword.trim(),
      target_url: row.target_url.trim(),
      market: row.market?.trim() || 'uk',
      is_active: row.is_active === 'true',
    }));

    // Insert in batches (Supabase has limits on batch size)
    const batchSize = 1000;
    let inserted = 0;
    let duplicates = 0;

    for (let i = 0; i < keywords.length; i += batchSize) {
      const batch = keywords.slice(i, i + batchSize);
      const batchNum = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(keywords.length / batchSize);

      try {
        // Using UPSERT to handle duplicates gracefully
        const { error, status } = await supabase
          .from('tracked_keywords')
          .upsert(batch, {
            onConflict: 'keyword,market',
            ignoreDuplicates: true,
          });

        if (error) {
          console.error(
            `❌ Error inserting batch ${batchNum}/${totalBatches}:`,
            error
          );
          // Some batches might fail due to conflicts, but continue
          duplicates += batch.length;
        } else {
          inserted += batch.length;
          console.log(
            `  ✓ Batch ${batchNum}/${totalBatches} complete (${inserted} inserted)`
          );
        }
      } catch (error) {
        console.error(`❌ Error processing batch ${batchNum}:`, error);
      }
    }

    // Verify results
    const { data: allKeywords, error: countError } = await supabase
      .from('tracked_keywords')
      .select('keyword', { count: 'exact' });

    if (countError) {
      console.error('❌ Error verifying insert:', countError);
      process.exit(1);
    }

    console.log(`\n✅ Import complete!`);
    console.log(`   Total keywords: ${allKeywords?.length || 0}`);
    console.log(`   Inserted this run: ${inserted}`);
    console.log(
      `   Skipped (duplicates/conflicts): ${duplicates}`
    );

  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

importKeywords();
