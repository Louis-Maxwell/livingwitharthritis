/* eslint-disable @typescript-eslint/no-explicit-any */
// Serves the daily-refreshed sitemap from `public.sitemap_cache`.
// Falls back to a friendly 404 when the cache is empty (first run not done).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
  const supabase = createClient(supabaseUrl, anonKey);

  const { data, error } = await supabase
    .from("sitemap_cache")
    .select("xml, updated_at")
    .eq("id", 1)
    .maybeSingle();

  if (error || !data?.xml) {
    return new Response("Sitemap not yet generated", {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "text/plain" },
    });
  }

  return new Response(data.xml, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Sitemap-Updated": data.updated_at as string,
    },
  });
});
