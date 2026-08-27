import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
// Supabase import removed - functionality to be restored later

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
    // Supabase blog query removed - functionality to be restored later
    return {
      content: [{ type: "text", text: "Supabase removed - restore functionality" }],
      structuredContent: { articles: [] },
    };
  },
});
