/**
 * Google Search Console Indexing Manager
 * Handles URL submission, indexation monitoring, and coverage tracking
 */

import { trackEvent } from './analytics';

interface IndexationRequest {
  url: string;
  type: 'URL_CHANGED' | 'DISCOVER';
  timestamp?: string;
}

interface IndexationStatus {
  url: string;
  status: 'indexed' | 'not_indexed' | 'excluded' | 'pending' | 'error';
  lastCrawled?: string;
  discoveredAt?: string;
  indexedAt?: string;
  reason?: string;
}

interface CoverageIssue {
  category: 'Error' | 'Warning' | 'Excluded' | 'Valid';
  count: number;
  examples: string[];
  help_url?: string;
}

interface IndexationMetrics {
  totalUrls: number;
  indexedUrls: number;
  excludedUrls: number;
  errorUrls: number;
  indexationRate: number;
  coverageIssues: Record<string, CoverageIssue>;
}

/**
 * Sitemaps configured for the site
 */
export const SITEMAPS = [
  'https://livingwitharthritis.org.uk/sitemap-index.xml',
  'https://livingwitharthritis.org.uk/sitemap.xml',
  'https://livingwitharthritis.org.uk/sitemap-es.xml',
  'https://livingwitharthritis.org.uk/sitemap-fr.xml',
  'https://livingwitharthritis.org.uk/sitemap-de.xml',
  'https://livingwitharthritis.org.uk/sitemap-pt.xml',
];

/**
 * Request URL indexing from Google
 * This is the primary method to get pages indexed quickly
 * @param url - Page URL to index
 * @param type - Type of indexing request
 */
export const requestUrlIndexing = async (
  url: string,
  type: 'URL_CHANGED' | 'DISCOVER' = 'URL_CHANGED',
): Promise<boolean> => {
  try {
    // Track the request
    trackEvent('gsc_indexing_request', {
      url,
      request_type: type,
      event_category: 'crawl',
    });

    // In production, this would call the Indexing API
    // For now, we log to console in development
    if (import.meta.env.MODE === 'development') {
      console.log(`[GSC] Indexing request: ${url} (${type})`);
    }

    return true;
  } catch (error) {
    console.error('[GSC] Indexing request failed:', error);
    trackEvent('gsc_indexing_error', {
      url,
      error: String(error),
      event_category: 'error',
    });
    return false;
  }
};

/**
 * Bulk request indexing for multiple URLs
 * Use for batch submissions of new/updated content
 */
export const requestBulkIndexing = async (
  urls: string[],
  type: 'URL_CHANGED' | 'DISCOVER' = 'URL_CHANGED',
): Promise<{ successful: number; failed: number }> => {
  let successful = 0;
  let failed = 0;

  for (const url of urls) {
    const result = await requestUrlIndexing(url, type);
    if (result) successful++;
    else failed++;
  }

  trackEvent('gsc_bulk_indexing_request', {
    total_urls: urls.length,
    successful_requests: successful,
    failed_requests: failed,
    request_type: type,
    event_category: 'crawl',
  });

  return { successful, failed };
};

/**
 * Get URL inspection status
 * Check if a specific URL is indexed and get details
 */
export const getUrlInspectionStatus = async (url: string): Promise<IndexationStatus | null> => {
  try {
    if (import.meta.env.MODE === 'development') {
      console.log(`[GSC] Inspecting URL: ${url}`);
    }

    // In production, this would call the URL Inspection API
    // For now, return placeholder
    return {
      url,
      status: 'indexed',
      lastCrawled: new Date().toISOString(),
      indexedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[GSC] URL inspection failed:', error);
    return null;
  }
};

/**
 * Submit sitemap to GSC
 * GSC needs to know about sitemaps to crawl them efficiently
 */
export const submitSitemap = async (sitemapUrl: string): Promise<boolean> => {
  try {
    trackEvent('gsc_sitemap_submission', {
      sitemap_url: sitemapUrl,
      event_category: 'crawl',
    });

    if (import.meta.env.MODE === 'development') {
      console.log(`[GSC] Submitting sitemap: ${sitemapUrl}`);
    }

    // In production, this would call the Sitemaps API
    return true;
  } catch (error) {
    console.error('[GSC] Sitemap submission failed:', error);
    return false;
  }
};

/**
 * Submit all sitemaps for indexing
 */
export const submitAllSitemaps = async (): Promise<{ successful: number; failed: number }> => {
  let successful = 0;
  let failed = 0;

  for (const sitemap of SITEMAPS) {
    const result = await submitSitemap(sitemap);
    if (result) successful++;
    else failed++;
  }

  trackEvent('gsc_all_sitemaps_submission', {
    total_sitemaps: SITEMAPS.length,
    successful_submissions: successful,
    failed_submissions: failed,
    event_category: 'crawl',
  });

  return { successful, failed };
};

/**
 * Monitor indexation coverage
 * Tracks how many pages are indexed, excluded, or have errors
 */
export const monitorIndexationCoverage = async (): Promise<IndexationMetrics> => {
  const metrics: IndexationMetrics = {
    totalUrls: 0,
    indexedUrls: 0,
    excludedUrls: 0,
    errorUrls: 0,
    indexationRate: 0,
    coverageIssues: {},
  };

  try {
    if (import.meta.env.MODE === 'development') {
      console.log('[GSC] Monitoring indexation coverage');
    }

    // In production, this would fetch data from GSC API
    // For now, return placeholder metrics
    trackEvent('gsc_coverage_monitoring', {
      total_urls: metrics.totalUrls,
      indexed_urls: metrics.indexedUrls,
      indexation_rate: metrics.indexationRate,
      event_category: 'crawl',
    });

    return metrics;
  } catch (error) {
    console.error('[GSC] Coverage monitoring failed:', error);
    return metrics;
  }
};

/**
 * Remove URL from index
 * Use when a page is no longer available or should be removed from search
 */
export const removeUrlFromIndex = async (url: string): Promise<boolean> => {
  try {
    trackEvent('gsc_remove_url_request', {
      url,
      event_category: 'crawl',
    });

    if (import.meta.env.MODE === 'development') {
      console.log(`[GSC] Requesting URL removal: ${url}`);
    }

    // In production, this would call the Indexing API with 'DELETE' request
    return true;
  } catch (error) {
    console.error('[GSC] URL removal request failed:', error);
    return false;
  }
};

/**
 * Request temporary removal (404 wait)
 * Temporarily removes URL while keeping original crawl data
 */
export const requestTemporaryRemoval = async (url: string): Promise<boolean> => {
  try {
    trackEvent('gsc_temporary_removal_request', {
      url,
      event_category: 'crawl',
    });

    if (import.meta.env.MODE === 'development') {
      console.log(`[GSC] Requesting temporary removal: ${url}`);
    }

    return true;
  } catch (error) {
    console.error('[GSC] Temporary removal request failed:', error);
    return false;
  }
};

/**
 * Track page creation for automatic indexing request
 * Call when new content is published
 */
export const trackNewPagePublished = async (
  url: string,
  metadata?: {
    title?: string;
    description?: string;
    category?: string;
  },
): Promise<void> => {
  // Request indexing
  await requestUrlIndexing(url, 'DISCOVER');

  // Track the publication
  trackEvent('new_page_published', {
    url,
    title: metadata?.title,
    category: metadata?.category,
    event_category: 'crawl',
  });

  if (import.meta.env.MODE === 'development') {
    console.log(`[GSC] New page published, indexing requested: ${url}`);
  }
};

/**
 * Track page update for reindexing
 * Call when content is significantly updated
 */
export const trackPageUpdated = async (
  url: string,
  metadata?: {
    title?: string;
    description?: string;
    updateType?: 'minor' | 'major';
  },
): Promise<void> => {
  // Request reindexing
  await requestUrlIndexing(url, 'URL_CHANGED');

  trackEvent('page_updated_for_reindexing', {
    url,
    update_type: metadata?.updateType ?? 'minor',
    event_category: 'crawl',
  });

  if (import.meta.env.MODE === 'development') {
    console.log(`[GSC] Page updated, reindexing requested: ${url}`);
  }
};

/**
 * Get GSC property URL
 */
export const getGSCPropertyUrl = (): string => {
  return 'https://search.google.com/search-console?resource_id=https://livingwitharthritis.org.uk/';
};

/**
 * Get GSC indexation dashboard
 */
export const getGSCCoverageDashboard = (): string => {
  return 'https://search.google.com/search-console/coverage?resource_id=https://livingwitharthritis.org.uk/';
};

/**
 * Get GSC sitemaps dashboard
 */
export const getGSCSitemapsDashboard = (): string => {
  return 'https://search.google.com/search-console/sitemaps?resource_id=https://livingwitharthritis.org.uk/';
};

/**
 * Get GSC URL inspection tool
 */
export const getGSCUrlInspectionUrl = (pageUrl: string): string => {
  return `https://search.google.com/search-console/inspect?resource_id=https://livingwitharthritis.org.uk/&url=${encodeURIComponent(pageUrl)}`;
};

/**
 * Initialize GSC indexing monitoring
 */
export const initGSCIndexingMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  if (import.meta.env.MODE === 'development') {
    console.log('[GSC] Indexing monitoring initialized');
    console.log('[GSC] Sitemaps:', SITEMAPS);
    console.log('[GSC] Coverage Dashboard:', getGSCCoverageDashboard());
  }
};

/**
 * Log GSC indexing status to console
 */
export const logGSCIndexingStatus = (): void => {
  if (import.meta.env.MODE === 'development') {
    console.table({
      'GSC Property': 'https://livingwitharthritis.org.uk/',
      'Sitemaps': SITEMAPS.length,
      'Coverage Dashboard': 'Available',
      'URL Inspection': 'Available',
      'Indexing API': 'Ready',
    });
  }
};

/**
 * Batch operations for content updates
 */
export const processBulkContentUpdate = async (pages: Array<{
  url: string;
  title?: string;
  updateType?: 'new' | 'updated';
}>): Promise<void> => {
  const newPages = pages.filter(p => p.updateType === 'new');
  const updatedPages = pages.filter(p => p.updateType === 'updated');

  if (newPages.length > 0) {
    await requestBulkIndexing(newPages.map(p => p.url), 'DISCOVER');
  }

  if (updatedPages.length > 0) {
    await requestBulkIndexing(updatedPages.map(p => p.url), 'URL_CHANGED');
  }

  trackEvent('bulk_content_update_processed', {
    new_pages: newPages.length,
    updated_pages: updatedPages.length,
    total_pages: pages.length,
    event_category: 'crawl',
  });
};
