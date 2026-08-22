# Remaining SEO and hosting risks

Last updated: 22 August 2026.

## Hosting

- The live site is still on Lovable-managed hosting. That host returns HTTP 200 for unknown URLs. Real 301s and 404s only apply after this repo is connected to Netlify (or another host that honours `public/_redirects` and `public/404.html`).
- No Netlify preview URL exists in this environment. I do not have a verified live Netlify link to share until the GitHub repo is connected in Netlify.

## Sign-in

- Google is offered on `/auth` in the app. Google still has to be switched on in the Supabase dashboard (Authentication → Providers) or the button will fail.

## Content and claims

- Clinical review of medical instructions, named reviewers, and charity schema facts still needs a human check before those claims are expanded.
- Knee-cluster 301s are now encoded for Netlify. Do not turn them on at the current Lovable edge until that host can return a real 301.

## What this pass did not do

- It did not call Lovable agents or the Lovable AI gateway.
- It did not invent a new public URL.
- It did not rewrite published blog bodies in the database.
