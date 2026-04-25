// Shared Supabase client factory for edge functions.
// Validates required environment variables eagerly and surfaces clear,
// actionable errors so function startup failures are easy to diagnose.

import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";

export class SupabaseConfigError extends Error {
  constructor(missing: string[], context?: string) {
    const where = context ? ` (${context})` : "";
    super(
      `Supabase client misconfigured${where}: missing environment variable(s): ${missing.join(", ")}. ` +
        `Set these in the edge function's secrets before invocation.`,
    );
    this.name = "SupabaseConfigError";
  }
}

function readEnv(keys: string[]): { values: Record<string, string>; missing: string[] } {
  const values: Record<string, string> = {};
  const missing: string[] = [];
  for (const key of keys) {
    const v = Deno.env.get(key);
    if (!v || v.trim() === "") {
      missing.push(key);
    } else {
      values[key] = v;
    }
  }
  return { values, missing };
}

/**
 * Service-role client. Bypasses RLS — use only for trusted server-side work.
 * Throws SupabaseConfigError if SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY are missing/empty.
 */
export function getServiceClient(context?: string): SupabaseClient {
  const { values, missing } = readEnv(["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
  if (missing.length > 0) {
    const err = new SupabaseConfigError(missing, context);
    console.error(`[supabase-client] ${err.message}`);
    throw err;
  }
  return createClient(values.SUPABASE_URL, values.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Anon client. Honors RLS. Optionally forwards an Authorization header so
 * downstream queries run as the calling user (use with `verify_jwt = false`
 * functions that still need to validate the user's session via supabase.auth.getUser()).
 */
export function getAnonClient(authHeader?: string | null, context?: string): SupabaseClient {
  const { values, missing } = readEnv(["SUPABASE_URL", "SUPABASE_ANON_KEY"]);
  if (missing.length > 0) {
    const err = new SupabaseConfigError(missing, context);
    console.error(`[supabase-client] ${err.message}`);
    throw err;
  }
  return createClient(values.SUPABASE_URL, values.SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: authHeader ? { headers: { Authorization: authHeader } } : undefined,
  });
}

/**
 * Type guard for catch blocks — lets handlers return a 500 with a helpful body
 * when the failure is config-related rather than runtime/network.
 */
export function isSupabaseConfigError(e: unknown): e is SupabaseConfigError {
  return e instanceof SupabaseConfigError;
}
