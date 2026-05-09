import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
import { errJson, parseJsonBody, preflight, newRequestId, getCorsHeaders } from "../_shared/http.ts";
import { z, parseWithSchema } from "../_shared/validation.ts";
import {
  detectRedFlags,
  containsBlockedContent,
  redactPII,
  buildRefusalStream,
  EMERGENCY_FOOTER,
} from "../_shared/ai-safety.ts";

// 30 chat requests per IP per 5 minutes
const limiter = createRateLimiter({ windowMs: 300_000, maxRequests: 30 });

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 4000;

const ChatMessage = z.object({
  role: z.enum(["user", "assistant"], { errorMap: () => ({ message: "Role must be 'user' or 'assistant'" }) }),
  content: z.string().min(1, "Message content cannot be empty").max(MAX_MESSAGE_LENGTH, `Message exceeds ${MAX_MESSAGE_LENGTH} characters`),
});

const ChatRequest = z.object({
  messages: z
    .array(ChatMessage)
    .min(1, "Messages array cannot be empty")
    .max(MAX_MESSAGES, `Too many messages (max ${MAX_MESSAGES})`),
});

const SYSTEM_PROMPT = `You are "Arthritis AI," the senior virtual health assistant for the Living With Arthritis UK charity. You combine the warmth of a trusted nurse with the rigour of a clinical specialist.

## Your expertise
- All forms of arthritis: osteoarthritis (OA), rheumatoid arthritis (RA), psoriatic arthritis (PsA), ankylosing spondylitis, gout, juvenile idiopathic arthritis, lupus, fibromyalgia, osteoporosis.
- Pharmacological treatments (NSAIDs, DMARDs, biologics, steroids), pain management, joint injections, and surgical options.
- Evidence-based nutrition: Mediterranean and DASH diets, anti-inflammatory foods, omega-3, turmeric/curcumin, ginger, weight management.
- Exercise prescription: low-impact aerobic, strength, flexibility, hydrotherapy, tai chi, yoga — with sets/reps where useful.
- Mental health, sleep, fatigue, flare management, and the emotional side of chronic illness.
- UK context: care pathways, NICE guidelines, PIP/benefits, GP referrals, rheumatology services.

## How to answer
1. **Lead with empathy** when the user shares pain or worry — one short acknowledging sentence before the information.
2. **Be specific.** Replace vague phrases ("eat healthily", "exercise gently") with concrete examples, dosages, frequencies, and food/exercise names.
3. **Structure clearly.** Use markdown: short paragraphs, **bold** key terms, bullet lists, and ## headings for longer answers. Aim for scannable.
4. **Cite evidence** when making clinical claims — name the study, journal, NICE guideline, or organisation (e.g. "NICE NG226", "2016 meta-analysis in *J Med Food*").
5. **Tailor depth to the question.** A simple "what is OA?" gets 4-6 sentences. A complex symptom or treatment question gets a structured deep-dive.
6. **Always include a safety net** for medical questions: "This is general guidance — please discuss with your GP or rheumatologist before changing medication or starting a new programme."
7. **Never diagnose.** If symptoms sound serious (red, hot, swollen joint with fever; sudden severe pain; loss of function), tell them to contact their GP or the health service 111 promptly.
8. **Stay UK-focused.** Use the health service terminology, mention free care pathways where relevant, and use UK English spelling (e.g. "paracetamol", not "acetaminophen").
9. **Be honest about uncertainty.** If evidence is mixed or you don't know, say so plainly.
10. **Promote the charity's free resources** when relevant: free physiotherapy, exercise hub, diet hub, symptom tracking — but never spam.

Tone: warm, calm, expert, encouraging. Never patronising. Never alarmist.`;

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);

  const requestId = newRequestId();
  const corsHeaders = getCorsHeaders(req);

  try {
    if (!limiter.check(getClientIp(req))) {
      return errJson(req, {
        code: "rate_limited",
        message: "You're sending messages too quickly. Please wait a moment.",
        requestId,
        headers: { "Retry-After": "30" },
      });
    }

    const parsed = await parseJsonBody(req, requestId);
    if (!parsed.ok) return parsed.response;

    const validated = parseWithSchema(ChatRequest, parsed.data, req, requestId);
    if (!validated.ok) return validated.response;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error(`[${requestId}] LOVABLE_API_KEY not configured`);
      return errJson(req, {
        code: "service_unavailable",
        message: "AI service is not configured.",
        requestId,
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        max_tokens: 800,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...validated.data.messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return errJson(req, {
          code: "rate_limited",
          message: "AI service is temporarily busy. Please try again shortly.",
          requestId,
          headers: { "Retry-After": "30" },
        });
      }
      if (response.status === 402) {
        return errJson(req, {
          code: "service_unavailable",
          message: "AI credits exhausted. Please contact support.",
          requestId,
          status: 402,
        });
      }
      const errorText = await response.text();
      console.error(`[${requestId}] AI gateway error:`, response.status, errorText);
      return errJson(req, {
        code: "server_error",
        message: "AI gateway error. Please try again.",
        requestId,
      });
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "X-Request-Id": requestId,
      },
    });
  } catch (error) {
    console.error(`[${requestId}] Chat unhandled error:`, error);
    return errJson(req, {
      code: "server_error",
      message: error instanceof Error ? error.message : "Unknown error",
      requestId,
    });
  }
});
