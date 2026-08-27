import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
// Supabase import removed - functionality to be restored later

export default defineTool({
  name: "get_blog_article",
  title: "Get blog article",
  description:
    "Fetch the full content of a published Living With Arthritis UK blog article by its slug. Returns title, author, review info, direct answer, and full markdown body.",
  inputSchema: {
    slug: z.string().min(1).max(200).describe("URL slug of the article, e.g. 'ginger-vs-turmeric-for-arthritis'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ slug }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    // Supabase blog query removed - functionality to be restored later
    return { content: [{ type: "text", text: "Supabase removed - restore functionality" }], isError: true };
  },
});
