# Security fixes — 18 September 2026 (Europe/London)

**Repo:** `Louis-Maxwell/livingwitharthritis`  
**Related:** `docs/SECURITY-REVIEW-2026-09-16.md`  
**Constraints:** No Lovable credits/`send_message`; no Cursor cloud agents; no Oswestry address; no invented metrics; educational-not-diagnostic; do not restore full Supabase app.

## Fixed (this pass)

| Item | Action |
|------|--------|
| Open SEO/analytics **public SELECT** on dormant Supabase | Dropped `Anyone can view blog_views`, `Anyone can read cached sitemap`, `Anyone can view statistics`, `Anyone can view helpfulness counts` via migration `lock_down_public_anon_reads_20260918` on project `eswdtpmknwjxtvkyxvmi`. |
| Other public CMS **SELECT** leftovers | Dropped open SELECT policies on about/conditions/services/nutrition/physio/donation_tiers/fundraising_options/healthy_living_resources/blog_articles/blog_comments/joint_exercises/featured_stories + AI-safety / faces / journey tables (second migration `lock_down_remaining_anon_vectors_20260918`). Site has **no** Supabase client in `src/`. |
| Anon **INSERT** form sinks | Dropped newsletter / contact / comments / donations / feedback / quiz / volunteer / helpfulness / chat_feedback / fundraising_inquiries INSERT policies so submissions cannot sit in DB from the public API. |
| Anon **SECURITY DEFINER** RPCs | `REVOKE EXECUTE` on `has_role`, `increment_blog_view`, `rls_auto_enable` from `anon` / `authenticated` / `PUBLIC`. |
| Client-side secrets / resurrected SDK | Confirmed: no `supabase/` tree, no `@supabase/*` in `src/`, `no-removed-backends` test still gates resurrection. |
| CSP FormSubmit | Added `https://formsubmit.co` to `connect-src` in `index.html`, `public/_headers`, `.htaccess` (newsletter AJAX). `'unsafe-eval'` already absent. |
| Workflow permissions (F6 residual) | Added top-level `permissions: contents: read` to `.github/workflows/gitleaks.yml`. |
| `/debug/schema` (F9) | Route now mounted only when `import.meta.env.DEV` (removed from production router). |
| Newsletter delivery without DB | `subscribeNewsletter` posts to FormSubmit.co AJAX → `info@livingwitharthritis.org.uk`; mailto fallback only. Honest UI: no “saved to database”. |

## Already fixed earlier (still valid)

| ID | Status |
|----|--------|
| F2 `'unsafe-eval'` | Removed from meta/`_headers`/.htaccess CSP |
| F3 postMessage GSC | Deleted with `gsc-integration.ts` |
| F4 / F5 Dependabot | js-yaml override + Vitest bump |
| F6 most workflows | Explicit `permissions:` |
| F7 `server.js` | Deleted |
| F8 dormant supabase functions / client stubs | Deleted from repo |
| F10 Stripe donate URL | Host allowlist in `validateStripeDonateUrl` |

## Residual (honest)

| Item | Why it remains |
|------|----------------|
| **F1 Live HTTP CSP / Permissions-Policy** | Lovable/Cloudflare still serve `Content-Security-Policy: frame-ancestors 'self'` and omit Permissions-Policy on live responses. Repo `_headers` / meta CSP are stronger; host dashboard must apply them. |
| **F14 HSTS preload on live** | Live HSTS lacks `preload` / longer max-age present in repo `_headers`. |
| **`'unsafe-inline'` in CSP** | Still required for consent/boot scripts and Vite/Lovable inline styles until nonces/hashes are feasible. |
| **Dormant Supabase project** | Project `eswdtpmknwjxtvkyxvmi` still exists (tables retained) but public read/write vectors above were revoked. Full pause/delete is an optional Louis dashboard step — **not** restoring the app. |
| **Extension `vector` in public schema** | Supabase advisor WARN; unrelated to site runtime. |
| **Mailto residual** | Contact/volunteer/comments still mailto; not a secure message bus (accepted for static charity site). |
| **Third-party scripts** | GA / Evarist / Stripe supply-chain risk unchanged; consent gate remains. |

## Verification notes

- In-repo: `rg` finds no `createClient` / `.from('seo'|analytics|gsc)` client usage under `src/`.
- Supabase: open `qual = true` SELECT policies for SEO/analytics tables removed (query `pg_policies` after migrations).
- Newsletter: Vitest covers FormSubmit success path + mailto fallback.

*No Critical/High production runtime vulns newly grounded beyond residual host-header gap (F1).*
