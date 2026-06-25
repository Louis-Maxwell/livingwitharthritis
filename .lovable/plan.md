## What the 4pm spike actually was

You didn't share the site, so the numbers themselves tell the story. Every signal points to **automated (bot) traffic**, not real visitors:

| Signal (15:00 UTC hour) | Value | What it means |
|---|---|---|
| Visits in that hour | 1,027 | vs 0–3/hour baseline — 300× spike out of nowhere |
| Source | "Direct" (1,034 of 1,054) | Bots send no referrer → bucketed as Direct |
| Country | "Unknown" (1,026) | Datacenter / proxy / masked IPs, not consumer ISPs |
| Top landing page | **/404** (48 hits) | Bot probing for paths that don't exist (`/wp-admin`, `/.env`, etc.) |
| Bounce rate | 100% | No second pageview |
| Avg session duration | 0.16 s | Humans can't load + close a page that fast |
| Pageviews / visit | 1.01 | Single-hit pattern |
| Device | 1,048 desktop / 6 mobile | Real audience is usually 50%+ mobile |

The most likely culprits are: an **SEO crawler sweep** (Ahrefs, SemrushBot, DataForSEO), an **LLM/AI training crawler** (GPTBot, ClaudeBot, PerplexityBot, Bytespider), a **vulnerability scanner**, or an **uptime/sitemap audit** triggered against the new sitemap pages.

**Bottom line: it was not 1,000 new readers.** Real-visitor count for the day was closer to ~27.

## What I propose to do about it

Three small, independent actions — pick any combination.

### 1. Identify the exact crawler (read-only investigation)

Pull Lovable Cloud edge/access logs for 15:00–16:00 UTC and group by user-agent + IP prefix. We'll see the bot's name (e.g. `Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)`) within minutes. No code changes.

### 2. Filter bots out of the visible visitor number

The "10,000+ monthly visitors" badge on the homepage currently reads from `src/config/visitorStats.ts`, which uses raw Lovable analytics. Two options:

- Add a one-line note in the config that the count should be sourced from **GA4** (which auto-filters known bots), and document how to refresh `VITE_VISITOR_COUNT` each month.
- Or switch the badge to read GA4's "Active users (last 30 days)" figure manually.

### 3. Block the worst offenders at the edge

Update `public/robots.txt` to explicitly disallow aggressive SEO/AI crawlers that don't serve your audience:

```text
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: MJ12bot
Disallow: /
User-agent: DotBot
Disallow: /
User-agent: Bytespider
Disallow: /
```

Keep GPTBot, ClaudeBot, PerplexityBot, Google-Extended **allowed** — those are the ones that drive AI-search citations for the charity. (Well-behaved bots respect robots.txt; malicious scanners don't, and those need Cloudflare-level blocking which Lovable hosting doesn't expose today.)

## Recommended order

1. Run **Action 1** first (logs) — 5 minutes, tells us exactly who it was.
2. Based on what we find, decide whether **Action 3** (robots.txt) is worth adding.
3. **Action 2** (GA4-sourced visitor badge) is the durable fix so your published visitor count isn't inflated by future bot waves.

Approve and I'll start with the log dive.
