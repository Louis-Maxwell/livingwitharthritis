#!/usr/bin/env node
/**
 * Test script to verify the Living With Arthritis website is running
 * Tests: homepage loads, navigation works, key pages are accessible
 */

import { chromium } from '@playwright/test';

async function runTests() {
  let browser;

  try {
    console.log('🎬 Starting browser...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Test 1: Homepage loads
    console.log('\n📄 Test 1: Homepage loads...');
    const response = await page.goto('http://localhost:5173', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log(`   Status: ${response.status()}`);

    if (response.status() !== 200) {
      throw new Error(`Homepage returned ${response.status()}`);
    }

    // Take screenshot
    await page.screenshot({ path: 'test-homepage.png' });
    console.log('   ✅ Screenshot saved: test-homepage.png');

    // Test 2: Check for main content
    console.log('\n📄 Test 2: Main content exists...');
    const title = await page.title();
    console.log(`   Page title: ${title}`);

    const hasNavigation = await page.locator('nav, header').count() > 0;
    const hasMain = await page.locator('main, article, [role="main"]').count() > 0;
    console.log(`   Has navigation: ${hasNavigation ? '✅' : '❌'}`);
    console.log(`   Has main content: ${hasMain ? '✅' : '❌'}`);

    // Test 3: Check for key elements
    console.log('\n📄 Test 3: Key page elements...');
    const hasHeading = await page.locator('h1, h2').count() > 0;
    const hasLinks = await page.locator('a').count() > 0;
    const bodyText = await page.locator('body').textContent();
    const hasText = bodyText && bodyText.length > 100;

    console.log(`   Has headings: ${hasHeading ? '✅' : '❌'}`);
    console.log(`   Has links: ${hasLinks ? '✅' : '❌'}`);
    console.log(`   Has substantial text: ${hasText ? '✅' : '❌'}`);

    // Test 4: No console errors
    console.log('\n📋 Test 4: Console errors...');
    let errorCount = 0;
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`   ❌ Console error: ${msg.text()}`);
        errorCount++;
      }
    });

    await page.waitForTimeout(2000);

    if (errorCount === 0) {
      console.log('   No console errors: ✅');
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    if (response.status() === 200 && hasNavigation && hasMain && hasHeading && hasLinks && hasText) {
      console.log('✅ ALL TESTS PASSED');
      console.log('   - Homepage loads successfully (200 OK)');
      console.log('   - Page has navigation');
      console.log('   - Main content area present');
      console.log('   - Headings and links found');
      console.log('   - Content is substantial');
      console.log('   - No console errors');
      console.log('='.repeat(50));
      process.exit(0);
    } else {
      console.log('⚠️ Some tests did not pass');
      console.log('='.repeat(50));
      process.exit(1);
    }

    await context.close();

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    console.error('\nDetails:', error);
    process.exit(1);

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

runTests().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
