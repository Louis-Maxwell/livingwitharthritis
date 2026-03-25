import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createRateLimiter, getClientIp, rateLimitResponse } from "../_shared/rate-limiter.ts";

// 10 booking attempts per IP per 30 minutes
const limiter = createRateLimiter({ windowMs: 1_800_000, maxRequests: 10 });

/** Escape HTML special chars to prevent XSS in email bodies */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

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

const VALID_APPOINTMENT_TYPES = [
  "consultation",
  "physiotherapy",
  "follow-up",
  "assessment",
  "treatment",
];

// Available time slots (30-min intervals, 9am-5pm)
const AVAILABLE_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  appointmentType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

function validateAppointment(data: unknown): { valid: boolean; error?: string; appointment?: AppointmentRequest } {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, phone, appointmentType, preferredDate, preferredTime, notes } = data as Record<string, unknown>;

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

  if (typeof appointmentType !== "string" || !VALID_APPOINTMENT_TYPES.includes(appointmentType)) {
    return { valid: false, error: "Invalid appointment type" };
  }

  if (typeof preferredDate !== "string") {
    return { valid: false, error: "Preferred date is required" };
  }
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(preferredDate)) {
    return { valid: false, error: "Invalid date format (use YYYY-MM-DD)" };
  }
  const selectedDate = new Date(preferredDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    return { valid: false, error: "Cannot book appointments in the past" };
  }

  // Check day of week (no weekends)
  const dayOfWeek = selectedDate.getUTCDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return { valid: false, error: "Appointments are only available Monday to Friday" };
  }

  if (typeof preferredTime !== "string" || !AVAILABLE_SLOTS.includes(preferredTime)) {
    return { valid: false, error: "Invalid time slot. Please select an available time." };
  }

  if (notes !== undefined && typeof notes === "string" && notes.length > 1000) {
    return { valid: false, error: "Notes must be less than 1000 characters" };
  }

  return {
    valid: true,
    appointment: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? (phone as string).trim() : undefined,
      appointmentType,
      preferredDate,
      preferredTime,
      notes: notes ? (notes as string).trim() : undefined,
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

    // Handle GET for available slots
    if (req.method === "GET") {
      const url = new URL(req.url);
      const date = url.searchParams.get("date");
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return new Response(
          JSON.stringify({ error: "Valid date parameter required (YYYY-MM-DD)" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Check if weekend
      const checkDate = new Date(date);
      const dow = checkDate.getUTCDay();
      if (dow === 0 || dow === 6) {
        return new Response(
          JSON.stringify({ availableSlots: [], message: "No appointments on weekends" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Fetch booked slots for this date (exclude cancelled)
      const { data: booked } = await supabase
        .from("appointments")
        .select("preferred_time")
        .eq("preferred_date", date)
        .neq("status", "cancelled");

      const bookedTimes = new Set((booked || []).map((a: { preferred_time: string }) => a.preferred_time));
      const availableSlots = AVAILABLE_SLOTS.filter((s) => !bookedTimes.has(s));

      return new Response(
        JSON.stringify({ availableSlots, totalSlots: AVAILABLE_SLOTS.length, bookedCount: bookedTimes.size }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST: book appointment
    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validation = validateAppointment(requestBody);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { appointment } = validation;

    // Require authentication
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Authentication required. Please log in to book an appointment." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const token = authHeader.replace("Bearer ", "");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error: authError } = await authClient.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid session. Please log in again." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const userId = user.id;

    // ---- DOUBLE-BOOKING PREVENTION ----
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("preferred_date", appointment!.preferredDate)
      .eq("preferred_time", appointment!.preferredTime)
      .neq("status", "cancelled")
      .limit(1);

    if (existing && existing.length > 0) {
      return new Response(
        JSON.stringify({ error: "This time slot is already booked. Please choose a different time." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, error: insertError } = await supabase
      .from("appointments")
      .insert({
        user_id: userId,
        name: appointment!.name,
        email: appointment!.email,
        phone: appointment!.phone || null,
        appointment_type: appointment!.appointmentType,
        preferred_date: appointment!.preferredDate,
        preferred_time: appointment!.preferredTime,
        notes: appointment!.notes || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Appointment insert error:", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to book appointment. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send emails (admin + patient confirmation)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const safeName = escapeHtml(appointment!.name);
      const safeEmail = escapeHtml(appointment!.email);
      const safePhone = escapeHtml(appointment!.phone || "Not provided");
      const safeNotes = escapeHtml(appointment!.notes || "None");
      const typeLabel = appointment!.appointmentType.charAt(0).toUpperCase() + appointment!.appointmentType.slice(1);
      const dateFormatted = new Date(appointment!.preferredDate + "T00:00:00").toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });

      // Admin notification
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
          body: JSON.stringify({
            from: "Appointments <onboarding@resend.dev>",
            to: ["info@livingwitharthritis.org.uk"],
            subject: `New Booking: ${safeName} - ${typeLabel} on ${dateFormatted}`,
            html: `
              <h2>New Appointment Booking</h2>
              <table style="border-collapse:collapse;width:100%;max-width:500px;">
                <tr><td style="padding:8px;font-weight:bold;">Patient:</td><td style="padding:8px;">${safeName}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${safeEmail}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${safePhone}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Type:</td><td style="padding:8px;">${typeLabel}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Date:</td><td style="padding:8px;">${dateFormatted}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Time:</td><td style="padding:8px;">${appointment!.preferredTime}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;">Notes:</td><td style="padding:8px;">${safeNotes}</td></tr>
              </table>
              <p style="margin-top:16px;color:#666;">Log in to the admin dashboard to manage this appointment.</p>
            `,
          }),
        });
      } catch (e) {
        console.error("Admin email error:", e instanceof Error ? e.message : "Unknown");
      }

      // Patient confirmation email
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
          body: JSON.stringify({
            from: "Living with Arthritis <onboarding@resend.dev>",
            to: [appointment!.email],
            subject: `Appointment Booking Confirmation - ${dateFormatted}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
                <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:24px;border-radius:12px 12px 0 0;">
                  <h1 style="color:white;margin:0;font-size:22px;">Appointment Confirmed</h1>
                </div>
                <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
                  <p style="color:#374151;font-size:16px;">Dear ${safeName},</p>
                  <p style="color:#374151;font-size:14px;">Thank you for booking with Living with Arthritis. Your appointment has been received and is pending confirmation.</p>
                  <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
                    <h3 style="margin:0 0 12px;color:#1f2937;font-size:16px;">Booking Details</h3>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Type:</strong> ${typeLabel}</p>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Date:</strong> ${dateFormatted}</p>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Time:</strong> ${appointment!.preferredTime}</p>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Reference:</strong> ${data.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <p style="color:#6b7280;font-size:13px;">We will contact you shortly to confirm your appointment. If you need to make changes, please get in touch.</p>
                  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
                  <p style="color:#9ca3af;font-size:12px;margin:0;">Living with Arthritis Clinic · This is an automated message.</p>
                </div>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error("Patient email error:", e instanceof Error ? e.message : "Unknown");
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        appointmentId: data.id,
        message: "Your appointment has been booked successfully! A confirmation email has been sent to you.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Appointment error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
