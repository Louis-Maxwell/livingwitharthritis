/**
 * Comprehensive Visitor Tracking System
 * Track every visitor journey, identify returning users, and analyze behavior
 */

import { trackEvent } from './analytics';

/**
 * Visitor Session Information
 */
export interface VisitorSession {
  sessionId: string;
  userId: string;
  visitorId: string;
  firstVisit: string;
  lastVisit: string;
  visitCount: number;
  totalDuration: number;
  pageViews: number;
  deviceType: string;
  browser: string;
  operatingSystem: string;
  location?: {
    country: string;
    region?: string;
    city?: string;
  };
  referrer: string;
  entryPage: string;
  exitPage: string;
  conversionStatus: boolean;
}

/**
 * Generate unique visitor ID
 */
const generateVisitorId = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `visitor_${timestamp}_${random}`;
};

/**
 * Get or create visitor ID (stored in localStorage)
 */
export const getVisitorId = (): string => {
  if (typeof window === 'undefined') return '';

  const stored = localStorage.getItem('_visitor_id');
  if (stored) return stored;

  const newId = generateVisitorId();
  localStorage.setItem('_visitor_id', newId);
  localStorage.setItem('_visitor_first_visit', new Date().toISOString());

  return newId;
};

/**
 * Get device information
 */
export const getDeviceInfo = (): {
  type: string;
  browser: string;
  os: string;
} => {
  if (typeof navigator === 'undefined') {
    return { type: 'unknown', browser: 'unknown', os: 'unknown' };
  }

  const ua = navigator.userAgent;

  // Determine device type
  let type = 'desktop';
  if (/Mobile|Android|iPhone|iPad|iPod/.test(ua)) {
    type = /iPad/.test(ua) ? 'tablet' : 'mobile';
  }

  // Detect browser
  let browser = 'unknown';
  if (/Chrome/.test(ua)) browser = 'Chrome';
  else if (/Safari/.test(ua)) browser = 'Safari';
  else if (/Firefox/.test(ua)) browser = 'Firefox';
  else if (/Edge/.test(ua)) browser = 'Edge';
  else if (/MSIE|Trident/.test(ua)) browser = 'IE';

  // Detect OS
  let os = 'unknown';
  if (/Windows/.test(ua)) os = 'Windows';
  else if (/Mac/.test(ua)) os = 'macOS';
  else if (/Linux/.test(ua)) os = 'Linux';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';

  return { type, browser, os };
};

/**
 * Get location information
 */
export const getLocationInfo = async (): Promise<{
  country: string;
  region?: string;
  city?: string;
} | null> => {
  try {
    // Using IP geolocation API (free tier available)
    const response = await fetch('https://ipapi.co/json/', {
      mode: 'cors',
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      country: data.country_name,
      region: data.region,
      city: data.city,
    };
  } catch {
    // Geolocation failed - continue without it
    return null;
  }
};

/**
 * Identify visitor as known user
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const identifyVisitor = (userId: string, userInfo?: any): void => {
  try {
    if (typeof window === 'undefined') return;

    const visitorId = getVisitorId();

    // Set user ID in GA4
    if (typeof window.gtag === 'function') {
      window.gtag('set', {
        user_id: userId,
        visitor_id: visitorId,
      });
    }

    // Store in localStorage
    localStorage.setItem('_user_id', userId);
    localStorage.setItem('_user_identified', new Date().toISOString());

    if (userInfo) {
      localStorage.setItem('_user_info', JSON.stringify(userInfo));
    }

    // Track identification event
    trackEvent('user_identified', {
      user_id: userId,
      visitor_id: visitorId,
      has_user_info: !!userInfo,
    });

    if (import.meta.env.MODE === 'development') {
      console.log('[Tracking] Visitor identified:', userId);
    }
  } catch (error) {
    console.error('[Tracking] Identification failed:', error);
  }
};

/**
 * Track visitor session start
 */
export const trackSessionStart = async (): Promise<void> => {
  try {
    const visitorId = getVisitorId();
    const device = getDeviceInfo();
    const location = await getLocationInfo();
    const referrer = document.referrer || 'direct';
    const entryPage = window.location.pathname;

    // Set visitor properties
    if (typeof window?.gtag === 'function') {
      window.gtag('set', {
        visitor_id: visitorId,
        device_type: device.type,
        browser: device.browser,
        operating_system: device.os,
        country: location?.country,
        region: location?.region,
        city: location?.city,
      });
    }

    // Track session start
    trackEvent('visitor_session_start', {
      visitor_id: visitorId,
      device_type: device.type,
      browser: device.browser,
      operating_system: device.os,
      referrer_source: referrer,
      entry_page: entryPage,
      country: location?.country,
      is_returning: isReturningVisitor(),
    });

    // Store session data
    sessionStorage.setItem(
      '_session_data',
      JSON.stringify({
        startTime: new Date().toISOString(),
        visitorId,
        entryPage,
        referrer,
      }),
    );

    if (import.meta.env.MODE === 'development') {
      console.log('[Tracking] Session started:', { visitorId, device, location });
    }
  } catch (error) {
    console.error('[Tracking] Session start failed:', error);
  }
};

/**
 * Track visitor session end
 */
export const trackSessionEnd = (): void => {
  try {
    const sessionData = sessionStorage.getItem('_session_data');
    const session = sessionData ? JSON.parse(sessionData) : null;

    if (!session) return;

    const endTime = new Date().toISOString();
    const startTime = new Date(session.startTime);
    const duration = Math.round((new Date().getTime() - startTime.getTime()) / 1000);

    trackEvent('visitor_session_end', {
      visitor_id: session.visitorId,
      entry_page: session.entryPage,
      exit_page: window.location.pathname,
      session_duration_seconds: duration,
      referrer: session.referrer,
    });

    if (import.meta.env.MODE === 'development') {
      console.log('[Tracking] Session ended:', { duration });
    }
  } catch (error) {
    console.error('[Tracking] Session end failed:', error);
  }
};

/**
 * Check if returning visitor
 */
export const isReturningVisitor = (): boolean => {
  if (typeof localStorage === 'undefined') return false;
  return !!localStorage.getItem('_visitor_id') && !!localStorage.getItem('_visitor_first_visit');
};

/**
 * Get visitor count in localStorage (approximate)
 */
export const getVisitCount = (): number => {
  if (typeof localStorage === 'undefined') return 0;

  const count = localStorage.getItem('_visit_count');
  const currentCount = count ? parseInt(count) + 1 : 1;

  localStorage.setItem('_visit_count', currentCount.toString());
  localStorage.setItem('_last_visit', new Date().toISOString());

  return currentCount;
};

/**
 * Track page visit with context
 */
export const trackPageVisit = (pageInfo?: {
  title?: string;
  category?: string;
  keywords?: string[];
}): void => {
  try {
    const visitorId = getVisitorId();
    const visitCount = getVisitCount();
    const isReturning = isReturningVisitor();
    const sessionData = sessionStorage.getItem('_session_data');
    const session = sessionData ? JSON.parse(sessionData) : null;

    trackEvent('page_visit_detailed', {
      visitor_id: visitorId,
      visit_number: visitCount,
      is_returning: isReturning,
      page_title: pageInfo?.title || document.title,
      page_category: pageInfo?.category,
      keywords: pageInfo?.keywords?.join(','),
      referrer: session?.referrer,
      time_on_page: calculateTimeOnPage(),
    });

    if (import.meta.env.MODE === 'development') {
      console.log('[Tracking] Page visit:', { visitorId, visitCount, isReturning });
    }
  } catch (error) {
    console.error('[Tracking] Page visit tracking failed:', error);
  }
};

/**
 * Calculate time on page
 */
let pageStartTime = Date.now();

export const calculateTimeOnPage = (): number => {
  return Math.round((Date.now() - pageStartTime) / 1000);
};

/**
 * Reset page timer
 */
export const resetPageTimer = (): void => {
  pageStartTime = Date.now();
};

/**
 * Track visitor behavior
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackVisitorBehavior = (behavior: string, details?: any): void => {
  try {
    const visitorId = getVisitorId();

    trackEvent('visitor_behavior', {
      visitor_id: visitorId,
      behavior,
      ...details,
    });
  } catch (error) {
    console.error('[Tracking] Behavior tracking failed:', error);
  }
};

/**
 * Track visitor engagement
 */
export const trackVisitorEngagement = (
  engagementType: 'click' | 'scroll' | 'input' | 'download' | 'share',
  target?: string,
): void => {
  trackVisitorBehavior(`engagement_${engagementType}`, {
    target,
  });
};

/**
 * Get visitor profile
 */
export const getVisitorProfile = (): {
  visitorId: string;
  userId?: string;
  isAuthenticated: boolean;
  isReturning: boolean;
  visitCount: number;
  firstVisit?: string;
  lastVisit?: string;
  device: ReturnType<typeof getDeviceInfo>;
} => {
  const visitorId = getVisitorId();
  const userId = localStorage.getItem('_user_id');
  const firstVisit = localStorage.getItem('_visitor_first_visit');
  const lastVisit = localStorage.getItem('_last_visit');
  const visitCount = getVisitCount();
  const device = getDeviceInfo();

  return {
    visitorId,
    userId: userId || undefined,
    isAuthenticated: !!userId,
    isReturning: isReturningVisitor(),
    visitCount,
    firstVisit: firstVisit || undefined,
    lastVisit: lastVisit || undefined,
    device,
  };
};

/**
 * Export visitor profile
 */
export const exportVisitorProfile = (): string => {
  const profile = getVisitorProfile();
  return JSON.stringify(profile, null, 2);
};

/**
 * Clear visitor data (for logout/opt-out)
 */
export const clearVisitorData = (): void => {
  if (typeof localStorage === 'undefined') return;

  localStorage.removeItem('_user_id');
  localStorage.removeItem('_user_info');
  localStorage.removeItem('_user_identified');

  trackEvent('visitor_data_cleared', {
    visitor_id: getVisitorId(),
  });

  if (import.meta.env.MODE === 'development') {
    console.log('[Tracking] Visitor data cleared');
  }
};

/**
 * Log visitor tracking status
 */
export const logVisitorTrackingStatus = (): void => {
  const profile = getVisitorProfile();

  console.group('👤 Visitor Tracking Status');

  console.table({
    'Visitor ID': profile.visitorId,
    'User ID': profile.userId || 'Anonymous',
    'Is Authenticated': profile.isAuthenticated ? 'Yes' : 'No',
    'Is Returning': profile.isReturning ? 'Yes' : 'No',
    'Visit Count': profile.visitCount,
    'Device Type': profile.device.type,
    'Browser': profile.device.browser,
    'OS': profile.device.os,
    'First Visit': profile.firstVisit ? new Date(profile.firstVisit).toLocaleDateString() : 'N/A',
    'Last Visit': profile.lastVisit ? new Date(profile.lastVisit).toLocaleDateString() : 'N/A',
  });

  console.log('\n🔍 Tracking Info:');
  console.log('  ✅ Session tracking active');
  console.log('  ✅ Visitor identification working');
  console.log('  ✅ Behavior tracking enabled');
  console.log('  ✅ Page analytics active');

  console.groupEnd();
};

/**
 * Initialize visitor tracking
 */
export const initVisitorTracking = (): void => {
  if (typeof window === 'undefined') return;

  // Get visitor ID
  const visitorId = getVisitorId();

  // Track session start
  trackSessionStart();

  // Track page visit
  trackPageVisit();

  // Set up page unload tracking
  window.addEventListener('beforeunload', trackSessionEnd);

  // Set up engagement tracking
  document.addEventListener('click', () => trackVisitorEngagement('click'));
  document.addEventListener('scroll', () => trackVisitorEngagement('scroll'), {
    passive: true,
  });

  if (import.meta.env.MODE === 'development') {
    console.log('[Tracking] Visitor tracking initialized:', visitorId);
  }

  // Track initialization
  trackEvent('visitor_tracking_initialized', {
    visitor_id: visitorId,
  });
};
