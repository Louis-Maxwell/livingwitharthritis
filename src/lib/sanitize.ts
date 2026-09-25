/**
 * Input sanitization utilities to prevent XSS, injection attacks, and data corruption.
 */

/** Strip HTML tags from a string (fixed-point; safe vs incomplete multi-char sanitization). */
export function stripHtml(input: string): string {
  let s = String(input ?? "");
  let prev = "";
  while (s !== prev) {
    prev = s;
    s = s.replace(/<\/?[a-zA-Z][^>]*>/g, "");
  }
  // Neutralize any leftover angle brackets so they cannot form tags later.
  return s.replace(/[<>]/g, "");
}

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: " ",
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
};

/**
 * Decode common HTML entities found in article/FAQ plain text.
 *
 * Single pass: each entity is decoded exactly once, so `&amp;lt;` becomes the
 * literal text `&lt;` and is never decoded a second time into `<`
 * (CodeQL js/double-escaping). Unknown entities are left untouched.
 */
function decodeBasicEntities(input: string): string {
  return input.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, body: string) => {
    if (body[0] === "#") {
      const hex = body[1] === "x" || body[1] === "X";
      const code = hex ? parseInt(body.slice(2), 16) : Number(body.slice(1));
      return Number.isFinite(code) && code > 0 && code < 0x110000
        ? String.fromCodePoint(code)
        : match;
    }
    const named = NAMED_ENTITIES[body.toLowerCase()];
    return named ?? match;
  });
}

/**
 * Convert HTML to readable plain text for FAQ answers, reading-time, and
 * schema. Inserts whitespace at block/br boundaries BEFORE stripping tags so
 * `</p><p>` / `</li><li>` do not mash sentences (`hours.Try` → `hours. Try`).
 * Prefer this over stripHtml whenever the result is shown or counted as prose.
 */
export function htmlToPlainText(input: string): string {
  let s = String(input ?? "");
  // Block / break boundaries → space (before tag removal collapses them).
  s = s.replace(/<br\s*\/?>/gi, " ");
  s = s.replace(/<\/(?:p|div|li|h[1-6]|blockquote|tr|td|th|section|article|figcaption|dt|dd)\s*>/gi, " ");
  s = s.replace(/<(?:p|div|li|h[1-6]|blockquote|tr|td|th|section|article|figcaption|dt|dd)\b[^>]*>/gi, " ");
  // Decode entities before stripHtml so encoded tags are removed and &nbsp; is space.
  s = decodeBasicEntities(s);
  s = stripHtml(s);
  return s.replace(/\s+/g, " ").trim();
}

/** Sanitize user input: trim, strip HTML, limit length, remove null bytes */
export function sanitizeInput(input: string, maxLength = 1000): string {
  return stripHtml(input)
    .replace(/\0/g, "") // Remove null bytes
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Remove control chars
    .trim()
    .slice(0, maxLength);
}

/** Sanitize email: lowercase, trim, validate format */
export function sanitizeEmail(email: string): string | null {
  const cleaned = email.trim().toLowerCase().slice(0, 255);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : null;
}

/** Sanitize phone: allow digits, spaces, dashes, parens, plus */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s\-+()]/g, "").trim().slice(0, 20);
}

/** Escape special characters for safe HTML display */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
    "/": "&#x2F;",
    "`": "&#96;",
  };
  return str.replace(/[&<>"'/`]/g, (m) => map[m]);
}

/** Validate and sanitize a URL (only allow http/https) */
export function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.href;
  } catch {
    return null;
  }
}

/** Check for common SQL injection patterns (for logging/alerting, not as primary defence) */
export function containsSqlInjection(input: string): boolean {
  const patterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|EXEC|UNION)\b)/i,
    /(--|;|\/\*|\*\/|xp_|0x)/i,
    /('|")\s*(OR|AND)\s*('|"|\d)/i,
  ];
  return patterns.some((p) => p.test(input));
}

/** Rate limit tracker for client-side (e.g., form submissions) */
export function createClientRateLimiter(key: string, maxAttempts: number, windowMs: number) {
  return {
    canProceed(): boolean {
      const now = Date.now();
      const raw = sessionStorage.getItem(`rl_${key}`);
      if (!raw) {
        sessionStorage.setItem(`rl_${key}`, JSON.stringify({ count: 1, resetAt: now + windowMs }));
        return true;
      }
      const data = JSON.parse(raw) as { count: number; resetAt: number };
      if (now > data.resetAt) {
        sessionStorage.setItem(`rl_${key}`, JSON.stringify({ count: 1, resetAt: now + windowMs }));
        return true;
      }
      if (data.count >= maxAttempts) return false;
      data.count++;
      sessionStorage.setItem(`rl_${key}`, JSON.stringify(data));
      return true;
    },
  };
}
