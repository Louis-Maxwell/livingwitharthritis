import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { submitViaMailto } from "@/lib/formApi";
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

    if (data.website && String(data.website).trim()) {
      return { success: false, error: "Rejected" };
    }

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
      const result = submitViaMailto({ subject: "Appointment request", body });
      toast.message(
        result.error ||
          `Please email ${CONTACT_EMAILS.info} to request an appointment.`,
      );
      return { success: false, error: result.error, mailtoOpened: true as const };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { bookAppointment, isLoading };
}
