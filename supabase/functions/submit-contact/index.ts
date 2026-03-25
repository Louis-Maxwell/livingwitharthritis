import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createRateLimiter, getClientIp, rateLimitResponse } from "../_shared/rate-limiter.ts";

const ADMIN_EMAIL = "info@livingwitharthritis.org.uk";
import { createRateLimiter, getClientIp, rateLimitResponse } from "../_shared/rate-limiter.ts";

// 5 contact submissions per IP per 15 minutes
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

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

function validateContact(data: unknown): { valid: boolean; error?: string; contact?: ContactRequest } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, phone, subject, message } = data as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
    return { valid: false, error: "Name is required and must be less than 100 characters" };
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

  if (typeof subject !== "string" || subject.trim().length === 0 || subject.length > 200) {
    return { valid: false, error: "Subject is required and must be less than 200 characters" };
  }

  if (typeof message !== "string" || message.trim().length === 0 || message.length > 5000) {
    return { valid: false, error: "Message is required and must be less than 5000 characters" };
  }

  return {
    valid: true,
    contact: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? (phone as string).trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
    },
  };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = getClientIp(req);
    if (!limiter.check(ip)) {
      return rateLimitResponse(corsHeaders);
    }

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

    const validation = validateContact(requestBody);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { contact } = validation;

    const { data, error: insertError } = await supabase
      .from("contact_inquiries")
      .insert({
        name: contact!.name,
        email: contact!.email,
        phone: contact!.phone,
        subject: contact!.subject,
        message: contact!.message,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Contact insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to submit contact form" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Contact inquiry submitted:", data.id);

    // Send admin notification email
    try {
      await supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'contact-admin-notification',
          recipientEmail: ADMIN_EMAIL,
          idempotencyKey: `contact-admin-${data.id}`,
          templateData: {
            name: contact!.name,
            email: contact!.email,
            phone: contact!.phone || undefined,
            subject: contact!.subject,
            message: contact!.message,
          },
        },
      });
      console.log("Admin notification email queued for contact:", data.id);
    } catch (emailErr) {
      console.error("Admin notification email error:", emailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for contacting us. We'll get back to you soon!",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
