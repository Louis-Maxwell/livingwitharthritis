import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://id-preview--3d3ed0e7-eb8c-4aef-b309-fc873c84a796.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const VALID_APPOINTMENT_TYPES = [
  "consultation",
  "physiotherapy",
  "follow-up",
  "assessment",
  "treatment",
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

  if (typeof preferredTime !== "string" || preferredTime.trim().length === 0) {
    return { valid: false, error: "Preferred time is required" };
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
      preferredTime: preferredTime.trim(),
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

    const validation = validateAppointment(requestBody);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { appointment } = validation;

    // Get user ID if authenticated
    let userId: string | null = null;
    const authHeader = req.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const authClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const token = authHeader.replace("Bearer ", "");
      const { data: claimsData } = await authClient.auth.getClaims(token);
      if (claimsData?.claims?.sub) {
        userId = claimsData.claims.sub as string;
      }
    }

    const { data, error: insertError } = await supabase
      .from("appointments")
      .insert({
        user_id: userId,
        name: appointment!.name,
        email: appointment!.email,
        phone: appointment!.phone,
        appointment_type: appointment!.appointmentType,
        preferred_date: appointment!.preferredDate,
        preferred_time: appointment!.preferredTime,
        notes: appointment!.notes,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Appointment insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to book appointment" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Appointment booked:", data.id);

    return new Response(
      JSON.stringify({
        success: true,
        appointmentId: data.id,
        message: "Your appointment has been booked. We'll confirm shortly!",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Appointment error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
