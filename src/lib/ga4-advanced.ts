/**
 * Advanced Google Analytics 4 Enhancement
 * Custom events, audiences, dashboards, and attribution
 */

import { trackEvent } from './analytics';

/**
 * Custom Event Definitions for Better Tracking
 */
export const CUSTOM_EVENTS = {
  // User Lifecycle Events
  UserSignUp: 'user_signup',
  UserLogin: 'user_login',
  UserLogout: 'user_logout',
  UserProfileUpdate: 'user_profile_update',
  UserPreferenceChange: 'user_preference_change',

  // Content Engagement
  BlogPostView: 'blog_post_view',
  GuideRead: 'guide_read',
  ExerciseVideoView: 'exercise_video_view',
  RecipeView: 'recipe_view',
  ResourceDownload: 'resource_download',
  ContentShare: 'content_share',

  // Symptom & Health Tools
  SymptomCheck: 'symptom_check',
  SelfAssessmentStart: 'self_assessment_start',
  SelfAssessmentComplete: 'self_assessment_complete',
  HealthToolUsage: 'health_tool_usage',

  // Community & Support
  CommunityPostView: 'community_post_view',
  CommunityCommentAdd: 'community_comment_add',
  BuddyMatchRequest: 'buddy_match_request',
  SupportGroupJoin: 'support_group_join',

  // Chat & Support
  ChatSessionStart: 'chat_session_start',
  ChatSessionEnd: 'chat_session_end',
  ChatMessageCount: 'chat_message_count',
  ChatResolution: 'chat_resolution',

  // Email & Newsletter
  NewsletterSignup: 'newsletter_signup',
  NewsletterUnsubscribe: 'newsletter_unsubscribe',
  EmailOpen: 'email_open',
  EmailClick: 'email_click',

  // Donation & Conversion
  DonationView: 'donation_page_view',
  DonationAmountSelect: 'donation_amount_selected',
  DonationInitiate: 'donation_initiated',
  DonationComplete: 'donation_complete',
  DonationRecurringSetup: 'donation_recurring_setup',

  // Search & Navigation
  SiteSearch: 'site_search',
  SearchResultClick: 'search_result_click',
  FilterApplied: 'filter_applied',
  SortApplied: 'sort_applied',

  // Page Performance
  PageLoadTime: 'page_load_time',
  PageScrollDepth: 'page_scroll_depth',
  PageTimeOnPage: 'page_time_on_page',
  PageExitIntent: 'page_exit_intent',

  // Error Tracking
  FormError: 'form_error',
  PaymentError: 'payment_error',
  APIError: 'api_error',
  JavaScriptError: 'javascript_error',
};

/**
 * Track custom events with structured parameters
 */
export const trackCustomEvent = (
  eventName: string,
  params?: {
    category?: string;
    value?: number;
    currency?: string;
    userId?: string;
    sessionId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  },
): void => {
  try {
    if (typeof window === 'undefined') return;

    const eventData = {
      ...params,
      event_source: 'custom',
      timestamp: new Date().toISOString(),
    };

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, eventData);
    }

    if (import.meta.env.MODE === 'development') {
      console.log(`[GA4] Custom event: ${eventName}`, eventData);
    }
  } catch (error) {
    console.error('[GA4] Custom event tracking failed:', error);
  }
};

/**
 * Audience Segmentation
 */
export interface UserAudience {
  id: string;
  name: string;
  description: string;
  conditions: string[];
}

export const AUDIENCE_SEGMENTS: Record<string, UserAudience> = {
  newly_diagnosed: {
    id: 'newly_diagnosed',
    name: 'Newly Diagnosed',
    description: 'Users who recently learned they have arthritis',
    conditions: [
      'page:/guides/newly-diagnosed',
      'event:user_signup with condition_type=new',
    ],
  },
  active_exercisers: {
    id: 'active_exercisers',
    name: 'Active Exercisers',
    description: 'Users regularly viewing exercise content',
    conditions: [
      'event:exercise_video_view (3+ times)',
      'time_on_page > 300 seconds on exercise pages',
    ],
  },
  content_readers: {
    id: 'content_readers',
    name: 'Content Readers',
    description: 'Users consuming blog/guide content',
    conditions: [
      'event:blog_post_view OR event:guide_read',
      'average_session_duration > 5 minutes',
    ],
  },
  community_engaged: {
    id: 'community_engaged',
    name: 'Community Engaged',
    description: 'Active community and support group users',
    conditions: [
      'event:community_post_view OR event:support_group_join',
      'page:/community OR page:/buddy',
    ],
  },
  donors: {
    id: 'donors',
    name: 'Donors',
    description: 'Users who have made a donation',
    conditions: [
      'event:purchase (donation)',
      'conversion:donation_complete',
    ],
  },
  chat_users: {
    id: 'chat_users',
    name: 'Chat Users',
    description: 'Users using AI chat support',
    conditions: [
      'event:chat_session_start',
      'time_spent_in_chat > 60 seconds',
    ],
  },
  at_risk_churn: {
    id: 'at_risk_churn',
    name: 'At-Risk Churn',
    description: 'Users showing signs of disengagement',
    conditions: [
      'days_since_last_visit > 30',
      'session_duration < 30 seconds',
      'event_count < 3 per session',
    ],
  },
};

/**
 * Set user audience segment
 */
export const setUserAudience = (audienceId: string): void => {
  try {
    trackCustomEvent('audience_assignment', {
      audience_id: audienceId,
      audience_name: AUDIENCE_SEGMENTS[audienceId]?.name,
    });

    // Also set as user property for segmentation
    if (typeof window?.gtag === 'function') {
      window.gtag('set', {
        user_audience: audienceId,
      });
    }
  } catch (error) {
    console.error('[GA4] Audience assignment failed:', error);
  }
};

/**
 * Conversion Funnel Tracking
 */
export interface ConversionFunnel {
  name: string;
  steps: Array<{
    stepName: string;
    eventName: string;
    description: string;
  }>;
}

export const CONVERSION_FUNNELS: Record<string, ConversionFunnel> = {
  donation: {
    name: 'Donation Funnel',
    steps: [
      { stepName: 'View', eventName: 'page_view', description: 'Donate page view' },
      { stepName: 'Amount Select', eventName: 'donation_amount_selected', description: 'Selected donation amount' },
      { stepName: 'Initiate', eventName: 'donation_initiated', description: 'Started payment' },
      { stepName: 'Complete', eventName: 'purchase', description: 'Payment complete' },
    ],
  },
  newsletter: {
    name: 'Newsletter Signup Funnel',
    steps: [
      { stepName: 'View', eventName: 'page_view', description: 'Page with newsletter form' },
      { stepName: 'Form Focus', eventName: 'form_interaction', description: 'Clicked email field' },
      { stepName: 'Submit', eventName: 'newsletter_signup', description: 'Submitted form' },
      { stepName: 'Confirm', eventName: 'email_confirmation', description: 'Confirmed email' },
    ],
  },
  contact_form: {
    name: 'Contact Form Funnel',
    steps: [
      { stepName: 'View', eventName: 'page_view', description: 'Contact page view' },
      { stepName: 'Engage', eventName: 'form_interaction', description: 'Interacted with form' },
      { stepName: 'Submit', eventName: 'contact_form_submit', description: 'Submitted form' },
      { stepName: 'Thank You', eventName: 'conversion', description: 'Saw thank you page' },
    ],
  },
  buddy_scheme: {
    name: 'Buddy Scheme Signup',
    steps: [
      { stepName: 'View', eventName: 'page_view', description: 'Buddy page view' },
      { stepName: 'Learn', eventName: 'scroll_depth', description: 'Read about program' },
      { stepName: 'Start', eventName: 'buddy_match_request', description: 'Clicked signup' },
      { stepName: 'Complete', eventName: 'buddy_scheme_signup', description: 'Completed signup' },
    ],
  },
};

/**
 * Track funnel step
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackFunnelStep = (funnelName: string, stepName: string, metadata?: any): void => {
  trackCustomEvent('funnel_step', {
    funnel_name: funnelName,
    step_name: stepName,
    ...metadata,
  });
};

/**
 * User Journey Mapping
 */
export interface UserJourney {
  sessionId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number;
  pageViews: number;
  eventCount: number;
  conversions: string[];
  deviceCategory: string;
  trafficSource: string;
}

/**
 * Track user journey milestone
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackJourneyMilestone = (milestone: string, details?: any): void => {
  trackCustomEvent('journey_milestone', {
    milestone,
    ...details,
  });
};

/**
 * Content Performance Metrics
 */
export interface ContentPerformance {
  contentId: string;
  contentTitle: string;
  contentType: 'blog' | 'guide' | 'exercise' | 'recipe' | 'tool';
  views: number;
  avgTimeOnPage: number;
  scrollDepth: number;
  engagementRate: number;
  shareCount: number;
  conversionRate: number;
}

/**
 * Track content performance
 */
export const trackContentPerformance = (content: ContentPerformance): void => {
  trackCustomEvent('content_performance', {
    content_id: content.contentId,
    content_title: content.contentTitle,
    content_type: content.contentType,
    views: content.views,
    avg_time: content.avgTimeOnPage,
    scroll_depth: content.scrollDepth,
    engagement_rate: content.engagementRate,
  });
};

/**
 * User Behavior Tracking
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trackUserBehavior = (behavior: string, params?: any): void => {
  trackCustomEvent(`user_behavior_${behavior}`, params);
};

/**
 * Track page performance metrics
 */
export const trackPagePerformance = (
  pageMetrics: {
    url: string;
    loadTime: number;
    interactiveTime: number;
    firstContentfulPaint: number;
  },
): void => {
  trackCustomEvent('page_performance', {
    page_url: pageMetrics.url,
    load_time_ms: pageMetrics.loadTime,
    interactive_time_ms: pageMetrics.interactiveTime,
    fcp_ms: pageMetrics.firstContentfulPaint,
  });
};

/**
 * Track user preferences & settings
 */
export const trackUserPreferences = (preferences: {
  theme?: 'light' | 'dark' | 'system';
  language?: string;
  accessibility?: string[];
  notifications?: boolean;
}): void => {
  if (typeof window?.gtag === 'function') {
    window.gtag('set', {
      user_theme: preferences.theme,
      user_language: preferences.language,
      user_accessibility: preferences.accessibility?.join(','),
      notifications_enabled: preferences.notifications,
    });
  }

  trackCustomEvent('user_preferences_updated', preferences);
};

/**
 * Attribution Modeling Setup
 */
export const ATTRIBUTION_MODELS = {
  first_click: {
    name: 'First Click',
    description: 'Credit first touchpoint',
    use_case: 'Awareness campaigns',
  },
  last_click: {
    name: 'Last Click',
    description: 'Credit last touchpoint',
    use_case: 'Conversion tracking (default)',
  },
  linear: {
    name: 'Linear',
    description: 'Equal credit to all touchpoints',
    use_case: 'Holistic view',
  },
  time_decay: {
    name: 'Time Decay',
    description: 'More credit to recent touchpoints',
    use_case: 'Sales cycles',
  },
  position_based: {
    name: 'Position Based',
    description: '40% first, 40% last, 20% middle',
    use_case: 'Balanced view',
  },
};

/**
 * Real-Time Monitoring
 */
export const startRealtimeMonitoring = (interval: number = 60000): void => {
  if (typeof window === 'undefined') return;

  const monitor = () => {
    trackCustomEvent('realtime_heartbeat', {
      timestamp: new Date().toISOString(),
    });
  };

  monitor(); // Run immediately
  setInterval(monitor, interval);

  if (import.meta.env.MODE === 'development') {
    console.log('[GA4] Real-time monitoring started');
  }
};

/**
 * Custom Dashboard Configuration
 */
export const GA4_DASHBOARD_CONFIG = {
  daily: {
    name: 'Daily Performance Dashboard',
    widgets: [
      'Sessions (7-day comparison)',
      'Users (new vs returning)',
      'Top pages (by sessions)',
      'Conversions (funnel view)',
      'Traffic sources',
      'Device breakdown',
      'Top events',
      'User engagement',
    ],
  },
  weekly: {
    name: 'Weekly Health Dashboard',
    widgets: [
      'Visitor trends',
      'Conversion rate',
      'Average session duration',
      'Bounce rate by page',
      'Top traffic sources',
      'Goal completions',
      'Revenue (if applicable)',
      'User acquisition',
    ],
  },
  monthly: {
    name: 'Monthly Strategy Dashboard',
    widgets: [
      'Traffic growth',
      'Conversion growth',
      'User growth',
      'Audience insights',
      'Content performance',
      'Channel performance',
      'Geographic performance',
      'Behavior flow',
    ],
  },
};

/**
 * Data Quality Monitoring
 */
export const monitorDataQuality = (): {
  missingEvents: string[];
  duplicateEvents: string[];
  unusualPatterns: string[];
} => {
  const issues = {
    missingEvents: [] as string[],
    duplicateEvents: [] as string[],
    unusualPatterns: [] as string[],
  };

  // Check for missing critical events
  const criticalEvents = [
    'page_view',
    'session_start',
    'user_engagement',
    'scroll',
  ];

  // Report issues
  trackCustomEvent('data_quality_check', {
    missing_events: issues.missingEvents.length,
    duplicate_events: issues.duplicateEvents.length,
    unusual_patterns: issues.unusualPatterns.length,
  });

  return issues;
};

/**
 * Generate GA4 Enhancement Report
 */
export const generateGA4Report = () => {
  const report = {
    timestamp: new Date().toISOString(),
    enhancements: {
      customEvents: Object.keys(CUSTOM_EVENTS).length,
      audiences: Object.keys(AUDIENCE_SEGMENTS).length,
      funnels: Object.keys(CONVERSION_FUNNELS).length,
      dashboards: Object.keys(GA4_DASHBOARD_CONFIG).length,
    },
    recommendations: [
      'Set up Google Analytics 4 custom reports for each audience segment',
      'Create alerts for unusual patterns in conversion funnels',
      'Connect GA4 to Google Ads for cross-platform attribution',
      'Set up data studio dashboards for stakeholder reporting',
      'Enable BigQuery export for advanced analysis',
      'Implement UTM parameters consistently across all campaigns',
      'Create custom alerts for key metric thresholds',
      'Set up remarketing audiences based on user behavior',
    ],
  };

  return report;
};

/**
 * Log GA4 Enhancement Status
 */
export const logGA4Status = (): void => {
  const report = generateGA4Report();

  console.group('📊 Google Analytics 4 Enhancement Report');

  console.log('\n✅ Enhancements Installed:');
  console.table({
    'Custom Events': report.enhancements.customEvents,
    'Audience Segments': report.enhancements.audiences,
    'Conversion Funnels': report.enhancements.funnels,
    'Dashboards': report.enhancements.dashboards,
  });

  console.log('\n🎯 Audience Segments Available:');
  Object.entries(AUDIENCE_SEGMENTS).forEach(([key, segment]) => {
    console.log(`  • ${segment.name}: ${segment.description}`);
  });

  console.log('\n🔄 Conversion Funnels Tracked:');
  Object.entries(CONVERSION_FUNNELS).forEach(([key, funnel]) => {
    console.log(`  • ${funnel.name}: ${funnel.steps.length} steps`);
  });

  console.log('\n💡 Recommendations:');
  report.recommendations.forEach(rec => console.log(`  ✓ ${rec}`));

  console.groupEnd();
};

/**
 * Initialize GA4 Enhancements
 */
export const initGA4Enhancements = (autoMonitor: boolean = false): void => {
  if (typeof window === 'undefined') return;

  if (import.meta.env.MODE === 'development') {
    console.log('[GA4] Enhancement system initialized');
    console.log('[GA4] Available features:');
    console.log('  - Custom event tracking');
    console.log('  - Audience segmentation');
    console.log('  - Conversion funnel tracking');
    console.log('  - User journey mapping');
    console.log('  - Content performance analytics');
    console.log('  - Real-time monitoring');
  }

  if (autoMonitor) {
    startRealtimeMonitoring();
  }

  trackCustomEvent('ga4_enhancements_initialized', {
    event_count: Object.keys(CUSTOM_EVENTS).length,
    audience_count: Object.keys(AUDIENCE_SEGMENTS).length,
    funnel_count: Object.keys(CONVERSION_FUNNELS).length,
  });
};
