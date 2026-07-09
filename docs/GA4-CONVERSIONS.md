# GA4 Conversion Tracking

Property: `G-X8GTW05JJS` (livingwitharthritis.org.uk)

## Events fired

| Event                  | When                                              | Params                                                     |
| ---------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `generate_lead`        | After every successful newsletter signup          | `method: "newsletter"`, `location`, `interests`, `value`, `currency` |
| `newsletter_signup`    | Legacy — fired alongside `generate_lead` (inline) | `source`, `interests`                                      |
| `email_signup`         | Legacy — fired alongside `generate_lead` (banner) | `preference`, `source`                                     |
| `newsletter_confirmed` | After double opt-in confirmation                  | `method: "newsletter"`                                     |
| `contact_form_submit`  | After successful contact form submission          | `method: "contact_form"`, `topic`, `value`, `currency`     |
| `generate_lead`        | Mirrored from contact submission                  | `method: "contact"`, `topic`, `value`, `currency`          |

All events fire only after the backend call resolves successfully — validation errors and network failures do not inflate counts.

## Marking as key events (one-time setup)

1. Wait 24h after deploy for events to appear in GA4 → Admin → Events.
2. Toggle **Mark as key event** for:
   - `generate_lead` (covers both newsletter + contact)
   - `newsletter_confirmed` (optional — confirmed vs pending opt-ins)
3. Reports show automatically in **Reports → Engagement → Conversions** and **Reports → Realtime**.

## Verifying

- Dev: submit a form locally and check the browser console for `[ga4]` debug lines.
- Prod: open GA4 → Realtime in an incognito window, submit a form, the event appears within ~30s.

## Source code

- Event helpers: `src/lib/analytics.ts` (`trackNewsletterSignup`, `trackContactSubmit`)
- Wired into:
  - `src/components/NewsletterSignup.tsx`
  - `src/components/landing/NewsletterSection.tsx`
  - `src/components/landing/NewsletterHeroBanner.tsx`
  - `src/components/landing/ContactSection.tsx`
  - `src/pages/NewsletterConfirm.tsx`
- Donation + download helpers: `src/lib/ga-events.ts`
  (`trackDonationClick`, `trackFileDownload`)
- Wired into:
  - `src/components/landing/StickyDonateBar.tsx`
  - `src/components/landing/FinalDonateBand.tsx`
  - `src/components/landing/ImpactProgressBand.tsx`
  - `src/components/ExitIntentSuccess.tsx` (PDF starter-guide download)

## Recommended GA4 Explorations

Build these four Explorations in GA4 → Explore. All rely on custom
dimensions that our tracker already emits — no code changes required.

1. **Landing pages** — Free-form. Rows: `page_path`. Filter:
   `is_landing_page = true`. Metrics: Sessions, Engaged sessions,
   Engagement rate, Key events. Shows how the six canonical landing
   pages perform in isolation.
2. **Conversion funnel** — Funnel exploration. Steps: `page_view` →
   `engaged_session` → `generate_lead` (or `donation_click` for the
   donation funnel). Filter by campaign (`Session campaign`) to
   compare UTMs.
3. **Content engagement** — Free-form. Rows: `page_path`. Metrics:
   count of `engagement_30s`, `engagement_60s`, `engagement_180s`,
   `engagement_240s`. Surfaces the pages readers actually finish.
4. **Scroll depth by page** — Free-form. Rows: `page_path`. Columns:
   event parameter `depth` from `scroll_depth`. Values: event count.
   Shows drop-off points on long-form guides.

## Mark as key events

In GA4 → Admin → Events, toggle **Mark as key event** on:

- `generate_lead` — covers newsletter + contact + confirmed opt-ins.
- `donation_click` — every Donate CTA click across the site.
- `file_download` — PDF starter guide and any future asset downloads.
- `newsletter_confirmed` — optional, to separate double opt-in from
  initial signup.

## UTM tagging

Follow `docs/UTM-CONVENTIONS.md` for every outbound link that points
back at the site. GA4 auto-parses UTMs into
`Session source / medium / campaign`.

