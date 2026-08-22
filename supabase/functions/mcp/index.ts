// To take ownership, delete this banner line; the plugin then leaves the file alone.
// supabase function: mcp
// Bundled from src/lib/mcp/index.ts by @lovable.dev/mcp-js.
// src/lib/mcp/index.ts
import { auth, defineMcp } from "npm:@lovable.dev/mcp-js@0.22.0";

// src/lib/mcp/tools/search-blog-articles.ts
import { defineTool } from "npm:@lovable.dev/mcp-js@0.22.0";
import { z } from "npm:zod@^3.25.76";

// src/lib/mcp/tools/_supabase.ts
import { createClient } from "npm:@supabase/supabase-js@^2.109.0";
function supabaseForUser(ctx) {
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

// src/lib/mcp/tools/search-blog-articles.ts
var search_blog_articles_default = defineTool({
  name: "search_blog_articles",
  title: "Search blog articles",
  description: "Search published Living With Arthritis UK blog articles by keyword in title, excerpt, or category. Returns up to 20 matching articles with title, slug, category, excerpt, and direct answer summary.",
  inputSchema: {
    query: z.string().min(1).max(200).describe("Keyword or phrase to search for."),
    limit: z.number().int().min(1).max(20).optional().describe("Max results to return (default 10).")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const like = `%${query.replace(/[\\,.()%_]/g, (m) => `\\${m}`)}%`;
    const { data, error } = await supabase.from("blog_articles").select("slug,title,category,excerpt,direct_answer,date").eq("is_published", true).or(`title.ilike.${like},excerpt.ilike.${like},category.ilike.${like},keywords.ilike.${like}`).order("date", { ascending: false }).limit(limit ?? 10);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { articles: data ?? [] }
    };
  }
});

// src/lib/mcp/tools/get-blog-article.ts
import { defineTool as defineTool2 } from "npm:@lovable.dev/mcp-js@0.22.0";
import { z as z2 } from "npm:zod@^3.25.76";
var get_blog_article_default = defineTool2({
  name: "get_blog_article",
  title: "Get blog article",
  description: "Fetch the full content of a published Living With Arthritis UK blog article by its slug. Returns title, author, review info, direct answer, and full markdown body.",
  inputSchema: {
    slug: z2.string().min(1).max(200).describe("URL slug of the article, e.g. 'ginger-vs-turmeric-for-arthritis'.")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("blog_articles").select("slug,title,category,excerpt,direct_answer,content,author,author_credentials,reviewed_by,reviewer_credentials,date").eq("slug", slug).eq("is_published", true).maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: `No published article with slug '${slug}'.` }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { article: data }
    };
  }
});

// src/lib/mcp/tools/list-my-appointments.ts
import { defineTool as defineTool3 } from "npm:@lovable.dev/mcp-js@0.22.0";
import { z as z3 } from "npm:zod@^3.25.76";
var list_my_appointments_default = defineTool3({
  name: "list_my_appointments",
  title: "List my appointments",
  description: "List the signed-in user's own Living With Arthritis UK appointments (virtual physiotherapy / consultation bookings), most recent first. Row-Level Security ensures only your own rows are returned.",
  inputSchema: {
    limit: z3.number().int().min(1).max(50).optional().describe("Max results (default 20).")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("appointments").select("id,appointment_type,preferred_date,preferred_time,status,notes,created_at").eq("user_id", ctx.getUserId()).order("created_at", { ascending: false }).limit(limit ?? 20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { appointments: data ?? [] }
    };
  }
});

// src/lib/mcp/tools/list-my-pain-journal.ts
import { defineTool as defineTool4 } from "npm:@lovable.dev/mcp-js@0.22.0";
import { z as z4 } from "npm:zod@^3.25.76";
var list_my_pain_journal_default = defineTool4({
  name: "list_my_pain_journal_entries",
  title: "List my pain journal entries",
  description: "List the signed-in user's own pain journal entries, most recent first. Returns pain level (0\u201310), stiffness duration, joints affected, mood, sleep quality, and free-text notes. RLS ensures only your own entries are returned.",
  inputSchema: {
    limit: z4.number().int().min(1).max(90).optional().describe("Max entries (default 30).")
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase.from("pain_journal_entries").select("id,entry_date,pain_level,stiffness_duration,joints_affected,mood,sleep_quality,activities,medications,triggers,notes").eq("user_id", ctx.getUserId()).order("entry_date", { ascending: false }).limit(limit ?? 30);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { entries: data ?? [] }
    };
  }
});

// src/lib/mcp/tools/create-pain-journal-entry.ts
import { defineTool as defineTool5 } from "npm:@lovable.dev/mcp-js@0.22.0";
import { z as z5 } from "npm:zod@^3.25.76";
var create_pain_journal_entry_default = defineTool5({
  name: "create_pain_journal_entry",
  title: "Create pain journal entry",
  description: "Record a new pain journal entry for the signed-in user. Use this to log daily pain, stiffness, joints affected, mood, sleep, and notes. Writes to the caller's own row under RLS.",
  inputSchema: {
    entry_date: z5.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Date of the entry in YYYY-MM-DD (defaults to today if omitted).").optional(),
    pain_level: z5.number().int().min(0).max(10).describe("Overall pain 0 (none) \u2013 10 (worst)."),
    stiffness_duration: z5.number().int().min(0).max(1440).optional().describe("Morning stiffness duration in minutes."),
    joints_affected: z5.array(z5.string().max(40)).max(20).optional().describe("List of affected joints, e.g. ['left knee','right hand']."),
    mood: z5.string().max(80).optional(),
    sleep_quality: z5.number().int().min(0).max(10).optional().describe("Sleep 0 (awful) \u2013 10 (great)."),
    activities: z5.string().max(1e3).optional(),
    medications: z5.string().max(1e3).optional(),
    triggers: z5.string().max(1e3).optional(),
    notes: z5.string().max(2e3).optional()
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const { data, error } = await supabase.from("pain_journal_entries").insert({
      user_id: ctx.getUserId(),
      entry_date: input.entry_date ?? today,
      pain_level: input.pain_level,
      stiffness_duration: input.stiffness_duration ?? null,
      joints_affected: input.joints_affected ?? null,
      mood: input.mood ?? null,
      sleep_quality: input.sleep_quality ?? null,
      activities: input.activities ?? null,
      medications: input.medications ?? null,
      triggers: input.triggers ?? null,
      notes: input.notes ?? null
    }).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Saved pain journal entry for ${data.entry_date}.` }],
      structuredContent: { entry: data }
    };
  }
});

// src/lib/mcp/index.ts
var projectRef = "zrvcejlncpndjfyuvcrd";
if (!projectRef) {
  throw new Error(
    "VITE_SUPABASE_PROJECT_ID is not set. Please check your environment configuration."
  );
}
var mcp_default = defineMcp({
  name: "living-with-arthritis-mcp",
  title: "Living With Arthritis UK",
  version: "0.1.0",
  instructions: "Tools for Living With Arthritis UK \u2014 a not-for-profit UK arthritis information and support service. Use `search_blog_articles` and `get_blog_article` to answer questions with the site's evidence-based content. Use `list_my_appointments`, `list_my_pain_journal_entries`, and `create_pain_journal_entry` to help the signed-in user review or log their own arthritis self-care data. All patient data is scoped to the signed-in user under Row-Level Security.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated"
  }),
  tools: [
    search_blog_articles_default,
    get_blog_article_default,
    list_my_appointments_default,
    list_my_pain_journal_default,
    create_pain_journal_entry_default
  ]
});

// lovable-mcp-supabase-entry.ts
import { createSupabaseHandler } from "npm:@lovable.dev/mcp-js@0.22.0/stacks/supabase";
import { withEndpointRateLimit } from "../_shared/rate-limit.ts";
Deno.serve(
  withEndpointRateLimit(
    "mcp",
    createSupabaseHandler(mcp_default, { functionName: "mcp" }),
  ),
);
