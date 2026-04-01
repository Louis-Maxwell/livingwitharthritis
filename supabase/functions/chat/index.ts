import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createRateLimiter, getClientIp, rateLimitResponse } from "../_shared/rate-limiter.ts";

// 30 chat requests per IP per 5 minutes
const limiter = createRateLimiter({ windowMs: 300_000, maxRequests: 30 });

// Allowed origins for CORS - restrict to trusted domains
function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") || "";
  
  // Allow Lovable preview/project domains, production domains, and localhost
  const isAllowed =
    origin.endsWith(".lovable.app") ||
    origin.endsWith(".lovableproject.com") ||
    origin === "https://livingwitharthritis.org.uk" ||
    origin === "https://www.livingwitharthritis.org.uk" ||
    origin.startsWith("http://localhost:");

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "https://livingwitharthritis.lovable.app",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

// Input validation constants
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 10000;
const VALID_ROLES = ["user", "assistant"];

interface ChatMessage {
  role: string;
  content: string;
}

function validateMessages(messages: unknown): { valid: boolean; error?: string; messages?: ChatMessage[] } {
  if (!Array.isArray(messages)) {
    return { valid: false, error: "Messages must be an array" };
  }

  if (messages.length === 0) {
    return { valid: false, error: "Messages array cannot be empty" };
  }

  if (messages.length > MAX_MESSAGES) {
    return { valid: false, error: `Too many messages (max ${MAX_MESSAGES})` };
  }

  const validatedMessages: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (!msg || typeof msg !== "object") {
      return { valid: false, error: `Invalid message at index ${i}` };
    }

    const { role, content } = msg as { role?: unknown; content?: unknown };

    if (typeof role !== "string" || !VALID_ROLES.includes(role)) {
      return { valid: false, error: `Invalid role at index ${i}. Must be 'user' or 'assistant'` };
    }

    if (typeof content !== "string") {
      return { valid: false, error: `Invalid content at index ${i}. Must be a string` };
    }

    if (content.length === 0) {
      return { valid: false, error: `Empty content at index ${i}` };
    }

    if (content.length > MAX_MESSAGE_LENGTH) {
      return { valid: false, error: `Message at index ${i} exceeds max length (${MAX_MESSAGE_LENGTH} chars)` };
    }

    validatedMessages.push({ role, content });
  }

  return { valid: true, messages: validatedMessages };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const ip = getClientIp(req);
    if (!limiter.check(ip)) {
      return rateLimitResponse(corsHeaders);
    }

    // Parse and validate request body
    let requestBody: unknown;
    try {
      requestBody = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages: rawMessages } = requestBody as { messages?: unknown };
    const validation = validateMessages(rawMessages);

    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are "Arthritis AI," a knowledgeable and empathetic health assistant for the Living With Arthritis charity. Your expertise covers all forms of arthritis (RA, OA, PsA, gout, osteoporosis), treatments, nutrition, exercise, and living well.

Guidelines:
- Be warm, reassuring, and professional.
- Use clear structure: short paragraphs, markdown headings, bold key terms, and bullet lists when helpful.
- Provide evidence-based information, citing study names or journals when relevant.
- For dietary advice, reference the Mediterranean and DASH diets as broadly beneficial.
- Always remind users to consult their doctor or rheumatologist for personal medical decisions.
- If unsure, say so honestly rather than guessing.
- Keep answers focused but thorough — aim for 3-8 sentences unless the question requires more detail.`,
          },
          ...validation.messages!,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
