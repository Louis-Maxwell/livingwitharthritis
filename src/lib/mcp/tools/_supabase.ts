import { createClient } from "@supabase/supabase-js";
import type { ToolContext } from "@lovable.dev/mcp-js";

// The MCP entry and its tools are bundled into a Deno edge function at build time,
// so `process.env` is read at runtime by Deno's Node compat, not by the browser.
// Declare it locally so TypeScript typechecks the Vite project without pulling in @types/node.
declare const process: { env: Record<string, string | undefined> };

export function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
