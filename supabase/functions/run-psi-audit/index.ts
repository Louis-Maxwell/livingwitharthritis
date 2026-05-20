// Scheduled PageSpeed Insights audit runner.
// Audits published + production URLs across mobile + desktop, stores
// timestamped Lighthouse JSON in the `lighthouse-reports` storage bucket.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Authorize: only admin users (or service_role callers like the cron job) may
// trigger this function. Without this, anyone with the anon key could exhaust
// the PageSpeed API quota and fill the lighthouse-reports bucket.
async function authorize(
  req: Request,
  supabaseUrl: string,
  serviceKey: string,
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { ok: false, status: 401, error: "Authentication required" };
  }
  const token = authHeader.slice(7);

  // Allow the service role key directly (used by scheduled cron). Compare to
  // the configured key value rather than trusting an unsigned JWT payload.
  if (token === serviceKey) return { ok: true };

  // Otherwise, verify the JWT signature via Supabase and check the admin role.
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
  if (claimsError || !claimsData?.claims?.sub) {
    return { ok: false, status: 401, error: "Invalid session" };
  }
  const userId = claimsData.claims.sub as string;

  const adminClient = createClient(supabaseUrl, serviceKey);
  const { data: roleRow } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (roleRow) return { ok: true };

  return { ok: false, status: 403, error: "Admin access required" };
}

const TARGETS: Array<{ name: string; url: string }> = [
  { name: "published", url: "https://livingwitharthritis.lovable.app" },
  { name: "production", url: "https://www.livingwitharthritis.org.uk" },
];

const STRATEGIES: Array<"mobile" | "desktop"> = ["mobile", "desktop"];

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

type RunResult = {
  target: string;
  url: string;
  strategy: string;
  ok: boolean;
  storagePath?: string;
  performanceScore?: number | null;
  lcpMs?: number | null;
  error?: string;
};

async function runOne(
  target: { name: string; url: string },
  strategy: "mobile" | "desktop",
  apiKey: string,
  supabase: ReturnType<typeof createClient>,
  runStamp: string,
): Promise<RunResult> {
  const params = new URLSearchParams({
    url: target.url,
    strategy,
    key: apiKey,
  });
  ["performance", "accessibility", "best-practices", "seo"].forEach((c) =>
    params.append("category", c),
  );

  try {
    const resp = await fetch(`${PSI_ENDPOINT}?${params.toString()}`);
    const bodyText = await resp.text();
    if (!resp.ok) {
      return {
        target: target.name,
        url: target.url,
        strategy,
        ok: false,
        error: `PSI ${resp.status}: ${bodyText.slice(0, 300)}`,
      };
    }

    const json = JSON.parse(bodyText);
    const lhr = json.lighthouseResult ?? {};
    const performanceScore = lhr.categories?.performance?.score ?? null;
    const lcpMs =
      lhr.audits?.["largest-contentful-paint"]?.numericValue ?? null;

    const path = `${runStamp}/lh-${target.name}-${strategy}.json`;
    const { error: uploadError } = await supabase.storage
      .from("lighthouse-reports")
      .upload(path, bodyText, {
        contentType: "application/json",
        upsert: true,
      });

    if (uploadError) {
      return {
        target: target.name,
        url: target.url,
        strategy,
        ok: false,
        error: `Upload failed: ${uploadError.message}`,
      };
    }

    return {
      target: target.name,
      url: target.url,
      strategy,
      ok: true,
      storagePath: path,
      performanceScore,
      lcpMs,
    };
  } catch (err) {
    return {
      target: target.name,
      url: target.url,
      strategy,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("PAGESPEED_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "PAGESPEED_API_KEY not configured" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
  if (!supabaseUrl || !serviceKey) {
    return new Response(
      JSON.stringify({ error: "Supabase env vars missing" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const auth = await authorize(req, supabaseUrl, serviceKey);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const runStamp = new Date().toISOString().replace(/[:.]/g, "-");

  const results: RunResult[] = [];
  // Sequential to be polite to PSI
  for (const target of TARGETS) {
    for (const strategy of STRATEGIES) {
      const result = await runOne(target, strategy, apiKey, supabase, runStamp);
      results.push(result);
      console.log(
        `[psi] ${target.name}/${strategy}: ${
          result.ok
            ? `score=${result.performanceScore} lcp=${result.lcpMs}ms`
            : `FAIL ${result.error}`
        }`,
      );
    }
  }

  const summary = {
    runStamp,
    completedAt: new Date().toISOString(),
    runs: results,
  };

  await supabase.storage
    .from("lighthouse-reports")
    .upload(`${runStamp}/_summary.json`, JSON.stringify(summary, null, 2), {
      contentType: "application/json",
      upsert: true,
    });

  // Latest pointer for dashboards
  await supabase.storage
    .from("lighthouse-reports")
    .upload("latest.json", JSON.stringify(summary, null, 2), {
      contentType: "application/json",
      upsert: true,
    });

  // Maintain a rolling history.json (last 60 runs) for trend charts.
  // Storage list API is locked down, so we keep our own index.
  type HistoryEntry = {
    runStamp: string;
    completedAt: string;
    runs: Array<{
      target: string;
      strategy: string;
      ok: boolean;
      performanceScore?: number | null;
      lcpMs?: number | null;
    }>;
  };
  let history: HistoryEntry[] = [];
  try {
    const { data: existing } = await supabase.storage
      .from("lighthouse-reports")
      .download("history.json");
    if (existing) {
      const text = await existing.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) history = parsed as HistoryEntry[];
    }
  } catch (_) {
    // first run — no history yet
  }

  history.push({
    runStamp,
    completedAt: summary.completedAt,
    runs: results.map((r) => ({
      target: r.target,
      strategy: r.strategy,
      ok: r.ok,
      performanceScore: r.performanceScore ?? null,
      lcpMs: r.lcpMs ?? null,
    })),
  });
  if (history.length > 60) history = history.slice(-60);

  await supabase.storage
    .from("lighthouse-reports")
    .upload("history.json", JSON.stringify(history), {
      contentType: "application/json",
      upsert: true,
    });

  return new Response(JSON.stringify(summary, null, 2), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
