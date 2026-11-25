# Agent rules — Living With Arthritis UK

Read this before changing the site. The live public site is
https://livingwitharthritis.org.uk (charity 1218461).

## Main delivery

- `main` is the delivery branch for changes made through Lovable or Instinct.
  Keep the existing Lovable Git connection on `main` unless the owner changes
  that instruction.
- Use a working branch and pull request when needed. Branch-only work is not
  a completed delivery: merge approved changes to `main` after the required
  checks and independent review pass on the exact final head.
- Preserve branch protections, required checks and security controls. Do not
  bypass them to make an old branch appear merged.
- Reconcile stale or conflicting branches against current `main`. Preserve
  newer fixes and the owner's instructions instead of overwriting them.
- Merge only within the owner's current approval. This process does not
  authorise spending, new automation, repository visibility changes or branch
  deletion. Do not re-enable the suspended Cursor GitHub installation.

## Money: Cursor / Claude only

- Do **all** writing, coding and review on the Cursor subscription (Claude or
  other models billed there).
- Do **not** send work to the Lovable agent, Lovable MCP tools, or
  `ai.gateway.lovable.dev`. That burns Lovable credits.
- The existing GitHub → Lovable **hosting** deploy is not an AI chat. Leave it
  unless the CEO asks to change hosts. Whether that deploy uses Lovable credits
  is unverified — check the Lovable billing page; do not guess.

## Which model (burn fewer tokens)

Start **one tier below** what the task looks like. Never open on `max` / `xhigh`.
Escalate only after a concrete failure (wrong file, failed test, incomplete
answer).

| Kind of job | Start here |
|---|---|
| Copy tweak, one JSON/meta field, a short FAQ | cheaper / faster model |
| One named page or one bug with a known file | mid-strength model |
| Several pages, SEO/AEO/GEO, prerender HTML | stronger model, still not max |
| Architecture, security, unknown root cause | largest practical model |

Token-thrift on **this** repo:

- Search, then open only the files you need. Do not read the whole tree.
- Do not paste full logs. Quote the failing line.
- Do not add a new status markdown file at the end of a routine run.
- Wide "where is X?" searches: use an explore subagent instead of loading
  dozens of files into the parent.

## Repo facts (do not reverse)

- Keep Tailwind CSS pinned to v3 with its `tailwindcss` PostCSS plugin;
  the existing theme configuration and styles require the v3 pipeline.
- No Supabase client, Google login, or RLS in this repo (removed on purpose).
  `/auth` and admin screens stay paused. Do not rebuild a logged-in product
  unless the CEO explicitly re-opens that decision.
- Hosting is the current live host today. `public/_redirects` and
  `public/_headers` are Netlify-format files; there is no live Netlify URL
  until a human connects the repo. Do not invent a Netlify link.
- Bun is used by some build/SEO scripts; npm/`package-lock.json` also works for
  installing and for vitest. Agent VMs often have no `node_modules` until
  install.

## Humans only

Hosting moves, dashboard clicks (GSC, Stripe, Lovable billing),
force-pushing, and anything that spends money.

For owner-approved merges, follow Main delivery above. All other restrictions
in this section remain unchanged.

## Technical SEO

- Share/canonical URL and JSON-LD sanitation rules live in technicalSeo.mjs;
  static and React metadata must use the same rules to prevent drift.
- Static route heads are finalised after generation, including reused
  snapshots and city documents, so inherited homepage tags cannot survive.
- Keep redirects in the existing shared redirect map; Lovable hosting does
  not execute `_redirects`, so never claim those rules deliver HTTP 301s here.
