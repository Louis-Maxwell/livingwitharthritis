# CodeQL security fixes — 19 September 2026 (Europe/London)

**Repo:** `Louis-Maxwell/livingwitharthritis`  
**Owner:** Grok Bot (no Dependabot / Lovable credits / Cursor cloud agents)  
**Baseline:** `npm audit` = 0, Dependabot alerts = 0; **34 open CodeQL warnings** addressed in code.

## Alert numbers addressed

| # | Rule | Path | Fix |
|---|------|------|-----|
| 32 | `js/xss-through-dom` | `src/pages/DebugSchema.tsx` | DEV-only UI; iframe driven only by hardcoded `PRESETS` via select **index** (never free-text DOM → `src`). |
| 27 | `js/incomplete-multi-character-sanitization` | `src/pages/BlogPost.tsx` | Tag strip via fixed-point `stripHtml` (`src/lib/sanitize.ts`). |
| 26 | `js/incomplete-multi-character-sanitization` | `src/lib/sanitize.ts` | Iterative strip + neutralize leftover `<>`. |
| 25, 24 | `js/incomplete-multi-character-sanitization` | `src/components/TableOfContents.tsx` | Uses `stripHtml`. |
| 23 | `js/incomplete-multi-character-sanitization` | `scripts/seo-gap-fill.mjs` | Uses `scripts/lib/strip-tags.mjs` (fixed-point). |
| 22, 21, 20 | `js/incomplete-multi-character-sanitization` | `scripts/static-article-html.mjs` | Replaced regex sanitizer with **jsdom + DOMPurify**. |
| 19 | `js/incomplete-multi-character-sanitization` | `scripts/generate-blog-head-data.mjs` | Uses `stripTags`. |
| 16, 15 | `js/bad-tag-filter` | `scripts/static-article-html.mjs` | DOMPurify (no hand-rolled `</script>` regex). |
| 14 | `js/incomplete-url-scheme-check` | `scripts/static-article-html.mjs` | DOMPurify `ALLOWED_URI_REGEXP` = `https?\|mailto\|tel` + relative `/` + `#` only. |
| 13 | `js/overly-large-range` | `src/utils/sanitizeHtml.ts` | Hyphen moved to end of character class in `ALLOWED_URI_REGEXP`. |
| 1 | `js/identity-replacement` | `src/data/keywords-1000.ts` | Removed no-op `.replace("arthritis", "arthritis")`. |
| 35 | `js/regex/missing-regexp-anchor` | `src/main.tsx` | Anchored Sentry `allowUrls` with `^` … `(?:/\|$)`. |
| 34 | `js/insecure-randomness` | `src/components/ChatBot.tsx` | `crypto.randomUUID()` / `crypto.getRandomValues` only. |
| 33 | `js/insecure-randomness` | `src/components/AnalyticsTracker.ts` | Same. |
| 51, 46 | `js/file-system-race` | `scripts/inject-canonicals.mjs` | `writeFileAtomicSync` (temp + rename). |
| 47 | `js/file-system-race` | `scripts/sync-host-redirects.mjs` | Atomic write. |
| 44, 43 | `js/file-system-race` | `scripts/remove-console-logs.mjs` | Atomic write. |
| 42 | `js/file-system-race` | `scripts/generate-og-images.ts` | Atomic write. |
| 41 | `js/file-system-race` | `scripts/generate-404.mjs` | Atomic write. |
| 40 | `js/file-system-race` | `scripts/check-prerender-meta.mjs` | Atomic write. |
| 39 | `js/file-system-race` | `scripts/apply-aeo.mjs` | `writeFileAtomic`. |
| 50 | `js/file-access-to-http` | `scripts/audit-sitemap.mjs` | Allowlisted sitemap hosts; fetch only `BASE + validated pathname` via `URL`. |
| 38 | `js/http-to-file-access` | `scripts/generate-og-images.ts` | Content-type + SFNT magic-byte check before atomic write to fixed cache path. |
| 37 | `js/indirect-command-line-injection` | `scripts/seo-audit.ts` | `execFileSync` + sanitized env (`DIST_DIR` / `BASE_URL`); no shell string interpolation. |
| 29 | `js/double-escaping` | `scripts/generate-seo-inventory.mjs` | `decodeBasicEntities` (`&amp;` last). |
| 28 | `js/double-escaping` | `scripts/check-prerender-meta.mjs` | Same. |
| 49, 48 | `js/insecure-temporary-file` | `scripts/validate-jsonld.mjs` | `fs.mkdtempSync` under OS temp; atomic report writes. |

**Total: 34 alerts (numbers 1, 13–16, 19–29, 32–35, 37–42, 43–44, 46–51).**  
(Note: alerts 2–12, 17–18, 30–31, 36, 45 were already closed before this pass.)

## Helpers added

- `scripts/lib/atomic-write.mjs` — `writeFileAtomicSync` / `writeFileAtomic` / `writeFileExclusiveSync`
- `scripts/lib/strip-tags.mjs` — fixed-point `stripTags` + `decodeBasicEntities`

## Constraints respected

- Prefer DOMPurify / existing sanitize helpers over fragile multi-replace HTML regex
- Do **not** restore Supabase / Vercel / Dependabot
- Do **not** use Lovable credits or Cursor cloud agents
- Educational site behaviour unchanged; DebugSchema remains DEV-only

## Verification

- Relevant Vitest suite run on this branch (see PR / CI Keep green)
- Prefer code fixes over `gh api` dismissals; none dismissed in this pass
