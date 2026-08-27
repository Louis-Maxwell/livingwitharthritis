import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
// Supabase import removed - functionality to be restored later

export default defineTool({
  name: "list_my_pain_journal_entries",
  title: "List my pain journal entries",
  description:
    "List the signed-in user's own pain journal entries, most recent first. Returns pain level (0–10), stiffness duration, joints affected, mood, sleep quality, and free-text notes. RLS ensures only your own entries are returned.",
  inputSchema: {
    limit: z.number().int().min(1).max(90).optional().describe("Max entries (default 30)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    // Supabase pain journal query removed - functionality to be restored later
    return {
      content: [{ type: "text", text: "Supabase removed - restore functionality" }],
      structuredContent: { entries: [] },
    };
  },
});
