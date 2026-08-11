import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getServiceClient } from "../_shared/supabase-client.ts";
import { checkRateLimit, getClientIp, rateLimitResponse } from "../_shared/rate-limiter-v2.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId, getCorsHeaders } from "../_shared/http.ts";
import { z, parseWithSchema, emailSchema } from "../_shared/validation.ts";
import { CONTACT_EMAILS } from "../_shared/contact.ts";
import { generateToken } from "../_shared/tokens.ts";

const ADMIN_EMAIL = CONTACT_EMAILS.info;
const SITE_URL = "https://livingwitharthritis.org.uk";

const NewsletterSchema = z.object({
  email: emailSchema,
  categories: z.array(z.string().trim().min(1).max(40)).max(20).default([]),
  source: z.string().trim().min(1).max(60).default("site"),
  frequency: z.enum(["weekly", "biweekly", "monthly"]).optional(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();

  try {
    const supabase = getServiceClient("submit-newsletter");

    const rl = await checkRateLimit(supabase, {
      ip: getClientIp(req),
      tier: "public",
      scope: "submit-newsletter",
    });
    if (!rl.allowed) {
      return rateLimitResponse(getCorsHeaders(req), rl.retryAfterSeconds);
    }

    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(NewsletterSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const signup = validated.data;
    const confirmationToken = generateToken();
    const unsubscribeToken = generateToken();

    const insertPayload: Record<string, unknown> = {
      email: signup.email,
      categories: signup.categories.length ? signup.categories : ["general"],
      source: signup.source,
      is_active: true,
      confirmation_token: confirmationToken,
      unsubscribe_token: unsubscribeToken,
    };
    if (signup.frequency) insertPayload.frequency = signup.frequency;

    const { data, error: insertError } = await supabase
      .from("newsletter_subscriptions")
      .insert(insertPayload)
      .select("id")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        // Already subscribed — still a success from the visitor's point of
        // view. Deliberately not re-sending a confirmation email here to
        // avoid letting repeated signups be used to spam an address that
        // isn't the requester's own.
        return okJson({ success: true, alreadySubscribed: true }, req, { requestId });
      }
      console.error(`[${requestId}] Newsletter insert error:`, insertError);
      return errJson(req, {
        code: "server_error",
        message: "Failed to subscribe. Please try again.",
        requestId,
      });
    }

    console.log(`[${requestId}] Newsletter signup: ${data.id}`);

    // Fire-and-forget confirmation email to the subscriber + notification to the charity
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const sendEmail = async (label: string, payload: Record<string, unknown>) => {
      try {
        const res = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify(payload),
        });
        const body = await res.text();
        if (!res.ok) console.error(`[${requestId}] ${label} email failed:`, res.status, body);
      } catch (err) {
        console.error(`[${requestId}] ${label} email error:`, err);
      }
    };

    await sendEmail("subscriber-confirmation", {
      templateName: "newsletter-confirmation",
      recipientEmail: signup.email,
      idempotencyKey: `newsletter-confirm-${data.id}`,
      templateData: {
        confirmUrl: `${SITE_URL}/newsletter/confirm?token=${confirmationToken}`,
      },
    });

    await sendEmail("admin-notification", {
      templateName: "newsletter-admin-notification",
      recipientEmail: ADMIN_EMAIL,
      idempotencyKey: `newsletter-admin-${data.id}`,
      templateData: {
        email: signup.email,
        categories: signup.categories.length ? signup.categories : ["general"],
        source: signup.source,
      },
    });

    return okJson({ success: true, subscriptionId: data.id }, req, { requestId });
  } catch (error) {
    console.error(`[${requestId}] Newsletter unhandled error:`, error);
    return errJson(req, {
      code: "server_error",
      message: "An unexpected error occurred. Please try again.",
      requestId,
    });
  }
});
