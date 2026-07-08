## Verification results

I ran the checks against the current codebase:

| Check | Command | Result |
|---|---|---|
| Deleted `Finances.tsx` route leftovers | `rg "Finances\|/finances[^-]" src/ scripts/ public/` | ✅ None. Only match is the unrelated body word "finance" in Governance/Corporate copy and the `BlogPreview` category label **"Finances & Benefits"** (see note). |
| Sitemap references to `/finances` | `rg "/finances[^-]" public/sitemap.xml` | ✅ None. |
| Broken internal `<Link to="…">` / `href="/…"` | Extracted 294 unique `to=` + 52 `href=` targets, matched against the 168 `path=` entries in `src/App.tsx` (`:param` → regex) | ✅ 0 unresolved. |
| Sitemap URLs vs App routes | Extracted all 1063 `<loc>` paths, matched against App route patterns | ✅ 0 orphans. |
| Sitemap generator references to deleted page | `rg "Finances" scripts/generate-sitemap.ts scripts/prerender-routes.mjs` | ✅ None. |
| `robots.txt` / `llms.txt` / prerender list | `rg "Finances\|/finances" public/robots.txt public/llms.txt scripts/prerender-routes.mjs` | ✅ None. |
| Page metadata drift | `TrustCredibility.NEW`, `Governance`, `AboutUs`, `TermsConditions`, `PrivacyPolicy`, `Complaints`, `Safeguarding`, `Donate`, `TrustCredibility`, `HomePage.NEW`, `PrivacyPolicy.NEW` all source `title`/`description`/`canonical`/`og:*` from `CHARITY` in `@/config/charity` (verified last turn). | ✅ Consistent. |

### Note on "finances-benefits"

`public/sitemap.xml` contains `/blog/category/finances-benefits`. This is **not** related to the deleted `Finances.tsx` page. It is generated dynamically by `scripts/generate-sitemap.ts` from live rows in the `blog_articles` Supabase table (category slug of at least one published article). The matching label "Finances & Benefits" is also declared in `src/components/landing/BlogPreview.tsx` as a legitimate blog taxonomy. **Keep as-is** — deleting it would create a mismatch with the actual blog data.

## Proposed action

**No code changes required.** The audit passes on every dimension the user asked about.

Two optional follow-ups if desired (not part of this plan unless approved):

1. **Regenerate `public/sitemap.xml` now** by running `bun scripts/generate-sitemap.ts` — the file will already regenerate on the next `predev`/`prebuild`, so this is only needed if you want the timestamps refreshed today.
2. **Trigger a fresh SEO scan** via the SEO & AI Search tab to re-verify metadata against the crawler's view.

If either is wanted, approve this plan and say which; otherwise the verification stands and nothing needs to be built.

## Out of scope

- Non-URL "finance" words in body copy (Governance treasurer bio, Corporate Giving pro-bono list, guides) — legitimate content, not references to the deleted page.
- The `/blog/category/finances-benefits` sitemap entry — legitimate blog taxonomy driven by real database data.
