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
    // Public @handles (for example YouTube/Mastodon) are not email addresses.
    // Decode for the check so encoded contact details cannot bypass it.
    let path = url.pathname;
    try { path = decodeURIComponent(path); } catch { return undefined; }
    if (/[^\s/@]+@[^\s/@]+\.[^\s/@]+/.test(path) || /\+?\d[\d ()-]{8,}\d/.test(path)) url.pathname = '/';
    return url.href;
  } catch {
    return undefined;
  }
}
