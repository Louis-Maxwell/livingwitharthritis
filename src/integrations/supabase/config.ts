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
import { PUBLIC_SUPABASE_DEFAULTS } from "./publicDefaults";

const DEFAULTS = {
  VITE_SUPABASE_PROJECT_ID: PUBLIC_SUPABASE_DEFAULTS.projectId,
  VITE_SUPABASE_URL: PUBLIC_SUPABASE_DEFAULTS.url,
  VITE_SUPABASE_PUBLISHABLE_KEY: PUBLIC_SUPABASE_DEFAULTS.publishableKey,
} as const;

type EnvName = keyof typeof DEFAULTS;

const envOrDefault = (name: EnvName, value: unknown): string => {
  if (typeof value === 'string' && value.length > 0) return value;
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
