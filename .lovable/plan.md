
# GA4 + Search Console optimisation

Work through the checklist you pasted, item by item, using what's already in the codebase and filling the gaps.

## 1. GA4 — tracking coverage
- Verify `G-X8GTW05JJS` loads on every route by reading `index.html` and confirming `EngagementTracker` fires `page_view` on SPA navigations (already wired in `src/components/EngagementTracker.tsx`).
- Add a lightweight runtime check in dev that warns if `window.gtag` is missing after mount, so future regressions surface immediately.

## 2. GA4 — conversions / key events
Already firing: `generate_lead` (newsletter + contact), `newsletter_confirmed`, `contact_form_submit`, `donation_click`, `file_download`. Gaps to close:
- Fire `donation_click` from every Donate CTA that currently isn't wired (audit `src/components/**` for Donate buttons and add `trackDonationClick({ source })`).
- Fire `file_download` on the starter-guide PDF link (`public/downloads/arthritis-starter-guide-preview.pdf`) and any other downloadable asset.
- Add `view_item` on `/products/:slug` and `begin_checkout` on the cart → checkout transition (shop conversion funnel).
- Document all key events in `docs/GA4-CONVERSIONS.md` and note which to mark as key events in GA4 Admin.

## 3. GA4 — UTM discipline
- Add a short `docs/UTM-CONVENTIONS.md` with the standard `utm_source/medium/campaign/content/term` naming we'll use for newsletter, social, and partner links, plus 3–4 worked examples.
- No code change needed — GA4 already parses UTMs automatically.

## 4. GA4 — custom dashboards
- Not a code task; add a short "Recommended GA4 Explorations" section to `docs/GA4-CONVERSIONS.md` listing the 4 reports to build in GA4 UI: Landing pages (using `is_landing_page`), Conversion funnel, Content engagement (using `engagement_30s/60s/180s`), Scroll depth by page.

## 5. Search Console — property coverage
- Use the connected Search Console to list verified properties and confirm all four variants (`http://`, `https://`, `www`, non-www) are present for `livingwitharthritis.org.uk`. If any are missing, add them via the Site Verification API using the META token flow (site already has `google6403cab80af896ec.html` file verification).
- Report back which properties exist and which need adding.

## 6. Search Console — sitemap submission
- Confirm `public/sitemap-index.xml` is submitted for each verified property via the Sitemaps API. Submit any that are missing.

## 7. Search Console — coverage & performance monitoring
- Run URL Inspection on the 6 canonical landing pages (`/`, `/about`, `/diet`, `/exercises`, `/arthritis-flare-ups`, `/guides/exercise`) plus the new `/blog/ginger-vs-turmeric-for-arthritis` and report indexing state.
- Pull 28-day performance summary (impressions, clicks, CTR, avg position) and top 10 queries — surface in chat, no code change.

## 8. Backlinks
- Pull the Semrush backlink profile for `livingwitharthritis.org.uk` (authority score, referring domains, top anchors) and summarise in chat. No code change.

## Deliverables
Code / docs:
- `docs/GA4-CONVERSIONS.md` — expanded with dashboards section + new events.
- `docs/UTM-CONVENTIONS.md` — new.
- Wire `trackDonationClick` / `trackFileDownload` / shop funnel events into any un-instrumented CTAs.

Chat-only reports (no file changes):
- Verified GSC properties + any that need adding.
- Sitemap submission status per property.
- URL Inspection results for 7 key URLs.
- 28-day GSC performance snapshot + top queries.
- Semrush backlink summary.

## Out of scope
- No visual/UI changes.
- No new pages or routes.
- No backend/schema changes.
