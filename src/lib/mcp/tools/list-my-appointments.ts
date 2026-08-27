import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
// Supabase import removed - functionality to be restored later

export default defineTool({
  name: "list_my_appointments",
  title: "List my appointments",
  description:
    "List the signed-in user's own Living With Arthritis UK appointments (virtual physiotherapy / consultation bookings), most recent first. Row-Level Security ensures only your own rows are returned.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    // Supabase appointments query removed - functionality to be restored later
    return {
      content: [{ type: "text", text: "Supabase removed - restore functionality" }],
      structuredContent: { appointments: [] },
    };
  },
});
