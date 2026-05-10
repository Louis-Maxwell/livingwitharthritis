import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAnonClient, getServiceClient } from "../_shared/supabase-client.ts";
import { createRateLimiter, getClientIp } from "../_shared/rate-limiter.ts";
import { errJson, okJson, parseJsonBody, preflight, newRequestId } from "../_shared/http.ts";
import { z, parseWithSchema } from "../_shared/validation.ts";
import { scoreTriage } from "./scoring.ts";

const limiter = createRateLimiter({ windowMs: 60_000, maxRequests: 10 });

const ARTHRITIS_TYPES = [
  "osteoarthritis",
  "rheumatoid arthritis",
  "psoriatic arthritis",
  "gout",
  "ankylosing spondylitis",
  "juvenile arthritis",
  "fibromyalgia",
  "lupus",
  "other",
  "not sure",
] as const;

const Schema = z.object({
  arthritisType: z.string().trim().toLowerCase().refine((v) => (ARTHRITIS_TYPES as readonly string[]).includes(v), {
    message: "Unknown arthritis type",
  }),
  painLevel: z.number().int().min(0).max(10),
  affectedAreas: z.array(z.string().trim().min(1).max(40)).max(15),
  limitations: z.array(z.string().trim().min(1).max(40)).max(15),
  goals: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
  mobilityLevel: z.enum(["high", "moderate", "low"]),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);
  const requestId = newRequestId();

  if (req.method !== "POST") {
    return errJson(req, { code: "method_not_allowed", message: "POST only", requestId });
  }
  if (!limiter.check(getClientIp(req))) {
    return errJson(req, { code: "rate_limited", message: "Too many requests. Try again shortly.", requestId });
  }

  try {
    // Auth: require a logged-in user (we store a row keyed by user_id).
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errJson(req, { code: "unauthorized", message: "Sign in to save your assessment.", requestId });
    }
    const anon = getAnonClient(authHeader, "submit-triage");
    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) {
      return errJson(req, { code: "unauthorized", message: "Invalid session.", requestId });
    }
    const userId = userData.user.id;

    const body = await parseJsonBody(req, requestId);
    if (!body.ok) return body.response;
    const parsed = parseWithSchema(Schema, body.data, req, requestId);
    if (!parsed.ok) return parsed.response;

    const { triageScore, recommendations } = scoreTriage(parsed.data);

    const service = getServiceClient("submit-triage");
    const { data: row, error: insertErr } = await service
      .from("triage_assessments")
      .insert({
        user_id: userId,
        arthritis_type: parsed.data.arthritisType,
        pain_level: parsed.data.painLevel,
        affected_areas: parsed.data.affectedAreas,
        limitations: parsed.data.limitations,
        goals: parsed.data.goals,
        mobility_level: parsed.data.mobilityLevel,
        triage_score: triageScore,
        recommendations,
      })
      .select("id, created_at, valid_until")
      .single();

    if (insertErr) {
      console.error(`[submit-triage:${requestId}] insert failed`, insertErr);
      return errJson(req, { code: "server_error", message: "Could not save assessment.", requestId });
    }

    // Pre-populate profile fields if they're empty (best-effort, ignore errors).
    await service
      .from("profiles")
      .update({
        arthritis_type: parsed.data.arthritisType,
        pain_level: parsed.data.painLevel,
        mobility_level: parsed.data.mobilityLevel,
      })
      .eq("user_id", userId)
      .or("arthritis_type.is.null,pain_level.is.null,mobility_level.is.null");

    return okJson(
      { id: row.id, triageScore, recommendations, validUntil: row.valid_until },
      req,
      { requestId },
    );
  } catch (e) {
    console.error(`[submit-triage:${requestId}] unhandled`, e);
    return errJson(req, { code: "server_error", message: "Unexpected error.", requestId });
  }
});
