# Pets Section + Vulnerabilities + Bounce Rate — Integration Guide

## 1. Pets nav button (between "Community & Support" and "Get Involved")

The header lives in the Lovable repo (likely `src/components/Header.tsx` or
`src/components/layout/Navigation.tsx` — search for "Community & Support").
Insert this item in the nav array **immediately after** the Community & Support
entry and **before** Get Involved:

```tsx
{ label: "Pets", href: "/pets" },
```

If the nav uses dropdown objects, the minimal version is a plain link — no
dropdown needed. If you'd like a dropdown later, its children are the 8
article routes below.

## 2. Register the routes in `src/App.tsx`

Follow the existing `React.lazy()` pattern (all routes already use it):

```tsx
const PetsHub = lazy(() => import("./pages/PetsHub"));
const PetArticle = lazy(() => import("./pages/PetArticle"));
// ...inside <Routes>:
<Route path="/pets" element={<PetsHub />} />
<Route path="/pets/:slug" element={<PetArticle />} />
```

## 3. Rename the .NEW files after uploading

- `src/pages/PetsHub.NEW.tsx` → `src/pages/PetsHub.tsx`
- `src/pages/PetArticle.NEW.tsx` → `src/pages/PetArticle.tsx`

`src/data/pets-arthritis.generated.ts` needs no rename. The 9 pet routes are
already merged into `scripts/ai-head-data.json`, so on the next build every
pet page ships with static SEO/AI content. Add the 9 routes to
`scripts/prerender-routes.mjs` / sitemap generator the same way the city
routes were added.

**Images:** all 19 use Unsplash (free licence, hotlink-permitted, and the
site already preconnects to images.unsplash.com). Spot-check each renders;
swap any broken one for another Unsplash photo of the same subject. Longer
term, replace with owned photos.

## 4. The 65 GitHub vulnerabilities — root cause and fix

**Root cause (diagnosed from the SBOM):** the repo builds with Bun, so the
committed `package-lock.json` is stale — it pins old versions (jspdf 2.5.1,
vite 5.4.19, jsdom 20, vitest 3.2.4, esbuild 0.21.5, rollup 4.24, flatted
3.3.1, picomatch 2.3.1...) that `package.json` upgraded past long ago.
Dependabot scans that stale lockfile, so most of the 65 alerts are for
versions you don't actually ship.

**Fix (5 minutes, no local machine needed):**
1. Commit this bundle (it includes `.github/workflows/regenerate-lockfile.yml`).
2. GitHub → **Actions** tab → **"Regenerate npm lockfile"** → **Run workflow**.
3. It rewrites `package-lock.json` from `package.json` and commits it.
4. Dependabot re-scans automatically within ~24h (or trigger via
   Security tab → Dependabot alerts → refresh). Expect the count to drop
   from 65 to a handful.
5. For any remaining alerts: they're real transitive pins. Add to the
   `overrides` block in `package.json` (via GitHub web editor):

```json
"overrides": {
  "esbuild": "^0.25.0",
  "glob": "^11.1.0",
  "rollup": "^4.52.0"
}
```

Then run the workflow once more. The weekly Monday schedule keeps the
lockfile in sync so alerts never go stale again.

## 5. Bounce rate — the honest version

**Nobody can "set" bounce rate to 30-40%**, and you should be suspicious of
anyone who promises it. Benchmarks: health-information sites typically run
55-70% (GA4 "bounce" = session under 10s with no conversion and only 1 page).
30-40% is where logged-in products and multi-step tools live. A realistic,
excellent target for this site is **45-55% within 3-6 months**.

What actually moves it — and what's already shipped:
- ✅ Related-articles blocks (pet pages ship with "Keep reading" — extend the
  same component to condition/guide pages)
- ✅ Cross-links between hubs (pets → exercise hub → glossary)
- ✅ Speed (route splitting, lazy widgets — slow loads are the #1 bounce cause)
- ✅ Chatbot with resource cards (each card click = engaged session)
- ✅ Exit-intent modal, accessibility toolbar
- ⬜ Email capture above the fold (in HomePage.NEW.tsx — publish it)
- ⬜ Interactive tools (the joint-diagram exercise picker is your best asset —
  link it prominently from every condition page)
- ⬜ "Was this helpful?" widgets (any click counts as engagement in GA4)

Measure in GA4: Engagement rate (inverse of bounce), avg engagement time,
pages/session. Review monthly, not daily — daily numbers are noise.

## Commit checklist (all drag-and-drop, ~5 min)
- [ ] Upload bundle contents to repo root
- [ ] Rename the two .NEW pet pages
- [ ] Add nav item + 2 routes (steps 1-2 above)
- [ ] Run "Regenerate npm lockfile" workflow
- [ ] Publish in Lovable, then click "Rebuild knowledge base" at /admin/chat-feedback
- [ ] Spot-check /pets and /pets/arthritis-in-dogs
