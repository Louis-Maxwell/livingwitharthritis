/**
 * Backend connection constants.
 *
 * These are publishable, client-side-safe values (the project URL and the
 * anon/publishable key). They must be provided via environment variables.
 */

const requiredEnv = (name: string, value: unknown): string => {
  if (typeof value === 'string' && value.length > 0) return value;
  throw new Error(
    `Missing required environment variable: ${name}. Check your .env.local file or deployment configuration.`,
  );
};

export const SUPABASE_PROJECT_ID = requiredEnv(
  'VITE_SUPABASE_PROJECT_ID',
  import.meta.env.VITE_SUPABASE_PROJECT_ID,
);

export const SUPABASE_URL = requiredEnv(
  'VITE_SUPABASE_URL',
  import.meta.env.VITE_SUPABASE_URL,
);

export const SUPABASE_PUBLISHABLE_KEY = requiredEnv(
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
