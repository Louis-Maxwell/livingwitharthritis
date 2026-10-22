# UTM convention for social links

Every link we post on social media to livingwitharthritis.org.uk carries UTM tags so GA4
(property 546097857, stream `G-ZLLSD3PXZ9`) can attribute visits accurately. Untagged visits
from Facebook/LinkedIn/X apps often show up as "direct".

| Parameter | Value | Notes |
|---|---|---|
| `utm_source` | `facebook` \| `linkedin` \| `instagram` \| `x` \| `youtube` \| `threads` | lower case, one per network |
| `utm_medium` | `social` | always `social` for organic posts (`paid_social` for ads) |
| `utm_campaign` | `<yyyy-mm>-<theme>` | e.g. `2026-10-top-guides`, `2026-11-merch`, `awareness-tips` |
| `utm_content` | optional | post id or variant, e.g. `hip-recovery-a` |

## Zoho Social ready patterns

```
https://livingwitharthritis.org.uk/blog/<slug>?utm_source=facebook&utm_medium=social&utm_campaign=2026-10-top-guides
https://livingwitharthritis.org.uk/blog/<slug>?utm_source=linkedin&utm_medium=social&utm_campaign=2026-10-top-guides
https://livingwitharthritis.org.uk/blog/<slug>?utm_source=instagram&utm_medium=social&utm_campaign=2026-10-top-guides
https://livingwitharthritis.org.uk/blog/<slug>?utm_source=x&utm_medium=social&utm_campaign=2026-10-top-guides
```

Instagram captions cannot hold clickable links; use the tagged URL in the bio/link page.
The Brand Angels shop (`shop.brandangels.co.uk`) is a separate site, so UTMs there are only
visible in the shop's own analytics; on our site clicks to it are tracked as `shop_click`.

In code use `withUtm()` from `src/lib/utm.ts`:

```ts
withUtm("/blog/pip-for-arthritis-uk", { source: "facebook", campaign: "2026-10 top guides" });
```

## What the site does with a social visit

`src/lib/discoveryTracking.ts` detects the network from `utm_source`, `fbclid` or the referrer,
stores it for the session (sessionStorage only), sends a `social_referral` event once per
session and sets the GA4 user property `traffic_social_source`. Blog posts then show a small,
dismissible inline "Popular guides" strip (no popup, no sign-up).

## GA4 events (register as custom dimensions where noted)

| Event | Key params |
|---|---|
| `page_view` | sent by App.tsx on each route |
| `scroll_depth` | `percent_scrolled` 25/50/75/90/100 |
| `article_download` | `method` (text_pdf/print_pdf), `article_slug`, `placement` |
| `related_article_click`, `read_next_click`, `prev_next_click` | `link_url`, `placement`, `source_path` |
| `donation_click`, `shop_click`, `exercise_resource_click` | `link_url`, `placement` |
| `social_referral` | `social_source`, `social_campaign`, `detection_method` |
| user properties | `visitor_type` (new/returning, only after consent), `traffic_social_source` |

All events respect the cookie banner: nothing is sent until analytics consent is accepted.
