// Shared token generator for edge functions that need an unguessable,
// URL-safe identifier (email confirmation links, unsubscribe links, etc).

/** Generate a cryptographically random 32-byte hex token. */
export function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
