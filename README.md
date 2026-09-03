# Living With Arthritis

Vite + React + TypeScript charity site for Living With Arthritis UK, published via Lovable as a static site.

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
- Contact and newsletter forms open mailto:info@livingwitharthritis.org.uk - they do not store a submission
- Help chat uses the on-site guidance library and asks people to email if they want a person

Admin, sign-in, comments, forum, appointments, CMS and article audio are paused.

## Identity checks

npm run seo:ai-identity asserts charity 1218461, Oswestry, independent of Arthritis UK, PH128483, and Bytespider Disallow: / in public/robots.txt.

## License

MIT - see LICENSE.
