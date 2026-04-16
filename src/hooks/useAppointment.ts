import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";

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
    // Rate limiting
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter((t) => now - t < WINDOW_MS);
    if (attemptsRef.current.length >= MAX_ATTEMPTS) {
      toast.error("Too many booking attempts. Please wait a minute and try again.");
      return { success: false, error: "Rate limited" };
    }
    attemptsRef.current.push(now);

    // Sanitize inputs
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

      if (error) {
        throw new Error(error.message || "Failed to book appointment");
      }

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success(result?.message || "Appointment booked successfully!");
      return { success: true, appointmentId: result?.appointmentId };
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
