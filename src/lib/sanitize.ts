/**
 * Input sanitization utilities to prevent XSS and injection attacks.
 */

/** Strip HTML tags from a string */
export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

/** Sanitize user input: trim, strip HTML, limit length */
export function sanitizeInput(input: string, maxLength = 1000): string {
  return stripHtml(input).trim().slice(0, maxLength);
}

/** Sanitize email: lowercase, trim, validate format */
export function sanitizeEmail(email: string): string | null {
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(cleaned) && cleaned.length <= 255 ? cleaned : null;
}

/** Sanitize phone: allow digits, spaces, dashes, parens, plus */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s\-+()]/g, "").trim().slice(0, 20);
}

/** Escape special characters for safe display */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}
