 
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getAnonClient, getServiceClient } from "../_shared/supabase-client.ts";
import { checkRateLimit, getClientIp } from "../_shared/rate-limiter-v2.ts";
import { errJson, okJson, preflight, newRequestId } from "../_shared/http.ts";
import { pickBestMentor, type BuddyCandidate, type MenteeFacts } from "./compatibility.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") return preflight(req);
  const requestId = newRequestId();

  if (req.method !== "POST") {
    return errJson(req, { code: "method_not_allowed", message: "POST only", requestId });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return errJson(req, { code: "unauthorized", message: "Sign in to request a buddy.", requestId });
    }
    const anon = getAnonClient(authHeader, "request-buddy-match");
    const { data: userData, error: userErr } = await anon.auth.getUser();
    if (userErr || !userData?.user) {
      return errJson(req, { code: "unauthorized", message: "Invalid session.", requestId });
    }
    const menteeUserId = userData.user.id;

    const service = getServiceClient("request-buddy-match");

    const rl = await checkRateLimit(service, {
      ip: getClientIp(req),
      accountId: menteeUserId,
      tier: "authenticated",
      scope: "request-buddy-match",
    });
    if (!rl.allowed) {
      return errJson(req, {
        code: "rate_limited",
        message: "Too many match requests. Please try again shortly.",
        requestId,
        headers: { "Retry-After": String(rl.retryAfterSeconds ?? 60) },
      });
    }

    // 1-3. Load mentee profile, existing matches, and available mentors in parallel
    const [menteeQuery, existingQuery, mentorsQuery] = await Promise.all([
      service
        .from("buddy_profiles")
        .select("user_id, role, arthritis_type, location_region, mobility_level, age_band")
        .eq("user_id", menteeUserId)
        .maybeSingle(),
      service
        .from("buddy_matches")
        .select("mentor_id, status")
        .eq("mentee_id", menteeUserId)
        .in("status", ["pending", "active"]),
      service
        .from("buddy_profiles")
        .select("id, user_id, arthritis_type, location_region, mobility_level, age_band, available, max_mentees")
        .eq("role", "mentor")
        .eq("available", true),
    ]);

    // Mentee must have a buddy_profile of role='mentee'.
    const { data: menteeProfile, error: menteeErr } = menteeQuery;
    if (menteeErr) {
      console.error(`[buddy:${requestId}] mentee lookup`, menteeErr);
      return errJson(req, { code: "server_error", message: "Could not load your profile.", requestId });
    }
    if (!menteeProfile || menteeProfile.role !== "mentee") {
      return errJson(req, { code: "bad_request", message: "Create a buddy profile as a mentee first.", requestId });
    }

    // Skip mentors the mentee already has an active/pending match with.
    const { data: existing } = existingQuery;
    const excluded = new Set<string>((existing ?? []).map((r) => r.mentor_id as string));

    if (excluded.size > 0) {
      // If they already have an active match, return it instead of creating a new one.
      return errJson(req, {
        code: "conflict",
        message: "You already have a pending or active buddy match.",
        requestId,
      });
    }

    // Pull available mentor candidates.
    const { data: mentors, error: mentorsErr } = mentorsQuery;
    if (mentorsErr) {
      console.error(`[buddy:${requestId}] mentors`, mentorsErr);
      return errJson(req, { code: "server_error", message: "Could not load mentors.", requestId });
    }
    if (!mentors || mentors.length === 0) {
      return errJson(req, {
        code: "not_found",
        message: "No mentors available right now. Please check back soon.",
        requestId,
      });
    }

    // 4. Filter mentors who have spare capacity.
    const mentorIds = mentors.map((m) => m.user_id as string);
    const { data: counts } = await service
      .from("buddy_matches")
      .select("mentor_id, status")
      .in("mentor_id", mentorIds)
      .in("status", ["pending", "active"]);
    const activePerMentor = new Map<string, number>();
    for (const r of counts ?? []) {
      activePerMentor.set(r.mentor_id as string, (activePerMentor.get(r.mentor_id as string) ?? 0) + 1);
    }
    const eligible = (mentors as BuddyCandidate[]).filter(
      (m) => (activePerMentor.get(m.user_id) ?? 0) < m.max_mentees,
    );

    // 5. Score and pick best.
    const menteeFacts: MenteeFacts = {
      arthritis_type: menteeProfile.arthritis_type as string,
      location_region: menteeProfile.location_region as string,
      mobility_level: menteeProfile.mobility_level as MenteeFacts["mobility_level"],
      age_band: menteeProfile.age_band as string,
    };
    const best = pickBestMentor(eligible, menteeFacts, excluded);
    if (!best) {
      return errJson(req, {
        code: "not_found",
        message: "No suitable mentor available right now.",
        requestId,
      });
    }

    // 6. Create the match (RLS allows because we use service role).
    const { data: match, error: insertErr } = await service
      .from("buddy_matches")
      .insert({
        mentor_id: best.mentor.user_id,
        mentee_id: menteeUserId,
        status: "pending",
        compatibility_score: best.score,
        compatibility_breakdown: best.breakdown,
      })
      .select("id, status, compatibility_score, compatibility_breakdown, created_at")
      .single();

    if (insertErr) {
      console.error(`[buddy:${requestId}] match insert`, insertErr);
      return errJson(req, { code: "server_error", message: "Could not create match.", requestId });
    }

    return okJson(
      {
        match,
        mentor: {
          arthritis_type: best.mentor.arthritis_type,
          location_region: best.mentor.location_region,
          age_band: best.mentor.age_band,
        },
      },
      req,
      { requestId },
    );
  } catch (e) {
    console.error(`[buddy:${requestId}] unhandled`, e);
    return errJson(req, { code: "server_error", message: "Unexpected error.", requestId });
  }
});
