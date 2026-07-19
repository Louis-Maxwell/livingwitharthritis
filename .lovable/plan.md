# Complete Google Search Console verification

The verification meta tag is already in `index.html` and (per your message) the site has been published. Now finalize verification and register the property.

## Steps

1. **Sanity-check the live tag** — `curl -s https://livingwitharthritis.org.uk/ | grep google-site-verification` to confirm Google will find `content="l-qVt5TBBgjYNFIo3al0voSLQYBkaRRwM899InNHcqw"` on the live domain. If it's missing, stop and tell you to re-publish (verification would fail otherwise).

2. **Call the verify endpoint** through the connector gateway:
   `POST /siteVerification/v1/webResource?verificationMethod=META` with `{ site: { identifier: "https://livingwitharthritis.org.uk/", type: "SITE" } }`. A 200 confirms ownership.

3. **Register the property in Search Console** so it appears in your property list:
   `PUT /webmasters/v3/sites/https%3A%2F%2Flivingwitharthritis.org.uk%2F`.

4. **Confirm** by listing verified properties: `GET /webmasters/v3/sites` and reporting back whether the domain now appears.

No file changes in this turn — this is purely gateway API calls.

## If verification fails

If step 2 returns `failedToFindMetaTag`, the deploy hasn't propagated yet. I'll report the exact response and wait for you to confirm before retrying — no retry loop.
