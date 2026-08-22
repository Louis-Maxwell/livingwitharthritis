# Production Deployment Guide

**Last updated:** 2026-08-22

## Hosting platform

The frontend is built and hosted by **Lovable**, served through Cloudflare.

```
GitHub main branch
        ↓  (Lovable Git sync)
   Lovable build  (npm run build → prerender → inject-canonicals)
        ↓
   Cloudflare edge
        ↓
https://livingwitharthritis.org.uk
```

The backend is Supabase: Postgres, Auth, Storage and Edge Functions.

**This project does not use Vercel, Netlify, or any other external frontend
host.** Do not add `vercel.json`, `netlify.toml`, or a platform-specific
`_redirects` file unless the hosting platform is deliberately migrated and this
document is updated in the same change. A stray rewrite rule can silently
reintroduce soft-404s — see [`seo/remaining-risks.md`](./seo/remaining-risks.md).

To confirm which platform is serving production at any time:

```bash
curl -sI https://livingwitharthritis.org.uk | grep -iE 'server|x-deployment-id'
```

Expect `server: cloudflare` and a Lovable `x-deployment-id`.

## Deploying

Pushing to `main` triggers a Lovable build through the Git sync. No GitHub
Actions workflow is required for the site to go live.

`.github/workflows/deploy-to-lovable.yml` additionally calls the Lovable deploy
API on push to `main`. It is a convenience trigger, not the primary path; if
GitHub Actions is unavailable, Lovable still deploys from the Git sync.

To deploy manually:

1. Open the [Lovable project](https://lovable.dev/projects/0b2fd6ca-4e21-4ac7-99fa-d741e996f45e)
2. Click **Publish**
3. Wait for the build to finish
4. Verify https://livingwitharthritis.org.uk

## Environment variables

### Frontend build (Lovable project settings)

Client-side values only. Anything prefixed `VITE_` is shipped to the browser.

```
VITE_SUPABASE_PROJECT_ID=eswdtpmknwjxtvkyxvmi
VITE_SUPABASE_URL=https://eswdtpmknwjxtvkyxvmi.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable key>
VITE_SENTRY_DSN=<sentry dsn>
VITE_GA4_PRIMARY_ID=G-<id>
```

Sentry source-map upload additionally needs `SENTRY_ORG`, `SENTRY_PROJECT` and
`SENTRY_AUTH_TOKEN` at build time.

The sitemap generator reads `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` during `prebuild`. Without them the build falls
back to the checked-in canonical route inventory rather than dropping blog URLs.

### Server-side secrets (Supabase Edge Function secrets)

Never prefix these with `VITE_`.

```bash
supabase secrets set \
  STRIPE_SECRET_KEY=... \
  STRIPE_WEBHOOK_SECRET=... \
  RESEND_API_KEY=... \
  LOVABLE_API_KEY=... \
  CONTENT_REINDEX_TOKEN=... \
  RATE_LIMIT_STORE=redis \
  RATE_LIMIT_REDIS_URL=... \
  RATE_LIMIT_REDIS_TOKEN=... \
  RATE_LIMIT_KEY_SALT=...
```

Rate limiting fails closed in production when Redis is unreachable. See
[`RATE-LIMITING.md`](./RATE-LIMITING.md).

## Pre-deployment checks

Run locally, since GitHub Actions is not guaranteed to be available:

```bash
npx tsc --noEmit -p tsconfig.app.json
npm run lint
npx vitest run
npm run build:prerender
npm run seo:prerender-meta
npm run seo:redirects
```

The prerender metadata gate must report zero generic pages and zero unexpected
`noindex` pages.

## Post-deployment verification

```bash
# Homepage responds and is self-canonical
curl -s https://livingwitharthritis.org.uk/ | grep -o '<link rel="canonical"[^>]*>'

# A priority article serves its own content, not the homepage shell
curl -s https://livingwitharthritis.org.uk/blog/anti-inflammatory-diet | grep -o '<title>[^<]*</title>'

# Discovery files
curl -sI https://livingwitharthritis.org.uk/robots.txt
curl -sI https://livingwitharthritis.org.uk/sitemap.xml
```

Then confirm:

- Sentry is receiving events and shows no new critical issues
- GA4 real-time traffic appears after analytics consent
- Google Search Console shows no new coverage or canonical errors
- Core Web Vitals remain in the good range

## Rollback

### Via Lovable

1. Open the Lovable project
2. Select a previous successful deployment
3. Republish it

### Via Git

```bash
git revert <commit>
git push origin main
```

Lovable rebuilds from `main`.

### Environment variable rollback

Correct the value in Lovable project settings (frontend) or with
`supabase secrets set` (server side), then redeploy.

## Monitoring cadence

**Daily** — Sentry errors, GA4 traffic, rate limiting violation logs.

**Weekly** — Search Console performance and coverage, Core Web Vitals, Supabase
query performance.

**Monthly** — SEO audit, dependency and security review, cost review across
Supabase, Lovable and Sentry.

## Troubleshooting

**Build fails.** Check the Lovable build log. Reproduce locally with
`npm run build:prerender`. Confirm build-time environment variables are set.

**Pages serve homepage content.** The prerender step did not produce per-route
HTML. Run `npm run seo:prerender-meta` against the build output and confirm
Chromium is available during the build.

**Unknown URLs return HTTP 200.** This is a known limitation of the current
managed hosting, documented in [`seo/remaining-risks.md`](./seo/remaining-risks.md).
It needs a hosting-level fix, not a prerender change.

**Edge Function errors.** Check Supabase Edge Function logs, verify secrets, and
run `npm run preflight:functions` locally (requires Deno).

**Analytics missing.** GA4 loads only after analytics consent. Verify
`VITE_GA4_PRIMARY_ID` and check for CSP blocking in the browser console.

## Resources

- [Lovable documentation](https://docs.lovable.dev)
- [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod)
- [Sentry releases](https://docs.sentry.io/product/releases/)

## Support

- Lovable: support@lovable.dev
- Supabase: community forums or Pro support
- Sentry: https://sentry.io/support/
