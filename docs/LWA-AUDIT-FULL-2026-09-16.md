# Living With Arthritis — Audit + Fix Report

**Date:** 2026-09-16 (Europe/London)  
**Live:** https://livingwitharthritis.org.uk  
**Repo:** `/workspace/livingwitharthritis` → `Louis-Maxwell/livingwitharthritis`  
**Audited tip (before this ship):** `3977822` (*Replaced MCP public endpoint*) — 3 commits past expected `195e35b`  
**Method:** `git pull origin/main`, `gh` Actions logs, live `curl -sL`, scoped repo search, cheap vitest after fixes.  
**Constraints:** No CloudAgent/Lovable agent; no invented metrics/testimonials; no Oswestry restore; no Supabase/Vercel/Cloudflare/Resend restore; educational-not-diagnostic; stay Vite/React.

---

## A. Ranked findings (user / share / legal harm)

| Rank | Issue | Harm | Evidence |
|------|--------|------|----------|
| 1 | **Soft-404 homepage OG on unknown / city / bare URLs** | Social shares + crawlers see homepage title/canonical; GSC soft-404 risk | Live `curl`: `/blog/this-slug-does-not-exist-xyz-999`, `/this-slug-does-not-exist-xyz-999`, `/arthritis-support/london`, `/vitamin-d-arthritis-uk` → HTTP **200**, title/og *Living With Arthritis UK \| Evidence-Based Health Guides*, canonical `/`. Sheffield city×condition already ships redirect stub (good). |
| 2 | **Gift Aid overclaim on homepage donate bands** | Fundraising Regulator / HMRC honesty risk while `giftAidRegistered: false` | `InspiredHeroBand` “boost by 25%… next screen”; `DonationImpactSection` “Gift Aid adds 25p to every £1”; `FinalDonateBand` “Gift Aid eligible”; `WaysToHelp` “Gift Aid increases… by 25%”; About FAQ funded by Gift Aid as present tense. Donate page itself is honest. |
| 3 | **Lovable bot re-introduced Supabase tree on main** | Breaks `no-removed-backends` policy; dead backend risk; Deploy stays skipped while CI red | Commits `5a53196`/`3977822` by `gpt-engineer-app[bot]` added `src/integrations/supabase/**` + `supabase/config.toml`. No app imports found outside that folder. |
| 4 | **CI red on latest main (blocks Deploy gate)** | No Lovable auto-deploy until green | `3977822` CI **failure** (prerender meta: 24 noindex app screens allowed:0). Prior `195e35b`: Lint ESLint 2 errors; blog-smoke JSON import attribute; Tests Playwright contact heading + Managing Arthritis button; Lighthouse port 4173 double-bind. Deploy **skipped** (correct gate). |
| 5 | **Live CSP only `frame-ancestors 'self'`** | Host/CDN gap vs `public/_headers` | Confirmed on every sampled live response. Meta CSP in `index.html` cannot set frame-ancestors; Louis/host must apply full CSP in dashboard. |
| 6 | **YMYL aggregator pages lack disclaimer strip in first paint** | Educational framing weaker on HCP / resource centre | Sampled `/healthcare-professionals`, `/resource-centre` HTML has no disclaimer string (client strip not mounted). Conditions/exercises use EducationalDisclaimerBox lower on page. |
| 7 | **Thin city hubs intentionally noindex / out of sitemap** | Correct strategy; live still soft-404s until publish | Repo excludes `/arthritis-support/{city}` from sitemap + prerender; React `CityArthritisPage` sets `noindex`. Live never got the postbuild files. |
| 8 | **Playwright / blog-smoke drift** | CI noise, not user-facing | Contact heading is “A real person will reply.”; Managing Arthritis top-level is `<Link>` not `button`; frailty JSON import needs `with { type: "json" }`. |

**Skipped (strategy-only):** forums, Next.js migration, 200 cornerstones.

---

## B. Live curl sample (2026-09-16 ~16:48 BST)

| Path | Status | Title vs homepage shell | og:title | robots | Disclaimer hint |
|------|--------|-------------------------|----------|--------|-----------------|
| `/` | 200 | Homepage (OK) | Homepage | index,follow | No (marketing) |
| `/blog` | 200 | Dedicated | Dedicated | index,follow | No in static shell |
| `/blog/vitamin-d-arthritis-uk` | 200 | Article (OK) | Article | index,follow | No in first HTML (client strip) |
| `/vitamin-d-arthritis-uk` | 200 | **Homepage shell** | Homepage | index,follow | — |
| `/exercises` | 200 | Dedicated | Dedicated | index,follow | — |
| `/donate` | 200 | Dedicated | Dedicated | index,follow | Gift Aid honest in meta |
| `/disclaimer` | 200 | Dedicated | Dedicated | index,follow | Yes |
| `/healthcare-professionals` | 200 | Dedicated | Dedicated | index,follow | No strip |
| `/resource-centre` | 200 | Dedicated | Dedicated | index,follow | No strip |
| `/contact` | 200 | Dedicated | Dedicated | index,follow | — |
| `/conditions/osteoarthritis` | 200 | Dedicated | Dedicated | index,follow | Client EducationalDisclaimerBox |
| `/faq/arthritis-disability-benefits-uk` | 200 | Dedicated | Dedicated | index,follow | — |
| BAD blog slug | 200 | **Homepage shell** | Homepage | index,follow | — |
| `/arthritis-support/london` | 200 | **Homepage shell** | Homepage | index,follow | — |
| `/arthritis-support/sheffield/rheumatoid-arthritis` | 200 | “This page has moved” | none | **noindex,follow** | Redirect stub OK |

CSP on all: `frame-ancestors 'self'` only.

---

## C. GitHub Actions (evidence)

| Workflow | Latest `3977822` / prior `195e35b` | Root cause |
|----------|-----------------------------------|------------|
| CI | **failure** | `seo:prerender-meta` fails: 24 intentional noindex app routes (`/admin`, `/auth`, `/buddy`, …) with allowed=0 |
| Lint & Test | failure @195e35b; in_progress @3977822 | ESLint: `AnalyticsTracker.ts` explicit any; `DebugSchema.tsx` no-control-regex. Blog smoke: JSON import attribute. |
| Tests | failure @195e35b | Playwright: contact heading regex stale; Managing Arthritis expects `button` but nav uses `Link`. |
| Lighthouse | failure @195e35b | `perf-lighthouse.mjs` serves :4173 then LHCI also starts `vite preview --strictPort` → port in use. |
| Deploy to Lovable | **skipped** | Gate correctly refuses while CI/Lint/Tests not success. |
| Gitleaks / CodeQL | success | — |

---

## D. Repo vs known remaining

| Known item | Status |
|------------|--------|
| Live CSP only frame-ancestors | **Confirmed** — Louis/host |
| Lovable publish lag | **Confirmed** — tip `3977822` / prior hardenings not on live soft-404 behaviour; Deploy skipped while CI red |
| Thin cities noindex | **Correct in repo**; live still homepage shell until files + publish |

---

## E. What this ship fixes (Phase B)

See short docs copy + commit message. Louis still owns: Lovable publish, host CSP dashboard, Gift Aid HMRC flip, clinical spot-check, Fundraising Regulator registration.


## F. Shipped in this pass (Phase B/C)

- Removed Lovable-restored `src/integrations/supabase/**` + `supabase/config.toml`
- Soft-404: `write-city-hub-html.mjs` (50 unique noindex city hubs); exact redirects for city×condition, `/uk/:city/:service`, bare published blog slugs; TS `resolveSeoRedirect` lockstep; `public/_redirects` synced
- Gift Aid overclaims softened on homepage bands / WaysToHelp / About FAQ
- CI: prerender noindex allowlist for app screens; LHCI no longer double-starts :4173; ESLint AnalyticsTracker + DebugSchema; blog-smoke `with { type: "json" }`; Playwright contact + Managing Arthritis selectors
- Disclaimer strips on `/healthcare-professionals`, `/resource-centre`, OA, Exercise hub; `#main-content` skip target on `404.html`
- Vitest: host-redirects, seo-redirects, static-blog-html, no-removed-backends, medicalDisclaimer — green for touched suites

## G. Live vs GitHub lag

At audit time live still served homepage OG for london / bad blog / bare vitamin-d while GitHub tip was `3977822` with Deploy **skipped** (CI red). After this push, Deploy runs only when CI + Lint & Test + Tests succeed for the SHA — Louis may still need a manual Lovable publish if the workflow token/path lags.
