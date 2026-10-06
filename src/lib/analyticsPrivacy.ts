/** Analytics describe interactions, never user-entered health/contact information. */
export function hasAnalyticsConsent(): boolean {
  try {
    const stored = localStorage.getItem("lwa_cv3");
    if (stored) return JSON.parse(stored).a === true;
    return localStorage.getItem("cookie-consent") === "accepted";
  } catch { return false; }
}

export function safeAnalyticsUrl(value: string): string {
  try {
    const url = new URL(value, "https://livingwitharthritis.org.uk");
    if (!["https:", "http:"].includes(url.protocol)) return "";
    return `${url.origin}${url.pathname}`;
  } catch { return ""; }
}

const PRIVATE_FIELDS = /^(?:email|name|phone|message|search_term|query|topic|condition|condition_type|user_type|error_message|error_reason|link_text)$/i;
export function sanitiseAnalyticsParams(params: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (PRIVATE_FIELDS.test(key) || value === undefined) continue;
    if (typeof value === "string" && /(?:url|location|referrer)$/.test(key)) {
      out[key] = safeAnalyticsUrl(value);
    } else if (Array.isArray(value)) {
      out[key] = value.map(item => typeof item === "object" && item ? sanitiseAnalyticsParams(item as Record<string, unknown>) : item);
    } else if (typeof value === "object" && value !== null) {
      out[key] = sanitiseAnalyticsParams(value as Record<string, unknown>);
    } else if (typeof value !== "string" || (!/@/.test(value) && value.length <= 200)) {
      out[key] = value;
    }
  }
  return out;
}
