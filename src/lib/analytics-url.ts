/**
 * Campaign tags GA4 needs for traffic-source attribution. They are kept on
 * analytics URLs only when their value is a short plain token, so a tag can
 * never carry an email address or free text.
 */
export const CAMPAIGN_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
const SAFE_CAMPAIGN_VALUE = /^[a-z0-9][a-z0-9_.-]{0,59}$/i;

/** Only public HTTP(S) route locations may enter analytics; query/hash can contain health or contact data. */
export function analyticsUrl(value: string, base = 'https://livingwitharthritis.org.uk'): string | undefined {
  if (!value.trim()) return undefined;
  try {
    const url = new URL(value, base);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;
    const campaign = new URLSearchParams();
    for (const key of CAMPAIGN_PARAMS) {
      const v = url.searchParams.get(key);
      if (v && SAFE_CAMPAIGN_VALUE.test(v)) campaign.set(key, v);
    }
    url.username = '';
    url.password = '';
    url.search = campaign.toString();
    url.hash = '';
    // Contact details occasionally appear in path segments too.
    if (/@|%40/i.test(url.pathname)) url.pathname = '/';
    return url.href;
  } catch {
    return undefined;
  }
}
