# Enforce a single rel=canonical on every route

## Current state

- 83 of 88 pages already render `<SeoHead path=...>` (which emits `<link rel="canonical">` via Helmet). The 5 remaining condition pages (Lupus, Gout, Fibromyalgia, AnkylosingSpondylitis, JuvenileArthritis) go through `ConditionPageTemplate`, which itself renders `SeoHead`. So all routes do have a canonical today.
- **Risk 1 — duplicates:** `index.html` ships a static `<link rel="canonical" id="static-canonical" href=".../">` with an inline script that strips it on non-`/` routes. If the script runs late (or Helmet adds its own canonical before the strip), the homepage briefly has two canonical tags. Helmet's link dedupe is unreliable for `rel="canonical"` (it dedupes by `href`, not `rel`).
- **Risk 2 — drift:** any new page added without `SeoHead` ships with no canonical at all and no compile-time check.

## Fix

### 1. Add a global `CanonicalEnforcer` component

New file `src/components/CanonicalEnforcer.tsx`. Mounted once inside `<BrowserRouter>` in `src/App.tsx`. On every `location.pathname` change (via `useLocation`) it runs a `useEffect` that:

- Removes the static `#static-canonical` from `index.html` once and for all (it's no longer needed — this enforcer handles every route).
- Queries `document.head` for all `link[rel="canonical"]`. If zero, inserts one with `href = https://livingwitharthritis.org.uk${pathname}`. If two or more exist, keeps the **last** one (the Helmet/SeoHead one, which is route-specific) and removes the others. This guarantees exactly one canonical at all times.
- Tags its own inserted node with `data-managed="global"` so it can be cleaned up when Helmet later inserts a page-specific one.

Result: every route — even a new page someone forgets to add `SeoHead` to — always has exactly one canonical pointing at the current URL.

### 2. Remove the static homepage canonical + inline strip script from `index.html`

The enforcer makes both obsolete and removes the only known duplicate-canonical risk. Leave the rest of `index.html` (title, description, og:*, JSON-LD) untouched.

### 3. Verification

After implementation, run in the preview console on `/`, `/about`, `/blog`, and a deep route like `/conditions/lupus`:
```js
document.querySelectorAll('link[rel=canonical]').length
// expect 1 on every route
document.querySelector('link[rel=canonical]').href
// expect the full https URL matching the current path
```

## Out of scope

- No changes to existing `SeoHead` API or any page component.
- No new dependencies.
- No per-page canonical overrides (e.g. paginated lists pointing to page 1) — flag for a separate task if needed.
- No server-side rendering; the enforcer runs client-side. Googlebot executes JS and will see the correct canonical; social crawlers (Facebook, LinkedIn) only see the og:url already in `index.html` — that's an SSR limitation we already accept.

## Files touched

- `src/components/CanonicalEnforcer.tsx` (new, ~40 lines)
- `src/App.tsx` (import + mount)
- `index.html` (delete static canonical + inline script)
