import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getServiceClient } from "../_shared/supabase-client.ts";
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId } from "../_shared/http.ts";
import { z, parseWithSchema, emailSchema, phoneSchema, shortText, longText } from "../_shared/validation.ts";

const ADMIN_EMAIL = "info@livingwitharthritis.org.uk";

// 5 fundraising submissions per IP per 15 minutes
const limiter = createRateLimiter({ windowMs: 900_000, maxRequests: 5 });

const VALID_INQUIRY_TYPES = [
  "Corporate Partnerships",
  "Leave a gift in your Will",
  "Fundraising Events",
  "Community Fundraising",
  "Meet our Fundraisers",
  "Volunteer with Us",
  "Philanthropy and Major Gifts",
] as const;

const FundraisingSchema = z.object({
  inquiryType: z.enum(VALID_INQUIRY_TYPES, {
    errorMap: () => ({ message: "Invalid inquiry type" }),
  }),
  organizationName: shortText(200).optional(),
  contactName: shortText(100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: longText(2000).optional(),
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

    const validated = parseWithSchema(FundraisingSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const inquiry = validated.data;
    const supabase = getServiceClient("submit-fundraising");

    const { data, error: insertError } = await supabase
      .from("fundraising_inquiries")
      .insert({
        inquiry_type: inquiry.inquiryType,
        organization_name: inquiry.organizationName,
        contact_name: inquiry.contactName,
        email: inquiry.email,
        phone: inquiry.phone,
        message: inquiry.message,
      })
      .select()
      .single();

    if (insertError) {
      console.error(`[${requestId}] Fundraising insert error:`, insertError);
      return errJson(req, {
        code: "server_error",
        message: "Failed to submit inquiry. Please try again.",
        requestId,
      });
    }

    console.log(`[${requestId}] Fundraising inquiry submitted: ${data.id}`);

    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          templateName: "fundraising-admin-notification",
          recipientEmail: ADMIN_EMAIL,
          idempotencyKey: `fundraising-admin-${data.id}`,
          templateData: {
            contactName: inquiry.contactName,
            email: inquiry.email,
            phone: inquiry.phone || undefined,
            inquiryType: inquiry.inquiryType,
            organizationName: inquiry.organizationName || undefined,
            message: inquiry.message || undefined,
          },
        }),
      });
      const body = await emailRes.text();
      if (!emailRes.ok) console.error(`[${requestId}] Admin email failed:`, emailRes.status, body);
    } catch (err) {
      console.error(`[${requestId}] Admin email error:`, err);
    }

    return okJson(
      {
        success: true,
        message: "Thank you for your interest! Our team will contact you soon.",
        inquiryId: data.id,
      },
      req,
      { requestId },
    );
  } catch (error) {
    console.error(`[${requestId}] Fundraising unhandled error:`, error);
    return errJson(req, {
      code: "server_error",
      message: "An unexpected error occurred. Please try again.",
      requestId,
    });
  }
});
