# Fix "Something went wrong" on the live preview

## What's happening

The whole site is crashing on load, not just one page. The browser error is:

```text
Missing required environment variable: VITE_SUPABASE_PROJECT_ID
```

The backend connection details live in a `.env` file that is deliberately excluded from the
repository (it is listed in `.gitignore`). The sandbox has that file, so local builds work, but the
build that produces the preview and published site does not — so the values are missing there.

`src/integrations/supabase/config.ts` throws an error the moment those values are missing, and
because that file is imported at start-up, the error escapes before any page renders. The top-level
error boundary then shows "Something went wrong" for every route.

## The fix

Make the backend config resilient instead of fatal:

- Keep reading `import.meta.env.VITE_SUPABASE_*` first so any environment override still wins.
- When a value is absent, fall back to the project's built-in publishable values (project ref, API
  URL, anon/publishable key). These are client-side-safe by design — they are already shipped in
  the browser bundle today — so no secret is exposed.
- Only warn in the console when a fallback is used, never throw, so a missing variable can never
  take the whole site down again.

## Technical detail

- File: `src/integrations/supabase/config.ts` — replace the `requiredEnv` throw with an
  `envOrDefault` helper backed by literal defaults for `SUPABASE_PROJECT_ID`, `SUPABASE_URL` and
  `SUPABASE_PUBLISHABLE_KEY`.
- No change to `src/integrations/supabase/client.ts` (auto-generated) or to `.env`.
- Verify with a production build plus a preview load of `/` showing real content instead of the
  error boundary.
