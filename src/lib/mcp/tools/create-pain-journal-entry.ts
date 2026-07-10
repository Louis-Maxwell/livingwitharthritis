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
  name: "create_pain_journal_entry",
  title: "Create pain journal entry",
  description:
    "Record a new pain journal entry for the signed-in user. Use this to log daily pain, stiffness, joints affected, mood, sleep, and notes. Writes to the caller's own row under RLS.",
  inputSchema: {
    entry_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("Date of the entry in YYYY-MM-DD (defaults to today if omitted).")
      .optional(),
    pain_level: z.number().int().min(0).max(10).describe("Overall pain 0 (none) – 10 (worst)."),
    stiffness_duration: z
      .number()
      .int()
      .min(0)
      .max(1440)
      .optional()
      .describe("Morning stiffness duration in minutes."),
    joints_affected: z
      .array(z.string().max(40))
      .max(20)
      .optional()
      .describe("List of affected joints, e.g. ['left knee','right hand']."),
    mood: z.string().max(80).optional(),
    sleep_quality: z.number().int().min(0).max(10).optional().describe("Sleep 0 (awful) – 10 (great)."),
    activities: z.string().max(1000).optional(),
    medications: z.string().max(1000).optional(),
    triggers: z.string().max(1000).optional(),
    notes: z.string().max(2000).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("pain_journal_entries")
      .insert({
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
        notes: input.notes ?? null,
      })
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Saved pain journal entry for ${data.entry_date}.` }],
      structuredContent: { entry: data },
    };
  },
});
