# GA4 Conversion Tracking: Newsletter & Contact

## Goal
Fire GA4 conversion events on successful newsletter signups and contact form submissions, so they appear as measurable goals in GA4 → Admin → Events → Mark as key event.

## Event design
Two canonical events (snake_case, GA4-recommended):

1. `generate_lead` (newsletter) — params: `method: "newsletter"`, `location` (component name), `interests` (count), `value: 1`, `currency: "GBP"`.
2. `contact_form_submit` — params: `method: "contact_form"`, `topic` (if available), `value: 1`, `currency: "GBP"`. Also mirror as `generate_lead` with `method: "contact"` so a single GA4 key event can cover both if desired.

All events fire **only after** the backend call resolves successfully (not on click), to avoid inflating numbers on validation errors.

## Code changes

1. **`src/lib/analytics.ts`** — add typed helpers:
   - `trackNewsletterSignup({ location, interests? })`
   - `trackContactSubmit({ topic? })`
   Both wrap `trackEvent` and include the conversion params above. Centralised so we don't sprinkle string literals.

2. **`src/components/NewsletterSignup.tsx`** (line ~108 already calls `trackEvent("newsletter_signup", …)`) — replace with `trackNewsletterSignup({ location: "inline", interests: selected.length })` so the canonical `generate_lead` event fires alongside the existing custom one (keep the legacy `newsletter_signup` for backwards-compat dashboards).

3. **`src/components/landing/NewsletterSection.tsx`** — call `trackNewsletterSignup({ location: "landing_section" })` inside the success branch of `handleSubmit` (currently only toasts).

4. **`src/components/landing/NewsletterHeroBanner.tsx`** — call `trackNewsletterSignup({ location: "hero_banner" })` after the successful submit path in `onSubmit`.

5. **`src/components/landing/ContactSection.tsx`** — after `submitContact` resolves and `setSubmitted(true)`, call `trackContactSubmit({ topic })`.

6. **`src/pages/NewsletterConfirm.tsx`** — on successful double-opt-in confirmation, fire `trackEvent("newsletter_confirmed", { method: "newsletter" })` so we can distinguish confirmed vs pending.

No backend/edge-function changes; tracking is client-side after the network promise resolves.

## Making them "measurable goals" in GA4
Add a one-time setup note to `docs/SEO-AUDIT-2026-06-28.md` (or new `docs/GA4-CONVERSIONS.md`):
1. GA4 → Admin → Events → wait 24h for `generate_lead` and `contact_form_submit` to appear.
2. Toggle **Mark as key event** for both.
3. (Optional) Create an Audience: users with `generate_lead` in last 30 days.
4. In Google Ads (if used later), import the key events as conversions.

`generate_lead` is one of GA4's recommended events, so it shows up in standard reports (Engagement → Conversions) automatically once marked.

## Verification
- `tsgo --noEmit` + `bun run build`.
- Manual: in DEV, submit each form and check `[ga4]` console debug lines for `generate_lead` / `contact_form_submit`.
- Post-publish: GA4 Realtime → Events should list the new event names within ~30s of a test submission.

## Out of scope
- Server-side Measurement Protocol (would require GA4 API secret; current client-side is sufficient for goal tracking).
- Marking events as key events programmatically (GA4 has no API for this; it's a one-click UI step).
