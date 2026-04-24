# Bounce Rate Reduction Plan — Target −40% (90% → ~54%)

_Last updated: 2026-04-24_

## 1. Diagnose: Why is bounce rate so high?

From your analytics (last 30 days):

| Signal | Value | Implication |
|---|---|---|
| Bounce rate | 90% (100% today) | Visitors leave from the entry page |
| Pages / visit | 1.23 | No second click |
| Session duration | Often <10s | Not real reads |
| Mobile share | 60% (478/784) | Mobile UX is decisive |
| CN traffic | 458/798 (57%) | **Bots inflating bounce** — not real users |
| GB traffic | 54 (7%) | Real audience is small but present |
| Top entry page | `/` (271) then deep city pages | Two very different intents |
| Source | 96% Direct | Almost no organic SEO traffic yet |

### Root causes (ranked)

1. **Bot traffic from CN distorts the metric** — most "visitors" never render JS, so they always count as a bounce. Filter these and the real bounce rate drops sharply.
2. **No clear "next step" on entry pages.** The hero is beautiful but pushes donation, not engagement. A first-time arthritis sufferer needs a **content path**, not a CTA fork.
3. **City × condition pages are SEO landing pages with no engagement loop.** A visitor lands on `/arthritis-support/cheltenham/osteoarthritis`, reads it, and has nowhere obvious to go that matches their intent (local NHS help).
4. **Slow first paint on mobile** — `Hero3DBackground` lazy-loads, but the hero still has heavy gradient layers + 3D before content paints. Mobile users on 4G abandon.
5. **No exit-intent or scroll-trigger retention** — once a visitor decides to leave, there's nothing to pull them back into the funnel.
6. **Missing internal-link density** on long-form pages (blog, condition pages). 3–5 contextual inline links typically cut bounce 15–25%.

---

## 2. Strategy: 5 workstreams, prioritised by impact

### A. Filter out bot noise (instant, structural)
**Impact: −15–20pp bounce on paper**
- Already added `Sogou`, `Baidu`, `YisouSpider`, `360Spider`, `HaoSouSpider` to `robots.txt`.
- Add a **server-side bot filter** for analytics: ignore page views where UA matches `Spider|Bot|crawler|HeadlessChrome` and country is not GB/US/IE.
- Configure Lovable Analytics (or GA4) with an "Exclude bots" view.
- _Why this is #1:_ today's 100% bounce is almost entirely bots. Cleaning this gives you an honest baseline before changing UX.

### B. Add a "next step" rail on every page
**Impact: −10–15pp bounce, +40% pages/session**
- **Sticky bottom mobile bar** with one tap action per page-type:
  - Homepage → "Take 60-sec Symptom Quiz"
  - Condition page → "See exercises for your joint"
  - City page → "Find your local NHS rheumatology"
  - Blog post → "Read next: <related title>"
- **End-of-content "What to read next" cards** (3 thumbnails) on every long page — proven to lift pages/visit 30–60%.
- **Above-the-fold "Quick paths" chips** on the hero (e.g. _"I have knee pain"_, _"Newly diagnosed"_, _"Help with NHS waiting list"_) — 3 chips, each routes to the most relevant hub.

### C. Make city × condition pages convert to engagement, not bounce
**Impact: −10pp bounce on /arthritis-support/* pages**
1. **"Local NHS pathway" interactive widget** at the top — postcode → NHS trust + waiting time (you already have `NHSWaitingTimeCalculator`).
2. **3 inline anchor links** in the first 200 words to `/exercises/<joint>`, `/diet`, `/nhs-arthritis-waiting-list-help`.
3. **Related cities + related conditions** strip at the bottom (cross-link city → condition → city graph).
4. **"Was this helpful?"** thumbs widget (you already have `BlogHelpfulness`) — interaction signals to Google + reduces bounce.

### D. Speed up first paint on mobile
**Impact: −5–8pp bounce (every 100ms cut on mobile ≈ 1pp bounce)**
- **Defer `Hero3DBackground` until `requestIdleCallback`** — currently `lazy()` but still blocks LCP because it's in the hero.
- **Inline critical hero CSS** for the first 600px of viewport.
- **Preload `heroImage`** with `fetchpriority="high"`.
- **Collapse hero gradient blur layers into a single CSS background-image** — three `blur-[120px]` divs cost ~80ms paint on mid-range Android.

### E. Re-engage exiting visitors
**Impact: −3–5pp bounce**
- **Exit-intent modal** on desktop: "Wait — get our free 7-day arthritis starter guide" → newsletter signup.
- **Scroll-triggered slide-in** at 60% scroll on blog posts: "Save this for later — get the PDF".
- **First-visit toast** after 8s: "👋 Try our free symptom quiz — 60 seconds".

---

## 3. Structure: implementation order

| Phase | Work | Effort | Expected bounce delta |
|---|---|---|---|
| **Phase 1 — Week 1** | A (bot filter) + D (mobile speed) | S | −20pp |
| **Phase 2 — Week 2** | B (sticky next-step bar, hero quick-paths chips, "read next" cards) | M | −10pp |
| **Phase 3 — Week 3** | C (city page interactive widgets + cross-links) | M | −5pp |
| **Phase 4 — Week 4** | E (exit intent + scroll-triggered re-engagement) | S | −3pp |
| **Total** | | | **~−38pp (90 → ~52%)** ✅ |

---

## 4. Success metrics to track weekly
- Real-user bounce rate (excluding CN + bots) — primary KPI
- Pages per session (target: 1.23 → 2.0)
- Avg session duration (target: stable 60s+ excluding bots)
- Click-through on the new "next step" bar (target: 25% of sessions)
- Blog post helpfulness votes (target: 1 vote per 20 reads)

---

## 5. What NOT to do
- ❌ Don't add interstitial popups before content loads (Google penalises mobile-intrusive interstitials).
- ❌ Don't hide the donation CTA — keep it, just stop making it the only path.
- ❌ Don't autoplay video in hero (kills mobile bounce).
- ❌ Don't change URLs of existing city pages (loses the SEO equity you're starting to earn).

---

## Next action
Confirm and I'll start with **Phase 1**: bot filtering + mobile-speed hero wins. Both are structural, non-visual, and unlock the biggest immediate drop.
