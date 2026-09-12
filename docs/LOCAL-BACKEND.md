# Local / static frontend + Supabase backend

Living With Arthritis UK is a **static Vite SPA** (GitHub / Lovable publish) with an
optional **Supabase** project for forms, comments and honest blog view counts.

Cloudflare Workers were **removed** — do not restore `wrangler` or `/api/*` Workers.

## Environment

Set in `.env` / `.env.local` / `.env.production` (gitignored — never commit real keys):

- `VITE_SUPABASE_URL` — project URL (`https://eswdtpmknwjxtvkyxvmi.supabase.co`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` — anon/publishable key only (never `service_role`)

Placeholders live in `.env.example`. If either variable is missing, the client is
`null` and forms fall back to **mailto** (`info@livingwitharthritis.org.uk` /
`07760 512 084`).

## What is wired

| Feature | Table / RPC | Fallback |
|---------|-------------|----------|
| Newsletter | `newsletter_subscriptions` (anon INSERT; no public SELECT of emails) | mailto |
| Contact | `contact_inquiries` (anon INSERT; admin SELECT) | mailto |
| Blog comments | `blog_comments` (anon INSERT `pending`; public SELECT `approved`) | mailto |
| Blog views | `blog_views` + `increment_blog_view(p_slug)` once per session | hide count (never fake) |
| Exercise demos | Static `/exercise-videos/*.mp4` + SVG / “Demonstration unavailable” | n/a |
| Chat / search | Local engine + `search-index.json` | n/a |
| Exercise progress | localStorage | n/a |

## What Louis still needs

1. **GA4** measurement IDs + conversions
2. **Gift Aid** HMRC registration (donate copy already honest)
3. **Google Ad Grants**
4. Upload real exercise `.mp4` binaries under `public/exercise-videos/`
5. Confirm new registered office address (`CONTACT_ADDRESS` stays empty — no Oswestry)

## Do not

- Restore Cloudflare Workers/APIs
- Invent a Node server in this repo
- Show fake visitor / view counts
- Commit `.env` / publishable keys into docs

## Smoke

```bash
npm run build
```

Confirm `/exercises` (video fallbacks), DietHub, and forms compile.
