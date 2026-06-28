## Plan: Refresh SEO audit against the current build

**Important:** I can't trigger a Semrush PDF crawl from here — that runs from your Semrush account on their schedule (or by clicking "Re-run audit" in the Semrush Site Audit dashboard). What I *can* do is run the equivalent checks from inside the project and give you a fresh issues report.

### Steps

1. **Trigger the in-platform SEO scan** (`seo_chat--trigger_scan`) — runs in ~1 min, surfaces title/description/canonical/hreflang/schema findings against the live build.
2. **Run local audit scripts** in parallel:
   - `scripts/audit-sitemap.mjs` — re-check all 844 sitemap URLs for 404s/redirects
   - `scripts/check-canonicals.mjs` — verify every route emits a canonical
   - `scripts/check-social-meta.mjs` — OG/Twitter coverage
   - `scripts/validate-jsonld.mjs` — JSON-LD schema validity
3. **Pull live domain snapshot from Semrush** (`semrush--domain_analysis` + `semrush--seo_trend` on livingwitharthritis.org.uk, UK database) for traffic/keyword movement since the last PDF.
4. **Compile `docs/SEO-AUDIT-2026-06-28.md`** with:
   - Status of each issue from the June 26 Semrush PDF (fixed / still open / stale)
   - New findings from steps 1–2
   - Semrush trend delta
   - Prioritised remediation list
5. **Mark fixed findings** in the SEO panel via `seo_chat--update_findings`.

### What you'll get
A single dated markdown report + an updated SEO panel. For a true fresh Semrush crawl with their 130-check ruleset, click "Re-run audit" in your Semrush Site Audit project — I'll then reconcile its output against this report.

Approve to run.