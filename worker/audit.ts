import type { KvLike } from "./rateLimit";

/**
 * Short metadata-only audit line for form submissions.
 * Never stores full medical message bodies — email already carries those.
 */

async function hashIp(ip: string): Promise<string> {
  try {
    const data = new TextEncoder().encode(`lwa:${ip}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    const bytes = new Uint8Array(digest);
    return [...bytes]
      .slice(0, 8)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch {
    return "unknown";
  }
}

export async function logSubmission(
  kv: KvLike | undefined,
  meta: {
    type: "contact" | "appointment";
    ip: string;
    subject?: string;
    requestId: string;
  },
): Promise<void> {
  if (!kv) return;
  try {
    const ipHash = await hashIp(meta.ip);
    const time = new Date().toISOString();
    const subject = (meta.subject || "").slice(0, 80);
    const line = JSON.stringify({
      type: meta.type,
      time,
      ipHash,
      subject,
      requestId: meta.requestId,
    });
    const key = `sub:${time}:${meta.type}:${ipHash}`;
    await kv.put(key, line, { expirationTtl: 60 * 60 * 24 * 90 }); // 90 days
  } catch (err) {
    console.error("SUBMISSIONS KV write skipped", err);
  }
}
