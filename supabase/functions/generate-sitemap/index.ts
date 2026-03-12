import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const BASE = "https://livingwitharthritis.org.uk";
const TODAY = new Date().toISOString().slice(0, 10);

/* ── Static pages ── */
const staticPages: { loc: string; priority: string; changefreq: string; lastmod?: string; hreflang?: boolean }[] = [
  { loc: "/", priority: "1.0", changefreq: "weekly", hreflang: true },
  { loc: "/about", priority: "0.7", changefreq: "monthly" },
  { loc: "/chat", priority: "0.8", changefreq: "monthly" },
  { loc: "/exercises", priority: "0.9", changefreq: "weekly", hreflang: true },
  { loc: "/diet", priority: "0.9", changefreq: "weekly", hreflang: true },
  { loc: "/self-help", priority: "0.8", changefreq: "monthly" },
  { loc: "/trust", priority: "0.8", changefreq: "monthly", hreflang: true },
  { loc: "/community", priority: "0.8", changefreq: "weekly", hreflang: true },
  { loc: "/blog", priority: "0.9", changefreq: "weekly", hreflang: true },
  { loc: "/zakat-appeal", priority: "0.7", changefreq: "monthly" },
  { loc: "/pain-journal", priority: "0.7", changefreq: "monthly", hreflang: true },
  { loc: "/arthritis-flare-ups", priority: "0.9", changefreq: "monthly", hreflang: true },
  { loc: "/privacy", priority: "0.4", changefreq: "yearly" },
  { loc: "/cookies", priority: "0.4", changefreq: "yearly" },
  { loc: "/accessibility", priority: "0.5", changefreq: "monthly" },
  { loc: "/sitemap", priority: "0.3", changefreq: "monthly" },
];

/* ── Condition pages ── */
const conditionPages = [
  "/conditions/osteoarthritis",
  "/conditions/rheumatoid-arthritis",
  "/conditions/psoriatic-arthritis",
];

/* ── Daily tips ── */
const dailyTipSlugs = [
  "overview", "morning-stretches", "stay-hydrated", "anti-inflammatory-snacks",
  "walk-20-minutes", "prioritise-sleep", "pace-yourself", "health-tips", "daily-living",
];

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: string, hreflang = false): string {
  const full = `${BASE}${loc}`;
  let entry = `  <url>\n    <loc>${full}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>`;
  if (hreflang) {
    entry += `\n    <xhtml:link rel="alternate" hreflang="en-GB" href="${full}" />`;
  }
  entry += "\n  </url>";
  return entry;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog articles from DB
    const { data: dbArticles } = await supabase
      .from("blog_articles")
      .select("slug, date, updated_at")
      .eq("is_published", true)
      .order("date", { ascending: false });

    // Fetch blog view slugs to catch client-side-only articles
    const { data: viewSlugs } = await supabase
      .from("blog_views")
      .select("slug, updated_at")
      .order("updated_at", { ascending: false });

    // Build a map of all blog slugs with their best lastmod
    const blogMap = new Map<string, string>();

    // Add DB articles
    if (dbArticles) {
      for (const a of dbArticles) {
        blogMap.set(a.slug, (a.updated_at || a.date || TODAY).slice(0, 10));
      }
    }

    // Add any slugs from blog_views not already covered
    if (viewSlugs) {
      for (const v of viewSlugs) {
        if (!blogMap.has(v.slug)) {
          blogMap.set(v.slug, (v.updated_at || TODAY).slice(0, 10));
        }
      }
    }

    // Build XML
    const entries: string[] = [];

    // Static pages
    for (const p of staticPages) {
      entries.push(urlEntry(p.loc, p.lastmod || TODAY, p.changefreq, p.priority, p.hreflang));
    }

    // Condition pages
    for (const c of conditionPages) {
      entries.push(urlEntry(c, TODAY, "monthly", "0.9", true));
    }

    // Blog articles
    for (const [slug, lastmod] of blogMap) {
      entries.push(urlEntry(`/blog/${slug}`, lastmod, "monthly", "0.8"));
    }

    // Daily tips
    for (const slug of dailyTipSlugs) {
      entries.push(urlEntry(`/daily-tips/${slug}`, TODAY, "monthly", "0.7"));
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", {
      status: 500,
      headers: corsHeaders,
    });
  }
});
