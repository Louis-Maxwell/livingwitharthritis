 
// Submits URLs to IndexNow (used by Bing, Yandex, Seznam) for faster
// crawling. The key is published at /public/{key}.txt so search engines
// can verify ownership.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const HOST = "livingwitharthritis.org.uk";
const KEY = "a7f9e2c4b8d61e3f5a0c2b9d4e7f1a8c"; // IndexNow key (32-char hex)

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

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const auth = await authorize(req, supabaseUrl, serviceKey);
    if (!auth.ok) {
      return new Response(JSON.stringify({ error: auth.error }), {
        status: auth.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const body = await req.json().catch(() => ({}));
    const rawUrls = Array.isArray(body?.urls) ? body.urls : [];
    const urls = rawUrls
      .filter((u: unknown): u is string => typeof u === "string")
      .filter((u: string) => u.startsWith(`https://${HOST}`) || u.startsWith(`https://www.${HOST}`))
      .slice(0, 10000);

    if (urls.length === 0) {
      return new Response(JSON.stringify({ error: "No valid URLs" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    };

    const resp = await fetch("https://api.indexnow.org/IndexNow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    return new Response(JSON.stringify({ submitted: urls.length, status: resp.status }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
