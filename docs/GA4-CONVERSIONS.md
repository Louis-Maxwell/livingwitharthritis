# GA4 Conversion Tracking

Property: `G-ZLLSD3PXZ9` (livingwitharthritis.org.uk)

This is the only measurement ID used by the site.

`page_view` is sent by the SPA router in `src/App.tsx` (`send_page_view: false` on the gtag config in `index.html`). Enhanced measurement is not relied on for SPA navigations.

## Events fired

| Event                  | When                                              | Params                                                     |
| ---------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `page_view`            | Every SPA route change (after analytics consent)  | `page_path`, `page_location`, `page_title`, `send_to: G-ZLLSD3PXZ9` |
| `generate_lead`        | After successful newsletter signup                | `method: "newsletter"`, `value`, `currency`                |
| `sign_up`              | After successful newsletter signup                | `method: "newsletter"`                                     |
| `newsletter_signup`    | Legacy — fired alongside `sign_up` / `generate_lead` | `event_category: "conversion"`                          |
| `email_signup`         | Legacy — fired from the email signup form         | `sequence`                                                 |
| `contact_form_submit`  | After successful contact form submission          | `method: "contact_form"`, `topic`, `value`, `currency`     |
| `generate_lead`        | Mirrored from contact submission                  | `method: "contact"`, `topic`, `value`, `currency`          |
| `donation_click`       | Donate CTA click (before checkout)                | `source`, `amount`, `currency`, `method`                   |
| `begin_checkout`       | Stripe checkout session created                   | `value`, `currency`                                        |
| `donate`               | Donation success page (`/donation-result/success`)| `transaction_id`, `value`, `currency`, `donation_type`     |
| `purchase`             | Same moment as `donate` (e-commerce mirror)       | `transaction_id`, `value`, `currency`                      |
| `chat_start`           | First user message in Help & Support chat         | `source`                                                   |
| `file_download`        | PDF / guide download                              | `file_name`, `file_extension`                              |

All conversion events fire only after the backend call resolves successfully — validation errors and network failures do not inflate counts. `donate` / `purchase` fire once per success-page view.

## Marking as key events (one-time setup)

1. Wait 24h after deploy for events to appear in GA4 → Admin → Events.
2. Toggle **Mark as key event** for:
   - `generate_lead` (newsletter + contact)
   - `sign_up` (newsletter)
   - `donate` (completed gifts)
   - `chat_start` (optional — help-chat engagement)
   - `newsletter_confirmed` (optional — confirmed vs pending opt-ins)
3. Reports show automatically in **Reports → Engagement → Conversions** and **Reports → Realtime**.

## Verifying

- Dev: submit a form locally and check the browser console for `[GA4]` debug lines.
- Prod: open GA4 → Realtime in an incognito window (accept analytics cookies), submit a form; the event appears within ~30s.
- Confirm the only measurement ID on the live homepage: `curl -sL https://livingwitharthritis.org.uk/ | grep -oE 'G-[A-Z0-9]+'`
- CSP must allow `https://www.googletagmanager.com` and `https://region1.google-analytics.com` (see `index.html`).

## Source code

- Event helpers: `src/lib/analytics.ts` (`trackNewsletterSignup`, `trackContactSubmit`, `trackDonationComplete`)
- Wired into:
  - `src/components/EmailSignupForm.tsx`
  - `src/components/landing/ContactSection.tsx`
  - `src/pages/DonationSuccess.tsx`
- Donation click + chat helpers: `src/lib/ga-events.ts`
  (`trackDonationClick`, `trackChatStart`, `trackFileDownload`)
- Wired into:
  - `src/components/landing/StickyDonateBar.tsx`
  - `src/components/landing/FinalDonateBand.tsx`
  - `src/components/landing/ImpactProgressBand.tsx`
  - `src/components/StripeDonationModal.tsx` (`begin_checkout`)
  - `src/components/ChatBot.tsx` (`chat_start`)
  - `src/components/ExitIntentSuccess.tsx` (PDF starter-guide download)

## Recommended GA4 Explorations

Build these four Explorations in GA4 → Explore. All rely on custom
dimensions that our tracker already emits — no code changes required.

1. **Landing pages** — Free-form. Rows: `page_path`. Filter:
   `is_landing_page = true`. Metrics: Sessions, Engaged sessions,
   Engagement rate, Key events. Shows how the six canonical landing
   pages perform in isolation.
2. **Conversion funnel** — Funnel exploration. Steps: `page_view` →
   `engaged_session` → `generate_lead` (or `donate` for the
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

- `generate_lead` — covers newsletter + contact.
- `sign_up` — newsletter sign-up.
- `donate` — completed donations on `/donation-result/success`.
- `donation_click` — every Donate CTA click across the site.
- `chat_start` — first message in Help & Support chat.
- `file_download` — PDF starter guide and any future asset downloads.

## UTM tagging

Follow `docs/UTM-CONVENTIONS.md` for every outbound link that points
back at the site. GA4 auto-parses UTMs into
`Session source / medium / campaign`.
