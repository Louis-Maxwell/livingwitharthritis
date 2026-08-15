/**
 * Google Analytics 4 Event Tracking
 * Centralized event definitions and tracking helpers
 */

interface EventParams {
  [key: string]: string | number | boolean | string[];
}

export const trackEvent = (eventName: string, params?: EventParams) => {
  if (typeof window === 'undefined' || !('gtag' in window)) return;

  (window as any).gtag('event', eventName, params || {});
};

export const setUserProperties = (properties: EventParams) => {
  if (typeof window === 'undefined' || !('gtag' in window)) return;

  (window as any).gtag('set', properties);
};

// Content engagement events
export const trackScrollDepth = (percent: 25 | 50 | 75 | 100) => {
  trackEvent('scroll_depth', {
    percent_scrolled: percent,
    event_category: 'engagement',
  });
};

export const trackFileDownload = (fileName: string, fileExtension: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_extension: fileExtension,
    event_category: 'engagement',
  });
};

export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('click_external_link', {
    link_url: url,
    link_text: linkText,
    event_category: 'engagement',
  });
};

// User interaction events
export const trackButtonClick = (buttonName: string, buttonLocation?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    event_category: 'engagement',
  });
};

export const trackSearch = (searchTerm: string, resultCount?: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    search_result_count: resultCount,
    event_category: 'engagement',
  });
};

export const trackFormSubmit = (formId: string, formName?: string) => {
  trackEvent('form_submit', {
    form_id: formId,
    form_name: formName,
    event_category: 'conversion',
  });
};

export const trackFormInteraction = (formId: string, fieldName: string) => {
  trackEvent('form_interaction', {
    form_id: formId,
    field_name: fieldName,
    event_category: 'engagement',
  });
};

// Conversion events (non-purchase)
export const trackBuddySchemeSignup = () => {
  trackEvent('buddy_scheme_signup', {
    event_category: 'conversion',
    value: 0, // Free service
  });
};

export const trackSupportGroupJoin = (groupName: string) => {
  trackEvent('support_group_join', {
    group_name: groupName,
    event_category: 'conversion',
    value: 0,
  });
};

export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup', {
    event_category: 'conversion',
    value: 0,
  });
};

export const trackContactFormSubmit = (topic: string) => {
  trackEvent('contact_form_submit', {
    contact_topic: topic,
    event_category: 'conversion',
  });
};

// Custom user properties for segmentation
export const setContentType = (contentType: 'article' | 'guide' | 'tool' | 'page') => {
  setUserProperties({ content_type: contentType });
};

export const setConditionType = (conditionType: string) => {
  setUserProperties({ condition_type: conditionType });
};

export const setUserType = (userType: 'recently_diagnosed' | 'long_term' | 'caregiver' | 'healthcare_professional') => {
  setUserProperties({ user_type: userType });
};

export const setPageEngagementMetrics = (metrics: {
  timeOnPage?: number;
  scrollDepth?: number;
  interactionCount?: number;
}) => {
  const props: EventParams = {};
  if (metrics.timeOnPage) props.time_on_page_ms = metrics.timeOnPage;
  if (metrics.scrollDepth) props.scroll_depth = metrics.scrollDepth;
  if (metrics.interactionCount) props.interaction_count = metrics.interactionCount;

  setUserProperties(props);
};

// E-commerce events (if applicable)
export const trackResourceView = (resourceId: string, resourceName: string, resourceCategory: string) => {
  trackEvent('view_item', {
    items: [
      {
        item_id: resourceId,
        item_name: resourceName,
        item_category: resourceCategory,
      },
    ],
  });
};

export const trackResourceAccess = (resourceId: string, resourceName: string) => {
  trackEvent('resource_access', {
    resource_id: resourceId,
    resource_name: resourceName,
    event_category: 'engagement',
  });
};

// Session/Navigation events
export const trackNavigation = (fromPage: string, toPage: string) => {
  trackEvent('page_navigation', {
    from_page: fromPage,
    to_page: toPage,
    event_category: 'navigation',
  });
};

export const trackInternalLink = (linkText: string, targetPage: string) => {
  trackEvent('click_internal_link', {
    link_text: linkText,
    target_page: targetPage,
    event_category: 'navigation',
  });
};

// Error tracking
export const trackAppError = (errorType: string, errorMessage: string, errorPage?: string) => {
  trackEvent('app_error', {
    error_type: errorType,
    error_message: errorMessage,
    error_page: errorPage,
    event_category: 'error',
  });
};

// Debug helper
export const getGTAGDebugStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  return (window as any).__GTAG_DEBUG__ === true;
};

export const enableGTAGDebug = () => {
  if (typeof window === 'undefined') return;
  (window as any).__GTAG_DEBUG__ = true;
  console.log('[GA4] Debug mode enabled. Check GA4 DebugView in console.');
};
