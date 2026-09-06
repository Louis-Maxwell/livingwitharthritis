import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { sanitizeInput, sanitizeEmail, sanitizePhone } from "@/lib/sanitize";
import { submitViaMailto } from "@/lib/formApi";
import { CONTACT_EMAILS } from "@/config/contact";

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  /** Honeypot — leave empty. */
  website?: string;
}

const MAX_ATTEMPTS = 3;
const WINDOW_MS = 60000;

export function useContact() {
  const [isLoading, setIsLoading] = useState(false);
  const attemptsRef = useRef<number[]>([]);

  const submitContact = useCallback(async (data: ContactData) => {
    const now = Date.now();
    attemptsRef.current = attemptsRef.current.filter((t) => now - t < WINDOW_MS);
    if (attemptsRef.current.length >= MAX_ATTEMPTS) {
      toast.error("Too many submissions. Please wait a minute and try again.");
      return { success: false, error: "Rate limited" };
    }
    attemptsRef.current.push(now);

    // Honeypot: silent no-op for bots
    if (data.website && String(data.website).trim()) {
      return { success: false, error: "Rejected" };
    }

    const sanitizedEmail = sanitizeEmail(data.email);
    if (!sanitizedEmail) {
      toast.error("Please enter a valid email address.");
      return { success: false, error: "Invalid email" };
    }

    const sanitizedData = {
      name: sanitizeInput(data.name, 100),
      email: sanitizedEmail,
      phone: data.phone ? sanitizePhone(data.phone) : undefined,
      subject: sanitizeInput(data.subject, 200),
      message: sanitizeInput(data.message, 1000),
    };

    setIsLoading(true);
    try {
      const lines = [
        `Name: ${sanitizedData.name}`,
        `Email: ${sanitizedData.email}`,
        sanitizedData.phone ? `Phone: ${sanitizedData.phone}` : "",
        "",
        sanitizedData.message,
      ].filter(Boolean);
      const result = submitViaMailto({
        subject: sanitizedData.subject || "Website enquiry",
        body: lines.join("\n"),
      });
      // Never toast success — mailto is not delivery confirmation.
      toast.message(result.error);
      return { success: false, error: result.error, mailtoOpened: true as const };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { submitContact, isLoading };
}
