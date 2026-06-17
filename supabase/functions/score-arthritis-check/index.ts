import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const Schema = z.object({
  joint: z.enum(["knee", "hip", "hand", "shoulder", "back", "other"]),
  painLevel: z.number().int().min(0).max(10),
  stiffnessMinutes: z.number().int().min(0).max(600),
  activityGoal: z.enum(["walk", "sleep", "work", "play"]),
  ageBand: z.enum(["under-40", "40-59", "60-74", "75+"]),
  email: z.string().email().max(255).optional(),
});

type Input = z.infer<typeof Schema>;

interface Pillar {
  title: string;
  summary: string;
  href: string;
}

function buildPlan(i: Input): Pillar[] {
  const jointHref: Record<Input["joint"], string> = {
    knee: "/exercises/knee",
    hip: "/exercises/hip",
    hand: "/exercises/hand",
    shoulder: "/exercises/shoulder",
    back: "/exercises/spine",
    other: "/exercises",
  };

  const movePillar: Pillar = {
    title: "Move",
    summary:
      i.painLevel >= 7
        ? `Start with seated mobility for your ${i.joint}. Two short sessions a day, no flare-ups.`
        : `Build a daily 10-minute routine for your ${i.joint} — graded by pain level.`,
    href: jointHref[i.joint],
  };

  const eatPillar: Pillar = {
    title: "Eat",
    summary:
      i.stiffnessMinutes >= 30
        ? "Anti-inflammatory Mediterranean meals — oily fish, leafy greens, olive oil — reduce morning stiffness."
        : "Add omega-3s, turmeric and colourful vegetables to ease low-grade inflammation.",
    href: "/diet",
  };

  const restPillar: Pillar = {
    title:
      i.activityGoal === "sleep"
        ? "Rest"
        : i.activityGoal === "work"
          ? "Pace"
          : "Recover",
    summary:
      i.activityGoal === "sleep"
        ? "A 20-minute wind-down, joint-friendly sleep positions, and a gentle stretch reset."
        : i.activityGoal === "work"
          ? "Workstation set-up, micro-breaks every 45 minutes, and grip-saving tools."
          : i.ageBand === "75+"
            ? "Energy-pacing, balance work, and falls prevention — built for confidence."
            : "Recovery routines that fit around your week, not the other way round.",
    href: "/self-help",
  };

  return [movePillar, eatPillar, restPillar];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const input = parsed.data;
    const pillars = buildPlan(input);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    await supabase.from("quiz_submissions").insert({
      joint: input.joint,
      pain_level: input.painLevel,
      stiffness_minutes: input.stiffnessMinutes,
      activity_goal: input.activityGoal,
      age_band: input.ageBand,
      email: input.email ?? null,
      plan: pillars,
    });

    return new Response(JSON.stringify({ pillars }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("score-arthritis-check error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
