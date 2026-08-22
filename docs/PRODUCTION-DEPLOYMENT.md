# Production Deployment Guide

**Last updated:** 2026-08-22

## Architecture

The frontend is deployed as a **Cloudflare Worker with Static Assets**.

```text
GitHub main branch
        ↓  (Cloudflare Workers Builds Git integration)
npm run build
        ↓
npx wrangler deploy
        ↓
Cloudflare Worker + prerendered static assets
        ↓
https://livingwitharthritis.org.uk
```

`cloudflare/worker.ts` owns redirects, static asset delivery, security/cache
headers, known private SPA routes, and real HTTP 404 responses.

The backend remains Supabase: Postgres, Auth, Storage and Edge Functions.

## Why Workers Static Assets

Cloudflare Pages would host the static build, but this site needs routing logic:

- HTTP 301 redirects for every legacy blog slug;
- real HTTP 404 responses rather than a blanket SPA 200 fallback;
- SPA fallback only for known private client routes such as `/auth` and
  `/admin/*`;
- consistent cache and security headers.

Workers Static Assets deploys the Worker and `dist/` as one version.

## Cloudflare configuration

Source of truth: `wrangler.jsonc`.

- Worker name: `living-with-arthritis`
- Entry point: `cloudflare/worker.ts`
- Static assets: `dist/`
- Unknown assets: no automatic SPA fallback
- HTML URLs: no trailing slash
- Observability: enabled

Validate configuration:

```bash
npm run cloudflare:types
npm run cloudflare:check
```

## Initial account setup

This is an account-level action and cannot be completed without Cloudflare
authentication.

1. Sign in to Cloudflare and ensure `livingwitharthritis.org.uk` is in the
   intended account.
2. Run `npx wrangler login` locally, or authenticate the Cloudflare MCP tools.
3. Deploy once with:

   ```bash
   npm run deploy:cloudflare
   ```

4. Verify the generated `workers.dev` URL before changing production DNS.
5. In **Workers & Pages → living-with-arthritis → Settings → Domains & Routes**,
   add `livingwitharthritis.org.uk` as a custom domain.
6. Add `www.livingwitharthritis.org.uk` if it should resolve separately.
7. Remove the old custom-domain attachment only after the Cloudflare deployment
   passes the checks below.

## Automatic Git deployments

Use Cloudflare Workers Builds rather than GitHub Actions:

1. Open **Workers & Pages → living-with-arthritis → Settings → Builds**.
2. Connect `Louis-Maxwell/livingwitharthritis`.
3. Production branch: `main`.
4. Build command: `npm run build:cloudflare`.
5. Deploy command: `npx wrangler deploy`.
6. Build root: repository root.
7. Add the build variables below.

The Worker name in Cloudflare must exactly match `name` in `wrangler.jsonc`.
Cloudflare's Git integration deploys independently of GitHub Actions billing.

## Build environment variables

Anything prefixed `VITE_` is shipped to the browser.

```text
VITE_SUPABASE_PROJECT_ID=eswdtpmknwjxtvkyxvmi
VITE_SUPABASE_URL=https://eswdtpmknwjxtvkyxvmi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable key>
VITE_SENTRY_DSN=<sentry dsn>
VITE_GA4_PRIMARY_ID=G-<id>
```

Sentry source maps additionally need `SENTRY_ORG`, `SENTRY_PROJECT` and
`SENTRY_AUTH_TOKEN` during the build.

Supabase Edge Function secrets remain in Supabase; do not copy server-side
Stripe, email, service-role or rate-limiting secrets into Cloudflare.

## Local validation

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run lint
npx vitest run
npm run build:cloudflare
npm run seo:prerender-meta
npm run seo:redirects
npm run cloudflare:check
```

Preview with the Worker runtime:

```bash
npx wrangler dev
```

## Production verification

```bash
# Homepage
curl -sI https://livingwitharthritis.org.uk/

# Real edge 301, including query-string preservation
curl -sI 'https://livingwitharthritis.org.uk/blog/knee-osteoarthritis-exercises?source=test'

# Real 404, not a homepage shell
curl -sI https://livingwitharthritis.org.uk/not-a-real-page

# Private client route still receives the SPA shell
curl -sI https://livingwitharthritis.org.uk/auth

# Prerendered article metadata
curl -s https://livingwitharthritis.org.uk/blog/anti-inflammatory-diet |
  grep -o '<title>[^<]*</title>'

curl -sI https://livingwitharthritis.org.uk/robots.txt
curl -sI https://livingwitharthritis.org.uk/sitemap.xml
```

Expected:

- legacy redirect: `301` with one `Location`;
- unknown path: `404` with `X-Robots-Tag: noindex, nofollow`;
- canonical pages: `200` and route-specific metadata;
- `/auth`: `200` SPA shell;
- production responses include Cloudflare headers.

## Rollback

```bash
npx wrangler versions list
npx wrangler rollback
```

Or select a previous deployment in the Cloudflare dashboard.

If a code rollback is required:

```bash
git revert <commit>
git push origin main
```

## Troubleshooting

**Wrangler is not authenticated.** Run `npx wrangler login` or set a scoped
Cloudflare API token in the deployment environment.

**Build fails.** Run `npm run build` locally and verify Cloudflare build
variables.

**A valid public route returns 404.** Confirm it appears in
`src/data/prerender-routes.generated.json` or
`src/data/blog-slugs.generated.json`, then rebuild.

**A private route returns 404.** Add only the exact route or protected prefix to
`SPA_SHELL_PATHS` in `cloudflare/routing.ts`. Do not enable a global SPA
fallback.

**Redirect is missing.** Add the source/target to `src/data/blogRedirects.ts`.
The Worker imports that map directly.

**Edge Function errors.** Those run on Supabase, not the frontend Worker. Check
Supabase logs and secrets.

## Resources

- [Cloudflare Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)
- [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
