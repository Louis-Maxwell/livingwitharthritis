/* eslint-disable @typescript-eslint/no-explicit-any */
// Generates a multi-channel syndication pack (Medium, LinkedIn, Twitter
// thread, Facebook, Reddit, Pinterest) for a blog post using Lovable AI.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SITE_URL = "https://livingwitharthritis.org.uk";

interface BlogRow {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  meta_description: string | null;
}

async function callAI(systemPrompt: string, userPrompt: string): Promise<string> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`AI gateway ${resp.status}: ${text.slice(0, 200)}`);
  }
  const json = await resp.json();
  return json.choices?.[0]?.message?.content?.trim() ?? "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Validate JWT + admin role
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";
    if (!slug || slug.length > 200) {
      return new Response(JSON.stringify({ error: "Invalid slug" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: article, error: artErr } = await admin
      .from("blog_articles")
      .select("slug, title, excerpt, content, category, meta_description")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle<BlogRow>();
    if (artErr || !article) {
      return new Response(JSON.stringify({ error: "Article not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const canonical = `${SITE_URL}/blog/${article.slug}`;
    // Trim content to keep prompts efficient
    const trimmed = article.content.length > 6000
      ? article.content.slice(0, 6000) + "..."
      : article.content;

    const ctx = `TITLE: ${article.title}
CATEGORY: ${article.category}
CANONICAL URL: ${canonical}
EXCERPT: ${article.excerpt}
CONTENT:
${trimmed}`;

    const systemBase = "You are a senior health-content editor for a UK arthritis charity. Tone: evidence-based, warm, plain English, en-GB spelling. Never invent medical claims. Always include the canonical URL where instructed.";

    // Run all generations in parallel
    const [medium, linkedin, twitter, facebook, reddit, pinterest] = await Promise.all([
      callAI(
        systemBase,
        `Rewrite this article as a Medium-ready post in Markdown. Keep length 900-1400 words. Add an H1, 3-5 subheadings, a TL;DR call-out at the top, and end with this exact line:\n\n_Originally published at [livingwitharthritis.org.uk](${canonical})._\n\n${ctx}`,
      ),
      callAI(
        systemBase,
        `Write a LinkedIn long-form article: a one-line hook (no emojis), then 1200-1600 words in short paragraphs, then a clear CTA pointing to ${canonical}. No hashtags inside the body — put 5 relevant hashtags on the final line.\n\n${ctx}`,
      ),
      callAI(
        systemBase,
        `Write a Twitter/X thread of 8-10 tweets. Tweet 1 is a strong hook. Each tweet under 270 characters. Number them "1/", "2/", etc. The final tweet links to ${canonical} with a CTA.\n\n${ctx}`,
      ),
      callAI(
        systemBase,
        `Write a Facebook post (180-260 words) suitable for a charity page. Conversational, ends with a question to drive comments, includes the link ${canonical}.\n\n${ctx}`,
      ),
      callAI(
        systemBase,
        `Write a Reddit post for r/arthritis or r/ChronicPain. Format: a clear title line on the first line, blank line, then a 250-400 word body that is helpful and NOT promotional. Place the source link as a single line at the very end: "Source: ${canonical}". Avoid hype words.\n\n${ctx}`,
      ),
      callAI(
        systemBase,
        `Write a Pinterest pin description: 1 attention-grabbing sentence (max 100 chars), then a 2-3 sentence summary (max 500 chars total), then 8 relevant hashtags on the final line. Link target: ${canonical}.\n\n${ctx}`,
      ),
    ]);

    const { data: saved, error: saveErr } = await admin
      .from("syndication_drafts")
      .insert({
        slug: article.slug,
        title: article.title,
        medium_markdown: medium,
        linkedin_article: linkedin,
        twitter_thread: twitter,
        facebook_post: facebook,
        reddit_post: reddit,
        pinterest_description: pinterest,
        generated_by: userData.user.id,
      })
      .select()
      .single();

    if (saveErr) throw saveErr;

    return new Response(JSON.stringify({ draft: saved }), {
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
