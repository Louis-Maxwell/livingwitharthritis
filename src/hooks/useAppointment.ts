import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { openMailto } from "@/lib/mailtoSubmit";
import { postFormApi } from "@/lib/formApi";
import { CONTACT_EMAILS } from "@/config/contact";

interface AppointmentData {
  name: string;
  email: string;
  phone?: string;
  appointmentType: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  /** Honeypot — leave empty. */
  website?: string;
}

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 300000;

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
      website: data.website ? String(data.website) : "",
    };

    setIsLoading(true);
    try {
      const result = await postFormApi("/api/appointment", {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        appointmentType: sanitizedData.appointmentType,
        preferredDate: sanitizedData.preferredDate,
        preferredTime: sanitizedData.preferredTime,
        notes: sanitizedData.notes,
        website: sanitizedData.website,
      });

      if (result.ok) {
        toast.success("Appointment request received — we will confirm by email.");
        return { success: true };
      }

      toast.error(
        result.error ||
          `We could not send your request. Please email ${CONTACT_EMAILS.info}.`,
      );
      if (result.mailtoSuggested && result.code !== "rate_limited") {
        const body = [
          `Name: ${sanitizedData.name}`,
          `Email: ${sanitizedData.email}`,
          sanitizedData.phone ? `Phone: ${sanitizedData.phone}` : "",
          `Type: ${sanitizedData.appointmentType}`,
          `Preferred date: ${sanitizedData.preferredDate}`,
          `Preferred time: ${sanitizedData.preferredTime}`,
          sanitizedData.notes ? `Notes: ${sanitizedData.notes}` : "",
        ]
          .filter(Boolean)
          .join("\n");
        openMailto({ subject: "Appointment request", body });
      }
      return { success: false, error: result.error || "Delivery failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { bookAppointment, isLoading };
}
