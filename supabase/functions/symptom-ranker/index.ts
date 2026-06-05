// Rule-based + AI-confirmed symptom checker.
// POST { answers: { location, duration, timing, swelling, coldSensitivity } }
// Returns top 3 ranked conditions with confidence + reasoning.

import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createRateLimiter, getClientIp, rateLimitResponse } from "../_shared/rate-limiter.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const ALLOWED: Record<string, string[]> = {
  location: ["knees", "hands", "back", "feet", "multiple"],
  duration: ["weeks", "months", "years"],
  timing: ["morning", "evening", "after-activity", "constant"],
  swelling: ["yes", "no", "sometimes"],
  coldSensitivity: ["yes", "no"],
};

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 10 });

interface Answers {
  location: string;       // "knees" | "hands" | "back" | "feet" | "multiple"
  duration: string;       // "weeks" | "months" | "years"
  timing: string;         // "morning" | "evening" | "after-activity" | "constant"
  swelling: string;       // "yes" | "no" | "sometimes"
  coldSensitivity: string;// "yes" | "no"
}

const CONDITIONS = [
  {
    slug: "osteoarthritis", name: "Osteoarthritis",
    url: "/conditions/osteoarthritis",
    summary: "Wear-and-tear joint disease — most common in knees, hips, hands and spine; pain typically worsens with activity.",
  },
  {
    slug: "rheumatoid-arthritis", name: "Rheumatoid Arthritis",
    url: "/conditions/rheumatoid-arthritis",
    summary: "Autoimmune condition causing prolonged morning stiffness, symmetrical joint swelling, often hands and feet.",
  },
  {
    slug: "psoriatic-arthritis", name: "Psoriatic Arthritis",
    url: "/conditions/psoriatic-arthritis",
    summary: "Inflammatory arthritis linked to psoriasis — affects fingers, toes and lower back; swollen 'sausage' digits.",
  },
  {
    slug: "ankylosing-spondylitis", name: "Ankylosing Spondylitis",
    url: "/conditions/ankylosing-spondylitis",
    summary: "Inflammatory back disease causing morning stiffness and lower back pain that improves with movement.",
  },
  {
    slug: "gout", name: "Gout",
    url: "/conditions/gout",
    summary: "Sudden severe attacks of joint pain, often the big toe, with redness and swelling.",
  },
  {
    slug: "fibromyalgia", name: "Fibromyalgia",
    url: "/conditions/fibromyalgia",
    summary: "Widespread pain, fatigue and sensitivity without joint damage; sensitive to cold and stress.",
  },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const ip = getClientIp(req);
    if (!limiter.check(ip)) return rateLimitResponse(corsHeaders);

    const { answers } = (await req.json()) as { answers: Answers };
    if (!answers || typeof answers !== "object") {
      return new Response(JSON.stringify({ error: "answers required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const [key, allowed] of Object.entries(ALLOWED)) {
      const val = (answers as Record<string, unknown>)[key];
      if (typeof val !== "string" || !allowed.includes(val)) {
        return new Response(JSON.stringify({ error: `Invalid value for ${key}` }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const prompt = `You are an arthritis triage assistant. Based on the user's answers, rank the THREE most likely matching conditions from the list. Return JSON only.

User answers:
- Main location: ${answers.location}
- How long: ${answers.duration}
- Worst time: ${answers.timing}
- Swelling: ${answers.swelling}
- Cold sensitivity: ${answers.coldSensitivity}

Conditions:
${CONDITIONS.map((c) => `- ${c.slug}: ${c.summary}`).join("\n")}

Return strictly this JSON shape, no prose:
{
  "ranked": [
    { "slug": "...", "confidence": "high|medium|low", "reasoning": "one short sentence" },
    { "slug": "...", "confidence": "high|medium|low", "reasoning": "one short sentence" },
    { "slug": "...", "confidence": "high|medium|low", "reasoning": "one short sentence" }
  ]
}`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You output strict JSON only, no markdown." },
          { role: "user", content: prompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (aiResp.status === 429) {
      return new Response(JSON.stringify({ error: "Too many requests, please try again shortly." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (aiResp.status === 402) {
      return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!aiResp.ok) {
      const t = await aiResp.text();
      console.error("AI error:", aiResp.status, t);
      return new Response(JSON.stringify({ error: "Ranker error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await aiResp.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: { ranked: { slug: string; confidence: string; reasoning: string }[] } = { ranked: [] };
    try { parsed = JSON.parse(content); } catch { /* fall back */ }

    const enriched = (parsed.ranked ?? [])
      .map((r) => {
        const cond = CONDITIONS.find((c) => c.slug === r.slug);
        if (!cond) return null;
        return { ...cond, confidence: r.confidence, reasoning: r.reasoning };
      })
      .filter(Boolean)
      .slice(0, 3);

    return new Response(JSON.stringify({ results: enriched }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("symptom-ranker error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
