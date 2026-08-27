import { supabase } from "@/integrations/supabase/client";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";

// Supabase client removed - restore
import { unwrapResponse, friendlyErrorMessage } from "@/lib/apiResponse";

interface AppointmentData {
  name: string;
  email: string;
  phone?: string;
  appointmentType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 300000; // 5 minutes

export function useAppointment() {
  const [isLoading, setIsLoading] = useState(false);
  const attemptsRef = useRef<number[]>([]);

  const bookAppointment = useCallback(async (data: AppointmentData) => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter((t) => now - t < WINDOW_MS);
    if (attemptsRef.current.length >= MAX_ATTEMPTS) {
      toast.error("Too many booking attempts. Please wait a minute and try again.");
      return { success: false, error: "Rate limited" };
    }
    attemptsRef.current.push(now);

    const sanitizedEmail = sanitizeEmail(data.email);
    if (!sanitizedEmail) {
      toast.error("Please enter a valid email address.");
      return { success: false, error: "Invalid email" };
    }

    const sanitizedData = {
      ...data,
      name: sanitizeInput(data.name, 100),
      email: sanitizedEmail,
      phone: data.phone ? sanitizePhone(data.phone) : undefined,
      notes: data.notes ? sanitizeInput(data.notes, 1000) : undefined,
    };

    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("book-appointment", {
        body: sanitizedData,
      });

      if (error) throw new Error(error.message || "Failed to book appointment");

      const { data: payload, error: apiError } = unwrapResponse<{
        appointmentId?: string;
        message?: string;
      }>(result);

      if (apiError) {
        const msg = friendlyErrorMessage(apiError);
        toast.error(msg);
        return { success: false, error: msg };
      }

      toast.success(payload?.message || "Appointment booked successfully!");
      return { success: true, appointmentId: payload?.appointmentId };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to book appointment";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { bookAppointment, isLoading };
}
