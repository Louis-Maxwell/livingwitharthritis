import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
      const token = authHeader.replace("Bearer ", "");
      const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
      const authClient = createClient(supabaseUrl, supabaseAnonKey);
      const { data: { user } } = await authClient.auth.getUser(token);
      if (user) {
        userId = user.id;
      }
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

    return new Response(
      JSON.stringify({
        success: true,
        appointmentId: data.id,
        message: "Your appointment has been booked successfully! We'll confirm shortly.",
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
