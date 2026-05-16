## Goal

Integrate the supplied "Best Plantar Fasciitis Shoes for Women 2026" article into the Living With Arthritis site as a new blog post at `/blog/best-plantar-fasciitis-shoes-women-uk` to expand topical coverage (foot pain / inflammation) and target a new keyword cluster.

## Where it goes

The site already has a Supabase-backed blog (`blog_articles` table, rendered by `src/pages/BlogPost.tsx` via the `useBlogArticle(slug)` hook, routed at `/blog/:slug`). New posts are added by inserting a row — no new component code is needed.

## What to insert

A single row in `blog_articles` with these fields:

- `slug`: `best-plantar-fasciitis-shoes-women-uk`
- `title`: "Best Plantar Fasciitis Shoes for Women (UK Guide, 2026)"
- `category`: `Foot & Joint Pain`
- `author`: "Living With Arthritis Editorial Team"
- `reviewed_by` / `reviewer_credentials`: physiotherapist credentials (HCPC/CSP) to match the site's `MedicallyReviewed` pattern
- `meta_title` (<60 chars) and `meta_description` (<160 chars) using the target keywords
- `keywords`: plantar fasciitis shoes, heel pain shoes UK, arch support shoes women, plantar fasciitis insoles UK
- `image_url`: an existing Unsplash CDN entry from `src/data/images.ts` (foot/exercise theme), per the centralised image rule
- `content`: full article body in markdown
- `is_published: true`, `display_order` set to surface near the top of the foot-pain category

## Required content adaptations (UK + charity tone)

The supplied article is US-flavoured and product-heavy. To respect the site's neutrality and brand rules I will rewrite the following before insertion:

1. **Localise to the UK**: spelling (fibre, paediatric, programme), GP/physio (not "podiatrist consultation" alone), NICE-style framing where appropriate. No use of the term "NHS" (per memory constraint).
2. **Prices in £**: convert dollar ranges to approximate GBP bands ("£110–140") and label as indicative.
3. **De-promote brand claims**: keep the model comparison as informational descriptions of features and typical price band; remove "verified purchaser" quotes and unsupported efficacy percentages (e.g. "90% in 4 weeks"), which would breach the site's medical-credibility policy.
4. **No external partner / sponsorship list**: shoe brands stay as neutral examples, not partners. No affiliate "Recommended Foot Care Products" block linking out.
5. **Editorial voice**: short, plain-English paragraphs, `CheckCircle2` style bullet rhythm, and a "When to see a GP or physio" safety panel — matches `editorial-voice` memory.
6. **Trim and tighten**: target ~2,500–3,000 words (still long-form, still comprehensive) by removing duplicated FAQ material and marketing filler.

## SEO setup

- Per-page `<title>` and meta description rendered by `BlogPost.tsx` (already supports `meta_title`, `meta_description`).
- JSON-LD `Article` + `FAQPage` injected via the existing `useEffect` pattern (no Helmet for JSON-LD, per memory) — `BlogPost.tsx` already handles this; verify the FAQ block is picked up.
- Canonical: `https://livingwitharthritis.org.uk/blog/best-plantar-fasciitis-shoes-women-uk`.
- Add the new slug to `public/sitemap.xml` via the existing `scripts/generate-sitemap.ts` run, plus surface the post in the "Foot & Joint Pain" category card on `BlogIndex`/`BlogHub` (automatic once `category` is set).

## Technical steps

```text
1. Draft the rewritten markdown (UK English, £ pricing, safety panel, FAQ).
2. Create a Supabase migration that INSERTs the row into blog_articles.
3. Run scripts/generate-sitemap.ts so the new slug ships in sitemap.xml.
4. Spot-check /blog/best-plantar-fasciitis-shoes-women-uk in the preview:
   - title, meta description, canonical, JSON-LD all populated
   - hero image loads from the centralised image map
   - related-articles strip renders
```

## Out of scope

- No new React components, no new routes, no design changes.
- No affiliate links, no external partner block, no donations CTA injected mid-article (keeps neutrality).
- No changes to `src/pages/Index.tsx` or other unrelated files.

## Open question (will confirm before inserting copy)

The source article recommends specific brands (ASICS, New Balance, Vionic, Brooks, Hoka). I will keep them as neutral examples of feature sets rather than endorsements. If you'd prefer the post be **fully brand-neutral** (features only, no model names), say the word and I'll strip the brand list before publishing.
