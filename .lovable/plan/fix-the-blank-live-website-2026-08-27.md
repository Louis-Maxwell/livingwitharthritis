# Fix the blank live website

## Confirmed diagnosis

The live homepage returns HTTP 200, but React immediately falls into the global crash screen. Browser evidence from the published domain shows:

```text
Error: supabaseUrl is required
at .../assets/client-*.js
```

The generated backend client reads only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Those values were absent when the currently published frontend bundle was built, so `createClient()` throws during module initialisation before the homepage can render.

## Implementation

1. Update the Vite build configuration to supply the existing public backend defaults when the build environment does not inject the two publishable frontend values.
   - Reuse `PUBLIC_SUPABASE_DEFAULTS` as the single fallback source.
   - Keep environment-provided values as the first choice.
   - Do not expose or add any private/service credentials.
   - Do not edit the auto-generated backend client or environment files.
2. Add an explicit build-time guard so an invalid empty URL/key cannot silently produce another crash-prone production bundle.
3. Verify the generated production JavaScript contains a valid public backend URL rather than `undefined`.
4. Open the built app in a browser and confirm the homepage renders real content with no startup exception.
5. Publish the corrected frontend, then recheck `https://livingwitharthritis.org.uk/` directly for:
   - HTTP 200
   - a rendered `<main>` and homepage content
   - no global “Something went wrong” fallback
   - no `supabaseUrl is required` console error

## Files

- `vite.config.ts`
- A small build-safety test or script, only if needed to enforce the guard consistently
