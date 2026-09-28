# Error reporting (GA4)

The site is a static single-page app with no server of its own. Errors are
captured in the visitor's browser by `src/lib/errorReporting.ts` and sent to
the site's existing Google Analytics 4 property (`G-ZLLSD3PXZ9`) as
`exception` events. There is no backend to log from: FormSubmit, Stripe
Checkout and Google keep their own logs.

Nothing is sent unless the visitor accepts analytics cookies (gtag is only
loaded after consent), so counts are a sample of real traffic, not a total.

## What is captured

| `error_kind` | When | `fatal` |
|---|---|---|
| `js_error` | Uncaught script error (`window.onerror`) | false |
| `unhandled_rejection` | Promise rejected with no handler | false |
| `react_render` | A React component crashed (ErrorBoundary showed its fallback) | true |
| `chunk_load` | A code chunk failed to load (usually a stale tab after a publish; the page reloads itself once) | true from ErrorBoundary, otherwise false |
| `fetch_failed` | A `fetch` call failed (network error or HTTP 4xx/5xx). HEAD probes, aborted requests and analytics beacons are ignored | false |
| `form_submit_failed` | A form did not reach the charity: newsletter FormSubmit errors/timeouts, mailto draft failures, unexpected errors in contact, volunteer, partner, corporate, comment and donation forms, and "no card-payment link configured" in the donation modal | false |

Event parameters: `description` (error text, max 100 characters, emails,
phone numbers and query strings removed), `fatal`, `error_kind`,
`error_source` (form name or request host), `page_path`.
Reports are deduplicated and capped at 20 per page load.

## One-time GA4 setup (about 10 minutes)

1. **Admin → Data display → Custom definitions → Create custom dimension**
   (scope: Event), one each for:
   `description` ("Error description"), `error_kind` ("Error kind"),
   `error_source` ("Error source"), `fatal` ("Error fatal"),
   `page_path` ("Error page").
   Dimensions only collect data from the day they are created.
2. **Explore → Free form**, name it "Site errors":
   - Dimensions: Date, Error kind, Error source, Error description, Error page, Error fatal
   - Metric: Event count
   - Filter: Event name exactly matches `exception`
   - Rows: Error kind, then Error description; Columns: Date (or none)
3. Optional alert: **Reports → Insights → Create** a custom insight,
   "Event count for `exception` > 20 (daily)", emailed to the charity inbox.

GA4 data appears after up to 24–48 hours; DebugView shows events live while
testing.

## Hosted error tracker (optional, needs an account)

GA4 has no stack traces or instant alerts. For those, a hosted tracker such
as Sentry (free tier) needs Louis to create an account and project. Then:

1. Replace `sendToProvider` in `src/lib/errorReporting.ts` with the vendor's
   SDK call (load the SDK with `import()` so it stays out of the first-load
   bundle, and only after analytics consent).
2. Add the vendor's ingest host to `connect-src` in both the `index.html`
   CSP meta tag and `public/_headers` (`csp-policy.test.ts` enforces that they match).
3. Add the DSN as a Vite env var in Lovable (it is public, not a secret).

The previous Sentry integration was removed. It was never configured, and
its ingest host was never allowed by the CSP, so it could not have sent anything.
