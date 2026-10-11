/** Only public HTTP(S) route locations may enter analytics; query/hash can contain health or contact data. */
export function analyticsUrl(value: string, base = 'https://livingwitharthritis.org.uk'): string | undefined {
  if (!value.trim()) return undefined;
  try {
    const url = new URL(value, base);
    if (!['http:', 'https:'].includes(url.protocol)) return undefined;
    url.username = '';
    url.password = '';
    url.search = '';
    url.hash = '';
    // Contact details occasionally appear in path segments too.
    if (/@|%40/i.test(url.pathname)) url.pathname = '/';
    return url.href;
  } catch {
    return undefined;
  }
}
