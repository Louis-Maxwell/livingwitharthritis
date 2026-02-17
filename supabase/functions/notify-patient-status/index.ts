import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://id-preview--0b2fd6ca-4e21-4ac7-99fa-d741e996f45e.lovable.app",
  "https://livingwitharthritis.org.uk",
  "https://www.livingwitharthritis.org.uk",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const token = authHeader.replace("Bearer ", "");

    const authClient = createClient(supabaseUrl, supabaseAnonKey);
    const { data: { user }, error: authError } = await authClient.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check admin role
    const serviceClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: roleData } = await serviceClient
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { appointmentId, newStatus } = body;

    if (!appointmentId || typeof appointmentId !== "string") {
      return new Response(JSON.stringify({ error: "Appointment ID required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!["confirmed", "cancelled", "completed"].includes(newStatus)) {
      return new Response(JSON.stringify({ error: "Invalid status" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch appointment details
    const { data: apt, error: fetchError } = await serviceClient
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .single();

    if (fetchError || !apt) {
      return new Response(JSON.stringify({ error: "Appointment not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Update status
    const { error: updateError } = await serviceClient
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", appointmentId);

    if (updateError) {
      return new Response(JSON.stringify({ error: "Failed to update appointment" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send notification email to patient
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
        console.error("Notification email error:", e instanceof Error ? e.message : "Unknown");
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: `Appointment ${newStatus}. Patient has been notified.` }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Status update error:", error instanceof Error ? error.message : "Unknown");
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
