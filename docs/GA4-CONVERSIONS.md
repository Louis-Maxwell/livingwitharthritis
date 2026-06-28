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
