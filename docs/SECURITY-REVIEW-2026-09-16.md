# Security review — Living With Arthritis UK

**Date:** 16 September 2026 (Europe/London)  
**Repo:** `Louis-Maxwell/livingwitharthritis` (`/workspace/livingwitharthritis`)  
**Live:** https://livingwitharthritis.org.uk  
**Scope:** Secrets, XSS sinks, auth leftovers, live headers, dependencies, forms/donate, CI/supply chain, privacy  
**Method:** Static review of `src/`, workflows, `public/_headers`, `index.html`; `curl -sI` on live; `npm audit --omit=dev`; GitHub Dependabot + CodeQL alert APIs.  
**Constraints honoured:** No invented vulns/metrics; no restore of Supabase/Vercel/Cloudflare; secrets redacted (type/path only); no CloudAgent / Lovable agent.

This is an educational charity **static + mailto** site (Lovable hosting). Residual risk is real but the attack surface is small: no user accounts, no server-side form API in production path, donations currently mailto-or-env-URL rather than a custom card vault on-origin.

**Do not treat this document as a PCI DSS, ISO 27001, Cyber Essentials, or penetration-test certificate.**

---

## Executive summary

### What looks OK

| Area | Evidence |
|------|----------|
| Committed secrets | `.env`, `.env.local`, `.env.production` are gitignored and contain only comment stubs locally. Tracked templates (`.env.example`, `.env.local.sample`) have empty placeholders. No `sk_live` / `sk_test` / `whsec_` / `service_role` / PEM private keys found under `src/` (excluding docs/locks). |
| XSS sinks | Every `dangerouslySetInnerHTML` in `src/` observed goes through `sanitizeHtml` (DOMPurify allowlist + URI hooks) or `jsonLdScript` (JSON escape of `<`). |
| Auth / sessions | No Supabase client in `src/` (`no-removed-backends` test). `localStorage` holds consent, chat profile, bookmarks, visitor IDs — not auth tokens. SEO redirects are static maps, not user-controlled open redirects. |
| Forms | `src/lib/backendSubmit.ts` / `formApi.ts` are mailto-only; honest `ok: false` messaging. |
| Stripe secrets | No webhook secret or secret key in frontend. `StripeDonationModal` uses optional `VITE_STRIPE_DONATE_URL` or mailto fallback. |
| Prod npm audit | `npm audit --omit=dev` → **0** vulnerabilities (16 Sep 2026). |
| Deploy gate | `.github/workflows/deploy-to-lovable.yml` runs only after CI / Lint & Test / Tests success for the same SHA; `LOVABLE_API_TOKEN` referenced only as `${{ secrets.LOVABLE_API_TOKEN }}`. |
| Privacy basics | `CookieBanner` + consent-gated GA load; public measurement ID `G-ZLLSD3PXZ9` as expected. |
| Live baseline headers | HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN` present on HTTPS responses. |
| Disclosure | Root `SECURITY.md` + Gitleaks workflow. |

### Priority fixes (honest)

1. **Live HTTP CSP / Permissions-Policy gap** — Host serves only `Content-Security-Policy: frame-ancestors 'self'` and **no** `Permissions-Policy`. Stronger policy exists in `public/_headers` and a meta CSP in `index.html`, but the HTTP CSP from the platform does not match the repo file. Meta CSP still allows `'unsafe-inline'` and `'unsafe-eval'`.
2. **Tighten CSP over time** — Remove or narrow `'unsafe-eval'` / reduce inline script reliance when Lovable/hosting allows header control.
3. **Latent `postMessage` without origin check** — `src/lib/gsc-integration.ts` (CodeQL `js/missing-origin-check`). Appears unused at app entry (`initGSCMonitoring(` not called from `src/` consumers found); still fix or delete.
4. **Dev-only Dependabot opens** — `js-yaml` (high, via ESLint) and Vitest mocker path traversal (medium). Not in production bundle (`npm ls … --omit=dev` empty), but fix for CI hygiene.
5. **Dead backend leftovers** — `server.js`, `supabase/functions/`, edge-functions preflight workflow inflate review noise and CodeQL surface; do **not** revive them “for security.”

**No Critical findings** grounded in this review. Highest practical priority is **Medium**: make live security headers match intent, and keep sanitizer + mailto model.

---

## Findings table

| ID | Severity | Finding | Evidence | Recommended fix | Effort |
|----|----------|---------|----------|-----------------|--------|
| F1 | Medium | Live HTTP CSP is minimal (`frame-ancestors 'self'` only); `Permissions-Policy` absent on live | `curl -sI https://livingwitharthritis.org.uk` (and `/donate`): CSP = `frame-ancestors 'self'`; no Permissions-Policy. Contrast: `public/_headers` defines full CSP + `Permissions-Policy: camera=(), microphone=(), geolocation=(self)` | Confirm whether Lovable/Cloudflare applies Netlify-style `_headers`. If not, set equivalent headers in the host/CDN dashboard (or CF Transform Rules). Align `frame-ancestors` / `X-Frame-Options` with intent (`DENY`/`none` vs `SAMEORIGIN`/`self`) | S–M |
| F2 | Medium | Meta / `_headers` CSP allow `'unsafe-inline'` and `'unsafe-eval'` | `index.html` meta CSP; `public/_headers` CSP line | Prefer nonces/hashes for any remaining inline boot scripts; drop `'unsafe-eval'` if build/tooling permits; keep Stripe/GTM host allowlists explicit | M |
| F3 | Low | `postMessage` listener lacks `event.origin` check | `src/lib/gsc-integration.ts` ~157–174; CodeQL alert #36 `js/missing-origin-check`. No `initGSCMonitoring(` call sites found outside the defining file | Delete unused GSC alert listener, or gate with an allowlisted `event.origin` before reading `event.data` | S |
| F4 | Low | Open Dependabot: `js-yaml` high (dev tree) | Dependabot alert #144; `npm ls js-yaml --omit=dev` empty; full `npm audit` shows high via `eslint` → `@eslint/eslintrc` | `npm audit fix` / bump ESLint stack so lockfile picks patched `js-yaml`; re-check Dependabot | S |
| F5 | Low | Open Dependabot: `vitest` / `@vitest/mocker` medium (dev) | Alerts #142–143; not in prod audit | Upgrade Vitest when fix lands; CI-only risk (path traversal in mocker) | S |
| F6 | Low | Some workflows omit explicit `permissions:` | `edge-functions-preflight.yml`, `lint-and-test.yml` lack top-level `permissions:` (others set `contents: read`) | Add `permissions: contents: read` (and job-scoped extras only if needed) | S |
| F7 | Low | Dead Express/`server.js` + Redis sample (open `cors()`, rate-limit CodeQL noise) | Root `server.js`; not wired as live Lovable static host; CodeQL `js/missing-rate-limiting` on `server.js` | Archive or delete if unused; do not deploy it “to be safer” | S |
| F8 | Info | Supabase MCP function tree still in repo | `supabase/functions/mcp/index.ts`, `edge-functions-preflight.yml`; `package.json` has no `@supabase/*`; src guarded by test | Leave dormant or delete folder + workflow to reduce confusion; **do not restore Supabase** for this site’s current model | S |
| F9 | Info | `/debug/schema` publicly routable (noindex) | `src/App.tsx` route `/debug/schema`; `DebugSchema.tsx` has `sanitizePath` + `robots: noindex`; CodeQL #32 `js/xss-through-dom` — render path uses `<pre>` text, path sanitised | Keep noindex; optionally gate behind env/build flag or remove from production routes | S |
| F10 | Info | `VITE_STRIPE_DONATE_URL` redirect without host allowlist | `StripeDonationModal.tsx`: `new URL(donateUrl)` then `window.location.href` — value is build-time env, not request param | If URL set, allowlist `https://checkout.stripe.com` / known Payment Link hosts before navigate | S |
| F11 | Info | Expected public analytics / third-party IDs | Live HTML / `index.html`: `G-ZLLSD3PXZ9`; Evarist `data-evarist` present | No action for GA ID; document Evarist as intentional; ensure consent gate covers both | — |
| F12 | Info | Cookie / local storage of non-auth prefs | `cookie-consent`, `lwa_cv3`, chat profile, visitor `_visitor_id`, bookmarks | Acceptable for static site; keep DPIA/cookies policy aligned; no auth tokens observed | — |
| F13 | Info | `regenerate-lockfile.yml` uses `contents: write` | Needed for bot lockfile commits on schedule/dispatch | Keep; prefer pinning Actions SHAs long-term; monitor bot PRs/pushes | — |
| F14 | Info | HSTS on live lacks `preload` flag present in `_headers` | Live: `max-age=31536000; includeSubDomains` vs `_headers` `…; preload` and longer max-age | Optional: match `_headers` once header pipeline is fixed (F1) | S |

**Critical: none grounded.**  
**High (production runtime): none grounded.** Open Dependabot “high” is **devDependency-only** (F4).

---

## Ranked improvement backlog (top 10)

1. **[Med] Apply real HTTP security headers on the live host** — full CSP + Permissions-Policy (F1).  
2. **[Med] Harden CSP** — remove `'unsafe-eval'`, reduce `'unsafe-inline'` when feasible (F2).  
3. **[Low] Fix or delete `postMessage` GSC listener** (F3).  
4. **[Low] Resolve open Dependabot js-yaml / Vitest** for CI hygiene (F4–F5).  
5. **[Low] Add explicit `permissions:` to remaining workflows** (F6).  
6. **[Low] Remove or archive unused `server.js` / edge preflight / dormant `supabase/functions`** without restoring backends (F7–F8).  
7. **[Info] Allowlist Stripe donate URL host** if Payment Links go live (F10).  
8. **[Info] Align framing policy** (`DENY`/`frame-ancestors 'none'` vs current SAMEORIGIN/`self`) once headers are controllable (F1/F14).  
9. **[Info] Production-gate `/debug/schema`** if you want zero internal tools on the public origin (F9).  
10. **[Info] Re-verify consent covers GTM/Evarist/Stripe frames** after any header CSP change (F11–F12).

---

## Scope notes (evidence detail)

### 1. Secrets in repo

- Gitignore covers `.env`, `.env.local`, `.env.production`.
- `git ls-files '.env*'` → `.env.example`, `.env.local.sample` only.
- Local stub files contain comments only (“no Supabase. Forms use mailto.”) — no key material.
- `BACKEND-ENHANCEMENT-PLAN.md` mentions `SUPABASE_SERVICE_ROLE_KEY` as **documentation example**, not a live value.
- Dependabot: **3 open** (#144 js-yaml high; #142–143 Vitest medium); **27 fixed** historically (API 16 Sep 2026).

### 2. XSS

- Central sanitiser: `src/utils/sanitizeHtml.ts` (DOMPurify allowlist, forbids `script`/`iframe`/event handlers, strips dangerous URI schemes).
- Blog, pillars, guides, condition template, chart CSS injection path all call `sanitizeHtml`.
- JSON-LD helper escapes `<` → `\u003c`.

### 3. Auth / session leftovers

- No `@supabase` imports in `src/`; removal test present.
- Redirects: `seoRedirects` / `BLOG_SLUG_REDIRECTS` / React Router `Navigate` — fixed maps.
- `postMessage`: only notable listener in `gsc-integration.ts` (F3).

### 4. Live security headers (2026-09-16)

Observed on `https://livingwitharthritis.org.uk`:

| Header | Live value |
|--------|------------|
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` |
| Content-Security-Policy | `frame-ancestors 'self'` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| X-Content-Type-Options | `nosniff` |
| X-Frame-Options | `SAMEORIGIN` |
| Permissions-Policy | *(absent)* |
| Server | cloudflare |

Browser also receives meta CSP from HTML (broader policy with Stripe/GA/Lovable/Evarist allowlists).

### 5. Dependencies

- `npm audit --omit=dev`: **0** vulnerabilities.
- Full `npm audit`: 1 high (`js-yaml` via ESLint), 3 moderate (Vitest tree).

### 6. Forms / donate

- Contact / newsletter / comments → mailto via `backendSubmit`.
- Donate UI: Stripe-branded modal; runtime path is env Payment Link **or** mailto for a payment link — no `whsec_` / secret key in frontend.
- Shopify storefront token is `VITE_`-prefixed (public by design if enabled); empty if unset.

### 7. Supply chain / CI

- Deploy workflow: `workflow_run` + SHA gate; least-privilege `actions: read`, `contents: read`; token only from Actions secrets.
- Gitleaks + CodeQL workflows present.
- Many open CodeQL alerts are **script/tooling** (`scripts/*`, `server.js`) or incomplete-sanitisation heuristics already mitigated by DOMPurify on render paths — triage separately from live XSS.

### 8. Privacy

- Cookie banner writes `cookie-consent` / dispatches `cookie-consent-accepted`.
- GA ID `G-ZLLSD3PXZ9` loaded after consent in `index.html` boot script.
- Evarist script also present in `index.html` — treat as analytics/third-party; keep under consent policy.

---

## What NOT to do

- **Do not restore Supabase, Vercel serverless, or Cloudflare Workers** solely to look “more secure.” That reintroduces secrets, auth, and API surface the site deliberately removed.
- **Do not deploy root `server.js`** (Express + Redis + permissive CORS) as a “hardening” layer for this Lovable static site.
- **Do not claim PCI / ISO / Cyber Essentials compliance** from this review.
- **Do not treat mailto as a secure message bus** — clients may not send; no server-side validation pipeline exists (accepted residual risk for a small charity).
- **Do not invent backend webhooks** until there is a real Stripe webhook receiver with secrets only in host env (never `VITE_`).

---

## Residual risk (honest)

A static educational site with mailto forms and optional third-party checkout links still faces:

- Supply-chain compromise of npm/Lovable/CDN/third-party scripts (Stripe, GTM, Evarist).
- XSS if staff-authored HTML ever bypasses DOMPurify or if a future sink skips `sanitizeHtml`.
- Weak HTTP CSP on the live edge until F1 is fixed (meta CSP helps but is not equivalent to a locked-down HTTP CSP without unsafe-eval).
- Social engineering via public contact emails and donate CTAs.
- Privacy expectations if analytics fire without clear consent (currently gated for GA; verify all tags).

For the current architecture, keeping **sanitised HTML**, **no secrets in the repo**, **mailto-only forms**, **CI deploy gates**, and **fixing live headers** is proportionate. Heavy backends would increase, not decrease, operational security burden unless product requirements change.

---

## Appendix — commands used (reproducible)

```bash
curl -sI https://livingwitharthritis.org.uk
curl -sI https://livingwitharthritis.org.uk/donate
npm audit --omit=dev
npm audit
gh api repos/Louis-Maxwell/livingwitharthritis/dependabot/alerts
gh api 'repos/Louis-Maxwell/livingwitharthritis/code-scanning/alerts?state=open&per_page=50'
rg -n 'dangerouslySetInnerHTML|sanitizeHtml|DOMPurify' src/
rg -n --hidden -g '!node_modules' -g '!dist' -g '!.git' 'sk_live_|whsec_|service_role|BEGIN PRIVATE' .
```

*Reviewer: grounded pass 2026-09-16. No secrets printed in this document.*
