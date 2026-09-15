# 10 — Technical architecture

## Current state (grounded)

| Layer | Today |
|---|---|
| UI | React + Vite + Tailwind (Lovable-assisted) |
| Routing | `react-router-dom` SPA (`src/App.tsx`, ~190 path patterns) |
| Hosting / deploy | Lovable + GitHub; **CI deploy gate** recently shipped |
| Rendering | Client SPA + prerender scripts for SEO routes |
| Backend | Lean after Supabase path removal; local chatbot KB; Stripe donations |
| Analytics | GA4 `G-ZLLSD3PXZ9` |
| Repo | `Louis-Maxwell/livingwitharthritis` |

**Advisor guidance (accepted):** stay on Lovable until funded for an engineer.

---

## Target state (future — when funded)

| Layer | Target |
|---|---|
| Framework | **Next.js** (App Router) + TypeScript + Tailwind |
| Data | **Supabase** (Postgres, Auth) or equivalent managed Postgres |
| Hosting | **Vercel** (or comparable) |
| Rendering | SSG for evergreen education; SSR where personalisation/auth needed |
| Edge | CDN caching; careful with YMYL personalisation |

### When to adopt the target stack

Adopt only when **all** are true:

1. Dedicated engineering capacity (employee or agency on retainer).  
2. Revenue/grants cover build **and** 12 months operations.  
3. Product needs (forum auth, SSR scale, preview) exceed hardened SPA+prerender.  
4. Content model and IA are stable enough to migrate without rework thrash.

**Not this quarter** as an emergency rewrite.

---

## SSR / SSG plan (phased)

| Phase | Approach |
|---|---|
| Now | Improve prerender coverage; unique titles; soft-404 tests; sitemap fidelity |
| Later | Next.js static generation for conditions/exercises/blog; ISR for high-churn |

---

## Lighthouse 95+ plan (aspirational scores)

Treat 95+ as a **stretch** on all categories; ship incremental budgets.

1. Keep `lighthouserc` / budget.json gates green on key URLs.  
2. Image pipeline: WebP/AVIF, explicit dimensions, priority on LCP hero only.  
3. Reduce main-thread JS: route-level code splitting (already started).  
4. Font subsetting; avoid layout shift.  
5. Third-party: gate analytics on consent; defer non-essentials.  
6. Server TTFB: CDN cache headers on static assets.

---

## Security

| Control | Status / action |
|---|---|
| HTTPS / headers / CSP | Maintain; review on each third-party add |
| Secrets | Never commit; `.env` samples only |
| Dependency scanning | Dependabot / gitleaks patterns already in repo culture |
| Forms | Server-side validation + spam controls when leaving mailto |
| Admin routes | Auth hard-gate; no public SEO for `/admin/*` |
| Medical AI | No diagnostic outputs; rate limits; audit logs when API LLM arrives |

---

## Explicit non-actions for this strategy pack

- Do **not** restore Cloudflare Workers or Supabase into the live repo from these docs.  
- Do **not** migrate hosting mid–Phase 1 without a rollback plan and engineer.

*Next: [11-AI-INNOVATION-SPECS.md](./11-AI-INNOVATION-SPECS.md)*
