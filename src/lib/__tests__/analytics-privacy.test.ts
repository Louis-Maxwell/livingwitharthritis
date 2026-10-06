import { beforeEach, describe, expect, it, vi } from 'vitest';
import { hasAnalyticsConsent, safeAnalyticsUrl, sanitiseAnalyticsParams } from '../analyticsPrivacy';
import { trackEvent, trackNewsletterSignup, trackSearch, trackContactSubmit, trackDonationComplete } from '../analytics';
import { getPerformanceReport } from '../analytics-monitor';

describe('privacy and outcome semantics', () => {
  beforeEach(() => { localStorage.clear(); window.gtag = vi.fn(); window.dataLayer = []; });
  it('drops events before consent and after withdrawal, including the dataLayer fallback', () => {
    trackEvent('test'); expect(window.gtag).not.toHaveBeenCalled();
    localStorage.setItem('cookie-consent','accepted'); trackEvent('test'); expect(window.gtag).toHaveBeenCalledTimes(1);
    localStorage.setItem('lwa_cv3',JSON.stringify({a:false})); trackEvent('test'); expect(window.gtag).toHaveBeenCalledTimes(1);
    window.gtag=undefined; trackEvent('test'); expect(window.dataLayer).toEqual([]);
    expect(hasAnalyticsConsent()).toBe(false);
  });
  it('removes free text, health properties and URL query/fragment tokens', () => {
    expect(safeAnalyticsUrl('https://example.com/path?email=private@example.com#token')).toBe('https://example.com/path');
    expect(sanitiseAnalyticsParams({search_term:'my diagnosis', condition_type:'RA', error_message:'private', page_location:'https://example.com/search?q=private', form_id:'newsletter'})).toEqual({page_location:'https://example.com/search',form_id:'newsletter'});
  });
  it('does not duplicate confirmed subscriptions as leads or assign artificial values', () => {
    localStorage.setItem('cookie-consent','accepted'); trackNewsletterSignup(); trackContactSubmit({topic:'sensitive health details'});
    expect(window.gtag).toHaveBeenCalledTimes(2);
    expect(window.gtag).toHaveBeenNthCalledWith(1,'event','newsletter_signup',{method:'confirmed_subscription',form_id:'newsletter'});
    expect(window.gtag).toHaveBeenNthCalledWith(2,'event','generate_lead',{method:'contact_form',lead_type:'contact',form_id:'contact'});
  });
  it('records result counts without raw searches and rejects incomplete donation receipts', () => {
    localStorage.setItem('cookie-consent','accepted'); trackSearch('my private symptoms',0);
    expect(JSON.stringify(vi.mocked(window.gtag!).mock.calls)).not.toContain('private');
    trackDonationComplete({transactionId:'',amount:0}); expect(window.gtag).toHaveBeenCalledTimes(2);
  });
  it('never reports good performance from an empty sample', () => { expect(getPerformanceReport().sampleStatus).toBe('pending'); expect(getPerformanceReport().allGood).toBe(false); });
});
