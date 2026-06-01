// Pulls current positions for tracked keywords via Semrush connector gateway,
// writes a snapshot into rank_history. Triggered weekly via pg_cron.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const auth = await authorize(req, supabaseUrl, serviceKey);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.error }), {
      status: auth.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const semrushKey = Deno.env.get("SEMRUSH_API_KEY");

  if (!lovableKey || !semrushKey) {
    return new Response(
      JSON.stringify({
        error: "Semrush connector not linked. Connect Semrush in project settings.",
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: keywords, error: kwErr } = await supabase
      .from("tracked_keywords")
      .select("id, keyword, market")
      .eq("is_active", true);

    if (kwErr) throw kwErr;
    if (!keywords?.length) {
      return new Response(JSON.stringify({ message: "No tracked keywords" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let processed = 0;
    let failed = 0;

    for (const kw of keywords) {
      try {
        const params = new URLSearchParams({
          phrase: kw.keyword,
          database: kw.market || "uk",
          display_limit: "1",
          export_columns: "Ph,Po,Nq,Ur",
        });
        const res = await fetch(
          `${GATEWAY}/keywords/phrase_organic?${params}`,
          {
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": semrushKey,
            },
          },
        );
        if (!res.ok) {
          failed++;
          continue;
        }
        const json = await res.json();
        const row = json.data?.rows?.[0];
        if (!row) {
          await supabase.from("rank_history").insert({
            keyword_id: kw.id,
            position: null,
          });
          processed++;
          continue;
        }

        await supabase.from("rank_history").insert({
          keyword_id: kw.id,
          position: Number(row[1]) || null,
          search_volume: Number(row[2]) || null,
          ranking_url: row[3] || null,
        });
        processed++;
      } catch (e) {
        console.error("kw error", kw.keyword, e);
        failed++;
      }
    }

    return new Response(
      JSON.stringify({ success: true, processed, failed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("seo-rank-sync error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
