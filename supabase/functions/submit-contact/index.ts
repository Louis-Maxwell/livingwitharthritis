 
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getServiceClient } from "../_shared/supabase-client.ts";
import { checkRateLimit, getClientIp, rateLimitResponse } from "../_shared/rate-limiter-v2.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId, getCorsHeaders } from "../_shared/http.ts";
import { z, parseWithSchema, emailSchema, phoneSchema, headerSafeText, longText } from "../_shared/validation.ts";
import { CONTACT_EMAILS } from "../_shared/contact.ts";

const ADMIN_EMAIL = CONTACT_EMAILS.info;

// name and subject both flow into the admin-notification email's Subject
// header (see contact-admin-notification.tsx), so both must be header-safe
// (no embedded CR/LF) to prevent header injection.
const ContactSchema = z.object({
  name: headerSafeText(100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: headerSafeText(200),
  message: longText(5000),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();

  try {
    const supabase = getServiceClient("submit-contact");

    const rl = await checkRateLimit(supabase, {
      ip: getClientIp(req),
      tier: "public",
      scope: "submit-contact",
    });
    if (!rl.allowed) {
      return rateLimitResponse(getCorsHeaders(req), rl.retryAfterSeconds);
    }

    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(ContactSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const contact = validated.data;

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
