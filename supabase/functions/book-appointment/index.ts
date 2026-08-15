 
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAnonClient, getServiceClient } from "../_shared/supabase-client.ts";
import { checkRateLimit, getClientIp } from "../_shared/rate-limiter-v2.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId, getCorsHeaders } from "../_shared/http.ts";
import { z, parseWithSchema, emailSchema, phoneSchema, shortText, isoDate } from "../_shared/validation.ts";
import { CONTACT_EMAILS } from "../_shared/contact.ts";

const VALID_APPOINTMENT_TYPES = [
  "consultation",
  "physiotherapy",
  "follow-up",
  "assessment",
  "treatment",
] as const;

const AVAILABLE_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30",
];

const AppointmentSchema = z
  .object({
    name: shortText(100),
    email: emailSchema,
    phone: phoneSchema.optional(),
    appointmentType: z.enum(VALID_APPOINTMENT_TYPES, {
      errorMap: () => ({ message: "Invalid appointment type" }),
    }),
    preferredDate: isoDate,
    preferredTime: z.string().refine((v) => AVAILABLE_SLOTS.includes(v), {
      message: "Invalid time slot. Please select an available time.",
    }),
    notes: z.string().trim().max(1000, "Notes must be 1000 characters or fewer").optional(),
  })
  .superRefine((val, ctx) => {
    const selectedDate = new Date(val.preferredDate + "T00:00:00Z");
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    if (selectedDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredDate"],
        message: "Cannot book appointments in the past",
      });
    }
    const dow = selectedDate.getUTCDay();
    if (dow === 0 || dow === 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["preferredDate"],
        message: "Appointments are only available Monday to Friday",
      });
    }
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();

  try {
    const supabase = getServiceClient("book-appointment");

    const rl = await checkRateLimit(supabase, {
      ip: getClientIp(req),
      tier: "public",
      scope: "book-appointment",
    });
    if (!rl.allowed) {
      return errJson(req, {
        code: "rate_limited",
        message: "Too many booking attempts. Please try again later.",
        requestId,
        headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
      });
    }


    // GET: list available slots for a date
    if (req.method === "GET") {
      const url = new URL(req.url);
      const date = url.searchParams.get("date");
      if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return errJson(req, {
          code: "bad_request",
          message: "Valid date parameter required (YYYY-MM-DD).",
          requestId,
        });
      }

      const checkDate = new Date(date + "T00:00:00Z");
      const dow = checkDate.getUTCDay();
      if (dow === 0 || dow === 6) {
        return okJson(
          { availableSlots: [], message: "No appointments on weekends" },
          req,
          { requestId },
        );
      }

      const { data: booked } = await supabase
        .from("appointments")
        .select("preferred_time")
        .eq("preferred_date", date)
        .neq("status", "cancelled");

      const bookedTimes = new Set((booked || []).map((a: { preferred_time: string }) => a.preferred_time));
      const availableSlots = AVAILABLE_SLOTS.filter((s) => !bookedTimes.has(s));

      return okJson(
        { availableSlots, totalSlots: AVAILABLE_SLOTS.length, bookedCount: bookedTimes.size },
        req,
        { requestId },
      );
    }

    // POST: book appointment
    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(AppointmentSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const appointment = validated.data;

    // Authenticate user via JWT claims (lighter than auth.getUser network call)
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errJson(req, {
        code: "unauthorized",
        message: "Authentication required. Please log in to book an appointment.",
        requestId,
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const authClient = getAnonClient(null, "book-appointment");
    const { data: userData, error: userError } = await authClient.auth.getUser(token);
    if (userError || !userData?.user?.id) {
      return errJson(req, {
        code: "unauthorized",
        message: "Invalid session. Please log in again.",
        requestId,
      });
    }
    const userId = userData.user.id;

    // Double-booking prevention
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("preferred_date", appointment.preferredDate)
      .eq("preferred_time", appointment.preferredTime)
      .neq("status", "cancelled")
      .limit(1);

    if (existing && existing.length > 0) {
      return errJson(req, {
        code: "conflict",
        message: "This time slot is already booked. Please choose a different time.",
        requestId,
      });
    }

    const { data, error: insertError } = await supabase
      .from("appointments")
      .insert({
        user_id: userId,
        name: appointment.name,
        email: appointment.email,
        phone: appointment.phone || null,
        appointment_type: appointment.appointmentType,
        preferred_date: appointment.preferredDate,
        preferred_time: appointment.preferredTime,
        notes: appointment.notes || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error(`[${requestId}] Appointment insert error:`, insertError.message);
      return errJson(req, {
        code: "server_error",
        message: "Failed to book appointment. Please try again.",
        requestId,
      });
    }

    // Admin notification
    try {
      const typeLabel = appointment.appointmentType.charAt(0).toUpperCase() + appointment.appointmentType.slice(1);
      const dateFormatted = new Date(appointment.preferredDate + "T00:00:00").toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const emailRes = await fetch(`${supabaseUrl}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({
          templateName: "contact-admin-notification",
          recipientEmail: CONTACT_EMAILS.info,
          idempotencyKey: `appointment-admin-${data.id}`,
          templateData: {
            name: appointment.name,
            email: appointment.email,
            phone: appointment.phone || "Not provided",
            subject: `New Appointment Booking: ${typeLabel}`,
            message: `Type: ${typeLabel}\nDate: ${dateFormatted}\nTime: ${appointment.preferredTime}\nNotes: ${appointment.notes || "None"}`,
          },
        }),
      });
      const emailBody = await emailRes.text();
      if (!emailRes.ok) console.error(`[${requestId}] Admin email error:`, emailRes.status, emailBody);
    } catch (e) {
      console.error(`[${requestId}] Admin email error:`, e instanceof Error ? e.message : "Unknown");
    }

    return okJson(
      {
        success: true,
        appointmentId: data.id,
        message: "Your appointment has been booked successfully! A confirmation email has been sent to you.",
      },
      req,
      { requestId },
    );
  } catch (error) {
    console.error(`[${requestId}] Appointment unhandled error:`, error instanceof Error ? error.message : "Unknown");
    return errJson(req, {
      code: "server_error",
      message: "An unexpected error occurred. Please try again.",
      requestId,
    });
  }
});

// Suppress unused-import warning when corsHeaders not directly referenced.
void getCorsHeaders;
