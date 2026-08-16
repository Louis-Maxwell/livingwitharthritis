/**
 * Backend connection constants.
 *
 * These are publishable, client-side-safe values (the project ref, API URL and
 * the anon/publishable key) — they already ship inside the browser bundle.
 *
 * Environment variables win when present. When a build runs without them we
 * fall back to the built-in defaults and warn, rather than throwing: a missing
 * variable must never take the whole site down.
 */

const DEFAULTS = {
  VITE_SUPABASE_PROJECT_ID: 'zrvcejlncpndjfyuvcrd',
  VITE_SUPABASE_URL: 'https://zrvcejlncpndjfyuvcrd.supabase.co',
  VITE_SUPABASE_PUBLISHABLE_KEY:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs',
} as const;

type EnvName = keyof typeof DEFAULTS;

const envOrDefault = (name: EnvName, value: unknown): string => {
  if (typeof value === 'string' && value.length > 0) return value;
  console.warn(
    `[backend] ${name} is not set; using the built-in publishable default.`,
  );
  return DEFAULTS[name];
};

export const SUPABASE_PROJECT_ID = envOrDefault(
  'VITE_SUPABASE_PROJECT_ID',
  import.meta.env.VITE_SUPABASE_PROJECT_ID,
);

export const SUPABASE_URL = envOrDefault(
  'VITE_SUPABASE_URL',
  import.meta.env.VITE_SUPABASE_URL,
);

export const SUPABASE_PUBLISHABLE_KEY = envOrDefault(
  'VITE_SUPABASE_PUBLISHABLE_KEY',
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);
