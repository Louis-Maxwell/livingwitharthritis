/**
 * Google Search Console Integration
 * Tracks GSC events and metrics in GA4
 * Requires GSC data import in Google Analytics 4
 */

import { trackEvent } from './analytics';
import {
  requestUrlIndexing,
  trackNewPagePublished,
  trackPageUpdated,
  getUrlInspectionStatus,
} from './gsc-indexing';

interface GSCMetrics {
  query: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

interface CrawlErrorAlert {
  errorType: 'notFound' | 'serverError' | 'forbidden' | 'other';
  affectedUrls: number;
  firstDetected: string;
}

/**
 * Track GSC search performance metrics
 * Call this when users find your content via organic search
 */
export const trackGSCSearchQuery = (metrics: GSCMetrics): void => {
  trackEvent('gsc_search_result_click', {
    search_query: metrics.query,
    search_position: metrics.position,
    search_impressions: metrics.impressions,
    search_clicks: metrics.clicks,
    search_ctr: Math.round(metrics.ctr * 100) / 100,
    event_category: 'search',
  });
};

/**
 * Track GSC indexing status
 * Call when checking page indexation or coverage
 */
export const trackIndexationStatus = (pageUrl: string, status: 'indexed' | 'not_indexed' | 'excluded'): void => {
  trackEvent('gsc_indexation_status', {
    page_url: pageUrl,
    indexation_status: status,
    event_category: 'crawl',
  });
};

/**
 * Track crawl errors detected by GSC
 * Helps identify and monitor site health issues
 */
export const trackCrawlError = (alert: CrawlErrorAlert): void => {
  trackEvent('gsc_crawl_error', {
    error_type: alert.errorType,
    affected_urls: alert.affectedUrls,
    first_detected: alert.firstDetected,
    event_category: 'crawl',
    severity: alert.affectedUrls > 10 ? 'high' : 'medium',
  });
};

/**
 * Track mobile usability issues
 * GSC tracks mobile-specific problems (viewport, clickable elements, etc)
 */
export const trackMobileUsabilityIssue = (issueType: string, affectedPages: number): void => {
  trackEvent('gsc_mobile_usability_issue', {
    issue_type: issueType,
    affected_pages: affectedPages,
    event_category: 'usability',
  });
};

/**
 * Track SSL/security certificate issues
 */
export const trackSecurityIssue = (issueType: 'hacked' | 'malware' | 'phishing' | 'unwanted_software'): void => {
  trackEvent('gsc_security_issue', {
    issue_type: issueType,
    event_category: 'security',
    severity: 'high',
  });
};

/**
 * Track GSC URL inspection results
 * Use when verifying if a specific URL is indexed
 */
export const trackUrlInspection = (pageUrl: string, inspectionResult: 'live' | 'crawled' | 'indexed' | 'not_indexed'): void => {
  trackEvent('gsc_url_inspection', {
    inspected_url: pageUrl,
    inspection_result: inspectionResult,
    event_category: 'crawl',
  });
};

/**
 * Track sitemaps submitted to GSC
 */
export const trackSitemapSubmission = (sitemapUrl: string, pageCount: number): void => {
  trackEvent('gsc_sitemap_submitted', {
    sitemap_url: sitemapUrl,
    page_count: pageCount,
    event_category: 'crawl',
  });
};

/**
 * Track removal requests (temp/permanent)
 * User requests to remove URLs from search results
 */
export const trackRemovalRequest = (pageUrl: string, removalType: 'temporary' | 'permanent'): void => {
  trackEvent('gsc_removal_request', {
    requested_url: pageUrl,
    removal_type: removalType,
    event_category: 'crawl',
  });
};

/**
 * Monitor GSC performance metrics over time
 * Track aggregated stats to understand search visibility
 */
export const trackGSCPerformanceSnapshot = (snapshot: {
  totalImpressions: number;
  totalClicks: number;
  averagePosition: number;
  averageCTR: number;
}): void => {
  trackEvent('gsc_performance_snapshot', {
    total_impressions: snapshot.totalImpressions,
    total_clicks: snapshot.totalClicks,
    average_position: Math.round(snapshot.averagePosition * 100) / 100,
    average_ctr: Math.round(snapshot.averageCTR * 10000) / 100, // as percentage
    event_category: 'search',
  });
};

/**
 * Initialize GSC monitoring
 * Set up automatic tracking of critical GSC events
 */
export const initGSCMonitoring = (): void => {
  if (typeof window === 'undefined') return;

  // Monitor for GSC alerts (requires GSC Slack integration or custom webhook)
  // This would typically be called from a backend service that polls GSC API
  const setupGSCAlertListener = () => {
    window.addEventListener('message', (event) => {
      // Listen for GSC alert events from backend service
      if (event.data?.type === 'gsc_alert') {
        const { alertType, data } = event.data;

        switch (alertType) {
          case 'crawl_error':
            trackCrawlError(data);
            break;
          case 'mobile_usability':
            trackMobileUsabilityIssue(data.issueType, data.affectedPages);
            break;
          case 'security':
            trackSecurityIssue(data.issueType);
            break;
        }
      }
    });
  };

  setupGSCAlertListener();
};

/**
 * Convenience methods that combine indexing + tracking
 */

/**
 * Publish new content and request indexing
 */
export const publishNewContent = async (
  url: string,
  metadata?: {
    title?: string;
    description?: string;
    category?: string;
  },
): Promise<void> => {
  await trackNewPagePublished(url, metadata);
  trackEvent('content_published_for_indexing', {
    url,
    title: metadata?.title,
    category: metadata?.category,
  });
};

/**
 * Update content and request reindexing
 */
export const updateContentAndReindex = async (
  url: string,
  metadata?: {
    title?: string;
    description?: string;
    updateType?: 'minor' | 'major';
  },
): Promise<void> => {
  await trackPageUpdated(url, metadata);
  trackEvent('content_updated_for_reindexing', {
    url,
    update_type: metadata?.updateType ?? 'minor',
  });
};

/**
 * Check if page is indexed
 */
export const checkPageIndexationStatus = async (url: string): Promise<string> => {
  const status = await getUrlInspectionStatus(url);
  if (status) {
    trackUrlInspection(url, status.status as 'live' | 'crawled' | 'indexed' | 'not_indexed');
    return status.status;
  }
  return 'unknown';
};

/**
 * Get GSC dashboard URL for this property
 */
export const getGSCDashboardUrl = (): string => {
  return 'https://search.google.com/search-console/performance/search-analytics?resource_id=https://livingwitharthritis.org.uk/';
};

/**
 * Report GSC integration status
 */
export const logGSCIntegrationStatus = (): void => {
  if (import.meta.env.MODE === 'development') {
    console.log('[GSC] Integration initialized');
    console.log('[GSC] Dashboard:', getGSCDashboardUrl());
  }
};
