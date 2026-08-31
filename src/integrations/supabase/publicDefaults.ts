// Public (publishable) backend defaults.
// Safe to commit: these are the same values shipped in the client bundle.
// Used as a fallback by build scripts and vite.config.ts when the
// VITE_SUPABASE_* env vars are not present in the build environment.

export const PUBLIC_SUPABASE_DEFAULTS = {
  url: 'https://zrvcejlncpndjfyuvcrd.supabase.co',
  publishableKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs',
  projectId: 'zrvcejlncpndjfyuvcrd',
} as const;

export default PUBLIC_SUPABASE_DEFAULTS;
