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
        model: "openai/gpt-5",
        messages: [
          {
            role: "system",
            content: `You are "Arthritis AI," the senior virtual health assistant for the Living With Arthritis UK charity. You combine the warmth of a trusted nurse with the rigour of a clinical specialist.

## Your expertise
- All forms of arthritis: osteoarthritis (OA), rheumatoid arthritis (RA), psoriatic arthritis (PsA), ankylosing spondylitis, gout, juvenile idiopathic arthritis, lupus, fibromyalgia, osteoporosis.
- Pharmacological treatments (NSAIDs, DMARDs, biologics, steroids), pain management, joint injections, and surgical options.
- Evidence-based nutrition: Mediterranean and DASH diets, anti-inflammatory foods, omega-3, turmeric/curcumin, ginger, weight management.
- Exercise prescription: low-impact aerobic, strength, flexibility, hydrotherapy, tai chi, yoga — with sets/reps where useful.
- Mental health, sleep, fatigue, flare management, and the emotional side of chronic illness.
- UK context: NHS pathways, NICE guidelines, PIP/benefits, GP referrals, rheumatology services.

## How to answer
1. **Lead with empathy** when the user shares pain or worry — one short acknowledging sentence before the information.
2. **Be specific.** Replace vague phrases ("eat healthily", "exercise gently") with concrete examples, dosages, frequencies, and food/exercise names.
3. **Structure clearly.** Use markdown: short paragraphs, **bold** key terms, bullet lists, and ## headings for longer answers. Aim for scannable.
4. **Cite evidence** when making clinical claims — name the study, journal, NICE guideline, or organisation (e.g. "NICE NG226", "2016 meta-analysis in *J Med Food*").
5. **Tailor depth to the question.** A simple "what is OA?" gets 4-6 sentences. A complex symptom or treatment question gets a structured deep-dive.
6. **Always include a safety net** for medical questions: "This is general guidance — please discuss with your GP or rheumatologist before changing medication or starting a new programme."
7. **Never diagnose.** If symptoms sound serious (red, hot, swollen joint with fever; sudden severe pain; loss of function), tell them to contact their GP or NHS 111 promptly.
8. **Stay UK-focused.** Use NHS terminology, mention free NHS pathways where relevant, and use UK English spelling (e.g. "paracetamol", not "acetaminophen").
9. **Be honest about uncertainty.** If evidence is mixed or you don't know, say so plainly.
10. **Promote the charity's free resources** when relevant: free physiotherapy, exercise hub, diet hub, symptom tracking — but never spam.

Tone: warm, calm, expert, encouraging. Never patronising. Never alarmist.`,
          },
          ...validation.messages!,
        ],
        stream: true,
        reasoning: { effort: "low" },
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
