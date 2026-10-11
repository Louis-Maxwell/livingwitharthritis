# Blog image audit: remove pictures that don't fit

## What the audit found so far
- All 568 blogs have a picture, and every picture file loads. There are no broken images.
- Many pictures don't match their article. For example: a Chinatown street on an apprenticeships article, a "Support for Japan" photo on alcohol and arthritis, and tai chi on aquatic therapy. A quick filename check flags up to 482 for review. Many of those will still turn out fine, because the filenames say little about the photo itself.
- 41 pictures sit inside article text. A few extra "related" pictures also show up partway through articles.

## What will change
1. **Check every picture properly.** Each blog's main picture and every picture inside its text gets checked against the article title and topic. The result is one of three: fits, doesn't fit, or unsure. Unsure pictures are kept.
2. **Remove the ones that don't fit:**
   - Main picture (top of the article, blog cards, homepage "Latest", condition pages): show a plain branded panel with the topic name, in the site's colours.
   - Pictures inside article text: removed, along with their captions.
   - Extra "related" pictures partway through: shown only when they fit. Otherwise none.
3. **Sharing previews.** Articles that lose their main picture use the site's standard share image, so links never show a mismatched photo.
4. **Report.** You get a short list of every picture removed and why, so you can add your own photos later if you'd like.

Article text, titles and layout stay the same, apart from the removed images.

## Technical details
- Run a vision check through the AI gateway (mini model) for each `public/openverse/<cover>` and each inline `<img>`, comparing it with the title, category and excerpt. Save the results to `src/data/blog-image-audit.generated.json`. Keep the report in `/mnt/documents/blog-image-audit.csv`.
- For mismatched covers, set `"cover": null` in the post JSON. The catalog then emits no map entry. `coverImage()` returns a branded fallback (`src/lib/coverFallback.ts`), and `image_url`/og:image fall back to the default OG image.
- Delete mismatched inline `<img>`/`<figure>` blocks from the post content. `getArticleImages()` skips any picks flagged as mismatched.
- Update `blog-image-url-backfill`, `unique-covers` and `article-cover-parity` tests so they allow a null cover. Add a test that no flagged image is ever rendered. Regenerate the catalog and head data, then check the build and one affected article in the browser.
