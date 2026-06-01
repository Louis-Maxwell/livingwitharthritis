// Picks the oldest published article, asks Lovable AI to rewrite its intro,
// stores the draft in content_refresh_queue for admin review.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Find oldest published article not currently in a pending refresh
    const { data: articles, error: articleErr } = await supabase
      .from("blog_articles")
      .select("slug, title, content, excerpt, updated_at")
      .eq("is_published", true)
      .order("updated_at", { ascending: true })
      .limit(10);

    if (articleErr) throw articleErr;
    if (!articles?.length) {
      return new Response(JSON.stringify({ message: "No articles" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: pending } = await supabase
      .from("content_refresh_queue")
      .select("slug")
      .eq("status", "pending");
    const pendingSlugs = new Set((pending ?? []).map((p) => p.slug));
    const target = articles.find((a) => !pendingSlugs.has(a.slug));
    if (!target) {
      return new Response(JSON.stringify({ message: "All recent articles already queued" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const originalIntro = (target.excerpt || target.content || "").slice(0, 600);

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an editor for a UK arthritis charity. Rewrite the article intro below in clear plain English (en-GB), keeping medical accuracy, hooking the reader in the first sentence, and ending with what the article will help them do. 80–140 words. No headings, no bullet points, no AI-style preambles.",
          },
          { role: "user", content: `Article title: ${target.title}\n\nCurrent intro:\n${originalIntro}` },
        ],
      }),
    });

    if (!aiRes.ok) {
      const errText = await aiRes.text();
      throw new Error(`AI gateway ${aiRes.status}: ${errText}`);
    }
    const aiJson = await aiRes.json();
    const rewritten = aiJson.choices?.[0]?.message?.content?.trim();
    if (!rewritten) throw new Error("Empty AI response");

    const { error: insertErr } = await supabase.from("content_refresh_queue").insert({
      slug: target.slug,
      status: "pending",
      original_intro: originalIntro,
      ai_rewritten_intro: rewritten,
    });
    if (insertErr) throw insertErr;

    return new Response(
      JSON.stringify({ success: true, slug: target.slug }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("daily-content-freshness error", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
