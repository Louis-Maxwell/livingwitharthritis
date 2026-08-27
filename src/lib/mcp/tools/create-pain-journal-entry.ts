import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
// Supabase import removed - functionality to be restored later

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
    // Supabase insert removed - functionality to be restored later
    const today = new Date().toISOString().slice(0, 10);
    return {
      content: [{ type: "text", text: `Supabase removed - restore functionality` }],
      structuredContent: { entry: null },
    };
  },
});
