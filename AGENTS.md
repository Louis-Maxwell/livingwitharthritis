# Agent operating rules — Living With Arthritis UK

Read this file first. It is the standing instruction for every AI agent run on this
repository. Keep it short: every agent run pays for these lines.

## 1. Where the money goes

**All AI work runs on the Cursor/Claude subscription. Nothing runs on Lovable credits.**

Do not:

- Message the Lovable agent, or use any Lovable MCP tool (`lovable_*`, `scaffold-project`,
  `iterate-with-agent`, `enable_database`, `query_database`, `deploy-project`).
- Route model inference through `ai.gateway.lovable.dev`.
- Add a runtime dependency on a Lovable-hosted AI endpoint.

Allowed and unrelated to AI credits:

- The build-time Lovable dev dependencies already in `package.json` (`lovable-tagger`,
  `@lovable.dev/vite-plugin-*`). These run in Vite, not on a model.
- `.github/workflows/deploy-to-lovable.yml`, which triggers Lovable *hosting*. I am not
  certain whether Lovable bills credits for API-triggered deploys — this needs checking in
  the Lovable billing page before anyone treats hosting as free. See
  `docs/CEO-AI-COST-CONTROL-PLAN.md`.

## 2. Pick the cheapest model that can finish the job

Start one tier **below** what you think you need. Escalate only after a concrete failure,
and say what failed. Never open at `max`/`xhigh`.

| Work | Model slug |
|---|---|
| Copy, markdown, blog expansion, doc updates, changelog | `claude-sonnet-5-thinking-low` |
| One change in files you can already name; test fix; lint fix; dependency bump | `claude-sonnet-5-thinking-medium` |
| Multi-file feature; SEO/schema/route work across many pages; redirect-map changes | `claude-sonnet-5-thinking-high` |
| Unknown root cause; hosting or architecture decision; security or data-protection review | `claude-opus-5-thinking-high` |
| Anything heavier | Needs a human go-ahead first |

Notes:

- Only slugs listed in the current run's available-models list are valid, and that list
  changes. If a slug above is not offered, take the nearest listed Claude tier — do not
  guess at a slug name.
- Codebase searching and file-finding go to an `explore` subagent, not to a top-tier model
  in the main thread.
- Prefer one well-scoped subagent over several overlapping ones.

## 3. Keep the context small

This repo is large: ~60 markdown files at the root, ~40 more in `docs/`, and 117 page
components in `src/pages/`. Reading broadly is the main way a run gets expensive.

1. Search before you read. Get the file list first, then read only the matching part.
2. Read only files the task actually names. Never sweep the root markdown files.
3. Send wide searches to an `explore` subagent so the bulk output stays out of the main thread.
4. Do not re-read a file you have already read in the same run.
5. Run the narrowest check that covers the change — the single `vitest` file, or one
   `bun run seo:*` script — not the whole suite, unless the change is repo-wide.
6. Never paste whole build or test logs into context. Search them for the failing lines.
7. Do not add a new status or summary markdown file at the end of a run. There are already
   dozens. Update the existing doc that owns the topic.
8. Finish the asked-for change and stop. No speculative extras.

## 4. Repository facts worth knowing before you start

- Live site: https://livingwitharthritis.org.uk — Vite + React + TypeScript + Tailwind,
  static build, currently deployed through Lovable hosting.
- Package manager is **bun** (`bun.lock`). `node_modules` is not pre-installed in agent VMs.
- Vercel, Supabase and Cloudflare were **deliberately removed** (commit `34394cf2`). There is
  no Supabase client, no auth, and no database in this repo today. `/auth` and the admin
  routes intentionally render `src/components/AdminPaused.tsx`. Do not reintroduce any of
  them as a side effect of another task.
- `public/_redirects` and `public/_headers` are Netlify-format files and are the source of
  truth for redirects and security headers. `scripts/sync-host-redirects.mjs` keeps
  `public/_redirects` in step with `src/data/blogRedirects.ts`; run `bun run seo:redirects`
  after touching either.
- Homepage `Helmet` title must stay identical to the title in `index.html`
  (`HOME_PAGE_TITLE` in `src/lib/homeSeo.ts`).
- Do not publish the Oswestry registered address on the public site.
- Never invent traffic, visitor or impact numbers. Baselines live in
  `docs/YEAR-0-ANALYTICS-BASELINE.md`; if a figure is not there, it is not known.

## 5. Things an agent must not do alone

Stop and hand these to a human:

- Connecting the repo to Netlify, or any other change to where the live site is served from.
- Anything in a third-party dashboard (Netlify, Supabase, Google Search Console, DNS, Stripe,
  PayPal, Lovable billing).
- Merging a pull request, enabling auto-merge, force-pushing, or deleting a branch.
- Anything that spends money or changes who can see the site's data.
