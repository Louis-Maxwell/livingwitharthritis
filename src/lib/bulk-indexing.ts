/**
 * Bulk Page Indexing System
 * Request indexing for all pages in the website
 */

import { requestUrlIndexing, requestBulkIndexing } from './gsc-indexing';
import { trackEvent } from './analytics';

/**
 * All known pages on the site (from prerender routes)
 * This is a comprehensive list of every page that should be indexed
 */
export const ALL_SITE_PAGES = [
  // Home & Main Pages
  'https://livingwitharthritis.org.uk/',
  'https://livingwitharthritis.org.uk/about',
  'https://livingwitharthritis.org.uk/services',
  'https://livingwitharthritis.org.uk/contact',
  'https://livingwitharthritis.org.uk/faq',

  // Main Hubs
  'https://livingwitharthritis.org.uk/exercises',
  'https://livingwitharthritis.org.uk/exercise-hub',
  'https://livingwitharthritis.org.uk/diet',
  'https://livingwitharthritis.org.uk/blog',
  'https://livingwitharthritis.org.uk/community',

  // Chat & Tools
  'https://livingwitharthritis.org.uk/chat',
  'https://livingwitharthritis.org.uk/self-help',
  'https://livingwitharthritis.org.uk/symptom-checker',
  'https://livingwitharthritis.org.uk/health-tools',

  // Conditions
  'https://livingwitharthritis.org.uk/conditions/osteoarthritis',
  'https://livingwitharthritis.org.uk/conditions/rheumatoid-arthritis',
  'https://livingwitharthritis.org.uk/conditions/psoriatic-arthritis',
  'https://livingwitharthritis.org.uk/conditions/gout',
  'https://livingwitharthritis.org.uk/conditions/fibromyalgia',
  'https://livingwitharthritis.org.uk/conditions/lupus',
  'https://livingwitharthritis.org.uk/conditions/ankylosing-spondylitis',
  'https://livingwitharthritis.org.uk/conditions/juvenile-arthritis',

  // Joints
  'https://livingwitharthritis.org.uk/conditions/knee-arthritis',
  'https://livingwitharthritis.org.uk/conditions/hand-arthritis',
  'https://livingwitharthritis.org.uk/conditions/shoulder-arthritis',
  'https://livingwitharthritis.org.uk/conditions/hip-arthritis',
  'https://livingwitharthritis.org.uk/conditions/elbow-arthritis',

  // Exercises
  'https://livingwitharthritis.org.uk/exercises/tai-chi-for-arthritis',
  'https://livingwitharthritis.org.uk/exercises/seated-tai-chi-for-arthritis',
  'https://livingwitharthritis.org.uk/exercises/tai-chi-for-balance',
  'https://livingwitharthritis.org.uk/exercises/tai-chi-for-beginners',
  'https://livingwitharthritis.org.uk/exercises/ankle-arthritis-exercises',
  'https://livingwitharthritis.org.uk/exercises/neck-arthritis-exercises',
  'https://livingwitharthritis.org.uk/blog/knee-arthritis-exercises-uk',

  // Diet & Nutrition
  'https://livingwitharthritis.org.uk/diet/mediterranean-diet-for-arthritis',
  'https://livingwitharthritis.org.uk/diet/foods-to-avoid-with-arthritis',
  'https://livingwitharthritis.org.uk/supplements',
  'https://livingwitharthritis.org.uk/supplements/glucosamine',
  'https://livingwitharthritis.org.uk/supplements/turmeric',
  'https://livingwitharthritis.org.uk/supplements/msm',
  'https://livingwitharthritis.org.uk/supplements/collagen',

  // Guides
  'https://livingwitharthritis.org.uk/guides/exercise',
  'https://livingwitharthritis.org.uk/guides/diet',
  'https://livingwitharthritis.org.uk/guides/uk-arthritis',
  'https://livingwitharthritis.org.uk/guides/health-services',
  'https://livingwitharthritis.org.uk/guides/benefits-pip',
  'https://livingwitharthritis.org.uk/guides/newly-diagnosed',
  'https://livingwitharthritis.org.uk/guides/pain-relief',

  // Treatments & Medical
  'https://livingwitharthritis.org.uk/guides/steroids',
  'https://livingwitharthritis.org.uk/guides/azathioprine',
  'https://livingwitharthritis.org.uk/guides/febuxostat-gout',
  'https://livingwitharthritis.org.uk/guides/painkillers-nsaids',
  'https://livingwitharthritis.org.uk/guides/knee-replacement-surgery',

  // Support & Community
  'https://livingwitharthritis.org.uk/buddy',
  'https://livingwitharthritis.org.uk/arthritis-support',
  'https://livingwitharthritis.org.uk/stories',
  'https://livingwitharthritis.org.uk/expert-articles',

  // Information Pages
  'https://livingwitharthritis.org.uk/about-us',
  'https://livingwitharthritis.org.uk/trust',
  'https://livingwitharthritis.org.uk/impact',
  'https://livingwitharthritis.org.uk/governance',
  'https://livingwitharthritis.org.uk/editorial-standards',

  // Policies
  'https://livingwitharthritis.org.uk/privacy',
  'https://livingwitharthritis.org.uk/cookies',
  'https://livingwitharthritis.org.uk/terms',
  'https://livingwitharthritis.org.uk/accessibility',
  'https://livingwitharthritis.org.uk/safeguarding',
  'https://livingwitharthritis.org.uk/complaints',

  // Donate & Support
  'https://livingwitharthritis.org.uk/donate',
  'https://livingwitharthritis.org.uk/ways-to-help',
  'https://livingwitharthritis.org.uk/corporate-giving',
  'https://livingwitharthritis.org.uk/zakat',

  // AI & Transparency
  'https://livingwitharthritis.org.uk/ai',
  'https://livingwitharthritis.org.uk/about/ai-transparency',
  'https://livingwitharthritis.org.uk/sources',
  'https://livingwitharthritis.org.uk/ai-citations',
  'https://livingwitharthritis.org.uk/ai-guidelines',

  // Misc Pages
  'https://livingwitharthritis.org.uk/arthritis-flare-ups',
  'https://livingwitharthritis.org.uk/gallery',
  'https://livingwitharthritis.org.uk/credits',
  'https://livingwitharthritis.org.uk/sitemap',
  'https://livingwitharthritis.org.uk/press',
  'https://livingwitharthritis.org.uk/partners',
];

/**
 * Batch size for bulk requests
 * Google recommends batches of 100-1000
 */
const BATCH_SIZE = 500;

/**
 * Request indexing for all pages on the site
 * This is the primary method to get all pages indexed
 */
export const indexAllPages = async (
  options?: {
    batchSize?: number;
    onProgress?: (current: number, total: number) => void;
    type?: 'URL_CHANGED' | 'DISCOVER';
  },
): Promise<{
  totalPages: number;
  successfulRequests: number;
  failedRequests: number;
  duration: number;
}> => {
  const startTime = Date.now();
  const batchSize = options?.batchSize ?? BATCH_SIZE;
  const type = options?.type ?? 'DISCOVER';
  let successfulRequests = 0;
  let failedRequests = 0;

  console.log(`[Bulk Indexing] Starting indexing of ${ALL_SITE_PAGES.length} pages...`);

  trackEvent('bulk_indexing_started', {
    total_pages: ALL_SITE_PAGES.length,
    batch_size: batchSize,
    request_type: type,
    event_category: 'crawl',
  });

  // Process in batches
  for (let i = 0; i < ALL_SITE_PAGES.length; i += batchSize) {
    const batch = ALL_SITE_PAGES.slice(i, i + batchSize);

    try {
      const result = await requestBulkIndexing(batch, type);
      successfulRequests += result.successful;
      failedRequests += result.failed;

      // Report progress
      const processed = Math.min(i + batchSize, ALL_SITE_PAGES.length);
      if (options?.onProgress) {
        options.onProgress(processed, ALL_SITE_PAGES.length);
      }

      console.log(
        `[Bulk Indexing] Batch ${Math.ceil(i / batchSize) + 1}: ${result.successful} successful, ${result.failed} failed`,
      );

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < ALL_SITE_PAGES.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`[Bulk Indexing] Batch failed:`, error);
      failedRequests += batch.length;
    }
  }

  const duration = Date.now() - startTime;

  console.log(`[Bulk Indexing] Complete!`);
  console.log(`  Total pages: ${ALL_SITE_PAGES.length}`);
  console.log(`  Successful: ${successfulRequests}`);
  console.log(`  Failed: ${failedRequests}`);
  console.log(`  Duration: ${(duration / 1000).toFixed(1)}s`);

  trackEvent('bulk_indexing_completed', {
    total_pages: ALL_SITE_PAGES.length,
    successful_requests: successfulRequests,
    failed_requests: failedRequests,
    duration_seconds: Math.round(duration / 1000),
    event_category: 'crawl',
  });

  return {
    totalPages: ALL_SITE_PAGES.length,
    successfulRequests,
    failedRequests,
    duration,
  };
};

/**
 * Request indexing for a specific page category
 */
export const indexPagesByCategory = async (
  category: 'conditions' | 'exercises' | 'guides' | 'diet' | 'guides' | 'support' | 'all',
): Promise<{ success: boolean; pagesRequested: number }> => {
  let pages: string[] = [];

  switch (category) {
    case 'conditions':
      pages = ALL_SITE_PAGES.filter(p => p.includes('/conditions/'));
      break;
    case 'exercises':
      pages = ALL_SITE_PAGES.filter(p => p.includes('/exercises/'));
      break;
    case 'guides':
      pages = ALL_SITE_PAGES.filter(p => p.includes('/guides/'));
      break;
    case 'diet':
      pages = ALL_SITE_PAGES.filter(p => p.includes('/diet/') || p.includes('/supplements/'));
      break;
    case 'support':
      pages = ALL_SITE_PAGES.filter(p => p.includes('/community') || p.includes('/buddy') || p.includes('/stories'));
      break;
    case 'all':
      pages = ALL_SITE_PAGES;
      break;
  }

  if (pages.length === 0) {
    console.log(`[Indexing] No pages found for category: ${category}`);
    return { success: false, pagesRequested: 0 };
  }

  console.log(`[Indexing] Requesting indexing for ${pages.length} ${category} pages...`);

  const result = await requestBulkIndexing(pages, 'DISCOVER');

  trackEvent('category_indexing_requested', {
    category,
    pages_count: pages.length,
    successful: result.successful,
    failed: result.failed,
    event_category: 'crawl',
  });

  return {
    success: result.successful > 0,
    pagesRequested: pages.length,
  };
};

/**
 * Get total page count
 */
export const getTotalPageCount = (): number => {
  return ALL_SITE_PAGES.length;
};

/**
 * Get pages by category
 */
export const getPagesByCategory = (category: string): string[] => {
  return ALL_SITE_PAGES.filter(p => p.includes(`/${category}/`));
};

/**
 * Export page list as CSV
 */
export const exportPagesAsCSV = (): string => {
  const header = 'URL,Category,Status\n';
  const rows = ALL_SITE_PAGES.map(url => {
    let category = 'other';
    if (url.includes('/conditions/')) category = 'conditions';
    else if (url.includes('/exercises/')) category = 'exercises';
    else if (url.includes('/guides/')) category = 'guides';
    else if (url.includes('/diet/')) category = 'diet';
    else if (url.includes('/blog/')) category = 'blog';
    else if (url.includes('/community/')) category = 'community';

    return `"${url}","${category}","pending"`;
  });

  return header + rows.join('\n');
};

/**
 * Log indexing status
 */
export const logIndexingStatus = (): void => {
  console.group('📊 Website Indexing Status');

  const categories = {
    'Home & Core': ALL_SITE_PAGES.filter(p =>
      ['about', 'services', 'contact', 'faq'].some(cat => p.includes(cat)),
    ).length,
    Conditions: ALL_SITE_PAGES.filter(p => p.includes('/conditions/')).length,
    Exercises: ALL_SITE_PAGES.filter(p => p.includes('/exercises/')).length,
    'Guides & Content': ALL_SITE_PAGES.filter(p => p.includes('/guides/') || p.includes('/blog/')).length,
    'Diet & Supplements': ALL_SITE_PAGES.filter(p => p.includes('/diet/') || p.includes('/supplements/')).length,
    Community: ALL_SITE_PAGES.filter(p => p.includes('/community') || p.includes('/stories')).length,
    'Policies & Info': ALL_SITE_PAGES.filter(p =>
      ['privacy', 'cookies', 'terms', 'accessibility'].some(cat => p.includes(cat)),
    ).length,
  };

  console.table({
    ...categories,
    'Total Pages': ALL_SITE_PAGES.length,
  });

  console.log('\n💡 To index all pages, run:');
  console.log('  indexAllPages()');

  console.log('\n💡 To index a specific category, run:');
  console.log('  indexPagesByCategory("conditions")');
  console.log('  indexPagesByCategory("exercises")');
  console.log('  indexPagesByCategory("guides")');

  console.groupEnd();
};

/**
 * Initialize bulk indexing system
 */
export const initBulkIndexing = (): void => {
  if (typeof window === 'undefined') return;

  if (import.meta.env.MODE === 'development') {
    console.log('[Bulk Indexing] System initialized');
    console.log(`[Bulk Indexing] ${ALL_SITE_PAGES.length} pages ready for indexing`);
    console.log('[Bulk Indexing] Available functions:');
    console.log('  - indexAllPages()');
    console.log('  - indexPagesByCategory(category)');
    console.log('  - logIndexingStatus()');
    console.log('  - exportPagesAsCSV()');
  }
};
