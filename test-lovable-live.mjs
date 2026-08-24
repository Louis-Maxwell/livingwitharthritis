#!/usr/bin/env node
/**
 * Test script to verify the Live site on Lovable
 * URL: https://livingwitharthritis.lovable.app
 */

import { chromium } from '@playwright/test';

async function runTests() {
  let browser;

  try {
    console.log('🎬 Starting browser...');
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Test 1: Live site loads
    console.log('\n📄 Test 1: Live site loads...');
    const response = await page.goto('https://livingwitharthritis.lovable.app', { waitUntil: 'domcontentloaded', timeout: 30000 });
    console.log(`   Status: ${response.status()}`);

    if (response.status() !== 200) {
      throw new Error(`Site returned ${response.status()}`);
    }

    // Take screenshot
    await page.screenshot({ path: 'test-live-homepage.png', fullPage: false });
    console.log('   ✅ Screenshot saved: test-live-homepage.png');

    // Test 2: Check for main content
    console.log('\n📄 Test 2: Main content exists...');
    const title = await page.title();
    console.log(`   Page title: "${title}"`);

    const hasNavigation = await page.locator('nav, header, [role="navigation"]').count() > 0;
    const hasMain = await page.locator('main, article, [role="main"]').count() > 0;
    console.log(`   Has navigation: ${hasNavigation ? '✅' : '❌'}`);
    console.log(`   Has main content: ${hasMain ? '✅' : '❌'}`);

    // Test 3: Check for key elements
    console.log('\n📄 Test 3: Key page elements...');
    const headings = await page.locator('h1, h2').count();
    const links = await page.locator('a').count();
    const bodyText = await page.locator('body').textContent();
    const hasText = bodyText && bodyText.length > 100;

    console.log(`   Headings found: ${headings} ✅`);
    console.log(`   Links found: ${links} ✅`);
    console.log(`   Substantial text: ${hasText ? '✅' : '❌'}`);

    // Test 4: Check for specific features
    console.log('\n📄 Test 4: Feature checks...');

    // Look for chat link
    const chatLink = await page.locator('a[href*="/chat"], button:has-text("Chat"), a:has-text("Chat")').isVisible().catch(() => false);
    console.log(`   Chat feature accessible: ${chatLink ? '✅' : 'N/A'}`);

    // Look for donation
    const donateLink = await page.locator('a[href*="/donate"], button:has-text("Donate"), a:has-text("Donate")').isVisible().catch(() => false);
    console.log(`   Donate feature accessible: ${donateLink ? '✅' : 'N/A'}`);

    // Test 5: No critical console errors
    console.log('\n📋 Test 5: Console errors...');
    let errorMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errorMessages.push(msg.text());
      }
    });

    await page.waitForTimeout(3000);

    if (errorMessages.length === 0) {
      console.log('   No console errors: ✅');
    } else {
      console.log(`   Found ${errorMessages.length} console errors (may not be critical)`);
      errorMessages.slice(0, 3).forEach(err => console.log(`      - ${err.substring(0, 80)}`));
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    if (response.status() === 200 && hasNavigation && hasMain && headings > 0 && links > 0) {
      console.log('✅ LIVE SITE IS RUNNING SUCCESSFULLY');
      console.log('');
      console.log(`   Site URL: https://livingwitharthritis.lovable.app`);
      console.log(`   Page title: ${title}`);
      console.log(`   Navigation: Present ✅`);
      console.log(`   Main content: Present ✅`);
      console.log(`   Headings: ${headings}`);
      console.log(`   Links: ${links}`);
      console.log(`   Console errors: ${errorMessages.length}`);
      console.log('');
      console.log('='.repeat(60));
      process.exit(0);
    } else {
      console.log('⚠️ Some tests did not pass');
      console.log('='.repeat(60));
      process.exit(1);
    }

    await context.close();

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.message);
    if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.error('\n⚠️  Network/DNS issue - check internet connection');
    }
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
