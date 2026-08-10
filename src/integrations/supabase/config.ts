/**
 * Backend connection constants.
 *
 * These are publishable, client-side-safe values (the project URL and the
 * anon/publishable key). They are read from Vite env vars when available and
 * fall back to the known project values so that a build performed without the
 * `.env` file still produces a working bundle instead of throwing
 * "supabaseUrl is required" at module-init time (which blanks the whole app).
 */

const FALLBACK_PROJECT_ID = 'eswdtpmknwjxtvkyxvmi';
const FALLBACK_URL = `https://${FALLBACK_PROJECT_ID}.supabase.co`;
const FALLBACK_PUBLISHABLE_KEY = 'sb_publishable_R-r2QJnvd3S9RSC8BqNTfw_JvNUm_Dd';

const pick = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.length > 0 ? value : fallback;

export const SUPABASE_PROJECT_ID = pick(
  import.meta.env.VITE_SUPABASE_PROJECT_ID,
  FALLBACK_PROJECT_ID,
);

export const SUPABASE_URL = pick(
  import.meta.env.VITE_SUPABASE_URL,
  FALLBACK_URL,
);

export const SUPABASE_PUBLISHABLE_KEY = pick(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  FALLBACK_PUBLISHABLE_KEY,
);
