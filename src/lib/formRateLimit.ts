/** Best-effort client throttle for forms that hand data to email/payment endpoints.
 *
 * This is a UX and abuse-reduction measure only. Static hosting still needs an
 * edge/WAF limit for enforcement across devices and browsers.
 */
export const FORM_SUBMIT_COOLDOWN_MS = 60_000;

const STORAGE_PREFIX = "lwa-form-submit:";
const memoryTimestamps = new Map<string, number>();

type RateLimitCheck = {
  allowed: boolean;
  retryAfterMs: number;
};

function storageKey(formId: string): string {
  return `${STORAGE_PREFIX}${formId}`;
}

function readTimestamp(formId: string): number | null {
  try {
    const stored = window.localStorage.getItem(storageKey(formId));
    const timestamp = stored ? Number(stored) : NaN;
    return Number.isFinite(timestamp) ? timestamp : null;
  } catch {
    return memoryTimestamps.get(formId) ?? null;
  }
}

export function checkFormRateLimit(
  formId: string,
  now = Date.now(),
): RateLimitCheck {
  const lastSubmitted = readTimestamp(formId);
  if (lastSubmitted === null) return { allowed: true, retryAfterMs: 0 };

  const elapsed = now - lastSubmitted;
  if (elapsed >= FORM_SUBMIT_COOLDOWN_MS || elapsed < 0) {
    return { allowed: true, retryAfterMs: 0 };
  }

  return {
    allowed: false,
    retryAfterMs: FORM_SUBMIT_COOLDOWN_MS - elapsed,
  };
}

export function markFormSubmitted(formId: string, now = Date.now()): void {
  memoryTimestamps.set(formId, now);
  try {
    window.localStorage.setItem(storageKey(formId), String(now));
  } catch {
    // Private browsing or blocked storage: in-memory throttling still applies.
  }
}

export function formRateLimitMessage(retryAfterMs: number): string {
  const seconds = Math.max(1, Math.ceil(retryAfterMs / 1000));
  return `Please wait ${seconds} seconds before submitting this form again.`;
}
