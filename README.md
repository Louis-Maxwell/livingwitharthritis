# Living With Arthritis

Vite + React + TypeScript charity site for Living With Arthritis UK, built with Vite and hosted on Lovable (static front-end).

Live URL: https://livingwitharthritis.org.uk

Living With Arthritis is a registered charity in England and Wales (no. 1218461), based in Oswestry.
We are independent of Arthritis UK. Clinical content is reviewed by HCPC-registered clinician PH128483.

A member/admin backend will return later when traffic grows. Until then the public site is static: guides, conditions, donate pages and the blog snapshot in src/data/.

## Run locally

Prerequisites: Node.js 20+.

    npm i
    npm run dev

Open http://localhost:8080

    npm run build
    npm run lint
    npm run seo:ai-identity

Copy .env.example to .env.local if you need Stripe, PayPal or analytics keys. Never commit .env.local.

## What still works without a backend

- Homepage, about, donate, zakat appeal, guides, conditions and the static blog
- Stripe/PayPal donate UI (hosted payment link via VITE_STRIPE_DONATE_URL, otherwise email)
- Contact, appointment, volunteer and partnership forms open a mailto draft to info@ (never claim automatic delivery success)
- Help chat uses local UK-safe canned answers only (no Worker streaming API)
- Site search is client-side; Cloudflare Worker APIs were removed (see docs/archive/CLOUDFLARE-API-REMOVED.md)

Admin, sign-in, comments, forum, appointments, CMS and article audio are paused.

## Identity checks

npm run seo:ai-identity asserts charity 1218461, independence from Arthritis UK, clinician HCPC PH128483, and Bytespider Disallow: / in public/robots.txt. The Oswestry registered address is intentionally not published on the public site.

## License

MIT - see LICENSE.

## Production hosting

**Lovable only** for the live site today. Soft-404 mitigation uses prerendered HTML, public/_redirects, vercel.json (optional), and static redirect stubs. See docs/STATIC-HOSTING.md and docs/GSC-INDEXING-FIX.md.
