import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const GOAL = 5000; // £/month
let cache: { at: number; data: { monthToDate: number; goal: number; donorCount: number } } | null = null;
const TTL_MS = 60_000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (cache && Date.now() - cache.at < TTL_MS) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const start = new Date();
    start.setUTCDate(1);
    start.setUTCHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from("donations")
      .select("amount, status, created_at")
      .gte("created_at", start.toISOString());

    if (error) throw error;

    const rows = (data ?? []).filter(
      (r: { status?: string | null }) =>
        !r.status || ["succeeded", "completed", "paid"].includes(r.status),
    );

    const monthToDate = rows.reduce(
      (sum: number, r: { amount?: number | null }) => sum + (Number(r.amount) || 0),
      0,
    );

    const payload = {
      monthToDate,
      goal: GOAL,
      donorCount: rows.length,
    };

    cache = { at: Date.now(), data: payload };

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("donation-totals error", e);
    return new Response(
      JSON.stringify({ monthToDate: 0, goal: GOAL, donorCount: 0 }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
