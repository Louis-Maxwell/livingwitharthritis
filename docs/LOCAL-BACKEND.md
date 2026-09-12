# Local / static frontend (mailto + local chat)

Living With Arthritis UK is a **static Vite SPA** (GitHub / Lovable publish).
There is **no** Supabase, Vercel, or Cloudflare Workers backend in this repo.

## Forms

Newsletter, contact, partner, corporate giving, and blog comment forms use
**mailto** only (`info@livingwitharthritis.org.uk` / `07760 512 084`).
Opening a draft is **not** delivery confirmation — visitors must press Send.

Helpers live in `src/lib/backendSubmit.ts` → `submitViaMailto`.

## What is wired

| Feature | Behaviour |
|---------|-----------|
| Newsletter / contact / comments | mailto draft |
| Blog views | Not tracked (UI hides counts; never faked) |
| Exercise demos | Static `/exercise-videos/*.mp4` + SVG fallbacks |
| Chat / search | Local engine + `search-index.json` |
| Exercise progress | localStorage |

## Environment

Optional Vite keys only (GA4, Sentry, Stripe/PayPal). See `.env.example`.
Never commit real `.env` / `.env.local` / `.env.production`.

## What Louis still needs

1. **GA4** measurement IDs + conversions
2. **Gift Aid** HMRC registration (donate copy already honest)
3. **Google Ad Grants**
4. Upload real exercise `.mp4` binaries under `public/exercise-videos/`
5. Confirm new registered office address (`CONTACT_ADDRESS` stays empty — no Oswestry)

## Do not

- Re-add Supabase clients, Vercel config, or Cloudflare Workers/APIs
- Invent a Node API server for forms in this repo
- Show fake visitor / view counts
- Commit secrets into docs

## Smoke

```bash
npm run build
```

Confirm `/exercises` (video fallbacks), DietHub, and forms compile.
