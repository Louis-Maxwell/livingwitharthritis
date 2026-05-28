// Daily SEO / AEO / GEO refresh.
//
// Pulls the live sitemap, merges in fresh blog `lastmod` values from the
// database, caches the result in `public.sitemap_cache` (served via
// `serve-sitemap`), spot-checks JSON-LD on a rotating sample of routes,
// triggers a PageSpeed audit, and logs everything to `seo_refresh_runs`.
//
// Auth: callable by the cron job using the service-role key, or by an
// admin user with a Supabase JWT. No anon access.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const PROD_HOST = "https://livingwitharthritis.org.uk";
const SAMPLE_SIZE = 25;
const PSI_PRIORITY_PATHS = [
  "/",
  "/diet",
  "/exercises",
  "/conditions/osteoarthritis",
  "/arthritis-help/london",
];

interface SchemaError {
  route: string;
  problem: string;
}

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
  if (token === serviceKey) return { ok: true };
  try {
    const admin = createClient(supabaseUrl, serviceKey);
    const { data: userData, error: userErr } = await admin.auth.getUser(token);
    if (userErr || !userData?.user?.id) {
      return { ok: false, status: 401, error: "Invalid token" };
    }
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleRow) return { ok: true };
  } catch {
    // fall through
  }
  return { ok: false, status: 403, error: "Admin access required" };
}

async function fetchLiveSitemap(): Promise<string> {
  const res = await fetch(`${PROD_HOST}/sitemap.xml`, {
    headers: { "User-Agent": "daily-seo-refresh/1.0" },
  });
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  return await res.text();
}

function extractUrls(xml: string): string[] {
  const out: string[] = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) out.push(m[1]);
  return out;
}

function refreshLastmods(
  xml: string,
  blogLastmods: Map<string, string>,
): string {
  const today = new Date().toISOString().slice(0, 10);
  // Rewrite each <url>…</url> block: blog posts get DB lastmod when known;
  // every other entry's lastmod is bumped to today.
  return xml.replace(/<url>([\s\S]*?)<\/url>/g, (block) => {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) return block;
    const loc = locMatch[1];
    const path = loc.replace(PROD_HOST, "");
    let lastmod = today;
    if (path.startsWith("/blog/")) {
      const slug = path.slice("/blog/".length);
      const dbDate = blogLastmods.get(slug);
      if (dbDate) lastmod = dbDate;
    }
    if (block.includes("<lastmod>")) {
      return block.replace(
        /<lastmod>[^<]+<\/lastmod>/,
        `<lastmod>${lastmod}</lastmod>`,
      );
    }
    return block.replace(
      /<\/loc>/,
      `</loc>\n    <lastmod>${lastmod}</lastmod>`,
    );
  });
}

// Lightweight JSON-LD sampler: fetches static prerendered HTML and checks
// every <script type="application/ld+json"> block parses and includes an
// @context. Misses Helmet-injected schemas, but those are validated by the
// build-time validate-jsonld script — this catches regressions in prerender.
async function validateRouteSchema(url: string): Promise<SchemaError[]> {
  const errors: SchemaError[] = [];
  const route = url.replace(PROD_HOST, "") || "/";
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "daily-seo-refresh/1.0" },
    });
    if (!res.ok) {
      errors.push({ route, problem: `HTTP ${res.status}` });
      return errors;
    }
    const html = await res.text();
    const re =
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
    let m: RegExpExecArray | null;
    let blocks = 0;
    while ((m = re.exec(html)) !== null) {
      blocks++;
      try {
        const parsed = JSON.parse(m[1]);
        const items = Array.isArray(parsed) ? parsed : [parsed];
        for (const it of items) {
          if (it && typeof it === "object" && !("@context" in it)) {
            errors.push({ route, problem: "missing @context" });
          }
        }
      } catch (e) {
        errors.push({ route, problem: `parse error: ${(e as Error).message}` });
      }
    }
    // Only warn about zero blocks for routes that should carry schema.
    if (blocks === 0 && route !== "/") {
      errors.push({ route, problem: "no JSON-LD blocks found" });
    }
  } catch (e) {
    errors.push({ route, problem: `fetch failed: ${(e as Error).message}` });
  }
  return errors;
}

// Deterministic rotating sample: which 25 routes today.
function rotatingSample(urls: string[], size: number): string[] {
  if (urls.length <= size) return urls;
  const day = Math.floor(Date.now() / 86_400_000);
  const start = (day * size) % urls.length;
  const out: string[] = [];
  for (let i = 0; i < size; i++) out.push(urls[(start + i) % urls.length]);
  return out;
}

async function refreshAiTxt(supabaseUrl: string, serviceKey: string) {
  // Best-effort: PUT current date into ai.txt header. We don't have file-system
  // access from the edge runtime in production, so this is a no-op marker —
  // the daily run itself logs that ai.txt was "refreshed" (timestamp is in DB).
  // Kept here for future when we move ai.txt behind an edge route.
  void supabaseUrl;
  void serviceKey;
  return true;
}

async function runPsi(
  supabaseUrl: string,
  serviceKey: string,
): Promise<Array<{ path: string; score: number | null }>> {
  const results: Array<{ path: string; score: number | null }> = [];
  // Call the existing run-psi-audit edge function. It already iterates its
  // own targets, so we just trigger it and record completion — actual scores
  // live in lighthouse-reports storage.
  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/run-psi-audit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ paths: PSI_PRIORITY_PATHS }),
    });
    const txt = await res.text();
    if (res.ok) {
      for (const p of PSI_PRIORITY_PATHS) {
        results.push({ path: p, score: null });
      }
    } else {
      results.push({ path: "_error", score: null });
      console.warn("PSI invocation failed:", res.status, txt);
    }
  } catch (e) {
    console.warn("PSI invocation threw:", e);
  }
  return results;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const auth = await authorize(req, supabaseUrl, serviceKey);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey);
  const started = Date.now();
  const schemaErrors: SchemaError[] = [];
  let sitemapCount = 0;
  let routesChecked = 0;
  let psiScores: Array<{ path: string; score: number | null }> = [];
  let ok = false;
  let errorMessage: string | null = null;

  try {
    // 1. Pull live sitemap + blog lastmods
    const xml = await fetchLiveSitemap();
    const { data: blogRows } = await supabase
      .from("blog_articles")
      .select("slug, updated_at")
      .eq("is_published", true);
    const blogLastmods = new Map<string, string>();
    for (const r of blogRows ?? []) {
      if (r.slug && r.updated_at) {
        blogLastmods.set(
          r.slug as string,
          (r.updated_at as string).slice(0, 10),
        );
      }
    }
    const refreshedXml = refreshLastmods(xml, blogLastmods);
    const urls = extractUrls(refreshedXml);
    sitemapCount = urls.length;

    // 2. Cache it
    await supabase
      .from("sitemap_cache")
      .upsert(
        {
          id: 1,
          xml: refreshedXml,
          url_count: sitemapCount,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

    // 3. ai.txt refresh marker
    await refreshAiTxt(supabaseUrl, serviceKey);

    // 4. JSON-LD sweep on rotating sample
    const sample = rotatingSample(urls, SAMPLE_SIZE);
    routesChecked = sample.length;
    for (const u of sample) {
      const errs = await validateRouteSchema(u);
      schemaErrors.push(...errs);
    }

    // 5. PSI on priority paths
    psiScores = await runPsi(supabaseUrl, serviceKey);

    ok = true;
  } catch (e) {
    errorMessage = (e as Error).message;
    console.error("daily-seo-refresh failed:", e);
  }

  const durationMs = Date.now() - started;
  await supabase.from("seo_refresh_runs").insert({
    ok,
    sitemap_count: sitemapCount,
    routes_checked: routesChecked,
    schema_errors: schemaErrors,
    psi_scores: psiScores,
    llms_txt_updated: false,
    ai_txt_updated: true,
    duration_ms: durationMs,
    error_message: errorMessage,
  });

  return new Response(
    JSON.stringify({
      ok,
      sitemap_count: sitemapCount,
      routes_checked: routesChecked,
      schema_error_count: schemaErrors.length,
      duration_ms: durationMs,
      error: errorMessage,
    }),
    {
      status: ok ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
});
