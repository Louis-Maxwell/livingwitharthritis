import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAnonClient, getServiceClient } from "../_shared/supabase-client.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId } from "../_shared/http.ts";
import { z, parseWithSchema } from "../_shared/validation.ts";

const StatusSchema = z.object({
  appointmentId: z.string().uuid("Appointment ID must be a valid UUID"),
  newStatus: z.enum(["confirmed", "cancelled", "completed"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errJson(req, { code: "unauthorized", message: "Authentication required.", requestId });
    }

    const token = authHeader.replace("Bearer ", "");
    const authClient = getAnonClient(null, "notify-patient-status");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return errJson(req, { code: "unauthorized", message: "Invalid session. Please log in again.", requestId });
    }
    const userId = claimsData.claims.sub as string;

    const serviceClient = getServiceClient("notify-patient-status");
    const { data: roleData } = await serviceClient
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return errJson(req, { code: "forbidden", message: "Admin access required.", requestId });
    }

    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(StatusSchema, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const { appointmentId, newStatus } = validated.data;

    const { data: apt, error: fetchError } = await serviceClient
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .single();

    if (fetchError || !apt) {
      return errJson(req, { code: "not_found", message: "Appointment not found.", requestId });
    }

    const { error: updateError } = await serviceClient
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", appointmentId);

    if (updateError) {
      console.error(`[${requestId}] Update error:`, updateError);
      return errJson(req, { code: "server_error", message: "Failed to update appointment.", requestId });
    }

    // Notify patient (best-effort)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey && apt.email) {
      const dateFormatted = new Date(apt.preferred_date + "T00:00:00").toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      });

      const statusMessages: Record<string, { subject: string; heading: string; body: string; color: string }> = {
        confirmed: {
          subject: `Appointment Confirmed - ${dateFormatted}`,
          heading: "Your Appointment is Confirmed! ✅",
          body: "Great news! Your appointment has been confirmed. Please arrive 10 minutes early.",
          color: "#059669",
        },
        cancelled: {
          subject: `Appointment Cancelled - ${dateFormatted}`,
          heading: "Appointment Cancelled",
          body: "Your appointment has been cancelled. Please contact us if you wish to reschedule.",
          color: "#dc2626",
        },
        completed: {
          subject: `Appointment Completed - Thank You`,
          heading: "Thank You for Your Visit! 🎉",
          body: "Your appointment has been marked as completed. We hope your session was helpful.",
          color: "#2563eb",
        },
      };

      const msg = statusMessages[newStatus];
      const typeLabel = apt.appointment_type.charAt(0).toUpperCase() + apt.appointment_type.slice(1);

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendApiKey}` },
          body: JSON.stringify({
            from: "Living with Arthritis <onboarding@resend.dev>",
            to: [apt.email],
            subject: msg.subject,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
                <div style="background:${msg.color};padding:24px;border-radius:12px 12px 0 0;">
                  <h1 style="color:white;margin:0;font-size:22px;">${msg.heading}</h1>
                </div>
                <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
                  <p style="color:#374151;font-size:16px;">Dear ${apt.name},</p>
                  <p style="color:#374151;font-size:14px;">${msg.body}</p>
                  <div style="background:white;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0;">
                    <h3 style="margin:0 0 12px;color:#1f2937;font-size:16px;">Appointment Details</h3>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Type:</strong> ${typeLabel}</p>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Date:</strong> ${dateFormatted}</p>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Time:</strong> ${apt.preferred_time}</p>
                    <p style="margin:4px 0;color:#374151;font-size:14px;"><strong>Status:</strong> <span style="color:${msg.color};font-weight:bold;">${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</span></p>
                  </div>
                  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
                  <p style="color:#9ca3af;font-size:12px;margin:0;">Living with Arthritis Clinic · This is an automated message.</p>
                </div>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.error(`[${requestId}] Notification email error:`, e instanceof Error ? e.message : "Unknown");
      }
    }

    return okJson(
      { success: true, message: `Appointment ${newStatus}. Patient has been notified.` },
      req,
      { requestId },
    );
  } catch (error) {
    console.error(`[${requestId}] Status update unhandled error:`, error instanceof Error ? error.message : "Unknown");
    return errJson(req, { code: "server_error", message: "An unexpected error occurred.", requestId });
  }
});
