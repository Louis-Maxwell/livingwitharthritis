# Agent rules — Living With Arthritis UK

Read this before changing the site. The live public site is
https://livingwitharthritis.org.uk (charity 1218461).

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

- No Supabase client, Google login, or RLS in this repo (removed on purpose).
  `/auth` and admin screens stay paused. Do not rebuild a logged-in product
  unless the CEO explicitly re-opens that decision.
- Hosting is the current live host today. `public/_redirects` and
  `public/_headers` are Netlify-format files; there is no live Netlify URL
  until a human connects the repo. Do not invent a Netlify link.
- Bun is used by some build/SEO scripts; npm/`package-lock.json` also works for
  installing and for vitest. Agent VMs often have no `node_modules` until
  install.

## Adding a new page (SEO checklist)

A new visitor URL is not done until search and AI crawlers can see a **unique**
head. `seo:prerender-meta` only flags a generic **homepage** title — it will
not catch a new route that fell back to "Conditions — …".

Before you ship a new path:

1. Add a matching entry in `scripts/ai-head-data.json` (`title`, `description`,
   `question`, `answer`). Keep `src/data/page-aeo.ts` in lockstep if the page
   renders `<AeoEnhancement>`.
2. Register the route in `src/App.tsx` and, for guides, `src/lib/guideRegistry.ts`.
3. Include it in `src/data/prerender-routes.generated.json` and `public/sitemap.xml`.
4. If the path is an **alias** that canonicalises elsewhere, add it to
   `STATIC_EXCLUDE` in `scripts/generate-sitemap.ts` so Google is not sent
   duplicates (same convention as `/conditions/elbow-pain`).
5. After a prerender, diff `dist/<route>/index.html` `<title>` against a
   sibling page — never assume the homepage-title gate is enough.
6. Add the URL to `public/llms.txt` when it is a preferred page for AI citation.
7. Commit generated `public/og/*.png` if a card is produced for the route.

## Humans only

Hosting moves, dashboard clicks (GSC, Stripe, Lovable billing), merging,
force-pushing, and anything that spends money.
