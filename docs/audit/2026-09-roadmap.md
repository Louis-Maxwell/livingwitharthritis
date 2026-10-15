# Improvement roadmap: livingwitharthritis.org.uk (September 2026)

This follows on from [`2026-09-technical-audit.md`](./2026-09-technical-audit.md).

- **Order:** items are sorted by impact on visitors and donors, then by effort.
- **Owner:** "Louis" means it needs an account, a setting or a content decision. "Repo" means it can be done as a pull request.
- **Effort:** S = under half a day, M = 1–3 days, L = a week or more.

## P0: this week (no code needed, or unblocks what already shipped)

| # | Item | Why | Owner | Effort |
|---|---|---|---|---|
| P0-1 | **Press Publish in Lovable**, then spot-check `/`, one guide, `/donate` and `/contact` on a phone. | Merged fixes (#104–#108 and the CI PR) are not live until published. | Louis | S |
| P0-2 | **Set `VITE_STRIPE_DONATE_URL`** in the Lovable environment to the charity's Stripe Payment Link. | Without it, the donation modal falls back to an email draft and tells donors card payments are "temporarily unavailable". Every failed attempt now shows up in GA4 as `donation_checkout` form failures. | Louis | S |
| P0-3 | **GA4 error dashboard.** Register the custom dimensions (`description`, `error_kind`, `error_source`, `fatal`, `page_path`), create the "Site errors" Free-form exploration, and add a custom-insight alert. Steps are in `docs/monitoring/error-reporting.md`. | The site already sends the events. This is the free dashboard the brief asked for. | Louis | S |
| P0-4 | **Verify content claims** on the evergreen pages (`src/pages/stubs/index.tsx`): webinars and events, "£1,000–£5,000" research grants, the helpline, volunteer roles. Also resolve **"Gift Aid coming soon"** (`FinalDonateBand`) against the Gift Aid option on `/donate` and in the donation modal. | Visitors and donors must be able to rely on these. They are in the sitemap and linked from navigation. | Louis | S |
| P0-5 | **Make "E2E Tests (Playwright)" a required check** in branch protection. Optionally make `lighthouse` required once it has been green for a week. | Both now fail honestly. Before, they could not fail. | Louis | S |

## P1: next 1–2 months

| # | Item | Why | Owner | Effort |
|---|---|---|---|---|
| P1-1 | **Paint guides before JavaScript.** Show the prerendered guide HTML (already in each page's `#seo-fallback`) with the real stylesheet, then hydrate. Alternatively, move guides to static-site generation. | The only missed target: article mobile LCP is 3.2 s in the lab against a 2.5 s target, because of client-side rendering. Expected to bring article LCP well under 2.5 s and help SEO. | Repo | L |
| P1-2 | **Host that honours headers and redirects**, or ask Lovable to support them. Candidates: Cloudflare Pages or Netlify, publishing from GitHub `main`. | This enables real HTTP 301s for retired URLs, and a CSP *header* with `frame-ancestors`, HSTS and per-file caching. These are ready in `public/_headers` and `public/_redirects` but ignored today. It is also the simplest path for P1-1. | Louis + Repo | M |
| P1-3 | **Hosted error tracking with alerting** (optional). Sentry's free plan, or a similar service. | GA4 is not real-time and only covers consenting visitors. The swap is one module (`src/lib/errorReporting.ts`) plus adding the ingest host to the CSP. It needs an account in Louis's name. | Louis + Repo | S |
| P1-4 | **Field performance monitoring.** Add a GA4 exploration on the Web Vitals events the site already sends (event names `LCP`, `INP`, `CLS`, etc., category "Web Vitals"), broken down by page and device. | Confirms the lab gains on real phones, and catches regressions the lab doesn't see. | Louis | S |
| P1-5 | **Reduce the remaining article JS.** The guide route still loads 74 files / 276 KB gzip before load. Run a bundle visualiser on the BlogPost chunk graph and defer whatever isn't needed for the first screen. | Headroom under the 300 KB budget and faster interaction on low-end phones. | Repo | M |

## P2: later / nice to have

| # | Item | Why | Owner | Effort |
|---|---|---|---|---|
| P2-1 | **Consolidate floating calls to action.** Candidates: the sticky donation bar, mobile bottom CTA, next-step bar, back-to-top, help button and accessibility button. | They no longer stack as popups, but a phone still shows several fixed elements. Fewer means more room for content. This is a design decision. | Louis + Repo | M |
| P2-2 | **Decide on the "We're currently updating this website" banner.** | It appears site-wide. Keep it only while it is true. | Louis | S |
| P2-3 | **Supplements hub "Coming soon" badges.** Publish those guides or remove the cards. | Placeholder-style copy on a live page. | Louis | S |
| P2-4 | **Dark mode.** The `.dark` theme is almost identical to light. Either design a real dark theme (and extend the axe smoke to cover it) or remove the toggle. | A toggle that barely changes anything confuses visitors. | Repo | M |
| P2-5 | **Extend the accessibility smoke** to condition pages, the library and a city hub, and add keyboard-only journeys (donate, contact, search). | Keeps AA from regressing on less-visited templates. | Repo | S |
| P2-6 | **Test-suite speed.** Vitest recreates jsdom 90+ times; switch to `pool: 'vmThreads'` or share environments. | Faster CI feedback. | Repo | S |

## Already done in September 2026 (for reference)

- **#104:** stale-chunk recovery. No more blank screens after publishing.
- **#105:** removed 147 dead files, 25 unused dependencies, paused pages (with 301s) and the fabricated donor ticker.
- **#106:** initial JS home 325 → 212 KB gzip and article 549 → 276 KB gzip. Home LCP 3.2 → 2.2 s. Compact mobile header and cookie banner.
- **#107:** GA4 error reporting (errors, failed requests, failed forms), CSP matched to real usage, no 404 on every guide.
- **#108:** WCAG 2.1 AA contrast, FAQ fix, one popup at a time. Lighthouse accessibility 100 on home and article.
- **CI PR:** real type checking, zero-warning lint, internal link checker, a working E2E gate and a working Lighthouse gate. Broken internal links fixed.
