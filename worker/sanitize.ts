/** Lightweight sanitizers for the Cloudflare Worker (no frontend imports). */

export function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

export function sanitizeInput(input: string, maxLength = 1000): string {
  return stripHtml(input)
    .replace(/\0/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(email: string): string | null {
  const cleaned = email.trim().toLowerCase().slice(0, 255);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(cleaned) ? cleaned : null;
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s\-+()]/g, "").trim().slice(0, 20);
}
