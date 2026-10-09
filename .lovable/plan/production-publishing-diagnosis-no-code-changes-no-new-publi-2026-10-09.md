# Production publishing diagnosis (no code changes, no new publish)

## Findings (checked live at 11:57 UTC)
- `/blog/archive` on production now returns HTTP 200, title "Arthritis blog archive — browse by date and topic | Living With Arthritis", robots `index, follow`. The deployment completed; the earlier "Page not found/noindex" result was taken while it was still pending (or from a cached copy).
- Build pipeline: `package.json` runs `prebuild` (catalog, head data, sitemap, OG etc.), `vite build`, then `postbuild` (`inject-canonicals.mjs`, `generate-404.mjs`, `write-redirect-html.mjs`, `write-city-hub-html.mjs`, IndexNow). The live archive title matches prerendered output, so the host runs the full npm lifecycle including postbuild.
- `www.livingwitharthritis.org.uk` and `livingwitharthritis.lovable.app` answer **302** (temporary) to the apex primary domain.
- Unknown path `/zzz-unknown` answers **200** with the homepage title and `index, follow` (soft 404).

## What is configurable on the current host
- Redirect type: www to apex is a platform redirect; the status code (302) is not configurable. Only option is "Unset as primary" in Project Settings → Domains, which stops the redirect entirely (both hosts then serve content; canonicals still point to apex). Recommended: keep as is; canonicals already consolidate.
- True HTTP 404: not configurable. The host ignores `_redirects`/`_headers` status rules and serves the SPA shell with 200 for any path without a file. `dist/404.html` from `generate-404.mjs` is not used as a status-404 response. Current mitigations (client `noindex` on NotFound, static redirect stubs) are the ceiling.
- Real 301s and real 404s require putting a proxy in front (e.g. the existing Cloudflare worker in `worker/index.ts`) that checks a known-routes list and returns 301/404; this does not break legitimate routes if the list comes from `prerender-routes.generated.json` plus the sitemap.

## Suggested next step (only if approved)
1. Optional: verify Cloudflare proxy for the domain and extend the worker with known-route 404 and www 301 handling.
2. Request re-indexing of `/blog/archive` in Search Console.
