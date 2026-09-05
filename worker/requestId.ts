/** Stable request id for /api responses (cf-ray when present). */

export function getRequestId(request: Request): string {
  const fromHeader =
    request.headers.get("x-request-id") ||
    request.headers.get("cf-ray") ||
    "";
  if (fromHeader.trim()) return fromHeader.trim().slice(0, 128);
  try {
    return crypto.randomUUID();
  } catch {
    return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}
