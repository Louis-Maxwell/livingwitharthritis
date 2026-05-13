## Goal
Connect Google Search Console so the project can verify the domain, submit the sitemap, and read indexing data via the Lovable connector gateway.

## Steps
1. **Launch the connection picker** — call `standard_connectors--connect` with `connector_id: google_search_console`. You'll be prompted to either pick an existing Google account or sign in with one that already owns (or can be granted ownership of) `livingwitharthritis.org.uk` in Search Console.
2. **Verify the connection** — once linked, confirm `LOVABLE_API_KEY` and `GOOGLE_SEARCH_CONSOLE_API_KEY` are present and that the gateway responds to `GET /webmasters/v3/sites`.
3. **Verify domain ownership (if not already verified)** — request a META verification token, inject the `<meta name="google-site-verification" …>` tag into `index.html`, ask you to publish, then call the Site Verification `webResource` endpoint to confirm.
4. **Add the site to Search Console** — `PUT /webmasters/v3/sites/https%3A%2F%2Flivingwitharthritis.org.uk%2F`.
5. **Submit the sitemap** — `PUT /webmasters/v3/sites/<encoded-site>/sitemaps/https%3A%2F%2Flivingwitharthritis.org.uk%2Fsitemap.xml`.
6. **Sanity-check** — pull a small `searchanalytics/query` sample to confirm data access (results may be empty for new properties; that's expected for ~48 hrs).

## Notes
- The connector authenticates *your* Google account, not site visitors.
- If your account doesn't yet own the property, you'll need to either sign in with an account that does, or complete the META verification step in #3.
- No code changes happen in steps 1–2, 4–6. Only step 3 edits `index.html`.
