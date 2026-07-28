## What I found

The app code is fine — the dev server renders the full homepage with zero errors. The **published site** is what's blank.

Loading `https://livingwitharthritis.lovable.app/` in a real browser throws one fatal error at startup:

```text
Uncaught Error: supabaseUrl is required.
```

`src/integrations/supabase/client.ts` calls `createClient(import.meta.env.VITE_SUPABASE_URL, ...)` at module load. In the published bundle those env values were **not** inlined (the backend URL string is absent from the shipped JS), so `createClient` throws while the app's module graph is still initialising — before React ever mounts. Result: `#root` stays empty, i.e. a white page.

Two contributing facts:
- `.env` is gitignored, so the values only exist in the sandbox, not necessarily in the publish build environment.
- There is no error boundary around app bootstrap, so one throw at import time blanks everything instead of showing a fallback.

## Fix

1. **Make backend config build-proof** — add a small `src/integrations/supabase/config.ts` exporting the project URL and publishable (anon) key, using `import.meta.env` when present and falling back to the literal published values. Both are publishable, client-side-safe values (no secrets). Point `client.ts` at it (minimal edit; file stays otherwise generated-shaped).
2. **Cover the other env consumers** — `useStreamingChat.ts`, `AppointmentModal.tsx`, `AdminChatFeedback.tsx`, `Connect.tsx`, `lib/mcp/index.ts` all read the same vars directly and would produce `undefined/functions/v1/...` URLs. Switch them to the shared config module.
3. **Add a bootstrap error boundary** in `src/main.tsx` so any future module-init failure renders a visible error message instead of a white screen.
4. **Verify** — run a real production build, serve `dist/` locally, load it in a headless browser, and confirm `#root` renders and the console is clean. Then re-publish and re-check the live URL.

## Notes

- Nothing about the homepage layout or content changes; this is purely a startup-config robustness fix.
- Republishing is required for the live site to pick this up.
