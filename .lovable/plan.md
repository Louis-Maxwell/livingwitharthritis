# Tighten Lovable tracker to match GA4

Goal: make the Lovable analytics panel report numbers that line up with GA4 — same bot filtering, same consent gate, same "real human" definition. The 1,027-visit spike that GA4 ignored should also disappear from Lovable.

## What's wrong today

`index.html` already has a bot stub that blocks Lovable's `lovable.app/api/analytics` beacon for known bot user-agents. Two gaps let the spike through:

1. **Bot regex is too narrow.** It catches `bot`/`spider`/`crawler` strings, but most scrapers and headless browsers in 2026 send a clean Chrome UA. GA4 catches them via the IAB/ABC bot list + datacenter IP heuristics; we have to approximate that with stricter UA + signal checks.
2. **No consent gate.** GA4 effectively only counts consenting users (and Google bot-filters the rest). Lovable's tracker fires on every page load regardless of `cookie-consent` value. Declined or pre-consent hits inflate Lovable's counts vs GA4.

There is also a small mismatch we cannot close: GA4 dedupes by client-id across the 28-day window, Lovable counts sessions per day. That gap is fine — after the two fixes below, daily Lovable numbers should track GA4 "Sessions" within ~10–20%.

## Changes

### 1. `index.html` — expand the bot stub
Edit the existing IIFE around lines 57–86.

- Widen the `block` regex to also match: `yandex`, `naver`, `qwant`, `archive.org`, `ia_archiver`, `wayback`, `lighthouse`, `pagespeed`, `gtmetrix`, `pingdom`, `uptimerobot`, `statuscake`, `monitor`, `scrape`, `fetch`, `curl`, `wget`, `python-requests`, `axios`, `node-fetch`, `go-http`, `okhttp`, `java/`, `ruby`, `apache-httpclient`, `postman`, `insomnia`, `chrome-lighthouse`, `screaming frog`.
- Add a **headless-signal check** in addition to UA: if `navigator.webdriver === true`, or `navigator.languages?.length === 0`, or `window.outerWidth === 0`, or `navigator.plugins?.length === 0 && !/Mobi/.test(navigator.userAgent)`, treat as bot.
- When `isBot`, the existing fetch/XHR shim already blocks `lovable.app/api/analytics` — leave that as-is. Also block `sendBeacon` (currently missed):
  ```js
  if (navigator.sendBeacon) {
    var origBeacon = navigator.sendBeacon.bind(navigator);
    navigator.sendBeacon = function(u){
      if (/google-analytics|googletagmanager|lovable\.app\/api\/analytics|stats|beacon/i.test(String(u||''))) return true;
      return origBeacon.apply(navigator, arguments);
    };
  }
  ```

### 2. `index.html` — gate GA + Lovable beacon on consent
Wrap the GA loader IIFE (lines 13–51) so it only schedules `loadGA` when `localStorage.getItem('cookie-consent') === 'accepted'`. If the value is missing or `'declined'`, do not load `gtag.js`.

Add a parallel guard for the Lovable beacon: in the bot-stub IIFE, also treat **declined consent** as bot-equivalent for the analytics endpoint — block `lovable.app/api/analytics` fetch/XHR/sendBeacon when `localStorage.getItem('cookie-consent') === 'declined'`. (Leave pre-consent unblocked for now so we don't lose all data; flip to "block until accepted" in a follow-up if GA4 vs Lovable still diverges.)

### 3. `src/components/CookieConsent.tsx` — reload on accept
When the user clicks **Accept All**, GA needs to actually load. Easiest: after `setVisible(false)`, dispatch `window.dispatchEvent(new Event('cookie-consent-accepted'))`. Then in the `index.html` GA IIFE, also listen for that event to trigger `loadGA()` immediately (instead of waiting for the next page load). No reload needed.

### 4. `public/robots.txt` — already done
The SemrushBot / AhrefsBot disallow added last week stays. No change.

## Out of scope
- Server-side IP/datacenter filtering (Lovable's tracker is platform-managed; we can only shape what the browser sends).
- Replacing the Lovable tracker with a self-hosted Plausible/Umami — bigger architectural change, ask separately if you want it.
- Auto-pulling the homepage badge number from GA4 — separate plan, offered earlier.

## Expected outcome
- Bot waves (like today's 1,027 hit spike) will be suppressed in the Lovable panel the same way GA4 already suppresses them.
- Declined-consent users stop firing GA — matching what GA4 already records.
- Lovable daily "visits" should land within 10–20% of GA4 daily "Sessions" going forward. Won't ever match exactly: GA4 dedupes users across sessions and applies Google's proprietary IVT list.

Approve to implement, or tell me to also flip pre-consent hits to "blocked until accepted" (stricter, but you'll lose ~30% of legitimate first-visit data).
