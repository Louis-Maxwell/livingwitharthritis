# Traffic Growth Plan — Living With Arthritis UK

Goal: grow organic visitors and impressions, syndicate blogs to high-authority sites, and keep pages continuously refreshed so rankings climb over time.

## Important reality check (read first)

- **No tool can guarantee "rank 1st" on Google.** Anyone promising that is lying. What we *can* do is stack every legitimate signal Google rewards (fresh content, backlinks, structured data, speed, E-E-A-T) so rankings rise steadily.
- **We cannot auto-publish to third-party sites without accounts.** Medium, LinkedIn, Substack, Reddit, Quora, Facebook groups all require you to either (a) log in manually or (b) give us API tokens. I'll set up the automation; you approve/post.
- Expect meaningful ranking movement in **8–12 weeks**, not days. Google re-crawls and re-ranks slowly.

## Phase 1 — Syndication engine (week 1)

Build a "publish once, distribute everywhere" pipeline for every blog post.

1. **Auto-generate per-post syndication pack** — when a blog post is published, an edge function creates:
   - A Medium-ready markdown export with canonical link back to your site
   - A LinkedIn article draft (1,200–1,800 words, hook + CTA)
   - A Twitter/X thread (8–12 tweets)
   - A Facebook + Reddit post (r/arthritis, r/ChronicPain — community rules respected)
   - A Pinterest pin description + image (huge for health content in UK)
2. **Admin "Distribute" page** — lists each draft with one-click "Copy to clipboard" + direct deep-link to Medium/LinkedIn/Pinterest compose pages, so posting takes ~60 seconds per channel.
3. **Optional auto-post via connectors** — if you connect LinkedIn, we'll push automatically. Medium and Pinterest require manual paste (no public write API for free tier).

## Phase 2 — SEO automation (week 1–2)

1. **Daily content freshness job** (cron edge function): bumps `lastmod` in sitemap.xml, regenerates JSON-LD `dateModified`, and lightly rewrites 1 stale article per day using Lovable AI (intro paragraph + new FAQ block). Google rewards freshness.
2. **Auto-generated FAQ schema** on every blog post and pillar page → eligible for rich snippets and "People Also Ask" boxes.
3. **Internal linking bot** — scans new posts and inserts 3–5 contextual links to related pillar pages (Diet, Exercise, Flare-Ups). Strongest single ranking lever you're not using fully.
4. **Programmatic SEO pages** — generate 50+ city × condition pages (e.g. "Knee arthritis support in Manchester") using existing `ukCities.ts` + `arthritisConditions.ts` data. Each ranks for long-tail local queries.
5. **Auto-submit new URLs to Google + Bing** via IndexNow API and Search Console URL Inspection API on publish.

## Phase 3 — Backlink + authority building (week 2–4)

1. **HARO/Qwoted automation** — daily digest of UK journalist requests about arthritis/chronic pain, pre-drafted responses for you to send. Each placement = high-authority backlink.
2. **Guest-post outreach list** — generate a vetted list of 30 UK health blogs/charities accepting guest posts, with pre-written pitch emails per site.
3. **Citation building** — submit to UK health directories (Patient.info, NHS-adjacent listings, charity registers, Trustpilot, Google Business Profile).
4. **Wikipedia citations** — identify arthritis-related Wikipedia pages where your evidence-based content can be cited.

## Phase 4 — Continuous ranking loop (ongoing)

1. **Weekly Semrush sync** (using the Semrush connector) — pulls ranking changes for your top 100 keywords, surfaces "almost ranking" pages (positions 11–20) for priority refresh. Position 11→8 doubles clicks.
2. **Auto-rewrite losers** — pages dropping in rank get flagged and queued for AI-assisted refresh.
3. **Competitor gap monitor** — weekly job finds keywords versusarthritis.org / arthritisaction.org.uk rank for but you don't, and drafts new posts.
4. **GA4 + Search Console dashboard** in admin — shows impressions, CTR, positions, top movers, weekly trend.

## Technical scope

```
supabase/functions/
  ├── syndication-pack/         # generates Medium/LinkedIn/Twitter/Pinterest drafts
  ├── content-freshness-cron/   # daily lastmod + AI refresh of 1 article
  ├── indexnow-ping/            # submits URLs to Bing/Google on publish
  ├── seo-rank-sync/            # weekly Semrush pull → DB
  └── programmatic-pages/       # generates city×condition pages

src/pages/admin/
  ├── Distribute.tsx            # one-click syndication UI
  ├── RankTracker.tsx           # Semrush + GSC data
  └── ContentRefresh.tsx        # queue of pages to refresh

src/lib/
  └── internalLinking.ts        # auto-link injector

Database (new tables):
  ├── syndication_drafts
  ├── rank_history
  ├── content_refresh_queue
  └── backlink_opportunities
```

## What I need from you to maximise this

1. **Connect Google Search Console** (free, gives us impressions data + URL submission)
2. **Connect Semrush** (you already mentioned it — unlocks rank tracking automation)
3. **Optional LinkedIn connector** for auto-posting
4. **Confirm**: am I allowed to generate 50+ programmatic city pages? (high SEO value, slightly increases site size)
5. **Confirm**: OK to auto-rewrite article intros daily via AI? (you'll get a review queue, not blind publishing, if you prefer)

## Honest expectations

| Timeframe | Realistic outcome |
|---|---|
| Week 1–2 | Syndication live, +20–40% referral traffic from Medium/LinkedIn |
| Week 4–6 | Programmatic pages indexed, long-tail impressions climb |
| Week 8–12 | Top 20 → top 10 for several mid-difficulty keywords |
| Month 4–6 | Top 3 for low-competition long-tail; top 10 for mid-tail |

If you approve, I'll start with **Phase 1 (Syndication engine)** and **Phase 2.1–2.3 (freshness, FAQ schema, internal linking)** in the first build — those give the fastest visible lift.