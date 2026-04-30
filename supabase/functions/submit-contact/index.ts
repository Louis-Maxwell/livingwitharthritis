import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getServiceClient } from "../_shared/supabase-client.ts";
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId } from "../_shared/http.ts";
import { z, parseWithSchema, emailSchema, phoneSchema, shortText, longText } from "../_shared/validation.ts";

const ADMIN_EMAIL = "info@livingwitharthritis.org.uk";

// 5 contact submissions per IP per 15 minutes
const limiter = createRateLimiter({ windowMs: 900_000, maxRequests: 5 });

const ContactSchema = z.object({
  name: shortText(100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: shortText(200),
  message: longText(5000),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();

  try {
    if (!limiter.check(getClientIp(req))) {
      return errJson(req, {
        code: "rate_limited",
        message: "Too many submissions. Please try again in a few minutes.",
        requestId,
        headers: { "Retry-After": "60" },
      });
    }

    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(ContactSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const contact = validated.data;
    const supabase = getServiceClient("submit-contact");

    const { data, error: insertError } = await supabase
      .from("contact_inquiries")
      .insert({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message,
      })
      .select()
      .single();

    if (insertError) {
      console.error(`[${requestId}] Contact insert error:`, insertError);
      return errJson(req, {
        code: "server_error",
        message: "Failed to submit contact form. Please try again.",
        requestId,
      });
    }

    console.log(`[${requestId}] Contact inquiry submitted: ${data.id}`);

    // Fire-and-forget admin notification + visitor confirmation emails
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const sendEmail = async (
      label: string,
      payload: Record<string, unknown>,
    ) => {
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

    await sendEmail("admin-notification", {
      templateName: "contact-admin-notification",
      recipientEmail: ADMIN_EMAIL,
      idempotencyKey: `contact-admin-${data.id}`,
      templateData: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || undefined,
        subject: contact.subject,
        message: contact.message,
      },
    });

    await sendEmail("visitor-confirmation", {
      templateName: "contact-confirmation",
      recipientEmail: contact.email,
      idempotencyKey: `contact-confirm-${data.id}`,
      templateData: { name: contact.name, subject: contact.subject },
    });

    return okJson(
      {
        // Legacy fields kept for backward-compat with existing frontend hooks
        success: true,
        message: "Thank you for contacting us. We'll get back to you soon!",
        contactId: data.id,
      },
      req,
      { requestId },
    );
  } catch (error) {
    console.error(`[${requestId}] Contact unhandled error:`, error);
    return errJson(req, {
      code: "server_error",
      message: "An unexpected error occurred. Please try again.",
      requestId,
    });
  }
});
