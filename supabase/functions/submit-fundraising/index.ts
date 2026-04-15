import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createRateLimiter, getClientIp, rateLimitResponse } from "../_shared/rate-limiter.ts";

const ADMIN_EMAIL = "info@livingwitharthritis.org.uk";

// 5 fundraising submissions per IP per 15 minutes
const limiter = createRateLimiter({ windowMs: 900_000, maxRequests: 5 });

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const isAllowed =
    origin.endsWith(".lovable.app") ||
    origin.endsWith(".lovableproject.com") ||
    origin === "https://livingwitharthritis.org.uk" ||
    origin === "https://www.livingwitharthritis.org.uk" ||
    origin.startsWith("http://localhost:");

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "https://livingwitharthritis.lovable.app",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

const VALID_INQUIRY_TYPES = [
  "Corporate Partnerships",
  "Leave a gift in your Will",
  "Fundraising Events",
  "Community Fundraising",
  "Meet our Fundraisers",
  "Volunteer with Us",
  "Philanthropy and Major Gifts",
];

interface FundraisingRequest {
  inquiryType: string;
  organizationName?: string;
  contactName: string;
  email: string;
  phone?: string;
  message?: string;
}

function validateFundraising(data: unknown): { valid: boolean; error?: string; inquiry?: FundraisingRequest } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { inquiryType, organizationName, contactName, email, phone, message } = data as Record<string, unknown>;

  if (typeof inquiryType !== "string" || !VALID_INQUIRY_TYPES.includes(inquiryType)) {
    return { valid: false, error: "Invalid inquiry type" };
  }

  if (organizationName !== undefined && typeof organizationName === "string" && organizationName.length > 200) {
    return { valid: false, error: "Organization name is too long" };
  }

  if (typeof contactName !== "string" || contactName.trim().length === 0 || contactName.length > 100) {
    return { valid: false, error: "Contact name is required and must be less than 100 characters" };
  }

  if (typeof email !== "string") {
    return { valid: false, error: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 255) {
    return { valid: false, error: "Invalid email address" };
  }

  if (phone !== undefined && typeof phone === "string" && phone.length > 20) {
    return { valid: false, error: "Phone number is too long" };
  }

  if (message !== undefined && typeof message === "string" && message.length > 2000) {
    return { valid: false, error: "Message must be less than 2000 characters" };
  }

  return {
    valid: true,
    inquiry: {
      inquiryType,
      organizationName: organizationName ? (organizationName as string).trim() : undefined,
      contactName: contactName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? (phone as string).trim() : undefined,
      message: message ? (message as string).trim() : undefined,
    },
  };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateFundraising(requestBody);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { inquiry } = validation;

    const { data, error: insertError } = await supabase
      .from("fundraising_inquiries")
      .insert({
        inquiry_type: inquiry!.inquiryType,
        organization_name: inquiry!.organizationName,
        contact_name: inquiry!.contactName,
        email: inquiry!.email,
        phone: inquiry!.phone,
        message: inquiry!.message,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Fundraising insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit inquiry" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Fundraising inquiry submitted:", data.id);

    // Send admin notification email
    try {
      const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          templateName: 'fundraising-admin-notification',
          recipientEmail: ADMIN_EMAIL,
          idempotencyKey: `fundraising-admin-${data.id}`,
          templateData: {
            contactName: inquiry!.contactName,
            email: inquiry!.email,
            phone: inquiry!.phone || undefined,
            inquiryType: inquiry!.inquiryType,
            organizationName: inquiry!.organizationName || undefined,
            message: inquiry!.message || undefined,
          },
        }),
      });
      const emailBody = await emailRes.text();
      if (!emailRes.ok) {
        console.error("Admin notification email failed:", emailRes.status, emailBody);
      } else {
        console.log("Admin notification email queued for fundraising:", data.id);
      }
    } catch (emailErr) {
      console.error("Admin notification email error:", emailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for your interest! Our team will contact you soon.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Fundraising error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
