## Root cause

Semrush flags 40 sitemap URLs as "Non-canonical URL" because:

- The site is a SPA — every URL serves the same static `dist/index.html`.
- `index.html` contains `og:url = https://livingwitharthritis.org.uk/` and **no** `<link rel="canonical">`.
- Per‑route canonical/og:url are only injected client‑side by `react-helmet-async`, which Semrush's crawler does not execute.
- Result: every sitemap URL appears canonicalised to the homepage.

The existing puppeteer prerender is gated behind `PRERENDER=1` and does not run in the Lovable build, so it can't be relied on.

## Fix

Add a lightweight, puppeteer-free post-build step that emits per-route static HTML with the correct `<link rel="canonical">` and `og:url`. No new dependencies.

### 1. `index.html` — homepage baseline

- Add `<link rel="canonical" href="https://livingwitharthritis.org.uk/" />` to the head.
- Leave the existing homepage `og:url` as-is (it is correct for `/`).

### 2. New script `scripts/inject-canonicals.mjs`

- Runs after `vite build` (wired as `postbuild` in `package.json`).
- Reads the list of routes from `scripts/prerender-routes.mjs` **plus** every `<loc>` in `public/sitemap.xml` (so all 800+ sitemap URLs are covered, including the 40 flagged ones: `/contact`, `/governance`, `/accessibility`, `/faq`, `/blog`, `/buddy`, `/community`, `/credits`, `/finances`, `/safeguarding`, `/complaints`, `/corporate-giving`, `/ways-to-help`, `/health-tools`, `/arthritis-support`, `/conditions/*`, `/exercises/*`, `/diet/*`, `/guides/*`, `/regions/*`, etc.).
- For each route, writes `dist/<route>/index.html` by copying `dist/index.html` and replacing:
  - the homepage `og:url` with the route URL,
  - injecting `<link rel="canonical" href="https://livingwitharthritis.org.uk<route>" />` before `</head>`.
- Skips routes where the directory already exists from puppeteer prerender (so `PRERENDER=1` builds keep working).

### 3. `package.json`

- Add `"postbuild": "node scripts/inject-canonicals.mjs"`.

### 4. Validation

- Run the build locally in the sandbox and `grep` a handful of the 40 flagged URLs in `dist/` to confirm each has the correct canonical and og:url.
- After deploy, the user can re-run the Semrush "Site Audit" — the 40 errors will clear once Semrush re-crawls.

## Out of scope

- No changes to sitemap.xml content, React components, or routing.
- No puppeteer/SSR — pure HTML rewrite, fast (<5s for ~800 routes).
- Does not affect JS-capable crawlers (Helmet still wins post-hydration).

## Files

- edit `index.html` (add homepage canonical)
- create `scripts/inject-canonicals.mjs`
- edit `package.json` (add `postbuild` hook)
