import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getServiceClient } from "../_shared/supabase-client.ts";
import { checkRateLimit, getClientIp } from "../_shared/rate-limiter-v2.ts";
import { errJson, okJson, preflight, newRequestId, parseJsonBody } from "../_shared/http.ts";
import { z, parseWithSchema } from "../_shared/validation.ts";

// Handles 3 actions:
//   POST {action:"confirm", token}        — set confirmed_at
//   POST {action:"preferences", token, frequency, categories}
//   POST {action:"unsubscribe", token}    — flips is_active=false (uses unsubscribe_token)

// 5 requests / minute per IP (email signup category) — see docs/EDGE-FUNCTION-RATE-LIMITING.md


const Schema = z.object({
  action: z.enum(["confirm", "preferences", "unsubscribe"]),
  // Tokens are hex/base64url; restrict to safe charset to block PostgREST
  // metacharacters (commas, dots, parens) that could inject filter clauses.
  token: z.string().trim().min(10).max(200).regex(/^[A-Za-z0-9_-]+$/, "Invalid token format"),
  frequency: z.enum(["weekly", "biweekly", "monthly"]).optional(),
  categories: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);
  const requestId = newRequestId();

  if (req.method !== "POST") {
    return errJson(req, { code: "method_not_allowed", message: "POST only", requestId });
  }
  const service = getServiceClient("confirm-newsletter");

  const rl = await checkRateLimit(service, {
    ip: getClientIp(req),
    tier: "public",
    scope: "confirm-newsletter",
  });
  if (!rl.allowed) {
    return errJson(req, {
      code: "rate_limited",
      message: "Too many requests.",
      requestId,
      headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
    });
  }

  const body = await parseJsonBody(req, requestId);
  if (!body.ok) return body.response;
  const parsed = parseWithSchema(Schema, body.data, req, requestId);
  if (!parsed.ok) return parsed.response;
  const { action, token, frequency, categories } = parsed.data;

  try {
    if (action === "confirm") {
      const { data, error } = await service
        .from("newsletter_subscriptions")
        .update({ confirmed_at: new Date().toISOString() })
        .eq("confirmation_token", token)
        .is("confirmed_at", null)
        .select("id, email")
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        return errJson(req, { code: "not_found", message: "Confirmation link is invalid or already used.", requestId });
      }
      return okJson({ confirmed: true, email: data.email }, req, { requestId });
    }

    if (action === "preferences") {
      const update: Record<string, unknown> = {};
      if (frequency) update.frequency = frequency;
      if (categories) update.categories = categories;
      if (Object.keys(update).length === 0) {
        return errJson(req, { code: "bad_request", message: "Nothing to update.", requestId });
      }
      // Look up the subscription by either token using two parameterised
      // equality queries (NOT a string-interpolated .or filter, which would
      // allow PostgREST filter injection via comma/dot characters in token).
      let subId: string | null = null;
      const byUnsub = await service
        .from("newsletter_subscriptions")
        .select("id")
        .eq("unsubscribe_token", token)
        .maybeSingle();
      if (byUnsub.error) throw byUnsub.error;
      if (byUnsub.data) {
        subId = byUnsub.data.id;
      } else {
        const byConfirm = await service
          .from("newsletter_subscriptions")
          .select("id")
          .eq("confirmation_token", token)
          .maybeSingle();
        if (byConfirm.error) throw byConfirm.error;
        subId = byConfirm.data?.id ?? null;
      }
      if (!subId) {
        return errJson(req, { code: "not_found", message: "Subscription not found.", requestId });
      }
      const { data, error } = await service
        .from("newsletter_subscriptions")
        .update(update)
        .eq("id", subId)
        .select("id, frequency, categories")
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        return errJson(req, { code: "not_found", message: "Subscription not found.", requestId });
      }
      return okJson({ saved: true, frequency: data.frequency, categories: data.categories }, req, { requestId });
    }

    // unsubscribe
    const { data, error } = await service
      .from("newsletter_subscriptions")
      .update({ is_active: false })
      .eq("unsubscribe_token", token)
      .select("id, email")
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      return errJson(req, { code: "not_found", message: "Unsubscribe link is invalid.", requestId });
    }
    return okJson({ unsubscribed: true, email: data.email }, req, { requestId });
  } catch (e) {
    console.error(`[confirm-newsletter:${requestId}]`, e);
    return errJson(req, { code: "server_error", message: "Unexpected error.", requestId });
  }
});
