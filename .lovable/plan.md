## Goal

Make every blog post render in the layout shown in the uploaded images, without writing new medical copy. All 218 posts inherit the change from a single template edit in `src/pages/BlogPost.tsx` (+ small helpers). Posts that already contain matching content (Quick Answer, FAQs, "Helpful tip" callouts, tables, numbered steps) will now display in the intended style; posts missing a block simply skip it — no fabricated content.

## What the uploaded format contains vs. what's already in the template

| Uploaded section | Already rendered | Action |
|---|---|---|
| Title + reviewer byline + last-reviewed date | ✅ header | none |
| Quick Answer box | ✅ `AnswerBox` (only when `article.direct_answer` set) | render a fallback Quick Answer built from the first paragraph when `direct_answer` is empty |
| Key Takeaways | ✅ `KeyTakeaways` | none |
| Body headings / numbered steps / tables | ✅ prose styles | tighten `prose` styles for numbered `<ol>` (larger number, bold heading pattern) so exercise-step lists look like the images |
| 💡 Helpful tip / ✅ Try this gently / ⚠️ When to get help / 📝 Remember callouts | ❌ plain paragraphs today | new `renderCallouts()` post-processor: wrap `<p>` starting with one of the four emoji prefixes in a styled `<aside>` (info / success / warning / note variants) |
| Visible **Frequently Asked Questions** block | ❌ Q&A only surfaces via FAQPage JSON-LD; also gets swept into normal prose | new `<ArticleFaqSection>` that reuses the existing `extractFaqs()` result and renders it as a proper accordion-style list under the body. Strip those `<h2>?…</h2>` blocks from the prose so they don't render twice. |
| Closing **Find Support for Living With …** CTA | ❌ | new `<ArticleClosingCTA title={article.title} />` — static component, category-aware copy, links to `/self-help` and `/contact`. No new claims. |
| Print / Download PDF | ✅ | none |
| Citations, Medical Review badge, TOC, related, comments | ✅ | none |

## Files touched

1. `src/pages/BlogPost.tsx` — wire in fallback Quick Answer, callout post-processor, FAQ section, closing CTA; strip duplicated FAQ headings from body HTML.
2. `src/components/article/Callouts.tsx` *(new)* — pure function `renderCallouts(html)` returning HTML with the four styled callout variants.
3. `src/components/article/ArticleFaqSection.tsx` *(new)* — visible FAQ list rendered from the existing `extractFaqs()` output; no schema change (BlogPost still emits FAQPage JSON-LD).
4. `src/components/article/ArticleClosingCTA.tsx` *(new)* — "Find Support for Living With Arthritis" block matching the uploaded closing paragraph.
5. `src/index.css` — small print + callout styles (aside variants, no colour tokens hardcoded — uses existing semantic tokens).

No data migrations, no changes to `useBlogArticle`, no changes to article rows in the DB. Any post whose current body already contains the four emoji-prefixed lines or Q&A `?` headings will automatically look like the uploaded example; posts without them just render the standard prose.

## Out of scope

- Rewriting body copy of any individual post (that's the "batch rewrite" option you didn't pick).
- Generating new FAQs / takeaways / progression tables where the post has none — I won't invent medical detail.
- Backend/API changes.

## Verification

- `bunx tsgo --noEmit` clean.
- Playwright screenshot of one knee-exercises-style post and one short post (no FAQs / no callouts) to confirm the missing-block case degrades gracefully.
