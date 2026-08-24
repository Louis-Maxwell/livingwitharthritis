/**
 * Conversion Tracking System
 * Centralized conversion event tracking for key business actions
 * Works with GA4 goal/event conversions
 */

import {
  trackDonationInitiate,
  trackDonationComplete,
  trackContactSubmit,
  trackNewsletterSignup,
  trackBuddySchemeSignup,
  trackSupportGroupJoin,
  trackEvent,
} from './analytics';

/**
 * Conversion funnel steps
 */
export enum ConversionStep {
  // Donation funnel
  DonationView = 'donation_page_view',
  DonationAmountSelect = 'donation_amount_selected',
  DonationInitiate = 'donation_initiated',
  DonationProcessing = 'donation_processing',
  DonationComplete = 'donation_complete',
  DonationError = 'donation_error',

  // Newsletter funnel
  NewsletterPromptView = 'newsletter_prompt_view',
  NewsletterFieldFocus = 'newsletter_field_focus',
  NewsletterSignupAttempt = 'newsletter_signup_attempt',
  NewsletterSignupSuccess = 'newsletter_signup_complete',
  NewsletterSignupError = 'newsletter_signup_error',

  // Contact funnel
  ContactFormView = 'contact_form_view',
  ContactFieldFocus = 'contact_field_focus',
  ContactFormAttempt = 'contact_form_attempt',
  ContactFormSuccess = 'contact_form_complete',
  ContactFormError = 'contact_form_error',

  // Support/Community funnel
  BuddySchemeView = 'buddy_scheme_view',
  BuddySchemeSignupAttempt = 'buddy_signup_attempt',
  BuddySchemeSignupComplete = 'buddy_signup_complete',
  SupportGroupView = 'support_group_view',
  SupportGroupJoinAttempt = 'support_group_join_attempt',
  SupportGroupJoinComplete = 'support_group_join_complete',
}

/**
 * Track a conversion funnel step
 */
export const trackConversionStep = (
  step: ConversionStep,
  metadata?: Record<string, string | number | boolean | undefined>,
): void => {
  trackEvent('conversion_funnel_step', {
    step,
    ...metadata,
    event_category: 'conversion',
  });
};

/**
 * Donation conversion flow
 */
export const trackDonationFlow = {
  viewPage: (): void => {
    trackConversionStep(ConversionStep.DonationView);
  },

  selectAmount: (amount: number, type: 'one-time' | 'monthly'): void => {
    trackConversionStep(ConversionStep.DonationAmountSelect, {
      amount,
      donation_type: type,
    });
  },

  initiate: (amount: number, type: 'one-time' | 'monthly'): void => {
    trackConversionStep(ConversionStep.DonationInitiate, {
      amount,
      donation_type: type,
    });
    trackDonationInitiate(amount);
  },

  processing: (transactionId: string, amount: number): void => {
    trackConversionStep(ConversionStep.DonationProcessing, {
      transaction_id: transactionId,
      amount,
    });
  },

  complete: (transactionId: string, amount: number, type: 'one-time' | 'monthly'): void => {
    trackConversionStep(ConversionStep.DonationComplete, {
      transaction_id: transactionId,
      amount,
      donation_type: type,
    });
    trackDonationComplete({
      transactionId,
      amount,
      donationType: type,
    });
  },

  error: (reason: string, step?: string): void => {
    trackConversionStep(ConversionStep.DonationError, {
      error_reason: reason,
      step_failed: step ?? 'unknown',
    });
  },
};

/**
 * Newsletter conversion flow
 */
export const trackNewsletterFlow = {
  viewPrompt: (location: string): void => {
    trackConversionStep(ConversionStep.NewsletterPromptView, {
      prompt_location: location,
    });
  },

  fieldFocus: (fieldType: 'email' | 'name'): void => {
    trackConversionStep(ConversionStep.NewsletterFieldFocus, {
      field_type: fieldType,
    });
  },

  signupAttempt: (email?: string): void => {
    trackConversionStep(ConversionStep.NewsletterSignupAttempt, {
      has_email: !!email,
    });
  },

  signupSuccess: (): void => {
    trackConversionStep(ConversionStep.NewsletterSignupSuccess);
    trackNewsletterSignup();
  },

  signupError: (reason: string): void => {
    trackConversionStep(ConversionStep.NewsletterSignupError, {
      error_reason: reason,
    });
  },
};

/**
 * Contact form conversion flow
 */
export const trackContactFlow = {
  viewForm: (topic?: string): void => {
    trackConversionStep(ConversionStep.ContactFormView, {
      topic: topic ?? 'general',
    });
  },

  fieldFocus: (fieldName: string): void => {
    trackConversionStep(ConversionStep.ContactFieldFocus, {
      field_name: fieldName,
    });
  },

  formAttempt: (topic?: string, fieldCount?: number): void => {
    trackConversionStep(ConversionStep.ContactFormAttempt, {
      topic: topic ?? 'general',
      fields_filled: fieldCount,
    });
  },

  formSuccess: (topic?: string): void => {
    trackConversionStep(ConversionStep.ContactFormSuccess, {
      topic: topic ?? 'general',
    });
    trackContactSubmit({ topic });
  },

  formError: (reason: string): void => {
    trackConversionStep(ConversionStep.ContactFormError, {
      error_reason: reason,
    });
  },
};

/**
 * Support/Community conversion flows
 */
export const trackCommunityFlow = {
  buddy: {
    viewPage: (): void => {
      trackConversionStep(ConversionStep.BuddySchemeView);
    },

    signupAttempt: (): void => {
      trackConversionStep(ConversionStep.BuddySchemeSignupAttempt);
    },

    signupComplete: (): void => {
      trackConversionStep(ConversionStep.BuddySchemeSignupComplete);
      trackBuddySchemeSignup();
    },
  },

  supportGroup: {
    viewPage: (groupName?: string): void => {
      trackConversionStep(ConversionStep.SupportGroupView, {
        group_name: groupName ?? 'unknown',
      });
    },

    joinAttempt: (groupName: string): void => {
      trackConversionStep(ConversionStep.SupportGroupJoinAttempt, {
        group_name: groupName,
      });
    },

    joinComplete: (groupName: string): void => {
      trackConversionStep(ConversionStep.SupportGroupJoinComplete, {
        group_name: groupName,
      });
      trackSupportGroupJoin(groupName);
    },
  },
};

/**
 * Get conversion funnel analysis
 * Returns data structure for GA4 Funnel Exploration analysis
 */
export interface ConversionFunnelReport {
  funnelName: string;
  steps: ConversionStep[];
  completionRate: number;
  dropoffRate: number;
  avgTimeToCompletion: number;
}

/**
 * Calculate funnel completion
 * To be used with GA4 Funnel Exploration or custom reporting
 */
export const calculateFunnelCompletion = (
  startEvent: string,
  completionEvent: string,
  sessionData: any[],
): { completion: number; dropoff: number } => {
  const startCount = sessionData.filter((e) => e.event === startEvent).length;
  const completionCount = sessionData.filter((e) => e.event === completionEvent).length;

  return {
    completion: startCount > 0 ? (completionCount / startCount) * 100 : 0,
    dropoff: startCount > 0 ? ((startCount - completionCount) / startCount) * 100 : 0,
  };
};

/**
 * Initialize conversion tracking
 * Sets up default conversion events in GA4
 */
export const initConversionTracking = (): void => {
  if (typeof window === 'undefined') return;

  if (import.meta.env.MODE === 'development') {
    console.log('[Conversions] Tracking initialized');
    console.log('[Conversions] Key conversions: donation, newsletter, contact, buddy, support-group');
  }
};

/**
 * Log current conversion tracking status (for debugging)
 */
export const logConversionStatus = (): void => {
  if (import.meta.env.MODE === 'development') {
    console.table({
      'Donation Tracking': 'enabled',
      'Newsletter Tracking': 'enabled',
      'Contact Form Tracking': 'enabled',
      'Buddy Scheme Tracking': 'enabled',
      'Support Group Tracking': 'enabled',
    });
  }
};
