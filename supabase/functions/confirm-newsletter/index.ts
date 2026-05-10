import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getServiceClient } from "../_shared/supabase-client.ts";
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
import { errJson, okJson, preflight, newRequestId, parseJsonBody } from "../_shared/http.ts";
import { z, parseWithSchema } from "../_shared/validation.ts";

// Handles 3 actions:
//   POST {action:"confirm", token}        — set confirmed_at
//   POST {action:"preferences", token, frequency, categories}
//   POST {action:"unsubscribe", token}    — flips is_active=false (uses unsubscribe_token)

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 20 });

const Schema = z.object({
  action: z.enum(["confirm", "preferences", "unsubscribe"]),
  token: z.string().trim().min(10).max(200),
  frequency: z.enum(["weekly", "biweekly", "monthly"]).optional(),
  categories: z.array(z.string().trim().min(1).max(40)).max(10).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);
  const requestId = newRequestId();

  if (req.method !== "POST") {
    return errJson(req, { code: "method_not_allowed", message: "POST only", requestId });
  }
  if (!limiter.check(getClientIp(req))) {
    return errJson(req, { code: "rate_limited", message: "Too many requests.", requestId });
  }

  const body = await parseJsonBody(req, requestId);
  if (!body.ok) return body.response;
  const parsed = parseWithSchema(Schema, body.data, req, requestId);
  if (!parsed.ok) return parsed.response;
  const { action, token, frequency, categories } = parsed.data;

  const service = getServiceClient("confirm-newsletter");

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
      const { data, error } = await service
        .from("newsletter_subscriptions")
        .update(update)
        .or(`unsubscribe_token.eq.${token},confirmation_token.eq.${token}`)
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
