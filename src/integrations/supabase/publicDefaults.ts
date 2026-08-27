// Public (publishable) backend defaults used by build-time scripts such as
// scripts/generate-sitemap.ts and scripts/generate-llms-full.mjs, where Vite
// env vars are not available. These values are publishable — never place
// service-role keys here.
export const PUBLIC_SUPABASE_DEFAULTS = {
  url: 'https://zrvcejlncpndjfyuvcrd.supabase.co',
  publishableKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydmNlamxuY3BuZGpmeXV2Y3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMjExMDAsImV4cCI6MjA4NTU5NzEwMH0.qOueBdqCYFMZKAROVBqqP8gNi0Li8JkMwvary2YfJzs',
  projectId: 'zrvcejlncpndjfyuvcrd',
} as const;
