/**
 * Shared AI trust & safety utilities for Living With Arthritis UK.
 * Used by edge functions that proxy LLM calls.
 */

export const MEDICAL_DISCLAIMER =
  "This is general information from an AI assistant — not medical advice, diagnosis, or treatment. Always speak to your GP, pharmacist, or rheumatology team before changing medication or starting a new programme.";

export const EMERGENCY_FOOTER =
  "\n\n---\n\n**If this is a medical emergency, call 999.** For urgent NHS advice, call **111**. Mental-health crisis: **Samaritans 116 123** (free, 24/7).";

/* ─── Pattern libraries ────────────────────────────────────────────────── */

const RED_FLAGS: { category: string; pattern: RegExp }[] = [
  { category: "self_harm", pattern: /\b(suicide|kill myself|end my life|self[- ]harm|hurt myself|want to die)\b/i },
  { category: "cardiac", pattern: /\b(chest pain|crushing chest|left arm.*(pain|numb)|short(ness)? of breath.*sudden)\b/i },
  { category: "stroke", pattern: /\b(face droop|slurred speech|sudden weakness|can'?t move (one|my) (arm|leg|side))\b/i },
  { category: "septic_joint", pattern: /\b(hot.*swollen.*joint|red.*hot.*joint).*(fever|temperature)\b/i },
  { category: "anaphylaxis", pattern: /\b(throat closing|can'?t breathe|anaphyla|swollen tongue|face swelling.*hives)\b/i },
  { category: "severe_bleed", pattern: /\b(uncontrolled bleeding|bleeding.*won'?t stop|coughing up blood)\b/i },
];

const BLOCKED: RegExp[] = [
  /\b(how (much|many).*(paracetamol|ibuprofen|opioid|tramadol|codeine|oxycodone|morphine).*(overdose|kill|die))\b/i,
  /\b(ignore.*(previous|above).*(instruction|prompt|system))\b/i,
  /\b(jailbreak|DAN mode|developer mode)\b/i,
  /\b(prescribe|prescription).*(child|infant|baby|toddler).*(dose|dosage|mg))\b/i,
];

/* ─── Public API ───────────────────────────────────────────────────────── */

export function detectRedFlags(text: string): { matched: boolean; category: string | null } {
  for (const { category, pattern } of RED_FLAGS) {
    if (pattern.test(text)) return { matched: true, category };
  }
  return { matched: false, category: null };
}

export function containsBlockedContent(text: string): boolean {
  return BLOCKED.some((p) => p.test(text));
}

/**
 * Strip personally-identifying data before logging.
 * Conservative — over-redacts rather than under-redacts.
 */
export function redactPII(text: string): string {
  if (!text) return text;
  return text
    // emails
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, "[email]")
    // UK phone numbers (07..., +44..., (01x) ...)
    .replace(/(\+?44\s?|0)(?:\d\s?){9,10}/g, "[phone]")
    // NHS numbers (10 digits, often with spaces)
    .replace(/\b\d{3}\s?\d{3}\s?\d{4}\b/g, "[nhs-number]")
    // UK postcodes
    .replace(/\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/gi, "[postcode]")
    // dates of birth (dd/mm/yyyy or dd-mm-yyyy)
    .replace(/\b\d{1,2}[\/\-]\d{1,2}[\/\-](19|20)\d{2}\b/g, "[dob]")
    .slice(0, 500);
}

/**
 * Build an SSE chunk that mimics the OpenAI streaming format,
 * so the client renders it identically to a model response.
 */
export function sseChunk(content: string): string {
  const payload = JSON.stringify({
    choices: [{ delta: { content } }],
  });
  return `data: ${payload}\n\n`;
}

export function sseDone(): string {
  return "data: [DONE]\n\n";
}

/**
 * Build a complete refusal stream (Response body) for blocked content.
 */
export function buildRefusalStream(reason: "blocked" | "red_flag", category?: string | null): ReadableStream {
  const parts: string[] = [];

  if (reason === "blocked") {
    parts.push(
      "I can't help with that request, but I want to make sure you're safe and supported.\n\n",
      "If you're in distress, please contact your GP or the services below.",
      EMERGENCY_FOOTER,
    );
  } else {
    parts.push(
      `**This sounds urgent.**${category === "self_harm" ? " You're not alone — help is available right now." : ""}\n\n`,
      "Please don't wait for an AI answer for symptoms like these — get help straight away.",
      EMERGENCY_FOOTER,
    );
  }

  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const part of parts) {
        controller.enqueue(encoder.encode(sseChunk(part)));
      }
      controller.enqueue(encoder.encode(sseDone()));
      controller.close();
    },
  });
}
