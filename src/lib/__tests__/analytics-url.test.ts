import { describe, expect, it } from 'vitest';
import { analyticsUrl } from '../analytics-url';
describe('analytics URLs', () => {
  it('keeps an absent referrer absent instead of inventing a self referral', () => {
    expect(analyticsUrl('')).toBeUndefined();
    expect(analyticsUrl('  ')).toBeUndefined();
  });
  it('removes search terms, email parameters, fragments and embedded credentials', () => {
    expect(analyticsUrl('https://user:secret@example.org/search?q=joint+pain&email=test@example.org#symptoms')).toBe('https://example.org/search');
  });
  it('preserves public route paths and rejects contact protocols', () => {
    expect(analyticsUrl('/conditions/osteoarthritis')).toBe('https://livingwitharthritis.org.uk/conditions/osteoarthritis');
    expect(analyticsUrl('mailto:test@example.org')).toBeUndefined();
    expect(analyticsUrl('javascript:alert(1)')).toBeUndefined();
    expect(analyticsUrl('/contact/test%40example.org')).toBe('https://livingwitharthritis.org.uk/');
  });
});

describe('campaign tags', () => {
  it('keeps plain UTM tags so GA4 can attribute WhatsApp shares', () => {
    expect(analyticsUrl('https://livingwitharthritis.org.uk/guides/benefits-pip?utm_source=whatsapp&utm_medium=social_share&utm_campaign=guide_action_card&q=pain#faq'))
      .toBe('https://livingwitharthritis.org.uk/guides/benefits-pip?utm_source=whatsapp&utm_medium=social_share&utm_campaign=guide_action_card');
  });
  it('drops UTM values that could carry contact details or free text', () => {
    expect(analyticsUrl('/guides/benefits-pip?utm_source=me@example.org&utm_campaign=my%20knee%20pain&utm_medium=email'))
      .toBe('https://livingwitharthritis.org.uk/guides/benefits-pip?utm_medium=email');
  });
});
