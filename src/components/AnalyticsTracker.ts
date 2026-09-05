/**
 * Analytics Tracker for City & Library Pages
 * Tracks clicks, views, and engagement on dynamic routes
 */

export interface AnalyticsEvent {
  type: 'click' | 'view' | 'engagement';
  page: string;
  pageType: 'city' | 'library' | 'article';
  slug: string;
  timestamp: string;
  userId?: string;
  sessionId: string;
  referrer?: string;
  timeOnPage?: number;
}

export interface PageMetrics {
  slug: string;
  pageType: 'city' | 'library';
  totalViews: number;
  totalClicks: number;
  avgTimeOnPage: number;
  bounceRate: number;
  topReferrers: Array<{ referrer: string; count: number }>;
}

class AnalyticsTracker {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private apiEndpoint = '/api/analytics/events';
  private batchSize = 10;
  private pageViewTime: number = Date.now();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking() {
    // Track page views on mount
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.trackPageUnload();
      });

      // Track clicks on city/library links
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a[data-analytics]');
        if (link) {
          const pageType = link.getAttribute('data-page-type') as 'city' | 'library' | 'article';
          const slug = link.getAttribute('data-slug');
          if (pageType && slug) {
            this.trackClick(pageType, slug);
          }
        }
      });
    }
  }

  /**
   * Track page view
   */
  trackPageView(pageType: 'city' | 'library' | 'article', slug: string) {
    this.pageViewTime = Date.now();
    const event: AnalyticsEvent = {
      type: 'view',
      page: `/${pageType === 'city' ? 'arthritis-support' : 'library'}/${slug}`,
      pageType,
      slug,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    };

    this.events.push(event);
    if (this.events.length >= this.batchSize) {
      this.flushEvents();
    }
  }

  /**
   * Track click on city or library link
   */
  trackClick(pageType: 'city' | 'library', slug: string) {
    const event: AnalyticsEvent = {
      type: 'click',
      page: `/${pageType === 'city' ? 'arthritis-support' : 'library'}/${slug}`,
      pageType,
      slug,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      referrer: typeof window !== 'undefined' ? window.location.href : undefined,
    };

    this.events.push(event);
    if (this.events.length >= this.batchSize) {
      this.flushEvents();
    }
  }

  /**
   * Track engagement (scrolling, interactions)
   */
  trackEngagement(pageType: 'city' | 'library', slug: string, scrollDepth: number) {
    const event: AnalyticsEvent = {
      type: 'engagement',
      page: `/${pageType === 'city' ? 'arthritis-support' : 'library'}/${slug}`,
      pageType,
      slug,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    // Store as custom property
    (event as any).scrollDepth = scrollDepth;

    this.events.push(event);
  }

  /**
   * Track page unload (calculate time on page)
   */
  private trackPageUnload() {
    if (this.events.length > 0) {
      const lastEvent = this.events[this.events.length - 1];
      if (lastEvent.type === 'view') {
        lastEvent.timeOnPage = Math.round((Date.now() - this.pageViewTime) / 1000);
      }
    }
    this.flushEvents();
  }

  /**
   * Send events to backend
   */
  private async flushEvents() {
    if (this.events.length === 0) return;

    try {
      await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: this.events }),
      });
      this.events = [];
    } catch (error) {
      console.error('Analytics flush error:', error);
      // Keep events in memory to retry
    }
  }

  /**
   * Force flush (before page unload)
   */
  flush() {
    this.flushEvents();
  }
}

// Singleton instance
export const analytics = typeof window !== 'undefined' ? new AnalyticsTracker() : null;

// React Hook for easy integration
export function useAnalytics(pageType: 'city' | 'library' | 'article', slug: string) {
  React.useEffect(() => {
    if (analytics) {
      analytics.trackPageView(pageType, slug);
    }
    return () => {
      if (analytics) {
        analytics.flush();
      }
    };
  }, [pageType, slug]);

  return {
    trackClick: (linkedPageType: 'city' | 'library') => {
      if (analytics) {
        analytics.trackClick(linkedPageType, slug);
      }
    },
    trackEngagement: (scrollDepth: number) => {
      if (analytics) {
        analytics.trackEngagement(pageType, slug, scrollDepth);
      }
    },
  };
}

// React for hook
import React from 'react';
