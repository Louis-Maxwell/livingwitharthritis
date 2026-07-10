import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

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
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("pain_journal_entries")
      .select("id,entry_date,pain_level,stiffness_duration,joints_affected,mood,sleep_quality,activities,medications,triggers,notes")
      .eq("user_id", ctx.getUserId())
      .order("entry_date", { ascending: false })
      .limit(limit ?? 30);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? [], null, 2) }],
      structuredContent: { entries: data ?? [] },
    };
  },
});
