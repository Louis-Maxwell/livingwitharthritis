# Verify Google Search Console

Verify ownership of `https://livingwitharthritis.org.uk/` using the META tag method through the Google Search Console connector, then register the site as a property.

## Steps

1. **Request a META verification token** via the connector gateway:
   `POST /siteVerification/v1/token` with `{ site: { identifier: "https://livingwitharthritis.org.uk/", type: "SITE" }, verificationMethod: "META" }`.

2. **Add the returned `<meta name="google-site-verification" content="…" />` tag to `index.html`** inside `<head>`, alongside the existing verification meta tags. This is the only file change.

3. **User publishes the site** so the tag is live on the production domain. (Verification can only succeed after publish — Google fetches the live URL.)

4. **Call verify**: `POST /siteVerification/v1/webResource?verificationMethod=META` with the same identifier. A 200 confirms ownership.

5. **Register the property in Search Console**: `PUT /webmasters/v3/sites/https%3A%2F%2Flivingwitharthritis.org.uk%2F` so it appears in the user's property list, then confirm via `GET /webmasters/v3/sites`.

## Notes

- The existing `public/google6403cab80af896ec.html` file is a separate (file-based) verification artifact from a prior attempt; it can stay — it won't conflict with a new META verification.
- No sitemap/robots changes needed here; `sitemap.xml` and `robots.txt` are already correct and can be submitted from Search Console after verification succeeds.
- If step 4 returns `failedToFindMetaTag`, the deploy hasn't propagated yet — wait and retry, don't loop.
