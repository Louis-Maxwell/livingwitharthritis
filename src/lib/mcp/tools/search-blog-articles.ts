import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "./_supabase";

export default defineTool({
  name: "search_blog_articles",
  title: "Search blog articles",
  description:
    "Search published Living With Arthritis UK blog articles by keyword in title, excerpt, or category. Returns up to 20 matching articles with title, slug, category, excerpt, and direct answer summary.",
  inputSchema: {
    query: z.string().min(1).max(200).describe("Keyword or phrase to search for."),
    limit: z.number().int().min(1).max(20).optional().describe("Max results to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const like = `%${query.replace(/[%_]/g, (m) => `\\${m}`)}%`;
    const { data, error } = await supabase
      .from("blog_articles")
      .select("slug,title,category,excerpt,direct_answer,date")
      .eq("is_published", true)
      .or(`title.ilike.${like},excerpt.ilike.${like},category.ilike.${like},keywords.ilike.${like}`)
      .order("date", { ascending: false })
      .limit(limit ?? 10);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { articles: data ?? [] },
    };
  },
});
