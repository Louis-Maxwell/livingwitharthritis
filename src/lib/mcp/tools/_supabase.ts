import type { ToolContext } from "@lovable.dev/mcp-js";

// Supabase client removed - functionality to be restored later
declare const process: { env: Record<string, string | undefined> };

export function supabaseForUser(ctx: ToolContext) {
  // Supabase client creation removed - restore with createClient
  return {
    from: () => ({
      select: () => ({
        eq: () => ({ order: () => ({ limit: async () => ({ data: [], error: null }) }) }),
        insert: async () => ({ data: null, error: null }),
      }),
    }),
  };
}
