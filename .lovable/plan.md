## Goal

The GEO Checker shows `llms.txt`, `robots.txt`, and `sitemap.xml` exist, but `.well-known/ai.txt` is **Not Found**. Add it so all four AI-crawler discovery files pass.

## Plan

1. Create `public/.well-known/ai.txt` — served at `https://livingwitharthritis.org.uk/.well-known/ai.txt`.

2. Content follows the emerging ai.txt convention (plain text, allow-list style) and mirrors the existing `llms.txt` summary:

   ```
   # Living With Arthritis UK — ai.txt
   # AI usage and crawler guidance
   # Reference: https://site-eval.com/ai-txt

   User-Agent: *
   Allow: /
   Disallow: /admin/
   Disallow: /auth
   Disallow: /chat
   Disallow: /donation-result
   Disallow: /unsubscribe
   Disallow: /newsletter/confirm
   Disallow: /debug/
   Disallow: /site-index

   # Content usage
   Content-Usage: ai-training=allow, ai-summarization=allow, ai-citation=required
   Contact: info@livingwitharthritis.org.uk
   Sitemap: https://livingwitharthritis.org.uk/sitemap.xml
   LLMs-File: https://livingwitharthritis.org.uk/llms.txt
   ```

3. Verify Vite serves files from `public/.well-known/` (it does — same mechanism as `public/robots.txt`). No config changes needed.

## Notes

- Disallow list mirrors `robots.txt` for consistency.
- No code changes outside the single new static file.
