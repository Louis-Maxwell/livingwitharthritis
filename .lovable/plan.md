## Goal

Add the 5 uploaded UK-focused arthritis guides as published blog posts on livingwitharthritis.org.uk so they improve content depth and SEO.

## Source files

1. `01_foods_to_avoid_with_arthritis.pdf`
2. `02_food_supplements_for_joint_pain.pdf`
3. `03_best_foods_to_eat_for_arthritis.pdf`
4. `04_gout_medication_uk.pdf`
5. `05_best_supplement_for_knee_joint.pdf`

Each PDF is a ~1,400-word AEO-ready article with a focus keyword, intro, H2 sections, AI snippet block, and conclusion — ready to publish as-is.

## Plan

1. **Parse all 5 PDFs** with `document--parse_document` to extract the full markdown body, focus keyword, and meta intent for each.

2. **Insert into `blog_articles`** via a Supabase migration (one INSERT per article) with these fields:
   - `slug` — derived from the focus keyword (e.g. `foods-to-avoid-with-arthritis`, `food-supplements-for-joint-pain`, `best-foods-to-eat-for-arthritis`, `gout-medication-uk`, `best-supplement-for-knee-joint`)
   - `title` — H1 from the PDF
   - `excerpt` — the italic subtitle line under the H1
   - `content` — full markdown body (intro through conclusion, AI snippet preserved)
   - `category` — `Diet` for #1/#3, `Supplements` for #2/#5, `Medication` for #4 (matching existing category values used by `BlogIndex`)
   - `date` — today
   - `meta_title`, `meta_description`, `keywords` — built from the focus keyword + first paragraph
   - `author` — "Living With Arthritis UK Editorial Team"
   - `reviewed_by` — "UK-registered health professional" (as stated in each PDF byline)
   - `image_url` — reuse an existing centralised Unsplash image from `src/data/images.ts` matching the topic (nutrition/supplements/medication) — no new image uploads
   - `is_published: true`, `display_order` — appended after current max

3. **Skip duplicate-slug inserts** with `ON CONFLICT (slug) DO NOTHING` so the migration is safe to re-run.

4. **No code changes** — existing `BlogIndex`, `BlogPost`, sitemap generator, and category filters pick up new rows automatically. Sitemap regenerates on next build.

## Notes

- Editorial voice memory respected: plain English, no "AI-powered" branding, UK spelling already used in the PDFs.
- NHS references in PDF #1 ("ask your GP for a referral to an NHS dietitian") will be rewritten per the NHS-removal memory before insert (replace with "ask your GP for a referral to a registered dietitian").
- No new dependencies, components, or routes.
